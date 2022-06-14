require([
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
    "esri/widgets/Search",
    "esri/widgets/Locate"
], function (
    WebMap, MapView, Expand, BasemapGallery, BasemapToggle, Home, Legend, LayerList, Print, ScaleBar, Search, Locate
) {
    var map = new WebMap({ portalItem: {
        id: "b5cc864eeab34258baa30f8ff9cbfe9e"
    } 
});

    // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#constructors-summary
    var view = new MapView({
        container: "viewDiv", 
        map: map,
        ui: {
            components: ["zoom", "compass", "attribution"]
        }
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

        var locate = new Locate({
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

        view.ui.add(home, { position: "top-left" });
        view.ui.add(locate, { position: "top-left" });
        view.ui.add(searchExpand, "top-right");
        view.ui.add(legendExpand, { position: "top-right" });
        view.ui.add(listExpand, "top-right");
        view.ui.add(printExpand, { position: "top-right" });
        view.ui.add(scaleBar, { position: "bottom-left" });
        view.ui.add(basemapToggle, { position: "bottom-right" });
        view.ui.add(baseMapExpand, { position: "bottom-right" });
    });
});
