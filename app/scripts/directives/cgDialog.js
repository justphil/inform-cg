angular.module('informCgApp').directive('cgDialog', function($compile) {

  return {
    restrict: 'E',
    scope: {
      dialog: '='
    },
    terminal: true,
    priority: 1000,
    link: function(scope, element) {
      var innerHtml = $compile(element.html())(scope);
      element.html(innerHtml);
    }
  }

});