/* Linxwork Helper */

inputToArray = function(classs) {
  var array = {};
  _.each($("." + classs), function(v, k, l) {
    var key = $(v).attr("field");
    var ftype = $(v).attr("field-type");
    var value = v.value;
    var type = v.type;

    if (type == "checkbox") {
      array[key] = $(v).is(":checked");
    } else if (type == "radio") {
      if ($(v).is(":checked")) {
        if (ftype == "int") {
          array[key] = parseInt(value);
        } else if (ftype == "float") {
          array[key] = parseFloat(value);
        } else {
          array[key] = value;
        }
      }
    } else {
      if (ftype == "int") {
        array[key] = parseInt(value);
      } else if (ftype == "float") {
        array[key] = parseFloat(value);
      } else {
        array[key] = value;
      }
    }
  });
  return array;
}

arrayToInput = function(classs, data) {
  _.forEach(data, function(v, k) {
    if ($("." + classs + "[field=" + k + "]").attr("type") == "checkbox") {
      $("." + classs + "[field=" + k + "]").prop("checked", v)
    } else if ($("." + classs + "[field=" + k + "]").attr("type") == "radio") {
      if (v != "") {
        $("." + classs + "[field=" + k + "][value=" + v + "]").prop("checked", true)
      }
    } else {
      $("." + classs + "[field=" + k + "]").val(v)
    }
  })
}

inputCHKEmpty = function(classs) {
  var status = true;
  _.each($("." + classs), function(v, k, l) {
    var check = $(v).attr("form-check");
    if (check) {
      $(v).removeClass('form-alert')
      if (v.value == "") {
        status = false;
        $(v).addClass('form-alert')
      }
      if (v.value == 0) {
        status = false;
        $(v).addClass('form-alert')
      }
    }
  });
  return status;
}

inputCHKEmptySkipZero = function(classs) {
  var status = true;
  _.each($("." + classs), function(v, k, l) {
    var check = $(v).attr("form-check-zero");
    if (check) {
      $(v).removeClass('form-alert')
      if (v.value == "") {
        status = false;
        $(v).addClass('form-alert')
      }
    }
  });
  return status;
}

inputCHKClear = function(classs) {
  _.each($("." + classs), function(v, k, l) {
    var check = $(v).attr("form-check");
    if (check) {
      $(v).removeClass('form-alert')
    }
  });
}

clearInput = function(classs) {
  _.each($("." + classs), function(v, k, l) {
    var check = $(v).attr("clear-check");
    if (check != "false") {
      if (v.type == "checkbox") {
        $(v).prop("checked", false)
      } else if (v.type == "radio") {
        if ($(v).attr("checked")) {
          $(v).prop("checked", true)
        } else {
          $(v).prop("checked", false)
        }
      } else {
        $(v).val("");
      }
    }
  });
}

disableInput = function(classs) {
  _.each($("." + classs), function(v, k, l) {
    $(v).attr("disabled", "true")
  });
}

