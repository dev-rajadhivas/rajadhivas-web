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
            return data.profile.level == "ครู"
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
            }, {
                'emails.address': data.email
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
        profile.userrole = data.level === "ผู้ดูแลระบบ" ? 1 : data.level === "ครู" ? 2 : data.level === "ผู้ปกครอง" ? 3 : data.level === "นักเรียน" ? 4 : data.level === "บุคคลทั่วไป" ? 5 : 2;
        profile.fullname = (data.prename ? data.prename : "คุณ") + data.firstname + ' ' + data.lastname;
        profile.news_id = [];
        profile.favorite_news_id = [];
        createUser.profile = profile;
        console.log(createUser);
        var account = Accounts.createUser(createUser);
        console.log(account);
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
        profile.userrole = data.level === "ผู้ดูแลระบบ" ? 1 : data.level === "ครู" ? 2 : data.level === "ผู้ปกครอง" ? 3 : data.level === "นักเรียน" ? 4 : data.level === "บุคคลทั่วไป" ? 5 : 2;
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
    },
    'forgetPasswordUser': function(mail) {
        var result = {
            status: false
        };
        var userDB = Meteor.users.findOne({
            'profile.email': mail
        });
        if (userDB) {
            if (userDB.profile.email) {
                var new_password = Random.id(6);
                Accounts.setPassword(userDB._id, new_password);
                var html = "ชื่อผู้ใช้ : <b>" + userDB.username + "</b><br>";
                html += "รหัสผ่าน : <b>" + new_password + "</b><br>";
                html += "สามารถนำรหัสไปเปลี่ยนได้ใน Mobile Application</a>";
                Email.send({
                    from: 'dev.rajadhivas@gmail.com',
                    to: userDB.profile.email,
                    subject: 'โรงเรียนวัดราชาธิวาส',
                    html: html

                });
                result.status = true;
                result.msg = 'รหัสใหม่ถูกส่งไปที่ ' + userDB.profile.email + ' เรียบร้อยแล้ว กรุณาตรวจที่สอบอีเมลอีกครั้งเพื่อรับรหัสผ่านใหม่';
            } else {
                result.msg = 'ไม่พบอีเมล';
            }
        } else {
            result.msg = 'ไม่พบผู้ใช้นี้';
        }
        return result;
    }
})
