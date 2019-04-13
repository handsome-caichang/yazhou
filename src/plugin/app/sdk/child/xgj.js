// 校管家APP环境

import xah from './xgj-app-sdk/sdk.js'

import base from '../../base.js'
import BaseClass from './baseClass/baseClass.js'

var xgjsdk, u = new BaseClass();

if (base.env === 'xgj') {


    // 通过config接口注入权限验证配置
    u.setConfig = function(opts) {
    }

    // 通过微信菜单分享
    u.onWXMenuShare = function(opt) {
        /*opt = {
                title: '', // 分享标题
                desc: '', // 分享描述
                link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function () { 
                    // 用户确认分享后执行的回调函数
                }
            }*/


        // 分享给朋友
        xah.updateAppMessageShareData(opt);
        // 分享到朋友圈
        xah.updateTimelineShareData(opt);
    }


    // 隐藏或显示右上角菜单
    u.triggerMenu = function (bool = false) {
        xah.showOptionMenu({
            show: bool
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
        xah.previewImages({
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
            xah.chooseImage({
                count: opt.max || 9,
                complete: res => {
                    if (res.code === 0) {
                        let localIds = res.data.map(item => {
                            return item.localId
                        })
                        resolve(localIds);
                    } else if (res.code === 2) {
                        resolve([]);
                    } else {
                        console.warn('调用 xgj.chooseImage 失败... ', res);
                        app.alert('调用“图片选择功能”失败, 建议刷新页面后重试。')
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
                    let o = {
                        type: 'image',
                        localId: localId,
                        localImgData: localId,
                        serverId: null
                    }

                    o.promise = new Promise(rsv => o.resolve = rsv)

                    return o

                    /*return u.getLocalImgData(localId)
                        .then(localImgData => {
                            let o = {
                                type: 'image',
                                localId: localId,
                                localImgData: localImgData,
                                serverId: null
                            }

                            o.promise = new Promise(rsv => o.resolve = rsv)

                            return o
                        })*/
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


    // 选择视频
    u.chooseVideo = function() {
        return new Promise((resolve, reject) => {
            xah.chooseVideo({
                complete: res => {
                    if (res.code === 0) {
                        resolve(res.data);
                    } else if (res.code === 2) {
                        resolve([]);
                    } else {
                        console.warn('调用 xgj.chooseVideo 失败... ', res);
                        app.alert('调用“选择视频功能”失败, 建议刷新页面后重试。')
                            .then(() => {
                                reject(res)
                            })
                    }
                }
            })
        })
    }

    // 压缩视频
    u.compressorVideo = function(opt = {}) {
        return new Promise((resolve, reject) => {
            xah.compressorVideo({
                path: opt.path,
                quality: opt.quality,
                complete: res => {
                    if (res.code === 0) {
                        resolve(res.data);
                    } else {
                        console.warn('调用 xgj.compressorVideo 失败... ', res);
                        app.alert('调用“压缩视频功能”失败, 建议刷新页面后重试。')
                            .then(() => {
                                reject(res)
                            })
                    }
                },
                progress:opt.progress
            })
        })
    }

    // 播放视频
    u.playVideo = function(opt = {}) {
        if (opt.url.indexOf("//") === 0) {
            opt.url = 'https:' + opt.url;
        }
        return new Promise((resolve, reject) => {
            xah.playVideo({
                url: opt.url,
                complete: res => {
                    if (res.code === 0) {
                        resolve(res);
                    } else {
                        console.warn('调用 xgj.playVideo 失败... ', res);
                        app.alert('调用“播放视频功能”失败, 建议刷新页面后重试。')
                            .then(() => {
                                reject(res)
                            })
                    }
                }
            })
        })
    }



    // 开始录音
    u.startRecord = function(opt = {}) {
        return new Promise((resolve, reject) => {
            xah.startRecord({
                maxTime: opt.maxTime || 60,
                complete: res => {
                    if (res.code === 0) {
                        resolve({
                            status: 'success'
                        })
                    } else {
                        console.warn('调用 xgj.startRecord 失败... ', res);
                        app.alert('调用“录音功能”失败, 建议刷新页面后重试。')
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
            xah.stopRecord({
                complete: res => {
                    if (res.code === 0) {
                        resolve({
                            status: 'success',
                            localId: res.data
                        })
                    } else {
                        console.warn('调用 xgj.stopRecord 失败... ', res);
                        app.alert('调用“停止录音功能”失败, 建议刷新页面后重试。')
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
            xah.onVoiceRecordEnd({
                complete: res => {
                    resolve({
                        status: 'success',
                        localId: res.data
                    })
                }
            })
        })
    }


    // 播放语音
    u.playVoice = function(localId) {
        return new Promise((resolve, reject) => {
            xah.playVoice({
                url: localId,
                complete: res => {
                    if (res.code === 0) {
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
            xah.pauseVoice({
                url: localId,
                complete: res => {
                    if (res.code === 0) {
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
            xah.stopVoice({
                url: localId,
                complete: res => {
                    if (res.code === 0) {
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
            xah.onVoicePlayEnd({
                complete: res => {
                    if (res.code === 0) {
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


    // 上传图片
    /*opt = {
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    }*/
    u.uploadImage = function (opt = {}) {
        return new Promise((resolve, reject) => {
            xah.uploadImage({
                localId: opt.localId,
                complete: res => {
                    if (res.code === 0) {
                        Object.assign(res.data,{type:'image'});
                        res.data.Suffix.indexOf('.') != 0 &&  (res.data.Suffix = '.' + res.data.Suffix);
                        delete res.data.ID;
                        resolve(res.data)
                    } else {
                        console.warn(`调用 wx.uploadImage 失败... `, res);
                        reject(res)
                    }
                }
            })
        })
    }


    // 上传语音
    /*opt = {
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    }*/
    u.uploadVoice = function (opt = {}) {
        return new Promise((resolve, reject) => {
            xah.uploadVoice({
                localId: opt.localId,
                complete: res => {
                    if (res.code === 0) {
                        Object.assign(res.data,{type:'voice'});
                        res.data.Suffix.indexOf('.') != 0 &&  (res.data.Suffix = '.' + res.data.Suffix);
                        delete res.data.ID;
                        resolve(res.data)
                    } else {
                        console.warn(`调用 wx.uploadVoice 失败... `, res);
                        reject(res)
                    }
                }
            })
        })
    }

    // 上传视频
    /*opt = {
        localId: '', // 需要上传的视频的本地ID，由chooseImage接口获得
    }*/
    u.uploadVideo = function (opt = {}) {
        return new Promise((resolve, reject) => {
            xah.uploadVideo({
                localId: opt.localId,
                complete: res => {
                    if (res.code === 0) {
                        Object.assign(res.data,{type:'video'});
                        res.data.Suffix.indexOf('.') != 0 &&  (res.data.Suffix = '.' + res.data.Suffix);
                        delete res.data.ID;
                        resolve(res.data)
                    } else {
                        console.warn(`调用 wx.uploadVoice 失败... `, res);
                        reject(res)
                    }
                },
                progress:opt.progress
            })
        })
    }




    // 关闭当前窗口
    u.closeWindow = function () {
        xah.closeWindow();
    }

    // 网页回退
    u.goBack = function () {
        xah.goBack();
    }

    // 修改标题
    u.setTitle = function (titleStr) {
        xah.setAppTitle({
            title: titleStr
        });
    }

    u.changeUser = function(){
        xah.changeUser();
    }

    u.loginOut = function(){
        xah.loginOut();        
    }

    u.clearWebCache = function(){
        xah.clearWebCache();
    }
    
    u.goMessageCenter = function(){
        xah.goMessageCenter();
    }

    // 通知原生跳转页面
    u.goActivity = function (opt ={}) {
        xah.goActivity({
            type: opt.type,
            params: opt.params,
            complete: res => {
                if (res.code === 0) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }
        })
    }


    // 通知取消压缩
    u.cancelCompress = function (opt ={}) {
        // alert(JSON.stringify(opt));
        xah.cancelCompress({
            path: opt.path,
            params: opt.params,
            complete: res => {
                if (res.code === 0) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }
        })
    }

    // 通知原生取消上传
    u.cancelUpload = function (opt ={}) {
        // alert(JSON.stringify(opt));
        xah.cancelUpload({
            path: opt.path,
            params: opt.params,
            complete: res => {
                if (res.code === 0) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }
        })
    }
}

xgjsdk = u;

export default xgjsdk