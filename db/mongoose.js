const config = require('../config/config')
    , mongoose = require('mongoose')
    , REFERENCES = require('../models/references')
    , constants = require('../utils/constants')
    , logger = require('../utils/logger')(__filename);

mongoose.Promise = global.Promise;

const init = async () => {

    mongoose.connect(config.mongoose.url, config.mongoose.options);

    let db = mongoose.connection;


    db.on('connected', function () {

        // check MongoDB Server version
        let admin = new mongoose.mongo.Admin(mongoose.connection.db);
        admin.buildInfo(function (err, info) {
            let version = info.version;
            let major = version.split('.')[0];
            let minor = version.split('.')[1];
            if (major < 3 || (major = 3 && minor < 4) || (major < 3 && minor < 4)) {
                logger.error('Required MongoDB Server version >= 3.4.0. Your version is %s', version);
                process.exit(1);
            }
        });

        // check References table. Create if not exists this collection
        mongoose.connection.db.listCollections({name: 'references'})
            .next(function (err, collinfo) {
                if (collinfo) {
                    // The collection exists
                }
                else {
                    // init schema types references
                    let ref = new REFERENCES({
                        schemaTypes: constants.SCHEMA_TYPES
                    });

                    ref.save(function (err) {
                        if (err) return logger.error('Error in save references types: ', err);
                    });
                }
            });

    });

    db.on('error', function (err) {
        logger.error('Cannot connect to MongoDB. ', err);
        process.exit(1)
    });
};

exports.init = init;
