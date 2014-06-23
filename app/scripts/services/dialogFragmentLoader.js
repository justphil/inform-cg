'use strict';

angular.module('informCgApp').factory('dialogFragmentLoader', function($http, $q) {
    var srv = {};

    srv.fragments = {};

    srv.fragmentDefinitions = {
      baseContainer:          'views/engine/BaseContainer.html',
      input:                  'views/engine/Input.html',
      output:                 'views/engine/Output.html',
      outputBindToTemplate:   'views/engine/OutputBindToTemplate.html',
      textarea:               'views/engine/Textarea.html',
      radio:                  'views/engine/Radio.html',
      error:                  'views/engine/Error.html',
      errorContainer:         'views/engine/ErrorContainer.html'
    };

    srv.loadFragment = function(fragmentKey) {
      var url = srv.fragmentDefinitions[fragmentKey];

      var promise = $http.get(url);
      promise.then(function(res) {
        if (res.status === 200) {
          srv.fragments[fragmentKey] = res.data;
        }
        else {
          throw new Error('Cannot load form fragment "' + url + '".');
        }
      }, function(res) {
        throw new Error(res.data);
      });

      return promise;
    };

    srv.loadFragments = function() {
      var promises = [],
        promise;

      angular.forEach(srv.fragmentDefinitions, function(fragmentUrl, fragmentKey) {
        promise = srv.loadFragment(fragmentKey);
        promises.push(promise);
      });

      return $q.all(promises).then(function() {
        return srv.fragments;
      }, function(error) {
        return error;
      });
    };

    return {
      loadFragments: function() {
        return srv.loadFragments();
      }
    }
  });
