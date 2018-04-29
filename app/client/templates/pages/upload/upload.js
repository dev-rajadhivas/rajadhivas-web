/***********************************************************    ******************/
/* Upload: Event Handlers */
/*****************************************************************************/
var dropzone;
var countfile = 0
var arrayimg = [];
var editimg_array = [];
var removeimg_array = [];
Template.Upload.events({
    'click #btnAddNews': function() {
        Router.go('/addcontent/0');
    },
    'click .btnEditNews': function(e) {
        var news_id = $(e.target).attr('news_id');
        Session.set('news_id', news_id);
        Modal.show('Editcontent');
    },
    // 'click tr': function(event) {
    //   if (!event.target.type) {
    //     var data = $(event.target).closest('table').DataTable().row(event.currentTarget).data();
    //     if (data) {
    //       Session.set('news_id', data.news_id);
    //       Modal.show('Editcontent');
    //     }
    //   }
    // },
    'click .btn_ViewNews': function(e) {
        var news_id = parseInt($(e.target).attr('news_id'));
        Session.set('news_id', news_id);
        $("#myModal").modal('show');
    },
    'click .btn_DeleteNews': function(e) {
        var news_id = $(e.target).attr('news_id');
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
                    Meteor.call('delete_news', news_id, function(error, result) {
                        if (result.status) {
                            swal("แจ้งเตือนจากระบบ", result.msg, "success");
                        } else {
                            swal("แจ้งเตือนจากระบบ", result.msg, "error");
                        }
                    });

                }
            });
        // bootbox.confirm({
        //   title: "แจ้งเตือนจากระบบ",
        //   message: "คุณแน่ใจ ใช่ หรือไม่",
        //   buttons: {
        //     cancel: {
        //       label: '<i class="fa fa-times"></i> Cancel'
        //     },
        //     confirm: {
        //       label: '<i class="fa fa-check"></i> Confirm'
        //     }
        //   },
        //   callback: function(result) {
        //     console.log(result)
        //     if (result) {
        //       Meteor.call('delete_news', news_id, function(error, result) {});
        //     } else {
        //
        //     }
        //   }
        // });
    },
    "click #btnSearchNews": function() {
        $(".dataTables_filter input").val($("#input_SearchNews").val()).keyup()
    },
    'click #btnAdvertise': function() {
        Session.set('news_type', 2);
    },
    'click #btnAnnounce': function() {
        Session.set('news_type', 1);
    },
    'click #btnActivity': function() {
        Session.set('news_type', 3);
    }
});


/*****************************************************************************/
/* Upload: Helpers */
/*****************************************************************************/
Template.Upload.helpers({
    ViewModalNews: function() {
        var news_id = Session.get('news_id');
        return News.findOne({
            "news_id": news_id
        });
    },
    filterNewsList: function() {
        return {
            hotnews: {
                $ne: true
            },
            $or: [{
                expiry_date: {
                    $exists: false
                }
            }, {
                expiry_date: {
                    $gt: new Date()
                }
            }],
            category_id: Session.get('news_type')
        };
    },
    getStatusNews: function() {
        var statusDB = Statusnews.find().fetch();
        var total_announce = _.findWhere(statusDB, {
            _id: 1
        });
        var total_advertise = _.findWhere(statusDB, {
            _id: 2
        });
        var total_activity = _.findWhere(statusDB, {
            _id: 3
        });
        var result = {
            total_announce: total_announce ? total_announce.count : 0,
            total_advertise: total_advertise ? total_advertise.count : 0,
            total_activity: total_activity ? total_activity.count : 0
        };
        result.total = result.total_announce + result.total_advertise + result.total_activity;
        return result
    }
});

/*****************************************************************************/
/* Upload: Lifecycle Hooks */
/*****************************************************************************/

Template.Upload.onCreated(function() {
    Session.set('news_id', 0);
    !Session.get('news_type') ? Session.set('news_type', 2) : false
    // this.subscribe('News');
    // this.subscribe('Counters');
    this.subscribe('StatusNews');
});

Template.Upload.onRendered(function() {});

Template.Upload.onDestroyed(function() {});
