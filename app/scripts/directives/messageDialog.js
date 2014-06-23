angular.module('kienbaumApp').directive('messageDialog', function() {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/messageDialogTemplate.html',
    scope: {
      visible: '=',
      title: '=',
      onYes: '&',
      onNo: '&'
    },
    transclude: true,
    link: function() {
      console.log('messageDialog instance created!');
    }
  };

});