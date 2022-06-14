const _ = require('lodash');
const mongoose = require('mongoose');

var GraphicsLayerSchema = new mongoose.Schema({
    geometry: { type: Object, required: true },
    symbol: { type: Object, required: true },
    attributes: { type: Object, required: true },
    popupTemplate: { type: Object, required: true }
}, 
{ versionKey: false });

var GraphicsLayer = mongoose.model('GraphicsLayer', GraphicsLayerSchema); 

module.exports = {GraphicsLayer};
