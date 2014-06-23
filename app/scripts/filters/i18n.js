angular.module('informCgApp').filter('i18n', function(i18nService) {

  return function(resourceKey) {
    return i18nService.translate(resourceKey);
  };

});