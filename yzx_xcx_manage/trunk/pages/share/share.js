//去招生
const app = getApp();

Page({
    data: { 
        template: {},
        options: {},
        mainimgs: [
            "https://cdn01.xiaogj.com/file/eb7ee5a58cd2430cba197189c404ac51/201904/e807efec97d9422cb21ed5b44a28f468.png",
            "https://cdn01.xiaogj.com/file/eb7ee5a58cd2430cba197189c404ac51/201904/e807efec97d9422cb21ed5b44a28f468.png",
            "https://cdn01.xiaogj.com/file/822b07f69a61409883212a8beef7a5d1/201904/9a96c405568b469eb4830eae1d64cbd4.png",
            "https://cdn01.xiaogj.com/file/860daec9701d4e96b281778191f98d6e/201904/96b9745bd78b41c482f80032013c84fe.png"
        ],
        descs: [
            '亲，我发现一个好课程，大家快来一起来拼团吧～',
            '亲，我发现一个好课程，大家快来一起来拼团吧～',
            '亲，就差你了，快来帮我砍价，砍到底价好上课～',
            'Hi，朋友们，我发现了一门好课，大家快来看看吧～'
        ]
    },
    onLoad(options) {
        console.log(options)
        this.setData({
            options: options,
            template: {
                title: this.data.descs[options.activitytype],
                mainimg: this.data.mainimgs[options.activitytype]
            }
        });
    },
    shareWx() { //跳转小程序
        let path = 'returl=' + encodeURIComponent(app.globalData.envHost+'/user/index.html#/templateDetail/' + this.options.styleid + '?templateid=' + this.options.templateid + '&id=' + this.options.shareid);
        wx.navigateToMiniProgram({
            appId: 'wx88226b3f2d0c6b09',
            path: 'pages/index/index?' + path,
            // envVersion: 'develop',
            envVersion: 'trial', //要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
            success(res) {}, //打开小程序成功
            fail() {
                // wx.showToast({
                //     title: '跳转小程序失败',
                //     icon: 'none'
                // })
            }
        })
    }
});