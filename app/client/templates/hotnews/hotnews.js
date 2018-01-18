/*****************************************************************************/
/* Hotnews: Event Handlers */
/*****************************************************************************/
Template.Hotnews.events({
  'click #btnCreateHotNews': function() {
    Modal.show('Createhotnews');
  },
  'click #btnSearchHotNews': function() {
    $(".table-hotnews .dataTables_filter input").val($("#inputHotNews").val()).keyup()
  },
  'click .btnEditNews': function(e) {
    var news_id = $(e.target).attr('news_id');
    Session.set('hotnews_id', news_id);
    Modal.show('Edithotnews');
  },
  // 'click tr': function(event) {
  //   if (!event.target.type) {
  //     var data = $(event.target).closest('table').DataTable().row(event.currentTarget).data();
  //     if (data) {
  //       Session.set('hotnews_id', data.news_id);
  //       Modal.show('Edithotnews');
  //     }
  //   }
  // },
  'click #btnTest': function() {
    HTTP.call('POST', 'http://localhost/8100', {
      "users": ["user1"],
      "android": {
        "collapseKey": "optional",
        "data": {
          "message": "Your message here"
        }
      },
      "ios": {
        "badge": 0,
        "alert": "Your message here",
        "sound": "soundName"
      }
    });
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
  }
});

/*****************************************************************************/
/* Hotnews: Helpers */
/*****************************************************************************/
Template.Hotnews.helpers({
  filterHotnews: function() {
    return {
      hotnews: true,
      $or: [{
        expiry_date: {
          $exists: false
        }
      }, {
        expiry_date: {
          $gt: new Date()
        }
      }]
    }
  }
});

/*****************************************************************************/
/* Hotnews: Lifecycle Hooks */
/*****************************************************************************/
Template.Hotnews.onCreated(function() {});

Template.Hotnews.onRendered(function() {});

Template.Hotnews.onDestroyed(function() {});
