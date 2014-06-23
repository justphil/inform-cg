angular.module('informCgApp').directive('cgInput', function() {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/cgInputTemplate.html',
    link: function() {
      console.log('cgInput instance created');
    }
  }

});