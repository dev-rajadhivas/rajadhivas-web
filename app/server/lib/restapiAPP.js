validatePost = function(value) {
    var c = 0;
    for (var key in value) {
        c++;
        // console.log(key + " : ", value[key], "[" + getType(value[key]) + "]");
        if (!value[key] || value[key] === "undefined") {
            return false;
        }
    }
    return c > 0 ? true : false;

    function getType(v) {
        return (v === null) ? 'null' : (v instanceof Array) ? 'array' : typeof v;
    }
};
// #############################################################################
// ดึงข้อมูลข่าว
Router.route('/queryNews', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = { status: false, messages: "Data Not Found" };
        // var check = validatePost(this.request.body);
        // if (check) {
        var _post = this.request.body;
        var dataNews = News.find().fetch();
        // var dataNews = News.find({ expiry_date: { $gte: new Date() } });
        // response_ = { status: true, data: dataNews };
        response_.status = true;
        response_.data = dataNews.length > 0 ? dataNews : [];
        // }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));

    }
});
// #############################################################################
// ดึงประวัติโรงเรียน
Router.route('/queryContact', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = { status: false, messages: "Data Not Found" };
        // var check = validatePost(this.request.body);
        // if (check) {
        var _post = this.request.body;
        var contact = Unity.findOne({}, { sort: { create_date: -1 } });
        if (contact) {
            var response_ = { status: true, data: contact };
        }
        // }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));

    }
});
// #############################################################################
// ล้อคอิน
Router.route('/signin', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = "";
        var _post = this.request.body;
        var check = validatePost(_post);
        if (check) {
            var user = Meteor.users.findOne({
                "username": _post.username
            });
            var password = user ? Accounts._checkPassword(user, _post.password) : false;
            if (password.error) {
                response_ = {
                    "messages": "username หรือ password ไม่ถุกต้อง",
                    "status": false
                };
            } else if (password && !password.error) {
                var user = Meteor.users.findOne({
                    "_id": password.userId
                });
                if (user) {
                    //data update profile
                    var profile_update = new Object();
                    profile_update = user.profile;
                    profile_update.devicetoken = _post.devicetoken;
                    Meteor.call("editUserData", profile_update, user._id);
                    //data send push notification
                    var noti_send = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: {
                            "user": user.username,
                            "type": "android",
                            "token": _post.devicetoken
                        }
                    }
                    HTTP.call('POST', 'http://rajadhivas.ddns.net:8100/subscribe', noti_send, function(error, result) {
                        if (!error) console.log('send notification error:', error);
                    });
                    //data return app
                    var profile = new Object();
                    profile = user.profile;
                    profile._id = user._id;
                    response_ = {
                        "data": profile,
                        "status": true
                    };
                }
            } else {
                response_ = {
                    "status": false,
                    "messages": "ไม่พบ username หรือ password นี้"
                };
            }
        } else {
            response_ = {
                "status": false,
                "messages": "No Data Found"
            };
        }

        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// สมัครสมาชิก
