angular.module('kienbaumApp').config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'templates/routes/main.html',
    controller: 'MainCtrl'
  }).when('/books/:isbn', {
    templateUrl: 'templates/routes/bookDetailsTemplate.html',
    controller: 'BookDetailsCtrl'
  }).when('/newbook', {
    templateUrl: 'templates/routes/newBookTemplate.html',
    controller: 'NewBookCtrl'
  }).when('/books', {
    templateUrl: 'templates/routes/bookListTemplate.html',
    controller: 'BookListCtrl'
  }).otherwise({
    redirectTo: '/'
  });

});