const _ = require('lodash');
const mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    locationName: {
        type: String, 
        required: true, 
        minLength:3,
        trim: true
    },
    description: {
        type: String, 
        required: true, 
        minLength:3,
        trim: true
    },
    latitude: {
        type: String, 
        required: true
    },
    longitude: {
        type: String, 
        required: true
    }
}, 
{ versionKey: false });

// This overrides so you don't have to do anything:
LocationSchema.methods.toJSON = function () {
    var location = this;
    var locationObject = location.toObject();
    var obj = _.pick(locationObject, ['locationName', 'description', 'latitude', 'longitude']); 
    return obj;
}

var Location = mongoose.model('Location', LocationSchema);

module.exports = {Location};
