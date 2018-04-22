Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});
// Router.route('/', {
//     name: 'Layout',
//     where: 'client'
// });
// Router.route('/', {
//     name: 'Login',
//     where: 'client'
// });
Router.route('/', {
  name: 'upload',
  where: 'client',
  controller: 'HomeController'
});
// Router.route('/upload', {
//     name: 'upload',
//     where: 'client'
// });
Router.route('/table', {
  name: 'table',
  where: 'client',
  controller: 'HomeController'
});
Router.route('/form', {
  name: 'form',
  where: 'client',
  controller: 'HomeController'
});
Router.route('/performance', {
  name: 'performance',
  where: 'client',
  controller: 'HomeController'
});
Router.route('/system', {
  name: 'system',
  where: 'client',
  controller: 'HomeController'
});
Router.route('/user_role', {
  name: 'userrole',
  where: 'client',
  controller: 'HomeController'
});

Router.route('/user_group', {
  name: 'usergroup',
  where: 'client',
  controller: 'HomeController'
});

Router.route('/user_profile', {
  name: 'userprofile',
  where: 'client',
  controller: 'HomeController'
});



Router.route('/garage', {
  name: 'garage',
  where: 'client',
  controller: 'HomeController'
});

Router.route('/addcontent/:_id', {
  name: 'addcontent',
  where: 'client',
  controller: 'HomeController'
});


Router.route('/editcontent/:_id', {
  name: 'editcontent',
  template: 'Editcontent',
  data: function() {
    console.log('_id', this.params._id)
    return News.findOne({
      news_id: parseInt(this.params._id)
    });
  },
  where: 'client',
  controller: 'HomeController'
});

// Router.route('/editcontent', {
//     name: 'editcontent',
//     where: 'client'
// });

Router.route('/seecontent', {
  name: 'seecontent',
  where: 'client',
  controller: 'HomeController'
});


Router.route('/users', {
  name: 'users',
  where: 'client',
  controller: 'HomeController'
});

Router.route('/hotnews', {
  name: 'hotnews',
  where: 'client',
  controller: 'HomeController'
});

Router.route('/about', {
  name: 'about',
  where: 'client',
  controller: 'HomeController'
});

Router.route('/config', {
  name: 'config',
  where: 'client',
  controller: 'HomeController'
});

Router.route('/webboard', {
  name: 'webboard',
  where: 'client',
  controller: 'HomeController'
});

Router.route('/webboard/content/:content_id', {
  name: 'content',
  where: 'client',
  controller: 'HomeController'
});
