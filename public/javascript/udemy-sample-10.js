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
        fieldInfos: [  
            { fieldName: "RequestDate", label:'Request Date', visible:true, format:{ dateFormat: 'shortDateShortTime' } }  
        ],  
        content: "TractName: {TractName}<br/>" +
            "Request Date:{RequestDate:DateFormat}<br/>" + 
            "Description: {Description}<br/>" +
            "Assignee: {Assignee}"
    };
    
    view.when(function () {
        // Looping through your layers: 
        map.layers.forEach(function(layer) {
            // Operational Layers.
            console.log("Loop: layer: ", layer); // Layer id = "Enriched Requests_2790"
            layer.popupTemplate = popupTemplate;
        });

        // You can get your layer if you know the id for it: 
        // console.log("findLayerById: layer.id:", map.findLayerById("votes_dot_choropleth_final10_9230").id);
        // layer = map.findLayerById("SouthernCaliforniaPoliticalAffiliations_9452_2158")
    });
});
