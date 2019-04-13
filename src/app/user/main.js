import router from './router/index.js'
import store from './store/index.js'

import BaoMingAction from './components/baoMingAction/baoMingAction.js';
import WatchMore from './components/watchMore/watchMore.js'


// 引入自定义扩展插件
import extend from 'user/extend/index.js'
import commonExtend from '../../common/extend/index.js'
import {
    getuserinfo
} from 'user/api/common';

import App from './App.vue'

app.setIntervalObj = null;
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
Vue.config.productionTip = false;

// 启动第一个vue实例
function runSystem(argument) {
    // 注入自定义插件
    Vue.use(extend, {
        router: router
    });
    Vue.use(WatchMore, {
        router,
        root: app
    })
    Vue.use(BaoMingAction, {
        router: router,
        root: app,
        store: store
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

    if (window.__wxjs_environment === 'miniprogram') {
        router.beforeEach((to, from, next) => {
            wx.miniProgram.postMessage({
                data: {
                    fullPath: to.fullPath
                }
            })
            next();
        })
    }
}

getuserinfo().then(res => {
    if (res.result.code == app.errok) {
        store.commit('setUserInfo', res.userinfo)
        runSystem();
    }
})

app.listenVisibilityChange();