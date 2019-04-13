<style scoped lang="scss">
.role-actionsheet {
    @include position-absolute(0, 0, 0, 0);
    z-index: 10;
    .content {
        // width: 200px;
        // height: 300px;
        padding: 29px 25px 25px 25px;
        .title {
            color: #030303ff;
            text-align: center;
            font-size: 17px;
        }
        .text {
            font-size: 12px;
            color: #888888;
            text-align: center;
            margin-top: 12px;
        }
        .input {
            margin-top: 15px;
            border-radius: 6px;
            border: 1px solid #c9c9c9;
            // padding: 0 16px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
        }
        .input-wrapper {
            margin-top: 15px;
            height: 40px;
            border-radius: 6px;
            border: 1px solid #c9c9c9;
            @include flex-between;
            .input-r {
                height: 25px;
                line-height: 25px;
                width: 200px;
                border-left: 1px solid #cbcbcb;
                color: #181818;
                font-size: 13px;
                padding-left: 10px;
            }
            .active {
                color: $color-9;
            }
            .spec {
                color: #45b54c;
                font-size: 12px;
            }
        }
        .click-text {
            font-size: 13px;
            margin-top: 12px;
            color: #9a9aad;
            text-decoration: underline;
        }
        .btn-wrapper {
            margin-top: 15px;
            display: flex;
            .mid {
                width: 30px;
            }
            .cacle,
            .sure {
                height: 44px;
                line-height: 44px;
                flex: 1;
                border-radius: 22px;
                font-size: 15px;
                text-align: center;
            }
            .sure {
                background: #ff8b02;
                color: $color-white;
            }
            .cacle {
                background: #d7d7d7;
                color: #666666;
                margin-right: 30px;
            }
        }
    }
}
</style>

<template>
    <action-sheet class="role-actionsheet" :position="'center'" v-show="opened" @close="close">
        <div class="content">
            <div class="title">报名参与</div>
            <div class="text">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconzhushishuoming"></use>
                </svg>
                <span style="margin-left:5px">所有信息不会公开，仅用于活动兑奖</span>
            </div>
            <input type="text" placeholder="请输入您的姓名" class="input" autocomplete="off" v-model="name">
            <input type="text" placeholder="手机号码" class="input" autocomplete="off" v-if="showOtherNum" v-model="tel">
            <!-- <div class="input-wrapper" v-if="showOtherNum">
                <input type="text" placeholder="请输入验证码" class="code" autocomplete="off" v-model="checkCode">
                <div class="input-r" v-if="time==60||time==0" @click="sendMsgCode">获取验证码</div>
                <div class="input-r active" v-else>剩余{{time}}秒</div>
            </div> -->
            <div class="input-wrapper" v-if="!showOtherNum">
                <input type="Number" placeholder="" v-model="autoTel" class="code" autocomplete="off">
                <div class="input-r spec">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconIcon-jiagemanyi"></use>
                    </svg>
                    微信绑定号码
                </div>
            </div>
            <div class="click-text" @click="changeTel">使用其他号码</div>
            <div class="btn-wrapper">
                <div class="sure" :class="{cacle:index==0}" v-for="(btn, index) in btns" :key="index" @click="_triggerBtn(btn)">{{btn.text}}</div>
            </div>
        </div>
    </action-sheet>
</template>

<script>
// import { postNew } from "manage/api/common.js";
import Vuex from "Vuex";
export default {
    // mixins: [app.mixin.popupWindowRouteMixin],
    props: {
        /*opened: {
                type: Boolean,
                default: false
            },*/
    },
    computed: {
        // userInfo() {
        //     console.log(store)
        //     return window.store.state.userInfo
        // }
        ...Vuex.mapState(["userInfo"])
    },
    data() {
        return {
            time: 0,
            name: "",
            autoTel: "",
            tel: "",
            checkCode: "",
            showOtherNum: false,
            opened: false,
            _resolve: null,
            btns: [
                {
                    text: "取消",
                    action: false
                },
                {
                    text: "确定",
                    action: true
                }
            ]
        };
    },
    methods: {
        changeTel() {
            this.showOtherNum = !this.showOtherNum;
        },
        show(){
            this.name = this.$store.state.userInfo.nickname;
            this.autoTel = this.$store.state.userInfo.smstel;
            this.opened = true;
            console.log(this.$store)
            return new Promise((reslove, reject) => {
                this._resolve = reslove;
            });
        },
        _triggerBtn(btn) {
            if (btn.action) {
                if (!this.name) {
                    app.toast("error", "请输入您的姓名");
                    return;
                }
                if (!app.telReg.test(this.autoTel)) {
                    app.toast("error", "手机号码格式不正确，请重新输入。");
                    return;
                }
                if (this.showOtherNum) {
                    if (!app.telReg.test(this.tel)) {
                        app.toast("error", "请输入手机号码");
                        return;
                    }
                    /*if (!this.!app.telReg.test(this.autoTel)) {
                            app.toast('error', '请输入校验码')
                            return
                        }*/
                }
            }
            this._resolve({
                action: btn.action,
                name: this.name,
                tel: this.showOtherNum ? this.tel : this.autoTel
            });
            this.close();
        },
        close() {
            this.opened = false;
        }
        // sendMsgCode(){  //发送短信验证码
        //     if (!this.sendMsg) {
        //         this.time = 60;
        //         this.sendMsg = true;
        //         this._beginReCheck(this.time)
        //        /* sendsms({
        //             Mobile: this.user.phone,
        //             Tick: new Date().getTime(),
        //             ValidationCode: this.user.picCode
        //         }).then(res => {
        //             if (res.ErrorCode == app.errok) {
        //                 document.addEventListener("visibilitychange", this._diffTime);
        //                 clearTimeout(this._timeout);
        //                 this.time = 60;
        //                 this.sendMsg = true;
        //                 this._beginReCheck(this.time);
        //             }else{
        //                 app.toast('error', res.ErrorMsg);
        //             }
        //         })*/

        //         postNew({}).then(res => {
        //             console.log(res)
        //         })
        //     }
        // },
        // _beginReCheck(t){
        //     let $this = this;

        //     this.timeout = setTimeout(function () {
        //         if (t<=0) {
        //             $this._resetCode();
        //         }else{
        //             $this.time = t - 1;
        //             $this._beginReCheck($this.time);
        //         }
        //     },1000);
        // },
        // _diffTime(){ //计算页面可见/不可见的时间差
        //     let hideArr = [];
        //     if(document.hidden){ //页面不可见状态
        //         this.hideArr[0] = new Date().getTime();
        //         clearTimeout(this.timeout);
        //     }else{ //页面可见状态
        //         this.hideArr[1] = new Date().getTime();
        //         this._beginReCheck(this.time-parseInt((this.hideArr[1] - this.hideArr[0])/1000));
        //     }
        // },
        // _resetCode(){ //重置倒计时的相关信息
        //     this.timeout&&clearTimeout(this.timeout);
        //     this.sendMsg = false;
        //     document.removeEventListener("visibilitychange", this._diffTime);
        // }
    }
};
</script>