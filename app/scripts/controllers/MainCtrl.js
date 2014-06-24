angular.module('informCgApp').controller('MainCtrl', function($scope, menuLoader) {
  menuLoader.getMenu().then(function(menu) {
    $scope.menu = menu;
  });
});