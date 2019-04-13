import router from './router';
import store from './store';
// 引入自定义扩展插件
import extend from 'teacher/extend/index.js';
import treePlugin from 'teacher/components/common/department-tree/department-tree-plugin.js';
import contentSchedulePlugin from 'teacher/components/common/course-content-schedule/course-content-schedule-plugin.js';
import colSelectPlugin from 'teacher/components/common/col-select/col-select-plugin.js';
import courseFilterPlugin from 'teacher/components/common/course-filter/course-filter-plugin.js';
import selectClassPlugin from 'teacher/components/common/select-shift-class/select-shift-class-plugin.js';

import {
    getwxsysinfos,
    getuserinfobyuid,
    getexpireinfo
} from 'teacher/api/personal-center.js';
import App from './App.vue';

Vue.config.productionTip = false;

// 启动第一个vue实例
function runSystem(argument) {
    // 注入自定义插件
    Vue.use(extend, {
        router: router
    });
    Vue.use(treePlugin, {
        router: router,
        store: store
    });
    Vue.use(contentSchedulePlugin, {
        router: router,
        store: store
    });
    Vue.use(colSelectPlugin, {
        router: router,
        store: store
    });
    Vue.use(courseFilterPlugin, {
        router: router,
        store: store
    });
    Vue.use(selectClassPlugin, {
        router: router,
        store: store
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

// 检查是否是通过微信分享进入应用的;
app.tool.checkIsWXshareUrl();

let getwxsysinfosPromise = getwxsysinfos({
        userport: 2,
        url: location.href.split('#')[0]
    }),
    getuserinfobyuidPromise = getuserinfobyuid();

Promise.all([getwxsysinfosPromise,getuserinfobyuidPromise]).then(res => {
    if(res[0].result.code == app.errok && res[1].result.code == app.errok) {
        app.sysInfo = Object.assign({},res[0].userconfig,res[1].data);
        //运行
        runSystem();
        //获取系统过期信息
        getexpireinfo().then(res=> {
            if (res.data.status == 1) { //0正常，1快过期，2已过期
                store.commit('set_systemOverdueMsg', res.data.msg);
            }
        })
    }else if(res[0].result.code == 500) {
        runSystem();
        app.tool.setDocTitle('系统提醒');
        store.commit('set_systemOverdue', true);
        store.commit('set_systemOverdueMsg', res[0].result.msg);
    }
});

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();

// 监听各运行环境SDK报错事件, 提交后端记录日志
// app.sdk.onError(function(params) {
//     console.log("收到'SDK error'事件 => ", params);
//     app.http.ajax({
//         url: '/api/Debug/SetLog',
//         data: {
//             content: JSON.stringify(params)
//         }
//     })
// })