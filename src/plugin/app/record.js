/* 录音功能 */

// rst: 成功开始录音时间,
// dt: 从成功开始录音到准备调用停止录音接口的时间差
// rdt: 从成功开始录音到停止录音的时间差(录制的音频的时长)
let dt, rst, rdt

/*
	event示例：
	{
        start: e => {},
        countdown: (e, s) => {},
        endAuto: (e, id) => {},
        end: (e, id) => {},
        endShort: (e, time) => {}
    }
*/
export default function Record ({config, event}) {
	// 如果当前存在实例，则直接返回当前实例
	if (Record.instance) return Record.instance
	Record.instance = this;
	
	// 继承自定义事件类(伪继承)
	app.Event.call(this)

	// 合并配置
	this.config = Object.assign({}, Record.config, config)
	if (this.config.countdownTime > 60) { 
		this.config.countdownTime = Record.config.countdownTime 
	}

	// 是否正在倒计时
	this.countdowning = false
	// 是否正在录音
	this.recording = false

	// 订阅事件
	for (let name in event) {
		typeof event[name] === "function" && this.on(name, event[name])
	}

	// 开始录音
	this.start()
}

// 默认配置
Record.config = {
	// 微信单条录音不能超过60秒, 此参数决定在倒数第多少秒开始派发倒数计时事件;
	countdownTime: 10
}
// 录音实例, 可以通过该变量判断是否正在录音;
Record.instance = null;
// 倒计时定时器
Record.trigger_countdown_timer = null;
Record.countdown_timer = null;

// validTime: 最短有效录音时长(ms)；
// 备注：语音经过云信处理后,如果时间过短在安卓设备上可能播放不了;
Record.vt = 2000;
// validIntervalTime: 最短有效间隔时长(ms), 录音成功后至调用停止录音的间隔时长;
Record.vit = 600;

// 清除定时器,及恢复一些参数
Record.prototype.reset = function () {
    clearTimeout(Record.trigger_countdown_timer);
	clearTimeout(Record.countdown_timer);
	Record.instance.recording = false;
	// 之所以延时处理，是因为如果在录音停止后马上调用开始录用的话，在IOS设备上会出错;
	setTimeout(() => {Record.instance = null}, 300)
}

Record.prototype.start = function start() {
	// 是否可以录音;
	if (this.rocordPromise) return

	this.rocordPromise = new Promise(resolve => {
		new Promise(resol => {
		    if (app.voice.flag) {
                app.voice.stop()
		            .then(res => {resol("可以开始录音")})
		    } else {
		        resol("可以开始录音")
		    }
		}).then( res => {
			app.sdk.startRecord()
                .then(res => {
		    		rst = new Date().getTime();
			    	if (res.status === 'success') {
			    		this.recording = true;
			    		this.emit('start')
			    		this._enableCountdown()
			    		// 之所以延时处理，是因为如果在开始录音后马上调用停止录用的话，在IOS设备上会出错;
			    		setTimeout(() => {resolve('录音成功')}, 300)
			    	}
				}).catch(res => {
                    // 如果调用录音接口失败，则重置;
                    this.reset();
                })
		})
	})
}

// 接收一个参数，表示是否需要该条录音, 主要用于解决在录音时长不到2秒时是否需要延时停止录音；
Record.prototype.stop =  function (need = true) {
	//  如果没有录音实例(说明没有调用start方法启动录音)，则直接返回;
	if (!this.rocordPromise) return
	// 是否已经调用过stop方法，如果调用过则直接返回;
	if (this._stopExecuted) return
	this._stopExecuted = true
	
	this.rocordPromise.then(res => {
		// 从成功开始录音到准备调用停止录音接口的时间差
		dt = new Date().getTime() - rst;

		if (need && dt > Record.vit && dt < Record.vt) {
			setTimeout(() => {this._stopRecord()}, Record.vt - dt)
		} else {
			this._stopRecord()
		}
	})
}

Record.prototype._stopRecord = function () {
	// IOS设备在某些特定场景下, 无法正常执行'wx.stopRecord'接口(但是会自动停止录音)，因此需要通过此标识来处理;
	// 比如(ipad)上，手指从底部上滑拉出系统功能时，可能手指触碰到了录音按钮，此时会调用录音功能，随后系统功能界面弹出时，系统会自动关闭录音；
	// 导致我们本来要在'wx.stopRecord'触发的事件得不到触发;
	// 在IOS设备中调用wx.stopRecord接口可能比较慢,因此把这个定时器的值设的大一点(2s);
	let stopFlag = false, stoptimer;
	stoptimer = setTimeout(() => {
		if (!stopFlag) {
			this.emit('endShort')
			this.reset()
		}
	}, 2000)

	app.sdk.stopRecord().then(res => {
    	// 从成功开始录音到停止录音的时间差
		rdt = new Date().getTime() - rst;

		if (res.status === 'success') {// success
			if (rdt > Record.vt) {
				this.emit('end', res.localId)
			} else {
				this.emit('endShort', rdt)
			}
		} else { // fail
			this.emit('endShort', rdt)
		}
        this.reset()

        // IOS特殊处理重置
        stopFlag = true
        clearTimeout(stoptimer)
	})
}

Record.prototype._enableCountdown = function () {
	// 监听录音自动停止接口, 录音时间超过一分钟没有停止的时候会执行 complete 回调
    app.sdk.onRecordEnd().then(res => {
        this._stopExecuted = true
    	this.emit('endAuto', res.localId)
    	this.reset()
    })

    // 设置倒计时定时器, 每秒派发一次倒计时事件;
    Record.trigger_countdown_timer = setTimeout(() => {
    	this.countdowning = true
    	let second = this.config.countdownTime
    	this.emit("countdown", second--)
    	Record.countdown_timer = setInterval(() => {
    		second === 0 && clearInterval(Record.countdown_timer)
    		this.emit("countdown", second--)
    	}, 1000)
    }, (60 - this.config.countdownTime)*1000);
}
