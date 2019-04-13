const app = getApp();

Page({
    jumpManage() {
        let path = 'returl=' + encodeURIComponent(app.globalData.envHost+'/manage/index.html#/home/0')
        console.log('pages/index/index?' + path)
        wx.navigateToMiniProgram({
            appId: 'wx9342737e24a086fc',
            path: 'pages/index/index?' + path,
            envVersion: 'trial', //要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
            success(res) { //打开小程序成功
            },
            fail(err) {
                // wx.showToast({
                //     title: '跳转小程序失败',
                //     icon: 'none'
                // })
            }
        })
    },
    onLoad: function(options) {}
})