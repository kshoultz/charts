require([
    "esri/WebMap", 
    "esri/views/MapView",
], function (WebMap, MapView) {
    var layer;

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

    // create a new popupTemplate for the layer
    var popupTemplate = {
        title: "Issue Type: {IssueType} - ID: {OBJECTID}",
        content: {
            type: "fields",
            fieldInfos: []
        }
    };
    
    view.when(function () {
        // Looping through your layers: 
        map.layers.forEach(function(layer) {
            // Operational Layers.
            console.log("Loop: layer: ", layer); // Layer id = "Enriched Requests_2790"
            layer.outFields = ["*"];
            layer.popupTemplate = popupTemplate;
        });
    });
});
