import router from './router/index.js'
import store from './store/index.js'

// 引入自定义扩展插件
import extend from 'user/extend/index.js'
import commonExtend from '../../common/extend/index.js'
import App from './App.vue'

import {
    XAddress
} from 'vux'

import {
    getuserinfo,
    getconfigcompany,
    getwechatconfiginfo
} from 'manage/api/index.js'
Vue.component('x-address', XAddress)

Vue.config.productionTip = false;

// 定时器
app.setIntervalObj = null;

Window.previweData = {};

// 启动第一个vue实例
function runSystem(argument) {
    // 注入自定义插件
    Vue.use(extend, {
        router: router
    });
    Vue.use(commonExtend, {
        router: router
    });

    new Vue({
        el: '#app',
        router,
        store,
        template: '<app/>',
        components: {
            App
        }
    })
}

// 添加单前天数加几天
app.addDate = function(days) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    var m = d.getMonth() + 1;
    if (m < 10) {
        m = '0' + m;
    }
    return d.getFullYear() + '-' + m + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
}


let userInfoPromise = getuserinfo(),
    configcompanyPromise = getconfigcompany(),
    weichatconfiginfiPromise = getwechatconfiginfo({
        url: location.href.split('#')[0]
    })

Promise.all([userInfoPromise, configcompanyPromise, weichatconfiginfiPromise]).then(res => {
    console.log(res)
    if (res[0].result.code == app.errok && res[1].result.code == app.errok && res[2].result.code == app.errok) {
        let config = { //配置微信jssdk
            debug: false,
            appId: res[2].config.appid,
            timestamp: res[2].config.timestamp,
            nonceStr: res[2].config.noncestr,
            signature: res[2].config.signature
        }
        // res[0].userinfo.bindingstatus = 0
        store.commit('setUserInfo', res[0].userinfo)
        store.commit('setAddress', res[1].data)
        // 如果在小程序环境下, 微信配置失败也不弹窗；
        // 应后端要求，暂时取消微信配置失败的弹窗。
        if (app.envType === 4) {
            config.customParams = {
                alertError: false
            }
        }
        app.sdk.setConfig(config)
        runSystem()
    }
})