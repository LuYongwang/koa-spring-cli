/**
 * Demo
 */
import {RestController, RequestMapping, RequestMethod} from 'koa-spring-web'

@RestController({prefix: '/'})
class UserController {

    @RequestMapping({url: '', method: RequestMethod.ALL})
    async index(ctx) {
        ctx.body = "Koa2-Spring Start Successfully"
    }
}

module.exports = UserController;
