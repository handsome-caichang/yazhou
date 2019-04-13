// 个人版微信环境

// 封装微信JS-SDK相关操作功能, 依赖微信JS-SDK;
import base from '../../base.js'
import BaseClass from './baseClass/baseClass.js'

var wxsdk, u = new BaseClass();

if (base.env === 'wx'  || base.env === 'wxwork' || base.env === 'browser') {

    u.jssdkApiList = ["chooseImage", "uploadImage", "previewImage", "getLocalImgData",
        "startRecord", "stopRecord", "onVoiceRecordEnd",
        "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice",
        "showOptionMenu", "hideOptionMenu", "downloadVoice", "closeWindow",
        "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone",
        "showAllNonBaseMenuItem", "hideAllNonBaseMenuItem"
    ]

    // 微信JS-SDK是否就绪
    u.wxReadyPromise = new Promise((resolve, reject) => {
        u.event.on("wxconfig", function (e, opt) {

            // alert("wx promise config")
            wx.ready(function(res) {
                console.log('wx ready ...');
                // alert('wx ready ...');
                resolve({
                    errCode: 200
                })
            });

            wx.error(function(error) {
                console.warn('微信配置失败... ', error);
                if (opt.customParams.alertError) {
                    alert('微信接口不稳定，暂时不能发送图片、录制语音。')
                }

                // 调用发布错误事件的方法
                u.emitError({
                    type: "wxconfigFail",
                    params: opt.params,
                    error: error
                })

                reject({
                    errCode: 400,
                    errMsg: error.errMsg
                })
            });
        })
    });

    // WeixinJSBridge是否就绪
    u.wxJSBridgePromise = new Promise(resolve => {
        function ready() {
            resolve('WeixinJSBridge ready ...')
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', ready, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', ready);
                document.attachEvent('onWeixinJSBridgeReady', ready);
            }
        } else {
            ready();
        }
    })

    // 通过config接口注入权限验证配置
    u.setConfig = function(opts) {
        let config = {
            debug: false,
            appId: "wx507dbff2a0ac7aae00",
            timestamp: 1513254847,
            nonceStr: "WX_config_nonceStr",
            signature: "98260ffca01823d0bc7ddbbcce14d14f99a32df0",
            jsApiList: u.jssdkApiList,
            customParams: {
                alertError: true  // 在微信SDK配置失败时，是否给出提示
            }
        }
        Object.assign(config, opts)
        wx.config(config);
        u.event.emit("wxconfig", {
            params: opts,
            customParams: config.customParams
        })
    }

    // 在'WeixinJSBridgeReady'就绪时, 隐藏或显示微信所有非基础按钮接口, 需要在每次切换路由时调用;
    u.triggerWXOptMenu = function(bool) {
        u.wxJSBridgePromise.then(res => {
            console.log(res);
            WeixinJSBridge.call(bool ? 'showOptionMenu' : 'hideOptionMenu');
        })
    }

    // 只有在'wxready'的状态下并且页面启用了显示非基础按钮接口, 才打开相应非基础按钮;
    u.triggerMenu = function(bool = false) {
        u.wxReadyPromise.then((res) => {
            if (res.errCode === 200 && bool) {
                // 显示所有功能按钮接口
                wx.showAllNonBaseMenuItem();
            } else {
                // 隐藏所有非基础按钮接口
                wx.hideAllNonBaseMenuItem();
            }
        }).catch(res => {
            WeixinJSBridge && u.triggerWXOptMenu(false);
        })
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

    // 分享
    u.share = function (opt) {
        /*opt = {
            title: '', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        }*/
        u.triggerMenu(true)
        u.onWXMenuShare(opt)
    }

    // 预览图片
    u.previewImage = function (opt = {}) {
        wx.previewImage({
            current: opt.current,
            urls: opt.urls
        });
    }

    // 选择图片
    /*opt = {
        max: 9, //最多可选个数
    }*/
    u.chooseImage = function(opt = {max: 9}) {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: opt.max || 9,
                complete: res => {
                    if (res.errMsg === 'chooseImage:ok') {
                        resolve(res.localIds);
                    } else if (res.errMsg === 'chooseImage:cancel') {
                        resolve([]);
                    } else {
                        console.warn('调用 wx.chooseImage 失败... ', res);
                        app.alert('调用“微信图片选择功能”失败, 建议刷新页面后重试。')
                            .then(() => {
                                reject(res)
                            })
                    }
                }
            })
        })
    }

    // 高级图片选择
    /*opt = {
        max: 9, //最多可选个数
    }*/
    u.highChooseImage = function(opt = {max: 9}) {
        // 防止在浏览器里使用时, 产生透明遮罩，导致无法使用程序;
        if (base.env !== 'browser') {
            // app.loading.show({bgType:'2',showIcon:false})
            app.loading.show({bgType:'1',showIcon:false})
        }
        return u.chooseImage(opt)
            .then(localIds => {
                return localIds.map(localId => {
                    return u.getLocalImgData(localId)
                        .then(localImgData => {
                            let o = {
                                type: 'image',
                                localId: localId,
                                localImgData: localImgData,
                                serverId: null
                            }

                            o.promise = new Promise(rsv => o.resolve = rsv)

                            return o
                        })
                })
            })
            .then(arr => {
                return Promise.all(arr).then(imgOArr => {
                    app.loading.close()
                    app.sdk.q.produceMsg(imgOArr);
                    return imgOArr
                })
            })
            .catch(error => {
                app.loading.close()
                return Promise.reject(error)
            })
    }

    // 上传图片
    /*opt = {
        isShowProgressTips: 1, // 默认为1，显示进度提示
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    }*/
    u.uploadImage = function (opt) {
        return new Promise((resolve, reject) => {
            wx.uploadImage({
                isShowProgressTips: opt.isShowProgressTips || 0,
                localId: opt.localId.toString(),
                complete: res => {
                    if (res.errMsg === 'uploadImage:ok') {
                        resolve(res.serverId)
                    } else {
                        // app.tool.alert(res);
                        console.warn(`调用 wx.uploadImage 失败... `, res);
                        reject(res)
                    }
                }
            })
        })
    }

    // 上传语音
    /*opt = {
        isShowProgressTips: 1, // 默认为1，显示进度提示
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    }*/
    u.uploadVoice = function (opt) {
        return new Promise((resolve, reject) => {
            wx.uploadVoice({
                isShowProgressTips: opt.isShowProgressTips || 0,
                localId: opt.localId.toString(),
                complete: res => {
                    if (res.errMsg === 'uploadVoice:ok') {
                        resolve(res.serverId)
                    } else {
                        // app.tool.alert(res)
                        console.warn(`调用 wx.uploadVoice 失败... `, res);
                        reject(res)
                    }
                }
            })
        })
    }

    // 适配 wx.getLocalImgData,在'wx'及'dd'环境下提供通用功能 
    // idOrSrc说明： 在dd环境下是上传后的绝对地址
    // 如果传入的不是微信下图片的本地ID,都会resolve出传入地址
    u.getLocalImgData = function(idOrSrc) {
        return new Promise(resolve => {
            // 如果在微信环境并且在 iOS WKWebview内核下；
            if (((base.env==='wx'&&window.__wxjs_is_wkwebview) || (base.env==='wxwork')) && /^wxLocalResource:/.test(idOrSrc)) {
                // 此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。
                wx.getLocalImgData({
                    localId: idOrSrc, // 图片的localID
                    success: function(res) {
                        resolve(res.localData) // localData是图片的base64数据，可以用img标签显示
                    }
                })
            } else {
                resolve(idOrSrc)
            }
        })
    }

    // 开始录音
    u.startRecord = function() {
        return new Promise((resolve, reject) => {
            wx.startRecord({
                complete: res => {
                    if (res.errMsg === 'startRecord:ok') {
                        resolve({
                            status: 'success'
                        })
                    } else {
                        console.warn('调用 wx.startRecord 失败... ', res);
                        app.alert('调用“微信录音功能”失败, 建议刷新页面后重试。')
                            .then(() => {
                                reject(res)
                            })
                    }
                }
            })
        })
    }

    // 停止录音
    u.stopRecord = function() {
        return new Promise((resolve, reject) => {
            wx.stopRecord({
                complete: res => {
                    if (res.errMsg === 'stopRecord:ok') {
                        resolve({
                            status: 'success',
                            localId: res.localId
                        })
                    } else {
                        console.warn('调用 wx.stopRecord 失败... ', res);
                        app.alert('调用“微信停止录音功能”失败, 建议刷新页面后重试。')
                            .then(() => {
                                resolve({
                                    status: 'fail'
                                })
                            })
                    }
                }
            })
        })
    }

    // 监听录音自动停止, 录音时间超过一分钟没有停止的时候会执行 complete 回调
    u.onRecordEnd = function() {
        return new Promise((resolve, reject) => {
            wx.onVoiceRecordEnd({
                complete: res => {
                    resolve({
                        status: 'success',
                        localId: res.localId
                    })
                }
            })
        })
    }

    // 播放语音
    u.playVoice = function(localId) {
        return new Promise((resolve, reject) => {
            wx.playVoice({
                localId: localId,
                complete: res => {
                    if (res.errMsg === 'playVoice:ok') {
                        resolve({
                            status: 'success'
                        })
                    } else {
                        reject({
                            status: 'fail'
                        })
                    }
                }
            })
        })
    }

    // 暂停播放
    u.pauseVoice = function(localId) {
        return new Promise((resolve, reject) => {
            wx.pauseVoice({
                localId: localId,
                complete: res => {
                    if (res.errMsg === 'pauseVoice:ok') {
                        resolve({
                            status: 'success'
                        })
                    } else {
                        reject({
                            status: 'fail'
                        })
                    }
                }
            })
        })
    }

    // 停止播放
    u.stopVoice = function(localId) {
        return new Promise((resolve, reject) => {
            wx.stopVoice({
                localId: localId,
                complete: res => {
                    if (res.errMsg === 'stopVoice:ok') {
                        resolve({
                            status: 'success'
                        })
                    } else {
                        reject({
                            status: 'fail'
                        })
                    }
                }
            })
        })
    }

    // 监听语音播放完毕
    u.onVoicePlayEnd = function() {
        return new Promise((resolve, reject) => {
            wx.onVoicePlayEnd({
                complete: res => {
                    if (res.errMsg === 'onVoicePlayEnd:ok') {
                        resolve({
                            status: 'success',
                            localId: res.localId
                        })
                    } else {
                        reject({
                            status: 'fail'
                        })
                    }
                }
            })
        })
    }

    // 关闭当前窗口
    u.closeWindow = function () {
        wx.closeWindow();
    }

    // 调用微信接口的通用包装
    u.exec = function(active, args) {
        return new Promise((resolve, reject) => {
            try {
                wx[active]({
                    ...args,
                    success: res => {
                        resolve(res);
                    },
                    fail: error => {
                        reject(error)
                    }
                })
            } catch (e) {
                alert(e);
            }
        })
    }
}

wxsdk = u;

export default wxsdk