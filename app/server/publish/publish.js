Meteor.publish('News', function() {
  return News.find();
});
Meteor.publish('Counters', function() {
  return Counters.find();
});
Meteor.publish('StatusNews', function() {
  var pipeline = [{
    $match: {
      hotnews: false,
      $or: [{
        expiry_date: {
          $exists: false
        }
      }, {
        expiry_date: {
          $gt: new Date()
        }
      }]
    }
  }, {
    $group: {
      _id: "$category_id",
      count: {
        $sum: 1
      }
    }
  }, {
    $sort: {
      _id: 1
    }
  }];
  var clientCollection = {
    clientCollection: 'statusnews'
  };
  ReactiveAggregate(this, News, pipeline, clientCollection);
});
Meteor.publish('StatusUsers', function() {
  var pipeline = [{
    $match: {
      "profile.level": {
        $ne: "ผู้ดูแลระบบ"
      }
    }
  }, {
    $group: {
      _id: "$profile.userrole",
      count: {
        $sum: 1
      }
    }
  }, {
    $sort: {
      _id: 1
    }
  }];
  var clientCollection = {
    clientCollection: 'statususers'
  };
  ReactiveAggregate(this, Meteor.users, pipeline, clientCollection);
});
Meteor.publish('Unity', function(query) {
  return Unity.find(query.data, query.option);
});
