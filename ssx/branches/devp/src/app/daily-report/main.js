import router from './router'
import store from './store'
// 引入自定义扩展插件
import extend from 'dailyReport/extend/index.js'
import App from './App.vue';

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

Promise.all([app.getEnvSDKPromise()]).then(res => {
    app.sdk.setConfig({
        customParams: {
            alertError: false
        }
    });
    
    // 运行
    runSystem();
})

// 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
app.listenKeyboard();