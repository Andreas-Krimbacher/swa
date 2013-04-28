var lib =  {};

lib.util = {};

lib.util.makiIcons = {
    srcBlack : 'styles/images/maki-sprite.png',
    srcWhite : 'styles/images/maki-sprite-white.png',
    garden :{
        18 : {
            x : 258,
            y : 144
        }
    },
    school :{
        18 : {
            x : 414,
            y : 0
        }
    },
    park2 :{
        18 : {
            x : 258,
            y : 24
        }
    },
    toilets :{
        18 : {
            x : 414,
            y : 240
        }
    }
};

lib.util.glyphicons = {
    srcBlack : 'styles/images/glyphicons-halflings.png',
    srcWhite : 'styles/images/glyphicons-halflings-white.png',
    thlarge :{
        14 : {
            x : 216,
            y : 0
        }
    },
    ok :{
        14 : {
            x : 288,
            y : 0
        }
    }
};

lib.util.hexToRgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

lib.util.rgbToHex = function(r,g,b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};