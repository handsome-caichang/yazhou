var strategys = {
    isNotEmpty: function(value, defaultValue = '', errorMsg) {
        if (value === defaultValue) {
            return errorMsg
        }
    },
    // 限制最小长度
    minLength: function(value, length = 6, errorMsg) {
        if (value.length < length) {
            return errorMsg
        }
    },
    maxLength: function(value, length = 20, errorMsg) {
        if (value.length > length) {
            return errorMsg
        }
    },
    // 手机号码格式
    mobileFormat: function(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg
        }
    }
}
var Validator = function() {
    this.cache = [] // 保存效验规则
}
Validator.prototype.add = function(value, rule, errorMsg) {
    var str = rule.split(":")
    let fn = function() {
        // str 返回的是 minLength:6 
        var strategy = str.shift()
        str.unshift(value) // 把input的value添加进参数列表
        str.push(errorMsg) // 把errorMsg添加进参数列表
        return strategys[strategy].apply(value, str)
    }
    this.cache.push(fn)
}
Validator.prototype.start = function() {
    for (var i = 0, len = this.cache.length; i < len; i++) {
        var validatorFunc = this.cache[i]
        var msg = validatorFunc(); // 开始效验 并取得效验后的返回信息
        if (msg) {
            return msg
        }
    }
    this.cache = [] //初始化cache
}
var validator = new Validator()

export default validator