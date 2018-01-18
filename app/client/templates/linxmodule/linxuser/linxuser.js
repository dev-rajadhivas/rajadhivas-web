/*****************************************************************************/
/* Linxuser: Event Handlers */
/*****************************************************************************/

TempGroupandRole = new Mongo.Collection(null);
var arrprog = [];
var checkclick = [];
var checkclick1 = [];
Template.Linxuser.events({
    'click #test':function(){
        var a = getUserID();
        var b = getUserProfile();
        var c = checkAction("test2","delete");
        console.log(c);
    },
    'click #openChangePassword':function(){
        $("#modalChangePassword").modal('show');
    },
    'click #savePassword':function(){

        var datachangepass = inputToArray("changepass");

          if (datachangepass.password == datachangepass.password_confirm) {

                     Accounts.changePassword(datachangepass.oldpassword,datachangepass.password,function(err){
                            if(err){
                                alert(err.reason);
                            }else{
                                alert("change password complete");
                                  $("#modalChangePassword").modal('hide');
                            }
                     });
                     
            }else{
                alert("password not match");
            }




    },
    'click #btnAddUser': function() {
        $(".form-password").show();
        $(".changepass").hide();
    	TempGroupandRole.remove({});
        clearInput("registerForm");
        enableInput('registerForm');
        $("#saveUser").attr('mode', 'add');
        $("#modalUser").modal('show');
    },
    'click #saveUser': function(e) {
        var data = inputToArray('registerForm');
        var mode = $(e.currentTarget).attr('mode');
        var _data = TempGroupandRole.find().fetch();
        var listgroup = [];
         var listrole = [];
        _.each(_data,function(v,k){
        	delete _data._id;
        	listgroup.push(v.group_name);
        	listrole.push(v.role)
        });

        data.listgroup = listgroup;
        data.listrole = listrole;

        if (mode == 'add') {
            if (data.password != data.password_confirm) {
                $('[name=password]').focus();
                alert("password not match");
                return false;
            }
            Meteor.call('insert_User', data, function(error, result) {
                if (error) {
                    alert(error.reason)
                } else {
                    $("#modalUser").modal('hide');
                }


            });
        } else {
            data.user_id = parseInt($(e.currentTarget).attr('user_id'));
            Meteor.call('update_User', data, function(error, result) {
                if (error) {
                    alert(error.reason)
                } else {
                    $("#modalUser").modal('hide');
                }
            });
        }


    },
    'click #btnEditUser': function(e) {
        $(".form-password").hide();
        $(".changepass").show();
    	TempGroupandRole.remove({});
        clearInput('registerForm');
        var user_id = parseInt($(e.currentTarget).attr('user_id'));
        var a = Meteor.users.findOne({ "profile.user_id": user_id });
        _.each(a.profile.listgroup,function(v,k){
        	    TempGroupandRole.insert({
        	    	group_name : v,
        	    	role : a.profile.listrole[k]
        		})
        });
    
        arrayToInput('registerForm', a.profile);
        $("#saveUser").attr('mode', 'edit');
        $("#saveUser").attr('user_id', user_id);
        $("#modalUser").modal('show');
        $(".registerForm[field=password]").attr('disabled', true);
        $(".registerForm[field=password_confirm]").attr('disabled', true);
        $(".registerForm[field=username]").attr('disabled', true);
    },
    'click #openGroup': function() {
        $("#modalAddgroup").modal('show');
         $("#listGroup").val($("#listGroup option:first").val());
          $("#listRole").val($("#listRole option:first").val());
    },
    'click #addGroup': function() {

        var group_name = $("#listGroup").val();
        var listrole =  $("#listRole").val();


        var check = TempGroupandRole.findOne({group_name:group_name});
        if(!check){
                TempGroupandRole.insert({
                group_name: group_name,
                role : listrole.join()
            })
          $("#listGroup").val($("#listGroup option:first").val());
          $("#listRole").val($("#listRole option:first").val());

        }else{
            $("#listGroup").focus();
            alert("group is existing");
        }

	

    },
    'click .btn_deleteTempGroupandRole':function(e){
    	var _id = $(e.currentTarget).attr('_id');
    	TempGroupandRole.remove({_id:_id});
    }


});

/*****************************************************************************/
/* Linxuser: Helpers */
/*****************************************************************************/
Template.Linxuser.helpers({

    listGroup: function() {
        return Groups.find();
    },

    listRole: function() {
        return Roles.find();
    },

    reactiveDataTbtempgroup: function() {
        dataTableData = function() {
            return TempGroupandRole.find().fetch();
        };
        return dataTableData;
    },
    optionsObjectTbtempgroup: function() {
        return {
            "paging": false,
            "pageLength": 10,
            "lengthChange": true,
            "lengthMenu": [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],


            columns: [
            {
                title: 'Name',
                data: 'group_name',
            },
              {
                title: 'Role',
                data: 'role',
            },
            {
                title: '#',
                data: '_id',render:function(val){
                	return "<button _id="+val+" class='btn btn-danger btn_deleteTempGroupandRole' >del</button>"
                }
            },
             ],
        }
    },

});

/*****************************************************************************/
/* Linxuser: Lifecycle Hooks */
/*****************************************************************************/
Template.Linxuser.onCreated(function() {

    Meteor.subscribe('Groups');
    Meteor.subscribe('Roles');

});

Template.Linxuser.onRendered(function() {

});

Template.Linxuser.onDestroyed(function() {});
