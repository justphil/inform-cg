angular.module('kienbaumApp').directive('bbb', function() {

  return {
    restrict: 'E',
    controller: function() {
      console.log('[BBB] [controller] aaa instance created!');
    },
    compile: function() {
      console.log('[BBB] [compile] aaa instance created!');

      return function() {
        console.log('[BBB] [link] aaa instance created!');
      };
    }
  };

});