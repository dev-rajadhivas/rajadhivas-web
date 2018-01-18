Meteor.methods({
  'add_news': function(data, path) {
    if (path) {
      data.path = path;
    }
    data.create_date = new Date();
    data.news_id = autoInc('news_id');
    News.insert(data);
    if (data.hotnews) {
      var noti_send = {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          "android": {
            "collapseKey": "optional",
            "data": {
              "message": data.title
            }
          }
        }
      }
      HTTP.call('POST', 'http://localhost:8100/send', noti_send, function(error, result) {
        if (!error) console.log('send notification error:', error);
      });
    }
    return {
      status: true,
      msg: 'สร้างข่าวเสร็จสมบูรณ์',
      news_id: data.news_id
    };
  },
  update_news: function(news_id, data, path) {
    if (path) {
      data.path = path
    }
    News.update({
      "news_id": news_id
    }, {
      $set: data
    });
    return {
      status: true,
      msg: 'แก้ไขข้อมูลเสร็จสมบูรณ์'
    };
  },
  delete_news: function(_id) {
    News.remove({
      "_id": _id
    });
    return {
      status: true,
      msg: 'ลบข้อมูลเสร็จสมบูรณ์'
    };
  },
  uploadimgnews: function(news_id, path) {
    News.update({
      "news_id": news_id
    }, {
      $set: {
        'path': path
      }
    });
    return {
      status: true,
      msg: 'แก้ไขสำเร็จ'
    }
  }
});
