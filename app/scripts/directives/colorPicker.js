// <color-picker></color-picker>
angular.module('kienbaumApp').directive('colorPicker', function() {

  return {
    restrict: 'E', // element
    templateUrl: 'templates/directives/colorPickerTemplate.html',
    // init-r="255" init-g="0" init-b="0"
    // on-color-change="handleColorChange(r,g,b)"
    scope: {
      r: '@',
      g: '@',
      b: '@',
      onColorChange: '&'
    }, // isolated scope
    link: function(scope) {

      ['r', 'g', 'b'].forEach(function(c) {
        scope.$watch(c, function() {
          scope.onColorChange({
            r: scope.r,
            g: scope.g,
            b: scope.b
          });
        });
      });

      console.log('colorPicker element', arguments[1]);
      console.log('colorPicker attr', arguments[2]);
    }
  }

});
