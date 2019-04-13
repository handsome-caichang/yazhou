/*
    events示例：
    {
        loading: () => {},
        playing: () => {},
        end: () => {},
        endAuto: (res) => {},
        error: () => {}
    }
*/
function SDKVoice(id, events) {
    this.audioId = id
    this.events = events
    this.playFlag = false

    // 继承自定义事件类(伪继承)
    app.Event.call(this)

    this.bindEvent()
}

// 订阅事件
SDKVoice.prototype.bindEvent = function () {
    let evts = this.events
    for (let name in evts) {
        typeof evts[name] === "function" && this.on(name, evts[name])
    }
}

// 解绑事件
SDKVoice.prototype.unbindEvent = function () {
    for (let name in evts) {
        this.off(name)
    }
}

SDKVoice.prototype.play = function () {
    app.sdk.playVoice(this.audioId)
        .then(res => {
            this.playFlag = true
            this.emit('playing')
        })

    // 监听语音播放完毕
    app.sdk.onVoicePlayEnd()
        .then(res => {
            this.playFlag = false
            this.emit("endAuto", res)
        })
}

SDKVoice.prototype.stop = function () {
    if (this.playFlag) {
        return app.sdk.stopVoice(this.audioId)
            .then(res => {
                this.playFlag = false
                this.emit("end")
                return 'stop'
            })
    } else {
        return Promise.resolve('stop')
    }
}

export default SDKVoice
