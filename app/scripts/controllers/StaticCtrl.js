angular.module('informCgApp').controller('StaticCtrl', function($scope, $http, dialogLoadingService, dialogCreationService, i18nService) {
  console.log('### ### StaticCtrl initialized!');

  $scope.dialog = {
    // queryStore
    // dialogValues (initial copy of queryStore)
  };

  dialogLoadingService.loadDialog('tourOverviewFromServer.json').then(function(response) {
    console.log('Dialog loaded', response.data);
    return response.data;
  }).then(dialogCreationService.createDialog).catch(function(error) {
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