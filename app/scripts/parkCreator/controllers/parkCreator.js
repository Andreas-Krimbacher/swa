'use strict';

angular.module('swa.parkCreator')
    .controller('ParkCreatorCtrl', ['$scope','settings',function ($scope,settings) {

    $scope.$on('setLineLayerState', function(e,state) {
            alert('line '+state);
        });
    $scope.$on('setPointLayerState', function(e,state) {
            alert('point '+state);
        });
    $scope.$on('sliderChanged', function(e,value) {
            alert('poly '+value.value);
        });
    $scope.$on('setMapType', function(e,type) {
        alert(type);
    });
    }]);
