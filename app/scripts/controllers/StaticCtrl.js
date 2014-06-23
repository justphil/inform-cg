angular.module('informCgApp').controller('StaticCtrl', function($scope, $http, i18nService) {
  console.log('### ### StaticCtrl initialized!');

  $scope.dialog = {
    // queryStore
    // dialogValues (initial copy of queryStore)
  };


  $http.get('data/tour_overview.json').then(function(response) {
    console.log('response', response.data);
    $scope.dialog.queryStore = response.data;
    $scope.dialog.dialogValues = response.data; // TODO: this should be a real deep copy
  }).catch(function(error) {
    console.log('Error', error);
  });




});