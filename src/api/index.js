const Router = require('koa-router');


const api = new Router();
const userAPI = require('./user');

api.get('/', (ctx, next) => {
    ctx.body = 'api home';
});


api.use('/user', userAPI.routes());


module.exports = api;

