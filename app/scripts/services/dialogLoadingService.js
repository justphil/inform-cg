angular.module('informCgApp').factory('dialogLoadingService', function($http) {

  function loadDialog(fileName) {
    return $http.get('data/' + fileName);
  }

  // API
  return {
    loadDialog: function(fileName) {
      return loadDialog(fileName);
    }
  }

});