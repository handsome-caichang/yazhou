//app.js

let t = new Date().getTime();
App({
    globalData: {
        redirectUrl: '',
        userbaseinfo: {}, //用户基本信息
        count: 0,
        host: {
            '1': 'https://mzs.xiaogj.com', //开发版及体验版
            '0': 'https://mzs.xrx100.com'//正式版
        },
        envHost: '', //当前环境运行的host
        appShowTimeStamp: 0, //为了处理右上角关闭小程序之后，再次进入小程序，都是展示的关闭小程序界面
        mallUnloadTimeStamp: 0, //为了处理右上角关闭小程序之后，再次进入小程序，都是展示的关闭小程序界面
    },
    onShow: function(){
        this.globalData.appShowTimeStamp = new Date().getTime();
    }
})