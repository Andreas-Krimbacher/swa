lib.DrawFeature = Class.extend({
    icon : null,

    toolbarIcon : null,

    geomType : null,

    color : null,

    iconType : null,

    iconName : null,

    init : function(options){

        $.extend(true,this,options);
        if(this.iconType == 'maki') this.createIconsFromMaki();
        if(this.iconType == 'glyphicons') this.createIconsGlyphicons();
    },
    createIconsFromMaki : function(){
        var canvas = document.createElement('canvas');
        canvas.width = '18';
        canvas.height = '18';
        var ctx = canvas.getContext('2d');
        var makiSpriteWhite = new Image();
        makiSpriteWhite.src = lib.util.makiIcons.srcWhite;

        var that = this;
        makiSpriteWhite.onload = function() {
            var iconData = lib.util.makiIcons[that.iconName]['18'];
            ctx.drawImage(makiSpriteWhite, iconData.x, iconData.y, 18,18,0,0,18,18);

            if(that.color){
                var map = ctx.getImageData(0,0,18,18);
                var imdata = map.data;

                var rgb = lib.util.hexToRgb(that.color);
                var weight = 1;
                for(var p = 0, len = imdata.length; p < len; p+=4) {
                    imdata[p] += (rgb.r-imdata[p]) * weight; //r
                    imdata[p+1] += (rgb.g-imdata[p+1]) * weight; //g
                    imdata[p+2]+= (rgb.b-imdata[p+2]) * weight; //b
                }
                ctx.clearRect(0,0,18,18);
                ctx.putImageData(map,0,0);
            }

            that.toolbarIcon = canvas.toDataURL();
        }
    },
    createIconsGlyphicons : function(){
        var canvas = document.createElement('canvas');
        canvas.width = '18';
        canvas.height = '18';
        var ctx = canvas.getContext('2d');
        var glyphiconsSpriteWhite = new Image();
        glyphiconsSpriteWhite.src = lib.util.glyphicons.srcWhite;

        var that = this;
        glyphiconsSpriteWhite.onload = function() {
            var iconData = lib.util.glyphicons[that.iconName]['14'];
            ctx.drawImage(glyphiconsSpriteWhite, iconData.x, iconData.y, 14,14,2,2,14,14);

            if(that.color){
                var map = ctx.getImageData(2,2,14,14);
                var imdata = map.data;

                var rgb = lib.util.hexToRgb(that.color);
                var weight = 1;
                for(var p = 0, len = imdata.length; p < len; p+=4) {
                    imdata[p] += (rgb.r-imdata[p]) * weight; //r
                    imdata[p+1] += (rgb.g-imdata[p+1]) * weight; //g
                    imdata[p+2]+= (rgb.b-imdata[p+2]) * weight; //b
                }
                ctx.clearRect(2,2,14,14);
                ctx.putImageData(map,2,2);
            }

            that.toolbarIcon = canvas.toDataURL();
        }
    }
});
