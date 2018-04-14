import Tabular from 'meteor/aldeed:tabular';
TabularTables = {};


TabularTables.boardcontent = new Tabular.Table({
  name: "boardcontent",
  collection: Boardcontent,
  responsive: true,
  autoWidth: false,
  columns: [{
    title: "No.",
    data: "content_id"
  }, {
    title: "หัวข้อ",
    data: "content_title",
  }, {
    title: "หมวดหมู่",
    data: "content_type",
  }, {
    title: "สร้างโดย",
    data: "create_by",
  }, {
    title: "สร้างเมื่อ",
    data: "create_date",
  }, {
    title: "อ่าน",
    data: "total_read"
  }, {
    title: "ตอบ",
    data: "total_write"
  }, {
    data: "_id",
    title: "การจัดการ",
    render: function(val, type, doc) {
      var html = "<button style='margin-left:6px' class='btn btn-sm btn-warning fa fa-pencil-square-o' id='btnEditContent' _id=" + val + "></button>";
      html += "<button style='margin-left:6px' class='btn btn-sm btn-danger fa fa-trash-o' id='btnDeleteContent' _id=" + val + "></button>";
      return html
    }
  }]
});
