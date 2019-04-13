import router from 'src/router'
import store from 'src/store'
// 引入自定义扩展插件
import vuePlugin from 'src/plugin/index.js'

import {getallconfig, getLoginUser} from 'src/api/jie.js';

import App from './App.vue'

Vue.config.productionTip = false;


Vue.use(vuePlugin, {
    router: router,
    store: store
}); 


// 启动第一个vue实例
function runSystem (argument) {
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

app.defaultTitle = "师生信"

let getallconfigPromise = getallconfig({url: location.href.split('#')[0]})
    .then(res => {
        let config = {}, 
            wx = res.Data.WX.Config, 
            ww = res.Data.WorkWx.Config,
            d = res.Data.DingTalk.Config, 
            tUrl;

        if (res.ErrorCode === 200) {
            store.commit('set_nimAppKey', res.Data.NIM.appKey)
            store.commit('set_parentUrl', res.Data.WX.CustomMsgJumpParentUrl)

            if (app.env === 'dd' && d) {
                tUrl = res.Data.DingTalk.CustomMsgJumpTeacherUrl
                config = {
                    agentId: d.agentID,
                    corpId: d.corpId,
                    timeStamp: d.timestamp,
                    nonceStr: d.nonceStr,
                    signature: d.signature
                }
            } else if (app.env === 'wxwork' && ww) {
                tUrl = res.Data.WorkWx.CustomMsgJumpTeacherUrl
                config = { //配置企业微信jssdk
                    beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: ww.appID, // 必填，企业微信的corpID
                    timestamp: ww.timestamp, // 必填，生成签名的时间戳
                    nonceStr: ww.nonceStr, // 必填，生成签名的随机串
                    signature: ww.signature, // 必填，签名，见附录1
                }
            } else {
                tUrl = res.Data.WX.CustomMsgJumpTeacherUrl
                config = {
                    debug: false,
                    appId: wx.WX_config_appId,
                    timestamp: wx.WX_config_timestamp,
                    nonceStr: wx.WX_config_nonceStr,
                    signature: wx.WX_config_signature
                }
            }
        }

        store.commit('set_teacherUrl', tUrl)

        return config
    })

let getLoginUserPromise = getLoginUser().then(res => {
    if (res.ErrorCode === 200) {
        store.commit('set_userWone', res.Data)
    }
})

Promise.all([getallconfigPromise, getLoginUserPromise, app.getEnvSDKPromise()]).then(res => {

    app.sdk.setConfig(res[0])

    runSystem();

    // 初始化云信连接
    store.dispatch('connect')
})

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();

