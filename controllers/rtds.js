const helper = require('../utils/helper')
    , logger = require('../utils/logger')(__filename)
    , RTDS = require('../models/rtds')
    , redisAsyncModel = require('../models/redis-async');

exports.create = async ctx => {
    try {
        if (!helper.validRequest({
                "body": {
                    name: ['required', 'string']
                }
            }, ctx)) {
            return ctx.res.end('Bad required dates!');
        }

        const ds = RTDS();
        const uuid = uuidv4();
        ds.name = ctx.request.body.name;
        await ds.save();

        // add first data to Redis
        redisAsyncModel.addDefaultDSData(uuid, ctx.request.body.ds_schema);

        ctx.body = ds;
    } catch (err) {
        logger.error(err.message);
        ctx.throw(500, err.message);
    }
};
