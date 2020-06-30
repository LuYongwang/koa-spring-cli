const Koa = require('koa');
const app = new Koa();
const fs = require('fs')
const path = require('path')
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');

// GIZP压缩
app.use(
    compress({
        filter: (content_type) => { // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
            return /text/i.test(content_type);
        },
        threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
        flush: require('zlib').Z_SYNC_FLUSH // zlib是node的压缩模块
    }));
// 配置post bodyparser的中间件
app.use(bodyParser());
// cros 跨域 配置 不需要自己删除
app.use(async (ctx, next) => {
    ctx.compress = true;
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('KwServer', 'NodeJS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});
// 统一异常处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
    }
    if (!ctx.body && ctx.status >= 400) {
        let status = ctx.status
        let message = "Error";
        let url = ctx.request.uri
        ctx.body = {
            code: status,
            msg: message,
            url: url
        }
    }
});

// 增加 扫包配置 自动发现controller目录下所有Controller,简化操作
let requireRouters = (base_path) => {
    //遍历所有文件
    (fs.readdirSync(base_path) || []).forEach(file => {
        let file_name = base_path + file  //完整文件名
        if (fs.statSync(file_name).isFile() && path.extname(file_name) === '.js') {    //如果是文件且是js后缀文件
            let thisController = require(file_name)  //require这个文件
            app.use(thisController.routes()).use(thisController.allowedMethods());
        }
    })
}
requireRouters(__dirname + '/controller/')

module.exports = app;
