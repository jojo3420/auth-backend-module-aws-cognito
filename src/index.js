const Koa = require('koa');
const Router = require('koa-router');
require('dotenv').config();
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const api = require('./api');
const PORT = process.env.PORT || 4000;




router.get('/', (ctx, next) => {
    ctx.body = 'home';
});

// pathVariable 파라미터 조회 
router.get('/about/:name', (ctx, next) => {
    const { name } = ctx.params;
    ctx.body = 'Hello! ' + name;
});

// QueryString 파라미터 조회 
router.get('/about', (ctx, next) => {
    const { id } = ctx.request.query;
    ctx.body = `#${id} post`;
});

// bodyParser 적용 
app.use(bodyParser());

// router use 
router.use('/api', api.routes());
app.use(router.routes());
app.use(router.allowedMethods());



app.listen(PORT, ()=> {
    console.log('Koa App server listening port 4000');
});