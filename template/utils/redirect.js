/**
 * 实现重定向
 * @yongwang.lu@qq.com
 */
module.exports = {
    // 重定向
    redirect: (ctx, url) => {
        ctx.status = 301;
        ctx.redirect(url)
    },
    // 临时重定向
    rewrite: (ctx, url) => {
        ctx.redirect(url)
    },
};

