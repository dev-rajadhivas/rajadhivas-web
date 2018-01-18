/*****************************************************************************/
/* Createhotnews: Event Handlers */
/*****************************************************************************/
Template.Createhotnews.events({
  'click #btnCreateHotnews': function() {
    var img_url = $('#imgHotnewsInsert').attr('src');
    var data = {};
    data.content = $('#hotnewsNote').summernote('code');
    data.title = $("#inputHotnewsTitle").val();
    data.hotnews = true;
    data.expiry_date = new Date(moment($('#hotnews_expiry_date').val(), 'DD/MM/YYYY').format());
    if (img_url == "/image/raja.png") {
      Meteor.call('add_news', data, function(error, result) {
        if (error) swal("แจ้งเตือนจากระบบ", "ไม่สามารถเพิ่มข่าวด่วนได้เนื่องจากปัญหาบางประการ", "error");
        if (result.status) {
          swal("แจ้งเตือนจากระบบ", result.msg, "success");
          Modal.hide('Createhotnews');
        } else {
          swal("แจ้งเตือนจากระบบ", result.msg, "error");
        }
      });
    } else {
      Session.set('createHotnewsData', data);
      $('#startUploadHotnews').click();
    }
  },
  'click #startUploadHotnews': function(e) {
    Uploader.startUpload.call(Template.instance(), e);
  }
});

/*****************************************************************************/
/* Createhotnews: Helpers */
/*****************************************************************************/
Template.Createhotnews.helpers({
  'progress': function(condition) {
    if(condition)
    return Template.instance().globalInfo.get().progress
    else
    return Template.instance().globalInfo.get().progress + '%';
  }
});

/*****************************************************************************/
/* Createhotnews: Lifecycle Hooks */
/*****************************************************************************/
Template.Createhotnews.onCreated(function() {
  Uploader.init(this);
});

Template.Createhotnews.onRendered(function() {
  $('#hotnewsNote').summernote({
    dialogsInBody: true,
  });
  $('.note-image-popover').remove();
  $('.note-link-popover').remove();
  $('.arrow').remove();
  Uploader.render.call(this);
  Uploader.finished = function(index, fileInfo, templateContext) {
    var insert_data = Session.get('createHotnewsData');
    var path = '/upload' + fileInfo.path
    Meteor.call('add_news', insert_data, path, function(error, result) {
      if (error) swal("แจ้งเตือนจากระบบ", "ไม่สามารถเพิ่มข่าวด่วนได้เนื่องจากปัญหาบางประการ", "error");
      if (result.status) {
        swal("แจ้งเตือนจากระบบ", result.msg, "success");
        Modal.hide('Createhotnews');
      } else {
        swal("แจ้งเตือนจากระบบ", result.msg, "error");
      }
    });
  }
  $('#hotnews_expiry_date').daterangepicker({
    "singleDatePicker": true,
    "locale": {
      "format": "DD/MM/YYYY"
    },
    "startDate": moment().add(7, 'days'),
    "minDate": moment().add(1, 'days'),
    "drops": "up"
  });
});

Template.Createhotnews.onDestroyed(function() {});
