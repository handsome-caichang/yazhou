<!--课程收费汇总表-区域||校区-->
<style scoped lang="scss">
    .iconfont_xz{
        width: 1em;
        height: 1em;
        vertical-align: -.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .course-charge-area-container {
        .scroller {
            @include position-absolute(0, 0, 50px, 0);
            background-color: $color-white;
            &.empty{
                background-color: #EEF1F6;
            }
            .echart {
                height: 188px;
                background-color: $color-primary;
            }
            .date-box {
                background-color: $color-white;
                padding: 8px 12px;
                height: 50px;
                line-height: 28px;
                @include flex-between;
                @include border-bottom;
                color: $color-6;
                .date-filter {
                    display: flex;
                    .date-btn {
                        width: 112px;
                        font-size: 12px;
                        text-align: center;
                        border-radius: 50px;
                        border: 1px solid $color-assist-1;
                    }
                }
                .date-search {
                    width: 48px;
                    text-align: center;
                    border-radius: 50px;
                    background-color: $color-assist-1;
                }
                .multiple-filter{
                    &.active{
                        color: $color-primary;
                    }
                }
            }
            .charge-type {
                height: 50px;
                line-height: 50px;
                padding: 0 12px;
                @include flex-between;
                color: $color-6;
                background-color: $color-white;
                .iconfont_xz {
                    width: 14px;
                    height: 14px;
                    font-size: 14px;
                    color: #CCCCCC;
                    margin-left: 5px;
                    vertical-align: middle;
                }
            }
            .void {
                height: 8px;
                background-color: #f0f0f0;
            }
            .data-area {
                .data-header {
                    height: 50px;
                    line-height: 50px;
                    padding: 0 12px;
                    display: flex;
                    color: $color-3;
                    font-size: 14px;
                    font-weight: bold;
                    border-bottom: 1px solid #CCCCCC;
                    background-color: $color-white;
                    .header-item {
                        width: 76px;
                        text-align: right;
                    }
                    .title {
                        flex: 1;
                        text-align: left;
                    }
                }
                .data-item {
                    padding: 10px 12px;
                    border-bottom: 1px solid #eaeaea;
                    .campus-name {
                        color: $color-3;
                        line-height: 17px;
                    }
                    .data {
                        color: $color-6;
                        display: flex;
                        justify-content: flex-end;
                        .item {
                            line-height: 24px;
                            width: 75px;
                            margin: 0 5px;
                            text-align: right;
                            &.fleet {
                                color: $color-9;
                            }
                        }
                    }
                }
                .noData-temp{
                    padding: 20px 0;
                }
            }
        }
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            line-height: 50px;
            border-top: 1px solid #c8c8c8;
            padding: 0 12px;
            display: flex;
            .item {
                width: 74px;
                text-align: right;
                margin: 0 5px;
                color: #ff3c00;
            }
            .sum {
                color: $color-3;
                flex: 1;
                text-align: left;
            }
        }

    }

</style>

