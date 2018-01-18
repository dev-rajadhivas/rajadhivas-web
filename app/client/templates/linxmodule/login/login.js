/*****************************************************************************/
/* Login: Event Handlers */
/*****************************************************************************/
Template.Login.events({
  'submit #loginForm': function(e) {

    var username = $("#username").val();
    var password = $("#password").val();
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go("/");
      }
    });
    e.preventDefault();
  }
});

/*****************************************************************************/
/* Login: Helpers */
/*****************************************************************************/
Template.Login.helpers({});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.onCreated(function() {});

Template.Login.onRendered(function() {



});

Template.Login.onDestroyed(function() {});
