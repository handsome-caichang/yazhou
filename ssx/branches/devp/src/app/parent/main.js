import router from './router';
import store from './store';
// 引入自定义扩展插件
import extend from 'parent/extend/index.js';

import {getwxsysinfos,getuserinfobyuid} from 'parent/api/personal-center';

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

let getwxsysinfosPromise = getwxsysinfos({
        "userport": 1,
        'url': location.href.split('#')[0]
    }),
    getuserinfobyuidPromise = getuserinfobyuid();

    Promise.all([getwxsysinfosPromise,getuserinfobyuidPromise, app.getEnvSDKPromise()]).then(res => {
        if (res[0].result.code==app.errok && res[1].result.code==app.errok) {
            let config = {},
                w = res[0].data.wxconfig,
                d = res[0].data.DingTalkConfig;
            
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
                    appId: w.appid,
                    timestamp: w.timestamp,
                    nonceStr: w.noncestr,
                    signature: w.signature
                }
            }
            app.sdk.setConfig(config);
    
            //写死配置项的返回值
            res[0].data.userconfig.title_campus = "校区";
            res[0].data.userconfig.title_ssx_suggest = "对学校的投诉与建议";
            res[0].data.userconfig.title_teacher = "老师";
            
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