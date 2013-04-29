'use strict';

angular.module('swa.parkCreator.toolbar')
    .controller('ToolbarCtrl', ['$scope','layer','settings','$http',function ($scope,layer,settings,$http) {

    layer.initLayers();
//    $http.get('park2.json')
//        .then(function(jsonFeatures){
//            layer.addFeaturesFromJson(jsonFeatures);
//        });
//    var jsonFeatures = JSON.parse('[{"type":"POINT","wkt":"POINT(8.483834786022213 47.38164302632966)","attributes":{"type":"POINT"}},{"type":"POINT","wkt":"POINT(8.484231752956495 47.38183917073729)","attributes":{"type":"POINT"}},{"type":"POINT","wkt":"POINT(8.484317583644932 47.38157038006797)","attributes":{"type":"POINT"}},{"type":"POINT","wkt":"POINT(8.48468236407095 47.38165029095057)","attributes":{"z":"403"}},{"type":"LINESTRING","wkt":"LINESTRING(8.484800381267654 47.3805896457315,8.487557692134919 47.38028452466169,8.488265795314868 47.381657555570456,8.486956877315585 47.38215154736159)","attributes":{"type":"LINESTRING"}},{"type":"POLYGON","wkt":"POLYGON((8.48629437168881 47.380789426427825,8.487324339950513 47.381050956376875,8.485752565467827 47.38165392326065,8.485098106468232 47.38111997100828,8.485929591262792 47.38111997100828,8.48629437168881 47.380789426427825))","attributes":{"type":"POLYGON"}}]');
//

    $scope.process = false;
    $scope.mode = null;
    $scope.attrInput = false;



    $scope.drawFeatures = [];
    var pointFeatures = settings.getDrawFeatures('POINT');
    var lineFeatures = settings.getDrawFeatures('LINESTRING');
    var polygonFeatures = settings.getDrawFeatures('POLYGON');

    $scope.$on('deactivateToolbar', function(e,value) {
        layer.deactivateAllControls();
        $scope.drawFeatures = [];
        $scope.mode = null;
    });

    $scope.changeType = function(type){
        layer.deactivateAllControls();
        if(type == 'POINT'){
            $scope.drawFeatures = pointFeatures;
            $scope.mode = 'point';
        }
        if(type == 'LINESTRING'){
            $scope.drawFeatures = lineFeatures;
            $scope.mode = 'line';
        }
        if(type == 'POLYGON'){
            $scope.drawFeatures = polygonFeatures;
            $scope.mode = 'poly';
        }

        $scope.process = false;
    };

    $scope.drawFeature = function(feature){
        layer.startCreateFeature(feature);
        $scope.process = true;
    };

    $scope.editFeature = function(){
        $scope.process = true;
        $scope.drawFeatures = [];
        layer.startEditing();
        $scope.mode = 'edit';
    };

    $scope.cancelProcess = function(){
        layer.deactivateAllControls();
        $scope.process = false;
        if($scope.mode == 'edit' || $scope.mode == 'delete') $scope.mode = null;
    };

    $scope.deleteFeature = function(){
        $scope.process = true;
        $scope.drawFeatures = [];
        layer.startDeleting();
        $scope.drawFeatures = [];
        $scope.mode = 'delete';
    };

}]);
