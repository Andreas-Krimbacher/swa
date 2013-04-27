'use strict';

angular.module('swa')
    .factory('settings', function () {
        // Service logic


        var drawFeatures = [];
        drawFeatures.push(new lib.DrawFeature({
            name : 'Baum',
            toolbarIcon : 'tree.png',
            geomType : 'POLYGON'
        }));



        // Public API here
        return {
            getDrawFeatures: function () {
                return drawFeatures;
            }
        };
    });
