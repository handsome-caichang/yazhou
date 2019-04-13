<style scoped lang="scss">
    .role-actionsheet {
        @include position-absolute;
        z-index: 10;
        .content {
            // width: 200px;
            height: 300px;
            padding: 29px 25px 25px 25px;
            .title {
                color: #030303FF;
                text-align: center;
                font-size: 17px;
            }
            .input {
                margin-top: 15px;
                border-radius: 6px;
                border: 1px solid #C9C9C9;
                // padding: 0 16px;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
            }
            .input-wrapper {
                margin-top: 15px;
                height: 40px;
                border-radius: 6px;
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
        }
    }
</style>

<template>
    <action-sheet
    class="role-actionsheet"
    :position="'center'"
    v-show="opened" 
    @close="close">
        <div class="content">
            <div class="title">申请体验</div>
            <input type="text" placeholder="体验机构名称" class="input" autocomplete="off">
            <input type="text" placeholder="手机号码" class="input" autocomplete="off">
            <div class="input-wrapper">
                <input type="text" placeholder="请输入验证码" class="code" autocomplete="off">
                <div class="input-r" v-if="time==60||time==0" @click="sendMsgCode">获取验证码</div>
                <div class="input-r active" v-else>剩余{{time}}秒</div>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    import {postNew} from 'manage/api/common.js'
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                time: 0
            }
        },
        methods: {
            sendMsgCode(){  //发送短信验证码
                if (!this.sendMsg) {
                    this.time = 60;
                    this.sendMsg = true;
                    this._beginReCheck(this.time)
                   /* sendsms({
                        Mobile: this.user.phone,
                        Tick: new Date().getTime(),
                        ValidationCode: this.user.picCode
                    }).then(res => {
                        if (res.ErrorCode == app.errok) {
                            document.addEventListener("visibilitychange", this._diffTime);
                            clearTimeout(this._timeout);
                            this.time = 60;
                            this.sendMsg = true;
                            this._beginReCheck(this.time);
                        }else{
                            app.toast('error', res.ErrorMsg);
                        }
                    })*/

                    postNew({}).then(res => {
                        console.log(res)
                    })
                }
            },
            _beginReCheck(t){
                let $this = this;
                
                this.timeout = setTimeout(function () {
                    if (t<=0) {
                        $this._resetCode();
                    }else{
                        $this.time = t - 1;
                        $this._beginReCheck($this.time);
                    }
                },1000);
            },
            _diffTime(){ //计算页面可见/不可见的时间差
                let hideArr = [];
                if(document.hidden){ //页面不可见状态
                    this.hideArr[0] = new Date().getTime();
                    clearTimeout(this.timeout);
                }else{ //页面可见状态
                    this.hideArr[1] = new Date().getTime();
                    this._beginReCheck(this.time-parseInt((this.hideArr[1] - this.hideArr[0])/1000));
                }
            },
            _resetCode(){ //重置倒计时的相关信息
                this.timeout&&clearTimeout(this.timeout);
                this.sendMsg = false;
                document.removeEventListener("visibilitychange", this._diffTime);
            }
        }
    }
</script>