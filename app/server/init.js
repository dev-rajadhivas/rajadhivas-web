Meteor.startup(function() {
  process.env.MAIL_URL='smtps://thaiwhitehat%40gmail.com:thaiwhitehat%402017@smtp.gmail.com:465'
  // Push.Configure({
  //   "gcm": {
  //     "apiKey": "AIzaSyAWSw2mKUabyCizC0pOTT3ZT-QdUFiU02k",
  //     "projectNumber": 77660472674
  //   },
  //   "production": false,
  //   "badge": true,
  //   "sound": true,
  //   "alert": true,
  //   "vibrate": true
  // });

  UploadServer.init({
    tmpDir: process.env.PWD + '/public/.#upload',
    uploadDir: process.env.PWD + '/public/.#upload',
    uploadUrl: '/upload',
    checkCreateDirectories: true,
    getFileName: function(file, formData) {
      console.log('getFileName', formData)
      return randomfilename() + '.' + formData.type
    },
    getDirectory: function(fileInfo, formData) {
      console.log('getDirectory', formData)
      return formData.page
    },
    finished: function(fileInfo, formFields) {
      console.log('fileInfo', fileInfo)
      console.log('formFields', formFields)
    }
  });
});


function randomfilename() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var minutes = today.getMinutes();
  var second = today.getSeconds();
  var randomnumber = Math.floor(Math.random() * 90000) + 10000;
  var filename = addZeroLeft(2, year) + '' + addZeroLeft(2, month) + '' + addZeroLeft(2, day) + '' + minutes + '' + second + '' + randomnumber;
  return filename;
}

addZeroLeft = function(cnt, numbertic) {
  var str = "" + numbertic
  var pad = "";
  for (i = 1; i <= cnt; i++) {
    pad += "0";
  }
  var ans = pad.substring(0, pad.length - str.length) + str
  return ans;
}
