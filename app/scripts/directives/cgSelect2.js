angular.module('informCgApp').directive('cgSelect2', function () {

  return {
    restrict : 'E',
    templateUrl : 'templates/directives/cgSelect2Template.html',
    link : function (scope) {
      console.log('cgSelect2 instance created');
//TODO
    },
    scope : {
      value : '=',
      data : '@',
      dialog: '='
    }
  }

});