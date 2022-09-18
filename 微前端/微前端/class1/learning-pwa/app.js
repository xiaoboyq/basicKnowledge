
const get       = require('./util').get;
const http      = require('http');
const Koa       = require('koa');
const serve     = require('koa-static');
const Router    = require('koa-router');
const webpush = require('web-push');
const bodyParser = require('koa-bodyparser');
const fs = require('fs'); 

const app = new Koa();
const router = new Router();
app.use(bodyParser());
const port = process.env.PORT || 8089;


router.get('/test1', async (ctx, next) => {
    ctx.response.body = "console.log('我是test1的返回')";
});
router.get('/pageA', async (ctx, next) => {
    ctx.type = 'html';
    /* fs创建文件读取流，将页面文件的内容返回 */
    ctx.body = fs.createReadStream('./public/pageA.html');
});
router.get('/iframe', async (ctx, next) => {
    ctx.type = 'html';
    /* fs创建文件读取流，将页面文件的内容返回 */
    ctx.body = fs.createReadStream('./public/iframe.html');
});
router.get('/pageB', async (ctx, next) => {
    ctx.type = 'html';
    /* fs创建文件读取流，将页面文件的内容返回 */
    ctx.body = fs.createReadStream('./public/pageB.html');
});
app.use(router.routes());
app.use(serve(__dirname + '/public'));
app.listen(port, () => {
    console.log(`listen on port: ${port}`);
});
