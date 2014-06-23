angular.module('informCgApp').factory('i18nService', function($http, $q) {
  var lang = 'de';
  var resourceKeys;


  function translate(resourceKey) {
    return resourceKeys[lang][resourceKey];
  }

  function initialize() {
    if (resourceKeys) {
      console.log('[i18nService] resourceKeys available');
      return $q.when(resourceKeys);
    }
    else {
      console.log('[i18nService] resourceKeys NOT available');
      return $http.get('data/lang.json').then(function(response) {
        resourceKeys = response.data;
        return resourceKeys;
      }).catch(function(error) {
        console.log('Error', error);
      });
    }
  }

  // API
  return {
    translate: function(resourceKey) {
      return translate(resourceKey);
    },
    initialize: function() {
      return initialize();
    }
  };

});