<template>
    <div class="course-charge-area-container">
        <scroller-super
                class="scroller"
                :class="{'empty':list.length==0}"
                :type="2"
                :data="list"
                :pagingOption="pagingOption"
                @loadData="loadData"
                ref="CourseChargeAreaScroller">
            <!--图标区域-->
            <xgjcharts class="echart" :options="options"></xgjcharts>
            <!--日期选择区域-->
            <div class="date-box">
                <div class="date-filter">
                    <date-bar
                            :sdate='pagingOption.params.sdate'
                            :edate='pagingOption.params.edate'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
                <div class="multiple-filter" :class="{'active':filterHeightLight}" @click="multipleFilter">
                    筛选
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#ixz-shaixuan"></use>
                    </svg>
                </div>
            </div>
            <!--收费类型-->
            <div class="charge-type">
                <div class="type-label">收费类型</div>
                <div class="type-name" @click="selectChargeType">
                    <span>{{pagingOption.params.typeName}}</span>
                    <svg class="iconfont_xz" aria-hidden="true">
                        <use xlink:href="#ixz-arrow-down"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
            <div class="data-area">
                <div class="data-header">
                    <div class="header-item title">区域</div>
                    <div class="header-item" @click="changeParam('PersonCount')">
                        人次数
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#ixz-paixu-0" v-if="sortPara['PersonCount']==''"></use>
                            <use xlink:href="#ixz-paixu-1" v-if="sortPara['PersonCount']==1"></use>
                            <use xlink:href="#ixz-paixu-2" v-if="sortPara['PersonCount']===0"></use>

                        </svg>
                    </div>
                    <div class="header-item" @click="changeParam('FactMoney')">
                        金额
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#ixz-paixu-0" v-if="sortPara['FactMoney']==''"></use>
                            <use xlink:href="#ixz-paixu-1" v-if="sortPara['FactMoney']==1"></use>
                            <use xlink:href="#ixz-paixu-2" v-if="sortPara['FactMoney']===0"></use>

                        </svg>
                    </div>
                    <div class="header-item" @click="changeParam('ReserveMoney')"
                         v-show="pagingOption.params.custTypeid==''">
                        电子钱包
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#ixz-paixu-0" v-if="sortPara['ReserveMoney']==''"></use>
                            <use xlink:href="#ixz-paixu-1" v-if="sortPara['ReserveMoney']==1"></use>
                            <use xlink:href="#ixz-paixu-2" v-if="sortPara['ReserveMoney']===0"></use>

                        </svg>
                    </div>
                </div>
                <div class="data-item" v-for="(item,index) in list" :key="index" @click="goTo(item)">
                    <div class="campus-name">{{item.AreaName}}</div>
                    <div class="data">
                        <div class="item count">{{item.PersonCount}}</div>
                        <div class="item money" :class="{'fleet':item.FactMoney==item.ReserveMoney}">{{item.FactMoney}}</div>
                        <div class="item wallet"  :class="{'fleet':item.FactMoney==item.ReserveMoney}" v-show="pagingOption.params.custTypeid==''">{{item.ReserveMoney}}</div>
                    </div>
                </div>
                <!--空白页-->
                <empty-page class="noData-temp" :type="12" text="暂无数据" v-if="list.length == 0"></empty-page>
            </div>
        </scroller-super>
        <!--合计-->
        <div class="footer">
            <div class="sum">合计：</div>
            <div class="item">{{total.TotalPersonCount}}</div>
            <div class="item">{{total.TotalFactMoney}}</div>
            <div class="item" v-show="pagingOption.params.custTypeid==''">{{total.TotalReserveMoney}}</div>
        </div>
        <loading v-if='isLoading' :bgType="bgType"></loading>
        <!--收费类型-->
        <charge-type
                @changeChargeType="changeChargeType"
                :opened.sync="openChargeType">
        </charge-type>


    </div>
</template>

