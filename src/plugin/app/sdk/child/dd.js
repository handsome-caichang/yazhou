// 钉钉环境

import base from '../../base.js'
import BaseClass from './baseClass/baseClass.js'

var ddsdk, u = new BaseClass();

if (base.env === 'dd') {

    u.jssdkApiList = [
        'biz.util.previewImage',  //图片预览
        'biz.util.share', // 分享
        'biz.navigation.close', // 关闭当前页面
        'biz.navigation.setRight', // 设置导航栏右侧
        'biz.util.uploadImage', //选择图片+上传
        'device.audio.startRecord', // 开始录音
        'device.audio.stopRecord', // 结束录音
        'device.audio.onRecordEnd', // 监听录音自动停止
        'device.audio.play', // 播放语音 
        'device.audio.pause', // 暂停播放语音 
        'device.audio.stop', // 停止播放语音
        'device.audio.onPlayEnd', // 监听播放自动停止
    ];

    u.wxReadyPromise = new Promise((resolve, reject) => {
        u.event.on("ddconfig", function () {
            dd.ready(function (res) {
                console.log('dd ready ...');
                // alert('dd ready ...');
                resolve({errCode: 200})
            });
            
            dd.error(function(error){
                console.error('钉钉配置失败... ', error);
                // alert('钉钉配置失败... ');
                // alert(error);
                reject({errCode: 400, errMsg: error})
            });
        })
    });

    u.setConfig = function (opts) {
        if (!opts.agentId) return
        let config = {
                agentId: '', // 必填，微应用ID
                corpId: '', //必填，企业ID
                timeStamp: 123546486, // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '', // 必填，签名
                type: 0,   //选填，0表示微应用的jsapi，1表示服务窗的jsapi，不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                jsApiList: u.jssdkApiList
            }
        let opt = Object.assign({}, config, opts)
        dd.config(opt);
        u.event.emit("ddconfig")
        console.log('dd config 成功。。。');
    }

    // 隐藏或显示钉钉右上角菜单
    u.triggerMenu = function (bool = false) {
        dd.biz.navigation.setRight({show: bool})
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
        dd.biz.navigation.setRight({
            show: true,
            control: true,
            onSuccess: function (result) {
                dd.biz.util.share({
                    type: 0, // 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
                    url: opt.link,
                    title: opt.title,
                    content: opt.desc,
                    image: opt.imgUrl
                })
            }
        })
    }

    // 预览图片
    u.previewImage = function (opt = {}) {
        dd.biz.util.previewImage({
            current: opt.current,
            urls: opt.urls
        })
    }

    // 选择图片
    /*opt = {
        max: 9, //最多可选个数
        compression: true,//(是否压缩，默认为true)
        multiple: false, //是否多选，默认false
        quality: 50, // 图片压缩质量, 
        resize: 50, // 图片缩放率
    }*/
    u.chooseImage = function (opt = {max: 9}) {
        return new Promise((resolve, reject) => {
            let {max = 9, compression = true, multiple = true, quality = 50, resize = 50} = opt
            dd.biz.util.uploadImage({
                max: max,
                compression: compression,
                multiple: multiple, 
                quality: quality, 
                resize: resize,
                onSuccess: function(result) {
                    // app.tool.alert(result)
                    resolve(result);
                },
                onFail: function (error) {
                    console.error('调用 dd.biz.util.uploadImage 失败... ', error);
                    // alert('调用 dd.biz.util.uploadImage 失败... ');
                    // app.tool.alert(error);
                    reject(error)
                }
            })
        })
    }

    // 高级图片选择
    u.highChooseImage = function (opt = {max: 9}) {
        return u.chooseImage(opt)
            .then(localIds => {
                return localIds.map(localId => {
                    let o = {
                        type: 'image',
                        localId: localId,
                        localImgData: localId,
                        serverId: localId
                    }

                    o.promise = new Promise(rsv => {
                        o.resolve = rsv
                        rsv(localId)
                    })

                    return o
                })
            })
    }

    // 上传图片
    /*opt = {
        isShowProgressTips: 1, // 默认为1，显示进度提示
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    }*/
    u.uploadImage = function (opt) {
        return Promise.resolve(opt.localId)
    }

    // 上传语音
    /*opt = {
        isShowProgressTips: 1, // 默认为1，显示进度提示
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    }*/
    u.uploadVoice = function (opt) {
        return Promise.resolve(opt.localId)
    }

    u.getLocalImgData = function(idOrSrc) {
        return Promise.resolve(idOrSrc)
    }

    // 开始录音
    u.startRecord = function () {
        return new Promise((resolve, reject) => {
            dd.device.audio.startRecord({
                onSuccess: function() {
                    resolve({ status: 'success' })
                },
                onFail: function (error) {
                    console.error('调用 dd.device.audio.startRecord 失败... ', error);
                    resolve({ status: 'fail'})
                }
            });
        })
    }

    // 停止录音
    u.stopRecord = function () {
        return new Promise((resolve, reject) => {
            dd.device.audio.stopRecord({
                onSuccess: function(res) {
                    resolve({
                        status: 'success',
                        localId: res.mediaId
                    })
                },
                onFail: function (error) {
                    console.error('调用 dd.device.audio.stopRecord 失败... ', error);
                    resolve({ status: 'fail'})
                }
            });
        })
    }

    // 监听录音自动停止, 录音时间超过一分钟没有停止的时候会执行 complete 回调
    u.onRecordEnd = function () {
        return new Promise((resolve, reject) => {
            dd.device.audio.onRecordEnd({
                onSuccess : function(res) {
                    resolve({
                        status: 'success',
                        localId: res.mediaId
                    })
                },
                onFail: function (error) {
                    console.error('调用 dd.device.audio.onRecordEnd 失败... ', error);
                    resolve({ status: 'fail'})
                }
            });
        })
    }

    // 播放语音
    u.playVoice = function (localId) {
        return new Promise((resolve, reject) => {
            dd.device.audio.play({
                localAudioId: localId,
                onSuccess : function(res) {
                    resolve({ status: 'success' })
                },
                onFail: function (error) {
                    console.error('调用 dd.device.audio.play 失败... ', error);
                    resolve({ status: 'fail'})
                }
            })
        })
    }

    // 暂停播放
    u.pauseVoice = function (localId) {
        return new Promise((resolve, reject) => {
            dd.device.audio.pause({
                localAudioId: localId,
                onSuccess : function(res) {
                    resolve({ status: 'success' })
                },
                onFail: function (error) {
                    console.error('调用 dd.device.audio.pause 失败... ', error);
                    resolve({ status: 'fail'})
                }
            })
        })
    }

    // 停止播放
    u.stopVoice = function (localId) {
        return new Promise((resolve, reject) => {
            dd.device.audio.stop({
                localAudioId: localId,
                onSuccess : function(res) {
                    resolve({ status: 'success' })
                },
                onFail: function (error) {
                    console.error('调用 dd.device.audio.stop 失败... ', error);
                    resolve({ status: 'fail'})
                }
            })
        })
    }

    // 监听语音播放完毕
    u.onVoicePlayEnd = function () {
        return new Promise((resolve, reject) => {
            dd.device.audio.onPlayEnd({
                onSuccess : function(res) {
                    resolve({
                        status: 'success',
                        localId: res.localAudioId
                    })
                },
                onFail: function (error) {
                    console.error('调用 dd.device.audio.onPlayEnd 失败... ', error);
                    resolve({ status: 'fail'})
                }
            });
        })
    }

    // 关闭当前窗口
    u.closeWindow = function () {
        dd.biz.navigation.close()
    }
}


ddsdk = u;

export default ddsdk
