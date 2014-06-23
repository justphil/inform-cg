angular.module('kienbaumApp').directive('aaa', function() {

  return {
    restrict: 'E',
    controller: function() {
      console.log('[AAA] [controller] aaa instance created!');
    },
    compile: function() {
      console.log('[AAA] [compile] aaa instance created!');

      return function() {
        console.log('[AAA] [link] aaa instance created!');
      };
    }
  };

});