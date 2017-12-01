const Router = require('koa-router');

const router = Router();

const rtds = require('./rtds');
const references = require('./references');

router.use('/rtds', rtds.routes());
router.use('/references', references.routes());

module.exports = router;