const Router = require('koa-router')
    , rtdsControllers = require('../controllers/rtds');

const router = Router();

router.post('/create', rtdsControllers.create);

module.exports = router;
