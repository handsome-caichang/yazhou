<style scoped lang="scss">
    .wrapper {
        @include position-absolute;
        background:#F7F8FA;

         .header{
            font-size:13px;
            background:#fff;
            padding:0 12px;
            @include flex-between;
            height:44px;
            .head-img{
                width: 22px;
                height: 22px;
                border-radius: 22px;
                border: 1px solid $color-assist-1;
                background-color: $color-assist-1;
               
                @include background-img(false, cover);
                margin-right:5px;
            }
            .icon{
                margin-left:5px;
                width:9px;
            }
            .header-left{
                @include flex-between;
                color:#474747;
            }
            .header-right{
                color:#0077FF;
            }
        }
        .card-like{
            margin:10px 12px 0;
            background:#fff;
            .header-like{
                padding-left:16px;
                height:50px;
                border-bottom:1px solid #DCDCDC;
                color:#666666;
                font-size:14px;
                font-weight: 600;
                @include flex-center;
                justify-content: flex-start;
                .icon{
                    margin-right:6px;
                }
            }
            .funnel-echarts {
                min-height: 350px;
            }
            .no-data {
                height: 220px;
                @include flex-center;
                .img {
                    // margin: 50px auto;
                    width: 87px;
                    height: 104px;
                }
                .text {
                    margin-top: 12px;
                    width: 100%;
                    font-size: 14px;
                    color: $color-6;
                    text-align: center;
                }
            }
        }
        .target-card  .target-body{
            padding:0 16px;
            height:140px;
            @include flex-center(column);
            .title{
                color:#474747;
                font-size:13px;
            }
            .desc{
                width:100%;
                color:#666;
                font-size:14px;
                @include flex-between;
                .left,.right{
                    @include flex-between;
                    .gray{
                        margin:0 5px;
                        color:#aaa;
                        font-size:12px;
                    }
                    .icon{
                        width:7px;
                    }
                }
            }
            .content{
                height:50px;
                width:100%;
                @include flex-center;
                .bar-container{
                    width:100%;
                    height:16px;
                    border-radius: 16px;
                    background:#E9EFF4;
                    position: relative;
                    .bar{
                        position: absolute;
                        height:16px;
                        border-radius: 16px;
                        background: #5991FF;
                        top:0;
                        left:0;
                        @include flex-center;
                        justify-content: flex-end;
                        .bar-rate{
                            font-size:10px;
                            color:#fff;
                            margin-right:15px;
                        }
                        .bar-circle{
                            position: absolute;
                            width:22px;
                            height:22px;
                            right:0;
                            top:-3px;
                        }
                    }
                }

            }

        }
        .card-like .body-numbers{
            @include flex-between;
            padding:0 36px;
            height:112px;

            .item{
                @include flex-center(column);
                .number{
                    font-size:24px;
                    font-weight: bold;
                    color:#333;
                }
                .title{
                    color:#AAAAAA;
                    font-size:12px;
                    margin-top:10px;
                }
            }
        }
    }
</style>

