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
        DATA: '%DATA%',
        HEADER: '%HEADER%',
        CONTROLS: '%CONTROLS%',
        FOOTER: '%FOOTER%'
    };

    srv.in = function (needle, haystack) {
        return haystack.indexOf(needle) !== -1;
    };

    srv.buildMarkup = function (dialogDefinition) {

//
//        <cg-dialog id="%ID%" dialog-values="dialog.dialogValues" cg-isserveraction="%ISSERVERACTION%">
//        %HEADER%
//        %CONTROLS%
//        %FOOTER%
//        </cg-dialog>

        var fragments=dialogDefinition.fragments;
        var baseContainerMarkup = fragments.cgDialogFragment.replace(srv.placeholders.ID, dialogDefinition.description.id);
        baseContainerMarkup = baseContainerMarkup.replace(srv.placeholders.ISSERVERACTION,dialogDefinition.description.isserveraction );


        var content = '';
        angular.forEach(dialogDefinition.description.controls, function (element) {
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
            }
            else {
                throw new Error('Unknown form element type: ' + element.type);
            }

            content += srv.buildMarkupForElement(element, fragmentType);
        });

        return baseContainerMarkup.replace(srv.placeholders.CONTROLS, content);
    };

    srv.createBindToTemplateExpression = function (bindToTemplateString) {
        return srv.replaceAll('{{FORM_CONTEXT', '{{formSpace.__forms__context', bindToTemplateString);
    };

    // TODO: This fn needs a serious refactoring!
    srv.buildMarkupForElement = function (element, fragment) {

        // element markup
        var elementMarkup = fragment.replace(srv.placeholders.TYPE, element.type);

        elementMarkup = srv.replaceAll(srv.placeholders.ID, element.id, elementMarkup);


        elementMarkup = elementMarkup.replace(srv.placeholders.WIDTH,element.width);
        elementMarkup = elementMarkup.replace(srv.placeholders.VALUE,element.value);
        elementMarkup = elementMarkup.replace(srv.placeholders.DATA, element.data);

        // error markup

        return elementMarkup;
    };


    srv.replaceAll = function (find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    };

    return {
        buildMarkup: function (dialogDefinition ) {
            return srv.buildMarkup(dialogDefinition );
        }
    }
});