<script>
    import {queryMoneyCountOfAllArea, queryCampusOnFee} from 'teacher/api/feeReport.js';
    import ChargeType from './child/charge-type.vue';
    import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';
    export default {
        name: "course-charge-area",
        data() {
            return {
                wxTitle: "区域课程收费汇总表",

                bgType:0,
                isLoading: true,
                openChargeType: false,
                quickDateIndex: -1,
                options: {
                    title: {
                        text: '收费总额趋势图（最近7天）',
                        textStyle: {
                            color: "#FFF",
                            fontSize: 14,
                            fontWeight: 'normal',
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
                total: {
                    TotalFactMoney: "0.00",
                    TotalPersonCount: 0,
                    TotalReserveMoney: "0.00",
                },
                list: [],
                echartList: [],
                pagingOption: {
                    api: queryMoneyCountOfAllArea,
                    params: {
                        sdate: '',
                        edate: '',
                        grade: '',
                        term: '',
                        year: '',
                        subject: '',
                        category: '',
                        shiftid: '',
                        campusid: '',
                        desc: 1,
                        sort: 'FactMoney',
                        custTypeid: '',
                        typeName: '课程收费汇总',
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
                sortPara: {
                    PersonCount: '',//人次数
                    FactMoney: 1,//金额
                    ReserveMoney: '',//电子钱包
                },
                filterData:{
                    category:[],
                    grade:[],
                    shiftID:'',
                    shiftName:'',
                    subject:[],
                    term:[],
                    year:[]
                }
            }
        },
        computed:{
            filterHeightLight(){
                if(this.filterData.category.length<1 && this.filterData.grade.length<1 && this.filterData.subject.length<1 && this.filterData.term.length<1 && this.filterData.year.length<1 && this.filterData.shiftID==''){
                    return false
                }else{
                    return true
                }
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    this.bgType = 1;
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = [];
                        }
                        this.list = this.list.concat(res.Data.data);
                        this.total = res.Data.total[0];
                    }
                });
            },

            // 获取图表数据
            getEchartData() {
                queryCampusOnFee().then(res => {
                    if (res.ErrorCode === app.errok) {
                        res.Data.forEach(obj => {
                            let str = obj.Time.slice(8, 10);
                            this.options.xAxis.data.push(str);
                            this.options.series[0].data.push(obj.TotalMoney);
                        })
                    }
                })
            },
            refresh(params) {
                this.$refs.CourseChargeAreaScroller.refresh(params)
            },
            //日期选择
            changeDate(obj) {
                this.isLoading = true;
                this.pagingOption.params.sdate = obj.sdate;//显示
                this.pagingOption.params.edate = obj.edate;//显示
                this.quickDateIndex = obj.index;//快速选日期高亮
                this.refresh(this.pagingOption.params);
            },
            //收费类型
            selectChargeType() {
                this.openChargeType = !this.openChargeType;
            },
            changeChargeType(res) {
                this.isLoading = true;
                this.pagingOption.params = Object.assign({}, this.pagingOption.params,res);
                this.refresh(this.pagingOption.params);
            },
            //排序
            changeParam(str) {
                this.isLoading = true;
                let myKey = str;
                for (str in this.sortPara) {
                    if (str !== myKey) this.sortPara[str] = '';
                }
                if (this.sortPara[myKey] === '') {
                    this.sortPara[myKey] = 1;
                    this.refresh({sort: myKey, desc: this.sortPara[myKey]});
                    return
                }
                if (this.sortPara[myKey] == 1) {
                    this.sortPara[myKey] = 0;
                    this.refresh({sort: myKey, desc: this.sortPara[myKey]});
                    return
                }
                if (this.sortPara[myKey] === 0) {
                    this.sortPara[myKey] = '';
                    this.refresh({sort: myKey, desc: this.sortPara[myKey]});
                    return
                }
            },
            multipleFilter(){
                app.courseFilter({initData: this.filterData}).then(res => {
                    this.filterData = app.tool.clone(res); //弹框回显
                    app.ls.setStorage('courseChargeFilterObj',this.filterData);
                    this.setData(res); //筛选赋值
                    this.refresh(this.pagingOption.params);
                })
            },
            setData(res){
                this.pagingOption.params.year = res.year.map(item => {return item.ID}).join();
                this.pagingOption.params.term = res.term.map(item => {return item.ID}).join();
                this.pagingOption.params.subject = res.subject.map(item => {return item.ID}).join();
                // this.pagingOption.params.shiftName = res.shiftName;
                this.pagingOption.params.shiftid = res.shiftID;
                this.pagingOption.params.grade = res.grade.map(item => {return item.ID}).join();
                this.pagingOption.params.category = res.category.map(item => {return item.ID}).join();
            },
            goTo(item){
                let para = app.tool.jsonToQueryStr({
                        areaId:item.AreaID,
                        sdate: this.pagingOption.params.sdate, //开始时间
                        edate: this.pagingOption.params.edate,  //结束时间
                        grade: this.pagingOption.params.grade,  //年级（可多选）
                        term: this.pagingOption.params.term,  //期段（可多选）
                        year: this.pagingOption.params.year,  //年分（可多选）
                        subject: this.pagingOption.params.subject,  //科目（可多选）
                        category: this.pagingOption.params.category,  //类型（可多选）
                        shiftid: this.pagingOption.params.shiftid,  //课程ID（可多选）
                        custTypeid: this.pagingOption.params.custTypeid //收费类型
                });
                this.$router.push({path: `/courseChargeCampus/${para}`})
            }
        },
        created() {
            // 0今天，1昨天，2本周，3最近7天，4最近30天，5本月，6上月
            this.pagingOption.params.sdate = app.tool.getDatesByIndex(3, app.localTimeToServer).sdate;
            this.pagingOption.params.edate = app.tool.getDatesByIndex(3, app.localTimeToServer).edate;
            this.getEchartData();

        },
        beforeDestroy(){
            app.ls.removeStorage('courseChargeFilterObj')
        },
        components: {
            ChargeType,
            EmptyPage
        }
    }
</script>

