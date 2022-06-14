// The first array needs to match the properties in the function. 
// This is a map to the components you want to use.
// Order matters in these two. 
require([
    "esri/Map", // First module path.
    "esri/views/MapView", // Second module path
    "esri/layers/FeatureLayer"
], function (
    Map, // First module object.
    MapView,
    FeatureLayer // Second module object
) {
    // initialize a new map instance:
    var map = new Map({ basemap: "topo" }); // types: "streets" || "topo"

    // To display the map:
    // API Documentation: 
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#constructors-summary
    var view = new MapView({
        container: "viewDiv", // Points to the id of the element to attach the map to. 
        map: map,
        zoom: 10,
        center: [-118, 34],
        rotation: 30
    });

    // Example of adding a call to the shareable service:
    Ext.Ajax.request({
        url: '/featureLayer',
        method: 'GET'
    }).then(function(response) {
        var layerConfig = JSON.parse(response.responseText);
        var lyr = new FeatureLayer(layerConfig);
        map.add(lyr);
    }).always(function() {
        // clean-up logic, regardless the outcome
    }).otherwise(function(reason){
        console.log(reason);
    });
});
