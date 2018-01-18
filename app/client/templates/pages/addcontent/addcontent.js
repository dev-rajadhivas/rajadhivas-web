/*****************************************************************************/
/* Addcontent: Event Handlers */
/*****************************************************************************/
Template.Addcontent.events({
  "click #cancel": function() {
    Router.go('/');
  },
  "click #save": function() {
    bootbox.confirm({
      title: "แจ้งเตือนจากระบบ",
      message: "คุณแน่ใจ ใช่ หรือไม่",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Confirm'
        }
      },
      callback: function(result) {
        console.log(result)
        if (result) {
          var value = new Object();
          var img = $('#imagepreview_insert').attr('src');
          // console.log("img", img);
          value.content = $('#summernote').summernote('code');
          value.title = $("#input_title").val();
          value.category_id = parseInt($("#category_id").val());
          value.category = $("#category_id option:selected").text();
          value.content = $('#summernote').summernote('code');
          value.hotnews = false;
          value.expiry_date = new Date(moment($('#expiry_date').val(), 'DD/MM/YYYY').format());
          Modal.show('Loading');
          Meteor.call('add_news', value, function(error, result) {
            // console.log('result', result);
            if (img) {
              Session.set('news_id', result.news_id);
              $('#startuploadfile_insert').click();
            } else {
              Modal.hide('Loading');
              Router.go('/');
            }

          });
        } else {

        }
      }
    });
  },
  'click #startuploadfile_insert': function(e) {
    Uploader.startUpload.call(Template.instance(), e);
  },
});

/*****************************************************************************/
/* Addcontent: Helpers */
/*****************************************************************************/
Template.Addcontent.helpers({
  'progress': function(condition) {
    if (condition)
      return Template.instance().globalInfo.get().progress
    else
      return Template.instance().globalInfo.get().progress + '%';
  }
});

/*****************************************************************************/
/* Addcontent: Lifecycle Hooks */
/*****************************************************************************/
Template.Addcontent.onCreated(function() {
  Meteor.subscribe('News');
  Meteor.subscribe('Counters');
  Session.setDefault("Upload", null);
  Uploader.init(this);
});

Template.Addcontent.onRendered(function() {
  $('#summernote').summernote();
  $('.note-image-popover').remove();
  $('.note-link-popover').remove();
  $('.arrow').remove();

  Uploader.render.call(this);
  Uploader.finished = function(index, fileInfo, templateContext) {
    console.log('fileInfo', fileInfo);
    // if (fileInfo.checkfunction == 'add_news') {
    var news_id = Session.get('news_id');
    console.log('news_id', news_id);
    var path = '/upload' + fileInfo.path
    Meteor.call('uploadimgnews', news_id, path, function(error, result) {
      Modal.hide('Loading');
      Router.go('/');
    });
  }

  $('#expiry_date').daterangepicker({
    "singleDatePicker": true,
    "locale": {
      "format": "DD/MM/YYYY"
    },
    "startDate": moment().add(7, 'days'),
    "minDate": moment().add(1, 'days'),
    "drops": "up"
  });
});

Template.Addcontent.onDestroyed(function() {});
