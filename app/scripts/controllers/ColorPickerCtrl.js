angular.module('kienbaumApp').controller('ColorPickerCtrl', function($scope) {
  $scope.handleColorChange = function(r,g,b) {
    console.log('Color has changed', r, g, b);
  };
});