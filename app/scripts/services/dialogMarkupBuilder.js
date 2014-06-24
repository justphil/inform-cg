'use strict';

angular.module('informCgApp').factory('dialogMarkupBuilder', function () {
    var srv = {};

    srv.placeholders = {
        ID: '%ID%',
        WIDTH: '%WIDTH%',
        HEIGHT: '%HEIGHT%',
        BACKGROUND_IMAGE_RULE: '%BACKGROUND_IMAGE_RULE%',
        CONTENT: '%CONTENT%',
        TYPE: '%TYPE%',
        TOP: '%TOP%',
        LEFT: '%LEFT%',
        BIND_TO: '%BIND_TO%',
        BIND_TO_TEMPLATE: '%BIND_TO_TEMPLATE%',
        VALIDATOR_ID: '%VALIDATOR_ID%',
        VALIDATOR_ERROR_MESSAGE: '%VALIDATOR_ERROR_MESSAGE%',
        SHOW_CONDITION: '%SHOW_CONDITION%',
        ISSERVERACTION: '%ISSERVERACTION%',
        VALUE: '%VALUE%',
        LABEL: '%LABEL%',
        DATA: '%DATA%',
        HEADER: '%HEADER%',
        CONTROLS: '%CONTROLS%',
        FOOTER: '%FOOTER%',
        MULTISELECT : '%MULTISELECT%',
        SERVER_ACTION_TRIGGER: '%SERVER_ACTION_TRIGGER%'
    };

    srv.in = function (needle, haystack) {
        return haystack.indexOf(needle) !== -1;
    };

    /**
     * translated dialog description into angularJS directives.
     * @param dialogDefinitiondialogDefinition  contains description (-> json dialog description)
     *        and fragments (-> translate dialog description from json into angular directives)
     * @returns {XML|string}  html string containing angularJS directives
     */
    srv.buildMarkup = function (dialogDefinition) {

//
//        <cg-dialog id="%ID%" dialog-values="dialog.dialogValues" cg-isserveraction="%ISSERVERACTION%">
//        %HEADER%
//        %CONTROLS%
//        %FOOTER%
//        </cg-dialog>

        var fragments = dialogDefinition.fragments;
        var baseContainerMarkup = fragments.cgDialogFragment.replace(srv.placeholders.ID, dialogDefinition.description.id);
        baseContainerMarkup = baseContainerMarkup.replace(srv.placeholders.ISSERVERACTION, dialogDefinition.description.isserveraction);

        var dialogId = null;
        if (dialogDefinition.description.id) {
            dialogId = dialogDefinition.description.id;
            if (dialogId) {
                dialogId = dialogId.toLowerCase()
            }
        }

        var controlsContent = srv.createControls(dialogDefinition.description.controls, fragments, dialogId);
        var footerContent = srv.createFooter(dialogDefinition.description.footer, fragments, dialogId);

        return baseContainerMarkup.replace(srv.placeholders.CONTROLS, controlsContent)
            .replace(srv.placeholders.FOOTER, footerContent);
    };

    srv.createBindToTemplateExpression = function (bindToTemplateString) {
        return srv.replaceAll('{{FORM_CONTEXT', '{{formSpace.__forms__context', bindToTemplateString);
    };

    srv.createControls = function (controls, fragments, dialogId) {
        var controlsContent = '';

        angular.forEach(controls, function (element) {
            var fragmentType;

            if (element.type === 'textarea') {
                fragmentType = fragments.textarea;
            }
            else if (element.type === 'input') {
                fragmentType = fragments.cgInputFragment;
            }
            else if (element.type === 'table') {
                fragmentType = fragments.cgTableFragment;
            }
            else if (element.type === 'radio') {
                fragmentType = fragments.radio;
            }
            else if (element.type === 'output') {
                if (angular.isDefined(element.bindToTemplate)) {
                    fragmentType = fragments.outputBindToTemplate;
                }
                else {
                    fragmentType = fragments.output;
                }
            } else if (element.type === 'select2'){
              fragmentType = fragments.cgSelect2Fragment;
            } else if (element.type === 'button'){
                fragmentType = fragments.cgButtonFragment;
            } else {
                throw new Error('Unknown form element type: ' + element.type);
            }

            controlsContent += srv.buildMarkupForElement(fragments, element, fragmentType, dialogId);
        });

        return controlsContent;
    };

srv.createFooter = function (footer, fragments, dialogId) {
    return srv.buildMarkupForElement(fragments, footer, fragments.cgFooterFragment, dialogId);
};

  /**
   * builds markup (angularJS directives) for a single element of the dialog description
   * @param element  this element of the dialog description will be translated into a angularJS directive
   * @param fragment  this fragment contains the directive to translate to (including placeholders)
   * @param dialogId  ID of the dialog that contains this element
   * @returns {XML|string|void|*}  angularJS directive. All placeholders have been replaced.
   */
  srv.buildMarkupForElement = function (fragments, element, fragment, dialogId) {

    // element markup
    var elementMarkup = fragment.replace(srv.placeholders.TYPE, element.type);

    elementMarkup = srv.replaceAll(srv.placeholders.ID, element.id, elementMarkup);

    elementMarkup = elementMarkup.replace(srv.placeholders.WIDTH, element.width);

    elementMarkup = elementMarkup.replace(srv.placeholders.LABEL, element.label);

    // reference to scope variable for "dialogValue"
    var dialogValueReference = 'dialog.dialogValues'; // TODO: define constants
    var elementId = '';
    if (dialogId) {
        elementId += dialogId + '.';
    }
    elementId += element.id.toLowerCase();
    dialogValueReference = dialogValueReference + '[\'' + elementId + '\']';
    elementMarkup = elementMarkup.replace(srv.placeholders.VALUE, dialogValueReference);

    // reference to scope variable for "query data"
    if (element.type) {
      var queryValueReference = 'dataModel' + '.';
      if (element.type == "table") {
        if (element.queryinfo && element.queryinfo.query) {
          elementMarkup = elementMarkup.replace(srv.placeholders.DATA, queryValueReference + element.queryinfo.query);
        } else {
         //TODO: log error
        }
      }
      if(element.type === 'select2'){
        if (element.list && element.list.query) {
          elementMarkup = elementMarkup.replace(srv.placeholders.DATA, element.list.query);
        } else {
          //TODO: log error
        }
        if(element.multiselect) {
          elementMarkup = elementMarkup.replace(srv.placeholders.MULTISELECT, true);
        } else {
          elementMarkup = elementMarkup.replace(srv.placeholders.MULTISELECT, "");
        }
      }

      var serverActionTrigger = '';
      if (element.type === 'button') {
        if (element.hasOwnProperty('onclick') && element.onclick.action.isServerAction) {
          serverActionTrigger += 'ng-click="dialog.serverActions.triggerServerAction(\'abc\')"';
        }
      }

      elementMarkup = elementMarkup.replace(srv.placeholders.SERVER_ACTION_TRIGGER, serverActionTrigger);
    }

    // add childs
    var elementContent = '';
    if (element.controls) {
        elementContent = srv.createControls(element.controls, fragments, dialogId);
    }
    elementMarkup = elementMarkup.replace(srv.placeholders.CONTROLS, elementContent);

    // error markup

    return elementMarkup;
};


srv.replaceAll = function (find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
};

return {
    buildMarkup: function (dialogDefinition) {
        return srv.buildMarkup(dialogDefinition);
    }
}
})
;
