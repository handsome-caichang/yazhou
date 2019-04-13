import base from '../../base.js'

let queues = {}, //队列，用来保存需要重发的本地消息
    len = 0, //队列长度
    arr = [],
    consumeing = false, // 是否正在消费队列
    q;

let curitem;

// 获得队列当前长度
function getLength() {
    return len
}

// 把本地消息压入队列
function push(items) {
    items.forEach(item => {
        queues[item.localId] = item;
        arr.push(item)
        len++;
    })
}

// 生产队列
function produceMsg(items) {
    if (!Array.isArray(items)) {
        items = [items]
    }

    push(items)

    if (!consumeing) {
        consumeing = true
        triggerConsume()
    } else { 
        // 为了解决有时候在发送多媒体消息，用户再次调用微信功能选择图片，
        // 造成消息不能正常进行下去的bug;
        let previtem = curitem;
        setTimeout(() => {
            if (previtem === curitem) {
                arr.unshift(previtem)
                triggerConsume()
            }
        }, 10000)
    }
}

// 触发消费
function triggerConsume() {
    if (arr.length === 0) {
       return consumeing = false
    }

    curitem = arr.shift()
    
    consume(curitem)
        .then(res => triggerConsume(arr))
        .catch(err => {
            console.error(err);
            app.tool.alert(err)
        })
}


function consume (item) {
    return uploadFile(item)
        .then(serverId => {
            item.serverId = serverId
            item.resolve(serverId)
        })
}

function wxUploadFile(item) {
    let localId = item.localId,
        type = item.type,
        wxInterface;

    if (type === 'image') {
        wxInterface = 'uploadImage'
    } else if (type === 'audio') {
        wxInterface = 'uploadVoice'
    }

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

function uploadFile(item) {
    if (base.env === 'wx' || base.env === 'wxwork') {
        return wxUploadFile(item)
    } else if (base.env === 'dd') {
        return Promise.resolve(item.localId)
    }
}

function getstatus() {
    return consumeing
}

q = {
    produceMsg,
    consume,
    getLength,
    getstatus,
    arr
}

export default q