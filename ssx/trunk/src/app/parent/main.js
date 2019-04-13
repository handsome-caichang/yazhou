import router from './router/index.js'
import store from './store/index.js'

// 引入自定义扩展插件
import extend from 'parent/extend/index.js'
import { processGet } from 'parent/api/common';

import App from './App.vue'

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

//用户登录
// http://localhost:1026/weixin/login.ashx?name=b&pass=1111
let getConfigPromise = processGet({ //获取所有配置信息的Promise
    url: location.href.split('#')[0],
    pname: "api",
    action: "whoami"
}).then(res => {
    if (res.errcode == app.errok) {
        let config = {},
            data = res.data,
            w = data.WxConfig,
            d = data.DingTalkConfig;
        
        //获取用户相关
        data.UserConfig.userId = res.userId;
        store.commit('set_userConfig', data.UserConfig);
        app.sysInfo = store.state.userConfig;
        
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
    }
});

Promise.all([getConfigPromise, app.getEnvSDKPromise()]).then(res => {
    app.sdk.setConfig(res[0]);
    
    // 运行
    runSystem();
})

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();