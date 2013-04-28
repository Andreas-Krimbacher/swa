'use strict';

angular.module('swa.util')
  .directive('utilTooltip', function () {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
          element.tipsy({fade: true,
              gravity: 's' });
      }
    };
  });
