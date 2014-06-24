angular.module('informCgApp').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/static");

  $stateProvider.state('static', ensureStateInitialization({
    url: '/static',
    views: {
      static: {
        templateUrl: 'templates/routes/static.html',
        controller: 'StaticCtrl'
      }
    }
  })).state('another', ensureStateInitialization({
    url: '/another',
    templateUrl: 'templates/routes/another.html',
    controller: 'AnotherCtrl'
  })).state('flexible', ensureStateInitialization({
    url: '/:topLevel/:sub',
    views: {
      sidebar: {
        templateUrl: 'templates/routes/sidebar.html',
        controller: 'SidebarCtrl'
      },
      content: {
        templateUrl: 'templates/routes/content.html',
        controller: 'ContentCtrl'
      }
    }
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