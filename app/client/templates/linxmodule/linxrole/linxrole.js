/*****************************************************************************/
/* Linxrole: Event Handlers */
/*****************************************************************************/
Template.Linxrole.events({
    'click #btn_add': function() {
        clearInput("detailForm");
        $("#saveModal").attr('mode', 'add');
        $("#modalManage").modal('show');
    },
    'click #btn_edit': function(e) {
        var id = $(e.currentTarget).attr('data_id');
        var data = Roles.findOne({ role_id: parseInt(id) });
        arrayToInput('detailForm', data);
        $("#saveModal").attr('mode', 'edit');
        $("#modalManage").modal('show');
        $("#saveModal").attr('data_id', id);
    },
    'click #saveModal': function(e) {

        var data = inputToArray('detailForm');
        var mode = $(e.currentTarget).attr('mode');
        if (mode == 'add') {
            Meteor.call('insert_role', data, function(error, result) {
                $("#modalManage").modal('hide');
            });
        } else {
            data.role_id = parseInt($(e.currentTarget).attr('data_id'));
            Meteor.call('update_role', data, function(error, result) {
                $("#modalManage").modal('hide');
            });
        }
    }
});

/*****************************************************************************/
/* Linxrole: Helpers */
/*****************************************************************************/
Template.Linxrole.helpers({});

/*****************************************************************************/
/* Linxrole: Lifecycle Hooks */
/*****************************************************************************/
Template.Linxrole.onCreated(function() {

});

Template.Linxrole.onRendered(function() {});

Template.Linxrole.onDestroyed(function() {});
