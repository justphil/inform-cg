angular.module('informCgApp').filter('i18n', function(i18nService) {

  return function(resourceKey) {
      var result = i18nService.translate(resourceKey);
          if(angular.isUndefined(result)) {
              return '???'+resourceKey
          }
    return result;
  };

});