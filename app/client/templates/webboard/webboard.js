/*****************************************************************************/
/* Webboard: Event Handlers */
/*****************************************************************************/
Template.Webboard.events({
    'click #btnAddContent': function() {
      Modal.show('Createcontent');
    }
});

/*****************************************************************************/
/* Webboard: Helpers */
/*****************************************************************************/
Template.Webboard.helpers({
});

/*****************************************************************************/
/* Webboard: Lifecycle Hooks */
/*****************************************************************************/
Template.Webboard.onCreated(function () {
    this.subscribe('Rooms');
});

Template.Webboard.onRendered(function () {
});

Template.Webboard.onDestroyed(function () {
});
