angular.module('informCgApp').controller('ContentCtrl', function($scope, $stateParams) {
  $scope.content = $stateParams.sub;
});