<style lang="scss" scoped>
    .wrapper {
        @include position-absolute;
        background-color: rgba(0, 0, 0, .5);
        // padding: 100px 50px;
         .top {
            @include position-absolute;
            background: url('../img/jiantou.png') 90% top no-repeat;
            background-size: 45%;
            @include flex-between;
            .content {
                height: 150px;
                width: 80%;
                background-color: $color-white;
                padding: 10px;
                position: relative;
                border-radius: 10px;
                // top: 45%;
                left: 50%;
                transform: translate(-50%, 0);
                .text { 
                    text-align: center;
                    line-height: 110px;
                    font-size: 16px;
                    color: $color-3;
                }   
                .sure {
                    position: absolute;
                    height: 44px;
                    line-height: 44px;
                    color: $color-primary;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    text-align: center;
                    border-top: 1px solid $color-assist-1;
                }
            } 
        } 
    }
</style>

<template>
    <div class="wrapper"  v-if="opened" @click="close">
        <div class="top">
            
            <div class="content">
                <div class="text">点击右上角立即分享哦！</div>
                <div class="sure">我知道了</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
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
        }
    }
</script>