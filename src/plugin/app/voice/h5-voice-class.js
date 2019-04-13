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
function H5Voice(src, events) {
    this.src = src
    this.events = events
    this.playFlag = false

    // 继承自定义事件类(伪继承)
    app.Event.call(this)

    this.bindEvent()
}

// 订阅事件
H5Voice.prototype.bindEvent = function () {
    let evts = this.events
    for (let name in evts) {
        typeof evts[name] === "function" && this.on(name, evts[name])
    }
}

H5Voice.prototype.play = function () {
    h5Instance = this
    audio.src = this.src
    // 'audio.play()' 不能少，因为在苹果设备上就算设置了'autoplay'还是不会自动播放
    audio.play()
}

H5Voice.prototype.stop = function () {
    return new Promise((resolve, reject) => {
        audio.pause()
        h5Instance.emit("end")
        resolve('stop')
    })
}


let audio = document.createElement('audio'),
    h5Instance = {}

audio.autoplay = true
// audio.controls = true
// audio.style.position = 'absolute'
// audio.style.zIndex = 9999

audio.onloadstart = function() {
    console.info('h5 loading e ')
    h5Instance.playFlag = false
    h5Instance.isLoading = true
    h5Instance.emit("loading")
}
audio.onplaying = function() {
    console.info('h5 play e ')
    h5Instance.playFlag = true
    h5Instance.emit("playing")
}
audio.onended = function() {
    console.info('h5 onended e ')
    h5Instance.playFlag = false
    h5Instance.emit("endAuto")
}
audio.onerror = function() {
    console.info('h5 onerror e ')
    h5Instance.playFlag = false
    h5Instance.emit("error")
}


window.addEventListener('load', function () {
    document.querySelector('body').appendChild(audio)
})


export default H5Voice


