/*****************************************************************************/
/* Changepassword: Event Handlers */
/*****************************************************************************/
Template.Changepassword.events({
  'click #btnChangePasswordUser': function() {
    var fieldEmpty = inputCHKEmpty('valuePassword');
    if (!fieldEmpty) return false
    var _id = Session.get('user_id');
    var data = inputToArray('valuePassword');
    Meteor.call('changePasswordUser', data, _id, function(error, result) {
      if (error) swal("แจ้งเตือนจากระบบ", "เปลี่ยนรหัสผ่านผู้ใช้ไม่สมบูรณ์เนื่องจากปัญหาบางประการ", "error");
      if (result.status) {
        swal("แจ้งเตือนจากระบบ", result.msg, "success");
        Modal.hide('Changepassword');
      } else {
        swal("แจ้งเตือนจากระบบ", result.msg, "error");
      }
    })
  }
});

/*****************************************************************************/
/* Changepassword: Helpers */
/*****************************************************************************/
Template.Changepassword.helpers({});

/*****************************************************************************/
/* Changepassword: Lifecycle Hooks */
/*****************************************************************************/
Template.Changepassword.onCreated(function() {});

Template.Changepassword.onRendered(function() {});

Template.Changepassword.onDestroyed(function() {});
