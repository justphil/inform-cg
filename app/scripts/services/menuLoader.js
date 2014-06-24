angular.module('informCgApp').factory('menuLoader', function($http, $q) {

  var menu;

  function getMenu() {
    if (menu) {
      return $q.when(menu);
    }
    else {
      return $http.get('data/menu.json').then(function(response) {
        menu = response.data;
        return menu;
      }).catch(function(error) {
        console.log('Error while requesting menu', error);
      });
    }
  }

  function getSubMenu(topLevelMenu) {
    if (menu) {
      return $q.when(getChildren(menu, topLevelMenu));
    }
    else {
      return getMenu().then(function(menuData) {
        return getChildren(menuData, topLevelMenu);
      });
    }
  }

  function getChildren(menu, topLevelMenu) {
    var children;
    var i = menu.length;

    while (i--) {
      if (menu[i].title === topLevelMenu) {
        children = menu[i].children;
        break;
      }
    }

    if (angular.isUndefined(children)) {
      throw new Error('No top level menu "' + topLevelMenu + '"');
    }

    return children;
  }

  return {
    getMenu: function() {
      return getMenu();
    },
    getSubMenu: function(topLevelMenu) {
      return getSubMenu(topLevelMenu);
    }
  }

});