<template>
    <div class="wrapper">
        <scroller-base class="wrapper" :data="scrollData">
            <div class="header">
                <div class="header-left" @click="openCommAction('people')">
                    <div class="head-img" :style="{backgroundImage:`url(${myInfo.photourl})`}"></div>
                    <div>{{peopleText}}</div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhankai1"></use>
                    </svg>
                </div>
                <div class="header-right" @click="openCommAction('time')">
                    <span>{{timeText}}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhankai1"></use>
                    </svg>
                </div>
            </div>
            
            <!-- 业绩目标 -->
            <!-- <div class="target-card card-like">
                <div class="target-header header-like">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yejimubiao"></use>
                    </svg>
                    <span>业绩目标</span>
                </div>
                <div class="target-body">
                    <div class="title">完成销售金额</div>
                    <div class="content">
                        <div class="bar-container">
                            <div class="bar" :style="{width:completepercentage}">
                                <span class="bar-rate">{{completepercentage}}</span>
                                <svg class="icon bar-circle" aria-hidden="true">
                                    <use xlink:href="#icon-baiquan"></use>
                                </svg>
                                    
                            </div>
                        </div>
                    </div>
                    <div class="desc">
                        <div class="left">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-lanquan"></use>
                            </svg>
                            <span class="gray">完成</span>
                            <span>{{achievementcomplete}}</span>
                        </div>
                        <div class="right">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-huangquan"></use>
                            </svg>
                            <span class="gray">目标</span>
                            <span>{{achievementtarget}}</span>
                        </div>
                    </div>
            
                </div>
            
            </div> -->

            <!-- 执行力 -->
            <div class="execution-card card-like">
                <div class="execution-header header-like">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhihangli"></use>
                    </svg>
                    <span>执行力</span>
                </div>
                
                <div class="body-numbers">
                    <div class="item">
                        <div class="number">{{communicatecount}}</div>
                        <div class="title">沟通人数</div>
                    </div>
                    <div class="item">
                        <div class="number">{{invitevisitcount}}</div>
                        <div class="title">邀约到访人数</div>
                    </div>
                    <div class="item">
                        <div class="number">{{callduration}}</div>
                        <div class="title">通话时长</div>
                    </div>
                </div>
            </div>

            <!-- 线索转化 -->
            <div class="execution-card card-like">
                <div class="execution-header header-like">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiansuozhuanhua"></use>
                    </svg>
                    <span>线索转化</span>
                </div>
                
                <div class="body-numbers">
                    <div class="item">
                        <div class="number">{{addcluecount}}</div>
                        <div class="title">新增线索/人</div>
                    </div>
                    <div class="item">
                        <div class="number">{{turnpercentage}}</div>
                        <div class="title">线索转化客户率/人</div>
                    </div>
                    <div class="item">
                        <div class="number">{{turnprivateseacount}}</div>
                        <div class="title">新增客户/人</div>
                    </div>
                </div>
            </div>

            <!-- 销售漏斗 -->
            <div class="funnel-card card-like">
                <div class="funnel-header header-like">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiaoshouloudou"></use>
                    </svg>
                    <span>销售漏斗</span>
                </div>

                <echarts class="funnel-echarts"
                    v-if="!showNoData"
                    :style="{'height': canvasHeight}" 
                    :options="optionFunnel" 
                    :restFalg="canvasHeight"
                    ref="echarts">
                </echarts>

                <div class="no-data" v-if="showNoData">
                    <div>
                        <img src="./img/1.png" class="img">
                        <div class="text">暂时没有数据哦~</div>
                    </div>
                </div>
            </div>
        </scroller-base>
        <comm-action :opened.sync="showCommAction" ref="commAction"></comm-action>
    </div>
</template>

