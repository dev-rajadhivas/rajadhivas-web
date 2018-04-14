/*****************************************************************************/
/* Adduser: Event Handlers */
/*****************************************************************************/
Template.Adduser.events({
  'click #btnRegisterUser': function() {
    var fieldEmpty = inputCHKEmpty('valueRegister');
    if (!fieldEmpty) return false
    var data = inputToArray('valueRegister');
    Meteor.call('createUserData', data, function(error, result) {
      if (error) swal("แจ้งเตือนจากระบบ", "สร้างผู้ใช้ไม่สมบูรณ์เนื่องจากปัญหาบางประการ", "error");
      if (result.status) {
        swal("แจ้งเตือนจากระบบ", result.msg, "success");
        Modal.hide('Adduser');
      } else {
        swal("แจ้งเตือนจากระบบ", result.msg, "error");
      }
    })
  }
});

/*****************************************************************************/
/* Adduser: Helpers */
/*****************************************************************************/
Template.Adduser.helpers({
    genRoom:function(){
      return Room.find()
    }
});

/*****************************************************************************/
/* Adduser: Lifecycle Hooks */
/*****************************************************************************/
Template.Adduser.onCreated(function() {});

Template.Adduser.onRendered(function() {});

Template.Adduser.onDestroyed(function() {});
