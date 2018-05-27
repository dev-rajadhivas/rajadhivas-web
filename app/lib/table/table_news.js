import Tabular from 'meteor/aldeed:tabular';
TabularTables = {};


TabularTables.newsList = new Tabular.Table({
  name: "newsList",
  collection: News,
  responsive: true,
  autoWidth: false,
  extraFields: ['path', 'content', 'category_id', 'category', 'hotnews', 'expiry_date'],
  order: [[2, "desc"]],
  columns: [{
    data: "category",
    title: "ประเภท",
  }, {
    data: "title",
    title: "หัวข้อ",
  }, {
    data: "create_date",
    title: "วันที่เพิ่ม",
    render: function(val, type, doc) {
      return thaiDate(val)
    }
  }, {
    data: "news_id",
    title: "การจัดการ",
    render: function(val, type, doc) {
      var html = "<button  style='margin-left:6px' class='btn btn-sm btnEditNews btn-warning fa fa-pencil-square-o' news_id=" + val + "></button>"
      html += "<button  style='margin-left:6px' class='btn btn-sm btn_DeleteNews btn-danger fa fa-trash-o' news_id=" + doc._id + "></button>"
      return html
    }
  }]
});
