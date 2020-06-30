const JSONObject = require("../utils/fast_json");
module.exports = {
    // 获取用户
    get_user_info(ctx, next) {
        let id = ctx.params.id || 0
        let data = JSONObject.parse("{'a':1,'id':307421105,'name':'测试Demo'}")
        data['userId'] = id
        ctx.body = {
            code: 200,
            msg: 'Demo',
            data: data
        }
    }
};

