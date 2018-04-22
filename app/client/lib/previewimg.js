showPreview = function(ele)
{
  var selectfilename = $(ele).val();
  $('.textShowFilename').val(selectfilename);
  if (ele.files && ele.files[0]) {

    var reader = new FileReader();

    reader.onload = function (e) {
      $('.imagepreview').attr('src', e.target.result);

    }
    reader.readAsDataURL(ele.files[0]);
  }
}


showtextbrowsefile = function(ele)
{
  var selectfilename = $(ele).val();
  $('.textShowFile').val(selectfilename);
  if (ele.files && ele.files[0]) {

    var reader = new FileReader();
    reader.readAsDataURL(ele.files[0]);
  }
}
