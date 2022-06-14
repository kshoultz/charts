// routes/arcgis/featureLayer.js
module.exports = function (server, db) {

    const path = require('path');
    const http = require('http');
    const _ = require("lodash");
    const express = require('express');
    const bodyParser = require('body-parser');
    const { ObjectID } = require('mongodb');
  
    const { mongoose } = require('../../middleware/mongoose');
        
    const {Graphic} = require('../../models/graphic');
    const {GraphicsLayer} = require('../../models/graphicsLayer');

    const graphicsLayerData = require("../../graphicsLayerData");

    server.get('/graphics', async (request, response) => {
        try {
            const graphics = await Graphic.find();
            response.status(200).send({graphics});
        } catch (error) {
            console.log(error);
            response.status(500).send();
        }
    });

    server.post('/graphics', async (request, response) => {
        Graphic.collection.insert(request.body.graphics, (err, docs) =>{
            if (err) {
                console.log(err);
            } else {
                response.status(200).send();
            }
        });
    });

    // Save Graphics Layer:
    server.post('/graphicslayer', async (request, response) => {
        try {
            await GraphicsLayer.remove({});
            GraphicsLayer.collection.insert(request.body, (err, docs) =>{
                if (err) {
                    console.log(err);
                    response.status(500).send();
                } else {
                    response.status(200).send();
                }
            });
        } catch (err) {
            console.log(err);
            response.status(500).send();
        }
    });

    // Save Graphics Layer:
    server.post('/graphicslayerFile', async (request, response) => {
        try {
            const body = request.body;
            let id = graphicsLayerData.saveGraphicsLayerData(body); // TODO: Probably not how i want to do it. Should be the obect.
            response.status(200).send(`{"id":"${id}"}`);
        } catch (error) {
            response.status(400).send(error);
        }
    });

    // Get Graphics Layer:
    server.get('/graphicslayer/:id', async (request, response) => {
        try {
            const graphicsLayer = await GraphicsLayer.find();
            response.status(200).send(graphicsLayer);
        } catch (error) {
            console.log(error);
            response.status(500).send();
        }
    });

    // Get Graphics Layer:
    server.get('/graphicslayerFile/:id', async (request, response) => {
        // TODO: Don't forget to refer to your examples when implementing MongoDB here.
        const id = request.params.id;
        layerData = graphicsLayerData.getGraphicsLayerData(id);
        response.status(200).send(layerData);
    });

};