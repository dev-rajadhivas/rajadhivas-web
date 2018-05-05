/*****************************************************************************/
/* Editwebboardcontent: Event Handlers */
/*****************************************************************************/
Template.Editwebboardcontent.events({
    'click #btnEditSubContent': function() {
        Modal.hide('Editwebboardcontent');
        var data = {
            content_id: parseInt(Session.get('content_id')),
            content_detail: $('#edit_webboard_content_detail').summernote('code'),
            update_by: Meteor.user().profile.user_id,
            update_by_name: Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname,
            update_status: true
        };
        Modal.show('Loading');
        Meteor.call('edit_board_content', data, function(err, result) {
            if (err) console.error(err);
            if (result.status) {
                swal("แจ้งเตือนจากระบบ", result.msg, "success");
            } else {
                swal("แจ้งเตือนจากระบบ", result.msg, "error");
            }
            Session.set('content_id', 0);
            Modal.hide('Loading');
        });
    }
});

/*****************************************************************************/
/* Editwebboardcontent: Helpers */
/*****************************************************************************/
Template.Editwebboardcontent.helpers({
    genContentDetail: function() {
        var boardcontentDB = Boardcontent.findOne({ content_id: parseInt(Session.get('content_id')) });
        return boardcontentDB ? boardcontentDB.content_detail : "";
    }
});

/*****************************************************************************/
/* Editwebboardcontent: Lifecycle Hooks */
/*****************************************************************************/
Template.Editwebboardcontent.onCreated(function() {});

Template.Editwebboardcontent.onRendered(function() {
    $('#edit_webboard_content_detail').summernote({
        dialogsInBody: true,
    });
    $('.note-image-popover').remove();
    $('.note-link-popover').remove();
    $('.arrow').remove();
});

Template.Editwebboardcontent.onDestroyed(function() {});
