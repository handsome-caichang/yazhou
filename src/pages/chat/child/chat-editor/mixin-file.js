// 发送文件消息相关的逻辑
export const file = {
    data() {
        return {
        }
    },
    methods: {
        sendFileMsg(file) {
            app.im.transFile.send({
                file,
                scene: this.scene,
                to: this.to,
                type: 'file'
            })
        }
    }
}