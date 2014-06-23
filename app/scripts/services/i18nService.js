angular.module('informCgApp').factory('i18nService', function($http) {
  console.log('### ### i18nService initialized!');


  var lang = 'de';
  var resourceKeys;
  var promise = $http.get('data/lang.json').then(function(response) {
    resourceKeys = response.data;
    promise = undefined;
  }).catch(function(error) {
    console.log('Error', error);
    promise = undefined;
  });

  function translate(resourceKey) {
    if (promise) {

    }

    return resourceKeys[lang][resourceKey];
  }

  function changeLanguage(l) {
    lang = l;
    return lang;
  }

  // API
  return {
    translate: function(resourceKey) {
      return translate(resourceKey);
    },
    changeLanguage: function(lang) {
      return changeLanguage(lang);
    }
  }

});