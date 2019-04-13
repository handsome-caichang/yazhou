<!-- 修改密码弹窗 -->
<style lang="scss" scoped>



    .xyx-edit-information-container {
        @include position-absolute(0, 0, 0, 0);
        line-height: 1;
        z-index: 9999999;
        .dialog-mask {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
        }
        .dialog-box {
            position: absolute;
            top: 35%;
            left: 6%;
            width: 88%;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            .content-box{
                padding: 20px 0 10px;
                .title {
                    padding-bottom: 10px;
                    color: #333;
                    font-size: 15px;
                    text-align: center;
                }
                .content {
                    padding: 10px;
                    line-height: 16px;
                }
            }
            .btn-box {
                border-top: 1px solid $color-assist-1;
                height: 44px;
                line-height: 44px;
                text-align: center;
                color: $color-primary;
                font-size: 16px;
            }

        }
    }
</style>

<template>
    <div class="xyx-edit-information-container" v-show="openFlag">
        <div class="dialog-mask"></div>
        <div class="dialog-box">
            <div class="content-box">
                <div class="title">
                    个人信息完善提示
                </div>
                <div class="content">
                    {{app.sysInfo.username}} 同学有重要的个人信息未填写，这会影响和学校之间的沟通哦~
                </div>

            </div>
            <div class="btn-box">
                <div class="btn-item" @click="confirm">去完善</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'xyx-edit-information',
        data() {
            return {
                opened: true
            }
        },
        computed: {
            ...Vuex.mapState([
                'userConfig'
            ]),
            openFlag() {
                // 配置项开启且未完善个人必填信息
                if (this.userConfig && this.userConfig.EnableSSXStudentInfo==1 && this.userConfig.perfectUserInfo==1 && this.userConfig.isStudent==1 && this.opened) {
                    return true
                } else {
                    return false;
                }

            }
        },
        methods: {
            ...Vuex.mapMutations([
                'set_userConfig',
            ]),
            confirm() { //确认
                this.$router.replace('/xyxPersonalInformation/1');
                setTimeout(()=>{
                    this.opened = false;
                },301)
            }
        }
    }
</script>