import {Event} from 'src/plugin/app/event.js'

export default function BaseClass () {
    
}

BaseClass.prototype.event = new Event();

// 定义统一的发布事件方法
BaseClass.prototype.emitError = function (errInfoObj) {
    this.event.emit("error", errInfoObj)
}

// 应用层可以调用此方法实现对SDK相关错误的订阅, 以达到向服务端记录日志目的。
BaseClass.prototype.onError = function (callback) {
    this.event.on("error", function (e, errInfoObj) {
        // console.log(e, errInfoObj);
        callback(errInfoObj)
    })
}