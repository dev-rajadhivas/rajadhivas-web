/*****************************************************************************/
/* Editsubcontent: Event Handlers */
/*****************************************************************************/
Template.Editsubcontent.events({
    'click #btnEditSubContent': function() {
        Modal.hide('Editsubcontent');
        var data = {
            content_sub_id: parseInt(Session.get('content_sub_id')),
            content_detail: $('#webboard_sub_content_detail').summernote('code'),
            update_by: Meteor.user().profile.user_id,
            update_by_name: Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname,
            update_status: true
        };
        Modal.show('Loading');
        Meteor.call('edit_board_sub_content', data, function(err, result) {
            if (err) console.error(err);
            if (result.status) {
                swal("แจ้งเตือนจากระบบ", result.msg, "success");
            } else {
                swal("แจ้งเตือนจากระบบ", result.msg, "error");
            }
            Session.set('content_sub_id', 0);
            Modal.hide('Loading');
        });
    }
});

/*****************************************************************************/
/* Editsubcontent: Helpers */
/*****************************************************************************/
Template.Editsubcontent.helpers({
    genSubContentDetail: function() {
        var subboardcontentDB = Subboardcontent.findOne({ content_sub_id: parseInt(Session.get('content_sub_id')) });
        return subboardcontentDB ? subboardcontentDB.content_detail : "";
    }
});

/*****************************************************************************/
/* Editsubcontent: Lifecycle Hooks */
/*****************************************************************************/
Template.Editsubcontent.onCreated(function() {});

Template.Editsubcontent.onRendered(function() {
    $('#webboard_sub_content_detail').summernote({
        dialogsInBody: true,
    });
    $('.note-image-popover').remove();
    $('.note-link-popover').remove();
    $('.arrow').remove();
});

Template.Editsubcontent.onDestroyed(function() {});
