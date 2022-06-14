const fs = require('fs'); // Import the fs module.

const saveGraphicsLayerData = (data) => {
    let id = -1;
    let timestamp = new Date().getTime();
    // let fileName = `./local/data/graphics-layer-${id}-${timestamp}.json`;
    let fileName = `./local/data/graphics-layer.json`;
    
    fs.writeFileSync(fileName, JSON.stringify(data));
    console.log('File written with id (timestamp) = ', timestamp);
    console.log('File written with path/file: ', fileName);
    return timestamp;
};

const getGraphicsLayerData = (id) => {
    // TODO: validate id.
    let data;
    // let fileName = `local/data/graphics-layer--1-${id}.json`; // TODO: Temporary, because i'm using the timestamp as the id for now.
    let fileName = `local/data/graphics-layer.json`;
    let file = fs.readFileSync(fileName);
    return file;
};

module.exports = { saveGraphicsLayerData, getGraphicsLayerData };