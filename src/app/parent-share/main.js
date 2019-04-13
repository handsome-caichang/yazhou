import router from './router/index.js'
import store from './store/index.js'

// 引入自定义扩展插件
import extend from 'parentShare/extend/index.js'

import App from './App.vue'

import { getwxconfig } from 'parentShare/api/share';

Vue.config.productionTip = false;

// 启动第一个vue实例
function runSystem (argument) {
    // 注入自定义插件
    Vue.use(extend, {
        router: router
    });
    
    new Vue({
        el: '#app',
        router,
        store,
        template: '<app/>',
        components: { App }
    })
}

// 检查是否是通过微信分享进入应用的;
app.tool.checkIsWXshareUrl();

var query = app.tool.parseQuery()

let getConfig = getwxconfig({
        url: location.href.split('#')[0],
        terminal: query.terminal, // 终端类型：(0老师端 1家长端)
        companyId: query.companyId, // 公司ID：
        studentId: query.studentId, // 学生ID：(终端为家长端时需传递)
    }).then(res => {
        let config = {},
            data = res.data,
            w = data.WX,
            d = data.DingTalkConfig;
        //配置jssdk
        if (app.env === 'dd' && d) {
            config = {
                agentId: d.agentID,
                corpId: d.corpId,
                timeStamp: d.timestamp,
                nonceStr: d.nonceStr,
                signature: d.signature
            }
        } else {
            config = {
                debug: false,
                appId: w.WX_config_appId,
                timestamp: w.WX_config_timestamp,
                nonceStr: w.WX_config_nonceStr,
                signature: w.WX_config_signature
            }
        }

        return config
    })

Promise.all([getConfig, app.getEnvSDKPromise()]).then(res => {
    app.sdk.setConfig(res[0]);
    
    // 运行
    runSystem();
})

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();


