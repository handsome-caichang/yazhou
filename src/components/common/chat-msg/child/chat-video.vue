<style lang="scss" scoped>
    @import "../../../../assets/scss/variable.scss";
    @import "../../../../assets/scss/mixin.scss";
    @import "./mixin.scss";

    .box {
        display: flex;      
        .content {
            position: relative;
            min-height: 40px;
            @include flex-center;
            border-radius: 4px;
            .video-box {
                position: relative;
                border: 1px solid #DDD;
                min-width: 40px;
                min-height: 40px;
                .video-thumb {
                    position: relative;
                    vertical-align: top;
                    max-width: 140px;
                    max-height: 140px;
                    background-repeat: no-repeat;
                    background-attachment: scroll;
                    background-size: cover;
                    background-position: center;
                    .video-control {
                        @include position-absolute;
                        @include flex-center;
                        background-color: rgba(0, 0, 0, .5);
                        .icon {
                            color: #FFF;
                            font-size: 40px;
                        }
                    }
                    .video-dur {
                        @include position-absolute(false, 5px, 5px, false);
                        color: #FFF;
                        font-size: 10px;
                    }
                }
                .send-wrap {
                    background-image: url(./img/video-uploading.png);
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background-attachment: scroll;
                    &.error {
                        width: 100px;
                        height: 100px;
                        background-image: url(./img/video-uploading-error.png);
                    }
                    .send-mask {
                        &.uploading-error {

                        }
                        @include flex-center(column);
                        width: 100px;
                        height: 100px;
                        color: #FFF;
                        background-color: rgba(0, 0, 0, .5);
                        .loading {
                            padding-bottom: 5px;
                            width: 24px;
                            height: 24px;
                        }
                    }
                }
            }
        }
        &.in {
        }
        &.out {
            flex-direction: row-reverse;
        }
        .resend-btn {
            width: 30px;
            flex: 0 0 auto;
            font-size: 18px;
            @include flex-center;
        }
    }
</style>

<template>
    <div class="box" :class="{'in': msg.flow === 'in', 'out': msg.flow === 'out'}">
        <div class="content">
            <div class="video-box" >
                <div class="video-thumb"
                    v-if="!msg.isLocal" 
                    :data-src="msg.file.url"
                    :style="videosty"
                    @touchstart="app.video.setSrc(msg.file.url)"
                    @mousedown="app.video.setSrc(msg.file.url)"
                    @click="app.video.play()"
                    >
                    <div class="video-control">
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-shipinbofang"></use>
                        </svg>
                    </div>
                    <div class="video-dur">{{app.tool.transVideoDur(msg.file.dur)}}</div>
                </div>

                <!-- 发送中... -->
                <div class="send-wrap" :class="{error: msg.status==='fail'}" v-if="msg.isLocal">
                    <div class="send-mask" v-if="msg.status === 'success'">
                        <img class="loading" :src="sendingIcon">
                        <div class="progress">{{JSON.parse(msg.custom).progress}}</div>
                    </div>
                </div>
            </div>
            
            <!-- 撤消消息按钮 -->
            <delete-msg-btn :msg="msg"></delete-msg-btn>
        </div>
        <!-- 发送失败，提供重发按钮 -->
        <div class="resend-btn" 
            v-if="msg.isLocal && msg.status === 'fail'"  
            @click="app.im.transFile.resend(msg.idClient)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fasongshibai"></use>
            </svg>
        </div>
    </div>
</template>

<script>

import DeleteMsgBtn from './delete-msg-btn.vue'

import sendingIcon from './icon/loading-spinning-bubbles.svg'

export default {
    name: 'chat-video',
    props: {
        msg: {
            type: Object
        }
    },
    data() {
        return {
            maxWH: 140,
            videosrc: '',
            sendingIcon: sendingIcon
        }
    },
    computed: {
        videosty() {
            // 根据视频消息对象中的宽、高来计算应该显示的宽高
            if (!this.msg.isLocal) {
                let file = this.msg.file,
                    w = file.w,
                    h = file.h,
                    thumb = file._thumb,
                    max = this.maxWH,
                    rate = Math.min(max/w, max/h, 1),
                    sty = {width: `${rate*w}px`, height: `${rate*h}px`, backgroundImage: `url(${thumb})`}
                return sty
            }
        }
    },
    methods: {
    },
    created() {
    },
    components: {
        DeleteMsgBtn
    },
}
</script>
