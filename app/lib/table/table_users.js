import Tabular from 'meteor/aldeed:tabular';
TabularTables = {};


TabularTables.usersList = new Tabular.Table({
  name: "usersList",
  collection: Meteor.users,
  responsive: true,
  autoWidth: false,
  columns: [{
    title: "Username",
    data: "username"
  }, {
    title: "ชื่อ",
    data: "profile.firstname",
  }, {
    title: "นามสกุล",
    data: "profile.lastname",
  }, {
    title: "อีเมล",
    data: "profile.email",
  }, {
    title: "สถานะ",
    data: "profile.level",
  }, {
    title: "ห้อง",
    data: "profile.room",
    render: function(val) {
      var roomDB = Room.findOne({
        room_id: parseInt(val)
      });
      return roomDB ? roomDB.room_name : "-";
    }
  }, {
    data: "_id",
    title: "การจัดการ",
    render: function(val, type, doc) {
      var html = "<button style='margin-left:6px' class='btn btn-sm btn-warning fa fa-pencil-square-o' id='btnEditUser' _id=" + val + "></button>";
      html += "<button style='margin-left:6px' class='btn btn-sm btn-danger fa fa-unlock-alt' id='btnChangePasswordUser' _id=" + val + "></button>";
      html += "<button style='margin-left:6px' class='btn btn-sm btn-danger fa fa-trash-o' id='btnDeleteuser' _id=" + val + "></button>";
      return html
    }
  }]
});
