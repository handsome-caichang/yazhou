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

    // app.tool.alert(`上传队列长度 => ${arr.length}`)

    curitem = arr.shift()
    
    consume(curitem)
        .then(res => {
            return triggerConsume(arr)

        })
        .catch(err => {
            console.error(err);
            app.tool.alert(err)
        })
}

function consume (item) {
    let type = item.type,
        uploadInterface;


    if (type === 'image') {
        uploadInterface = app.sdk.uploadImage
    } else if (type === 'audio') {
        uploadInterface = app.sdk.uploadVoice
    }

    return uploadInterface({
        localId: item.localId
    }).then(serverId => {
        item.serverId = serverId
        item.resolve(serverId)
    })
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