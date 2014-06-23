angular.module('informCgApp').directive('cgDialog', function() {

  return {
    restrict: 'E',
    link: function() {
      console.log('cgDialog instance created!');
    }
  }

});