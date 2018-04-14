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
  },
  'setroom': function() {
    var room = [6, 6, 6, 4, 4, 4];
    _.each(room, function(v, k) {
      for (var i = 1; i <= v; i++) {
        var data = {
          room_id: autoInc('room_id'),
          room_name: (k + 1) + '/' + i,
          create_date: new Date()
        }
        Room.insert(data);
      }
    });
    return 'done'
  }
});
