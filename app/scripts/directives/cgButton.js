angular.module('informCgApp').directive('cgButton', function() {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/cgButtonTemplate.html',
    link: function() {
      console.log('cgButton instance created');
    },
    scope:{
        label:'@'
    }
  }
});