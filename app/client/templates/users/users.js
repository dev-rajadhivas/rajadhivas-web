/*****************************************************************************/
/* Users: Event Handlers */
/*****************************************************************************/
Template.Users.events({
    'click #btnAddUser': function() {
        Modal.show('Adduser');
    },
    'click #btnDeleteuser': function(e) {
        var _id = $(e.target).attr('_id');
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
                    Meteor.call('removeUser', _id, function(error, result) {
                        if (result.status) {
                            swal("แจ้งเตือนจากระบบ", result.msg, "success");
                        } else {
                            swal("แจ้งเตือนจากระบบ", result.msg, "error");
                        }
                    });
                }
            });
    },
    'click #btnChangePasswordUser': function(e) {
        var _id = $(e.target).attr('_id');
        Session.set('user_id', _id);
        Modal.show('Changepassword');
    },
    'click #btnEditUser': function(e) {
        var _id = $(e.target).attr('_id');
        Session.set('user_id', _id);
        Modal.show('Edituser');
    },
    // 'click tr': function(event) {
    //   if (!event.target.type) {
    //     var data = $(event.target).closest('table').DataTable().row(event.currentTarget).data();
    //     if (data) {
    //       Session.set('user_id', data._id);
    //       Modal.show('Edituser');
    //     }
    //   }
    // },
    'click #btnSearchUsers': function() {
        Session.set('ketwordRoom', $('#inputSearchRoom').val());
        $(".table-users .dataTables_filter input").val($("#inputSearchUsers").val()).keyup()
    }
});

/*****************************************************************************/
/* Users: Helpers */
/*****************************************************************************/
Template.Users.helpers({
    usersFilter: function() {
        var filter = {
            'profile.level': {
                $ne: "ผู้ดูแลระบบ"
            }
        }
        var keyword_room = Session.get('ketwordRoom');
        if(keyword_room.length > 0){
            var roomDB = Room.find({
                room_name: {
                    $regex: '.*' + keyword_room + '.*',
                    $options: 'i'
                }
            }).fetch();
            var room_id = _.pluck(roomDB, 'room_id');
            if (room_id.length > 0) filter['profile.room_id'] = { $in: room_id };
        }
        return filter
    },
    getStatusUsers: function() {
        var statusDB = Statususers.find().fetch();
        var total_master = _.findWhere(statusDB, {
            _id: 2
        });
        var total_student = _.findWhere(statusDB, {
            _id: 4
        });
        var total_parent = _.findWhere(statusDB, {
            _id: 3
        });
        var total_user = _.findWhere(statusDB, {
            _id: 5
        });
        var result = {
            total_master: total_master ? total_master.count : 0,
            total_student: total_student ? total_student.count : 0,
            total_parent: total_parent ? total_parent.count : 0,
            total_user: total_user ? total_user.count : 0
        };
        result.total = result.total_master + result.total_student + result.total_parent + result.total_user;
        return result
    }
});

/*****************************************************************************/
/* Users: Lifecycle Hooks */
/*****************************************************************************/
Template.Users.onCreated(function() {
    Session.set('ketwordRoom', "");
    this.subscribe('StatusUsers');
    this.subscribe('Rooms');
    this.autorun(function() {
        if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.level !== "ผู้ดูแลระบบ") {
            swal("แจ้งเตือนจากระบบ", "คุณไม่มีสิทธิ์การเข้าถึงข้อมูล", "error");
            Router.go('/');
        }
    })
});

Template.Users.onRendered(function() {});

Template.Users.onDestroyed(function() {});
