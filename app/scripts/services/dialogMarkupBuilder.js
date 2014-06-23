'use strict';

angular.module('informCgApp').factory('dialogMarkupBuilder', function() {
    var srv = {};

    srv.placeholders = {
      ID:                     '%ID%',
      WIDTH:                  '%WIDTH%',
      HEIGHT:                 '%HEIGHT%',
      BACKGROUND_IMAGE_RULE:  '%BACKGROUND_IMAGE_RULE%',
      CONTENT:                '%CONTENT%',
      TYPE:                   '%TYPE%',
      TOP:                    '%TOP%',
      LEFT:                   '%LEFT%',
      BIND_TO:                '%BIND_TO%',
      BIND_TO_TEMPLATE:       '%BIND_TO_TEMPLATE%',
      VALIDATOR_ID:           '%VALIDATOR_ID%',
      VALIDATOR_ERROR_MESSAGE:'%VALIDATOR_ERROR_MESSAGE%',
      SHOW_CONDITION:         '%SHOW_CONDITION%'
    };

    srv.in = function(needle, haystack) {
      return haystack.indexOf(needle) !== -1;
    };

    srv.buildMarkup = function(formMetaData, fragments, printPreviewMode, noBackgroundMode) {
      var baseContainerMarkup = fragments.baseContainer.replace(srv.placeholders.ID, formMetaData.id);
      baseContainerMarkup = baseContainerMarkup.replace(srv.placeholders.WIDTH, srv.getCssDimensionsString(formMetaData, 'width', printPreviewMode));
      baseContainerMarkup = baseContainerMarkup.replace(srv.placeholders.HEIGHT, srv.getCssDimensionsString(formMetaData, 'height', printPreviewMode));

      if (!noBackgroundMode) {
        baseContainerMarkup = baseContainerMarkup.replace(
          srv.placeholders.BACKGROUND_IMAGE_RULE,
          "background-image: url('" + formMetaData.backgroundImage + "')"
        );
      }

      var content = '';
      angular.forEach(formMetaData.elements, function(element) {
        var fragmentType;

        if (srv.in(element.type, ['text', 'date', 'number', 'checkbox'])) {
          fragmentType = fragments.input;
        }
        else if (element.type === 'textarea') {
          fragmentType = fragments.textarea;
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

        content += srv.buildMarkupForElement(element, fragmentType, fragments.errorContainer, fragments.error, printPreviewMode);
      });

      return baseContainerMarkup.replace(srv.placeholders.CONTENT, content);
    };

    srv.createBindToTemplateExpression = function(bindToTemplateString) {
      return srv.replaceAll('{{FORM_CONTEXT', '{{formSpace.__forms__context', bindToTemplateString);
    };

    // TODO: This fn needs a serious refactoring!
    srv.buildMarkupForElement = function(element, fragment, errorContainerFragment, errorFragment, printPreviewMode) {
      /*
       if (angular.isUndefined(element.print)) {
       return '';
       }
       */

      // element markup
      var elementMarkup = fragment.replace(srv.placeholders.TYPE, element.type);

      elementMarkup = srv.replaceAll(srv.placeholders.ID, element.id, elementMarkup);

      if (angular.isDefined(element.bindToTemplate)) {
        var bindToTemplateExpression = srv.createBindToTemplateExpression(element.bindToTemplate);

        elementMarkup = elementMarkup.replace(
          srv.placeholders.BIND_TO_TEMPLATE, bindToTemplateExpression
        );
      }
      else {
        if (angular.isDefined(element.bindTo)) {
          if (element.bindTo.indexOf('FORM_CONTEXT.') === 0) {
            elementMarkup = srv.replaceAll(
              srv.placeholders.BIND_TO,
              '__forms__context.' + element.bindTo.substr(13),
              elementMarkup
            );
          }
          else {
            elementMarkup = srv.replaceAll(srv.placeholders.BIND_TO, element.bindTo, elementMarkup);
          }
        }
        else {
          elementMarkup = srv.replaceAll(srv.placeholders.BIND_TO, element.id, elementMarkup);
        }
      }

      elementMarkup = elementMarkup.replace(srv.placeholders.TOP, srv.getCssDimensionsString(element, 'y', printPreviewMode));
      elementMarkup = elementMarkup.replace(srv.placeholders.LEFT, srv.getCssDimensionsString(element, 'x', printPreviewMode));
      elementMarkup = elementMarkup.replace(srv.placeholders.WIDTH, srv.getCssDimensionsString(element, 'width', printPreviewMode));
      elementMarkup = elementMarkup.replace(srv.placeholders.HEIGHT, srv.getCssDimensionsString(element, 'height', printPreviewMode));

      // error markup
      if (element.showErrors) {
        var errorContainerMarkup = errorContainerFragment.replace(
          srv.placeholders.TOP, srv.getCssDimensionsString(element, 'errorY', printPreviewMode)
        );
        errorContainerMarkup = errorContainerMarkup.replace(
          srv.placeholders.LEFT, srv.getCssDimensionsString(element, 'errorX', printPreviewMode)
        );
        errorContainerMarkup = errorContainerMarkup.replace(
          srv.placeholders.WIDTH, srv.getCssDimensionsString(element, 'errorWidth', printPreviewMode)
        );
        errorContainerMarkup = errorContainerMarkup.replace(
          srv.placeholders.HEIGHT, srv.getCssDimensionsString(element, 'errorHeight', printPreviewMode)
        );

        // error content
        var errorContent        = '',
          errorShowCondition  = '',
          numValidators       = (element.validators) ? Object.keys(element.validators).length : 0,
          i                   = 0,
          errorMarkup;

        angular.forEach(element.validators, function(validatorFn, validatorId) {
          errorMarkup = errorFragment.replace(srv.placeholders.ID, element.id);
          errorMarkup = errorMarkup.replace(srv.placeholders.VALIDATOR_ID, validatorId);
          errorMarkup = errorMarkup.replace(
            srv.placeholders.VALIDATOR_ERROR_MESSAGE, element.validatorErrorMessages[validatorId]
          );
          errorContent += errorMarkup;

          errorShowCondition += 'cgmform.element_' + element.id + '.$error.' + validatorId;
          if (i < numValidators - 1) {
            errorShowCondition += ' || ';
          }

          i++;
        });

        errorContainerMarkup = errorContainerMarkup.replace(
          srv.placeholders.SHOW_CONDITION, errorShowCondition
        );
        elementMarkup += errorContainerMarkup.replace(srv.placeholders.CONTENT, errorContent);
      }

      return elementMarkup;
    };

    srv.getCssDimensionsString = function(element, prop, printPreviewMode) {
      var dimensions,
        pixels;

      if (printPreviewMode) {
        dimensions = element.print;
      }
      else {
        dimensions = element.screen;
      }

      pixels = dimensions[prop];

      if (angular.isString(pixels) && pixels === 'auto') {
        return pixels;
      }
      else {
        if (printPreviewMode) {
          return pixels + 'mm';
        }
        else {
          return pixels + 'px';
        }
      }
    };

    srv.replaceAll = function(find, replace, str) {
      return str.replace(new RegExp(find, 'g'), replace);
    };

    return {
      buildMarkup: function(formMetaData, fragments, printPreviewMode, noBackgroundMode) {
        return srv.buildMarkup(formMetaData, fragments, printPreviewMode, noBackgroundMode);
      }
    }
  });
