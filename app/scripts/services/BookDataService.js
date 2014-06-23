angular.module('kienbaumApp').factory('BookDataService', function($http) {

  // Private state
  var baseUrl = 'http://ajs-workshop.herokuapp.com/api';

  // Private implementation
  function getAllBooks() {
    return $http.get(baseUrl + '/books');
  }

  function getBookByIsbn(isbn) {
    return $http.get(baseUrl + '/books/' + isbn);
  }

  function saveBook(book) {
    return $http.post(baseUrl + '/books', book);
  }

  function deleteBookByIsbn(isbn) {
    return $http.delete(baseUrl + '/books/' + isbn);
  }

  // Revealing Module
  return {
    getAllBooks: function() {
      return getAllBooks();
    },
    getBookByIsbn: function(isbn) {
      return getBookByIsbn(isbn);
    },
    saveBook: function(book) {
      return saveBook(book)
    },
    deleteBookByIsbn: function(isbn) {
      return deleteBookByIsbn(isbn);
    }
  };

});