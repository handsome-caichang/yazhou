//payment.js
const app = getApp()

Page({
    data: {
        succUrl:'',
        failUrl:'',
        payInfo:{},
        info:{},
    },
    onLoad: function (options) {
        this.setData({
            succUrl: decodeURIComponent(options.succUrl),
            failUrl: options.failUrl && decodeURIComponent(options.failUrl),
            payInfo:JSON.parse(decodeURIComponent(options.data)),
            info:JSON.parse(decodeURIComponent(options.info))
        })
    },
    onUnload: function () {

    },
    bindGetMsg: function (e){

    },
    pay:function(){
        let opt = Object.assign({},this.data.payInfo,{
            success:()=>{
                console.log(this.data.succUrl);
                app.globalData.redirectUrl = this.data.succUrl;
                setTimeout(function(){
                    wx.navigateBack();
                },1000);
            },
            fail:()=>{
                if (this.data.failUrl){
                    app.globalData.redirectUrl = this.data.failUrl;            
                } 
                setTimeout(function(){
                    wx.navigateBack();
                },1000);
            }
        });
        wx.requestPayment(opt);
    },
})