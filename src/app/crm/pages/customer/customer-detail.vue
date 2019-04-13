<!-- 客户详情 -->
<style scoped lang="scss">  
    .common-detail-container {
        .fixed-tab {
            display: none;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 9999999;
            height: 44px;
            font-size: 14px;
            color: $color-9;
            line-height: 44px;
            border-bottom: 1px solid $color-assist-1;
            background-color: $color-white;
            &.show {
                display: flex;
            }
            .tab-card {
                flex: 1;
                text-align: center;
                &.active {
                    color: $color-primary;
                    border-bottom: 1px solid #5991FF;
                }
            }
        }
        .list-body {
            @include position-absolute(0, 0, 0, 0);
            &.bottom-distance {
                bottom: 52px;
            }
            .scroller {
                overflow: hidden;
                background-color: $color-white;
                @include position-absolute;
                .data-head {
                    .heard {
                        height: 217px;
                        background-color: #4B77AF;
                        color: $color-white;
                        position: relative;
                        padding-top: 12px;
                        &.lessen {
                            height: 134px;
                        }
                        .tip {
                            position: absolute;
                            top: 9px;
                            right: 0px;
                            font-size: 12px;
                            @include flex-between;
                            padding: 0 6px;
                            height: 26px;
                            border-top-left-radius: 26px;
                            border-bottom-left-radius: 26px;
                            background-color: #6A98C6;
                            .icon-box{
                                width: 15px;
                                margin-right: 6px;
                                margin-top: 1px;
                                .icon{
                                    font-size: 15px;
                                }
                            }
                            .statu{
                                max-width: 50px;
                                @include ellipsis-single;
                            }

                        }
                        .name {
                            font-size: 20px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            font-weight: bold;
                            max-width: 45%;
                            margin: 0 auto;
                            margin-bottom: 12px;
                            @include ellipsis-single;
                        }
                        .level {
                            margin-bottom: 14px;
                            text-align: center;
                            height: 20px;
                            line-height: 20px;
                            font-size: 20px;
                            .icon {
                                color: #5B9ADB;
                                margin-right: 10px;
                                font-size: 17px;
                                &.active {
                                    color: #FFD427;
                                }
                            }
                        }
                        .tel-wrapper {
                            text-align: center;
                            font-size: 13px;
                            height: 14px;
                            line-height: 14px;
                            color: $color-white;
                            letter-spacing: 0.5px;
                        }
                        .info {
                            margin-top: 10px;
                            height: 12px;
                            line-height: 12px;
                            text-align: center;
                            color:#A2C3E1;
                            .text, .source {
                                display: inline-block;
                                font-size: 12px;
                            }
                            .source {
                                margin-left: 10px;
                            }
                        }
                        .bottom {
                            margin-top: 15px;
                            position: relative;
                            .scend-wrapper {
                                position: absolute;
                                left: 50%;
                                transform: translateX(-50%);
                                display: flex;
                                .content {
                                    width: 70px;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    .phone {
                                        color: $color-white;
                                        text-decoration: none;
                                    }
                                    .icon-wrapper {
                                        text-align: center;
                                        width: 44px;
                                        height: 44px;
                                        line-height: 44px;
                                        background-color: $color-white;
                                        border-radius: 44px;
                                        font-size: 20px;
                                        margin-bottom: 6px;
                                    }
                                    .icon-text {
                                        font-size: 12px;
                                        height: 12px;
                                        line-height: 12px;
                                        text-align: center;
                                        color:#C4D6E8;
                                    }
                                }
                            }
                        }
                    }
                    .void {
                        height: 10px;
                        background-color: $color-assist-1;
                    }
                    .tab {
                        height: 44px;
                        display: flex;
                        font-size: 14px;
                        color: $color-9;
                        line-height: 44px;
                        background-color: $color-white;
                        border-bottom: 1px solid $color-assist-1;
                        .tab-card {
                            flex: 1;
                            text-align: center;
                            border-bottom: 1px solid transparent;
                            &.active {
                                color: $color-primary;
                                border-bottom: 1px solid #5991FF;
                            }
                        }
                    }
                }
                .data-body {
                    &.noData-bg {
                    }
                    .communite-card {
                        border: 1px solid $color-assist-1;
                        border-radius: 6px;
                        padding: 28px 16px 28px 72px;
                        position: relative;
                        margin: 9px 12px;
                        .head-img {
                            width: 40px;
                            height: 40px;
                            border-radius: 40px;
                            position: absolute;
                            top: 27px;
                            left: 16px;
                            border: 1px solid $color-assist-1;
                            background-color: $color-assist-1;
                            @include background-img(false,cover);
                        }
                        .card-rt {
                            display: flex;
                            flex-direction: column;
                            .name-date {
                                @include flex-between;
                                height: 13px;
                                line-height: 13px;
                                color: $color-6;
                                margin-bottom: 9px;
                                .name {
                                    font-size: 13px;
                                }
                                .record-date {
                                    font-size: 12px;
                                    .date {
                                        color: #AAAAAA;
                                        &.isToday {
                                            color: $color-primary;
                                        }
                                    }
                                }
                            }
                            .content {
                                color: $color-9;
                                font-size: 13px;
                                @include ellipsis-multi(2);
                                margin-bottom: 11px;
                            }
                            .next-date {
                                font-size: 12px;
                                color: #AAAAAA;
                                .date {
                                    color: $color-6;
                                }
                            }
                        }
                    }
                    .void{
                        height: 1px;
                    }
                    .invite-card {
                        padding: 20px 16px;
                        border-bottom: 1px solid $color-assist-1;
                        .title {
                            font-size: 16px;
                            color: $color-3;
                            margin-bottom: 20px;
                        }
                        .item {
                            height: 13px;
                            line-height: 13px;
                            @include flex-between;
                            margin-top: 12px;
                            .value {
                                color: $color-9;
                            }
                            .val {
                                color: $color-3;
                            }
                            &.visited-check {

                                position: relative;
                                .val {
                                    position: absolute;
                                    right: 0;
                                    top: -9px;
                                    font-size: 28px;
                                }

                            }
                        }

                    }
                    .info-box {
                        .item {
                            @include flex-between;
                            height: 49px;
                            line-height: 49px;
                            padding: 0 16px;
                            border-bottom: 1px solid $color-assist-1;
                            .value {
                                width: 100px;
                                font-size: 13px;
                                color: $color-9;
                            }
                            .val {
                                flex: 1;
                                text-align: right;
                                font-size: 15px;
                                color: $color-3;
                                @include ellipsis-single;
                            }
                        }

                    }
                }

            }
        }

    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 5px 10px 6px;
        border-top: 1px solid $color-assist-1;
        background-color: $color-white;
        .submit-btn {
            font-size: 17px;
            color: $color-white;
            text-align: center;
            background-color: #5991FF;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
        }
        .invite {
            background-color: #00CE7D;
        }
    }

    .noData-temp {
        padding-top: 30px;
    }

    .loading, .as-datetime {
        @include position-absolute;
    }

