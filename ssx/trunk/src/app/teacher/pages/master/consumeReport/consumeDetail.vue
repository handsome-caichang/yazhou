<style lang="scss" scoped>
    .scroll {
        background-color: $color-white;
        .heard-mid {
            padding: 0 12px;
            height: 50px;
            border-bottom: 1px solid $color-assist-1;
            @include flex-between;
            .mid-left {
                width: 70%;
            }
            .mid-right {
                width: 30%;
                height: 28px;
                line-height: 28px;
                text-align: right;
                color: $color-6;
                font-size: 12px;
            }
            .active {
                color: #2196f3;
            }
        }
        .void {
            height: 8px;
            background-color: #f0f0f0;
        }
        .echat {
            height: 216px;
        }
        .info-wrapper {
            background-color: $color-white;
            .info-heard {
                display: flex;
                height: 20px;
                line-height: 20px;
                .text {
                    flex: 1;
                    font-size: 14px;
                    text-align: center;
                    color: $color-9;
                }
            }
            .info-content {
                height: 40px;
                line-height: 40px;
                display: flex;
                font-size: 24px;
                .info-left {
                    flex: 1;
                    color: #2197f3;
                    border-right: 1px solid $color-assist-1;
                    text-align: center;
                }
                .info-right {
                    flex: 1;
                    color: #ffa400;
                    text-align: center;
                }
            }
            .void1 {
                background-color: $color-white;
                height: 20px;
            }
        }
        .table-header {
            height: 50px;
            line-height: 50px;
            background-color: $color-assist-1;
            display: flex;
            background-color: $color-white;
            border-bottom: 1px solid #ccc;
            .header-item {
                flex: 1;
                text-align: center;
                font-weight: 700;
                color: $color-3;
            }
            .active {
                color: $color-primary;
            }
        }
        .table {
            border-bottom: 1px solid #eaeaea;
            background-color: $color-white;
            padding-bottom: 10px;
            font-size: 14px;
            .name {
                padding: 10px 12px;
                color: $color-3;
            }
            .table-item {
                display: flex;
                color: $color-6;
                .litter-item {
                    flex: 1;
                    text-align: center;
                }
                .text-r {
                    text-align: right;
                }
            }
        }
        .noData-temp {
            padding: 20px 0;
        }
    }
    
</style>

<template>
    <scroller-super class="scroll"
                        :type="2"
                        :data="list"
                        ref="scroll"
                        :pagingOption="pagingOption"
                        @loadData="loadData">
        <div class="heard-mid">
            <div class="mid-left">
                <date-bar
                        :sdate='pagingOption.params.sdate'
                        :edate='pagingOption.params.edate'
                        :index="quickDateIndex"
                        @changeDate="changeDate">
                </date-bar>
            </div>
            <div class="mid-right" @click="emitSelectType"
                                   :class="{active:heardText!=='汇总方式'}">
                {{heardText}}
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#ixz-xiangyou"></use>
                </svg>
            </div>
        </div>
        <div class="void"></div>
        <xgjcharts :options="options" class="echat"></xgjcharts>
        <div class="info-wrapper">
            <div class="info-heard">
                <div class="text">正常课消</div>
                <div class="text">欠费课消</div>
            </div>
            <div class="info-content">
                <div class="info-left">{{totalConsumeMoney}}</div>
                <div class="info-right">{{totalLessMoney}}</div>
            </div>
            <div class="void1"></div>
        </div>
        <div class="void"></div>
        <div class="table-header">
            <div class="header-item">课程-名称</div>
            <div class="header-item" @click="changeParam('ConsumeHour')">
                小时
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#ixz-paixu-0" v-if="params['ConsumeHour']==''"></use>
                    <use xlink:href="#ixz-paixu-1" v-if="params['ConsumeHour']==1"></use>
                    <use xlink:href="#ixz-paixu-2" v-if="params['ConsumeHour']===0"></use>
                </svg>
            </div>
            <div class="header-item" @click="changeParam('ConsumeCount')">
                {{app.sysInfo.Title_CourseUnit_2}}
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#ixz-paixu-0" v-if="params['ConsumeCount']==''"></use>
                    <use xlink:href="#ixz-paixu-1" v-if="params['ConsumeCount']==1"></use>
                    <use xlink:href="#ixz-paixu-2" v-if="params['ConsumeCount']===0"></use>
                </svg>
            </div>
            <div class="header-item" @click="changeParam('ConsumeMoney')">
                课消
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#ixz-paixu-0" v-if="params['ConsumeMoney']==''"></use>
                    <use xlink:href="#ixz-paixu-1" v-if="params['ConsumeMoney']==1"></use>
                    <use xlink:href="#ixz-paixu-2" v-if="params['ConsumeMoney']===0"></use>
                </svg>
            </div>
        </div>
        <div class="table" v-for="item in list">
            <div class="name">{{item.ItemName}}</div>
            <div class="table-item">
                <div class="litter-item text-r">{{item.ConsumeDay}}天</div>
                <div class="litter-item">{{item.ConsumeHour}}</div>
                <div class="litter-item">{{item.ConsumeCount}}</div>
                <div class="litter-item">{{item.ConsumeMoney}}</div>
            </div>
        </div>
        <select-type ref="selectType">
            
        </select-type>
        <empty-page class="noData-temp" :type="12" text="暂无数据" v-if="list.length == 0"></empty-page>
    </scroller-super>
