'use strict';

angular.module('swa.map')
    .controller('MapCtrl', ['$scope','OpenLayersMap',function ($scope,OpenLayersMap) {
    OpenLayersMap.createMap('map');
    OpenLayersMap.setCenter(8.486863,47.381258,18);

    $scope.baseSwitcherVisibility = true;
    $scope.layerControlVisibility = true;

    $scope.$on('goPublishMode', function() {
        $scope.baseSwitcherVisibility = false;
        $scope.layerControlVisibility = false;
        OpenLayersMap.setBasemap('publish');
    });

    $scope.$on('goEditMode', function() {
        $scope.baseSwitcherVisibility = true;
        $scope.layerControlVisibility = true;
        OpenLayersMap.setBasemap('gsat');
    });

}]);
