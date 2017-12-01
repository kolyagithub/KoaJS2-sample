const http = require('http')
    , fs = require('fs')
    , Koa = require('koa')
    , bodyParser = require('koa-bodyparser')
    , serve = require('koa-static')
    , cors = require('@koa/cors')
    , favicon = require('koa-favicon')
    , mongoose = require('./db/mongoose')
    , config = require('./config/config')
    , koaLog = require('koa-log')
    , logger = require('./utils/logger')(__filename)
    , router = require('./routes/route')
    , socketIO = require('socket.io');

let app = new Koa();
let server;

// enable proxy when prod
if (config.app.env === 'production') {
    app.proxy = true;
}

// init MongoDB
mongoose.init();

app.use(cors());
if (config.app.env === 'development') {
    app.use(koaLog('short'));
}
app.use(bodyParser());
app.use(favicon(__dirname + '/dist/assets/icon/app.ico'));

// middleware for client UI
// app.use(serve(__dirname + '/dist'));

// routes
app.use(router.routes()).use(router.allowedMethods());

// create logs folder
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

// create HTTP server
server = http.createServer(app.callback());

// start HTTP
server.listen(config.app.port, () => {
    logger.info('Server listening on port:%d PID:%d', config.app.port, process.pid || 0);
});
