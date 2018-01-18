/*Router.onBeforeAction(function(pause) {
    //pause.originalUrl
    if (!Meteor.userId()) {
        console.log('not login');
        this.render('Login');
    } else {
        this.next();
    }
});
*/


Router.route('/login', {
    name: 'login',
    where: 'client'
});



getUserID = function() {
    return Meteor.user() ? Meteor.user().profile.user_id : 0;
}


getUserProfile = function() {
    var profile = Meteor.user().profile
    return profile;
}

getUserGroup = function() {
    var listgroup = Meteor.user().profile.listgroup
    return listgroup;
}

checkAction = function(group_name, action) {

    var index = Meteor.user().profile.listgroup.findIndex(function(element) {
        return element == group_name;
    });
    if (index >= 0) {
        var role = Meteor.user().profile.listrole[index];
        var listrole = role.split(",");
        var index = listrole.findIndex(function(element) {
            return element == action;
        });
        return index >= 0 ? true : false;
    } else {
        return false;
    }

}
