const redis = require("../db/redis-async")
    , logger = require('../utils/logger')(__filename);

module.exports = {

    addDefaultData: (uuid, data) => {
        redis.hset('ds_data', uuid, JSON.stringify([data]));
    },

    updateData: async (uuid, data) => {
        try {
            const isHas = await redis.hexists('ds_data', uuid);
            if (isHas) {
                redis.hdel(['ds_data', uuid]);
                redis.hset('ds_data', uuid, JSON.stringify([data]));
                return true;
            }
            else {
                redis.hset('ds_data', uuid, JSON.stringify([data]));
                return true;
            }
        }
        catch (err) {
            throw new Error('Error in update DS data')
        }
    },

    getDataById: async (uuid, cb) => {
        try {
            const isHas = await redis.hexists('ds_data', uuid);
            if (isHas) {
                const result = await redis.hget('ds_data', uuid);
                let arr = JSON.parse(result);
                return arr[0].data;
            }
            else {
                logger.error('DS not found. UUID: ', uuid);
                return {};
            }
        }
        catch (err) {
            throw new Error('Error in get DS data')
        }
    },

    removeDataById: async (uuid) => {
        const isHas = await redis.hexists('ds_data', uuid);
        if (isHas)
            redis.hdel(['ds_data', uuid]);
    }

};

