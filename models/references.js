const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    schemaTypes: {type: Object},
    alarmTypes: {type: Object},
    stringExpressions: {type: Object},
    numberDateExpressions: {type: Object},
    operations: {type: Object},
    flow: {type: Object}
});

module.exports = mongoose.model('REFERENCES', Schema);
