UploadImage= function(album, Oldimage,album_path_old,count,action) {
        var fs = Npm.require("fs");
        var baseUrl = process.env.PWD + '/public/.#upload';
        var path = baseUrl + album
        console.log('path',path)
        if (action=='insert') {
            if (count==1) {
            var a = fs.mkdirSync(path)
        }
        }
        

        var fileold = baseUrl +album_path_old+Oldimage;
        var filenew = baseUrl + album + Oldimage;
        console.log('fileold',fileold)
        console.log('filenew',filenew)
        var b = fs.renameSync(fileold, filenew);
        // fs.mkdir(baseUrl + album, function(e) {
        //     var fileold = baseUrl + Oldimage;
        //     var filenew = baseUrl + album + "/" + Oldimage;
        //     fs.renameSync(fileold, filenew);
        //     // console.log("Oldimage : " + Oldimage);

        // });
        return "/upload" + album + Oldimage;
    }