/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'couch_test': function() {
    var test = Menu.find();
    console.log("data", test.fetch());
    return test;
  },
  'updateAbout': function(data) {
    var _set = {
      doc_type: 'about_content',
      create_date: new Date(),
      content: data
    }
    Unity.insert(_set);
    return {
      status: true,
      msg: 'แก้ไขข้อมูลเสร็จสมบูรณ์'
    }
  }
});
