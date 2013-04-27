'use strict';

angular.module('swa', ['ngSanitize','swa.map','swa.parkCreator'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/parkCreator', {
        templateUrl: 'views/parkCreator.html',
        controller: 'ParkCreatorCtrl'
      })
      .otherwise({
        redirectTo: '/parkCreator'
      });
  });
