import store from 'src/store'
import {sendimage, sendaudio} from 'src/api/jie.js'

let queues = {}, //队列，用来保存需要重发的本地消息
    len = 0, //队列长度
    msgArr = [],
    consumeing = false, // 是否正在消费队列
    qim;

let curmsg;

// 获得队列当前长度
function getLength() {
    return len
}

// 随机一个进度
function randomProgress(base) {
    let randomNum = base + Math.floor(Math.random()*20)
    return JSON.stringify({progress: randomNum + '%'})
}

// 把本地消息压入队列
function push(msgs) {
    msgs.forEach(msg => {
        queues[msg.idClient] = msg;
        msgArr.push(msg)
        len++;
    })
}

// 生产队列
function produceMsg(msgs) {
    if (!Array.isArray(msgs)) {
        msgs = [msgs]
    }

    push(msgs)

    if (!consumeing) {
        consumeing = true
        triggerConsume()
    } else { 
        // 为了解决有时候在发送多媒体消息，用户再次调用微信功能选择图片，
        // 造成消息不能正常进行下去的bug;
        let prevmsg = curmsg;
        setTimeout(() => {
            if (prevmsg === curmsg) {
                msgArr.unshift(prevmsg)
                triggerConsume()
            }
        }, 10000)
    }
}

// 触发消费
function triggerConsume() {
    if (msgArr.length === 0) {
       return consumeing = false
    }

    curmsg = msgArr.shift()
    
    consume(curmsg)
        .then(res => triggerConsume(msgArr))
        .catch(err => {
            console.error(err);
            app.tool.alert(err)
        })
}


function wxUploadFile(msg) {
    let content = JSON.parse(msg.content),
        localId = content.localId,
        type = content.type,
        wxInterface;

    if (type === 'image') {
        wxInterface = 'uploadImage'
    } else if (type === 'audio') {
        wxInterface = 'uploadVoice'
    }

    // 目的在于手动重发时先取消消息的失败状态,以适应UI交互上的需要
    msg.status = 'success';

    return new Promise((resolve, reject) => {
        // 将图片、语音文件上传到微信服务器,会得到该文件在微信服务器对应的serverId
        wx[wxInterface]({
            isShowProgressTips: 0,
            // localId: localId,
            localId: localId.toString(),
            success: res => {
                resolve(res.serverId)
            },
            fail: error => {
                console.error(`调用 wx.${wxInterface} 失败... `, error);
                reject(error)
            },
            cancel: result => {
                reject(result)
            },
            complete: res => {
                // if (res.errMsg !== 'uploadImage:ok') {
                    // app.tool.alert(res);
                // }
            }
        })
    })
}

function uploadFile(msg) {
    if (app.env === 'wx') {
        return wxUploadFile(msg)
    } else if (app.env === 'dd') {
        let content = JSON.parse(msg.content),
            localId = content.localId;

        return Promise.resolve(localId)
    }
}

// 发送单条消息的流程，此流程的完成仅仅表示通知后台服务器去微信服务器去文件成功了,
function consume (msg) {
    let content = JSON.parse(msg.content),
        type = content.type,
        backstageAPI;

    if (type === 'image') {
        backstageAPI = sendimage
    } else if (type === 'audio') {
        backstageAPI = sendaudio
    }

    return uploadFile(msg)
        .then(serverId => {
            msg.custom = randomProgress(5)
            // 通知后台服务器去微信/钉钉服务器下载文件; 后台会立即返回成功；
            // 待后台真正从微信服务器下载完成图片, 并且上传到云信后, 会通知云信发送一个自定义系统通知过来;
            return backstageAPI({
                MediaID: (app.env === 'wx' || type === 'audio' ? serverId : '' ),
                FromAccID: msg.from,
                ToAccID: msg.to,
                ClientID: msg.idClient,
                Msgtype: (msg.scene === 'p2p' ? 0 : 1),
                ClientType: (app.env === 'wx' ? 0 : 1),
                MediaURL: (app.env === 'dd' && type === 'image' ? serverId : '' )
            })
        })
        .then(res => {
            if (res.ErrorCode === 200) { // 通知后台成功
                msg.custom = randomProgress(45)
                return res
            } else {
                throw res
            }
        })
}

// 完成最终消费;
// 接收一个自定义系统通知, 根据通知内容去重发相应的文件消息; 
function achieveConsume(sysMsgContent) {
    let o = sysMsgContent,
        id = o.IDClient,
        msg = queues[id];

    if (msg) {
        let type = JSON.parse(msg.content).type;

        msg.custom = JSON.stringify({progress: '99%', OriginalURL: sysMsgContent.OriginalURL})

        msg.type = type;
        msg.isLocal = false;
        msg.status = 'fail';

        if (type === 'image') {
            msg.file = {
                name: o.Name,
                size: o.Size,
                md5: o.MD5,
                url: o.URL,
                ext: o.Ext,
                w: o.Weight,
                h: o.Height
            };
        } else if (type === 'audio') {
            msg.file = {
                name: o.Name,
                size: o.Size,
                md5: o.MD5,
                url: o.URL,
                ext: o.Ext,
                dur: o.Duration
            };
        }

        store.dispatch('resendMsg', msg)
            .then(msg => {
                delete queues[id]
                len--
            })
    }
}

function getstatus() {
    return consumeing
}

qim = {
    produceMsg,
    consume,
    achieveConsume,
    getLength,
    getstatus,
    msgArr
}

export default qim