'use strict';

angular.module('swa.parkCreator.toolbar')
  .directive('pcToolbar', ['settings',function (settings) {
    return {
      templateUrl: '../views/toolbar/toolbar.html',
      restrict: 'E',
      controller: 'ToolbarCtrl',
      link: function postLink(scope, element, attrs) {

        scope.drawFeatures = [];
        var pointFeatures = settings.getDrawFeatures('POINT');
        var lineFeatures = settings.getDrawFeatures('LINESTRING');
        var polygonFeatures = settings.getDrawFeatures('POLYGON');

        scope.changeType = function(type){
              if(type == 'POINT') scope.drawFeatures = pointFeatures;
              if(type == 'LINESTRING') scope.drawFeatures = lineFeatures;
              if(type == 'POLYGON') scope.drawFeatures = polygonFeatures;
          }
      }
    };
  }]);