Router.route('/register', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = "";
        var _post = this.request.body;
        // var check = validatePost(_post);
        // console.log(check, _post);
        if (_post.email) {
            var response_ = Meteor.call("createUserData", _post);
        } else {
            response_ = {
                "status": false,
                "messages": "ไม่พบ Token บนมือถือเครื่องนี้"
            };
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// อัปเดทข่าวที่อ่านแล้ว
Router.route('/readNews', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = "";
        var _post = this.request.body;
        if (_post && _post._id) {
            console.log(_post)
            response_ = Meteor.call("editUserData", _post, _post._id);
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// กรองข่าว
Router.route('/newsFilter', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post && _post._id) {
            var user = Meteor.users.findOne({ _id: _post._id });
            var profile_news_id = user.profile.news_id ? user.profile.news_id : [];
            // var data = News.find({ hotnews: false, news_id: { $nin: user.profile.news_id } }).fetch();
            var data = News.find({ hotnews: false, news_id: { $nin: profile_news_id } }).fetch();
            response_ = {
                "status": true,
                "data": data
            };
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// เพิ่มข่าวที่ชอบ
Router.route('/favorites', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = "";
        var _post = this.request.body;
        if (_post && _post._id) {
            console.log(_post);
            response_ = Meteor.call("editUserData", _post, _post._id);
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// ดึงข่าวที่ชอบ
Router.route('/queryfavorites', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post && _post._id) {
            var user = Meteor.users.findOne({ _id: _post._id });
            console.log(user.profile.favorite_news_id);
            response_.status = true;
            response_.data = user.profile.favorite_news_id ? user.profile.favorite_news_id : [];
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// ค้นหาข่าว
Router.route('/newsSearch', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = "";
        var _post = this.request.body;
        var check = validatePost(_post);
        if (check) {
            // var query = new Object();
            // query.hotnews = false;
            // query.title = { $regex: _post.searchKey };
            // query.content = { $regex: _post.searchKey };
            // var data = News.find(query).fetch();
            // response_ = {
            //     "status": true,
            //     "data": data
            // };

            var query = [];
            var fields = ['title', 'content', 'category'];
            for (var i = 0; i < fields.length; i++) {
                var array = {};
                array[fields[i]] = {
                    '$regex': _post.searchKey
                };
                query.push(array);
            }
            var query2 = {
                hotnews: false,
                $or: query
            };
            var data = News.find(query2).fetch();
            response_ = {
                "status": true,
                "data": data
            };
        } else {
            response_ = {
                "status": false,
                "messages": "ไม่พบข่าวที่ค้นหา"
            };
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// เปลี่ยนรหัสผ่าน
Router.route('/changePassword', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post && _post._id) {
            var update = Meteor.call("changePasswordUser", _post, _post._id);
            if (update.status === true) {
                response_ = {
                    "status": update.status,
                    "messages": update.msg
                };
            } else {
                response_ = {
                    "status": false,
                    "messages": "เกิดข้อผิดพลาด"
                };
            }
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// เปลี่ยนรหัสผ่าน
Router.route('/forgetPassword', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post) {
            var userDB = Meteor.users.findOne({
                "profile.email": _post.email
            });
            if (userDB) {
                // var reset = Meteor.call("forgetPasswordUser", userDB._id);
                var reset = Meteor.call("forgetPasswordUser", _post.email);
                if (reset.status === true) {
                    response_ = {
                        "status": reset.status,
                        "messages": reset.msg
                    };
                } else {
                    response_ = {
                        "status": false,
                        "messages": reset.msg
                    };
                }
            } else {
                response_ = {
                    "status": false,
                    "messages": "ไม่พบ email กรุณาตรวจสอบใหม่อีกครั้ง"
                };
            }
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// สร้างบอร์ด
Router.route('/insertBoard', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post.content_title) {
            // _post.create_date = new Date();
            console.log(_post)
            var data = new Object();
            switch (_post.view_type) {
                case "เฉพาะชั้นปี":
                    data.content_title = _post.content_title;
                    data.content_type = _post.content_type;
                    data.room_id = _post.room_id;
                    data.content_detail = _post.content_detail;
                    data.active_permission = true;
                    data.create_by = _post.create_by;
                    data.create_by_name = _post.create_by_name;
                    break;
                case "ทั่วไป":
                    data.content_title = _post.content_title;
                    data.content_type = _post.content_type;
                    data.room_id = null;
                    data.content_detail = _post.content_detail;
                    data.active_permission = false;
                    data.create_by = _post.create_by;
                    data.create_by_name = _post.create_by_name;
                    break;
            }
            var create_board = Meteor.call("create_board_content", data);
            if (create_board) {
                response_.status = create_board.status;
                response_.messages = create_board.msg;
            }
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// รายการบอร์ด
Router.route('/BoardList', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post.room_id || _post.room_id === null) {
            console.log(_post.room_id)
            // var data = Boardcontent.find({ room_id: _post.room_id, active_permission: _post.active_permission }).fetch();
            var data = Boardcontent.find({
                $or: [{
                    active_permission: false
                }, {
                    active_permission: true,
                    room_id: _post.room_id ? parseInt(_post.room_id) : 0
                }]
            }).fetch();
            response_.status = true;
            response_.data = data.length > 0 ? data : [];
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// นับจำนวนการอ่านบอร์ด
Router.route('/Boardread', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post._id) {
            var read = Meteor.call("update_read_board_content", _post._id);
            if (read.status === true) {
                response_.status = true;
            } else {
                response_.status = false;
                response_.messages = read.msg;
            }
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// รายการบอร์ด
Router.route('/BoardOnelist', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post.content_id) {
            var data = Boardcontent.findOne({ content_id: parseInt(_post.content_id) });
            if (data) {
                response_.status = true;
                response_.data = data;
            } else {
                response_.status = false;
                response_.messages = "ไม่สามารถแสดงข้อมูลบอร์ดได้ กรุณาตรวจสอบใหม่อีกครั้ง";
            }
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// คอมเม้น
Router.route('/BoardComment', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post.content_id) {
            var data = Subboardcontent.find({ content_id: _post.content_id }).fetch();
            response_.status = true;
            response_.data = data.length > 0 ? data : [];
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});

// #############################################################################
// เพิ่มคอมเม้น
Router.route('/BoardcreateComment', {
    where: 'server',
    action: function() {
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var response_ = new Object();
        var _post = this.request.body;
        if (_post.content_id) {
            var read = Meteor.call("create_board_sub_content", _post);
            if (read.status === true) {
                response_.status = true;
            } else {
                response_.status = false;
                response_.messages = read.msg;
            }
        }
        this.response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.response.end(JSON.stringify(response_));
    }
});