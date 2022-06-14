// routes/arcgis/featureLayer.js
module.exports = function (server, db) {

    const path = require('path');
    const http = require('http');
    const _ = require("lodash");
    const express = require('express');
    const bodyParser = require('body-parser');
    const { ObjectID } = require('mongodb');
  
    const { mongoose } = require('../../middleware/mongoose');
  
    const {FeatureLayer} = require('../../models/featureLayer');
    const {Graphic} = require('../../models/graphic');

    // Get Feature Layer:
    server.get('/featureLayer', async (request, response) => {
      
      // Get feature layer: 
      var featureLayer = await FeatureLayer.findOne();

      // Get Graphics for layer:
      var graphics = await Graphic.find();
      featureLayer.source = graphics;

      // Send layer config to the client:
      response.send(featureLayer);
    });

    server.post('/featureLayer', async (request, response) => {
        try {
          var featureLayer = new FeatureLayer(request.body.featureLayer);
          await featureLayer.save();
          response.status(200).send();
        } catch (err) {
          console.log(err);
        }
    });
};