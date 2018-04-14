/*****************************************************************************/
/* Edituser: Event Handlers */
/*****************************************************************************/
Template.Edituser.events({
  'click #btnEditUser': function() {
    // var fieldEmpty = inputCHKEmpty('valueEdit');
    var fieldEmpty = inputCHKEmptySkipZero('valueEdit');
    if (!fieldEmpty) return false
    var _id = Session.get('user_id');
    var data = inputToArray('valueEdit');
    Meteor.call('editUserData', data, _id, function(error, result) {
      if (error) swal("แจ้งเตือนจากระบบ", "แก้ไขผู้ใช้ไม่สมบูรณ์เนื่องจากปัญหาบางประการ", "error");
      if (result.status) {
        swal("แจ้งเตือนจากระบบ", result.msg, "success");
        Modal.hide('Edituser');
      } else {
        swal("แจ้งเตือนจากระบบ", result.msg, "error");
      }
    })
  }
});

/*****************************************************************************/
/* Edituser: Helpers */
/*****************************************************************************/
Template.Edituser.helpers({
  genRoom:function(){
    return Room.find()
  }
});

/*****************************************************************************/
/* Edituser: Lifecycle Hooks */
/*****************************************************************************/
Template.Edituser.onCreated(function() {});

Template.Edituser.onRendered(function() {
  var _id = Session.get('user_id');
  var user = Meteor.users.findOne({
    _id: _id
  })
  if (user) arrayToInput('valueEdit', user.profile);
});

Template.Edituser.onDestroyed(function() {});
