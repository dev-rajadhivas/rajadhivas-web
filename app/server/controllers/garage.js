Meteor.methods({
    'insertgarage': function(name, address, longitude, latitude, district, province, phone, email, website, queue, loaner_car, guid, date, img, collection) {

        console.log("crete")
        Vcr.insert({
            "name": name,
            "address": address,
            "longitude": longitude,
            "latitude": latitude,
            "district": district,
            "province": province,
            "phone": phone,
            "email": email,
            "website": website,
            "queue": queue,
            "loaner_car": loaner_car,
            "guid": guid,
            "date": date,
            "img": img,
            "collection": collection


        })
    },




    'updategarage': function(_id, name, address, longitude, latitude, district, province, phone, email, website, queue, loaner_car, guid, editdate, img, collection) {

        var date = Vcr.findOne({_id: _id})

        Vcr.update({
            _id: _id,
            name: name,
            address: address,
            longitude: longitude,
            latitude: latitude,
            district: district,
            province: province,
            phone: phone,
            email: email,
            website: website,
            queue: queue,
            loaner_car: loaner_car,
            guid: guid,
            date: date.date,
            editdate: editdate,
            img: img,
            collection: collection
        })

    },


    'deletegarage': function(_id) {
        console.log("delete")
        Vcr.remove({ _id: _id, })

    },



});
