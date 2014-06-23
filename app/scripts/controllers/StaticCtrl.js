angular.module('informCgApp').controller('StaticCtrl', function($scope, $http, $q, dialogLoadingService, dialogCreationService, i18nService,dialogFragmentLoader,dialogMarkupBuilder) {
  console.log('### ### StaticCtrl initialized!');

  $scope.dialog = {
    // queryStore
    // dialogValues (initial copy of queryStore)
  };

  var promises = [
    dialogFragmentLoader.loadFragments(),
    dialogLoadingService.loadDialog('tourOverviewFromServer.json')
  ];

  $q.all(promises).then(function(responses) {
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


  // TODO: obsolete
  $http.get('data/tour_overview.json').then(function(response) {
    console.log('response', response.data);
    $scope.dialog.queryStore = response.data;
    $scope.dialog.dialogValues = response.data; // TODO: this should be a real deep copy
  }).catch(function(error) {
    console.log('Error', error);
  });




});