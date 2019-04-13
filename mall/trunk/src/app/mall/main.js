import router from './router'
import store from './store'
// 引入自定义扩展插件
import vuePlugin from './extend/index.js'


import App from './App.vue'
import {
    getcampus,
    getstudentinfobyid
} from 'api/wx.js'
import {
    userLogin
} from 'api/yy.js'

import {
    getCurrentUserInfoAndAddress
} from 'mall/api/jie.js';


userLogin().then(res => {
    // console.log(store._mutations);
    store.commit('set_userInfo', res.Data);
})


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
function runSystem() {
    // 注入自定义插件
    Vue.use(vuePlugin, {
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
}
// runSystem()
// 检查是否是通过微信分享进入应用的;
// checkIsWXshareUrl();
app.control = {};
app.control.loginCheck = function(vueexample) {
    if (!vueexample.$store.state.userInfo.Name) {
        vueexample.$router.push('/login');
        return false;
    }
    return true;
};

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


// 获取所有配置信息, 写入vuex; 并返回一个resolve出'校区列表'的promise
let getCampusPromise = getcampus()

// 获取用户信息、用户地址列表
let getUserInfoPromise = getstudentinfobyid()


Promise.all([getCampusPromise, getUserInfoPromise]).then(res => {
    console.log(res);
    if (res[0].result.code == app.errok && res[1].result.code == app.errok) {
        let campusList = res[0].data,
            campus = campusList[0]
        console.log(campus);
        // 获取校区列表
        store.commit('set_campuslist', campusList)
        // 获取url上的校区ID，如果有说明是打开的分享链接或者是刷新当前页面;
        let urlCumpusID = app.tool.parseHash(location.hash).query.cid;

        // 如果url上有校区id,需要从校区列表中获取校区名字;
        if (urlCumpusID) {
            const camList = campusList.filter(c => {
                return c.ID === urlCumpusID;
            });
            if (camList.length > 0) {
                campus.id = urlCumpusID;
                campus.name = camList[0].name;
            }
        } else if (campusList.length == 1) {
            campus.id = campusList[0].id;
            campus.name = campusList[0].name;
        }

        campus.id && store.commit('set_curCampus', campus);


        runSystem();
    }

})