</style>

<template>
    <div class="common-detail-container">
        <div class="fixed-tab" :class="{show:showfixedTab}">
            <div class="tab-card"
                 v-for="(item,index) in tabList"
                 :class="{'active': activeIndex==index}"
                 @click="changeTab(index)">{{item.text}}
            </div>
        </div>
        <!-- 内容部分 -->
        <div class="list-body" :class="{'bottom-distance':dataObj.followstatus!=2}">
            <scroller-load
                    class="scroller"
                    :type="1"
                    :data="renderData"
                    :enable="enable"
                    :options="{probeType:3}"
                    :pagingOption="scrollerOptions"
                    @loadData="loadData"
                    ref="studentInfoScroller">

                <!--蓝色背景个人信息-->
                <div class="data-head">
                    <div class="heard" :class="{'lessen':dataObj.followstatus==1}">
                        <!--只有认领时高度变小↑-->
                        <div class="tip" v-if="dataObj.followstatus==5">
                            <div class="icon-box">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zhuanhuachenggong"></use>
                                </svg>
                            </div>
                            <div class="statu">转化成功</div>
                        </div>
                        <div class="tip" v-if="dataObj.followstatus!=5&&dataObj.statusname!=''&&dataObj.statusname!=null">
                            <div class="icon-box">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yixiangkehu"></use>
                                </svg>
                            </div>
                            <div class="statu">{{dataObj.statusname}}</div>
                        </div>
                        <div class="name">
                            {{dataObj.name}}
                        </div>
                        <div class="level">
                            <svg class="icon" aria-hidden="true" v-for="i in 5"
                                 :class="{'active':dataObj.intentionallevel>=i}">
                                <use xlink:href="#icon-wuxing"></use>
                            </svg>
                        </div>
                        <div class="tel-wrapper" v-if="dataObj.mobile">
                            {{dataObj.mobile.slice(0, 3)}}&nbsp{{dataObj.mobile.slice(3, 7)}}&nbsp{{dataObj.mobile.slice(7, 11)}}
                        </div>
                        <div class="info">
                            <span class="text">
                                <svg aria-hidden="true" class="icon">
                                    <use xlink:href="#icon-laiyuan"></use>
                                </svg>    
                            </span>
                            <span class="source">{{dataObj.source&&dataObj.source.name}}</span>
                        </div>
                        <!--操作项-->
                        <div class="bottom" v-if="dataObj.followstatus!=1">
                            <!--公海无操作项-->
                            <div class="scend-wrapper">
                                <div class="content">
                                    <a :href="'tel:'+dataObj.mobile" class="icon-wrapper">
                                        <svg class="icon">
                                            <use xlink:href="#icon-bohao-xiangqingye"></use>
                                        </svg>
                                    </a>
                                    <div class="icon-text">
                                       电话
                                    </div>
                                </div>
                                <!-- <div class="content">
                                    <div class="icon-wrapper" @click="chat()">
                                        <svg class="icon">
                                            <use xlink:href="#icon-faqiliaotian--xiangqingye"></use>
                                        </svg>
                                    </div>
                                    <div class="icon-text">发起聊天</div>
                                </div> -->
                                <!-- 转为客户 -->
                                <div class="content" v-if="dataObj.followstatus==2">
                                    <div class="icon-wrapper" @click="trans(0)">
                                        <svg class="icon">
                                            <use xlink:href="#icon-zhuanweikehu-xiangqingye"></use>
                                        </svg>
                                    </div>
                                    <div class="icon-text">转为客户</div>
                                </div>
                                <!-- 试听 -->
                                <div class="content" v-if="dataObj.followstatus==3">
                                    <div class="icon-wrapper" @click="trans(1)">
                                        <svg class="icon">
                                            <use xlink:href="#icon-zhuanweishiting-xiangqingye"></use>
                                        </svg>
                                    </div>
                                    <div class="icon-text">转为试听</div>
                                </div>
                                <!-- 正式 -->
                                <div class="content" v-if="(dataObj.followstatus==3)||(dataObj.followstatus==4)">
                                    <div class="icon-wrapper" @click="trans(2)">
                                        <svg class="icon">
                                            <use xlink:href="#icon-zhuanweizhengshi-xiangqingye"></use>
                                        </svg>
                                    </div>
                                    <div class="icon-text">转为正式</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="void"></div>
                    <div class="tab">
                        <div class="tab-card"
                             v-for="(item,index) in tabList"
                             :class="{'active': activeIndex==index}"
                             @click="changeTab(index)">{{item.text}}
                        </div>
                    </div>
                </div>

                <!--沟通记录 邀约记录 学员资料-->
                <div class="data-body" ref="tabView" :class="{'noData-bg':(activeIndex!==2)&&list.length == 0}">
                    <!--沟通记录-->
                    <div class="communite-card" v-show="activeIndex==0" v-for="item in list" :key="item.id"
                         @click="goToCommunicationDetail(item)">
                        <div class="card-lf">
                            <div class="head-img" :style="'background-image:url('+item.customermanagerinfo.photourl+')'"></div>
                        </div>
                        <div class="card-rt">
                            <div class="name-date">
                                <div class="name">{{item.customermanagerinfo&&item.customermanagerinfo.name}}</div>
                                <div class="record-date">
                                    <!-- <span class="date">今天</span> -->
                                    {{item.followtime&&item.followtime.substring(0,16)}}
                                </div>
                            </div>
                            <div class="content">{{item.content}}</div>
                            <div class="next-date">
                                <svg aria-hidden="true" class="icon">
                                    <use xlink:href="#icon-xiacigenjin"></use>
                                </svg>
                                下次跟进
                                <span class="date">{{item.nextfollowtime&&item.nextfollowtime.substring(0,10)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="void" v-show="activeIndex==0"></div>
                    <!--邀约记录-->
                    <div class="invite-card" v-show="activeIndex==1" v-for="(item,index) in list" :key="index">
                        <div class="title">{{item.promisevisittypename}}</div>
                        <div class="item">
                            <div class="describe">承诺到访</div>
                            <div class="val">{{item.promisevisittime&&item.promisevisittime.substring(0,16)}}</div>
                        </div>
                        <div class="item" v-show="item.isvisit == 1">
                            <div class="describe">实到到访</div>
                            <div class="val">{{item.actualvisittime&&item.actualvisittime.substring(0,16)}}</div>
                        </div>
                        <div class="item" v-if="item.isvisit==1&&dataObj.followstatus>2">
                            <div class="describe">到访确认</div>
                            <div class="val">
                                <svg aria-hidden="true" class="icon">
                                    <use xlink:href="#icon-zhengque"></use>
                                </svg>
                                已到访
                            </div>
                        </div>
                        <div class="item visited-check" v-if="item.isvisit==0&&dataObj.followstatus>2">
                            <div class="describe">到访确认</div>
                            <div class="val " @click="selectVisitedDate(item)">
                                <svg aria-hidden="true" class="icon">
                                    <use xlink:href="#icon-kaiguan"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="item" v-if="dataObj.followstatus<3">
                            <div class="describe">到访确认</div>
                            <div class="val">
                                未到访
                            </div>
                        </div>

                    </div>

                    <!--学员资料-->
                    <div class="info-box" v-show="activeIndex==2">
                        <!--创建人-->
                        <div class="item">
                            <div class="describe">创建人</div>
                            <div class="val">{{dataObj.createusername}}</div>
                        </div>
                        <!--主责任人-->
                        <div class="item">
                            <div class="describe">主责任人</div>
                            <div class="val">{{dataObj.main_p}}</div>
                        </div>
                        <!--副负责人-->
                        <div class="item">
                            <div class="describe">副负责人</div>
                            <div class="val">{{dataObj.ass_p}}</div>
                        </div>
                        <div class="void"></div>
                        <!--所属校区-->
                        <div class="item">
                            <div class="describe">所属校区</div>
                            <div class="val">{{dataObj.campus&&dataObj.campus.name}}</div>
                        </div>
                        <!--关联微信号-->
                        <!-- <div class="item">
                            <div class="describe">关联微信号</div>
                            <div class="val" v-if="dataObj.wxuserid!=''">已关联</div>
                            <div class="val" v-else>未关联</div>
                        </div> -->
                        <!--性别-->
                        <div class="item">
                            <div class="describe">性别</div>
                            <div class="val" v-if="dataObj.sex==0"></div>
                            <div class="val" v-if="dataObj.sex==1">男</div>
                            <div class="val" v-if="dataObj.sex==2">女</div>
                        </div>
                        <!--出生年月-->
                        <div class="item">
                            <div class="describe">出生日期</div>
                            <div class="val">{{dataObj.birthday}}</div>
                        </div>
                        <!--身份证号-->
                        <div class="item">
                            <div class="describe">身份证号</div>
                            <div class="val">{{dataObj.identification}}</div>
                        </div>
                        <!--QQ-->
                        <div class="item">
                            <div class="describe">QQ号码</div>
                            <div class="val">{{dataObj.qq}}</div>
                        </div>
                        <!-- 英文姓名 -->
                        <div class="item">
                            <div class="describe">英文姓名</div>
                            <div class="val">{{dataObj.englishname}}</div>
                        </div>
                        <!--公立学校-->
                        <div class="item">
                            <div class="describe">公立学校</div>
                            <div class="val">{{dataObj.publicschool&&dataObj.publicschool.name}}</div>
                        </div>
                        <!--年级-->
                        <div class="item">
                            <div class="describe">年级</div>
                            <div class="val">{{dataObj.grade&&dataObj.grade.name}}</div>
                        </div>
                        <!--班级-->
                        <div class="item">
                            <div class="describe">班级</div>
                            <div class="val">{{dataObj.classname}}</div>
                        </div>
                        <div class="item">
                            <div class="describe">父亲电话</div>
                            <div class="val">{{dataObj.fathermobile}}</div>
                        </div>
                        <div class="item">
                            <div class="describe">父亲姓名</div>
                            <div class="val">{{dataObj.fathername}}</div>
                        </div>
                        <div class="item">
                            <div class="describe">父亲职业</div>
                            <div class="val">{{dataObj.fatherjob}}</div>
                        </div>
                        <div class="item">
                            <div class="describe">母亲电话</div>
                            <div class="val">{{dataObj.mothermobile}}</div>
                        </div>
                        <div class="item">
                            <div class="describe">母亲姓名</div>
                            <div class="val">{{dataObj.mothername}}</div>
                        </div>
                        <div class="item">
                            <div class="describe">母亲职业</div>
                            <div class="val">{{dataObj.motherjob}}</div>
                        </div>
                        <div class="item">
                            <div class="describe">家庭电话</div>
                            <div class="val">{{dataObj.familymobile}}</div>
                        </div>
                        <div class="item">
                            <div class="describe">家庭住址</div>
                            <div class="val">{{dataObj.familyaddress}}</div>
                        </div>


                    </div>
                    <empty-page class="noData-temp" :type="1"
                                v-if="(activeIndex!==2)&&list.length == 0"></empty-page>
                </div>

            </scroller-load>
        </div>
        <div class="footer" v-if="dataObj.followstatus==3||dataObj.followstatus==4||dataObj.followstatus==5">
            <div class="submit-btn" v-show="activeIndex==0" @click="addCom">添加沟通记录</div>
            <div class="submit-btn invite" v-show="activeIndex==1" @click="addVis">邀约</div>
            <div class="submit-btn" v-show="activeIndex==2" @click="editMsg">编辑客户资料</div>
        </div>
        <div class="footer" v-if="dataObj.followstatus==1">
            <div class="submit-btn" @click="cliam">认领</div>
        </div>
        <loading class="loading" v-show="isLoading" :isDefault="false"></loading>
    </div>

</template>

<script>
    import {
        getCommunicateRecordList,
        getCustomerDetail,
        getOpCustomerCommunicateRecordInfo,
        setCommunicateRecordIsvisit,
        turnCustomer
    } from "crm/api/ldj.js";
    import {claimCustomer, becomeFormalStudent,bindWechat} from 'crm/api/yy.js'
    import EmptyPage from 'crm/components/empty-page/empty-page';
    export default {
        name: 'comment-list',
        data() {
            return {
                wxTitle: "客户详情页",
                isLoading: true,
                refreshNum: 0,
                activeIndex: 0,     //tab高亮 默认高亮
                fixtebDistance:-225, //固定头部出现的距离
                tabList: [{
                    text: '沟通记录'
                }, {
                    text: '邀约记录'
                }, {
                    text: '学员资料'
                }],
                pagingOptionList: [
                    {
                        api: getCommunicateRecordList,
                        params: {
                            invitetype: 2,
                            customerid: this.$route.params.id
                        },

                    },
                    {
                        api: getCommunicateRecordList,
                        params: {
                            invitetype: 1,
                            customerid: this.$route.params.id
                        },
                    }

                ],
                customerid: this.$route.params.id,
                showfixedTab: false,       //tab卡是否固定在页头
                enable:true,               //scroller-load第一次是否加载
                scrollerOptions: {},       //滚动组件参数 请求，请求参数，分页参数
                list: [],                  //渲染所需的列表
                dataObj: {},               //渲染所需的对象
                openDatePlu: false,        //选择时间开关
                mustVistTime: ''
            }
        },
        computed: {
            judgeIsToday(time) {
                let flag = time.indexOf(this.formatDate(new Date(), 'yyyy-MM-dd')) !== -1;
                return flag
            },
            renderData(){
                return{
                    list:this.list,
                    dataObj:this.dataObj,
                    refreshNum:this.refreshNum
                }
            }
        },
        methods: {
            //触发上层页面刷新
            launch() {
                app.event.emit('refreshList');
            },
            // 详情
            goToCommunicationDetail(item) {
                this.$router.push({path: `/communicationDetail/${item.id}`})
            },
            //添加沟通记录
            addCom() {
                // followstatus 为5表示转化成功 转化成功的客户添加沟通记录时不能更改状态
                this.$router.push({path: `/communicationAdd/${this.customerid}/${this.dataObj.followstatus}`})
            },
            //邀约
            addVis() {
                this.$router.push({path: `/InviteCustomer/${this.customerid}`})
            },
            // 列表数据加载
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        // 通过是否有分页参数区分
                        if (res.page.pageindex === 1) {
                            this.list = [];
                        }
                        this.list = this.list.concat(res.data);
                    }
                })

            },
            // 操作项
            trans(flag) {
                // this.isLoading = true;
                let optArr = [{
                    title: '确定将该学员转为正式学员？',
                    text: '转为正式学员后，不可对其进行逆向操作',
                    textStyle: {
                        textAlign: 'center',
                        color: '#999',
                        fontSize: '13px'
                    }
                }];

                if (flag == 0) {
                    //转为客户
                    turnCustomer({
                        customerid: this.customerid,
                        status: 3
                    }).then(res => {
                        this.isLoading = false;
                        if (res.result.code === app.errok) {
                            this.launch();
                            app.toast('success', '转化成功');
                            this.getData();
                        } else {
                            app.toast('error', res.result.msg)
                        }
                    })

                } else if (flag == 1) {
                    //转为试听
                    becomeFormalStudent({
                        customerid: this.customerid,
                        status: 4
                    }).then(res => {
                        this.isLoading = false;
                        if (res.result.code === app.errok) {
                            this.launch();
                            app.toast('success', '转化成功');
                            this.getData();
                        } else {
                            app.toast('error', res.result.msg)
                        }
                    })
                } else if (flag == 2) {
                    // 转为正式
                    app.confirm(optArr[0]).then(res => {
                        if (res) {
                            becomeFormalStudent({
                                customerid: this.customerid,
                                status: 5
                            }).then(res => {
                                this.isLoading = false;
                                if (res.result.code === app.errok) {
                                    this.launch();
                                    app.toast('success', '转化成功');
                                    this.getData();
                                } else if(res.result.code==510){
                                    app.toast('info', res.result.msg)
                                }else{
                                    app.toast('error', res.result.msg)
                                }
                            })
                        } else {
                            this.isLoading = false;
                        }

                    })
                }

            },
            //聊天
            /*chat(){
                this.juggBindWx();
            },*/
            /*openChat(wxuserid){
                wx.openEnterpriseChat({
                    externalUserIds: wxuserid, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
                    groupName: '', // 必填，会话名称。单聊时该参数传入空字符串""即可。
                    success: function(res) {
                        console.log(res)
                    },
                    fail: function(res) {
                        app.toast('info', res)
                        if (res.errMsg.indexOf('function not exist') > -1) {
                            alert('版本过低请升级')
                        }
                    }
                })
            },*/
            //判断是否绑定微信
            /*juggBindWx() {
                let wxuserid = this.dataObj.wxuserid;
                if (wxuserid=='') {
                    app.confirm({
                        title: "提示",
                        text: '该客户没有关联企业微信外部联系人',
                        btns: [{
                            text: '取消',
                            style: {color: '#333'},
                            action: false // 'cancel'
                        }, {
                            text: '前往关联',
                            style: {color:'#5991FF'},
                            action: true // 'confirm'
                        }]
                    }).then(res => {
                        if (res) {
                            wx.invoke('selectExternalContact', {
                                "filterType": 0
                            }, (res) => {
                                if (res.err_msg == "selectExternalContact:ok") {
                                    wxuserid = res.userIds[0];
                                    this.openChat(wxuserid);
                                    bindWechat({
                                        customerid: this.customerid,
                                        wechatuserId: wxuserid,
                                        wechat: ''
                                    }).then(res => {
                                        if (res.result.code == app.errok) {
                                            this.getData()
                                        } else {
                                            app.toast('info', res.result.msg)
                                        }
                                    })
                                } else {
                                    //错误处理
                                }
                            });
                        }
                    })
                } else {
                    this.openChat(wxuserid)
                }
            },*/
            //认领
            cliam() {
                claimCustomer({customerid: this.customerid}).then(res => {
                    this.isLoading = false;
                    if (res.result.code === app.errok) {
                        this.launch();
                        app.toast('sucess', '认领成功');
                        this.$router.back();
                    } else if(res.result.code == 510){
                        app.toast('info', res.result.msg);
                    }else{
                        app.toast('error', res.result.msg);
                    }
                })
            },
            //编辑学员资料
            editMsg() {
                app.ls.setStorage('customerDetailMsg', this.dataObj);
                this.$router.push({path: `/editCustomer/${this.customerid}/2`})
            },
            // tab卡置在页头
            scrollFixTab(num) {
                this.showfixedTab = this.fixtebDistance > num ? true : false;
            },
            // tab选择
            changeTab(n) {
                // 避免重复请求
                if(this.activeIndex == n){
                    return
                }
                this.isLoading = true;
                this.activeIndex = n;//tab显示

                if (n == 0) {
                    this.enable = true;
                    this.scrollerOptions = this.pagingOptionList[0];
                    this.$refs.studentInfoScroller.transPaging();
                } else if (n == 1) {
                    this.enable = true;
                    this.scrollerOptions = this.pagingOptionList[1];
                    this.$refs.studentInfoScroller.transPaging();
                } else if (n == 2) {
                    this.enable = false;
                    this.isLoading = false;
                    this.refreshNum++
                }
                this.$nextTick(() => {
                    //不置顶导致 切换tab时加载中在页面底部
                    // this.$refs.studentInfoScroller.scroller.scrollTo(0, 0);
                    // this.showfixedTab = false; //scrollTo是不被scroll事件监听到的，所以要手动去掉头部固定
                    if(this.showfixedTab){
                        //固定头部展示
                        this.$refs.studentInfoScroller.scroller.scrollTo(0, -226);//多1px
                    }
                });
            },
            // 选择实到访日
            selectVisitedDate(item) {
                let para = item;
                app.datetimePicker({format: 'YYYY-MM-DD HH:mm'}).then(res => {
                    this.mustVistTime = res;
                    if (res !== '') {
                        this.submitVisitDate(para);
                    }
                })
            },
            //手动修改到访时间提交
            submitVisitDate(item) {
                let params = {
                    communicateid: item.id,//记录id
                    isvisit: 1,
                    actualvisittime: ''//实到访日
                };
                params.actualvisittime = this.mustVistTime;

                setCommunicateRecordIsvisit(params).then(res => {
                    if (res.result.code == app.errok) {
                        app.toast('success', '修改成功');
                        this.handle();
                    } else {
                        app.toast('error', res.result.msg);
                    }
                })
            },
            //获取学员资料
            getData() {
                let params = {
                    "customerid": this.customerid
                };
                getCustomerDetail(params).then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        let mainp = '', asp = [];
                        let ls = res.data.liablepersons;
                        ls.forEach((item) => {
                            if (item.ismaster == 1) {
                                mainp = item.name;
                            } else {
                                asp.push(item.name)
                            }
                        });
                        res.data.main_p = mainp;
                        res.data.ass_p = asp.join(' ');
                        this.dataObj = res.data;
                    } else {
                        this.dataObj = {};
                    }
                })
            },
            //处理下一层页面需要触发的操作
            handle() {
                if(this.activeIndex==2){
                    this.getData();
                }else{
                    this.getData(); //状态改变之后需要重新加载数据
                    this.scrollerOptions = this.pagingOptionList[this.activeIndex];
                    this.$refs.studentInfoScroller.transPaging();
                }
            }
        },
        created() {
            // this.customerid = this.$route.params.id;
            this.fixtebDistance=this.$route.params.followstatus==1?-142:-225;
            this.scrollerOptions = this.pagingOptionList[0];
            this.getData();
        },
        mounted() {
            // 最小高度的赋值 避免在数据极少的情况出现页面问题
            if (this.$route.params.followstatus == 1||this.$route.params.followstatus == 2) {
                this.$refs.tabView.style.minHeight = document.body.clientHeight - 44 + 'px';
            } else {
                this.$refs.tabView.style.minHeight = document.body.clientHeight - 44 - 52 + 'px';//footer距离
            }

            setTimeout(()=>{this.refreshNum++},301);

            // 监听'滚动中'事件，达到tab卡的交互效果
            let s = this.$refs.studentInfoScroller.scroller;
            s.on('scroll', () => {
                this.scrollFixTab(s.y)
            });
            app.eventDefine.on('commonDetailAddRefresh', this.handle);
            app.eventDefine.on('commonDetailInvRefresh', this.handle);
            app.eventDefine.on('commonDetailEditRefresh', this.handle);
        },

        beforeDestroy() {
            app.ls.clear('customerDetailMsg');
            app.eventDefine.off('commonDetailAddRefresh', this.handle);
            app.eventDefine.off('commonDetailInvRefresh', this.handle);
            app.eventDefine.off('commonDetailEditRefresh', this.handle);
        },
        components: {
            EmptyPage
        },
        watch: {}
    }
</script>