enableInput = function(classs) {
  _.each($("." + classs), function(v, k, l) {
    $(v).removeAttr("disabled")
  });
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

confirmDiaglog = function(message) {
  var r = confirm(message);
  return r;
}

alertModal = function(str) {
  $("#alert-content").text(str)
  $("#alert-modal").modal("show")
}

// checkInput = function(event) {
//     var x = event.keyCode;
//     console.log(x)
//     if ((x >= 48) && (x <= 57) || (x >= 69) && (x <= 105)) {
//         event.returnValue = true;
//     } else {
//         event.returnValue = false;
//     }
// }

// checkInputFloat = function(event) {
//     var x = event.keyCode;
//     console.log(x)
//     if ((x >= 48) && (x <= 57) || (x >= 69) && (x <= 105) || x == 46) {
//         event.returnValue = true;
//     } else {
//         event.returnValue = false;
//     }
// }

checkInput = function(event) {
  var x = event.keyCode;
  if ((x >= 48) && (x <= 57)) {
    event.returnValue = true;
  } else {
    event.returnValue = false;
  }
}

checkInputcustom = function(event) {
  var x = event.keyCode;
  if ((x >= 48) && (x <= 55)) {
    event.returnValue = true;
  } else {
    event.returnValue = false;
  }
}

checkInputFloat = function(event) {
  var x = event.keyCode;
  if ((x >= 48) && (x <= 57) || x == 46) {
    event.returnValue = true;
  } else {
    event.returnValue = false;
  }
}

checkMaxInput = function(thiss, limit) {
  var value = thiss.val()
  if (thiss.val() > limit && limit != undefined) {
    thiss.val(limit)
    value = limit
  }
  return value
}

arrayToDate = function(arrayDate) {
  var dateReturn = "";
  //console.log(arrayDate)
  _.each(arrayDate, function(v, k, l) {
    var start_date = moment(v.start_date).format('DD/MM/YYYY')
    var end_date = moment(v.end_date).format('DD/MM/YYYY')
    if (start_date == end_date) {
      dateReturn += start_date + ","
    } else {
      dateReturn += start_date + "-" + end_date + ","
    }
  });
  dateReturn = dateReturn.substring(0, dateReturn.length - 1);
  return dateReturn;
}

dateToArray = function(date) {
  var dateRetrun = [];
  var dateArray = date.split(",");
  _.each(dateArray, function(v, k, l) {
    var dateSplit = v.split("-")
    if (dateSplit.length > 1) {
      var dateOje = {
        start_date: moment(dateSplit[0], "DD/MM/YYYY H:mm").toISOString(),
        end_date: moment(dateSplit[1], "DD/MM/YYYY H:mm").toISOString()
      };
    } else {
      var dateOje = {
        start_date: moment(dateSplit[0], "DD/MM/YYYY H:mm").toISOString(),
        end_date: moment(dateSplit[0], "DD/MM/YYYY H:mm").toISOString()
      };
    }
    dateRetrun.push(dateOje)
  });
  return dateRetrun;
}

// checkProductBooking = function(data) {

//     // var data = {};
//     // data.asset_model_id=2;
//     // data.asset_type_id=1;
//     // data.asset_sub_type_id =1;
//     // data.product_id = 2;
//     // data.booking_date_str = "24/10/2016";



//     data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());
//     var totalAvailable = 0;
//     var bookingCount = Producttransaction.find({ booking_date: data.booking_date, product_id: data.product_id, asset_model_id: data.asset_model_id, asset_type_id: data.asset_type_id, asset_sub_type_id: data.asset_sub_type_id }).count();

//     //console.log(agg);

//     var avai = Assetstoreavailable.findOne({ asset_model_id: data.asset_model_id, asset_type_id: data.asset_type_id, asset_sub_type_id: data.asset_sub_type_id });
//     //console.log(avai.available);

//     if (avai) {
//         totalAvailable = avai.quantity;
//     }

//     var a = (totalAvailable - bookingCount)

//     return a;

// }

checkProductBooking = function(data) {
  // var data = {};
  // data.asset_model_id = 2;
  // data.asset_type_id = 1;
  // data.asset_sub_type_id = 1;
  // data.product_id = 2;
  // data.booking_date_str = "24/10/2016";

  data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());
  var totalAvailable = 0;
  var bookingCount = 0;
  var c = Producttransaction.find({
    booking_date: data.booking_date,
    asset_model_id: data.asset_model_id,
    asset_type_id: data.asset_type_id,
    asset_sub_type_id: data.asset_sub_type_id
  }).fetch();
  _.each(c, function(v, k) {
    bookingCount += v.booking_quantity;
  });
  //console.log(agg);
  var avai = Assetstoreavailable.findOne({
    asset_model_id: data.asset_model_id,
    asset_type_id: data.asset_type_id,
    asset_sub_type_id: data.asset_sub_type_id
  });
  //console.log(avai.available);

  if (avai) {
    totalAvailable = avai.quantity;
  }

  var a = (totalAvailable - bookingCount)
  return a;
}

checkAssetsOrder = function(data) {

  // var data = {};
  // data.asset_model_id=2;
  // data.asset_type_id=1;
  // data.asset_sub_type_id =1;
  // data.booking_date_str = "24/10/2016";



  data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());
  var totalAvailable = 0;
  var bookingCount = Assetordertransaction.find({
    booking_date: data.booking_date,
    asset_model_id: data.asset_model_id,
    asset_type_id: data.asset_type_id,
    asset_sub_type_id: data.asset_sub_type_id
  }).count();

  //console.log(agg);

  var avai = Assetstoreavailable.findOne({
    asset_model_id: data.asset_model_id,
    asset_type_id: data.asset_type_id,
    asset_sub_type_id: data.asset_sub_type_id
  });
  //console.log(avai.available);

  if (avai) {
    totalAvailable = avai.quantity;
  }

  var a = (totalAvailable - bookingCount)

  return a;

}


