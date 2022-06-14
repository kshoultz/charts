require([
    // "esri/Map", 
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
    watchUtils, WebMap, MapView, Expand, BasemapGallery, BasemapToggle, Home, Legend, LayerList, Print, ScaleBar, Search
    ) {
        // var map = new Map({
        //     basemap: "satellite",
        //     ground: "world-elevation"
        // });


        var view = new MapView({
            container: "viewDiv", 
            //map: map,
            ui: {
                components: ["zoom", "compass", "attribution"]
            }
        });

        var webMapIds = [
            "2dfaf8bdb45a4dcf8511a849e4583873",
            "e18d908bacd440f6ab15b75e85f637b4"
        ];

        console.log(webMapIds);

        var webmaps = webMapIds.map((webMapId) => {
            return new WebMap({
                portalItem: {
                    "id": webMapId
                }
            })
        });

        console.log(webmaps);

        // // This one failed. And I like the error response I got back:
        // // portalItem: {id: "2dfaf8bd45a4dcf8511a84583873"}
        // var map = new WebMap();



        // This one failed. And I like the error response I got back:
        // portalItem: {id: "2dfaf8bd45a4dcf8511a84583873"}
        var map = new WebMap({
            portalItem: {id: "2dfaf8bdb45a4dcf8511a849e4583873"}
        });

        map.load().then(function () {
            console.log('map loaded');
            console.log(map);
            console.log(view);
            const layer = webmap.layers.find(function ({id}) {
                return id.indexOf("CensusTractPoliticalAffiliationTotals") > -1;
            });
            layer.definitionExpression = "TOTPOT_CY > 10000";
            console.log(layer.definitionExpression);
            view.map = map;
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



        // Demonstrating the watcher
        view.then(function() {
            var ui = document.querySelector(".esri-ui");
            var handlerFalse = watchUtils.whenFalse(view, "stationary", function()  { ui.style.display = "none" });
            var handlerTrue = watchUtils.whenTrue(view, "stationary", function() { ui.style.display = "block" });
        });

        // These were in this section also, I'll include it in this sample. 
        // I didn't feel like implementing them right now. 
        
        // :::: Collections & autocasting ::::
        // - Has events, so i can watch for changes to the collections.
        // - autocasting: makes the thing into a point.
        //   - var myCollection = Collection.ofType(Point)[111,20] 
        // - to a geo point.
        // you could use: 
        //   - goTo(myCollection.getItemAt(0))
        // const coll = new Collection();
        // coll.add("hello");
        // coll.forEach(val => console.log(val));

        // :::::: Promises ::::::::::::::
        // - view.then(function () { ...
        // - then((layerView) => {
        // return watchUtils.whenFalseOnce(layerView, "updating");
        // })
        // /// return features
        // /// return features
        // ///otherwise error

        // :::::::: Loadables :::::::::
        // (Section 2: Lecture 9)
        // - loader pattern 
        // - a javascript pattern to lazy load resources. 
        // * webmap isn't loaded, no layers. 
        // * webmap.load().then() => {
        // 	find the layer and do something.
        // }
    });
});
