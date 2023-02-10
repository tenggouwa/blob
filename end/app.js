const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
const { dbConnect } = require('./dbActions/dbConnect');

const dayjs = require('dayjs');

const router = require('./router');


const app = new Koa();
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors())
  .use(logger(str => {
    console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'), str);
  }));

app.listen(5268, err => {
  if(err) throw err;
  dbConnect();
  console.log('Koa App Is Listen In Port 5268')
})