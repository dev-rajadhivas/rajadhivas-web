Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});
Router.route('/', {
  name: 'upload',
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
    return News.findOne({
      news_id: parseInt(this.params._id)
    });
  },
  where: 'client',
  controller: 'HomeController'
});
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
