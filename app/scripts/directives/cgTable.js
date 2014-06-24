angular.module('informCgApp').directive('cgTable', function() {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/cgTableTemplate.html',
    link: function(scope) {
      console.log('cgTable instance created');
    }
  };

});