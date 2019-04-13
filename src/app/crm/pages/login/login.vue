<style lang="scss" scoped>
    
    
    .page {
        min-height: 400px;
        @include position-absolute;
            // background: linear-gradient(bottom, #3B77B5, #3B60B5);
        background-image: url("./img/bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        .top {
            height: 166px;
            @include flex-between;
            .content {
                margin: 0 auto;
                width: 70px;
                height: 70px;
                .item {
                    height: 70px;
                    border-radius: 15px;
                    background-color: $color-assist-1;
                    background-image: url("./img/logo1.png");
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                
            }
        }
        .name-wrapper {
            height: 52px;
            padding: 0 38px;
            position: relative;
            .name {
                height: 52px;
                background-color: rgba(0,0,0,.2);
                color: $color-white;
                border-radius: 26px;
                padding: 0 20px;
                .name-icon {
                    color: #80A2CD;
                }
                @include flex-between;
                .name-input {
                    font-size: 15px;
                    color: $color-white;
                    line-height: 20px;
                }
                input::-webkit-input-placeholder {
                    color: #80A2CD;
                    font-size: 15px;
                    // line-height: 
                }
            }
            .left {
                margin-left: 10px;
                margin-right: 10px;
            }
            .text {
                @include position-absolute(false, false, -20px, 58px);
                font-size: 11px;
                color: #FF7C5B;
            }
        }
        .pwd {
            margin-top: 24px;
        }
        .submit {
            margin-top: 30px;
            padding: 0 38px;
            .denglu {
                background-color: #4074C3;
                opacity: 1;
                text-align: center;
                color: #6092DE;
                font-size: 17px;
                height: 52px;
                line-height: 52px;
                border-radius: 26px;
            }
            .active {
                background-color: $color-white;
                color: #3B77B5;
            }
        }
        .bottom {
            @include position-absolute(false, 0, 24px, 0);
            color: $color-white;
            text-align: center;
            font-size: 9px;
        }
    }
</style>


<template>
    <div class="page">
        <div class="top">
            <div class="content">
                <div class="item"></div>
                <!-- <div class="item">
                    <div class="item-top"></div>
                    <div class="item-text">校锐星账号</div>
                </div> -->
            </div>
        </div>
        <div class="name-wrapper">
            <div class="name">
                <span class="name-icon">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-yonghumingicon"></use>
                    </svg>
                </span>
                <input type="text" class="name-input" placeholder="请输入用户名" v-model="nameText" ref="nameInput">
                <div class="left">@{{suffix}}</div>
                <span @click="nameText=''">
                    <svg aria-hidden="true" class="icon" v-if="nameText.length">
                        <use xlink:href="#icon-dengluyeqingchu"></use>
                    </svg>
                </span>
            </div>
            <div class="text" v-if="false">抱歉没有查到该账号</div>
        </div>
        <div class="name-wrapper pwd">
            <div class="name">
                <span class="name-icon">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-mimaicon"></use>
                    </svg>
                </span>
                <input type="password" class="name-input" placeholder="请输入密码" v-model="pwdText">
                <span @click="pwdText=''">
                    <svg aria-hidden="true" class="icon" v-if="pwdText.length">
                        <use xlink:href="#icon-dengluyeqingchu"></use>
                    </svg>
                </span>
            </div>
            <div class="text" v-if="false">用户名密码错误</div>
        </div>
        <div class="submit">
            <div class="denglu" @click="submit" :class="{active:isActive}">
                登录
            </div>
        </div>
        <div class="bottom">深圳市校管家科技提供技术服务</div>
    </div>
</template>

<script>
    import {bindCustomerManager} from 'crm/api/yy.js'
    export default {
        data() {
            return {
                wxTitle: 'CRM意向客户管理',
                nameText: '',
                pwdText: '',
                companyid: app.tool.parseQuery(location.search).companyId,
                wechatuserid: app.tool.parseQuery(location.search).wxUserId,
                suffix: app.tool.parseQuery(location.search).suffix
            }
        },
        computed: {
            isActive(){
                return (this.nameText.length>0)&&(this.pwdText.length>0)
            }
        },
        methods: {
            submit() {
                if (!this.isActive) return
                bindCustomerManager({
                    // companyid: this.companyid,
                    username: app.tool.trim(this.nameText) + '@' + this.suffix,
                    password: this.pwdText,
                    wechatuserid: this.wechatuserid
                }).then(res => {
                    console.log(res);
                    if (res.result.code === app.errok) {
                        // app.toast('success', '登陆成功，请重新进入应用')
                        
                        app.alert('登陆成功,将关闭此窗口。请重新进入应用').then(res => {
                            wx.closeWindow()
                        })
                        // this.$router.push('/home/0')
                    } else {
                        app.toast('info',res.result.msg)
                    }
                })
            }
        },
        created() {
        }
    }
</script>