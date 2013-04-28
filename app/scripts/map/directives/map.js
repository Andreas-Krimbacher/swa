'use strict';

angular.module('swa.map')
  .directive('map', function () {
    return {
      template: '<div id="map"></div><map-base-switcher></map-base-switcher><map-layer-control></map-layer-control><map-type-switcher></map-type-switcher>',
      restrict: 'E',
      controller: 'MapCtrl',
      link: function postLink(scope, element, attrs) {


      }
    };
  });
