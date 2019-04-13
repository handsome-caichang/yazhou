<style scoped lang="scss">
    .scroll {
        background-color: #F7F8FA;
        padding: 40px 15px;
        .item {
            @include flex-between;
            height: 49px;
            padding: 0 20px;
            background-color: #fff;
            border-radius: 10px;
            .name {
                width: 40px;
                color: #666666;
                font-size: 14px;
            }
            input::placeholder {
                color: #AAAAAA;
                font-size: 14px;
            }
        }
        .mt-20 {
            margin-top: 20px;
        }
        .login {
            height: 44px;
            line-height: 44px;
            text-align: center;
            margin-top: 60px;
            border-radius: 22px;
            background: #FF8B02;
            color: #fff;
            font-size: 16px;
        }
        .info {
            margin-top: 20px;
            color: #AAAAAA;
            font-size: 12px;
        }
    }
</style>

<template>
    <scroller-base class="scroll">
        <div class="item">
            <div class="name">账号</div>
            <input type="text" placeholder="请输入校锐星机构账号"  autocomplete="off" v-model="name">
        </div>
        <div class="item mt-20">
            <div class="name">密码</div>
            <input type="password" placeholder="请输入密码" autocomplete="off" v-model="pwd">
        </div>
        <div class="login" @click="bindXrx">
            立即登录
        </div>
        <div class="info">
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#iconzhushishuoming"></use> 
            </svg>
            数据互动：登录校锐星后可实现活动数据实时同步到校锐星，方便及时跟进学员，把握学员的每一个状态；
        </div>
        <div class="info">
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#iconzhushishuoming"></use> 
            </svg>
            数据统一管理：同一个机构，可实现活动信息共享，老师可关联每一个参加活动的学员，让招生更简单；
        </div>
    </scroller-base>
</template>

<script>
    import {userbinding, getuserinfo, userunbinding} from 'manage/api/index.js'

    export default {
        data() {
            return {
                wxTitle: '机构登录',
                name: '',
                pwd: ''
            }
        },

        methods: {
            ...Vuex.mapMutations(['setBindinginfo', 'setUserInfo']),
            bindXrx() {
                if (!this.name) {
                    app.toast('请输入用户名')
                    return
                }
                if (!this.pwd) {
                    app.toast('请输入密码')
                    return
                }
                userbinding({username: this.name, password: this.pwd}).then(res => {
                    if (res.result.code == app.errok) {
                        wx.miniProgram.reLaunch({
                            url:`/pages/index/index?binding=true`,
                            success: function(res){
                                // app.alert(res)
                            },
                            fail: function(){
                                app.alert('跳转失败，请刷新页面重试。');            
                            }
                        })
                    } else {
                        app.toast('error', res.result.msg)
                    }
                })
            },
            
        }
    }
</script>