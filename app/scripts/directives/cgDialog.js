angular.module('informCgApp').directive('cgDialog', function($compile) {

  return {
    restrict: 'E',
    scope: {
      dialogValues: '=',
      dataModel:'@'
    },
    terminal: true,
    priority: 1000,
    link: function(scope, element) {
      var innerHtml = $compile(element.html())(scope);
      element.html(innerHtml);
    }
  }

});