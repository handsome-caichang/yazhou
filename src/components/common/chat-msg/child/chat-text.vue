<style type="text/css">
    .text-link {
        /* color: -webkit-link;
        word-wrap: break-word; */
        color: #7EE7B7;
        word-break: break-word;
    }
</style>

<!-- 表情样式 -->
<style lang="scss">
    .chat-text {
        .face {
            display: inline-block;
            background-image: url(../../../../configs/face/face-sprite.png);
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: 20px;
            width: 20px;
            height: 20px;
            vertical-align: middle;
            zoom: 1;
        }

        .face0{background-position:0 0px;}
        .face1{background-position:0 -20px;}
        .face2{background-position:0 -40px;}
        .face3{background-position:0 -60px;}
        .face4{background-position:0 -80px;}
        .face5{background-position:0 -100px;}
        .face6{background-position:0 -120px;}
        .face7{background-position:0 -140px;}
        .face8{background-position:0 -160px;}
        .face9{background-position:0 -180px;}
        .face10{background-position:0 -200px;}
        .face11{background-position:0 -220px;}
        .face12{background-position:0 -240px;}
        .face13{background-position:0 -260px;}
        .face14{background-position:0 -280px;}
        .face15{background-position:0 -300px;}
        .face16{background-position:0 -320px;}
        .face17{background-position:0 -340px;}
        .face18{background-position:0 -360px;}
        .face19{background-position:0 -380px;}
        .face20{background-position:0 -400px;}
        .face21{background-position:0 -420px;}
        .face22{background-position:0 -440px;}
        .face23{background-position:0 -460px;}
        .face24{background-position:0 -480px;}
        .face25{background-position:0 -500px;}
        .face26{background-position:0 -520px;}
        .face27{background-position:0 -540px;}
        .face28{background-position:0 -560px;}
        .face29{background-position:0 -580px;}
        .face30{background-position:0 -600px;}
        .face31{background-position:0 -620px;}
        .face32{background-position:0 -640px;}
        .face33{background-position:0 -660px;}
        .face34{background-position:0 -680px;}
        .face35{background-position:0 -700px;}
        .face36{background-position:0 -720px;}
        .face37{background-position:0 -740px;}
        .face38{background-position:0 -760px;}
        .face39{background-position:0 -780px;}
        .face40{background-position:0 -800px;}
        .face41{background-position:0 -820px;}
        .face42{background-position:0 -840px;}
        .face43{background-position:0 -860px;}
        .face44{background-position:0 -880px;}
        .face45{background-position:0 -900px;}
        .face46{background-position:0 -920px;}
        .face47{background-position:0 -940px;}
        .face48{background-position:0 -960px;}
        .face49{background-position:0 -980px;}
        .face50{background-position:0 -1000px;}
        .face51{background-position:0 -1020px;}
        .face52{background-position:0 -1040px;}
        .face53{background-position:0 -1060px;}
        .face54{background-position:0 -1080px;}
        .face55{background-position:0 -1100px;}
        .face56{background-position:0 -1120px;}
        .face57{background-position:0 -1140px;}
        .face58{background-position:0 -1160px;}
        .face59{background-position:0 -1180px;}
        .face60{background-position:0 -1200px;}
        .face61{background-position:0 -1220px;}
        .face62{background-position:0 -1240px;}
        .face63{background-position:0 -1260px;}
        .face64{background-position:0 -1280px;}
        .face65{background-position:0 -1300px;}
        .face66{background-position:0 -1320px;}
        .face67{background-position:0 -1340px;}
        .face68{background-position:0 -1360px;}
        .face69{background-position:0 -1380px;}
        .face70{background-position:0 -1400px;}
        .face71{background-position:0 -1420px;}
        .face72{background-position:0 -1440px;}
        .face73{background-position:0 -1460px;}
        .face74{background-position:0 -1480px;}
        .face75{background-position:0 -1500px;}
        .face76{background-position:0 -1520px;}
        .face77{background-position:0 -1540px;}
        .face78{background-position:0 -1560px;}
        .face79{background-position:0 -1580px;}
        .face80{background-position:0 -1600px;}
        .face81{background-position:0 -1620px;}
        .face82{background-position:0 -1640px;}
        .face83{background-position:0 -1660px;}
        .face84{background-position:0 -1680px;}
        .face85{background-position:0 -1700px;}
        .face86{background-position:0 -1720px;}
        .face87{background-position:0 -1740px;}
        .face88{background-position:0 -1760px;}
        .face89{background-position:0 -1780px;}
        .face90{background-position:0 -1800px;}
        .face91{background-position:0 -1820px;}
        .face92{background-position:0 -1840px;}
        .face93{background-position:0 -1860px;}
        .face94{background-position:0 -1880px;}
        .face95{background-position:0 -1900px;}
        .face96{background-position:0 -1920px;}
        .face97{background-position:0 -1940px;}
        .face98{background-position:0 -1960px;}
        .face99{background-position:0 -1980px;}
        .face100{background-position:0 -2000px;}
        .face101{background-position:0 -2020px;}
        .face102{background-position:0 -2040px;}
        .face103{background-position:0 -2060px;}
        .face104{background-position:0 -2080px;}
    }
