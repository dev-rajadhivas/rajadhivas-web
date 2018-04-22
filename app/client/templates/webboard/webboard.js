/*****************************************************************************/
/* Webboard: Event Handlers */
/*****************************************************************************/
Template.Webboard.events({
    'click #btnAddContent': function() {
        Modal.show('Createcontent');
    },
    'click #btnDeleteContent': function(e) {
        var data = {
            _id: $(e.target).attr('_id'),
            content_id: parseInt($(e.target).attr('content_id')),
            user_id: parseInt(Meteor.user().profile.user_id),
            user_role: parseInt(Meteor.user().profile.userrole)
        }
        swal({
                title: "แจ้งเตือนจากระบบ",
                text: "ต้องการลบข้อมูล ใช่ หรือ ไม่",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    Modal.show('Loading');
                    Meteor.call('remove_board_content', data, function(err, result) {
                        Modal.hide('Loading');
                        if (err) console.error(err);
                        if (result.status) {
                            swal("แจ้งเตือนจากระบบ", result.msg, "success");
                        } else {
                            swal("แจ้งเตือนจากระบบ", result.msg, "error");
                        }

                    });
                }
            });
    },
    'click #btnReadContent': function(e) {
        var _id = $(e.target).attr('_id');
        var content_id = $(e.target).attr('content_id');
        Modal.show('Loading');
        Meteor.call('update_read_board_content', _id, function(err, result) {
            Modal.hide('Loading');
            if (err) console.error(err);
            if (result.status) {
                Router.go('/webboard/content/' + content_id)
            } else {
                swal("แจ้งเตือนจากระบบ", result.msg, "error");
            }
        });
    }
});

/*****************************************************************************/
/* Webboard: Helpers */
/*****************************************************************************/
Template.Webboard.helpers({
    filterBoardcontent: function() {
        var user = Meteor.user().profile;
        if(user.userrole == 1){
            return {}
        }
        return {
            $or: [{
                    active_permission: false
                },
                {
                    active_permission: true,
                    room_id: user.room ? parseInt(user.room_id) : 0
                }
            ]
        }
    }
});

/*****************************************************************************/
/* Webboard: Lifecycle Hooks */
/*****************************************************************************/
Template.Webboard.onCreated(function() {
    this.subscribe('Rooms');
});

Template.Webboard.onRendered(function() {});

Template.Webboard.onDestroyed(function() {});