getAssetAvailAble = function(data) {

  // var data = {};
  // data.asset_model_id=2;
  // data.asset_type_id=1;
  // data.asset_sub_type_id =1;
  // data.booking_date_str = "24/10/2016";

  data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());

  var assetTransactionNotAvailable = Assetordertransaction.find({
    booking_date: data.booking_date,
    asset_model_id: data.asset_model_id,
    asset_type_id: data.asset_type_id,
    asset_sub_type_id: data.asset_sub_type_id
  }).fetch();

  var assetNotAvailable = [];
  _.each(assetTransactionNotAvailable, function(v, k) {
    assetNotAvailable.push(v.asset_store_id);
  });


  return Assetstore.find({
    asset_model_id: data.asset_model_id,
    asset_type_id: data.asset_type_id,
    asset_sub_type_id: data.asset_sub_type_id,
    asset_store_id: {
      $nin: assetNotAvailable
    }
  }).fetch();

}

//########################## CREW #########################


checkCrewAvaiable = function(data) { // check คน
  // var data = {};
  // data.crew_id=1;
  // data.booking_date_str = "24/10/2016";

  data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());
  var status = false
  var CrewordertransactionDb = Crewordertransaction.find({
    booking_date: data.booking_date,
    crew_id: data.crew_id
  }).fetch();
  if (CrewordertransactionDb.length > 0) {
    status = true
  }

  return status;
}



checkCrewSkillAvaiable = function(data) { // check ที่จองสกิล
  // var data = {};
  // data.crew_skill_id=1;
  // data.booking_date_str = "24/10/2016";

  data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());
  var totalAvailable = 0;
  var bookingCount = 0;

  var c = Crewskilltransaction.find({
    booking_date: data.booking_date,
    crew_skill_id: data.crew_skill_id
  }).fetch();
  _.each(c, function(v, k) {
    bookingCount += v.booking_quantity;
  });

  var avai = Crewskillavailable.findOne({
    crew_skill_id: data.crew_skill_id
  });

  if (avai) {
    totalAvailable = avai.quantity;
  }

  var a = (totalAvailable - bookingCount)

  return a;
}

// getCrewAvailable = function(data){

//     var data = {};
//     data.crew_id=1;
//     data.booking_date_str = "24/10/2016";

//     data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());

//     var crewTransactionNotAvailable = Crewordertransaction.find({booking_date:data.booking_date,crew_id:data.crew_id}).fetch();

//     var crewNotAvailable = [];
//     _.each(crewTransactionNotAvailable,function(v,k){
//         crewNotAvailable.push(v.crew_id);
//     });


//     return Crew.find(
//         {
//             crew_id: { $nin: crewNotAvailable }
//         }).fetch();

// }

getCustomerDiscount = function(department_id, customer_id) {
  var customerfinancialDb = Customerfinancial.findOne({
    customer_id: customer_id,
    department_id: department_id
  })
  return customerfinancialDb ? parseInt(customerfinancialDb.customer_financial_discount) : 0
}


//######################################### Material #############################################
checkProductMaterialBooking = function(data) {


  // var data = {};
  // data.product_id = 1;
  // data.booking_date_str = "20/10/2016";
  // data.asset_store_id = 1

  data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());
  var totalAvailable = 0;
  var bookingCount = 0;

  var c = Productmaterialtransaction.find({
    booking_date: data.booking_date,
    asset_store_id: data.asset_store_id
  }).fetch();
  _.each(c, function(v, k) {
    bookingCount += v.booking_quantity;
  });

  var avai = Materialavailable.findOne({
    asset_store_id: data.asset_store_id
  });

  if (avai) {
    totalAvailable = avai.quantity;
  }

  var a = (totalAvailable - bookingCount)

  return a;
}



checkMaterialAvailable = function(data) {


  var data = {};
  data.asset_store_id = 1;
  data.booking_date_str = "20/10/2016";

  data.booking_date = new Date(moment(data.booking_date_str, "DD/MM/YYYY H:mm").toISOString());
  var totalAvailable = 0;
  var bookingCount = 0;

  var c = Materialordertransaction.find({
    booking_date: data.booking_date,
    asset_store_id: data.asset_store_id
  }).fetch();
  _.each(c, function(v, k) {
    bookingCount += v.quantity;
  });

  var avai = Materialavailable.findOne({
    asset_store_id: data.asset_store_id
  });

  if (avai) {
    totalAvailable = avai.quantity;
  }

  var a = (totalAvailable - bookingCount)

  return a;
}
// Phatja

