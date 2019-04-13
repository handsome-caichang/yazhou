<style scoped lang="scss">
    .wrapper {
        .scroll {
            @include position-absolute;
            background-color: #F7F7F7;
            .heard {
                width: 100%;
                padding-top: 100%;
                @include background-img('./img/hearder.png', cover);
            }
            .content {
                padding: 0 15px;
                .title {
                    color: $color-3;
                    font-size: 18px;
                    text-align: center;
                    margin-bottom: 10px;
                }
                .card {
                    position: relative;
                    margin-top: 15px;
                    height: 183px;
                    padding: 22px 53px 30px 53px;
                    border-radius: 4px;
                    background-color: #FBFFFF;
                    box-shadow:0px 0px 4px 0px rgba(16,77,161,0.12);
                    .img-l, .img-r {
                        position: absolute;
                        width: 44px;
                        height: 63px;
                        top: 15px;
                    }
                    .img-l {
                        left: 25px;
                    }
                    .img-r {
                        right: 25px;
                    }
                    .bg-1 {
                        @include background-img('./img/1.png', cover);
                    }
                    .bg-2 {
                        @include background-img('./img/2.png', cover);
                    }
                    .bg-3 {
                        @include background-img('./img/3.png', cover);
                    }
                    .bg-4 {
                        @include background-img('./img/4.png', cover);
                    }
                    .bg-5 {
                        @include background-img('./img/5.png', cover);
                    }
                    .bg-6 {
                        @include background-img('./img/6.png', cover);
                    }
                    .bg-7 {
                        @include background-img('./img/7.png', cover);
                    }
                    .tag-wrapper {
                        width: 100%;
                        height: 38px;
                        .tag {
                            width: 38px;
                            height: 38px;
                            margin: 0 auto;
                            font-size: 38px;
                        }
                    }
                    .name {
                        margin-top: 13px;
                        font-size: 14px;
                        color: $color-3;
                        text-align: center;
                    }
                    .info {
                        margin-top: 18px;
                        font-size: 12px;
                        color: $color-6;
                        text-align: center;
                    }
                }
            }
            .big-info {
                padding-top: 21px;
                text-align: center;
                color: $color-6;
                font-size: 18px;
            }
            .mt-24 {
                margin-top: 24px;
            }
            .line-wrapper {
                margin-top: 26px;
                height: 1px;
                .line {
                    width: 129px;
                    height: 1px;
                    margin: 0 auto;
                    // background-color: red;
                    position: relative;
                    .line-l, .line-r{
                        width: 59px;
                        height: 1px;
                        background-color: #E0E1EB;
                        position: absolute;
                    }
                    .line-l {
                        left: 0;
                    }
                    .line-r {
                        right: 0;
                    }
                    .line-m {
                        width: 4px;
                        height: 4px;
                        background-color: #E0E1EB;
                        position: absolute;
                        right: 62px;
                        top: -1px;
                    }
                }   
            }
            .qrCode-wrapper {
                margin-top: 32px;
                height: 129px;
                .qrCode {
                    width: 129px;
                    height: 129px;
                    margin: 0 auto;
                }
            }
            .xrx-text {
                margin-top: 9px;
                text-align: center;
                font-size: 16px;
                color: $color-3;
            }
            .bottom {
                margin-top: 16px;
                background-color: #333333;
                color: $color-white;
                padding: 30px 30px 16px 30px;
                .bottom-title {
                    font-size: 18px;
                    text-align: center;
                }
                .con-info {
                    font-size: 14px;
                    text-align: center;
                }
                .mt-20 {
                    margin-top: 20px;
                }
                .mt-10 {
                    margin-top: 10px;
                }
                .mt-50 {
                    margin-top: 50px;
                }
                .btn {
                    width: 100%;
                    margin-top: 30px;
                    height: 49px;
                    line-height: 49px;
                    text-align: center;
                    font-size: 18px;
                    background: linear-gradient(bottom, #7497E8, #A975FD);
                    border-radius: 20px;
                }
            }
        }

    }
</style>

<template>
    <div class="wrapper">
        <scroller-base class="scroll">
            <div class="heard"></div>
            <div class="content">
                <div class="title">校锐星能解决什么？</div>
                <div class="card">
                    <div class="img-r bg-1"></div>
                    <div class="tag-wrapper">
                        <div class="tag">
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#iconzhaoshengliqi"></use> 
                            </svg>
                        </div>
                    </div>
                    <div class="name">招生利器“妙招生”</div>
                    <div class="info">拼团、砍价、微官网、微传单等热门活动模板及时更新，帮助机构一键策划优惠活动，裂变招生，获取海量生源。</div>
                </div>
                <div class="card">
                    <div class="img-l bg-2"></div>
                    <div class="tag-wrapper">
                        <div class="tag">
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#iconyixiangkehu"></use> 
                            </svg>
                        </div>
                    </div>
                    <div class="name">意向客户管理</div>
                    <div class="info">意向客户信息管理、意向客户沟通轨迹、销售漏斗、公海私库、线索收集、线索转化、用户跟进、用户转化、数据分析</div>
                </div>
                <div class="card">
                    <div class="img-r bg-3"></div>
                    <div class="tag-wrapper">
                        <div class="tag">
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#iconqiantaiyewu"></use> 
                            </svg>
                        </div>
                    </div>
                    <div class="name">前台业务管理</div>
                    <div class="info">学生档案管理、学生积分管理、收费管理、收据打印、退费管理、学费结转、电子账户管理、收款账号管理、续费管理</div>
                </div>
                <div class="card">
                    <div class="img-l bg-4"></div>
                    <div class="tag-wrapper">
                        <div class="tag">
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#iconrenshiguanli"></use> 
                            </svg>
                        </div>
                    </div>
                    <div class="name">人事管理</div>
                    <div class="info">部门设置、员工信息管理、系统权限设置</div>
                </div>
                <div class="card">
                    <div class="img-r bg-5"></div>
                    <div class="tag-wrapper">
                        <div class="tag">
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#iconjiaowuguanli"></use> 
                            </svg>
                        </div>
                    </div>
                    <div class="name">教务管理</div>
                    <div class="info">课程设置、班级管理、排课管理、排课时段查询、排课资源冲突检测、报名选座</div>
                </div>
                <div class="card">
                    <div class="img-l bg-6"></div>
                    <div class="tag-wrapper">
                        <div class="tag">
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#iconbaobiaofenxi"></use> 
                            </svg>
                        </div>
                    </div>
                    <div class="name">报表分析</div>
                    <div class="info">收费统计报表、课消统计报表、出勤率报表、满班率报表、升班率报表</div>
                </div>
                <div class="card">
                    <div class="img-r bg-7"></div>
                    <div class="tag-wrapper">
                        <div class="tag">
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#iconjiaxiaogoutong"></use> 
                            </svg>
                        </div>
                    </div>
                    <div class="name">家校沟通</div>
                    <div class="info">上课通知、课后作业、家校互评、学校公告、到校离校消息通知</div>
                </div>
            </div>
            <div class="big-info mt-24">万家机构教育品牌依赖</div>
            <div class="big-info">十万校长教师招生营销</div>
            <div class="big-info">百万家长学生上课使用</div>
            <div class="line-wrapper">
                <div class="line">
                    <div class="line-l"></div>
                    <div class="line-m"></div>
                    <div class="line-r"></div>
                </div>
            </div>
            <!-- <div class="qrCode-wrapper">
                <div class="qrCode">
                    <img src="./img/qrCode.png" style="width:100%;height:100%" @click="prew">
                </div>
            </div> -->
            <!-- <div class="xrx-text">校锐星官方微信</div> -->
            <div class="bottom">
                <div class="bottom-title">联系我们</div>
                <div class="con-info mt-20">联系地址：湖南省长沙市岳麓区芯城科技园1栋20楼</div>
                <div class="con-info mt-10">售前电话：188-9001-9530</div>
                <div class="con-info mt-10">加盟热线：136-0042-0831</div>
                <div class="con-info mt-50">版权所有&#169;长沙市校管家教育科技有限公司 </div>
                <div class="con-info">2018-2019 湘ICP备18009540号-2</div>
                <div class="btn" @click="aaa">我要开通校锐星</div>
                <!-- <a class="btn" target="_blank" href="http://trialapply.xrx100.com/html/apply/smartapply.html?sid=MZS">我要开通校锐星</a> -->
            </div>
        </scroller-base>
        <apply-taste :opened.sync="showApplyTaste"></apply-taste>
    </div>
</template>

<script>
    import ApplyTaste from './child/applyTaste.vue'
    export default {
        data() {
            return {
                wxTitle: '校锐星介绍',
                showApplyTaste: false
            }
        },
        methods: {
            aaa (){
                window.location.href='https://trialapply.xiaogj.com/html/apply/mzsApply.html?sid=MZS'
            }
        },
        components: {
            ApplyTaste
        }
    }
</script>