<script>
    import {getAcheveMentReport, getClueturnReport, getSalesFunnelReport, getExecutiveReport, getCurrentManager} from 'crm/api/yy.js'
    import CommAction from 'crm/components/commAction/commAction.vue'
    import Echarts from 'crm/components/echarts/echarts.vue'

    export default {
        data() {
            return {
                canvasHeight: '350px',
                wxTitle: '我的业绩',
                optionFunnel: null,
                showCommAction: false,
                actionList: [],
                people: [{value: '本人', querytype: 2}, {value: '全公司', querytype: 1}],
                time: [{value: '本月', datetype: 'month'}, {value: '本季度', datetype: 'quarter'}, {value: '本年', datetype: 'year'}],
                timeText: '本月',
                peopleText: '本人',

                achievementcomplete: '',
                achievementtarget: '',
                completepercentage: '',

                callduration: '',
                communicatecount: '',
                invitevisitcount: '',

                addcluecount: '',
                turnpercentage: '',
                turnprivateseacount: '',

                selectParams: {
                    datetype: 'month',
                    querytype: 2
                },
                showNoData: false
            }
        },
        computed: {
            ...Vuex.mapState(['myInfo']),
            scrollData() {
                return this.canvasHeight + this.showNoData
            }
        },
        methods: {
            openCommAction(str) {
                let title = ''
                this.showCommAction = true
                if (str === 'people') {
                    title = '选择人员'
                } else {
                    title = '选择时间'
                }
                this.actionList = this[str]
                this.$refs.commAction.show({
                    title: title,
                    list: this.actionList
                }).then(res => {
                    res && this[str].forEach(obj => {
                        if (obj.value === res.value) {
                            obj.isSelect = true
                        } else {
                            obj.isSelect = false
                        }
                    })
                    this[str+'Text'] = res.value
                    if (str === 'people') this.selectParams.querytype = res.querytype
                    if (str === 'time') this.selectParams.datetype = res.datetype
                    this.getData(this.selectParams)
                })
            },
            getData(params = {datetype: 'month', querytype: 2}) {
                /*getAcheveMentReport(params).then(res => {
                    if (res.result.code === app.errok) {
                        this.achievementcomplete = res.data.achievementcomplete
                        this.achievementtarget = res.data.achievementtarget
                        this.completepercentage = res.data.completepercentage
                    }
                })*/
                getClueturnReport(params).then(res => {
                    if (res.result.code === app.errok) {
                        this.addcluecount = res.data.addcluecount
                        this.turnpercentage = res.data.turnpercentage
                        this.turnprivateseacount = res.data.turnprivateseacount
                    }
                })
                getSalesFunnelReport(params).then(res => {
                    if (res.result.code === app.errok) {
                        /*if (!res.data.length) {
                            this.showNoData = true
                        } else {
                            this.showNoData = false
                        }*/
                        this.showNoData = res.data.length ? false : true
                        var list = res.data,
                            len = list.length,
                            step = 100/len,
                            countList = []

                        this.canvasHeight = 70*len + 'px'

                        list.forEach((item, index) => {
                            countList.push({
                                name: item.invitecustomerstatusname,
                                value: (100 - step*index),
                                actualValue: item.intentionalcustomercount
                            })
                        })

                        this.optionFunnel = Object.assign({}, optionFunnel)

                        this.optionFunnel.series[0].data = countList
                        this.optionFunnel.series[1].data = countList
                    }
                })
                getExecutiveReport(params).then(res => {
                    if (res.result.code === app.errok) {
                        this.callduration = res.data.callduration
                        this.communicatecount = res.data.communicatecount
                        this.invitevisitcount = res.data.invitevisitcount
                    }
                })
            },
        },
        created() {
            window.a = this
            this.getData()
            this.people.forEach(obj => {
                if (obj.querytype == 2) {
                    this.$set(obj, 'isSelect', true)
                } else {
                    this.$set(obj, 'isSelect', false)
                }
                
            })
            this.time.forEach(obj => {
                if (obj.datetype == 'month') {
                    this.$set(obj, 'isSelect', true)
                } else {
                    this.$set(obj, 'isSelect', false)
                }
            })
        },
        components: {
            CommAction,
            Echarts
        }
    }


    // 销售漏斗 - 漏斗图模拟数据
    const optionFunnel = {
        tooltip: {
            trigger: 'item',
            formatter: item => `${item.data.name} : ${item.data.actualValue}`
        },
        series: [{
                type:'funnel',
                name:'预期',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'none',
                gap: 2,
                label: {
                    position: 'left',
                    formatter: '{b}'
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 100, name: '展现', actualValue: 20},
                    {value: 80, name: '点击', actualValue: 5},
                    {value: 60, name: '访问', actualValue: 96},
                    {value: 40, name: '咨询', actualValue: 1235},
                    {value: 20, name: '订单', actualValue: 985}
                ]
            }, {
                type:'funnel',
                name:'实际',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'none',
                gap: 2,
                label: {
                    position: 'inside',
                    formatter: item =>  item.data.actualValue
                },                    
                labelLine: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        formatter: item => item.data.actualValue
                    }
                    
                },
                data: [
                    {value: 100, name: '展现', actualValue: 20},
                    {value: 80, name: '点击', actualValue: 5},
                    {value: 60, name: '访问', actualValue: 96},
                    {value: 40, name: '咨询', actualValue: 1235},
                    {value: 20, name: '订单', actualValue: 985}
                ]
            }
        ]
    }
</script>