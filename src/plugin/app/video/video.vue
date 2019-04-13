<!-- 全局视频播放组件 -->
<style lang="scss" scoped>
    @import 'src/plugin/scss/mixin.scss';
    @import 'src/plugin/scss/variable.scss';

    .full-video-page {
        position: absolute;
        width: 0;
        overflow: hidden;
        opacity: 0;
        z-index: -1;
        &.show {
            width: 100%;
            height: 100%;
            opacity: 1;
            z-index: 99;
        }
        .full-video {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.8);
        }
        .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .5);
            z-index: 1;
            @include flex-center(column);
            .loading {
                width: 30px;
                height: 30px;
            }
            .loading-text {
                padding-top: 10px;
                font-size: 12px;
                color: #FFF;
            }
        }
        .close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 10px;
            color: #FFF;
            z-index: 2;
            .close-img {
                width: 20px;
                height: 20px;
            }
        }
    }
</style>

<template>
    <div class="full-video-page" :class="{'show': opened}">
            <!-- controlslist="nodownload" -->
        <video class="full-video"
            controls="true"
            ref="fullVideo"
            :src="src"
            @touchstart="setFlag"
            @mousemove="setFlag"
            @click="trigger"
            >
        </video>
        <div class="mask" v-show="showMasked">
            <img class="loading" src="./img/loading.gif">
            <div class="loading-text">加载中...</div>
        </div>
        <div class="close-btn" @click="hide">
            <img class="close-img"src="./img/close.svg">
        </div>
    </div>
</template>

<script>
    import {popupWindowRouteMixin} from 'src/plugin/app/mixin/mixin.js';

    export default {
        name: 'full-video',
        mixins: [popupWindowRouteMixin],
        data () {
            return {
                flag: false,
                showMask: true,
                vDom: null,
                src: "",
                opened: false
            }
        },
        computed: {
            showMasked() {
                return this.showMask
            }
        },
        methods: {
            addEventListener() {
                this.vDom.addEventListener('play', e => {
                    this.opened = true
                })

                this.vDom.addEventListener('pause', e => {
                    if (!this.flag) {
                        this.opened = false
                    }
                })

                this.vDom.addEventListener('timeupdate', e => {
                    if (this.vDom.currentTime > 0.01 && this.showMask) {
                        this.showMask = false
                    }
                })

                this.vDom.addEventListener('error', e => {
                    if (this.opened) {
                       app.alert('视频加载出错,请稍后再试。').then(res => {
                           setTimeout(() => {
                               this.opened = false
                           }, 100)
                       }) 
                    }
                })
            },
            setFlag() {
                this.flag = true
            },
            trigger() {
                // if (this.vDom.paused) {
                //     this.vDom.play()
                // } else {
                //     this.vDom.pause()
                // }
            },
            hide() {
                this.opened = false
            },
            setSrc(src) {
                if (typeof src === 'string') {
                    this.src = src
                }
            },
            play(src) {
                this.setSrc(src)
                setTimeout(() => {
                    if (this.src) {
                        this.opened = true
                        this.flag = false
                        this.showMask = true

                        this.vDom.play()
                    }
                }, 100)
            },
        },
        mounted() {
            window.vd = this.vDom = this.$refs.fullVideo
            this.addEventListener();
        },
        watch: {
            opened() {
                if (!this.opened) {
                    this.$refs.fullVideo.pause()
                }
            }
        }
    }
</script>

