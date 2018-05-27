import Tabular from 'meteor/aldeed:tabular';
TabularTables = {};

TabularTables.boardcontent = new Tabular.Table({
    name: "boardcontent",
    collection: Boardcontent,
    responsive: true,
    autoWitdh: false,
    order: [
        [4, 'desc']
    ],
    extraFields: ['content_id'],
    columns: [{
        title: "No.",
        render: function(a, b, c, d) {
            return d.row + 1
        }
    }, {
        title: "หัวข้อ",
        data: "content_title"
    }, {
        title: "หมวดหมู่",
        data: "content_type",
    }, {
        title: "สร้างโดย",
        data: "create_by_name"
    }, {
        title: "สร้างเมื่อ",
        data: "create_date",
        render: function(val) {
            return thaiDate(val)
        }
    }, {
        title: "อ่าน",
        data: "content_read"
    }, {
        title: "ตอบ",
        data: "content_answer"
    }, {
        data: "_id",
        title: "การจัดการ",
        render: function(val, type, doc) {
            var html = "<button style='margin-left:6px' class='btn btn-sm btn-warning fa fa-pencil-square-o' id='btnReadContent' _id=" + val + " content_id=" + doc.content_id + "></button>";
            html += "<button style='margin-left:6px' class='btn btn-sm btn-danger fa fa-trash-o' id='btnDeleteContent' _id=" + val + " content_id=" + doc.content_id + "></button>";
            return html
        }
    }]
});
