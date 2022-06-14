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
            fieldInfos: [  
                { fieldName: "IssueType", label: 'Issue Type', visible: true },
                { fieldName: "OBJECTID", label: 'Object Id', visible: true },
                { fieldName: "TractName", label: 'Tract Name', visible: true },
                { fieldName: "RequestDate", label: 'Request Date', visible: true, format:{ dateFormat: 'shortDateShortTime' } },
                { fieldName: "Description", label: 'Description', visible: true },
                { fieldName: "Assignee", label: 'Assignee', visible: true }  
            ]
        }
    };
    
    view.when(function () {
        // Looping through your layers: 
        map.layers.forEach(function(layer) {
            // Operational Layers.
            console.log("Loop: layer: ", layer); // Layer id = "Enriched Requests_2790"
            // layer.popupTemplate = popupTemplate;
        });
    });
});
