require([
    "esri/WebMap", // We are now using the WebMap module.
    "esri/views/MapView"
], function (
    WebMap, // We are now using the WebMap module.
    MapView 
) {
    var map = new WebMap({ portalItem: {
        id: "b5cc864eeab34258baa30f8ff9cbfe9e"
    } 
}); // We are now using the WebMap module.

    // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#constructors-summary
    var view = new MapView({
        container: "viewDiv", 
        map: map,
        zoom: 10,
        center: [-118, 34]
    });

    view.when(function () {
        // Looping through your layers: 
        map.layers.forEach(function(layer) {
            // Operational Layers.
            console.log("Loop: layer.id: ", layer.id); // Layer id = "Enriched Requests_2790"
        });

        // You can get your layer if you know the id for it: 
        console.log("findLayerById: layer.id:", map.findLayerById("Enriched Requests_2790").id);
    });
});
