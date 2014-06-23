angular.module('informCgApp').config(function($routeProvider) {

  $routeProvider.when('/static', {
    templateUrl: 'templates/routes/static.html',
    controller: 'StaticCtrl'
  });

});