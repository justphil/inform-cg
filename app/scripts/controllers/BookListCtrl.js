angular.module('kienbaumApp').controller('BookListCtrl', function($scope, BookDataService) {
  $scope.dialogVisible = false;
  $scope.orderProperty = 'author';
  $scope.reverseOrder = true;

  $scope.setOrderProperty = function(prop) {
    $scope.orderProperty = prop;
    $scope.reverseOrder = !$scope.reverseOrder;
  };

  BookDataService.getAllBooks().then(function(response) {
    $scope.books = response.data;
  }).catch(function(error) {
    console.log('Error occurred!', error);
  });



  $scope.deleteBook = function(book) {
    console.log('Deleting book...', book);
    $scope.bookToDelete = book;
    $scope.dialogVisible = true;
    $scope.dialogTitle = book.title + ' wirklich löschen?';
  };

  $scope.performDeletion = function() {
    console.log('Performing deletion...', $scope.bookToDelete);

    BookDataService.deleteBookByIsbn($scope.bookToDelete.isbn).then(function(response) {
      if (response.data) {
        deleteLocalBookCopy($scope.bookToDelete);
      }
      else {
        console.log('Book couldn\'t be deleted on server!');
      }
    })
    .then($scope.cancelDeletion)
    .catch(function(error) {
      console.log('Error occurred!', error);
    });
  };

  $scope.cancelDeletion = function() {
    $scope.dialogVisible = false;
  };

  function deleteLocalBookCopy(book) {
    var i = $scope.books.indexOf(book);
    if (i > -1) {
      $scope.books.splice(i, 1);
    }
  }
});