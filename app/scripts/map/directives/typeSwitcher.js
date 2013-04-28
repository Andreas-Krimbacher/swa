'use strict';

angular.module('swa.map')
  .directive('mapTypeSwitcher',function () {
    return {
      templateUrl: '../views/map/typeSwitcher.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

          scope.type = 'edit';
            scope.setType = function(type){
                scope.$emit('setMapType',type);
                scope.type = type;
            }
      }
    };
  });
