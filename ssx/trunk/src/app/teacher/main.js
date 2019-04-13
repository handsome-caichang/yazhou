import router from './router'
import store from './store'
// 引入自定义扩展插件
import extend from 'teacher/extend/index.js'
import treePlugin from 'teacher/components/common/department-tree/department-tree-plugin.js'
import contentSchedulePlugin from 'teacher/components/common/course-content-schedule/course-content-schedule-plugin.js'
import colSelectPlugin from 'teacher/components/common/col-select/col-select-plugin.js';
import courseFilterPlugin from 'teacher/components/common/course-filter/course-filter-plugin.js';
import selectClassPlugin from 'teacher/components/common/select-shift-class/select-shift-class-plugin.js';

import {
    GetUserInfo,
    processGet
} from 'teacher/api/common';
import {
    getCustomers
} from 'teacher/api/customers';

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


// 用户登录
// http://localhost:1025/weixin/login.ashx?name=a&pass=1111
let getConfigPromise = processGet({ //获取配置信息的Promise
        url: location.href.split('#')[0],
        pname: "api",
        action: "whoami"
    }),
    GetUserInfoPromise = GetUserInfo(), //获取用户信息的Promise
    GetRoleInfoPromise = processGet({ //获取当前角色的Promise
        pname: 'main',
        currole: 0
    }),
    getCunstomerConfig = getCustomers({
        pname: 'getcustomerdictionary'
    });

Promise.all([getConfigPromise, GetUserInfoPromise, GetRoleInfoPromise, getCunstomerConfig, app.getEnvSDKPromise()]).then(res => {
    if (res[0].errcode == app.errok && res[1].ErrorCode == app.errok && res[2].errcode == app.errok) {
        let currentRole = {
                Id: '',
                Name: ''
            },
            config = {},
            wx = res[0].data.WxConfig,
            d = res[0].data.DingTalkConfig,
            w = res[0].data.WorkWXConfig;

        //判断校长角色&&不是进入“投诉与建议|家长评价排名|评价提醒|课表|上课点名”模块，进行重定向
        // if (res[2].currole == 1024 && (location.hash.indexOf('suggestion') == -1 && location.hash.indexOf('commentRank') == -1 && location.hash.indexOf('commentList') == -1 && location.hash.indexOf('courseList') == -1 && location.hash.indexOf('courseAttendanceList') == -1 && location.hash.indexOf('commCustomer') == -1 && location.hash.indexOf('customerToBeAllocated') == -1) && location.hash.indexOf('homeworkEvaluate') == -1)) {
        //     window.location.replace("homeMain.aspx");
        //     return;
        // }

        //班主任、老师、学管师名称配置项替换
        let systemTitle = res[0].data.UserConfig.sysInfo,
            roles = res[2].roles = res[1].Data.RoleList;
        for (let index = 0; index < roles.length; index++) {
            let r = roles[index];
            if (r.Id == 4) {
                r.Name = systemTitle.Title_Teacher;
            } else if (r.Id == 16) {
                r.Name = systemTitle.Title_StudentMaster;
            } else if (r.Id == 32) {
                r.Name = systemTitle.Title_ClassMaster;
            }
        }

        res[2].roles.forEach(role => { //获取当前用户角色
            if (role.Id == res[2].currole) {
                currentRole = role;
            }
        });

        if (app.envType < 10) {
            if (app.env === 'dd' && d) {
                config = { //配置钉钉jssdk
                    agentId: d.agentID,
                    corpId: d.corpId,
                    timeStamp: d.timestamp,
                    nonceStr: d.nonceStr,
                    signature: d.signature
                }
            } else if (app.env === 'wx' && wx) {
                config = { //配置微信jssdk
                    debug: false,
                    appId: wx.WX_config_appId,
                    timestamp: wx.WX_config_timestamp,
                    nonceStr: wx.WX_config_nonceStr,
                    signature: wx.WX_config_signature
                }
            } else if (app.env === 'wxwork' && w) {
                config = { //配置企业微信jssdk
                    beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: w.appID, // 必填，企业微信的corpID
                    timestamp: w.timestamp, // 必填，生成签名的时间戳
                    nonceStr: w.nonceStr, // 必填，生成签名的随机串
                    signature: w.signature, // 必填，签名，见附录1
                }
            }
            app.sdk.setConfig(config)
        }

        store.commit('set_currole', currentRole);
        app.sysInfo = Object.assign({},
            res[0].data.UserConfig,
            res[0].data.UserConfig.sysInfo,
            res[1].Data,
            res[2].data, {
                currole: currentRole,
                changePassword: res[2].changePassword,
                parentMessageTo: res[2].parentMessageTo
            });
        // app.sysInfo.EnableCustomerAutomaticDistribution = '0'
        app.customConfigInfo = Object.assign({}, res[3].data)
        app.customConfigInfo.CustomerStatusNoSus = app.customConfigInfo.CustomerStatus && app.customConfigInfo.CustomerStatus.filter(obj => obj.Value !== '转化成功')
        let tempArr = [{
            Value: '不限',
            ID: ''
        }, {
            Value: '未转化',
            ID: 'AllWithoutSuccess'
        }, {
            Value: '未知',
            ID: '00000000-0000-0000-0000-000000000000'
        }]
        app.customConfigInfo.CustomerStatus = tempArr.concat(app.customConfigInfo.CustomerStatus)
        //运行
        runSystem();
    }
});


// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();



// 监听各运行环境SDK报错事件, 提交后端记录日志
app.sdk.onError(function(params) {
    console.log("收到'SDK error'事件 => ", params);
    app.http.ajax({
        url: '/api/Debug/SetLog',
        data: {
            content: JSON.stringify(params)
        }
    })
})