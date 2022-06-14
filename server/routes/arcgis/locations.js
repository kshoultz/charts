// routes/arcgis/index.js
module.exports = function (server, db) {

    const path = require('path');
    const http = require('http');
    const _ = require("lodash");
    const express = require('express');
    const bodyParser = require('body-parser');
    const { ObjectID } = require('mongodb');
  
    const { mongoose } = require('../../middleware/mongoose');
  
  
    // Get all locations:
    server.get('/locations', async (request, response) => {
        let graphics;
      
        // define the graphics data.
        graphics = [
            {
                geometry: {
                    type: "point",
                    x: -100,
                    y: 38
                },
                attributes: {
                    ObjectID: 1,
                    DepArpt: "KATL",
                    MsgTime: Date.now(),
                    FltId: "UAL1"
                }
            },
            {
                geometry: {
                    type: "point",
                    x: -77,
                    y: 35
                },
                attributes: {
                    ObjectID: 2,
                    DepArpt: "KZBW",
                    MsgTime: Date.now(),
                    FltId: "SW999"
                }
            },
            {
                geometry: {
                    type: "point",
                    x: -120,
                    y: 40
                },
                attributes: {
                    ObjectID: 3,
                    DepArpt: "WKRP",
                    MsgTime: Date.now(),
                    FltId: "Fever1"
                }
            }
        ];
        response.send(graphics);
    });
};