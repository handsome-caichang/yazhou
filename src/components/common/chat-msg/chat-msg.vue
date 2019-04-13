
<style lang="scss" scoped>
    @import "../../../assets/scss/variable.scss";
    @import "../../../assets/scss/mixin.scss";

    .chat-msg {
        padding: 7px 0;
        .wrapper {
            display: flex;
            &.in {
                padding-right: 80px;
                @media all and (min-width:450px) {
                    padding-right: 20%;
                }
            }
            &.out {
                padding-left: 80px;
                flex-direction: row-reverse;
                @media all and (min-width:450px) {
                    padding-left: 20%;
                }
            }
            .avatar {
                width: 40px;
                height: 40px;
                margin: 0 10px;
                border: 1px solid #FFF;
                border-radius: 50%;
                background-color: $color-assist-1;
                background-repeat: no-repeat;
                background-attachment: scroll;
                background-position: center;
                background-size: 100% 100%;
            }
            .content-wrapper {
                flex: 1;
                .scene-team {
                    font-size: 12px;
                    line-height: 18px;
                    color: #999;
                }
            }
        }
    }
</style>

<template>
    <div class="chat-msg">
        <div class="wrapper" :class="{'in': msg.flow === 'in','out': msg.flow === 'out'}">
            
            <!-- 头像 -->
            <div class="avatar" :style="{backgroundImage: `url(${msg.avatar})`}"></div>

            <div class="content-wrapper">
                <!-- 群聊时显示群成员昵称 -->
                <div class="scene-team" v-if="msg.scene === 'team' && msg.flow === 'in'">
                    {{msg.fromNick}}
                </div>
                <component
                    :is="matchComponent"
                    :msg="msg"
                    @msgChangeHeight="$emit('msgChangeHeight')">
                </component>
            </div>

        </div>
    </div>
</template>

<script>
import config from '../../../configs'

import ChatText from './child/chat-text.vue'
import ChatImage from './child/chat-image.vue'
import ChatAudio from './child/chat-audio.vue'
import ChatVideo from './child/chat-video.vue'
import ChatFile from './child/chat-file.vue'
import ChatCustom from './child/chat-custom.vue'

export default {
    name: 'chat-msg',
    props: {
        rawMsg: {
            type: Object
        },
    },
    data() {
        return {
            map: {
                'text': ChatText,
                'image': ChatImage,
                'audio': ChatAudio,
                'video': ChatVideo,
                'file': ChatFile,
                // 自定义消息
                'custom': ChatCustom,
            }
        }
    },
    computed: {
        matchComponent() {
            let type;
            // 如果是本地消息
            if (this.rawMsg.isLocal) {
                // console.log("自定义 local 消息.....");
                // console.log(this.rawMsg);
                type = JSON.parse(this.rawMsg.content).type
            } else {
                if (this.rawMsg.type === 'custom') {
                    let mco = JSON.parse(this.rawMsg.content);
                    if (mco.Type === 2 || mco.Type === 3 || mco.Type === 4 || mco.Type === 5 ) {
                        type = 'custom'
                    }
                } else {
                    type = this.rawMsg.type;
                }
            }

            return this.map[type]
        },
        msg() {
            let msg = {}, 
                rawMsg = this.rawMsg, 
                userInfos = this.$store.state.userInfos;
            if (rawMsg.from !== this.$store.state.userUID) {
                rawMsg.avatar = (userInfos[rawMsg.from] && userInfos[rawMsg.from].avatar) || config.defaultUserIcon
            } else {
                rawMsg.avatar = this.$store.state.myInfo.avatar
            }
            return this.rawMsg;
        }
    },
    methods: {
    },
    created() {
    }
}
</script>