</style>

<style lang="scss" scoped>
    @import "../../../../assets/scss/variable.scss";
    @import "../../../../assets/scss/mixin.scss";
    @import "./mixin.scss";

    .box {
        display: flex;
        .content-wrap {
            position: relative;
        } 
        .content {
            position: relative;
            padding: 11px 14px;
            line-height: 18px;
            border-radius: 4px;
            word-break: break-word;
        }
        &.in {
            .content {
                color: #333;
                background-color: #FFF;
                @include triangle-left;
            }
        }
        &.out {
            flex-direction: row-reverse;
            .content {
                color: #FFF;
                background-color: #1E88F5;
                @include triangle-right;
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
    <div class="box chat-text" :class="{'in': msg.flow === 'in', 'out': msg.flow === 'out'}">
        <div class="content-wrap">
            <div class="content" 
                v-html="showHtml" 
                @touchstart="touchstart($event)"
                @touchmove="touchmove($event)"
                @touchend="touchend($event)"
                @mousedown="touchstart($event)"
                @mousemove="touchmove($event)"
                @mouseup="touchend($event)"
                >
            </div>
            <!-- 撤消消息按钮 -->
            <delete-msg-btn :msg="msg"></delete-msg-btn>
        </div>

        <!-- 发送失败，提供重发按钮 -->
        <div class="resend-btn" v-if="msg.status === 'fail'"  @click="resendMsg()">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fasongshibai"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import DeleteMsgBtn from './delete-msg-btn.vue'

import faceConf from 'src/configs/face/face-conf.js'

export default {
    name: 'chat-text',
    props: {
        msg: {
            type: Object
        }
    },
    data () {
        return {
            faceMap: faceConf.map
        }
    },
    computed: {
        showHtml() {
            // return app.tool.textToHtml(this.msg.text, true)
            
            var html = app.tool.textToHtml(this.msg.text, true)
            return this.replaceFace(html)
        }
    },
    methods: {
        customLongPress() {
            Vue.event.$emit('openChatCopyPage', this.msg.text)
        },
        touchstart(e) {
            // e.preventDefault()
            var point = e.touches ? e.touches[0] : e;

            this.startTime = new Date().getTime()
            this.moved = false;
            this.distX = 0;
            this.distY = 0;            
            this.pointX = point.pageX;
            this.pointY = point.pageY;

            this.longPressTimer = setTimeout(() => {
                if (!this.moved) {
                    Vue.event.$emit('openChatCopyPage', this.msg.text)
                }
            }, 600);
        },
        touchmove(e) {
            var point = e.touches ? e.touches[0] : e,
                deltaX = point.pageX - this.pointX,
                deltaY = point.pageY - this.pointY;

            this.pointX = point.pageX;
            this.pointY = point.pageY;

            this.distX += Math.abs(deltaX);
            this.distY += Math.abs(deltaY);

            if (this.distX > 20 || this.distY > 20) {
                this.moved = true
            }
        },
        touchend(e) {
            clearTimeout(this.longPressTimer)
        },
        // 重发消息
        resendMsg() {
            this.$store.dispatch('resendMsg', this.msg);
        },
        replaceFace(string) {
            var regx = /\[(.*?)\]/gm;
            var textTransed = string.replace(regx, match => {
                var face = this.faceMap[`${match}`];
                if(!face){
                    //说明不对应任何表情，直接返回
                    return match;
                }
                return `<a title="${face.text}" class="face ${face.name}"></a>`;
            });
            return textTransed;
        },
    },
    components: {
        DeleteMsgBtn
    },
}
</script>


