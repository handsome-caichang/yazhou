//manage.js
const app = getApp()

Page({
    data: {
        redirectUrl: '',
        transmit: {
            url : '',
            imageUrl : '',
            title: ''
        }
    },
    onShow:function(){
        this.setData({
            redirectUrl: app.globalData.redirectUrl
        });
    },
    onLoad: function (options) {
        //说明是跳转的;
        // if (options.url){

        //     wx.showToast({title:decodeURIComponent(options.url),icon:'none',duration:5000});
            
        //     app.globalData.redirectUrl = decodeURIComponent(options.url);
        //     this.setData({
        //         redirectUrl: app.globalData.redirectUrl
        //     });
        // }
        app.globalData.count = app.globalData.count + 1;        
    },
    onUnload: function () {
        app.globalData.mallUnloadTimeStamp = new Date().getTime();
    },
    onShareAppMessage(res){
        return {
            title: '一键招生，比想象的更容易',
            path: 'pages/index/index',
            imageUrl: 'https://cdn01.xiaogj.com/file/5972c5565ac3406d9a88eed25071b52f/201904/5c2b93434e8641cbb1dfdc252303c175.png'
        }
    }
})