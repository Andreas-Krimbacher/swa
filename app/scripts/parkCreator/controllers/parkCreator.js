'use strict';

angular.module('swa.parkCreator')
    .controller('ParkCreatorCtrl', ['$scope','settings','layer',function ($scope,settings,layer) {

    $scope.toolbarVisibility = true;



    $scope.$on('setLineLayerState', function(e,state) {
        layer.setLayerVisibility('LINESTRING',state);
    });
    $scope.$on('setPointLayerState', function(e,state) {
        layer.setLayerVisibility('POINT',state);
    });
    $scope.$on('sliderChanged', function(e,value) {
        layer.setLayerOpacity('POLYGON',value.value/100);
    });
    $scope.$on('setMapType', function(e,type) {
//        if(type == 'publish') layer.featuresToWKTPlusAttr();
        if(type == 'publish'){
            $scope.toolbarVisibility = false;
            $scope.$broadcast('goPublishMode');
            layer.setLayerVisibility('LINESTRING',true);
            layer.setLayerVisibility('POINT',true);
            layer.setLayerOpacity('POLYGON',1);
            $scope.$broadcast('updateLayerControl',{line : true, point : true, poly : 1});
            $scope.$broadcast('deactivateToolbar');
        }
        else{
            $scope.toolbarVisibility = true;
            $scope.$broadcast('goEditMode');
        }



    });
}]);
