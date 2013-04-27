'use strict';

angular.module('swa.util')
  .factory('util', function () {
    // Service logic



    // Public API here
    return {
        WKTToFeature : function(wkt,attr){
            var WKTParser = new OpenLayers.Format.WKT();

            var feature = WKTParser.read(wkt);
            feature.geometry.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));

            feature.attributes = attr;

            return feature;
        },
        featureToWKT : function(feature){
            var WKTParser = new OpenLayers.Format.WKT();
            var tmpFeature;

            tmpFeature = feature.clone();
            tmpFeature.geometry.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));

            var wkt = WKTParser.write(tmpFeature);

            return wkt;
        }
    };
  });
