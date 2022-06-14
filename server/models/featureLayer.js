const _ = require('lodash');
const mongoose = require('mongoose');

var FeatureLayerSchema = new mongoose.Schema({
    objectIdField: { type: String, required: true },
    geometryType: { type: String, required: true },
    spatialReference: { type: Object, required: true },
    popupTemplate: { type: Object },
    renderer: { type: Object, required: true },
    fields: [{
        name: {type: String,  required: true},
        alias: {type: String,  required: true},
        type: {type: String,  required: true}
    }],
    source: [{
        geometry: { type: Object, required: true },
        attributes: { type: Object }
    }]
}, 
{ versionKey: false });

// // This overrides so you don't have to do anything:
// FeatureLayerSchema.methods.toJSON = function () {
//     var featureLayer = this;
//     var featureLayerObject = featureLayer.toObject();
//     var obj = _.pick(featureLayerObject, ['_id','featureLayerName']);
//     return obj;
// }

var FeatureLayer = mongoose.model('FeatureLayer', FeatureLayerSchema); 

module.exports = {FeatureLayer};
