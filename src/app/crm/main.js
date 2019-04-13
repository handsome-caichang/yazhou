import router from './router/index.js'
import store from './store/index.js'

// 引入自定义扩展插件
import extend from 'crm/extend/index.js'

import App from './App.vue'


import {
    getwxsysinfos,
    getCurrentManager
} from 'crm/api/yy.js'


Vue.config.productionTip = false;

// 启动第一个vue实例
function runSystem(argument) {
    // 注入自定义插件
    Vue.use(extend, {
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

/*getwxsysinfos({
    url: location.href.split('#')[0],
    userport: 2
}).then(res => {
    var w = res.data.wxconfig
    app.sdk.setConfig({
        //beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: w.appid, // 必填，企业微信的corpID
        timestamp: w.timestamp, // 必填，生成签名的时间戳
        nonceStr: w.noncestr, // 必填，生成签名的随机串
        signature: w.signature, // 必填，签名，见附录1
    })
})
getCurrentManager().then(res => {
    if (res.result.code === app.errok) {
        store.commit('set_myInfo', {
            id: res.managerid,
            name: res.managename,
            isconfigqrcode: res.isconfigqrcode,
            photourl: res.photourl,
            companyid: res.companyid,
            qrcodeid: res.qrcodeid,
            qrcodeurl: `https://${location.host}/wx.do?appid=2&action=getqrcode`,
        })
    }

    runSystem()
})*/
let wxPromise = getwxsysinfos({
        url: location.href.split('#')[0],
        userport: 2
    }),
    getCurrentManagerPromise = getCurrentManager()
Promise.all([wxPromise, getCurrentManagerPromise, app.getEnvSDKPromise()]).then(res => {
    if (res[0].result.code == app.errok && res[1].result.code == app.errok) {
        var w = res[0].data.wxconfig
        app.sysInfo = Object.assign({}, res[0].data.userconfig)
        app.sdk.setConfig({
            //beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: w.appid, // 必填，企业微信的corpID
            timestamp: w.timestamp, // 必填，生成签名的时间戳
            nonceStr: w.noncestr, // 必填，生成签名的随机串
            signature: w.signature, // 必填，签名，见附录1
        })
        store.commit('set_myInfo', {
            id: res[1].managerid,
            name: res[1].managename,
            isconfigqrcode: res[1].isconfigqrcode,
            photourl: res[1].photourl,
            companyid: res[1].companyid,
            qrcodeid: res[1].qrcodeid,
            qrcodeurl: `https://${location.host}/wx.do?appid=2&action=getqrcode`,
        })
        runSystem()
    }
})

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();