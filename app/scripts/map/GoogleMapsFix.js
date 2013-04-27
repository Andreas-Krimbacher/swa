OpenLayers.Layer.Google.v3.loadMapObject = function() {
    if (!this.type) {
        this.type = google.maps.MapTypeId.ROADMAP;
    }
    var mapObject;
    var cache = OpenLayers.Layer.Google.cache[this.map.id];
    if (cache) {
        // there are already Google layers added to this map
        mapObject = cache.mapObject;
        // increment the layer count
        ++cache.count;
    } else {
        // this is the first Google layer for this map

        var container = this.map.viewPortDiv;
        var div = document.createElement("div");
        div.id = this.map.id + "_GMapContainer";
        div.style.position = "absolute";
        div.style.width = "100%";
        div.style.height = "100%";
        container.appendChild(div);

        // create GMap and shuffle elements
        var center = this.map.getCenter();
        mapObject = new google.maps.Map(div, {
            center: center ?
                new google.maps.LatLng(center.lat, center.lon) :
                new google.maps.LatLng(0, 0),
            zoom: this.map.getZoom() || 0,
            mapTypeId: this.type,
            disableDefaultUI: true,
            keyboardShortcuts: false,
            draggable: false,
            disableDoubleClickZoom: true,
            scrollwheel: false,
            streetViewControl: false,
            tilt : 0
        });

        // cache elements for use by any other google layers added to
        // this same map
        cache = {
            mapObject: mapObject,
            count: 1
        };
        OpenLayers.Layer.Google.cache[this.map.id] = cache;
        this.repositionListener = google.maps.event.addListenerOnce(
            mapObject,
            "center_changed",
            OpenLayers.Function.bind(this.repositionMapElements, this)
        );
    }
    this.mapObject = mapObject;
    this.setGMapVisibility(this.visibility);
};