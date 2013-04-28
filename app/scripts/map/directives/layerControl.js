'use strict';

angular.module('swa.map')
  .directive('mapLayerControl', function () {
    return {
      templateUrl: '../views/map/layerControl.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          scope.pointLayer = true;
          scope.lineLayer = true;
          scope.changeLayerState = function(type){
              if(type == 'LINESTRING'){
                  scope.$emit('setLineLayerState',!scope.lineLayer);
                  scope.lineLayer =  !scope.lineLayer;
              }
              if(type == 'POINT'){
                  scope.$emit('setPointLayerState',!scope.pointLayer);
                  scope.pointLayer =  !scope.pointLayer;
              }

          }
      }
    };
  });
