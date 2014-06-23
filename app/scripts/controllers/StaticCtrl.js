angular.module('informCgApp').controller('StaticCtrl', function($scope, $http, $q, dialogLoadingService, dialogFragmentLoader, dialogMarkupBuilder) {
  $scope.dialog = {
    // queryStore
    // dialogValues (initial copy of queryStore)
  };

  var promises = [
    dialogFragmentLoader.loadFragments(),
    dialogLoadingService.loadDialog('tourOverviewFromServer.json')
  ];

  $q.all(promises).then(function(responses) {
    $scope.dialog.queryStore = responses[1].data.dataModel;
    $scope.dialog.dialogValues = responses[1].data.dataModel; // TODO: this should be a real deep copy

    return {
      fragments: responses[0],
      description: responses[1].data
    }
  }).then(dialogMarkupBuilder.buildMarkup).then(function(markupString){
      console.log(markupString);
      $scope.dialogMarkup = markupString;
  }).catch(function(error) {
    console.log('Error', error);
  });


});