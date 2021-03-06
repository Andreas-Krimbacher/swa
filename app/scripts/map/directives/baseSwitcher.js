'use strict';

angular.module('swa.map')
  .directive('mapBaseSwitcher', ['OpenLayersMap',function (OpenLayersMap) {
    return {
      templateUrl: '../views/map/baseSwitcher.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          scope.basemaps = OpenLayersMap.getBasemaps();

          scope.setBasemap = function(id){
              OpenLayersMap.setBasemap(id);
              scope.basemaps = OpenLayersMap.getBasemaps();
          }

      }
    };
  }]);
