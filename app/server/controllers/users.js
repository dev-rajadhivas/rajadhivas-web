Meteor.methods({
  'getTotalUsers': function() {
    var userDB = Meteor.users.find({
      'profile.level': {
        $ne: 'ผู้ดูแลระบบ'
      }
    }).fetch();
    var result = {};
    result.total = userDB.length;
    result.total_master = _.filter(userDB, function(data) {
      return data.profile.level == "อาจารย์"
    }).length;
    result.total_student = _.filter(userDB, function(data) {
      return data.profile.level == "นักเรียน"
    }).length;
    result.total_parent = _.filter(userDB, function(data) {
      return data.profile.level == "ผู้ปกครอง"
    }).length;
    result.total_user = _.filter(userDB, function(data) {
      return data.profile.level == "บุคคลทั่วไป"
    }).length;
    return result
  },
  'removeUser': function(_id) {
    Meteor.users.remove({
      _id: _id
    });
    return {
      status: true,
      msg: 'ลบข้อมูลเสร็จสมบูรณ์'
    }
  },
  'createUserData': function(data) {
    // เช็คซ้ำ
    var checkDupUser = Meteor.users.findOne({
      $or: [{
        username: data.username
      }, {
        'profile.email': data.email
      }]
    });
    if (checkDupUser) {
      return {
        status: false,
        msg: 'ไม่สามารถสร้างผู้ใช้ได้เนื่องจาก ชื้อผู้ใช้ หรือ อีเมล ถูกใช้ไปแล้ว'
      }
    }
    // สร้าง User
    var createUser = {
      username: data.username,
      password: data.password,
      email: data.email
    }
    delete data.password;
    var profile = data;
    profile.user_id = autoInc('user_id');
    profile.active = true;
    profile.userrole = data.level === "ผู้ดูแลระบบ" ? 1 : data.level === "อาจารย์" ? 2 : data.level === "ผู้ปกครอง" ? 3 : data.level === "นักเรียน" ? 4 : data.level === "บุคคลทั่วไป" ? 5 : 2;
    profile.fullname = (data.prename ? data.prename : "คุณ") + data.firstname + ' ' + data.lastname;
    createUser.profile = profile;
    var account = Accounts.createUser(createUser);
    return {
      status: true,
      msg: 'สร้างผู้ใช้เสร็จสมบูรณ์'
    }
  },
  'editUserData': function(data, _id) {
    // เช็คซ้ำ
    var userDB = Meteor.users.findOne({
      _id: _id
    });
    if (userDB.profile.email != data.email) {
      var checkDupUser = Meteor.users.findOne({
        'profile.email': data.email
      });
      if (checkDupUser) {
        return {
          status: false,
          msg: 'ไม่สามารถสร้างผู้ใช้ได้เนื่องจาก อีเมล ถูกใช้ไปแล้ว'
        }
      }
    }
    // สร้าง User
    var updateUser = {};
    var profile = data;
    profile.userrole = data.level === "ผู้ดูแลระบบ" ? 1 : data.level === "อาจารย์" ? 2 : data.level === "ผู้ปกครอง" ? 3 : data.level === "นักเรียน" ? 4 : data.level === "บุคคลทั่วไป" ? 5 : 2;
    profile.fullname = (data.prename ? data.prename : "คุณ") + data.firstname + ' ' + data.lastname;
    updateUser.profile = profile;
    Meteor.users.update({
      _id: _id
    }, {
      $set: updateUser
    })
    return {
      status: true,
      msg: 'แก้ไขผู้ใช้เสร็จสมบูรณ์'
    }
  },
  'changePasswordUser': function(data, _id) {
    Accounts.setPassword(_id, data.password);
    return {
      status: true,
      msg: 'เปลี่ยนรหัสผ่านผู้ใช้เสร็จสมบูรณ์'
    }
  }
})