import configuration from '../configuration/configuration.js'

//判断是否是iOS WKWebview内核
const base = {
    // 微信的appID
    wxAppId: null,
    // 服务端返回成功的状态码
    errok: 200,
    customConfigInfo: {},
    // 动画持续时长
    duration: 300,
    /* *** 计划移除 *** */
    // duration_X: 300, 
    // duration_S: 150,
    /* *** 计划移除 *** */

    config: {
        duration_X: 300, // 动画持续时长
        duration: 300,
        duration_S: 150,
    },
    regExp: {
        telReg: /^1\d{10}$/,
        imgReg: /<img(.*?)>/g,
        voiceReg: /<div class='voice'(.*?)<\/div>/g,
        pwdReg: /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{4,22}$/
    },
    device: {
        isWKWebview: window.__wxjs_is_wkwebview, //判断是否是iOS WKWebview内核
        isAndroid: (/android/gi).test(navigator.appVersion),
        isIDevice: (/iphone|ipad/gi).test(navigator.appVersion),
        isTouchPad: (/hp-tablet/gi).test(navigator.appVersion),
    },
    localTimeToServer: new Date(), //TODO:以后要换成接口获取的服务器时间

    telReg: /^1\d{10}$/,
    isWKWebview: window.__wxjs_is_wkwebview,
    isAndroid: (/android/gi).test(navigator.appVersion),
    isIDevice: (/iphone|ipad/gi).test(navigator.appVersion),
    isTouchPad: (/hp-tablet/gi).test(navigator.appVersion),
    isWKWebview: window.__wxjs_is_wkwebview, //判断是否是iOS WKWebview内核

    // 判断是否是在移动设备
    isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
}

base.iosVersion = (function() {
    if (!base.isIDevice) return

    let version,
        ua = navigator.userAgent,
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    if (iphone) version = iphone[2].replace(/_/g, '.');

    if (ipad) version = ipad[2].replace(/_/g, '.');

    // IOS设备完整系统版本号
    base.iosFullVersion = version;

    if (version && ua.indexOf('.') >= 0) {
        version = version.split('.')[0] * 1;
    }
    return version;
})();

// 当前宿主环境类型, 0: '微信、普通浏览器',  1: '钉钉环境'  3:'企业微信'  4: '微信小程序'  10: 'apicloud环境'  99: 'app环境'
base.envType = 0;

// 环境判断promise; 判断当前运行的环境, 区分'微信环境'、 '钉钉环境'、'普通浏览器环境'等
base.env = (function () {
    // navigator.userAgent 属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息
    var ua = window.navigator.userAgent.toLowerCase();

    // alert(ua);

    if (ua.match(/MicroMessenger/i)) { // 各种微信环境
        if (ua.match(/wxwork/i)) { // 企业微信环境
            base.envType = 3;
            return 'wxwork'
        } else { // 个人版微信环境 或小程序环境
            base.envType = 0;
            return 'wx'
        }
    } else {
        if (ua.match(/dingtalk/i)) { // 钉钉环境
            base.envType = 1
            return 'dd';
        } else if (ua.match(/apicloud/i)) { // apicloud环境
            base.envType = 10
            return 'apicloud';
        } else if (ua.match(/lftapp/i)) { // 校管家APP环境
            base.envType = 99
            return 'xgj';
        } else { // 普通浏览器环境
            base.envType = 0;
            return 'browser';
        }
    }
})();

// 加载相应环境SDK成功的promise, 最好在该promise成功后再启动vue的spa应用
base.getEnvSDKPromise = function () {
    return new Promise((resolve, reject) => {
        if (base.env === 'apicloud') {
            window.apiready = function() {
                resolve(base.env)
            }
        }  else if (base.env === 'xgj') {
            resolve(base.env)
        } else {
            var script = document.createElement("script");
            script.type = "text/javascript";

            // 加载相应环境JS-SDK
            script.src = configuration.platform[base.env]

            window.document.head.appendChild(script);

            var timer = setInterval(() => {
                if (window.dd || window.wx) {
                    resolve(base.env)
                    clearInterval(timer);
                }
            }, 20);
        }
    })
}


// 异步获取echarts
base.getEchartsPromise = function () {
    return new Promise((resolve, reject) => {
        if (window.echarts) {
            resolve(echarts)
        } else {
            var script = document.createElement("script");
            script.type = "text/javascript";

            // 加载echarts类库
            script.src = configuration.lib.echarts

            window.document.head.appendChild(script);

            var timer = setInterval(() => {
                if (window.echarts) {
                    clearInterval(timer)
                    resolve(echarts)
                }
            }, 20);
        }        
    })
}



export default base;