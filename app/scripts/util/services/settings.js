'use strict';

angular.module('swa')
    .factory('settings', function () {
        // Service logic


        var drawFeatures = [];
        drawFeatures.push(new lib.DrawFeature({
            name : 'Baum',
            geomType : 'POINT',
            iconType : 'maki',
            iconName : 'park2'
            }),
            new lib.DrawFeature({
                name : 'Blume',
                geomType : 'POINT',
                iconType : 'maki',
                iconName : 'garden'
            }),
            new lib.DrawFeature({
                name : 'Spielplatz',
                geomType : 'POINT',
                iconType : 'maki',
                iconName : 'school'
            }),
            new lib.DrawFeature({
                name : 'WC',
                geomType : 'POINT',
                iconType : 'maki',
                iconName : 'toilets'
            }));

        drawFeatures.push(new lib.DrawFeature({
            name : 'Wiese',
            geomType : 'POLYGON',
            iconType : 'glyphicons',
            iconName : 'thlarge',
            color : '#07E70B'
        }),
            new lib.DrawFeature({
                name : 'Haus',
                geomType : 'POLYGON',
                iconType : 'glyphicons',
                iconName : 'thlarge',
                color : '#A3A14C'
            }),
            new lib.DrawFeature({
                name : 'Spielplatz',
                geomType : 'POLYGON',
                iconType : 'glyphicons',
                iconName : 'thlarge',
                color : '#514F0E'
            }));

        drawFeatures.push(new lib.DrawFeature({
            name : 'Fluss',
            geomType : 'LINESTRING',
            iconType : 'glyphicons',
            iconName : 'ok',
            color : '#271ECD'
        }),
            new lib.DrawFeature({
                name : 'Weg',
                geomType : 'LINESTRING',
                iconType : 'glyphicons',
                iconName : 'ok',
                color : '#A46E1D'
            }));

        // Public API here
        return {
            getDrawFeatures: function (type) {
                if(!type)  return drawFeatures;

                var result = [];
                var x;

                if(type == 'POINT'){
                    for(x in drawFeatures){
                        if(drawFeatures[x].geomType == 'POINT') result.push(drawFeatures[x]);
                    }
                    return result;
                }
                if(type == 'LINESTRING'){
                    for(x in drawFeatures){
                        if(drawFeatures[x].geomType == 'LINESTRING') result.push(drawFeatures[x]);
                    }
                    return result;
                }
                if(type == 'POLYGON'){
                    for(x in drawFeatures){
                        if(drawFeatures[x].geomType == 'POLYGON') result.push(drawFeatures[x]);
                    }
                    return result;
                }

                return false;
            }
        };
    });
