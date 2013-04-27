'use strict';

angular.module('swa.map')
  .controller('MapCtrl', function ($scope,OpenLayersMap) {
        OpenLayersMap.createMap('map');
        OpenLayersMap.setCenter(8.486863,47.381258,18);

    });
