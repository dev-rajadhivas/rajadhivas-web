/*****************************************************************************/
/* Table: Event Handlers */
/*****************************************************************************/
Template.Table.events({
	'click .save_changes':function(e){
		var name_item = $("#name_item").val();
		var group_item = $("#group_item").val();
		var price_item = $("#price_item").val();
		var shop_name = $("#shop_name").val();
		var date = $("#date").val();
		Stock.insert({
						"name_item" : name_item, 
						"group_item" : group_item, 
						"price_item" : price_item, 
						"shop_name" : shop_name,
						"date" : date
					});
		$("#myModal").modal('hide');
		$('#myModal').on('hidden.bs.modal', function () {
    	$(this).find("input,textarea,select").val('').end();
		});
		Meteor.call('couch_test');
	}
});
/*****************************************************************************/
/* Table: Helpers */
/*****************************************************************************/
Template.Table.helpers({

	 Stock : function () {
	 	console.log(Stock.find().fetch());
      return Stock.find().fetch();
    },
	tableSettings : function () {
      return {
      	rowsPerPage: 10,
      	showFilter: true,
        fields: [
            { key: 'name_item', label: 'ชื่อร้าน' },
            { key: 'group_item', label: 'ประเภท' },
            { key: 'price_item', label: 'ราคา' },
            { key: 'shop_name', label: 'ชื่อร้าน' },
            { key: 'date', label: 'เวลา' }
          ]
      };
    }
});
/*****************************************************************************/
/* Table: Lifecycle Hooks */
/*****************************************************************************/
Template.Table.onCreated(function() {
	Meteor.subscribe('Stock');
});
Template.Table.onRendered(function() {});
Template.Table.onDestroyed(function() {});