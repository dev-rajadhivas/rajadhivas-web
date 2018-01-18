/*****************************************************************************/
/* Linxgroup: Event Handlers */
/*****************************************************************************/
Template.Linxgroup.events({
    'click #btn_add': function() {
        clearInput("detailForm");
        $("#saveModal").attr('mode', 'add');
        $("#modalManage").modal('show');
    },
    'click #btn_edit': function(e) {
        var id = $(e.currentTarget).attr('data_id');
        var data = Groups.findOne({ group_id: parseInt(id) });
        arrayToInput('detailForm', data);
        $("#saveModal").attr('mode', 'edit');
        $("#modalManage").modal('show');
        $("#saveModal").attr('data_id', id);
    },
    'click #saveModal': function(e) {

        var data = inputToArray('detailForm');
        var mode = $(e.currentTarget).attr('mode');
        if (mode == 'add') {
            Meteor.call('insert_group', data, function(error, result) {
                $("#modalManage").modal('hide');
            });
        } else {
            data.group_id = parseInt($(e.currentTarget).attr('data_id'));
            Meteor.call('update_group', data, function(error, result) {
                $("#modalManage").modal('hide');
            });
        }
    }
});

/*****************************************************************************/
/* Linxgroup: Helpers */
/*****************************************************************************/
Template.Linxgroup.helpers({});

/*****************************************************************************/
/* Linxgroup: Lifecycle Hooks */
/*****************************************************************************/
Template.Linxgroup.onCreated(function() {

});

Template.Linxgroup.onRendered(function() {});

Template.Linxgroup.onDestroyed(function() {});
