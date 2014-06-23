angular.module('informCgApp').factory('dialogCreationService', function() {

  return {
    createDialog: function(dialogDescription) {
      console.log('[dialogCreationService]', dialogDescription);
    }
  };

});