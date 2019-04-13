// 播放音频模块
// 兼容 Html、微信SDK、钉钉SDK,  只需统一调用本模块方法便可

import SDKVoice from './sdk-voice-class.js'
import H5Voice from './h5-voice-class.js'

// 正则匹配传入的src, 用于区分需要调用微信的功能还是直接用h5来播放等;
// 以'weixin:'开头表示是安卓机下微信中的本地语音
// 以'wxLocalResource:'开头表示是苹果(IOS)机下'微信/企业微信'中的本地语音
// 以'@'开头表示是钉钉中的本地语音
// 包含'WeixinWork'说明是安卓版企业微信环境


// let reg = /(^(weixin:|wxLocalResource:|@))|WeixinWork/,

// 以'xiaogj:'开头表示是"校管家APP"中的本地语音
let reg = /(^(weixin:|wxLocalResource:|@|xiaogj:))|WeixinWork/,
    curIns = null, // 当前实例
    prevIns = null, // 前一个实例
    voice = {}
    
// 播放语音
voice.play = function (idOrSrc, events) {
    prevIns = curIns

    curIns = reg.test(idOrSrc) 
        ? new SDKVoice(idOrSrc, events) 
        : new H5Voice(idOrSrc, events)

    if (prevIns) {
        prevIns.stop().then(res => {
            curIns.play()
        })
    } else {
        curIns.play()
    }
}

// 停止播放语音
voice.stop = function () {
    return curIns && curIns.stop()
}

// 查看当前播放状态的属性, 如果播放中则值为true, 否则为false
// 可在全局通过 app.voice.flag 查看;
Object.defineProperty(voice, 'flag', {
    get: function () {
        return curIns && curIns.playFlag
    }
})

// 在页面退到后台时，停止播放; 在手机上表现为，当点击home键时，停止语音播放;
document.addEventListener('visibilitychange', e => {
    if (document.hidden === true) {
        curIns && curIns.stop()
    }
})

export default voice
