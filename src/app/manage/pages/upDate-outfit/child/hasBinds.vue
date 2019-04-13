<style scoped lang="scss">
    .scroll {
        background-color: #F7F8FA;
        padding: 40px 20px;
        .title {
            color: #AAAAAA;
            font-size: 12px;
        }
        .info {
            background-color: #fff;
            margin-top: 12px;
            border-radius: 10px;
            padding: 32px 16px;
            .item {
                display: flex;
                font-size: 14px;
                .item-l {
                    width: 70px;
                    color: $color-6;
                }
                .item-r {
                    flex: 1;
                    color: #333;
                }
            }
            .mt-20 {
                margin-top: 20px;
            }
        }
    }
</style>

<template>
    <scroller-base class="scroll">
        <div class="title">您当前登录的信息为：</div>
        <div class="info">
            <div class="item">
                <div class="item-l">机构名称：</div>
                <div class="item-r">{{userInfo.companyname}}</div>
            </div>
            <div class="item mt-20">
                <div class="item-l">机构账号：</div>
                <div class="item-r">{{userInfo.bindingusername}}</div>
            </div>
            <div class="item mt-20">
                <div class="item-l">老师姓名：</div>
                <div class="item-r">{{userInfo.bindingfullname}}</div>
            </div>
            <!-- <div style="width: 100px;height: 100px;background:red;" @click="a">解绑</div> -->
        </div>
        
    </scroller-base>
</template>

<script>
    import {userbinding, getuserinfo, userunbinding} from 'manage/api/index.js'

    export default {
        data() {
            return {
                wxTitle: '机构登录'
            }
        },
        computed: {
            ...Vuex.mapState(['userInfo', 'bindinginfo'])
        },
        methods: {
            a() {
                userunbinding().then(res => {
                    wx.miniProgram.reLaunch({
                        url:`/pages/index/index?binding=true`,
                        success: function(res){
                            // app.alert(res)
                        },
                        fail: function(){
                            app.alert('跳转失败，请刷新页面重试。');            
                        }
                    })
                })
            }
        }
    }
</script>