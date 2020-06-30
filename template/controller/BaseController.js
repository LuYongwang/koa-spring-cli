/**
 * Demo
 */
import {RestController, RequestMapping, RequestMethod} from "../framework/handler_mapping";

@RestController({prefix: '/'})
class UserController {

    @RequestMapping({url: '', method: RequestMethod.ALL})
    async index(ctx) {
        ctx.body = "Koa2-Spring Start Successfully"
    }
}

module.exports = UserController;
