// 发送语音消息相关的逻辑

// 录音实例
let record

export const audio = {
    data() {
        return {
            audioBtnText: '按住 说话',
            recordStatus: false,
            tipsText: "手指上滑，取消发送",
            submit: true, // 是否要发送语音
        }
    },
    methods: {
        ...Vuex.mapMutations(['set_record']),
        // 发送自定义的本地消息;
        sendLocalAudioMsg(localId) {
            this.$store.dispatch('sendLocalCustomMsg', {
                isLocal: true,
                type: "custom",
                scene: this.scene,
                to: this.to,
                content: JSON.stringify({
                    localId: localId,
                    type: 'audio',
                })
            })
            .then(msg => {
                app.sdk.qim.produceMsg(msg);
            })
        },
        resetAndSend(type, audioLocalId) {
            this.recordStatus = false
            this.tipsText = "手指上滑，取消发送"
            this.audioBtnText = "按住 说话"

            this.submit && audioLocalId && this.sendLocalAudioMsg(audioLocalId)
        },
        ontouchstart(event) {
            event.preventDefault();
            // 避免多个手指重复触发touchstart的情况
            if (event.targetTouches.length > 1) return

            record = new app.Record({
                event: {
                    start: e => {
                        this.recordStatus = true
                        this.tipsText = "手指上滑，取消发送"
                        this.audioBtnText = "松开 结束"                      
                    },
                    countdown: (e, s) => {
                        this.tipsText = "还可以说" + s + "秒"
                    },
                    endAuto: (e, id) => {
                        // 即使手指不在录音按钮区域，只要是倒计时到期了，也发送该条录音;
                        this.submit = true
                        this.resetAndSend(e.type, id)
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

            this.audioBtnText = submit ? "松开 结束" : "松开手指， 取消发送"
                
            // 如果已经开始倒计时, 则直接返回;
            if (record.countdowning) return

            this.tipsText = submit ? "手指上滑，取消发送" : "松开手指，取消发送"
        },
        ontouchend(event) {
            event.preventDefault();
            //多个手指重复触发touchstart的情况，最后手指松开才算结束语音
            if (event.targetTouches.length !== 0) return

            // 部分安卓手机在手指离开屏幕时, 不触发"touchend", 而是触发'touchcancel'.
            // if (event.type === "touchcancel") this.submit = false;

            record.stop(this.submit)
        },
    },
    // 在销毁前关闭录音状态提示框;
    beforeDestroy() {
        this.set_record({status: false})
    },
    watch: {
        recordStatus() {
            this.set_record({status: this.recordStatus})
        },
        submit() {
            this.set_record({valid: this.submit})
        },
        tipsText() {
            this.set_record({tipText: this.tipsText})
        }
    }
}