/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/



// My publish
Meteor.publish('Groups', function() {
    return Groups.find();
});


Meteor.publish('Roles', function() {
    return Roles.find();
});

Meteor.methods({
    insert_User: function(data) {
        var user_id = autoInc("user_id");
        var password = data.password;
        data.user_id = user_id;
        delete data.password;
        delete data.password_confirm;
        var c = Accounts.createUser({
            username: data.username,
            password: password,
            email: data.email,
            profile: data
        });

        return c;
    },
    'update_User': function(data) {
        delete data.password;
        delete data.password_confirm;

        return Meteor.users.update({ "profile.user_id": data.user_id }, { $set: { profile: data } });
    },

    insert_group: function(data) {
        data.group_id = autoInc("group_id");
        data.dependency = ["Meteor.users","Groups"]; // Edit Me
        Groups.insert(data);
    },
    'update_group': function(data) {
        data.group_id = parseInt(data.group_id);
        return Groups.update({ group_id:data.group_id }, { $set: data });
    },


    insert_role: function(data) {
        data.role_id = autoInc("role_id");
        data.dependency = ["Meteor.users","Roles"]; // Edit Me
        Roles.insert(data);
    },
    'update_role': function(data) {
        data.role_id = parseInt(data.role_id);
        return Roles.update({ role_id:data.role_id }, { $set: data });
    },
     'delete_role': function(data) {
        data.role_id = parseInt(data.role_id);
        var a = Roles.findOne( { role_id:data.role_id } );

        return Roles.remove( { role_id:data.role_id } );
    },

});
