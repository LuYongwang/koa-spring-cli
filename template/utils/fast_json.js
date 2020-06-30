/**
 * 模仿实现 JAVA FastJSON库 方便json操作
 * @yongwang.lu@kuwo.cn
 */
const fast_json = {
    parse: (data) => {
        if (data instanceof Object) {
            return data
        }
        try {
            return JSON.parse(data);
        } catch (e) {
        }
        try {
            return eval("(" + data + ")")
        } catch (e) {
            return undefined
        }
    },
    parseObject: data => {
        return fast_json.parse(data)
    },
    parseArray: (data) => fast_json.parse(data),
    toJsonString: (data) => {
        if (data instanceof String) {
            return data
        }
        return JSON.stringify(data);
    }
}

module.exports = fast_json;
