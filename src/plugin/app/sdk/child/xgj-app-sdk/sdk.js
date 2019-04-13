/**
 *所有原生直接调H5的方法都封装在 window.__xgj__H5ToNative__callback__ 这个对象下  
 *现在有如下方法：
 *clickBack => 点击返回键时调用
 *voicePlayEnd => 在原生语音播放完毕时调用
 *voiceRecordEnd => 在原生录音自动停止时调用
 */


import base from 'src/plugin/app/base.js'

var xah = window.xah = {};
var cb = {};

window.__xgj__H5ToNative__callback__ = cb;

window.clickBack = cb.clickBack = function clickBack() {
    Vue.event.$emit('appGoBack')
}

Vue.event.$on('appGoBack', function () {
    // app.sdk.goBack()
    xgj.goBack()
})


// 提供给原生调用(在原生语音播放完毕时会调用)
cb.voicePlayEnd = function voicePlayEndHandler(res) {
    // alert('原生调用h5 => 语音播放完毕');
    cb.ovpeHandler && cb.ovpeHandler(res);
}
// 用于监听语音播放完毕, SDK提供给应用层调用
xah.onVoicePlayEnd = function (opt) {
    cb.ovpeHandler = opt.complete
}

// 提供给原生调用(在原生录音自动停止时会调用)
cb.voiceRecordEnd = function voiceRecordEndHandler(res) {
    // alert('原生调用h5 => 录音自动停止');
    cb.vrHandler && cb.vrHandler(res);
}
// 用于监听录音自动停止, SDK提供给应用层调用
xah.onVoiceRecordEnd = function (opt) {
    cb.vrHandler = opt.complete
    // alert('0000');
    // cb.vrHandler = function (res) {
    //     const codeMap = {
    //             '0':'success',
    //             '1':'fail',
    //             '2':'cancel'
    //         }
    //     let fnName = codeMap[res.code + ''];
    //     opt[fnName] && opt[fnName](res.data);
    //     opt.complete && opt.complete(res);
    // }
}




if (base.env === 'xgj') {
    const shareName = '__protocal' + Date.now() + '__';


    let idCount = 0;

    function createID(){
        return Date.now() + '$' + idCount++;
    }



    const send = (function(){
        let pool = {};

        window[shareName] = function exec(id){
            let fn = pool[id];
            //delete pool[id];        //一次性.
            return fn;
        };

        return function (fn){
            let id = createID();
            pool[id] = fn;
            return [`window.${shareName}('${id}')`,()=>delete pool[id]];             //exec(id)(...)
        }
    })();


    const codeMap = {
            '0':'success',
            '1':'fail',
            '2':'cancel',
            '3':'progress'          //查询进度
        }

    function wxApi(appRequest){

        return function(opt){

            let delFn = null;   //回调函数清理

            function callback(res){
                // if (!codeMap[res.code]){
                //     throw new Error('错误状态码:' + res.code);
                // }
                let fnName = codeMap[res.code + ''];
                opt[fnName] && opt[fnName](res.data);
                if (res.code != 3){     //如果是查询进度，不调用complete
                    opt.complete && opt.complete(res);
                    delFn();
                }
            }



            if (opt && typeof opt === "object") {
                [opt.result,delFn] = send(callback);
                window.xgj[appRequest](opt && JSON.stringify(opt))
            } else {
                window.xgj[appRequest]()
            }
        }
    }


    xah.chooseImage = wxApi("chooseImage");
    xah.previewImages = wxApi("previewImages");
    xah.chooseVideo = wxApi("chooseVideo");
    xah.compressorVideo = wxApi("compressorVideo");
    xah.playVideo = wxApi("playVideo");

    xah.startRecord = wxApi("startRecord");
    xah.stopRecord = wxApi("stopRecord");


    xah.playVoice = wxApi("playVoice");
    xah.pauseVoice = wxApi("pauseVoice");
    xah.stopVoice = wxApi("stopVoice");


    xah.uploadImage = wxApi("uploadImage");
    xah.uploadVoice = wxApi("uploadVoice");
    xah.uploadVideo = wxApi("uploadVideo");


    xah.closeWindow = wxApi("closeWindow");
    xah.goBack = wxApi("goBack");
    xah.setAppTitle = wxApi("setAppTitle");


    xah.showOptionMenu = wxApi("showOptionMenu");
    xah.updateAppMessageShareData = wxApi("updateAppMessageShareData");
    xah.updateTimelineShareData = wxApi("updateTimelineShareData");    

    xah.changeUser = wxApi("changeUser");
    xah.loginOut = wxApi("loginOut");
    xah.clearWebCache = wxApi("clearWebCache");
    xah.goMessageCenter = wxApi("goMessageCenter");

    // 原生提供的暴露给H5的跳转到相应原生界面的方法。
    xah.goActivity = wxApi("goActivity");

    // 原生提供的取消压缩的方法
    xah.cancelCompress = wxApi("cancelCompress");
    // 原生提供的取消上传的方法
    xah.cancelUpload = wxApi("cancelUpload");

}


export default xah;
