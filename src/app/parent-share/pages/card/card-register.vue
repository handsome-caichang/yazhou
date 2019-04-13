<!-- 注册页面 -->

<style lang="scss" scoped>
.register {
    @include position-absolute;
    background-color: $color-assist-3;

    .form {
        margin: 20px $edge-x 0 $edge-x;
        padding: 0px 18px $h-4 18px;
        box-shadow: 0 0 2px 0 rgba(0, 38, 78, 0.2);
        background-color: $color-white;

        .title-box {
            height: 75px;
            display: flex;
            justify-content: center;
            align-items: center;
            .title {
                font-weight: 500;
                font-size: 16px;
                color: #474747;
            }
        }
        .tip{
            margin-bottom:5px;
            color:#999999;
        }
        .form-item {
            position: relative;
            border-radius: 4px;
            margin-bottom: 16px;
            background-color: $color-assist-3;
            @include flex-center(row);
            font-size: $fs-normal-x;
            &.select {
                @include flex-between;
            }
           
            .form-item-bd {
                position: relative;
                flex: 1;

                input {
                    color: $color-3-s;
                    font-size: $fs-normal-x;
                    height: 44px;
                    background-color: $color-assist-3 !important;
                }

                ::-webkit-input-placeholder {
                    color: $color-9;
                    font-size: $fs-normal-x;
                }

                &.select {
                    height: 44px;
                    line-height: 44px;
                    color: $color-9;
                    padding: 0 $edge-x * 2 0 $edge-x;

                    &.active {
                        color: $color-3-s;
                    }
                }
            }
            .campus-text {
                @include  ellipsis-single;
            }
            .form-item-ft {
                height: 24px;
                line-height: 24px;
                padding: 0 20px;
                @include border-left($color-9);
            }

            .sel {
                padding-right: 10px;
                font-size: 9px;
                color: $color-3-s;
            }
        }

        .form-code {
            @include flex-center;

            .form-code-bd {
                flex: 1;
            }

            .form-code-ft {
                height: $h-3;
                line-height: $h-3;
                margin-bottom: 16px;
                width: 100px;
                margin-left: 15px;
                text-align: center;

                &.pic {
                    background-size: 100% 100%;
                }

                &.desc {
                    width: 60px;
                    color: $color-assist-2;
                }

                .form-code-ft-btn {
                    border-radius: 4px;
                    color: $color-white;
                    background-color: $color-primary;

                    &.forbid {
                        background-color: #b2b2b2;
                    }
                }
            }
        }

        .form-sex {
            margin: 3px 0 19px 0;

            .form-sex-title {
                padding: 0 40px 0 15px;
            }

            svg {
                font-size: $fs-normal-x;

                &.checked {
                    color: $color-primary;
                }
            }
        }

        .form-btn {
            margin-top: 4px;
            height: $h-3;
            line-height: $h-3;
            text-align: center;
            font-size: $fs-normal-x;
            border-radius: $border-radius-normal;

            &.primary {
                color: $color-white;
                background-color: $color-primary;
            }

            &.back {
                background-color: $color-white;
                margin-top: 20px;
                color: $color-9;
                border: 1px solid #ccc;
            }
        }

        .form-item-title {
            font-size: $fs-normal-x;
            color: $color-primary;
            margin-bottom: 20px;
        }

        .form-item-tips {
            font-size: $fs-normal-x;
            color: $color-9;
            margin-bottom: 20px;

            .content {
                font-size: $fs-big;
                color: $color-3-s;
            }
        }

        .input:focus {
            background: rgba(246, 249, 253, 1);
            box-shadow: 0px 0px 6px 0px rgba(74, 144, 226, 0.41);
            border: 1px solid rgba(74, 144, 226, 1);
        }
    }
}

.scroller {
    @include position-absolute;
    overflow: hidden;
}

.as-select {
    @include position-absolute;
    z-index: 2;
}
</style>

