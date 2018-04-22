/*****************************************************************************/
/* Createcontent: Event Handlers */
/*****************************************************************************/
Template.Createcontent.events({
    'click input[name=active_permission]': function(e) {
        // if ($(e.target).val() == "true") {
        //     $('#room_id').prop('disabled', false);
        // } else {
        //     $('#room_id').prop('disabled', true);
        // }
    },
    'click #btnCreateContent': function() {
        Modal.hide('Createcontent');
        var data = inputToArray('create_content');
        data.content_detail = $('#content_detail').summernote('code');
        data.active_permission = $('input[name=active_permission]:checked').val() == "true";
        data.create_by = Meteor.user().profile.user_id;
        data.create_by_name = Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname;
        Modal.show('Loading');
        Meteor.call('create_board_content', data, function(err, result) {
            if (err) console.error(err);
            if (result.status) {
                swal("แจ้งเตือนจากระบบ", result.msg, "success");
                Router.go('/webboard/content/' + result.content_id);
            } else {
                swal("แจ้งเตือนจากระบบ", result.msg, "error");
            }
            Modal.hide('Loading');
        });
    }
});

/*****************************************************************************/
/* Createcontent: Helpers */
/*****************************************************************************/
Template.Createcontent.helpers({
    genRoomList: function() {
        return Room.find()
    },
    checkCurrentRoom: function(room_id) {
        var result = "";
        var current_room_id = Meteor.user().profile.room_id;
        if (room_id == current_room_id) result = "selected";
        return result
    },
    checkCurrentRoomNull: function() {
        var result = "disabled";
        var current_room_id = Meteor.user().profile.room_id;
        var userrole = Meteor.user().profile.userrole;
        if (userrole == 1 || current_room_id > 0) {
            result = "";
        }
        return result
    },
    checkAdminPermission: function() {
        var result = "disabled";
        var userrole = Meteor.user().profile.userrole;
        if (userrole == 1) result = "";
        return result
    }
    // getHightWindows: function() {
    //     var size = parseInt(window.innerHeight * 0.7);
    //     return size + "px"
    // }
});

/*****************************************************************************/
/* Createcontent: Lifecycle Hooks */
/*****************************************************************************/
Template.Createcontent.onCreated(function() {

});

Template.Createcontent.onRendered(function() {
    $('#content_detail').summernote({
        dialogsInBody: true,
    });
    $('.note-image-popover').remove();
    $('.note-link-popover').remove();
    $('.arrow').remove();
});

Template.Createcontent.onDestroyed(function() {});
