<style lang="scss" scoped>
    .wrapper {
        .scroll {
            @include position-absolute;
            padding: 0 15px;
            background: linear-gradient(right, #0F143E, #12103F);
            .input-wrapper {
                height: 49px;
                border-radius: 10px;
                background-color: $color-white;
                padding: 0 20px;
                margin-top: 20px;
                @include flex-between;
                font-size: 14px;
                .text {
                    color: #666666;
                }
                .input {
                    margin-left: 40px;
                    flex: 1;
                    color: #000000;
                }
            }
            .input-wrapper {
                margin-top: 15px;
                height: 49px;
                border-radius: 10;
                border: 1px solid #C9C9C9;
                @include flex-between;
                .code {

                }
                .input-r {
                    height: 25px;
                    line-height: 25px;
                    width: 170px;
                    border-left: 1px solid #CBCBCB;
                    color: #181818;
                    font-size: 13px;
                    padding-left: 10px;
                }
                .active {
                    color: $color-9;
                }
            }
            .other-tel {
                margin-top: 12px;
                text-align: right;
                color: #9A9AADFF;
                font-size: 13px;
                text-decoration: underline;
            }
            .btn {
                margin-top: 24px;
                height: 44px;
                line-height: 44px;
                border-radius: 22px;
                text-align: center;
                font-size: 16px;
                color: #A75D0C;
                background: linear-gradient(bottom, #FFD057, #FFFAA7);
            }
        }
        .sucess {
            @include position-absolute;
        }
    }
</style>

<template>
    <div class="wrapper">
        <scroller-base class="scroll">
            <div class="input-wrapper">
                <div class="text">机构名称</div>
                <input type="text" placeholder="请输入名称" class="input" autocomplete="off">
            </div>
            <div class="input-wrapper">
                <div class="text">联系人</div>
                <input type="text" placeholder="请输入电话" class="input" autocomplete="off">
            </div>
            <div class="input-wrapper">
                <div class="text">联系人号码</div>
                <input type="text" placeholder="请输入电话" class="input" autocomplete="off">
            </div>
            <!-- <div class="input-wrapper">
                <input type="text" placeholder="请输入验证码" class="code" autocomplete="off">
                <div class="input-r" v-if="time==60||time==0" @click="sendMsgCode">获取验证码</div>
                <div class="input-r active" v-else>剩余{{time}}秒</div>
            </div> -->
            <div class="other-tel">使用其他号码</div>
            <div class="btn" @click="applyNow">立即申请</div>
        </scroller-base>
        <apply-sucess :opened.sync="showSucess" class="sucess"></apply-sucess>
    </div>
</template>

<script>
    import ApplySucess from './child/applySucess.vue'
    export default {
        data() {
            return {
                wxTitle: '申请开通机构版',
                time: 0,
                showSucess: false
            }
        },
        methods: {
            applyNow() {
                this.showSucess = true
                // this.showSucess = false
                setTimeout(() => {
                }, 1000)
            }
        },
        components: {
            ApplySucess
        }
    }
</script>