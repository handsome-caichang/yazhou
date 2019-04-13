import http from '../http/http.js'
import UploadVideoClass from './oss-upload.js'

var oss = {}

let queue = [], 
    // 是否正在消费队列
    uploading = false,
    // 当前正在上传的文件
    curQueItme;

// 生产队列
function uploadFile(options) {
    // 把本地消息压入队列
    var uv = new UploadVideoClass(options)
    queue.push(uv)

    // 判断是否正在消费，如果没有则开始消费;
    if (!uploading) {
        uploading = true;
        upload()
    }
    return uv.cancelID
}

// 消费
function upload () {
    curQueItme = queue.shift()
    curQueItme.doUpload()
    .then(() => {
        queue.length > 0 ? upload() : (uploading = false)
    })
    // TODO: 不兼容，故暂时用then代替; 后继要通过babel找解决办法;
    // .finally(() => {
    //     queue.length > 0 ? upload() : (uploading = false)
    // });
}

// 取消上传并从队列中移除
function cancelUploadFile(cancelID) {
    // 如果要取消的是当前正在上传的文件, 则调用上传实例的取消方法
    if (curQueItme.cancelID === cancelID) {
        curQueItme.cancelUpload()
    } else {
        // 如果要取消的是还未开始上传的文件, 则从队列中直接删除
        queue.forEach((item, index) => {
            if (item.cancelID === cancelID) {
                queue.splice(index, 1)
            }
        })
    }
}

// 获取队列当前状态
function getFileQueue() {
    return { queue, uploading }
}

oss = {
    uploadFile,
    cancelUploadFile,
    getFileQueue
}

export default oss