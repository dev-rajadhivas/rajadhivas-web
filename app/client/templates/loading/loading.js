/*****************************************************************************/
/* Loading: Event Handlers */
/*****************************************************************************/
Template.Loading.events({});

/*****************************************************************************/
/* Loading: Helpers */
/*****************************************************************************/
Template.Loading.helpers({
    getHeightWindow: function() {
        return 'height:' + window.innerHeight + 'px';
    }
});

/*****************************************************************************/
/* Loading: Lifecycle Hooks */
/*****************************************************************************/
Template.Loading.onCreated(function() {});

Template.Loading.onRendered(function() {});

Template.Loading.onDestroyed(function() {});
