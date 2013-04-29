'use strict';

angular.module('swa.parkCreator.toolbar')
  .directive('pcToolbar', ['settings',function (settings) {
    return {
      templateUrl: '../views/toolbar/toolbar.html',
      restrict: 'E',
      controller: 'ToolbarCtrl',
      link: function postLink(scope, element, attrs) {


      }
    };
  }]);
