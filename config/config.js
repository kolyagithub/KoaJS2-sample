const config = {};

config.app = {
    "host": "http://127.0.0.1",
    "port": 3004,
    "env": "production"
};
config.redis = {
    "host":
        "127.0.0.1",
    "port":
        6379,
    "PID":
        "PID:",
    "channelType":
        "production"
};
config.mongoose = {
    "url":
        "mongodb://127.0.0.1:27017/sampleDB",
    "options":
        {
            "useMongoClient":
                true,
            "server":
                {
                    "auto_reconnect":
                        true
                }
        }
};

module.exports = config;