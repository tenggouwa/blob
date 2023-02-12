
const Router = require('@koa/router');
const router = new Router();
const { homeInfo } = require('../controller/home');
const { addMenu, fetchMenu } = require('../controller/menu');
const { ResultFul } = require('../dbActions/resultful');

router.get('/api/test', async(ctx, next) => {
  const { index } = ctx.query
  const p = new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
  try {
    await p.then(res => {
      ctx.state = 200;
      ctx.body = ResultFul(true, '查询成功！', {
        value: Math.floor(Math.random() * 10000000),
        index,
      })
    })
  } catch (error) {
    
  }
});

router.get('/home', homeInfo);

// 菜单
router.post('/menu/add', addMenu);
router.get('/menu/list', fetchMenu);


module.exports = router;
