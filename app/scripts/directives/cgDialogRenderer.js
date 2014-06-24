'use strict';

angular.module('informCgApp').directive('cgDialogRenderer', function ($q, $compile) {
  return {
    restrict : 'E',
    scope : {
      markup : '@',
      dialog : '=' // two-way binding to dialogValues because we want to see all changes in the including controller
    },
    link : function (scope, element, attrs) {
      console.log('cgDialogRenderer instance initialized', scope.dialog);

      var markupInitialized = false;

      // Compile and render the form's markup when it is initialized.
      // But make sure that it'll be done only once.
      attrs.$observe('markup', function (newValue) {
        if (angular.isString(newValue) && newValue.length > 0) {
          if (!markupInitialized) {
            //console.log('######', newValue);
            element.html(newValue);
            $compile(element.contents())(scope);
            markupInitialized = true;
            console.log('########################### cgDialogRenderer compiled the template', scope.dialog);
          }
        }
      });
    }
  };
});
