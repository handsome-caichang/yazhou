import router from './router/index.js'
import store from './store/index.js'

// 引入自定义扩展插件
import extend from 'parent/extend/index.js'
import { getwxsysinfos,getuserinfobyuid } from 'parent/api/personal-center.js';

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
// let getConfigPromise = processGet({ //获取所有配置信息的Promise
//     url: location.href.split('#')[0],
//     pname: "api",
//     action: "whoami"
// }).then(res => {
//     if (res.errcode == app.errok) {
//         let config = {},
//             data = res.data,
//             w = data.WxConfig,
//             d = data.DingTalkConfig;
        
//         //获取用户相关
//         data.UserConfig.userId = res.userId;
//         store.commit('set_userConfig', data.UserConfig);
//         app.sysInfo = store.state.userConfig;
        
//         //配置jssdk
//         if (app.env === 'dd' && d) {
//             config = {
//                 agentId: d.agentID,
//                 corpId: d.corpId,
//                 timeStamp: d.timestamp,
//                 nonceStr: d.nonceStr,
//                 signature: d.signature
//             }
//         } else {
//             config = {
//                 debug: false,
//                 appId: w.WX_config_appId,
//                 timestamp: w.WX_config_timestamp,
//                 nonceStr: w.WX_config_nonceStr,
//                 signature: w.WX_config_signature
//             }
//         }

//         return config
//     }
// });

// Promise.all([getConfigPromise, app.getEnvSDKPromise()]).then(res => {
//     app.sdk.setConfig(res[0]);
    
//     // 运行
//     runSystem();
// })

let getwxsysinfosPromise = getwxsysinfos({
        "userport": 1,
        'url': location.href.split('#')[0]
    }),
    getuserinfobyuidPromise = getuserinfobyuid();

    Promise.all([getwxsysinfosPromise,getuserinfobyuidPromise]).then(res => {
        if (res[0].result.code==app.errok && res[1].result.code==app.errok) {
            //获取用户相关
            store.commit('set_userConfig', res[0].data.userconfig);
            app.sysInfo = Object.assign({},
                store.state.userConfig,
                res[1].data);
            //运行
            runSystem();
        }else if (res[0].result.code==560) {
            runSystem();
            app.tool.setDocTitle('系统提醒');
            store.commit('set_systemOverdue', true);
            store.commit('set_systemOverdueMsg', res[0].result.msg);
        }            
    });

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();