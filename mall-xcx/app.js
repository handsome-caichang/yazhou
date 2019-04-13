//app.js

let t = new Date().getTime();
App({
    globalData: {
        redirectUrl: '',
        count: 0,
        showExitBtn: false,
        userName: '', //退出登录的用户名
        appShowTimeStamp: 0, //为了处理右上角关闭小程序之后，再次进入小程序，都是展示的关闭小程序界面
        mallUnloadTimeStamp: 0, //为了处理右上角关闭小程序之后，再次进入小程序，都是展示的关闭小程序界面

        userList:[],    //用户列表
        userid:'',
        openid:'',
        companyKey:'',  //用户学校的二级域名
        companyUrl:function(){
            return 'https://mall.xiaogj.com/' +  this.companyKey + '/html/index.html?t=' + t;
        },

    },
    onShow: function(){
        this.globalData.appShowTimeStamp = new Date().getTime();
    }
})