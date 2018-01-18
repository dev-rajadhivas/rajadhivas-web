/*****************************************************************************/
/* Edithotnews: Event Handlers */
/*****************************************************************************/
Template.Edithotnews.events({
  'click #btnUpdateHotnews': function(e) {
    var path = $(e.target).attr('data-path');
    var img_url = $('#imgHotnewsUpdate').attr('src');
    var news_id = parseInt(Session.get('hotnews_id'));
    var data = {};
    data.content = $('#hotnewsEditNote').summernote('code');
    data.title = $("#inputHotnewsTitle").val();
    data.hotnews = true;
    data.expiry_date = new Date(moment($('#hotnews_expiry_date').val(), 'DD/MM/YYYY').format());
    if (path == img_url) {
      Meteor.call('update_news', news_id, data, function(error, result) {
        if (error) swal("แจ้งเตือนจากระบบ", "ไม่สามารถแก้ไขข่าวด่วนได้เนื่องจากปัญหาบางประการ", "error");
        if (result.status) {
          swal("แจ้งเตือนจากระบบ", result.msg, "success");
          Modal.hide('Edithotnews');
        } else {
          swal("แจ้งเตือนจากระบบ", result.msg, "error");
        }
      });
    } else {
      Session.set('updateHotnewsData', data);
      $('#startUpdateHotnews').click();
    }
  },
  'click #startUpdateHotnews': function(e) {
    Uploader.startUpload.call(Template.instance(), e);
  }
});

/*****************************************************************************/
/* Edithotnews: Helpers */
/*****************************************************************************/
Template.Edithotnews.helpers({
  detail_hotnews: function() {
    var news_id = parseInt(Session.get('hotnews_id'));
    return News.findOne({
      news_id: news_id
    })
  },
  'progress': function(condition) {
    if (condition)
      return Template.instance().globalInfo.get().progress
    else
      return Template.instance().globalInfo.get().progress + '%';
  }
});

/*****************************************************************************/
/* Edithotnews: Lifecycle Hooks */
/*****************************************************************************/
Template.Edithotnews.onCreated(function() {
  Uploader.init(this);
});

Template.Edithotnews.onRendered(function() {
  $('#hotnewsEditNote').summernote({
    dialogsInBody: true,
  });
  $('.note-image-popover').remove();
  $('.note-link-popover').remove();
  $('.arrow').remove();
  Uploader.render.call(this);
  Uploader.validateFile = function(file, req) {
    console.log(file, req);
  }
  Uploader.finished = function(index, fileInfo, templateContext) {
    console.log(index, fileInfo, templateContext);
    var news_id = parseInt(Session.get('hotnews_id'));
    var insert_data = Session.get('updateHotnewsData');
    var path = '/upload' + fileInfo.path;
    Meteor.call('update_news', news_id, insert_data, path, function(error, result) {
      if (error) swal("แจ้งเตือนจากระบบ", "ไม่สามารถแก้ไขข่าวด่วนได้เนื่องจากปัญหาบางประการ", "error");
      if (result.status) {
        swal("แจ้งเตือนจากระบบ", result.msg, "success");
        Modal.hide('Createhotnews');
      } else {
        swal("แจ้งเตือนจากระบบ", result.msg, "error");
      }
    });
  }
  var news_id = parseInt(Session.get('hotnews_id'));
  var newsDB = News.findOne({
    news_id: news_id
  });
  $('#hotnews_expiry_date').daterangepicker({
    "singleDatePicker": true,
    "locale": {
      "format": "DD/MM/YYYY"
    },
    "startDate": moment(newsDB.expiry_date),
    "minDate": moment().add(1, 'days'),
    "drops": "up"
  });
});

Template.Edithotnews.onDestroyed(function() {});
