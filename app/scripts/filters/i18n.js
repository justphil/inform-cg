angular.module('informCgApp').filter('i18n', function(i18nService) {

  return function(resourceKey) {
    console.log('i18n', arguments);

    var translated = i18nService.translate(resourceKey);
    //console.log('Filter: i18n', resourceKey, translated);


    return translated;
  };

});