// 发送视频消息相关的逻辑
export const video = {
    data() {
        return {
        }
    },
    methods: {
        sendVideoMsg(file) {
            app.im.transFile.send({
                file,
                scene: this.scene,
                to: this.to,
                type: 'video'
            })
        }
    }
}