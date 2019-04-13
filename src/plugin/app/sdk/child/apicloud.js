// apicloud环境

// 封装微信JS-SDK相关操作功能, 依赖微信JS-SDK;
import base from '../../base.js'
import BaseClass from './baseClass/baseClass.js'

var apicloudSDK, u = new BaseClass();

if (base.env === 'apicloud') {


    // 通过config接口注入权限验证配置
    u.setConfig = function(opts) {
    }

    // 在'WeixinJSBridgeReady'就绪时, 隐藏或显示微信所有非基础按钮接口, 需要在每次切换路由时调用;
    u.triggerWXOptMenu = function(bool) {
    }

    // 只有在'wxready'的状态下并且页面启用了显示非基础按钮接口, 才打开相应非基础按钮;
    u.triggerMenu = function(bool = false) {
    }

    // 通过微信菜单分享
    u.onWXMenuShare = function(opt) {
        /*opt = {
                title: '', // 分享标题
                desc: '', // 分享描述
                link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () { 
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                }
            }*/

        u.wxReadyPromise.then(res => {
            if (res.errCode === 200) {
                // 分享到朋友圈
                wx.onMenuShareTimeline(opt);
                // 分享给朋友
                wx.onMenuShareAppMessage(opt);
                // 分享到QQ
                wx.onMenuShareQQ(opt);
                // 分享到腾讯微博
                wx.onMenuShareWeibo();
                // 分享到QQ空间
                wx.onMenuShareQZone(opt);
            }
        })
    }
}

apicloudSDK = u;

export default apicloudSDK