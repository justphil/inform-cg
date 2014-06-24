angular.module('informCgApp').directive('cgJqxinput', function() {



    console.log("cgJqxInput init function");

    return {
        restrict: 'E',
        templateUrl: '../../templates/directives/cgJqxinputTemplate.html',
        link:function(scope){

            console.log('cgJqxInput link function');

            $('#' + scope.id+" input").jqxInput({
                height: 25, width: 200,
                value: scope.value }).on('change', function (event) {
                scope.$apply(function(){
                    scope.value = $(event.target).val();
                });
            });
        },
        scope:{
            id : '@',
            value:'='
        }
    }

});