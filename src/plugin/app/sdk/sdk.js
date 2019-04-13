import base from '../base.js'
import wxsdk from './child/wx.js'
import wxworksdk from './child/wxwork.js'
import ddsdk from './child/dd.js'
import xgjsdk from './child/xgj.js'
import apicloudSDK from './child/apicloud.js'

import q from './queue/queue.js'

var sdk = {},
    sdkmap = {
        wx: wxsdk,
        wxwork: wxworksdk,
        dd: ddsdk,
        xgj: xgjsdk,
        apicloud: apicloudSDK,
        browser: wxsdk
    }

sdk = sdkmap[base.env]

sdk.q = q

export default {sdk, sdkmap}


/*******************************************************************/
                /***** 各api调用说明 *****/
/*******************************************************************/

/*apilist = [
    'setConfig',
    'triggerMenu',
    'previewImage',
    'closeWindow',
    'share',
    'chooseImage',
    'highChooseImage',
    'getLocalImgData',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd'
]*/

/* setConfig  sdk权限验证配置 */ 
    // 参照各sdk传入参数

/* triggerMenu   隐藏或显示右上角功能按钮 */
    // 接收一个布尔值 ture: 显示  false： 隐藏


/* previewImage 预览图片 */
    // {
    //     current: '当前要预览的图片地址(绝对地址, 需要带协议)',
    //     urls: '要预览的图片地址的数组'
    // }


/* share 设置分享, 调用此方法会自动开启右上角相关功能 */
    // opt = {
    //     title: '', // 分享标题
    //     desc: '', // 分享描述
    //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     imgUrl: '', // 分享图标
    //     type: '', // 分享类型,music、video或link，不填默认为link
    //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    // }


/* chooseImage 选择图片 */
/* highChooseImage 高级图片选择 */
    // 微信下只需传{max: 9}, 或不传默认9张,
    // opt = {
    //     max: 9, //最多可选个数, 默认9张
    //     compression: true,//(是否压缩，默认为true)
    //     multiple: false, //是否多选，默认false
    //     quality: 50, // 图片压缩质量, 
    //     resize: 50, // 图片缩放率
    // }


/* getLocalImgData */
    // 适配 wx.getLocalImgData,在'wx'及'dd'环境下提供通用功能 
    // idOrSrc说明： 在dd环境下是上传后的绝对地址
    // 如果传入的不是微信下图片的本地ID,都会resolve出传入地址


/* playVoice 播放本地语音 */
/* pauseVoice 暂停本地语音播放 */
/* stopVoice 停止本地语音播放 */
    // localId: '' // 音频的本地ID


/* onVoicePlayEnd 监听语音播放完毕 */



/* 以下api调用无需传参 */
    /* closeWindow 关闭各环境的webview窗口 */
    /* startRecord 开始录音 */
    /* stopRecord 停止录音 */
    /* onRecordEnd 监听录音自动停止 */




