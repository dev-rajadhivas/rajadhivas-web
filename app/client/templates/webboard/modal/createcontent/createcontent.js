/*****************************************************************************/
/* Createcontent: Event Handlers */
/*****************************************************************************/
Template.Createcontent.events({
    'click input[name=active_permission]': function(e) {
        if ($(e.target).val() == "true") {
            $('#room_id').prop('disabled', false);
        } else {
            $('#room_id').prop('disabled', true);
        }
    },
    'click #btnCreateContent': function() {
        var data = inputToArray('create_content');
        data.content_detail = $('#content_detail').summernote('code');
        data.active_permission = $('input[name=active_permission]:checked').val() == "true";
        data.create_by = Meteor.user().profile.fullname;
        // var data = {
        //     content_type: "ทักทาย",
        //     content_title: "หัวข้อ",
        //     room_id: 1
        // }
        console.log(data);
    }
});

/*****************************************************************************/
/* Createcontent: Helpers */
/*****************************************************************************/
Template.Createcontent.helpers({
    genRoomList: function() {
        return Room.find()
    }
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
