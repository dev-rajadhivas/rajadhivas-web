/*****************************************************************************/
/* Garage: Event Handlers */
/*****************************************************************************/
Template.Garage.events({

    'click .create': function(e) {
        $('.value_garage').prop('disabled', false)
        $('.imgshow').hide();
        $('.imgupload').show();
        $('#myModalLabel').text('เพิ่มข้อมูล');
        $('.save_changes').show();
        clearInput('value_garage');
        $('#myModal').modal("show");
        $('.save_changes').attr('data-check', 'insertgarage');




    },

    'click .btnEdit': function(e) {
        var _id = $(e.target).attr('_id');
        $('.value_garage').prop('disabled', false)
        console.log("_id:", _id)
        $('.imgshow').hide();
        $('.imgupload').show();
        $('#myModalLabel').text('แก้ไขข้อมูล');
        $('.save_changes').show();
        $('#myModal').modal('show');
        $('.save_changes').attr('data-check', 'updategarage');
        $('.save_changes').attr('data-garage', _id);
        var querygarage = Vcr.findOne({ _id: _id });
        $('#name').val(querygarage.name);
        $('#address').val(querygarage.address);
        $('#longitude').val(querygarage.longitude);
        $('#latitude').val(querygarage.latitude);
        $('#district').val(querygarage.district);
        $('#province').val(querygarage.province);
        $('#phone').val(querygarage.phone);
        $('#email').val(querygarage.email);
        $('#website').val(querygarage.website);
        $('#queue').val(querygarage.queue);
        $('#loaner_car').val(querygarage.loaner_car);
        $('#guid').val(querygarage.guid);
        $('#img').val(querygarage.img);



    },


    'click .btnView': function(e) {

        var _id = $(e.target).attr('_id');
        $('.value_garage').prop('disabled', true)
        $('#myModalLabel').text('ข้อมูล');
        $('.save_changes').hide();
        $('.imgupload').hide();
        $('.imgshow').show();
        $('#myModal').modal('show');
        var querygarage = Vcr.findOne({ _id: _id });
        $('#name').val(querygarage.name);
        $('#address').val(querygarage.address);
        $('#longitude').val(querygarage.longitude);
        $('#latitude').val(querygarage.latitude);
        $('#district').val(querygarage.district);
        $('#province').val(querygarage.province);
        $('#phone').val(querygarage.phone);
        $('#email').val(querygarage.email);
        $('#website').val(querygarage.website);
        $('#queue').val(querygarage.queue);
        $('#loaner_car').val(querygarage.loaner_car);
        $('#guid').val(querygarage.guid);
       
        $('#img').val(querygarage.img);















    },


    'click .btnDelete': function(e) {

        var _id = $(e.target).attr('_id');
        var alertdialog = confirm("คุณต้องการลบหรือไม่");
        if (alertdialog == true) {
            Meteor.call('deletegarage', _id, function(e, result) {
                if (e) {

                } else {

                }
            });
        }
    },




    'click .save_changes': function(e) {
       
        var name = $('#name').val();
        var address = $('#address').val();
        var longitude = $('#longitude').val();
        var latitude = $('#latitude').val();
        var district = $('#district').val();
        var province = $('#province').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var website = $('#website').val();
        var queue = $('#queue').val();
        var loaner_car = $('#loaner_car').val();
        var guid = $('#guid').val();
        var img = $('#img').val();
        var collection = ('garage');
        var editdate = moment().format('YYYY-DD-MM HH:mm:ss');
        var _id = $(e.target).attr('data-garage');
        var check = $(e.target).attr('data-check');
        if (check == 'insertgarage') {
            var date = moment().format('YYYY-DD-MM HH:mm:ss');
            Meteor.call('insertgarage', name,address,longitude,latitude,district,province,phone,email,website,queue,loaner_car,guid,date,img,collection, function(error, result) {
                if (error) {
                    alert('เกิดข้อผิดพลาด');
                } else {
                    $('#myModal').modal('hide');
                }
            })
        } else {
            Meteor.call('updategarage', _id, name,address,longitude,latitude,district,province,phone,email,website,queue,loaner_car,guid,editdate,img,collection, function(error, result) {
                if (error) {
                    alert("เกิดข้ อผิดพลาด");

                } else {

                    $('#myModal').modal('hide');


                }
            })
        }





        // Meteor.call('couch_test');
    },

    'click #startuploadfile': function(e) {
        Uploader.startUpload.call(Template.instance(), e);
    },




});

/*****************************************************************************/
/* Garage: Helpers */
/*****************************************************************************/
Template.Garage.helpers({



    Garage: function() {
        console.log(Vcr.find({ collection: 'garage' }).fetch());
        return Vcr.find({ collection: 'garage' }).fetch();
    },

    tableSettings: function() {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'name', label: 'Garage' },
                { key: 'address', label: 'Address' },
                { key: 'latitude', label: 'Latitude' },
                { key: 'longitude', label: 'Longitude' }, {
                    key: '_id',
                    label: 'Action',

                    fn: function(val, type, doc) {
                        return Spacebars.SafeString('<button type="button" class="btn btnView btn-info" _id=' + val + ' "><i class="fa fa-eye" _id=' + val + ' aria-hidden="true"></i></button> <button type="button" class="btn btnEdit btn-warning" _id=' + val + ' "><i class="fa fa-pencil-square-o" _id=' + val + ' aria-hidden="true"></i></button> <button type="button"  class="btn btnDelete btn-danger" _id=' + val + '><i class="fa fa-trash-o" _id=' + val + ' aria-hidden="true"></i></button>')
                    }

                },
            ]
        };
    }




});

/*****************************************************************************/
/* Garage: Lifecycle Hooks */
/*****************************************************************************/
Template.Garage.onCreated(function() {




});

Template.Garage.onRendered(function() {

    Meteor.subscribe('Vcr_garage');


});


Template.Garage.onDestroyed(function() {});
