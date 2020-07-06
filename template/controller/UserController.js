/**
 * Demo
 */
import {RestController, RequestMapping, RequestMethod} from 'koa-spring-web'
import {redirect} from "../utils/redirect";
import JSONObject from '../utils/fast_json'
import rp from 'request-promise';

// 引入Service
import userService from "../service/user_service"


@RestController({prefix: '/demo'})
class UserController {

    // 我的页面
    @RequestMapping({url: '/info', method: RequestMethod.GET})
    async info(ctx) {
        let query = ctx.query || {};
        let user_id = query['loginUid'] || query['userId'] || 0;
        let from = query['from'] || 1;
        ctx.body = {
            "code": 200,
            "msg": "失败",
            "data": {
                userId: user_id,
                from: from
            }
        }
    }

    // 重定向到百度
    @RequestMapping({url: '/redirect', method: RequestMethod.GET})
    async redirect_demo(ctx) {
        redirect(ctx, "https://www.baidu.cn")
    }

    // path param
    @RequestMapping({url: '/demo/:id', method: RequestMethod.GET})
    async url_params_demo(ctx, next) {
        await userService.get_user_info(ctx, next)
    }

    // 发送Http请求拿到数据 注意 这里 async await 必须
    // http库推荐 https://github.com/request/request-promise
    @RequestMapping({url: '/http', method: RequestMethod.GET})
    async http_demo(ctx, next) {
        await rp({
            uri: 'http://search.kuwo.cn/r.s',
            qs: {
                pn: '0',
                rn: 1,
                stype: 'albuminfo',
                vipver: "MUSIC_8.2.0.0_BCS17",
                albumid: 5336305,
                sortby: 2
            },
            headers: {
                'User-Agent': 'Kuwo Koa-Spring Demo Project'
            },
        }).then(res => {
            ctx.body = {
                code: 200,
                msg: "成功",
                data: JSONObject.parse(res)
            }
        }).catch(error => {
            console.log("接口错误")
            ctx.body = {
                code: 500,
                msg: "失败",
                data: {}
            }
        })
    }
}

module.exports = UserController;

