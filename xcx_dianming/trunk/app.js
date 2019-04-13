import IMG from './imgs/imgs.js' ;
import Util from './utils/util.js';
import MD5 from './utils/md5.js';
import Queue from './utils/queue.js';

App({
    domain: 'http://test.xiaogj.com',
    globalData: {
        count: 0,
        showExitBtn: false,
        userName: '', //退出登录的用户名
        appShowTimeStamp: 0, //为了处理右上角关闭小程序之后，再次进入小程序，都是展示的关闭小程序界面
        mallUnloadTimeStamp: 0, //为了处理右上角关闭小程序之后，再次进入小程序，都是展示的关闭小程序界面
        IMG,
        Queue,
        Rights:[],
        isAdmin:false,
        CFG:{},
        roles: [],
        bindlist: [],
        currentRole: 0
    },
    onShow: function(){
        this.globalData.appShowTimeStamp = new Date().getTime();
    },
    Util,
    MD5,
    //验证权限
    op:function(params){
        let app = this,
            R = app.globalData.Rights;
           
        if (R) { // 说明是老版
            return app.globalData.isAdmin || R.indexOf(params)!==-1;
        } else { // 说明是smart版
            return true
        }
    },
})