</template>

<script>
    import {queryConsumeDetail} from 'teacher/api/consumeReport.js'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';
    import SelectType from './child/selectType.vue'
    export default {
        data() {
            return {
                wxTitle: '课消报表',
                heardText: '汇总方式',
                list: [],
                pagingOption: {
                    api: queryConsumeDetail,
                    params: {
                        campusid: this.$route.params.id,
                        sdate: app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                        edate: app.tool.getDatesByIndex(0, app.localTimeToServer).sdate,
                        grade: '',
                        term: '',
                        year: '',
                        subject: '',
                        category: '',
                        shiftid: '',
                        campusid: '',
                        desc: 1,
                        sort: 'ConsumeMoney',
                        dataType: 2
                    },
                    pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'PageIndex',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'PageSize',
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: 'PageCount'
                    }
                },
                quickDateIndex:-1,
                options: {
                    title: {
                        text: "满班率",
                        left: 'center',
                        top: 'center',
                        textStyle: {
                            color: "#000",
                            fontSize: '24',
                            fontWeight: '400'
                        },
                        subtext: '课消总金额',
                        subtextStyle: {
                            fontSize: 12
                        }
                    },
                    color:['#ffa400', '#2197f3'],
                    series: [
                        {
                            type:'pie',
                            radius: ['85%', '70%'],
                            avoidLabelOverlap: false,
                            hoverAnimation: false,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335},
                                {value:310},
                                {value:234},
                                {value:135},
                                {value:1548}
                            ]
                        }
                    ],
                    backgroundColor: 'rgb(255, 255, 255)',
                },
                params: {
                    ConsumeHour: '',
                    ConsumeCount: '',
                    ConsumeMoney: 1
                },
                totalConsumeMoney: '',
                totalLessMoney: ''
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.Data.data)
                        this.totalLessMoney = res.Data.total[0].TotalLessMoney
                        this.totalConsumeMoney = res.Data.total[0].TotalConsumeMoney
                        let arr = [{value: this.totalLessMoney}, {value: this.totalConsumeMoney}]
                        this.options.title.text = res.Data.total[0].TotalMoney
                        this.options.series[0].data = arr
                        this.options = Object.assign({}, this.options)
                    }
                })
            },
            changeDate(obj){
                this.pagingOption.params.sdate = obj.sdate;
                this.pagingOption.params.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.refresh({sdate: obj.sdate, edate: obj.edate})
            },
            emitSelectType() {
                this.$refs.selectType.show().then(res => {
                    this.heardText = res.text
                    this.refresh({dataType: res.dataType})
                })
            },
            refresh(params) {
                this.$refs.scroll.refresh(params)
            },
            changeParam(key) {
                let myKey = key
                for(key in this.params) {
                    if (key !== myKey) this.params[key] = ''
                }
                if (this.params[myKey] === '') {
                    this.params[myKey] = 1
                    this.refresh({sort: myKey, desc: this.params[myKey]})
                    return
                }
                if (this.params[myKey] == 1) {
                    this.params[myKey] = 0
                    this.refresh({sort: myKey, desc: this.params[myKey]})
                    return
                }
                if (this.params[myKey] === 0) {
                    this.params[myKey] = ''
                    this.refresh({sort: myKey, desc: this.params[myKey]})
                    return
                }
            },
        },
        created() {
            window.a = this
            this.wxTitle = this.$route.params.campusName + '-' + '课消报表'
            this.$set(this.pagingOption.params, 'campusid', this.$route.params.id)
            let timeObj = app.ls.get('timeObj')
            if (timeObj) {
                this.pagingOption.params.sdate = timeObj.sdate
                this.pagingOption.params.edate = timeObj.edate
                this.quickDateIndex = timeObj.index
            }
        },
        components: {
            SelectType,
            EmptyPage
        }
    }
</script>