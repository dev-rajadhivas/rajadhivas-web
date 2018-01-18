/*****************************************************************************/
/* About: Event Handlers */
/*****************************************************************************/
Template.About.events({
  'click #btnUpdateAbout': function(e) {
    $(e.target).prop('disabled', true);
    var data = $('#aboutRajadhivas').summernote('code');
    Meteor.call('updateAbout', data, function(error, result) {
      if (error) swal("แจ้งเตือนจากระบบ", "ไม่สามารถแก้ไขข้อมูลได้เนื่องจากปัญหาบางประการ", "error");
      if (result.status) {
        swal("แจ้งเตือนจากระบบ", result.msg, "success");
        Modal.hide('Edithotnews');
      } else {
        swal("แจ้งเตือนจากระบบ", result.msg, "error");
      }
    });
    $(e.target).prop('disabled', false);
  }
});

/*****************************************************************************/
/* About: Helpers */
/*****************************************************************************/
Template.About.helpers({});

/*****************************************************************************/
/* About: Lifecycle Hooks */
/*****************************************************************************/
Template.About.onCreated(function() {
  this.subscribe('Unity', {
    data: {
      doc_type: 'about_content'
    },
    option: {
      sort: {
        create_date: -1
      },
      limit: 1
    }
  });
  this.autorun(function() {
    var result = Unity.findOne();
    if (!result) result = "";
    else result = result.content;
    $('#aboutRajadhivas').summernote('code', result);
  });
});

Template.About.onRendered(function() {
  $('#btnUpdateAbout').hide();
  $('#aboutRajadhivas').summernote();
  $('.note-image-popover').remove();
  $('.note-link-popover').remove();
  $('.arrow').remove();
  $('.note-resizebar').hide();
  this.autorun(function() {
    if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.level !== "ผู้ดูแลระบบ") {
      $('#btnUpdateAbout').show();
      $('#btnUpdateAbout').prop('disabled', true);
      $('#btnUpdateAbout').attr('class', "btn btn-danger fa fa-floppy-o");
    } else {
      $('#btnUpdateAbout').show();
      $('#btnUpdateAbout').prop('disabled', false);
      $('#btnUpdateAbout').attr('class', "btn btn-success fa fa-floppy-o");
    }
  })
});

Template.About.onDestroyed(function() {});
