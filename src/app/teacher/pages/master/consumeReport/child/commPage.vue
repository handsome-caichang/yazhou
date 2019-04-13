<style lang="scss" scoped>
    .pages {
        .scroll {
            @include position-absolute(0, 0, 49px, 0);
            .echat {
                height: 188px;
            }
            .heard-mid {
                padding: 0 12px;
                height: 50px;
                border-bottom: 1px solid $color-assist-1;
                @include flex-between;
                background-color: $color-white;
                .mid-left {
                    flex: 1;
                }
                .active {
                    color: $color-primary;
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
        }
        .bottom {
            height: 49px;
            border-top: 1px solid #c8c8c8;
            background-color: $color-white;
            @include flex-between;
            padding: 0 10px;
            font-size: 14px;
            @include position-absolute(false, 0, 0, 0);
            .text {
                flex: 1;
                color: $color-3;
            }
            .value {
                color: rgb(255, 60, 0);
                text-align: right;
            }
        }
        .void {
            height: 8px;
            background-color: #f0f0f0;
        }
        .loading {
            @include position-absolute;
            z-index: 1000;
        }
        .noData-temp {
            // @include position-absolute(287px, 0, 0, 0);
            padding: 20px 0;
        }
    }
</style>

<template>
    <div class="pages">
        <scroller-super class="scroll"
                        :type="2"
                        :data="list"
                        ref="scroll"
                        :pagingOption="pagingOption"
                        @loadData="loadData">
            <xgjcharts :options="options" class="echat"></xgjcharts>
            <div class="heard-mid">
                <div class="mid-left">
                    <date-bar
                            :sdate='pagingOption.params.sdate'
                            :edate='pagingOption.params.edate'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
                <div class="mid-right" 
                    @click="emitSelectMode"
                    :class="activeClass?'active':''"
                    >
                    筛选
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#ixz-shaixuan"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
            <div class="table-header">
                <div class="header-item">{{title}}</div>
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
            <div class="table" v-for="item in list" @click="jumpRoute(item)">
                <div class="name">{{item.AreaName || item.CampusName}}</div>
                <div class="table-item">
                    <div class="litter-item text-r">{{item.ConsumeDay}}天</div>
                    <div class="litter-item">{{item.ConsumeHour}}</div>
                    <div class="litter-item">{{item.ConsumeCount}}</div>
                    <div class="litter-item">{{item.ConsumeMoney}}</div>
                </div>
            </div>
            <empty-page class="noData-temp" :type="12" text="暂无数据" v-if="list.length == 0"></empty-page>
        </scroller-super>
        <div class="bottom">
            <div class="text">合计：</div>
            <div class="value">{{totalMoney}}</div>
        </div>
        <loading class="loading" v-show="isLoading" :isDefault="false"></loading>
    </div>
</template>

<script>
    import {queryCampusConsume} from 'teacher/api/consumeReport.js'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';
    export default {
        props: {
            api: {
                type: Function
            },
            router: {
                type: String
            },
            title: {
                type: String
            }
        },
        data() {
            return {
                
                options: {
                        title: {
                            text: '课消总额趋势图（最近7天）',
                            textStyle: {
                                color: "#FFF",
                                fontSize: 14,
                                fontWeight: 500
                            },
                            padding:[8,12]
                        },
                        xAxis: {
                            // show: false,
                            type: 'category',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                color: '#FFF'
                            },
                            data: [],
                        },
                        yAxis: {
                            show: false,
                            type: 'value'
                        },
                        series: [{
                            data: [],
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 6,
                            label: {
                                show: true
                            },
                            lineStyle: {
                                color: '#72caed'
                            }
                        }],
                        backgroundColor: 'rgb(33, 150, 245)',
                        color: '#FFF'
                },
                pagingOption: {
                    api: this.api,
                    params: {
                        areaId: this.$route.params.id,
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
                        sort: 'ConsumeMoney'
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
                isLoading: false,
                quickDateIndex:-1,
                list: [],
                totalMoney: '',
                params: {
                    ConsumeHour: '',
                    ConsumeCount: '',
                    ConsumeMoney: 1
                },
                filterData: {}
            }
        },
        computed: {
            activeClass() {
                if (this.filterData.category) {
                    if (this.filterData.shiftID) {
                        return true;
                    } else if (this.filterData.term.length > 0 || this.filterData.grade.length > 0 || this.filterData.subject.length > 0 || this.filterData.category.length > 0 || this.filterData.year.length > 0) {
                        return true;
                    }
                }
                return false;
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
                        this.totalMoney = res.Data.total[0].TotalConsumeMoney
                    }
                })
            },
            changeDate(obj){
                this.pagingOption.params.sdate = obj.sdate;
                this.pagingOption.params.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.refresh({sdate: obj.sdate, edate: obj.edate})
                this.$emit('changeDate', obj)
            },
            emitSelectMode() {
                app.courseFilter({initData: this.filterData, hasMore: false}).then(res => {
                    this.filterData = res;
                    let params = {
                        grade: this.filterData.grade.map(obj => obj.ID).join(),
                        term: this.filterData.term.map(obj => obj.ID).join(),
                        year: this.filterData.year.map(obj => obj.ID).join(),
                        subject: this.filterData.subject.map(obj => obj.ID).join(),
                        category: this.filterData.category.map(obj => obj.ID).join(),
                        shiftid: this.filterData.shiftID
                    }
                    this.refresh(params)
                })
            },
            refresh(params) {
                this.isLoading = true
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
            jumpRoute(item) {
                if (!this.router) return
                let id = item.AreaID || item.ID
                
                if (this.router == 'consumeDetail') {
                    this.$router.push(`/consumeDetail/${id}/${item.CampusName}`)
                } else {
                    this.$router.push(`/${this.router}/${id}`)
                }
            }
        },
        created() {
            window.a = this
            queryCampusConsume().then(res => {
                if (res.ErrorCode === app.errok) {
                    let data = res.Data
                    data.forEach(obj => {
                        let str = obj.Time.slice(8, 10)
                        this.options.xAxis.data.push(str)
                        this.options.series[0].data.push(obj.TotalMoney)
                        this.options = Object.assign({}, this.options)
                    })
                }
            })
        },
        components: {
            EmptyPage
        }
    }
</script>