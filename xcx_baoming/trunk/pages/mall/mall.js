//mall.js
const app = getApp()

let transmit = {
    url : '',
    imageUrl : null,
    title:'',
};

Page({
    data: {
        redirectUrl: ''
    },
    onShow:function(){
        this.setData({
            redirectUrl: app.globalData.redirectUrl
        });
    },
    onLoad: function (options) {
        
        //说明是跳转的;
        if (options.url){

            wx.showToast({title:decodeURIComponent(options.url),icon:'none',duration:5000});
            
            app.globalData.redirectUrl = decodeURIComponent(options.url);
            this.setData({
                redirectUrl: app.globalData.redirectUrl
            });
        }
        app.globalData.count = app.globalData.count + 1;        
        
    },
    onUnload: function () {
        app.globalData.mallUnloadTimeStamp = new Date().getTime();
    },
    bindGetMsg: function (e){
        let pop = e.detail.data.pop();
        transmit.url = pop.fullPath,
        transmit.title = (pop.options && pop.options.title ) || '商城';
        transmit.imageUrl = (pop.options && pop.options.imgUrl) || null;

        
        app.globalData.showExitBtn = pop.showExitBtn;
        app.globalData.userName = pop.userName;
    },
    onShareAppMessage(res){
        let pageUrl = 'pages/index/index?url=' + encodeURIComponent(app.globalData.companyUrl() + '#' + transmit.url) + '&transmit=1';        
        return {
            title:transmit.title,
            path: pageUrl,
            imageUrl:transmit.imageUrl,
        }
    }
})