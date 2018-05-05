/*****************************************************************************/
/* Content: Event Handlers */
/*****************************************************************************/
Template.Content.events({
    'click #btnBack': function() {
        Router.go('/webboard');
    },
    'click #btnSendAnswer': function() {
        var data = {};
        data.content_id = parseInt(Router.current().params.content_id);
        data.content_detail = $('#sub_content_detail').summernote('code');
        data.create_by = Meteor.user().profile.user_id;
        data.create_by_name = Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname;
        Modal.show('Loading');
        Meteor.call('create_board_sub_content', data, function(err, result) {
            if (err) console.error(err);
            if (result.status) {
                $('#sub_content_detail').summernote('reset');
                $('.note-image-popover').remove();
                $('.note-link-popover').remove();
                $('.arrow').remove();
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                swal("แจ้งเตือนจากระบบ", result.msg, "success");
            } else {
                swal("แจ้งเตือนจากระบบ", result.msg, "error");
            }
            Modal.hide('Loading');
        });
    },
    'click #btnRemoveComment': function(e) {
        var content_sub_id = $(e.target).attr('content_sub_id');
        var data = {
            content_sub_id: content_sub_id
        }
        swal({
                title: "แจ้งเตือนระบบ",
                text: "เหตุผล ในการลบข้อมูล",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            },
            function(inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("ต้องการเหตุผลในการลบข้อมูล!");
                    return false
                }
                data.reson_msg = inputValue;
                Modal.show('Loading');
                Meteor.call('remove_board_content_sub', data, function(err, result) {
                    Modal.hide('Loading');
                    if (err) console.error(err);
                    if (result.status) {
                        swal("แจ้งเตือนจากระบบ", result.msg, "success");
                    } else {
                        swal("แจ้งเตือนจากระบบ", result.msg, "error");
                    }
                });
            });
    },
    'click #btnEditComment': function(e) {
        var content_sub_id = parseInt($(e.target).attr('content_sub_id'));
        Session.set('content_sub_id', content_sub_id);
        Modal.show('Editsubcontent');
    },
    'click #btnEditBoardContent': function(e) {
        var content_id = parseInt(Router.current().params.content_id);
        Session.set('content_id', content_id);
        Modal.show('Editwebboardcontent');
    }
});

/*****************************************************************************/
/* Content: Helpers */
/*****************************************************************************/
Template.Content.helpers({
    contentHeader: function() {
        return Boardcontent.findOne()
    },
    convertDate: function(date) {
        return moment(date).format('DD/MM/YYYY - HH:mm')
    },
    subContent: function() {
        return Subboardcontent.find()
    },
    getNumberCount: function(num) {
        return num + 1
    },
    btnAdminRemove: function() {
        var result = "display: none;";
        if (Meteor.user().profile.userrole == 1) result = "";
        return result;
    },
    btnEditComment: function(user_id) {
        var result = "display: none;";
        if (Meteor.user().profile.user_id == user_id || Meteor.user().profile.userrole == 1) result = "";
        return result;
    },
    btnEditBoardContent: function(user_id) {
        console.log(user_id);
        var result = "display: none;";
        if (Meteor.user().profile.user_id == user_id || Meteor.user().profile.userrole == 1) result = "";
        return result;
    }
});

/*****************************************************************************/
/* Content: Lifecycle Hooks */
/*****************************************************************************/
Template.Content.onCreated(function() {
    Session.set('sub_content_id', 0);
    Session.set('content_id', 0);
    var content_id = parseInt(Router.current().params.content_id);
    Modal.show('Loading');
    var subready = this.subscribe('ContentData', content_id, {
        onReady: function() {
            Modal.hide('Loading');
        }
    });
});

Template.Content.onRendered(function() {
    $('#sub_content_detail').summernote({
        dialogsInBody: true,
        minHeight: '250px'
    });
    $('.note-image-popover').remove();
    $('.note-link-popover').remove();
    $('.arrow').remove();
});

Template.Content.onDestroyed(function() {});
