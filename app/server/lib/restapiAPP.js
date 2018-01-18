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
        if (dataNews) {
            var response_ = { status: true, data: dataNews };
        }
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
                    HTTP.call('POST', 'http://35.200.226.242:8100/subscribe', noti_send, function(error, result) {
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
        var check = validatePost(_post);
        if (check) {
            _post.news_id = [];
            _post.favorite_news_id = [];
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
            var data = News.find({ hotnews: false, news_id: { $nin: user.profile.news_id } }).fetch();
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