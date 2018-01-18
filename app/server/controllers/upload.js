Meteor.methods({
  'insertupload': function(category, title, content, img, date, collection) {
    var object = {}
    console.log("crete")
    var vcr_id = autoInc('vcr')
    var a = Vcr.insert({
      "category": category,
      "title": title,
      "content": content,
      "date": date,
      "img": img,
      "collection": collection,
      'vcr_id': vcr_id

    })
    object.vcr_id = vcr_id
    object._id = a
    return object;
  },

  'mvfile': function(category, title, content, date, collection, album, arrayimg, _id, album_path_old, vcr_id) {
    console.log('album', album)
    var count = 0
    var array = []
    _.each(arrayimg, function(v, k, l) {
      count++
      var path = UploadImage(album, v, album_path_old, count, 'insert')

      array.push(path)

    })

    return Vcr.update({
      _id: _id,
      "category": category,
      "title": title,
      "content": content,
      "date": date,
      "collection": collection,
      'vcr_id': vcr_id,
      'img': array

    })

  },

  'mvfileupdate': function(category, title, content, date, collection, album, arrayimg, editimg_array, _id, album_path_old, vcr_id) {
    console.log('album', album)
    var count = 0
    var array = editimg_array
    _.each(arrayimg, function(v, k, l) {
      count++
      var path = UploadImage(album, v, album_path_old, count, 'update')

      array.push(path)

    })

    return Vcr.update({
      _id: _id,
      "category": category,
      "title": title,
      "content": content,
      "date": date,
      "collection": collection,
      'vcr_id': vcr_id,
      'img': array

    })

  },



  'updateupload': function(_id, category, title, content, img, date, collection, removeimg_array) {
    var fs = require('fs');
    var object = {}
    _.each(removeimg_array, function(v, k, l) {
      var path = v.split("/upload");
      fs.unlinkSync('/home/admin/LinxStationONE/app/public/.#upload' + path[1])
    });
    var vcr_id = Vcr.findOne({
      _id: _id
    })
    var a = Vcr.update({
      '_id': _id,
      "category": category,
      "title": title,
      "content": content,
      "date": date,
      "img": img,
      "collection": collection,
      'vcr_id': vcr_id.vcr_id

    })
    object.vcr_id = vcr_id.vcr_id
    object._id = a
    return object;




  },


  'deleteupload': function(_id) {
    console.log("delete")
    Vcr.remove({
      _id: _id,
    })

  },



});
