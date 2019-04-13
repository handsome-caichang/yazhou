// 发送图片消息相关的逻辑
export const image = {
    methods: {
        // 选择图片并发送
        sendImgMsg() {
            app.sdk.chooseImage()
                .then(imgs => {
                    // 发送本地图片消息，并返回本地图片消息的promise数组
                    return imgs.map(imgsrc => this.sendLocalImgMsg(imgsrc))
                })
                .then(msgsPromise => {
                    Promise.all(msgsPromise).then(msgs => {
                        app.sdk.qim.produceMsg(msgs);
                    })
                })
        },
        // 发送自定义的本地消息, 返回一个promise实例;
        sendLocalImgMsg(localId) {
            return this.$store.dispatch('sendLocalCustomMsg', {
                isLocal: true,
                type: "custom",
                scene: this.scene,
                to: this.to,
                content: JSON.stringify({
                    localId: localId,
                    type: 'image',
                }),
                custom: JSON.stringify({progress: '0%'})
            })
        }
    },
    created() {
    },
    mounted() {
    }
}