<template>
<div class="register">
    <scroller-base ref="scroller" class="scroller" :data="initData.EnableSendSMS_Online">
        <div class="form">
            <div class="title-box"><span class="title">报名领取</span></div>
            <div class="form-item">
                <div class="form-item-bd">
                    <input class="input" type="text" placeholder="学员姓名（汉字全名）" @input="regVal($event,user)" v-model="user.uname" @blur="setName"/>
                    </div>
                </div>
                <div class="form-sex" v-if="initData.EnableRecommendCard!=0">
                    <label class="form-sex-title">性别</label>
                    <span @click="chooseSex(1)">男
                        <svg class="icon" aria-hidden="true" :class="{checked:(user.sex==1)}">
                            <use :xlink:href="(user.sex==1)?'#icon-danxuanxuanzhong1':'#icon-danxuanweixuanzhong1'"></use>
                        </svg>
                    </span>&emsp;
                    <span @click="chooseSex(2)">女
                        <svg class="icon" aria-hidden="true" :class="{checked:(user.sex==2)}">
                            <use :xlink:href="(user.sex==2)?'#icon-danxuanxuanzhong1':'#icon-danxuanweixuanzhong1'"></use>
                        </svg>
                    </span>
                </div>
                <div class="form-item">
                    <div class="form-item-bd">
                        <input class="input" type="tel" placeholder="您的手机号" v-model.number="user.phone" @input="phoneInputEvent" maxlength="11" @blur="setName"/>
                    </div>
                    </div>
                    <div class="form-code" v-if="(initData.EnableRecommendCard!=0) && initData.EnableSendSMS_Online == '1'">
                        <div class="form-code-bd">
                            <div class="form-item">
                                <div class="form-item-bd">
                                    <input class="input" type="text" placeholder="图片验证码" v-model="user.picCode"/>
                                </div>
                            </div>
                        </div>
                        <div class="form-code-ft pic" :style="'background-image: url(/weixin/parent/register.ashx?pname=getvalidationimage&'+timeStamp+')'" @click="changeRegImage"></div>
                    </div>
                    <div class="form-code" v-if="(initData.EnableRecommendCard!=0) && initData.EnableSendSMS_Online == '1'">
                        <div class="form-code-bd">
                            <div class="form-item">
                                <div class="form-item-bd">
                                    <input class="input" type="tel" placeholder="手机验证码" v-model="user.smsCode"/>
                                </div>
                            </div>
                        </div>
                        <div class="form-code-ft">
                            <div class="form-code-ft-btn" @click="sendMsgCode" :class="{forbid:sendMsg}">{{sendMsg?time+'s后重发':'获取验证码'}}</div>
                        </div>
                    </div>
                    <div class="form-item select" v-if="initData.EnableRecommendCard!=0">
                        <div class="form-item-bd select" :class="{active:user.birthday!='您孩子的公历生日'}" @click="selectBirthDay">
                            <div>{{user.birthday}}</div>
                        </div>
                        <svg class="icon sel" aria-hidden="true">
                            <use xlink:href="#icon-xiala"></use>
                        </svg>
                    </div>
                    <div class="tip" v-if="(initData.EnableRecommendCard==0 && isShowCampusSelect)">
                        意向报名校区
                    </div>
                    <div class="form-item select" v-if="(initData.EnableRecommendCard!=0)||(initData.EnableRecommendCard==0 && isShowCampusSelect)">
                        <div class="form-item-bd select" :class="{active:user.SelectCampusId}" @click="openCampusActionsheet">
                            <div class="campus-text">{{user.campus}}</div>
                        </div>
                        <svg class="icon sel" aria-hidden="true">
                            <use xlink:href="#icon-xiala"></use>
                        </svg>
                    </div>
                    <div class="tips" v-if="initData.EnableRecommendCard==0 && isShowCampusSelect && (StudentUserName!='') && (StudentCampusName!='')">
                        提示：您可能认识的{{StudentUserName}}同学，在{{StudentCampusName}}学习。
                    </div>
                    <p class="form-item-title" v-if="isRegist">设置师生信账号</p>
                    <div class="form-item"  v-if="isRegist">
                        <div class="form-item-bd">
                            <input class="input" type="text" placeholder="用户名" v-model="user.ssxName"/>
                        </div>
                        <div class="form-item-ft">@ {{initData.UserNameSuffix}}</div>
                    </div>
                    <!-- <div class="form-item">
                        <div class="form-item-bd">
                            <input class="input" type="password" placeholder="请输入6位数以上的密码" v-model="user.pwd"/>	
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="form-item-bd">
                            <input class="input" type="password" placeholder="请重新输入密码" v-model="user.rePwd"/>	
                        </div>
                    </div> -->
                    <div class="form-btn primary" @click="regMoreSubmit">报&emsp;名</div>
                </div>
    </scroller-base>
    <loading v-if='isLoading' :bgType='bgType'></loading>
    <actionsheet-select class="as-select" :opened.sync="openSelectSheet" :data="initData.Campuslist" :id="user.SelectCampusId" @selected="selectAction" ref="actionSheetSelect">
    </actionsheet-select>
    <actionsheets-ssh :opened.sync="openCard" :code="code" @close="closeCode">
    </actionsheets-ssh>
