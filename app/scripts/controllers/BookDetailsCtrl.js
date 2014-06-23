angular.module('kienbaumApp').controller('BookDetailsCtrl', function($scope, $routeParams, $location, BookDataService) {
  var isbn = $routeParams.isbn;
  BookDataService.getBookByIsbn(isbn).then(function(response) {
    $scope.book = response.data;
  }).catch(function(error) {
    console.log('Error occurred!', error);
  });

  $scope.goToListView = function() {
    $location.path('/books');
  };
});