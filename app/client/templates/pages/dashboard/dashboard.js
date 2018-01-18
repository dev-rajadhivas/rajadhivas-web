/*****************************************************************************/
/* Dashboard: Event Handlers */
/*****************************************************************************/
Template.Dashboard.events({
	'click #test01':function(){
		Meteor.call("couch_test",function(result){
			console.log(result);
		});
	}
});

/*****************************************************************************/
/* Dashboard: Helpers */
/*****************************************************************************/
Template.Dashboard.helpers({

	Show : function () {
	 	console.log(Menu.find().fetch());
      return Menu.find().fetch();
    },
	tableSettings : function () {
      return {
        rowsPerPage: 10,
        showFilter: true,
        fields: [
            { key: 'menu_name', label: 'ชื่ออาหาร' },
            { key: 'menu_price', label: 'ราคา' },
            { key: 'table_name', label: 'โต๊ะ' },
            { key: 'username', label: 'ชื่อพนักงาน' },
            { key: 'queue_update', label: 'เวลา' }
          ]
      };
    }
});

/*****************************************************************************/
/* Dashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.Dashboard.onCreated(function () {
	 Meteor.subscribe('Menu');
});

Template.Dashboard.onRendered(function () {
});

Template.Dashboard.onDestroyed(function () {
});
