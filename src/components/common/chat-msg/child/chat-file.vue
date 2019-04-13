<style lang="scss" scoped>
    @import "../../../../assets/scss/variable.scss";
    @import "../../../../assets/scss/mixin.scss";
    @import "./mixin.scss";

    .box {
        display: flex; 

        .content-wrap {
            position: relative;
            .file-icon {
                position: absolute;
                top: 10px;
                font-size: 50px;
                z-index: -1;
            }
            .send-wrap {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                color: #FFF;
                background-color: rgba(0, 0, 0, .5);
                z-index: 10;
                @include flex-center(column);
                .loading {
                    padding-bottom: 5px;
                    width: 24px;
                    height: 24px;
                }
            }
        } 
        .content {
            display: block;
            position: relative;
            height: 70px;
            padding: 10px;
            min-width: 160px;
            border-radius: 4px;
            background-color: #FFF;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            z-index: 1;
            .file-name {
                color: #333;
                font-size: 14px;
                line-height: 17px;
                @include ellipsis-multi(2);
            }
            .file-size {
                color: #999;
                font-size: 12px;
            }
        }
        &.in {
            .content {
                padding-right: 70px;
                @include triangle-left(#FFF);
            }
            .file-icon {
                right: 10px;
            }
        }
        &.out {
            flex-direction: row-reverse;
            .content {
                color: #FFF;
                padding-left: 70px;
                @include triangle-right(#FFF);
            }
            .file-icon {
                left: 10px;
            }
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
        <div class="content-wrap">
            
            <a class="content" :href="fileinfo.url" target="_blank">
                <div class="file-name">{{fileinfo.name}}</div>
                <div class="file-size">{{app.tool.formatFileSize(fileinfo.size)}}</div>
                <svg class="icon file-icon" aria-hidden="true">
                    <use xlink:href="#icon-fasongwenjian"></use>
                </svg>
            </a>
            
            <!-- 发送中... -->
            <div class="send-wrap" v-if="msg.isLocal">
                <img class="loading" :src="sendingIcon">
                <div class="progress">{{JSON.parse(msg.custom).progress}}</div>
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
        fileinfo() {
            if (this.msg.isLocal) {
                console.log(this.msg);
                return JSON.parse(this.msg.content).file
            } else {
                return this.msg.file
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
