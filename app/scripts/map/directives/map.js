'use strict';

angular.module('swa.map')
  .directive('map', function () {
    return {
      template: '<div id="map"></div><layerswitcher></layerswitcher>',
      restrict: 'E',
      controller: 'MapCtrl',
      link: function postLink(scope, element, attrs) {


      }
    };
  });
