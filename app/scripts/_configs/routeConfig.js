angular.module('informCgApp').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/static");

  $stateProvider.state('static', ensureStateInitialization({
    url: '/static',
    templateUrl: 'templates/routes/static.html',
    controller: 'StaticCtrl'
  })).state('another', ensureStateInitialization({
    url: '/another',
    templateUrl: 'templates/routes/another.html',
    controller: 'AnotherCtrl'
  }));


  function ensureStateInitialization(stateConfigObj) {
    stateConfigObj.resolve = {
      initPromise: function(i18nService) {
        return i18nService.initialize();
      }
    };

    return stateConfigObj;
  }
});