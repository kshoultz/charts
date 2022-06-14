require([
    "esri/views/MapView",
    "esri/WebMap",
    "esri/widgets/Expand",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/widgets/BasemapGallery",
    "esri/widgets/BasemapToggle",
    "esri/widgets/LayerList",
    "esri/widgets/ScaleBar",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Circle",
    "esri/geometry/Extent",
    "esri/geometry/geometryEngine",
    "dojo/domReady!"
], function(
        MapView, 
        WebMap,
        Expand,
        SketchViewModel, 
        BasemapGallery, 
        BasemapToggle, 
        LayerList, 
        ScaleBar,
        Graphic, 
        GraphicsLayer,
        Circle,
        Extent,
        geometryEngine
    ) {
        var tempGraphicsLayer = new GraphicsLayer();
        var tempGraphicsArray = [];
        var drawingCircle = false;

        // Arctic Ocean Basemap
        var webmap = new WebMap({
            basemap: "topo",
            layers: [tempGraphicsLayer],
            zoom: 10,
            center: [-118, 34],
            rotation: 30
        });

        var view = new MapView({
            container: "viewDiv",
            map: webmap,
            zoom: 5
        });

        view.when(function() {

            var scaleBar = new ScaleBar({
                view: view, 
                container: document.createElement("div")
            });

            var basemapToggle = new BasemapToggle({
                view: view, 
                nextBasemap: "hybrid"
            });

            var basemapGallery = new BasemapGallery({
                view: view,
                container: document.createElement("div")
            });

            var baseMapExpand = new Expand({
                view: view,
                content: basemapGallery,
                expandIconClass: "esri-icon-basemap"
            })

            var layerList = new LayerList({
                view: view, 
                container: document.createElement("div")
            });

            var listExpand = new Expand({
                view: view, 
                content: layerList.domNode,
                expandIconClass: "esri-icon-layer-list"
            });

            view.ui.add(scaleBar, { position: "bottom-left" });
            view.ui.add(basemapToggle, { position: "bottom-right" });
            view.ui.add(baseMapExpand, { position: "bottom-right" });
            view.ui.add(listExpand, "bottom-right");

            // create a new sketch view model
            var sketchViewModel = new SketchViewModel({
                view: view,
                layer: tempGraphicsLayer,
                pointSymbol: { // symbol used for points
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    style: "square",
                    color: "#8A2BE2",
                    size: "12px",
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 1 // points
                    }
                },
                polylineSymbol: { // symbol used for polylines
                    type: "simple-line", // autocasts as new SimpleMarkerSymbol()
                    color: "#8A2BE2",
                    width: "4",
                    style: "dash"
                },
                polygonSymbol: { // symbol used for polygons
                    type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
                    color: "rgba(138,43,226, 0.8)",
                    style: "solid",
                    outline: {
                        color: "white",
                        width: 1
                    }
                }
            });

        // ************************************************************
        // Get the completed graphic from the event and add it to view.
        // This event fires when user presses
        //  * "C" key to finish sketching point, polygon or polyline.
        //  * Double-clicks to finish sketching polyline or polygon.
        //  * Clicks to finish sketching a point geometry.
        // ***********************************************************
        sketchViewModel.on("draw-complete", function(evt) {
            // console.log(evt);
            // // if multipoint geometry is created, then change the symbol
            // // for the graphic
            // if (evt.geometry.type === "multipoint") {
            //     evt.graphic.symbol = {
            //         type: "simple-marker",
            //         style: "square",
            //         color: "green",
            //         size: "16px",
            //         outline: {
            //             color: [255, 255, 255],
            //             width: 3
            //         }
            //     };
            //     console.log("if statement: ")
            //     console.log(evt.graphic)
            // }
            // add the graphic to the graphics layer

            // // Trying to mimic the point: 
            // if (circle) {
            //     evt.graphic.symbol = {
            //         type: "simple-marker",
            //         style: "circle",
            //         color: "red",
            //         size: "16px",
            //         outline: {
            //             color: [255, 255, 255],
            //             width: 1
            //         }
            //     };
            // }

            tempGraphicsLayer.add(evt.graphic);
            tempGraphicsArray.push(evt.graphic);
            // console.log("Added from Event: ")
            // console.log(evt.graphic);
            setActiveButton();
        });

        // *************************************
        // activate the sketch to create a point
        // *************************************
        var drawPointButton = document.getElementById("pointButton");
        drawPointButton.onclick = function() {
            // set the sketch to create a point geometry
            sketchViewModel.create("point");
            setActiveButton(this);
        };

        // ******************************************
        // activate the sketch to create a multipoint
        // ******************************************
        // var drawMultipointButton = document.getElementById("multipointButton");
        // drawMultipointButton.onclick = function() {
        //     // set the sketch to create a multipoint geometry
        //     sketchViewModel.create("multipoint");
        //     setActiveButton(this);
        // };

        // ****************************************
        // activate the sketch to create a polyline
        // ****************************************
        var drawLineButton = document.getElementById("polylineButton");
        drawLineButton.onclick = function() {
            // set the sketch to create a polyline geometry
            sketchViewModel.create("polyline");
            setActiveButton(this);
        };

        // ****************************************
        // activate the sketch to create a circle
        // ****************************************
        var drawCircleButton = document.getElementById("circleButton");
        drawCircleButton.onclick = function() {
            // set the sketch to create a circle geometry


            let ellipsisGraphic = null;
            let origin = null;
            let end = null;
            let distance = null;
            dragEvent = view.on('drag', function(e) {
                drawingCircle = true;
                e.stopPropagation();
                if (e.action === 'start'){
                    if (ellipsisGraphic) view.graphics.remove(ellipsisGraphic)
                    origin = view.toMap(e);
                } else if (e.action === 'update'){
                    if (ellipsisGraphic) view.graphics.remove(ellipsisGraphic)
                    end = view.toMap(e); 
                    distance = geometryEngine.distance(origin,end);
                    ellipsisGraphic = new Graphic({
                        geometry: new Circle(origin,{"radius": distance,"numberOfPoints":64}),
                        symbol: sketchViewModel.polygonSymbol
                    })
                    view.graphics.add(ellipsisGraphic)
                } else if (e.action === 'end') {
                    dragEvent.remove();
                    view.graphics.remove(ellipsisGraphic);
                    tempGraphicsLayer.add(ellipsisGraphic);
                    tempGraphicsArray.push(ellipsisGraphic);
                    ellipsisGraphic = null;
                    drawingCircle = false;
                    setActiveButton();
                }
            });
            setActiveButton(this);
        };

        // ****************************************
        // activate the sketch to create a rectangle
        // ****************************************
        var drawRectangleButton = document.getElementById("rectangleButton");
        drawRectangleButton.onclick = function() {
            // set the sketch to create a rectangle geometry
            sketchViewModel.create("rectangle");  
            setActiveButton(this);
        };

        // ***************************************
        // activate the sketch to create a polygon
        // ***************************************
        var drawPolygonButton = document.getElementById("polygonButton");
        drawPolygonButton.onclick = function() {
            // set the sketch to create a polygon geometry
            sketchViewModel.create("polygon");
            setActiveButton(this);
        };

        // **************
        // reset button
        // **************
        document.getElementById("resetBtn").onclick = function() {
            tempGraphicsLayer.removeAll();
            tempGraphicsArray = [];
            sketchViewModel.reset();
            setActiveButton();
        };

        // **************
        // save button
        // **************
        document.getElementById("saveBtn").onclick = function() {
            setActiveButton();
            var graphicsJson = [];
            console.log(tempGraphicsArray);
            tempGraphicsArray.forEach(function (item){
                var graphic = {
                geometry: {
                    type: item.geometry.type,
                    extent: item.geometry.extent,
                    hasM: item.geometry.hasM,
                    hasZ: item.geometry.hasZ,
                    type: item.geometry.type,
                    longitude: item.geometry.longitude,
                    latitude: item.geometry.latitude,
                    isSelfIntersecting: item.geometry.isSelfIntersecting,
                    rings: item.geometry.rings,
                    centroid: item.geometry.centroid,
                    spatialReference: item.geometry.spatialReference,
                    paths: item.geometry.paths//, // Layer is not fully supported, so I'm commenting. 
                    // layer: {
                    //     attributionDataUrl: item.layer.attributionDataUrl,
                    //     attributionVisible: item.layer.attributionVisible,
                    //     credential: item.layer.credential,
                    //     elevationInfo: item.layer.elevationInfo,
                    //     fullExtent: item.layer.fullExtent,
                    //     graphics: item.layer.graphics,
                    //     hasAttributionData: item.layer.hasAttributionData,
                    //     id: item.layer.id,
                    //     legendEnabled: item.layer.legendEnabled,
                    //     listMode: item.layer.listMode,
                    //     load: item.layer.load,
                    //     loadError: item.layer.loadError,
                    //     loadStatus: item.layer.loadStatus,
                    //     loadWarnings: item.layer.loadWarnings,
                    //     loaded: item.layer.loaded,
                    //     maxScale: item.layer.maxScale,
                    //     minScale: item.layer.minScale,
                    //     opacity: item.layer.opacity,
                    //     // parent: item.layer.parent,
                    //     parsedUrl: item.layer.parsedUrl,
                    //     popupEnabled: item.layer.popupEnabled,
                    //     postscript: item.layer.postscript,
                    //     screenSizePerspectiveEnabled: item.layer.screenSizePerspectiveEnabled,
                    //     spatialReference: item.layer.spatialReference,
                    //     title: item.layer.title,
                    //     token: item.layer.token,
                    //     type: item.layer.type,
                    //     url: item.layer.url,
                    //     visible: item.layer.visible,
                    //     gfxHdl: item.layer.gfxHdl
                    // }

                },   // Add the geometry created in step 4
                symbol: {
                    color: item.symbol.color,
                    type: item.symbol.type,
                    size: item.symbol.size,
                    id: item.symbol.id,
                    angle: item.symbol.angle,
                    path: item.symbol.path,
                    style: item.symbol.style,
                    xoffset: item.symbol.xoffset,
                    yoffset: item.symbol.yoffset
                },   // Add the symbol created in step 5
                attributes: item.attributes,   // Add the attributes created in step 6
                popupTemplate:  { // autocasts as new PopupTemplate()
                    title: "{Name}",
                    content: [{
                      type: "fields",
                      fieldInfos: [{
                        fieldName: "Name"
                      }, {
                        fieldName: "Owner"
                      }, {
                        fieldName: "Length"
                      }]
                    }]
                  }
              };
              graphicsJson.push(graphic);
            });
            Ext.Ajax.request({
                url: '/graphicslayer',
                method: 'POST',
                jsonData: JSON.stringify(graphicsJson)
            }).then(function(response) {
                console.log("Graphics layer saved");
            }).always(function() {
                // clean-up logic, regardless the outcome
            }).otherwise(function(reason){
                console.log(reason);
            });
        };

        // **************
        // open button
        // **************
        document.getElementById("openBtn").onclick = function() {
            setActiveButton();
            Ext.Ajax.request({
                url: '/graphicslayer/1517968574756',
                method: 'GET'
            }).then(function(response) {
                var graphics = JSON.parse(response.responseText);
                console.log("Graphics layer received. data = ", graphics);
                graphics.forEach(function (item) {
                    var graphic = new Graphic({
                        geometry: item.geometry,   // Add the geometry created in step 4
                        symbol: item.symbol,   // Add the symbol created in step 5
                        attributes: item.attributes,   // Add the attributes created in step 6
                        popupTemplate:  { // autocasts as new PopupTemplate()
                            title: "{Name}",
                            content: [{
                              type: "fields",
                              fieldInfos: [{
                                fieldName: "Name"
                              }, {
                                fieldName: "Owner"
                              }, {
                                fieldName: "Length"
                              }]
                            }]
                          }
                      });
                    tempGraphicsLayer.graphics.add(graphic);
                    tempGraphicsArray.push(graphic);
                })
            }).always(function() {
                // clean-up logic, regardless the outcome
            }).otherwise(function(reason){
                console.log(reason);
            });
        };

        function setActiveButton(selectedButton) {
            // focus the view to activate keyboard shortcuts for sketching
            view.focus();
            var elements = document.getElementsByClassName("active");
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("active");
            }
            if (selectedButton) {
                selectedButton.classList.add("active");
            }
        }
    });
});