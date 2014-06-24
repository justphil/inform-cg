angular.module('informCgApp').controller('SidebarCtrl', function($scope, $stateParams, menuLoader) {
  $scope.topLevel = $stateParams.topLevel;

  menuLoader.getSubMenu($stateParams.topLevel).then(function(subMenu) {
    $scope.subMenu = subMenu;
  });
});