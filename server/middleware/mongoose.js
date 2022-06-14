const mongoose = require('mongoose');

// Heroku uses the process.env.MONGODB_URI:
var uri = process.env.MONGODB_URI;

// mongoose.Promise = global.Promise;
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // console.log(`we're connected!`);
});

module.exports = { mongoose };