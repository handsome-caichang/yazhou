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
        //     // wx.showToast({title:decodeURIComponent(options.url),icon:'none',duration:5000});
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
    bindGetMsg: function (e){
        let pop = e.detail.data.pop();
        this.setData({
            transmit: {
                url: pop.fullPath,
                title: (pop.options && pop.options.title ) || '有妙课',
                imageUrl: (pop.options && pop.options.imgUrl) || null
            }
        })
    },
    onShareAppMessage(res){
        let pageUrl = 'pages/index/index?returl=' + encodeURIComponent(app.globalData.envHost+'/user/index.html#'+this.data.transmit.url);
        return {
            title: this.data.transmit.title,
            path: pageUrl,
            imageUrl: this.data.transmit.imageUrl,
        }
    }
})