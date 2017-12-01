const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {type: String},
    ds_schema: {type: Object},
    flow: {type: Number}, // from constants 0-FIFO, 1-LIFO
    enabled: {type: Boolean},
    uuid: {type: String},
    pushUrl: {type: String},
    schemaUrl: {type: String}
});

module.exports = mongoose.model('RTDS', Schema);
