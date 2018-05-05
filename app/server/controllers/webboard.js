Meteor.methods({
    remove_board_content: function(data) {
        var result = {
            status: true,
            msg: "ลบกระทู้เสร็จสบบูรณ์"
        }
        if (data.user_role != 1) {
            var remove_status = Boardcontent.remove({
                _id: data._id,
                create_by: data.user_id
            });
            if (remove_status) {
                Subboardcontent.remove({
                    content_id: data.content_id
                })
            } else {
                result.status = false;
                result.msg = "ไม่สามารถลบกระทู้ได้ เนื่องจากคุณไม่ใช่เจ้าของกระทู้";
            }
        } else {
            var remove_status = Boardcontent.remove({
                _id: data._id
            });
            Subboardcontent.remove({
                content_id: data.content_id
            })
            if (!remove_status) {
                result.status = false;
                result.msg = "ไม่สามารถลบกระทู้ได้ เนื่องจากปัญหาบางประการ";
            }
        }
        return result;
    },
    create_board_content: function(data) {
        data.create_date = new Date();
        data.content_id = autoInc('content_id');
        data.content_read = 0;
        data.content_answer = 0;
        var create_status = Boardcontent.insert(data);
        var result = {
            status: true,
            msg: "สร้างกระทู้เสร็จสบบูรณ์",
            content_id: data.content_id
        }
        if (!create_status) {
            result.status = false;
            result.msg = "ไม่สามารถสร้างกระทู้ได้ เนื่องจากปัญหาบางประการ"
        }
        return result;
    },
    update_read_board_content: function(_id) {
        var update_status = Boardcontent.update({
            _id: _id
        }, {
            $inc: {
                content_read: 1
            }
        });
        var result = {
            status: true
        }
        if (!update_status) {
            result.status = false;
            result.msg = "ไม่สามารถเข้ากระทู้ได้ เนื่องจากปัญหาบางประการ"
        }
        return result;
    },
    create_board_sub_content: function(data) {
        // update content answer
        Boardcontent.update({
            content_id: data.content_id
        }, {
            $inc: {
                content_answer: 1
            }
        });
        // ==============
        data.create_date = new Date();
        data.content_sub_id = autoInc('content_sub_id');
        var create_status = Subboardcontent.insert(data);
        var result = {
            status: true,
            msg: "ตอบกระทู้เสร็จสบบูรณ์"
        }
        if (!create_status) {
            result.status = false;
            result.msg = "ไม่สามารถตอบกระทู้ได้ เนื่องจากปัญหาบางประการ"
        }
        return result;
    },
    remove_board_content_sub: function(data) {
        data.delete_status = true;
        data.delete_date = new Date();
        data.content_sub_id = parseInt(data.content_sub_id);
        var result = {
            status: true,
            msg: "ลบกระทู้เสร็จสบบูรณ์"
        }
        Subboardcontent.update({
            content_sub_id: data.content_sub_id
        }, {
            $set: data
        })
        return result;
    },
    edit_board_sub_content: function(data) {
        var result = {
            status: true,
            msg: "แก้ไขข้อมูลเสร็จสบบูรณ์"
        }
        data.update_date = new Date();
        Subboardcontent.update({
            content_sub_id: data.content_sub_id
        }, {
            $set: data
        })
        return result;
    },
    edit_board_content: function(data) {
        var result = {
            status: true,
            msg: "แก้ไขข้อมูลเสร็จสบบูรณ์"
        }
        data.update_date = new Date();
        Boardcontent.update({
            content_id: data.content_id
        }, {
            $set: data
        })
        return result;
    }
});
