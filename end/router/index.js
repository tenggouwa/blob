
const Router = require('@koa/router');
const router = new Router();
const { homeInfo } = require('../controller/home');
const { addMenu, fetchMenu } = require('../controller/menu');

router.get('/test', async(ctx, next) => {
  console.log(ctx.request.query);
});

router.get('/home', homeInfo);

// 菜单
router.post('/menu/add', addMenu);
router.get('/menu/list', fetchMenu);


module.exports = router;
