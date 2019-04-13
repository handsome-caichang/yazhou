import store from 'src/store'
import {getUploadToken} from 'src/api/jie.js'

var vq = {}

// 发送本地视频消息
export function send({file, scene, to, type = 'video'}) {
    var content = {type: type}
    if (type === 'file') {
        content = {
            type: type,
            file: {
                name: file.name,
                size: file.size,
                url: ""
            }
        }
    }

    store.dispatch('sendLocalCustomMsg', {
        isLocal: true,
        type: "custom",
        scene: scene,
        to: to,
        content: JSON.stringify(content),
        custom: JSON.stringify({progress: '0%'}),
    }).then(msg => {
        vq[msg.idClient] = {file, msg, scene, to, type}
        sendFile({file, msg, type})
    })
}

// 发送失败后重发本地视频消息
export function resend(id) {
    var item = vq[id],
        msg = item.msg,
        type = item.type,
        file = item.file;
    msg.status = 'success'
    sendFile({file, msg, type})
}

// 上传视频
function sendFile({file, msg, type}){
    // 获取应用服务器token
    getUploadToken().then(res => {
        console.log(res);
        var token = res.Data
        app.oss.uploadFile({
            stsServer: token.fileServerUrl,
            token: {
                appid: token.appid,
                nonceStr: token.nonceStr,
                signature: token.signature,
                timestamp: token.timestamp
            },
            file: file,
            type: type,
            progress: p => {
                msg.custom = JSON.stringify({progress: p.percent})
            },
            success: res => {
                uploadSuccess({msg, res, type})
            },
            fail: error => {
                console.error(error);
                uploadFail({msg, error})
            }
        })
    })    
}

// 重发视频消息
function uploadSuccess({msg, res, type}) {
    let id = msg.idClient
        msg.type = type
        msg.isLocal = false;
        msg.status = 'fail';
        msg.custom = JSON.stringify({_thumb: res.thumbUrl})

    msg.file = {
        name: res.name,
        size: res.size,
        md5: res.md5,
        url: res.url,
        ext: res.ext
    }

    if (type === 'video') {
        Object.assign(msg.file, {
            dur: res.dur,
            w: res.w,
            h: res.h,
            _thumb: res.thumbUrl
        })
    }   

    store.dispatch('resendMsg', msg)
        .then(msg => {
            delete vq[id]
        })
}

// 上传失败的处理
function uploadFail({msg, error}) {
    msg.status = 'fail'
    msg.custom = JSON.stringify({progress: '0%'})
    if (error.code === 600) {
        app.alert(error.msg).then(() => {
            store.commit('updateCurrSessionMsgs', {
                type: 'delete',
                msg: msg
            })
        })
    } else {
        app.toast('error', '上传视频失败,请重试。')
    }
}

export default {
    send,
    resend
}