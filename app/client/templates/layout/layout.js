/*****************************************************************************/
/* LayoutNav: Event Handlers */
/*****************************************************************************/
Template.LayoutNav.events({
  'click .menu-collapse': function(event) {
    // console.log($("#" + event.currentTarget.id + " .sub-menu-collapse").hasClass('collapse'));
    if ($("#" + event.currentTarget.id + " .sub-menu-collapse").hasClass('collapse') == true) {
      $(".menu-collapse").removeClass('active-link');
      $(".menu-collapse .sub-menu-collapse").addClass('collapse');
      $("#" + event.currentTarget.id + " .sub-menu-collapse").removeClass('collapse');
      $("#" + event.currentTarget.id).addClass('active-link');
      $("#mainnav-container").removeClass('nav-collapse');
      $("#footer").removeClass('nav-content-collapse');
      $(".navbar-brand").removeClass('nav-collapse');
      $(".menu-collapse .menu-title").removeClass('nav-title-collapse');
      $(".navbar-content").removeClass('nav-content-collapse');
      $(".page-container").removeClass('nav-content-collapse');
      $(".menu-collapse i.arrow").removeClass('nav-title-collapse');
      $(".menu-collapse i.fa").removeClass('nav-icon-collapse');
    } else {
      $("#" + event.currentTarget.id + " .sub-menu-collapse").addClass('collapse');
      $("#" + event.currentTarget.id).removeClass('active-link');
    }
  }
});

/*****************************************************************************/
/* LayoutNav: Helpers */
/*****************************************************************************/
Template.LayoutNav.helpers({
  permission: function() {
    var user = Meteor.user();
    return (user && user.profile.level == "ผู้ดูแลระบบ") ? '' : 'hidden'
  },
});

/*****************************************************************************/
/* LayoutNav: Lifecycle Hooks */
/*****************************************************************************/
Template.LayoutNav.onCreated(function() {});

Template.LayoutNav.onRendered(function() {});

Template.LayoutNav.onDestroyed(function() {});

/*****************************************************************************/
/* LayoutHeader: Event Handlers */
/*****************************************************************************/
Template.LayoutHeader.events({
  'click #lw-menu-btn': function(event) {
    event.preventDefault();
    event.stopPropagation();
    if ($("#mainnav-container").hasClass('nav-collapse') == false) {
      $("#mainnav-container").addClass('nav-collapse');
      $(".navbar-brand").addClass('nav-collapse');
      $(".navbar-content").addClass('nav-content-collapse');
      $(".page-container").addClass('nav-content-collapse');
      $("#footer").addClass('nav-content-collapse');
      $(".menu-collapse .menu-title").addClass('nav-title-collapse');
      $(".menu-collapse i.arrow").addClass('nav-title-collapse');
      $(".menu-collapse i.fa").addClass('nav-icon-collapse');
      $(".menu-collapse .sub-menu-collapse").addClass('collapse');
    } else {
      $("#mainnav-container").removeClass('nav-collapse');
      $(".navbar-brand").removeClass('nav-collapse');
      $(".navbar-content").removeClass('nav-content-collapse');
      $(".page-container").removeClass('nav-content-collapse');
      $("#footer").removeClass('nav-content-collapse');
      $(".menu-collapse .menu-title").removeClass('nav-title-collapse');
      $(".menu-collapse i.arrow").removeClass('nav-title-collapse');
      $(".menu-collapse i.fa").removeClass('nav-icon-collapse');
    }
  },
  'click #btnLogout': function() {
    Meteor.logout();
    Router.go("/login");
  },
});

/*****************************************************************************/
/* LayoutHeader: Helpers */
/*****************************************************************************/
Template.LayoutHeader.helpers({});

/*****************************************************************************/
/* LayoutHeader: Lifecycle Hooks */
/*****************************************************************************/
Template.LayoutHeader.onCreated(function() {});

Template.LayoutHeader.onRendered(function() {});

Template.LayoutHeader.onDestroyed(function() {});
