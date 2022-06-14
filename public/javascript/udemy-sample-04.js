require([
    // "esri/Map", 
    "esri/WebScene",
    "esri/views/SceneView",
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
    WebScene, SceneView, Expand, BasemapGallery, BasemapToggle, Home, Legend, LayerList, Print, ScaleBar, Search
) {
    // var map = new Map({
    //     basemap: "satellite",
    //     ground: "world-elevation"
    // });

    var map = new WebScene({
        portalItem: {id: "e18d908bacd440f6ab15b75e85f637b4"}
    });

    var view = new SceneView({
        container: "viewDiv", 
        map: map,
        ui: {
            components: ["zoom", "compass", "attribution"]
        }
    });

    view.watch("camera", function(camera){
        console.log(camera.position.x, camera.position.y);
        console.log(camera.tilt);
    });


    view.then(function () {
        var search = new Search({
          view: view
        });

        var basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });

        var basemapToggle = new BasemapToggle({
            view: view, 
            nextBasemap: "hybrid"
        });

        var home = new Home({
            view: view, 
            container: document.createElement("div")
        });

        var scaleBar = new ScaleBar({
            view: view, 
            container: document.createElement("div")
        });

        var legend = new Legend({
            view: view
        });

        var layerList = new LayerList({
            view: view, 
            container: document.createElement("div")
        });

        var print = new Print({
            view: view, 
            printServiceUrl: "https://www.example.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        });

        var searchExpand = new Expand({
            view: view,
            content: search,
            expandIconClass: "esri-icon-search"
        });

        var legendExpand = new Expand({
            view: view, 
            content: legend,
            expandIconClass: "esri-icon-layers"
        });

        var listExpand = new Expand({
            view: view, 
            content: layerList.domNode,
            expandIconClass: "esri-icon-layer-list"
        });

        var baseMapExpand = new Expand({
            view: view,
            content: basemapGallery,
            expandIconClass: "esri-icon-basemap"
        })

        var printExpand = new Expand({
            view: view,
            content: print,
            expandIconClass: "esri-icon-printer"
        });

        view.ui.add(searchExpand, "top-right");
        view.ui.add(legendExpand, { position: "top-right" });
        view.ui.add(listExpand, "top-right");
        view.ui.add(home, { position: "top-left" });
        view.ui.add(printExpand, { position: "top-right" });
        view.ui.add(scaleBar, { position: "bottom-left" });
        view.ui.add(basemapToggle, { position: "bottom-right" });
        view.ui.add(baseMapExpand, { position: "bottom-right" });


        
    setTimeout(function(){
        var camera = view.camera.clone();
        // you could save a position to replay.
        camera.position = {
            x: -118,
            y: 34
        };
        view.goTo(camera)
    }, 5000);
    });
});
