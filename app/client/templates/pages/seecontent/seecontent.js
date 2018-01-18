/*****************************************************************************/
/* Seecontent: Event Handlers */
/*****************************************************************************/
Template.Seecontent.events({
});

/*****************************************************************************/
/* Seecontent: Helpers */
/*****************************************************************************/
Template.Seecontent.helpers({
});

/*****************************************************************************/
/* Seecontent: Lifecycle Hooks */
/*****************************************************************************/
Template.Seecontent.onCreated(function () {
});

Template.Seecontent.onRendered(function () {
	$('#summernote').summernote();
	 $('.note-image-popover').remove();
	 $('.note-link-popover').remove();
	 $('.arrow').remove();

});

Template.Seecontent.onDestroyed(function () {
});
