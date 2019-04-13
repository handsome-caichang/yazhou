import router from './router'
import store from './store'
// 引入自定义扩展插件
import extend from 'teacher/extend/index.js'
import treePlugin from 'teacher/components/common/department-tree/department-tree-plugin.js'
import contentSchedulePlugin from 'teacher/components/common/course-content-schedule/course-content-schedule-plugin.js'

import { getwxsysinfos,getuserinfobyuid,getvaliditymsg } from 'teacher/api/personal-center';

import App from './App.vue';

Vue.config.productionTip = false;

// 启动第一个vue实例
function runSystem (argument) {
    // 注入自定义插件
    Vue.use(extend, {
        router: router
    });
    Vue.use(treePlugin, {
        router: router,
        store: store
    });
    Vue.use(contentSchedulePlugin,{
    	router: router,
    	store: store
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
        "userport": 2,
        'url': location.href.split('#')[0]
    }),
    getuserinfobyuidPromise = getuserinfobyuid();

Promise.all([getwxsysinfosPromise,getuserinfobyuidPromise,app.getEnvSDKPromise()]).then(res => {
    if (res[0].result.code==app.errok && res[1].result.code==app.errok) {
        let currentRole={
                id: '',
                name: ''
            },
            config = {},
            w = res[0].data.wxconfig,
            d = res[0].data.DingTalkConfig;
        
        //班主任、老师、学管师名称配置项替换
        let systemTitle = res[0].data.userconfig,
            roles = res[1].data.roles;
        for (let index = 0; index < roles.length; index++) {
            let r = roles[index];
            if (r.id == 4) {
                r.name = systemTitle.title_teacher;
            }else if (r.id == 16) {
                r.name = systemTitle.title_studentmaster;                    
            }
        }
        //写死配置项的返回值
        res[0].data.userconfig.title_campus = "校区";
        res[0].data.userconfig.title_classmaster = "班主任";
        res[0].data.userconfig.title_course = "课次";
        res[0].data.userconfig.title_courseunit_2 = "次";
        res[0].data.userconfig.title_saleperson = "咨询师";
        res[0].data.userconfig.title_ssx_suggest = "对学校的投诉与建议";
        res[0].data.userconfig.title_studentmaster = "学管师";
        res[0].data.userconfig.title_teacher = "老师";

        res[1].data.roles.forEach(role => { //获取当前用户角色
            if (role.id == res[1].data.currrole) {
                currentRole = role;
            }
        });

        if (app.env === 'dd' && d) {
            config = {
                agentId: d.agentID,
                corpId: d.corpId,
                timeStamp: d.timestamp,
                nonceStr: d.nonceStr,
                signature: d.signature
            }
        } else {
            config = { //配置微信jssdk
                debug: false,
                appId: w.appid,
                timestamp: w.timestamp,
                nonceStr: w.noncestr,
                signature: w.signature
            }
        }
        app.sdk.setConfig(config);

        store.commit('set_currole', currentRole);
        app.sysInfo = Object.assign({},{currole: currentRole},
            res[0].data.userconfig,
            res[1].data);
        
        //运行
        runSystem();

        getvaliditymsg().then(res => {
            if (res.data.status == 1) {
                store.commit('set_systemOverdueMsg', res.data.msg);
            }
        })
    }else if (res[0].result.code==560) {
        runSystem();
        app.tool.setDocTitle('系统提醒');
        store.commit('set_systemOverdue', true);
        store.commit('set_systemOverdueMsg', res[0].result.msg);
    }
});

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();