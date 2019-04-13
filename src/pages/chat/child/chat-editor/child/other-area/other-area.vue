<style lang="scss" scoped>
    @import "src/assets/scss/variable.scss";
    @import "src/assets/scss/mixin.scss";
    
    .other-wrap {
        position: relative;
        width: 100%;
        height: 200px;
        .video-box {
            display: inline-block;
        }
        .btn-box {
            display: inline-block;
            text-align: center;
            padding: 20px 14px;
            .block {
                width: 60px;
                height: 60px;
                position: relative;
                border: 1px solid #E5E5E5;
                border-radius: 4px;
                .icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 30px;
                    height: 30px;
                    margin-top: -15px;
                    margin-left: -15px;
                }
            }
            .text {
                line-height: 24px;
                font-size: 12px;
                color: #666;
            }
        }
    }
</style>

<template>
    <div class="other-wrap" v-show="opened">
        <!-- 选择并发送图片按钮 -->
        <div class="btn-box">
            <div class="block">
                <svg class="icon" aria-hidden="true" @click="emitSendImgMsg">
                    <use xlink:href="#icon-zhaopian"></use>
                </svg>
            </div>
            <span class="text">照片</span>
        </div>
        
        <!-- 选择视频 -->
        <file-btn class="video-box" 
            :type='"video"'
            @click.native="closeArea"
            @change="emitSelectVideo">
            <div class="btn-box">
                <div class="block">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                </div>
                <span class="text">视频</span>
            </div>
        </file-btn>

        <!-- 选择文件 -->
        <file-btn class="video-box" 
            :type='"file"'
            @click.native="closeArea"
            @change="emitSelectFile">
            <div class="btn-box">
                <div class="block">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wendang"></use>
                    </svg>
                </div>
                <span class="text">文件</span>
            </div>
        </file-btn>
    </div>
</template>

<script>
    export default {
        name: 'other-area',
        props: {
            opened: {
                type: Boolean
            }
        },
        data() {
            return {
            }
        },
        methods: {
            closeArea() {
                this.$emit('update:opened', false)
            },
            emitSendImgMsg() {
                this.closeArea()
                this.$emit("selectAndSendImgEvent")
            },
            emitSelectVideo(videoFile) {
                this.$emit("selectAndSendVideoEvent", videoFile)
            },
            emitSelectFile(file) {
                this.$emit("selectAndSendFileEvent", file)
            }
        }
    }
</script>