</div>
</template>

<script>
import actionsheetSelect from "../register/children/actionsheet-select.vue";
import {
    sendsms,
    validateSMSCode,
    userRegister
} from "parentShare/api/share.js";
import actionsheetsSsh from "./child/actionsheets-ssh.vue";

export default {
    name: "register",
    data() {
        return {
            wxTitle: "",
            bgType:0,
            timeStamp: new Date().getTime(),
            sendMsg: false, //是否正在发送验证码
            openSelectSheet: false, //是否打开下拉选择框
            isLoading: true,
            time: 0, //倒计时时长
            timeout: null,
            user: {
                uname: "", //用户名
                smsCode: "", //短信验证码
                picCode: "", //图片验证码
                sex: 1, //性别，1-男，2-女
                campus: "报名校区", //校区
                SelectCampusId: "", //校区ID
                phone: "",
                CustomerID: "",
                birthday: "您孩子的公历生日",
                ssxName: "", //师生信用户名
                pwd: "", //密码
                rePwd: ""
            },
            openCard: false,
            code: '',
            companyID: "",
            cardId: "",
            initData: {
                DefaultUserNameRule: 0, // 0 根据姓名， 1 根据手机号码
                UserNameSuffix: "",
                Campuslist: [],
                EnableSendSMS_Online: "0", // 0 不开启短信验证 1 开启
                EnableRecommendCard:1,//是只有0和1 ; 0时，就隐藏性别，学校，生日 但是默认传第一个校区id;1表示小银星
            },
            StudentCampusName: "",
            StudentUserName: "",
            isShowCampusSelect:false,//是否展示选择校区（可能认识的学生姓名为空且校区id为空且校区名称为空，则表示要填写校区。EnableRecommendCard为0情况下适用，为1时原本就需要填校区）
            imgUrl: "",
            isRegist: false, 
        };
    },
    computed: {
        // btnStyle() {
        //     if (
        //         !this.uname ||
        //         !this.SelectCampusId ||
        //         !this.phone ||
        //         this.birthday == "您孩子的公历生日"
        //     ) {
        //         return {
        //             opacity: "0.4"
        //         };
        //     }
        //     return {
        //         opacity: "1"
        //     };
        // }
    },
    methods: {
        regVal(e,i){
            let val = e.target.value.replace(/@/,'');
            i.uname = val;
        },
        setName() {
            if (this.initData.DefaultUserNameRule == 1) {
                this.user.ssxName = this.user.phone;
            } else {
                this.user.ssxName = this.user.uname;
            }
        },
        closeCode() {
            this.openCard = false;
        },
        changeRegImage() {
            //换一张
            this.timeStamp = new Date().getTime();
        },
        selectAction(item) {
            this.user.campus = item.Name;
            this.user.SelectCampusId = item.ID;
        },
        sendMsgCode() {
            //发送短信验证码
            if (!this.sendMsg && this._phoneValidate()) {
                userRegister({
                    pname: "sendsms",
                    Mobile: this.user.phone,
                    ValidationCode: this.user.picCode,
                    CompanyID: this.companyID
                }).then(res => {
                    if (res.errcode == app.errok) {
                        document.addEventListener("visibilitychange", this._diffTime);
                        clearTimeout(this._timeout);
                        this.sendMsg = true;
                        this.time = 60;
                        this._beginReCheck(this.time);
                    } else {
                        app.toast("error", res.errmsg);
                    }
                });
            }
        },
        phoneInputEvent() {
            //手机号码改变可重新发送短信验证码
            this._resetCode();
        },
        chooseSex(sex) {
            //选择性别
            this.user.sex = sex;
        },
        selectBirthDay() {
            app.datetimePicker().then(res => {
                this.user.birthday = res;
            });
        },
        openCampusActionsheet() {
            //选择校区
            this.openSelectSheet = true;
            this.$refs.actionSheetSelect.refreshScroll();
        },
        regMoreSubmit() {
            
            //提交更多信息的表单
            if (this._moreValidate()) {
                this.isLoading = true;
                let para = {
                    UserName: this.user.uname,
                    // Sex: this.user.sex,
                    SMSCode: this.user.smsCode,
                    SelectCampusId: this.user.SelectCampusId,
                    SSXUserName: this.user.ssxName,
                    Password: this.user.pwd,
                    Mobile: this.user.phone,
                    // Birthday: this.user.birthday,
                    CompanyId: this.companyID,
                    RecommendCardSendId: this.cardId
                }
                if(this.initData.EnableRecommendCard==0){
                    Object.assign(para,{
                        Sex: 0,
                        // SelectCampusId: this.initData.Campuslist[0].ID,
                        Birthday: "",
                    })
                }else{
                    Object.assign(para,{
                        Sex: this.user.sex,
                        // SelectCampusId: this.user.SelectCampusId,
                        Birthday: this.user.birthday,
                    })
                }
                userRegister({
                    pname: "signup",
                    data: JSON.stringify(para)
                }).then(res => {
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        if (res.data) {
                            this.code = res.data.Url;
                            this.openCard = true;
                        }
                    } else if (res.errcode == 421) {
                        app.toast('error', res.errmsg)
                        this.isRegist = true;
                    }else {
                        app.alert(res.errmsg)
                    }
                });
            }
        },
        _phoneValidate() {
            //验证手机号码
            if (!this.user.phone) {
                app.toast("info", "手机号不能为空。");
                return;
            } else if (
                !/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|147)\d{8}/.test(
                    this.user.phone
                )
            ) {
                app.toast("info", "手机号码格式不正确，请重新输入。");
                return;
            }
            if (!this.user.picCode) {
                app.toast("info", "图片验证码不能为空。");
                return;
            }
            return true;
        },
        _moreValidate() {
            //验证更多信息
            if (!this.user.uname) {
                app.toast("info", "姓名不能为空。");
                return;
            }
            if (!this.user.phone) {
                app.toast("info", "手机号不能为空。");
                return;
            }
            if (
                !/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|147)\d{8}/.test(
                    this.user.phone
                )
            ) {
                app.toast("info", "手机号码格式不正确，请重新输入。");
                return;
            }
           
            if((this.initData.EnableRecommendCard != 0)){
                if (this.initData.EnableSendSMS_Online == "1" && !this.user.smsCode) {
                    app.toast("info", "手机验证码不能为空。");
                    return;
                }
            }
            if((this.initData.EnableRecommendCard != 0)){
                if (!this.user.birthday || this.user.birthday === "您孩子的公历生日") {
                    app.toast("info", "您孩子的公历生日不能为空");
                    return;
                }
            }
            
            if((this.initData.EnableRecommendCard!=0)||(this.initData.EnableRecommendCard==0 && this.isShowCampusSelect)){
                if ((!this.user.SelectCampusId)||(this.user.SelectCampusId=="00000000-0000-0000-0000-000000000000")) {
                    app.toast("info", "报名校区不能为空。");
                    return;
                }
            }
            
            
            // if (!this.user.pwd) {
            //     app.toast("info", "密码不能为空");
            //     return;
            // }
            // if (!this.user.rePwd) {
            //     app.toast("info", "重新输入密码不能为空");
            //     return;
            // }
            // if (this.user.pwd.length < 6 || this.user.rePwd.length < 6) {
            //     app.toast("info", "密码不能少于6个字符。");
            //     return;
            // }
            // if (this.user.pwd.length > 20 || this.user.rePwd.length > 20) {
            //     app.toast("info", "密码不能多于20个字符。");
            //     return;
            // }
            // if (this.user.pwd != this.user.rePwd) {
            //     app.toast("info", "您输入的两次密码不相同，请重新输入。");
            //     return;
            // }
            return true;
        },
        _beginReCheck(t) {
            let $this = this;
            this.timeout = setTimeout(function () {
                if (t <= 0) {
                    $this._resetCode();
                } else {
                    $this.time = t - 1;
                    $this._beginReCheck($this.time);
                }
            }, 1000);
        },
        _diffTime() {
            //计算页面可见/不可见的时间差
            let hideArr = [];
            if (document.hidden) {
                //页面不可见状态
                this.hideArr[0] = new Date().getTime();
                clearTimeout(this.timeout);
            } else {
                //页面可见状态
                this.hideArr[1] = new Date().getTime();
                this._beginReCheck(
                    this.time - parseInt((this.hideArr[1] - this.hideArr[0]) / 1000)
                );
            }
        },
        _resetCode() {
            //重置倒计时的相关信息
            this.timeout && clearTimeout(this.timeout);
            this.sendMsg = false;
            document.removeEventListener("visibilitychange", this._diffTime);
        }
    },
    created() {
        this.cardId = this.$route.query.cardId ? this.$route.query.cardId : "";
        this.companyID = this.$route.query.companyID ?
            this.$route.query.companyID :
            "";
        this.wxTitle = this.$route.query.wxTitle ?
            this.$route.query.wxTitle :
            "电子推荐卡";
        app.tool.setDocTitle(this.wxTitle);
        userRegister({
            pname: "getinitpagedata",
            companyId: this.companyID,
            areaId: this.companyID,
            sendid:this.cardId,
        }).then(res => {
            // 避免初次进入界面时，配置项EnableRecommendCard为0时导致界面突变
            setTimeout(()=>{
                this.isLoading = false;
                this.bgType = 1;//透明遮罩
            },301);
            if (res.errcode == app.errok) {
                this.initData = Object.assign(this.initData, res.data);
                if(res.data.EnableRecommendCard==0){
                    // 非小银星
                    this.isShowCampusSelect = res.data.IsSelectCampus==1;//1是要选择  0是不用选择
                    if(res.data.IsSelectCampus==1){
                        if(res.data.StudentCampusID!=="00000000-0000-0000-0000-000000000000"){
                            this.user.campus = res.data.StudentCampusName;
                            this.user.SelectCampusId = res.data.StudentCampusID;
                            
                            this.StudentCampusName = res.data.StudentCampusName;
                            this.StudentUserName = res.data.StudentUserName;
                        }
                    }else{
                        this.user.campus = res.data.DefaultCampusName;
                        this.user.SelectCampusId = res.data.DefaultCampusID;
                    }
                }
                
                
            }
        });
    },
    components: {
        actionsheetSelect,
        actionsheetsSsh
    }
};
</script>
