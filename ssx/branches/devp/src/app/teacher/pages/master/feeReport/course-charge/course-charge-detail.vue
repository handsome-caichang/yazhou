<style scoped lang="scss">
    .iconfont_xz{
        width: 1em;
        height: 1em;
        vertical-align: -.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .course-charge-detail{
        .scroller{
            @include position-absolute(0, 0, 50px, 0);
            background-color: $color-white;
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
                    .header-item {
                        width: 96px;
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
                            width: 96px;
                            margin: 0 5px;
                            text-align: right;
                            &.fleet {
                                color: $color-9;
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
            height: 50px;
            line-height: 50px;
            border-top: 1px solid #c8c8c8;
            padding: 0 12px;
            display: flex;
            .item {
                width: 96px;
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
        .noData-temp{
            @include position-absolute;
        }
    }
</style>

<template>
    <div class="course-charge-detail">
        <scroller-super
                class="scroller"
                :type="2"
                :data="list"
                :pagingOption="pagingOption"
                @loadData="loadData"
                ref="CourseChargeDetailScroller">

            <div class="data-area">
                <div class="data-header">
                    <div class="header-item title">日期/学号/姓名</div>
                    <div class="header-item" @click="changeParam('OughtAmount')">
                        应交
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#ixz-paixu-0" v-if="sortPara['OughtAmount']==''"></use>
                            <use xlink:href="#ixz-paixu-1" v-if="sortPara['OughtAmount']==1"></use>
                            <use xlink:href="#ixz-paixu-2" v-if="sortPara['OughtAmount']===0"></use>

                        </svg>
                    </div>
                    <div class="header-item" @click="changeParam('FactAmount')">
                        实交
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#ixz-paixu-0" v-if="sortPara['FactAmount']==''"></use>
                            <use xlink:href="#ixz-paixu-1" v-if="sortPara['FactAmount']==1"></use>
                            <use xlink:href="#ixz-paixu-2" v-if="sortPara['FactAmount']===0"></use>

                        </svg>
                    </div>
                </div>
                <div class="data-item" v-for="(item,index) in list" :key="index">
                    <div class="campus-name">{{item.Time}}&nbsp;&nbsp;&nbsp;{{item.Serial}}&nbsp;&nbsp;&nbsp;{{item.Name}}</div>
                    <div class="data">
                        <div class="item count" :class="{'fleet':item.FactAmount==item.OughtAmount}">
                            {{item.OughtAmount}}
                        </div>
                        <div class="item money" :class="{'fleet':item.FactAmount==item.OughtAmount}">
                            {{item.FactAmount}}
                        </div>
                    </div>
                </div>
            </div>
        </scroller-super>
        <!--合计-->
        <div class="footer">
            <div class="sum">合计：</div>
            <div class="item">{{total.oughtAmount}}</div>
            <div class="item">{{total.factAmount}}</div>
        </div>
        <loading v-if='isLoading' :bgType="bgType"></loading>
        <!--空白页-->
        <empty-page class="noData-temp" :type="12" text="暂无数据" v-if="list.length == 0"></empty-page>

    </div>
</template>

<script>
    import {getReportFeeSumDetail} from 'teacher/api/feeReport.js';
    import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';
    export default {
        name: "course-charge-detail",
        data() {
            return {
                wxTitle: "课程收费汇总表",
                isLoading: true,
                bgType:0,
                total: {
                    oughtAmount: 0,
                    factAmount: 0,
                },
                list:[],
                pagingOption: {
                    api: getReportFeeSumDetail,
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
                        sort: 'FactAmount',
                        custTypeid: '',
                        value:''
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
                    OughtAmount: '',//应交
                    FactAmount: 1,//实交
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
                        this.total.oughtAmount = res.Data.oughtAmount;
                        this.total.factAmount = res.Data.factAmount;
                    }
                });
            },
            refresh(params) {
                this.$refs.CourseChargeDetailScroller.refresh(params)
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
        },
        created() {
            this.wxTitle = app.ls.getStorage('courseChargeCampusClassName') + ' - 收费报表 - 收费汇总表';
            // vue的route能自动去转码 因为上个页面要传文字过来，所以这里用$route
            this.pagingOption.params = Object.assign({}, this.pagingOption.params, this.$route.query);
        },
        components: {EmptyPage}
    }
</script>

