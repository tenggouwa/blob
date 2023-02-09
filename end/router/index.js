
const Router = require('@koa/router');
const router = new Router();

const {
  homeInfo
} = require('../controller/home');


router.get('/', async(ctx, next) => {
  ctx.response.body = '<h1>Index page</h1>'
});

router.get('/home', homeInfo);

module.exports = router;
