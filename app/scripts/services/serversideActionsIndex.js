angular.module('informCgApp').factory('serversideActionsIndex', function($http) {
    var actionStore = {};

    function extractActions(dialogId, controls, store) {
        if(!angular.isArray(controls) && angular.isObject(controls)) {
            var control = controls;
            var id = dialogId + '.' + control.id;
            if (control.hasOwnProperty('onclick')) {
                store[id + '.onclick'] = control.onclick;
            }
            if (control.hasOwnProperty('onrowdblclick')) {
                store[id + '.onrowdblclick'] = control.onrowdblclick;
            }        if (control.hasOwnProperty('controls')) {
                extractActions(dialogId, control.controls, store);
            }
        } else {
            angular.forEach(controls, function (control) {
                extractActions(dialogId, control, store);
            });
        }
    }

  function createIndex(dialogData) {
        var dialogId = dialogData.id.toLowerCase();
        extractActions(dialogId, dialogData.header, actionStore);
        extractActions(dialogId, dialogData.controls, actionStore);
        extractActions(dialogId, dialogData.footer, actionStore);
        console.log('[StaticCtrl.ActionStore]', actionStore);
  }

  function getServersideAction(id, action) {
      return actionStore[id + '.' + action];
  }

  // API
  return {
    createIndex: function(dialogData) {
      return createIndex(dialogData);
    },
    getServersideAction: function(id, action) {
          return getServersideAction(id, action);
    }
  }

});