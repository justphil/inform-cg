angular.module('informCgApp').controller('StaticCtrl', function($scope, $http, $q, dialogLoadingService, serversideActionsIndex, dialogFragmentLoader, dialogMarkupBuilder) {

  $scope.dialog = {
    // queryStore
    // dialogValues (initial copy of queryStore)
  };

  var promises = [
    dialogFragmentLoader.loadFragments(),
    dialogLoadingService.loadDialog('tourOverviewFromServer.json')
  ];

  $q.all(promises).then(function(responses) {
    //$scope.dialog.queryStore = responses[1].data.dataModel;

    $scope.dialog.dataModel = responses[1].data.dataModel; // no deep copy needed, its immutable (bound to scope with "@")
    // TODO: need to copy values from first row of dataModel using query header information as keys
    $scope.dialog.dialogValues = responses[1].data.dialogValues;

    serversideActionsIndex.createIndex(responses[1].data);

    $scope.dialog.description = responses[1].data;

    $scope.dialog.serverActions = {
      triggerServerAction: function(id, action) {
        console.log('[triggerServerAction]', serversideActionsIndex.getServersideAction(id, action));
      }
    };

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