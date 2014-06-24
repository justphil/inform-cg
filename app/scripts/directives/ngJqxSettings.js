console.log("ngJqxsettings.js--loaded!");

angular.module("informCgApp").directive('ngJqxsettings', function ($interval, dateFilter) {

  console.log("ngJqxsettings.js--ngJqxsettings init function");

  function link(scope, element, attrs) {

    console.log("ngJqxsettings.js--link function run");
    var isInitialized = false;
    var widget = attrs.ngJqwidgets;
    var propertyToScopeArray = propertyToScope(attrs.ngJqxsettings);

    for (var p = 0; p < propertyToScopeArray.length; p++) {
      var property = propertyToScopeArray[p].scopeVar;
      eval("var " + property + " = scope." + property + ";");

      // watches for changes in the $scope variables and updates the widget accordingly
      scope.$watch(property, function (newValue, oldValue) {

        console.log("ngJqxsettings.js--watch function run newvalue %s, oldValue %s",newValue,oldValue);

        if (isInitialized == true && newValue != oldValue) {
          var setting = this.exp;
          eval(setting + " =   scope." + setting);

          var updatedProperty;
          for (var i = 0; i < propertyToScopeArray.length; i++) {
            if (setting == propertyToScopeArray[i].scopeVar) {
              updatedProperty = eval("({ " + propertyToScopeArray[i].jqwidgetsProperty + ": " + setting + " })");
              break;
            };
          };
          if (updatedProperty != undefined) {
            $(element[0])[widget](updatedProperty);
          };
        };
      });
    };

    // initializes the widget
    var settings = eval("(" + attrs.ngJqxsettings + ")");
    $(document).ready(function () {



      if($(element[0])[widget]==null){
        console.log("ngJqxsettings.js--link function -- widget "+widget + "  is not defined in jqx. element[0] is",element[0]);
      }

      $(element[0])[widget](settings);


        //write value back to scope
        $(element[0]).on('change',function (event) {
            var value = $(element[0]).val();
            //variablenmae: "dialogValues['alltours.code']"

//            var variablenmae=$(this).parent().attr("value");
//            var changeScopestring=" scope.$parent."+variablenmae+"= value";
//            eval(changeScopestring);
//            console.log("ngJqxsettings.js--scope variable"+variablenmae+" value is changed :"+value);

            scope.value=value;
              scope.$apply();
        });

      console.log("ngJqxsettings.js--link function -- done");
      isInitialized = true;
    });
  };


    // extracts the key-value pairs from the settings string
    var propertyToScope = function (settingsString) {
        var newString = settingsString.slice(1, settingsString.length - 1);
        newString = newString.trim();
        var keyValueArray = newString.split(",");
        var keyValueObjects = new Array();
        for (var i = 0; i < keyValueArray.length; i++) {
            var tempString = keyValueArray[i].trim();
            var tempArray = tempString.split(":");
            var scopeVar = tempArray[1].trim();
            if (isNaN(scopeVar) == true && scopeVar != "true" && scopeVar != "false" && scopeVar[0] != "\"" && scopeVar[0] != "\'") {
                keyValueObjects.push({ jqwidgetsProperty: tempArray[0].trim(), scopeVar: tempArray[1].trim() });
            };
        };

        return keyValueObjects;
    };

  return {
    //TODO: add scope to enable reuse of directive :  https://docs.angularjs.org/guide/directive  Isolating the Scope of a Directive
      restrict: 'A',
    link: link
  };
});




