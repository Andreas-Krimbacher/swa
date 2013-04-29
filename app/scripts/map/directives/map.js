'use strict';

angular.module('swa.map')
  .directive('map', function () {
    return {
      templateUrl: '../views/map/map.html',
      restrict: 'E',
      controller: 'MapCtrl',
      link: function postLink(scope, element, attrs) {


      }
    };
  });
