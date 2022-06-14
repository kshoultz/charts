require([
    // "esri/Map", 
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/geometryEngine",
    "esri/core/watchUtils",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Home",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Print",
    "esri/widgets/ScaleBar",
    "esri/widgets/Search"
], function (
    SimpleMarkerSymbol, geometryEngine, watchUtils, WebMap, MapView, Expand, BasemapGallery, BasemapToggle, Home, Legend, LayerList, Print, ScaleBar, Search
    ) {
        var layer; // This will be used to store the layer, so I can use it in the click function.

        // This one failed. And I like the error response I got back:
        // portalItem: {id: "2dfaf8bd45a4dcf8511a84583873"}
        var map = new WebMap({
            portalItem: {id: "2dfaf8bdb45a4dcf8511a849e4583873"}
        });

        var view = new MapView({
            container: "viewDiv", 
            map: map,
            ui: {
                components: ["zoom", "compass", "attribution"]
            }
        });

        view.when(function () {
            // Looping through your layers: 
            map.layers.forEach(function(layer) {
                // Operational Layers.
                console.log("Loop: layer: ", layer); // Layer id = "Enriched Requests_2790"
            });

            // You can get your layer if you know the id for it: 
            console.log("findLayerById: layer.id:", map.findLayerById("votes_dot_choropleth_final10_9230").id);
            layer = map.findLayerById("SouthernCaliforniaPoliticalAffiliations_9452_2158")
        });

        view.on("click", function(event) {
            var screenPoint = {
                x: event.x,
                y: event.y
            };
            var mapPoint = view.toMap(screenPoint);
            var buffer = geometryEngine.buffer(mapPoint, 5000, "feet");
            var query = layer.createQuery();
            query.geometry = buffer;
            // Query is only querying the data currently available to draw:
            layer.queryFeatures(query).then((results) => {
                var features = results.features.map(graphic => {
                    graphic.symbol = new SimpleMarkerSymbol({
                        style: "square", 
                        size: 8,
                        color: "blue"
                    });
                    return graphic;
                });
                view.graphics.removeAll();
                view.graphics.addMany(features);
            })
            .otherwise(error => console.warn(error));
        });
});