sortShootingDate = function(datadate) {
  //var datadate = "09/09/2016-10/09/2016 , 15/09/2016 ,20/10/2016-30/10/2016";
  var array_date = datadate.replace(/[\s,]+/g, ',').split(",");
  var new_arrdate = [];
  _.each(array_date, function(v, k) {
    var _v = v.replace(/[\s,]+/g, '-').split("-");
    var start_date = _v[0];
    var stop_date = _v[0];
    if (_v.length == 2) {
      stop_date = _v[1];
    }
    new_arrdate.push({
      start_date: new Date(moment(start_date, "DD/MM/YYYY H:mm").toISOString()),
      end_date: new Date(moment(stop_date, "DD/MM/YYYY H:mm").toISOString()),
    })
  });



  var dateReturn = [];

  _.each(new_arrdate, function(v2, k2, l2) {
    var start_date = v2.start_date
    var end_date = v2.end_date
    var dateInc = moment(start_date)
    var diffDate = moment(end_date).diff(moment(start_date), "days") + 1

    for (var i = 0; i < diffDate; i++) {
      dateReturn.push({
        dateiso: new Date(dateInc.toISOString()),
        date: dateInc.format('DD/MM/YYYY')
      });
      dateInc = dateInc.add(1, "day")
    }
  });

  var sortDate = dateReturn.sort(function(a, b) {
    a = moment(a.date, "DD/MM/YYYY H:mm")
    b = moment(b.date, "DD/MM/YYYY H:mm")
    return new Date(a._d).getTime() - new Date(b._d).getTime()
  });

  var alldate = {};
  alldate.datestr = [];
  alldate.dateiso = [];
  _.each(sortDate, function(v, k) {
    alldate.datestr.push(v.date);
    alldate.dateiso.push(v.dateiso)
  });
  return alldate;

}



getAssetStoreAvailable = function(product_id, datadate, job_entry_id, job_sub_id) {

  var getAsset = Productmap.find({
    product_id: product_id
  }).fetch();
  var s = sortShootingDate(datadate);
  var na = [];
  _.each(getAsset, function(v, k) { // gear Asset Type
    var c = reqFilterIDComp();
    var a = Assetstore.find({
      company_id: {
        $in: c
      },
      asset_model_id: v.asset_model_id,
      asset_sub_type_id: v.asset_sub_type_id,
      asset_type_id: v.asset_type_id
    }).fetch(); // Asset ID
    _.each(a, function(vv, kk) {
      var assetTransactionNotAvailable = Assetordertransaction.findOne({
        booking_date: {
          $in: s.dateiso
        },
        asset_store_id: vv.asset_store_id,
        job_entry_id: {
          $ne: job_entry_id
        },
        job_sub_id: {
          $ne: job_sub_id
        }
      }); // checkBooking
      if (!assetTransactionNotAvailable) {
        !na[vv.asset_store_id] ? na[vv.asset_store_id] = vv : "";
      }
    })
  });
  var arr = Object.keys(na).map(function(key) {
    return na[key]
  });

  return arr;

}


getCrewAvailable = function(crew_skill_id, datadate, job_entry_id, job_sub_id) {

  var getcrew = Crewskillmap.find({
    crew_skill_id: crew_skill_id
  }).fetch();
  var s = sortShootingDate(datadate);
  var arr_crewid = [];
  var nc = [];
  _.each(getcrew, function(v, k) {
    arr_crewid.push(v.crew_id);
  })
  var c = reqFilterIDComp();
  var ck = Crew.find({
    company_id: {
      $in: c
    },
    crew_id: {
      $in: arr_crewid
    }
  }).fetch();
  _.each(ck, function(vv, kk) {
    var crewTransactionNotAvailable = Crewordertransaction.findOne({
      booking_date: {
        $in: s.dateiso
      },
      crew_id: vv.crew_id,
      job_entry_id: {
        $ne: job_entry_id
      },
      job_sub_id: {
        $ne: job_sub_id
      }
    }); // checkBooking
    if (!crewTransactionNotAvailable) {
      !nc[vv.crew_id] ? nc[vv.crew_id] = vv : "";
    }
  });

  var arr = Object.keys(nc).map(function(key) {
    return nc[key]
  });

  return arr;
}

thaiDate = function(date, option) {
  date = moment(date ? date : new Date());
  var monthName = ["ม.ค.", "ก.พ.", "ม.ค.", "เม.ย.", "พ.ค.", "มิ.ย", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  if (option) {
    monthName = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  }
  var day = (date.date());
  var month = monthName[date.month()];
  var year = option ? (date.year() + 543) : (((date.year() + 543).toString().slice(-2)));
  return day + ' ' + month + ' ' + year;
}

thaiNumber = function(num) {
  var array = {
    "1": "๑",
    "2": "๒",
    "3": "๓",
    "4": "๔",
    "5": "๕",
    "6": "๖",
    "7": "๗",
    "8": "๘",
    "9": "๙",
    "0": "๐"
  };
  var str = num.toString();
  for (var val in array) {
    str = str.split(val).join(array[val]);
  }
  return str;
}

enterFunction = function(event, btn) {
    if (event.keyCode == 13) {
        $("#" + btn).click()
    }
}
