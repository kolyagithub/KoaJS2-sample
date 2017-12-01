const redis = require("redis")
    , config = require('../config/config')
    , logger = require('../utils/logger')(__filename);


const redisCl = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});

redisCl.on('connect', function (err) {
    //logger.info('Redis connected.');
});

redisCl.on('error', (err) => {
    logger.error('Cannot connect to Redis. ', err);
    process.exit(1);
});

module.exports = redisCl;
