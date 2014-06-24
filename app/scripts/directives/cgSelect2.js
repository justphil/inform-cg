angular.module('informCgApp').directive('cgSelect2', function () {

  return {
    restrict : 'E',
    templateUrl : 'templates/directives/cgSelect2Template.html',
    link : function (scope) {
      console.log('cgSelect2 instance created');
      var queryData = scope.dialog.dataModel[scope.data];
      var select2Data = [];
      for ( var i = 0; i < queryData.data.length; ++i) {
        select2Data.push({
          id : queryData.data[i][0],
          text : queryData.data[i][0]
        });
      }

      $('#' + scope.id).select2({
        data : select2Data,
        dropdownAutoWidth : true,
        multiple: scope.multiSelect
      }).on('change', function (e) {
        scope.$apply(function(){
          scope.value = e.val;
        });
      });
    },
    scope : {
      id : '@',
      value : '=',
      multiSelect: '@',
      data : '@',
      dialog : '='
    }
  }

});