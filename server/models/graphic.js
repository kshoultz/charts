const _ = require('lodash');
const mongoose = require('mongoose');

var GraphicSchema = new mongoose.Schema({
    geometry: { type: Object },
    attributes: { type: Object }
}, 
{ versionKey: false });

// This overrides so you don't have to do anything:
// GraphicSchema.methods.toJSON = function () {
//     var graphic = this;
//     var graphicObject = graphic.toObject();
//     var obj = _.pick(graphicObject, []); 
//     return obj;
// }

var Graphic = mongoose.model('Graphic', GraphicSchema);

module.exports = {Graphic};
