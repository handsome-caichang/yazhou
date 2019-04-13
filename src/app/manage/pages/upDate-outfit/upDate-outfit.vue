<style lang="scss" scoped>
    .scroll {
        @include position-absolute;
        .heard {
            width: 100%;
            padding-top: 35px;
            background: linear-gradient(right, #0F143E, #12103F);
            .heard-text {
                height: 44px;
                width: 100%;
                padding: 0 16px;
                padding-bottom: 20px;
                .text-wrapper {
                    @include flex-between;
                    padding: 0 22px;
                    width: 100%;
                    // height: 100%;
                    height: 44px;
                    background:rgba(58,68,146,0.5);
                    border-radius: 44px;
                    color: #D3D3D3;
                    font-size: 15px;
                }
            }
        }
        .img-heard {
            // @include dynamic-wh(411px, 1.1);
            width: 100%;
            padding-top: 110%;
            @include background-img('./img/1.png', cover);
        }
        .mid {
            height: 84px;
            background: linear-gradient(bottom, #10123E, #3A4492);
            padding: 0 57px;
            .btn-text {
                height: 44px;
                line-height: 44px;
                text-align: center;
                font-size: 16px;
                color: #A75D0C;
                border-radius: 43px;
                background: linear-gradient(bottom, #FFD057, #FFFAA7);
            }
            .accourd-text {
                margin-top: 12px;
                text-align: center;
                font-size: 15px;
                color: #FFFFFF;
            }
        }
        .btm {
            height: 688px;
            background: linear-gradient(right, #0F143E, #12103F);
            padding: 24px 15px 0 15px;
            .btm-title {
                width: 100px;
                margin: 0 auto;
                .big-title {
                    position: relative;
                    font-size: 18px;
                    color: #FFEED9FF;
                    text-align: center;
                    .title-l, .title-r {
                        width: 20px;
                        height: 1px;
                    }
                    .title-l {
                        @include position-absolute(12px, -22px, false, false);
                        background: linear-gradient(right, #0F143E, #FFFFFF);
                    }
                    .title-r {
                        @include position-absolute(12px, false, false, -22px);
                        background: linear-gradient(right, #FFFFFF, #0F143E);
                    }
                }
                .small-title {
                    font-size: 13px;
                    color: #D5D6DBFF;
                    text-align: center;
                    margin-top: 8px;
                }
            }
            .item {
                margin-top: 14px;
                height: 117px;
                border-radius: 4px;
                background-color: #131D56;
                padding: 34px 10px 23px 18px;
                @include flex-between;
                .item-l {
                    width: 95px;
                    // height: 60px;
                    // @include dynamic-wh(95px, 0.58);
                    // height: 55px;
                    // background-color: #f00;
                }
                .bg-1 {
                    @include background-img('./img/2.png', cover);
                }
                .bg-2 {
                    @include background-img('./img/3.png', cover);
                }
                .item-r {
                    flex: 1;
                    margin-left: 19px;
                    .item-title {
                        font-size: 14px;
                        color: #E9E9E9;
                    }
                    .item-info {
                        font-size: 12px;
                        margin-top: 9px;
                        color: #AEBCDB;
                    }
                }
            }
        }
    }
</style>

<template>
    <scroller-base class="scroll">
        <div class="heard">
            <div class="heard-text" @click="goIntroduct">
                <div class="text-wrapper">
                    <div class="text-l">
                        <svg class="icon" aria-hidden="true">
                           <use xlink:href="#iconyifenzhongliaojie"></use> 
                        </svg>
                        一分钟了解机构版
                    </div>
                    <div class="text-r">
                        <svg class="icon" aria-hidden="true">
                           <use xlink:href="#iconjiantou"></use> 
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="img-heard"></div>   
        <div class="mid">
            <div class="btn-text" @click="changePage">申请开通机构版</div>
            <div class="accourd-text" @click="bindsXrx">已开通校锐星，去绑定
                <svg class="icon" aria-hidden="true">
                   <use xlink:href="#iconjiantou"></use> 
                </svg>
            </div>
        </div>
        <div class="btm">
            <div class="btm-title">
                <div class="big-title">
                    <div class="title-l"></div>
                    <div class="title-r"></div>
                    机构版权益
                </div>
                <div class="small-title">400-800-5291</div>
            </div>
            
            <div class="item">
                <img src="./img/2.png" class="item-l">
                <div class="item-r">
                    <div class="item-title">管理轻松、精准报表</div>
                    <div class="item-info">轻松教务管理、核心财务、数据分析 一键导出</div>
                </div>
            </div>
            <div class="item">
                <img src="./img/3.png" class="item-l">
                <div class="item-r">
                    <div class="item-title">家校互联、一触即达</div>
                    <div class="item-info">家长与老师间无障碍沟通、查看课表、 作业、点评</div>
                </div>
            </div>
            <div class="item">
                <img src="./img/4.png" class="item-l">
                <div class="item-r">
                    <div class="item-title">精准营销、快速导流</div>
                    <div class="item-info">砍价、拼团、积分、裂变传播、快速 招生</div>
                </div>
            </div>
            <div class="item">
                <img src="./img/5.png" class="item-l" style="width:88px;margin-right: 7px;">
                <div class="item-r">
                    <div class="item-title">专属运营、VIP服务</div>
                    <div class="item-info">专属客服、VIP一对一全程跟进指导 服务</div>
                </div>
            </div>
            
        </div>
    </scroller-base>
</template>

<script>
    export default {
        data() {
            return {
                wxTitle: '升级机构版'

            }
        },
        methods: {
            changePage() {
                window.location.href='https://trialapply.xiaogj.com/html/apply/mzsApply.html?sid=MZS'
            },
            goIntroduct() {
                this.$router.push('/introductXrx')
            },
            bindsXrx() {
                this.$router.push('/bindsXrx')
            }
        }
    }
</script>