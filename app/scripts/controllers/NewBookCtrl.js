angular.module('kienbaumApp').controller('NewBookCtrl', function($scope, $location, BookDataService) {
  $scope.saveBook = function(book) {
    BookDataService.saveBook(book).then(function() {
      $location.path('/books');
    }).catch(function(error) {
      console.log('Error occurred!', error);
    });
  };
});