'use strict';

angular.module('swa.map')
    .factory('layer',['OpenLayersMap','util', function (OpenLayersMap,util) {
    // Service logic
    var pointLayer = null;
    var lineLayer = null;
    var polyLayer = null;

    var drawControl = null;
    var modifyControl = null;
    var selectEditControl = null;
    var deleteControl = null;
    var currentCreateControl = null;
    var currentEditFeature =  null;

    var currentCreateFeature = null;

    var featureStylePoint = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            graphicWidth: "${graphicWidth}",
            graphicHeight: "${graphicHeight}",
            externalGraphic: "${externalGraphic}"
        }),
        "temporary": new OpenLayers.Style({
            graphicWidth: "${graphicWidth}",
            graphicHeight: "${graphicHeight}",
            externalGraphic: "${externalGraphic}",
            cursor: "pointer"
        }),
        "select": new OpenLayers.Style({
            graphicWidth: "${graphicWidth}",
            graphicHeight: "${graphicHeight}",
            externalGraphic: "${externalGraphic}",
            cursor: "pointer"
        }),
        "vertex": {
            graphicWidth: "${graphicWidth}",
            graphicHeight: "${graphicHeight}",
            externalGraphic: "${externalGraphic}",
            cursor: "pointer"
        }
    });

    var featureStylePointCreate = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            graphicWidth: "18",
            graphicHeight: "18",
            externalGraphic: 'styles/icons/airfield-18.png'
        })
    });

    var featureStyleLine = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "${strokeColor}",
            strokeWidth: "${strokeWidth}"
        }),
        "temporary": new OpenLayers.Style({
            strokeColor: "${strokeColor}",
            strokeWidth: "${strokeWidth}",
            cursor: "pointer"
        }),
        "select": new OpenLayers.Style({
            strokeColor: "${strokeColor}",
            strokeWidth: "${strokeWidth}",
            cursor: "pointer"
        }),
        "vertex": new OpenLayers.Style({
            strokeColor: "${strokeColor}",
            strokeWidth: "${strokeWidth}",
            pointRadius: 6,
            cursor: "pointer"
        })
    });

    var featureStyleLineCreate = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "#C03333",
            pointRadius: 4,
            strokeWidth: 6
        })
    });

    var featureStylePoly = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "${strokeColor}",
            fillColor:"${fillColor}"
        }),
        "temporary": new OpenLayers.Style({
            strokeColor: "${strokeColor}",
            fillColor:"${fillColor}",
            cursor: "pointer"
        }),
        "select": new OpenLayers.Style({
            strokeColor: "${strokeColor}",
            fillColor:"${fillColor}",
            cursor: "pointer"
        }),
        "vertex": new OpenLayers.Style({
            strokeColor: "${strokeColor}",
            fillColor:"${fillColor}",
            pointRadius: 6,
            cursor: "pointer"
        })
    });

    var featureStylePolyCreate = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "#C03333",
            fillColor:'#C03333',
            pointRadius: 4
        })
    });


    var updateDrawStyle = function(feature){
        if(feature.geomType == 'POINT'){
            drawControl[feature.geomType].handler.layerOptions.zIndex = 650;
            featureStylePointCreate.styles.default.defaultStyle = feature.drawAttributes;
            featureStylePointCreate.styles.default.defaultStyle.pointRadius = 4;
            drawControl[feature.geomType].handler.layerOptions.styleMap = featureStylePointCreate;
        }
        if(feature.geomType == 'LINESTRING'){
            drawControl[feature.geomType].handler.layerOptions.zIndex = 550;
            featureStyleLineCreate.styles.default.defaultStyle = feature.drawAttributes;
            featureStyleLineCreate.styles.default.defaultStyle.pointRadius = 4;
            drawControl[feature.geomType].handler.layerOptions.styleMap = featureStyleLineCreate;
        }
        if(feature.geomType == 'POLYGON'){
            drawControl[feature.geomType].handler.layerOptions.zIndex = 450;
            featureStylePolyCreate.styles.default.defaultStyle = feature.drawAttributes;
            featureStylePolyCreate.styles.default.defaultStyle.pointRadius = 4;
            drawControl[feature.geomType].handler.layerOptions.styleMap = featureStylePolyCreate;
        }

    };

    var deactivateAllControls = function(){
        if(currentCreateControl){
            currentCreateControl.deactivate();
            currentCreateControl = null;
        }

        if(currentEditFeature){
            currentEditFeature.layer.modifyControl.unselectFeature(currentEditFeature);
            currentEditFeature = null;
        }
        selectEditControl.unselectAll();
        selectEditControl.deactivate();
        deleteControl.deactivate();
    };

    // Public API here
    return {
        initLayers : function(){
            pointLayer = new OpenLayers.Layer.Vector("POINT",{
                styleMap: featureStylePoint
            });

            pointLayer.events.register('beforefeatureadded', this, function(e){
                e.feature.attributes = currentCreateFeature.drawAttributes;
            });

            pointLayer.setZIndex(600);

            lineLayer = new OpenLayers.Layer.Vector("LINESTRING",{
                styleMap: featureStyleLine
            });

            lineLayer.events.register('beforefeatureadded', this, function(e){
                e.feature.attributes = currentCreateFeature.drawAttributes;
            });

            lineLayer.setZIndex(500);

            polyLayer = new OpenLayers.Layer.Vector("POLYGON",{
                styleMap: featureStylePoly
            });

            polyLayer.events.register('beforefeatureadded', this, function(e){
                e.feature.attributes = currentCreateFeature.drawAttributes;
            });

            polyLayer.setZIndex(400);

            //never ever change the order, otherwise the order of the layers in the select control will change
            OpenLayersMap.addLayers([polyLayer,lineLayer,pointLayer]);


            var drawOptions = {
                handlerOptions:{
                    layerOptions : {
                        zIndex : 450
                    }
                }
            };

            drawControl = {
                POINT: new OpenLayers.Control.DrawFeature(pointLayer,
                    OpenLayers.Handler.Point,drawOptions),
                LINESTRING: new OpenLayers.Control.DrawFeature(lineLayer,
                    OpenLayers.Handler.Path,drawOptions),
                POLYGON: new OpenLayers.Control.DrawFeature(polyLayer,
                    OpenLayers.Handler.Polygon,drawOptions)
            };


            modifyControl = {
                POINT: new OpenLayers.Control.ModifyFeature(pointLayer, {vertexRenderIntent: "vertex"}),
                LINESTRING: new OpenLayers.Control.ModifyFeature(lineLayer, {vertexRenderIntent: "vertex"}),
                POLYGON: new OpenLayers.Control.ModifyFeature(polyLayer, {vertexRenderIntent: "vertex"})
            };

            pointLayer.modifyControl = modifyControl.POINT;
            lineLayer.modifyControl = modifyControl.LINESTRING;
            polyLayer.modifyControl = modifyControl.POLYGON;

            selectEditControl = new OpenLayers.Control.SelectFeature([polyLayer,lineLayer,pointLayer],{
                onSelect : function(feature){
                    if(currentEditFeature) currentEditFeature.layer.modifyControl.unselectFeature(currentEditFeature);
                    feature.layer.modifyControl.selectFeature(feature);
                    currentEditFeature = feature;
                },
                onUnselect : function(feature){
                    pointLayer.setZIndex(600);
                    lineLayer.setZIndex(500);
                    polyLayer.setZIndex(400);

                    if(currentEditFeature){
                        currentEditFeature.layer.modifyControl.unselectFeature(currentEditFeature);
                        currentEditFeature = null;
                    }
                }
            });

            deleteControl = new OpenLayers.Control.SelectFeature([pointLayer,lineLayer,polyLayer],{
                onSelect : function(feature){
                    feature.layer.destroyFeatures([feature]);
                }
            });

            OpenLayersMap.addControls([drawControl,modifyControl,selectEditControl,deleteControl]);

        },
        startCreateFeature : function(feature){
            deactivateAllControls();
            updateDrawStyle(feature);
            currentCreateFeature = feature;
            drawControl[feature.geomType].activate();
            currentCreateControl = drawControl[feature.geomType];
        },
        stopCreateFeature : function(type){
            if(!type && currentCreateControl) currentCreateControl.deactivate();
            else if(type) drawControl[type].deactivate();
            currentCreateControl = null;
        },
        startEditing : function(){
            deactivateAllControls();
            selectEditControl.activate();
        },
        stopEditing : function(){
            if(currentEditFeature){
                currentEditFeature.layer.modifyControl.unselectFeature(currentEditFeature);
                currentEditFeature = null;
            }
            selectEditControl.deactivate();
        },
        startDeleting : function(){
            deactivateAllControls();
            deleteControl.activate();
        },
        stopDeleting : function(){
            deleteControl.deactivate();
        },
        setLayerVisibility : function(type,state){
            if(type == 'POINT') pointLayer.setVisibility(state);
            if(type == 'LINESTRING') lineLayer.setVisibility(state);
            if(type == 'POLYGON') polyLayer.setVisibility(state);
        },
        setLayerOpacity : function(type,value){
            if(type == 'POINT') pointLayer.setOpacity(value);
            if(type == 'LINESTRING') lineLayer.setOpacity(value);
            if(type == 'POLYGON') polyLayer.setOpacity(value);
        },
        deactivateAllControls : function(){
            deactivateAllControls();
        },
        featuresToWKTPlusAttr : function(){
            var featuresJson = [];
            for(var x in pointLayer.features){
                featuresJson.push({
                    type : 'POINT',
                    wkt : util.featureToWKT(pointLayer.features[x]),
                    attributes : pointLayer.features[x].attributes
                })
            }
            for(var x in lineLayer.features){
                featuresJson.push({
                    type : 'LINESTRING',
                    wkt : util.featureToWKT(lineLayer.features[x]),
                    attributes : lineLayer.features[x].attributes
                })
            }
            for(var x in polyLayer.features){
                featuresJson.push({
                    type : 'POLYGON',
                    wkt : util.featureToWKT(polyLayer.features[x]),
                    attributes : polyLayer.features[x].attributes
                })
            }

            return featuresJson;
        },
        addFeaturesFromJson : function(jsonFeatures){
            var feature;
            for(var x in jsonFeatures){
                feature = util.WKTToFeature(jsonFeatures[x].wkt,jsonFeatures[x].attributes);
                if(jsonFeatures[x].type == 'POINT') pointLayer.addFeatures([feature]);
                if(jsonFeatures[x].type == 'LINESTRING') lineLayer.addFeatures([feature]);
                if(jsonFeatures[x].type == 'POLYGON') polyLayer.addFeatures([feature]);
            }
        }
    }
}]);
