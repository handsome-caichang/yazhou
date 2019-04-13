// 录音相关的逻辑
// 录音实例
let record;

export const audio = {
	data() {
		return {
            audioBtnText: '',
            tipsText: "",
			recordStatus: false,
			submit: true, // 是否要发送语音 
			promiseVoice: [] // 返回给页面的数组
		}
    },
    beforeMount() {
        if (this.type == 'click') {
            this.audioBtnText = '开始录音';
            this.tipsText = '录音中...'
        } else {
            this.audioBtnText = '按住 说话';
            this.tipsText = '手指上滑，取消发送';
        }
    },
	methods: {
		resetAndSend(type, audioLocalId) {
			this.recordStatus = false
			this.tipsText = this.type === "press" ? "手指上滑，取消发送" : "录音中...";
			this.audioBtnText = this.type === "press" ? "按住 说话" : "开始录音";
            
			// 录音时间太短
            if(!audioLocalId) return;
            
            // 上滑取消
			if(!this.submit) {
                this.close();
				return;
			}
            
            this.close();

			// 本地录音推入promise数组
			let voice = {
                type: 'audio',
				localId: audioLocalId, // 对应后端字段：FilePath
				serverId: '',	// 其实是serverId,为了和后台字段保持一直,方便编辑就命名为ID
				promise: null,
				resolve: null
            }

            voice.promise = new Promise(rsv => voice.resolve = rsv)
			// 返回数据
			this.getVoiceId([voice]);

			// 上传语音
            app.sdk.q.produceMsg([voice]);
		},
		ontouchstart(event) {
			event.preventDefault();
			// 避免多个手指重复触发touchstart的情况
			if (event.targetTouches.length > 1) return

			record = new app.Record({
				event: {
					start: e => {
						this.recordStatus = true
						this.tipsText = "松开 发送"
                        this.audioBtnText = "松开 发送"
					},
					countdown: (e, s) => {
                        this.tipsText = "还可以说" + s + "秒"
					},
					endAuto: (e, id) => {
						// 即使手指不在录音按钮区域，只要是倒计时到期了，也发送该条录音;
						this.submit = true
						this.resetAndSend(e.type, id);
					},
					end: (e, id) => {
						this.resetAndSend(e.type, id)
					},
					endShort: (e, time) => {
						this.submit && app.toast('info', '说话时间太短...')
						this.submit = false
						this.resetAndSend(e.type)
                    }
				}
			});
			this.submit = true;
		},
		ontouchmove(event) {
			event.preventDefault();

			let rect = event.target.getBoundingClientRect(),
				minX = rect.left,
				maxX = rect.right,
				minY = rect.top,
				maxY = rect.bottom,
				x = event.changedTouches[0].clientX,
				y = event.changedTouches[0].clientY,
				// 手指是否在录音按钮区域
				submit = this.submit = minX < x && x < maxX && minY < y && y < maxY;

			// 如果当前不在录音, 则直接返回;
			if (!record.recording) return

			this.audioBtnText = submit ? "松开 发送" : "上滑松开，取消发送"

			// 如果已经开始倒计时, 则直接返回;
			if (record.countdowning) return

            this.tipsText = submit ? "松开 发送" : "上滑松开，取消发送"
            
            console.log('ontouchmove: ', this.tipsText, submit)
		},
		ontouchend(event) {
			event.preventDefault();
			//多个手指重复触发touchstart的情况，最后手指松开才算结束语音
			if (event.targetTouches.length !== 0) return

            // 部分安卓手机在手指离开屏幕时, 不触发"touchend", 而是触发'touchcancel'.
			// if (event.type === "touchcancel") this.submit = false;

            // 上滑取消时submit为false， 否则为true
			record.stop(this.submit)
        },
        click(event) {
            if(!this.recordStatus) {
                record = new app.Record({
                    event: {
                        start: e => {
                            this.recordStatus = true
                            this.tipsText = "录音中..."
                            this.audioBtnText = "结束录音"
                        },
                        countdown: (e, s) => {
                            this.tipsText = "还可以说" + s + "秒"
                            s == 0 && record.stop();
                        },
                        // 录音到期自动停止时，也发送语音
                        endAuto: (e, id) => {
                            this.submit = true
                            this.resetAndSend(e.type, id);
                        },
                        end: (e, id) => {
                            this.resetAndSend(e.type, id)
                        },
                        endShort: (e, time) => {
                            this.submit && app.toast('info', '说话时间太短...')
                            this.submit = false
                            this.resetAndSend(e.type)
                        }
                    }
                });
            } else {

                // 停止语音
                record.stop(this.submit);
            }
            this.submit = true;
        }
    },
    watch: {
        opened(newVal) {
            // 关闭组件时停止语音接口的调用
            !newVal && record && record.stop(this.submit);
        }
    }
}