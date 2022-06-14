
require([
    "esri/WebMap", 
    "esri/views/MapView",
    "esri/core/Accessor", 
    "esri/Graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Point"
], function (WebMap, MapView, Accessor, Graphic, SimpleMarkerSymbol, Point) {
    
    var map = new WebMap({
        portalItem: { id: "b5cc864eeab34258baa30f8ff9cbfe9e" } 
    });

    var view = new MapView({
        container: "viewDiv", 
        map: map,
        ui: {
            components: ["zoom", "compass", "attribution"]
        }
    });

    var Model = Accessor.createSubclass({
        properties: {
            feature: Graphic
        }
    });

    var model = new Model();
    model.properties = {
        name: {
            value: "Sam", 
            readOnly: true
        }
    };
    model.feature = {
        symbol: new SimpleMarkerSymbol({
            style: "square", 
            size: 8,
            color: "blue"
        }),
        geometry: new Point([181.174, 34.024]),
        attributes: {
            name: "Charlie"
        },
        popupTemplate: {
            title: "MyMarker",
            content: "{*}"
        }
    };
    
    model.watch("feature", (feature, oldFeature) => {
        view.graphics.remove(oldFeature);
        view.graphics.add(feature);
    });
});
