import router from './router'
import store from './store'
// 引入自定义扩展插件

// import {getCurrentUserInfoAndAddress, test500} from 'api/jie.js';
import {
    getCurrentUserInfoAndAddress
} from 'mall/api/jie.js';
import {
    setSaleUserId
} from 'mall/api/yy.js'
import {
    getAllConfig
} from 'mall/api/lc.js';

import App from './App.vue'

Vue.config.productionTip = false;
// 检查是否是通过微信分享进入应用的; 如果url中有hashFullPath查询参数,
// 说明是通过分享的链接进入应用的; 需要先还原为hash的方式;
function checkIsWXshareUrl() {
    let q = app.tool.parseQuery();
    let link = location.href.split("?")[0];
    if (q.app) {
        store.commit('set_wxAppId', q.app)
    }
    if (q.hashFullPath) {
        let path, query;
        path = q.hashFullPath;
        delete(q.hashFullPath)
        query = app.tool.jsonToQueryStr(q);
        link = link + query + '#' + decodeURIComponent(path);
        location.href = link;
    }
}
// 启动第一个vue实例
function runSystem(argument) {
    // 注入自定义插件
    Vue.use({
        router: router,
        store: store
    });
    window.vue = new Vue({
        el: '#app',
        router,
        store,
        template: '<app/>',
        components: {
            App
        }
    })

    /*if (window.__wxjs_environment === 'miniprogram'){
        router.beforeEach((to,from,next)=>{
            wx.miniProgram.postMessage({
                data:{
                    fullPath:to.fullPath
                }
            })
            next();
        })
    }*/
}

// 检查是否是通过微信分享进入应用的;
checkIsWXshareUrl();
app.control = {};
app.control.loginCheck = function(vueexample) {
    if (!vueexample.$store.state.userInfo.Name) {
        vueexample.$router.push('/login');
        return false;
    }
    return true;
};
// 
app.saleuid = app.tool.parseHash().query.saleuid || ''


// 获取所有配置信息, 写入vuex; 并返回一个resolve出'校区列表'的promise
let getAllConfigPromise = getAllConfig({
    url: location.href.split('#')[0],
    appID: store.state.wxAppId
}).then(res => {
    if (res.ErrorCode === app.errok) {
        let data = res.Data,
            wxConf = data.WxConfig;
        // 获取基础参数-配置项信息
        store.commit("set_config", data.Config);
        // 获取客服列表
        store.commit("set_agent", data.Agents);
        // 获取用户名后缀
        store.commit("set_companySuffix", data.Suffix);
        // 获取校区列表
        store.commit('set_campuslist', data.CampusList);
        // 保存服务端返回的微信的appID
        store.commit('set_wxAppId', wxConf.WX_config_appId);

        //配置微信js-SDK认证
        /*app.wx.setWXConfig({
            debug: false,
            appId: wxConf.WX_config_appId,
            timestamp: wxConf.WX_config_timestamp,
            nonceStr: wxConf.WX_config_nonceStr,
            signature: wxConf.WX_config_signature,
            jsApiList: app.wx.jsApiList
        });*/
        let config = { //配置微信jssdk
            debug: false,
            appId: wxConf.WX_config_appId,
            timestamp: wxConf.WX_config_timestamp,
            nonceStr: wxConf.WX_config_nonceStr,
            signature: wxConf.WX_config_signature
        }

        // 如果在小程序环境下, 微信配置失败也不弹窗；
        // 应后端要求，暂时取消微信配置失败的弹窗。
        // if (app.envType === 4) {
            config.customParams = {alertError: false}
        // }
        app.sdk.setConfig(config)
        return {
            campusList: res.Data.CampusList,
            curCampus: {
                id: res.Data.CurrentCampusID,
                name: res.Data.CurrentCampusName
            }
        }
    } else if (res.ErrorCode === 500) {
        location.href = "./404.html";
    } else {
        console.log("服务端出错了....");
    }
})

// 获取用户信息、用户地址列表
let getUserInfoPromise = getCurrentUserInfoAndAddress().then(res => {
    if (res.ErrorCode == app.errok) {
        store.commit("set_userInfo", res.Data.User);
        store.commit("set_addressList", res.Data.Addrtess);
    }
})



Promise.all([getAllConfigPromise, getUserInfoPromise]).then(res => {

    let campusList = res[0].campusList,
        campus = res[0].curCampus;
    // 获取url上的校区ID，如果有说明是打开的分享链接或者是刷新当前页面;
    let urlCumpusID = app.tool.parseHash(location.hash).query.cid;

    // 如果url上有校区id,需要从校区列表中获取校区名字;
    if (urlCumpusID) {
        const camList = campusList.filter(c => {
            return c.ID === urlCumpusID;
        });
        if (camList.length > 0) {
            campus.id = urlCumpusID;
            campus.name = camList[0].Name;
        }
    } else if (campusList.length == 1) {
        campus.id = campusList[0].ID;
        campus.name = campusList[0].Name;
    }

    campus.id && store.commit('set_curCampus', campus);

    runSystem();

    //提交业绩归属人
    if (app.saleuid) {
        setSaleUserId({
            id: app.saleuid
        }).then(res => {})
    }
    //根据配置项判断是否让其进入商城
    if (store.state.config.LoginMode && !app.control.loginCheck(vue)) {
        vue.$router.replace({
            path: 'login'
        })
    }
})
app.listenVisibilityChange = function() {
    if (app.isIDevice) {
        let hideTime,
            showTime,
            diffTime = 0;
        document.addEventListener("visibilitychange", e => {
            if (document.hidden === true) {
                // 页面被挂起
                hideTime = new Date().getTime();
            } else {
                // 页面由挂起被激活
                showTime = new Date().getTime();
                diffTime = Math.round((showTime - hideTime) / 1000);
                app.event.emit("appActive", {
                    diffTime
                });
            }
        });
    }
};

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();

app.listenVisibilityChange();