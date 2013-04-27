'use strict';

angular.module('swa.map')
    .factory('OpenLayersMap', function ($rootScope) {
        // Service logic
        var map = null;
        var offline = false;

        var _basemaps = {};
        var _currentBasempas = null;

        var  _setBasemap = function(id){
            if(_currentBasempas){
                map.removeLayer(_currentBasempas.map);
                _currentBasempas.active = false;
            }
            map.addLayer(_basemaps[id].map);
            _basemaps[id].active = true;
            _currentBasempas = _basemaps[id];
        }


        // Public API here
        return {
            getMap : function(){
                return map;
            },
            createMap : function (divId) {
                var options = {
                    projection: "EPSG:900913",
                    units: 'm'
                };
                map = new OpenLayers.Map(divId,options);

                _basemaps = {};
                _currentBasempas = null;

                var osm = new OpenLayers.Layer.OSM('Simple OSM Map');
                _basemaps.osm = {name:'OpenStreet Map',map:osm,active:false};

                if(!offline){
                    var gmap = new OpenLayers.Layer.Google(
                        "Google Streets",
                        {numZoomLevels: 22}
                    );
                    _basemaps.gmap = {name:'Google Streets',map:gmap,active:false};

                    var ghyb = new OpenLayers.Layer.Google(
                        "Google Hybrid",
                        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22}
                    );
                    _basemaps.ghyb = {name:'Google Hybrid',map:ghyb,active:false};

                    var gsat = new OpenLayers.Layer.Google(
                        "Google Satellite",
                        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
                    );
                    _basemaps.gsat = {name:'Google Luftbild',map:gsat,active:false};

                    _setBasemap('gsat');
                }
                else{
                    _setBasemap('osm');
                }

            },
            setCenter: function(Lon,Lat,Zoom){
                map.setCenter(
                    new OpenLayers.LonLat(Lon,Lat).transform(
                        new OpenLayers.Projection("EPSG:4326"),
                        map.getProjectionObject()
                    ), Zoom
                );
            },
            getBasemaps: function(){
                return _basemaps;
            },
            setBasemap: function(id){
                _setBasemap(id);
            }
        }
    });
