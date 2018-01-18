/*****************************************************************************/
/* Editcontent: Event Handlers */
/*****************************************************************************/
Template.Editcontent.events({
  "click #cancel": function() {
    Modal.hide('Editcontent');
  },
  "click #btnEdit": function(e) {
    var path = $(e.target).attr('data-path');
    var news_id = parseInt($(e.target).attr('data-id'));
    var img = $('#imagepreview_update').attr('src');
    var data = {};
    data.title = $("#input_title").val();
    data.content = $('#summernote' + news_id).summernote('code');
    data.category_id = parseInt($("#category_id").val());
    data.category = $("#category_id option:selected").text();
    data.expiry_date = new Date(moment($('#expiry_date').val(), 'DD/MM/YYYY').format());
    Meteor.call('update_news', news_id, data, function(error, result) {
      if (result.status) {
        if (img != path) {
          $('#startuploadfile_update').click();
        } else {
          swal("แจ้งเตือนจากระบบ", result.msg, "success");
          Modal.hide('Editcontent');
        }
      } else {
        swal("แจ้งเตือนจากระบบ", result.msg, "error");
      }
    });
  },
  'click #startuploadfile_update': function(e) {
    Uploader.startUpload.call(Template.instance(), e);
  }
});

/*****************************************************************************/
/* Editcontent: Helpers */
/*****************************************************************************/
Template.Editcontent.helpers({
  detail_news: function() {
    var news_id = parseInt(Session.get('news_id'));
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
/* Editcontent: Lifecycle Hooks */
/*****************************************************************************/
Template.Editcontent.onCreated(function() {
  Uploader.init(this);
});

Template.Editcontent.onRendered(function() {
  var news_id = parseInt(Session.get('news_id'));
  var category = parseInt($("#category_id").attr('data-id'));
  $("#category_id").val(category);
  $('#summernote' + news_id).summernote({
    dialogsInBody: true,
  });
  $('.note-image-popover').remove();
  $('.note-link-popover').remove();
  $('.arrow').remove();
  Uploader.render.call(this);
  Uploader.finished = function(index, fileInfo, templateContext) {
    var news_id = parseInt(Session.get('news_id'));
    var path = '/upload' + fileInfo.path;
    Meteor.call('uploadimgnews', news_id, path, function(error, result) {
      if (result.status) {
        sweetAlert(result.msg, "", "success");
        Modal.hide('Editcontent');
      } else {
        sweetAlert(result.msg, "", "error");
      }
    });
  }

  var newsDB = News.findOne({
    news_id: news_id
  });
  $('#expiry_date').daterangepicker({
    "singleDatePicker": true,
    "locale": {
      "format": "DD/MM/YYYY"
    },
    "startDate": moment(newsDB.expiry_date),
    "minDate": moment().add(1, 'days'),
    "drops": "up"
  });
});

Template.Editcontent.onDestroyed(function() {});
