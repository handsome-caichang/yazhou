<style scoped lang="scss">
    .iconfont_xz{
        width: 1em;
        height: 1em;
        vertical-align: -.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .course-charge-campus-branch-container{
        .scroller {
            @include position-absolute(0, 0, 50px, 0);
            background-color: $color-white;
            &.empty{
                background-color: #EEF1F6;
            }
            .date-box {
                background-color: $color-white;
                padding: 0 12px;
                height: 50px;
                line-height: 28px;
                color: $color-6;
                @include flex-between;
                @include border-bottom;
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
                .multiple-filter{
                    font-size: 12px;
                    &.active{
                        color: $color-primary;
                    }
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
    <div class="course-charge-campus-branch-container">
        <scroller-super
                class="scroller"
                :class="{'empty':list.length==0}"
                :type="2"
                :data="list"
                :pagingOption="pagingOption"
                @loadData="loadData"
                ref="CourseChargeCampusBranchScroller">
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
                <div class="multiple-filter" :class="{'active':summaryTitle!='汇总方式'}" @click="selectSummaryMethod">
                    {{summaryTitle}}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#ixz-xiangyou"></use>
                    </svg>
                </div>
            </div>

            <div class="void"></div>
            <div class="data-area">
                <div class="data-header">
                    <div class="header-item title">{{headTitle}}</div>
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
                    <div class="campus-name">{{item.ItemName}}</div>
                    <div class="data">
                        <div class="item count">
                            {{item.PersonCount}}
                        </div>
                        <div class="item money" :class="{'fleet':item.FactMoney==item.ReserveMoney}">
                            {{item.FactMoney}}
                        </div>
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

        <summary-method
                :opened.sync="openSummaryMethod"
                @acceptSummaryMethod="acceptSummaryMethod">
        </summary-method>
    </div>
</template>

    <script>
        import { getOneCampusData } from 'teacher/api/feeReport.js';
        import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';
        import SummaryMethod from './child/summary-method.vue';
        export default {
            name: "course-charge-campus-branch",
            data() {
                return {
                    wxTitle: "课程收费汇总表",
                    summaryTitle:'汇总方式',
                    headTitle:'课程-名称',
                    isLoading: true,
                    bgType:0,
                    openSummaryMethod: false,
                    quickDateIndex: -1,
                    total: {
                        TotalFactMoney: "0.00",
                        TotalPersonCount: 0,
                        TotalReserveMoney: "0.00",
                    },
                    list:[],
                    pagingOption: {
                        api: getOneCampusData,
                        params: {
                            campusid:'',
                            dataType:2,
                            sdate: '',
                            edate: '',
                            grade: '',
                            term: '',
                            year: '',
                            subject: '',
                            category: '',
                            shiftid: '',
                            desc: 1,
                            sort: 'FactMoney',
                            custTypeid: '',
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
                }
            },
            computed: {},
            methods: {
                loadData(ajaxPromise) {
                    ajaxPromise.then(res => {
                        this.bgType = 1;
                        this.isLoading = false;
                        if (res.ErrorCode == app.errok) {
                            if (res.PageIndex === 1) {
                                this.list = [];
                            }
                            this.list = this.list.concat(res.Data.data);
                            this.total = res.Data.total[0];
                        }
                    });
                },
                refresh(params) {
                    this.$refs.CourseChargeCampusBranchScroller.refresh(params)
                },
                changeDate(obj) {
                    this.isLoading = true;
                    this.pagingOption.params.sdate = obj.sdate;//显示
                    this.pagingOption.params.edate = obj.edate;//显示
                    this.quickDateIndex = obj.index;//快速选日期高亮
                    this.refresh(this.pagingOption.params);
                },
                //汇总方式
                selectSummaryMethod(){
                    this.openSummaryMethod = !this.openSummaryMethod;
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
                //汇总方式筛选接收
                acceptSummaryMethod(item){
                    this.isLoading = true;
                    this.headTitle =  item.dataType<2?'时间-'+item.name:'课程-'+item.name;
                    this.summaryTitle = item.dataType<2?'按日期-'+item.name:'按课程-'+item.name;
                    this.refresh({dataType: item.dataType})
                },
                goTo(item){
                    app.ls.setStorage('courseChargeCampusClassName',item.ItemName)
                    let para = app.tool.jsonToQueryStr({
                        campusid : this.$route.params.campusid,
                        sdate: this.pagingOption.params.sdate, //开始时间
                        edate: this.pagingOption.params.edate,  //结束时间
                        grade: this.pagingOption.params.grade,  //年级（可多选）
                        term: this.pagingOption.params.term,  //期段（可多选）
                        year: this.pagingOption.params.year,  //年分（可多选）
                        subject: this.pagingOption.params.subject,  //科目（可多选）
                        category: this.pagingOption.params.category,  //类型（可多选）
                        shiftid: this.pagingOption.params.shiftid,  //课程ID（可多选）
                        custTypeid: this.pagingOption.params.custTypeid, //收费类型
                        dataType: this.pagingOption.params.dataType, //
                        value: item.ItemName //
                    });
                    this.$router.push({path: `/courseChargeDetail/${para}`})

                }

            },
            created() {
                this.pagingOption.params.campusid = this.$route.params.campusid;

                this.pagingOption.params = Object.assign({}, this.pagingOption.params,this.$route.query);
            },
            beforeDestroy() {
                app.ls.clear('courseChargeCampusClassName')
            },
            components: {
                EmptyPage,
                SummaryMethod
            }
        }
</script>

