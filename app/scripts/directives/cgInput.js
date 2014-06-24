angular.module('informCgApp').directive('cgInput', function() {



    console.log("ngJqxInput init function");

    return {
        restrict: 'E',
        templateUrl: 'templates/directives/cgInputTemplate.html',
        scope:{
            value:'='
        }
    }

});