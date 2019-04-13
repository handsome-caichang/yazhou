<!-- 上课点评（班级）列表 -->

<style lang="scss" scoped>
.comment-list-container {
    background-color: $color-white;
    letter-spacing: -.05em;

    .header {
        background-color: $color-white;
        padding: 8px 12px;
        height: 50px;
        line-height: 28px;
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

        .date-search {
            width: 48px;
            text-align: center;
            border-radius: 50px;
            background-color: $color-assist-1;
        }

        .color-blue {
            color: #2196f3;
        }
    }

    .list-body {
        .csr_chart_wrap {
            background-color: #2196F3;
            position: relative;
            color: #FFF;
            padding-bottom: 10px;

            .csrSet {
                position: absolute;
                top: 30px;
                right: 14px;
                line-height: 40px;
                color: #FFF;
                z-index: 1;
            }

            /* 字体图标 */
            .iconfont_xz {
                width: 1em;
                height: 1em;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
            }

            .flex_center {
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                -webkit-box-align: center;
                -webkit-box-pack: center;
                -webkit-align-items: center;
                -webkit-justify-content: center;
                align-items: center;
                justify-content: center;
            }

            .csrSelecteSchool_wrap {
                line-height: 40px;
                padding-top: 5px;
                padding-bottom: 5px;
                color: #FFF;

                .csrSelSch {
                    max-width: 6rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .dtable {
            .classSaleRate_list_head {
                line-height: 50px;
                padding-left: 12px;
                padding-right: 12px;
                border-bottom: 1px solid #CCC;
                display: flex;
                justify-content: space-between;

                .header-text {
                    font-weight: 700;
                    color: #333;
                }
            }

            #classSaleRate_section a.classSaleRatePop {
                color: #fff;
            }

            .classSaleRate_list {
                display: flex;
                flex-direction: column
            }

            .classSaleRate_list>.classSaleRate_list_item {
                line-height: 50px;
                padding-left: 12px;
                padding-right: 12px;
                border-bottom: 1px solid #eaeaea;
                display: flex;
                justify-content: space-between;
                color: #333;

                .item-count {
                    padding: 0 5px;
                }
            }

            .classSaleRate_list>.classSaleRate_list_item .col-0 {
                padding: 0 5px;
            }

            .classSaleRate_list>.classSaleRate_list_item .classSaleRate_item_color {
                display: inline-block;
                margin-right: 1em;
                width: 10px;
                height: 10px;
                border-radius: 10px;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(1) .classSaleRate_item_color {
                background-color: #ff9191;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(2) .classSaleRate_item_color {
                background-color: #9bcdf3;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(3) .classSaleRate_item_color {
                background-color: #f5ef60;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(4) .classSaleRate_item_color {
                background-color: #cf7edb;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(5) .classSaleRate_item_color {
                background-color: #ebabdd;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(6) .classSaleRate_item_color {
                background-color: #a3edff;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(7) .classSaleRate_item_color {
                background-color: #f8daa8;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(8) .classSaleRate_item_color {
                background-color: #abedd9;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(9) .classSaleRate_item_color {
                background-color: #8a75fb;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(10) .classSaleRate_item_color {
                background-color: #90e496;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(11) .classSaleRate_item_color {
                background-color: #ffe2d0;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(12) .classSaleRate_item_color {
                background-color: #f2b6bd;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(13) .classSaleRate_item_color {
                background-color: #a6aeff;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(14) .classSaleRate_item_color {
                background-color: #8aeee3;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(15) .classSaleRate_item_color {
                background-color: #fd58b0;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(16) .classSaleRate_item_color {
                background-color: #e5b563;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(17) .classSaleRate_item_color {
                background-color: #a7df74;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(18) .classSaleRate_item_color {
                background-color: #ffea86;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(19) .classSaleRate_item_color {
                background-color: #ff6ee4;
            }

            .classSaleRate_list>.classSaleRate_list_item:nth-child(20) .classSaleRate_item_color {
                background-color: #c891ff;
            }

        }

        .banner_chart {
            width: 100%;
            height: 11.4em;
        }
    }

    .scroll {
        @include position-absolute(50px, 0, 0, 0);
    }
}

.noData-temp,
.as-state {
    @include position-absolute;
}

.as-state {
    z-index: 2;
}

.loading {
    @include position-absolute(50px, 0, 0, 0);
}
</style>

<template>
<scroller-base class="scroll" :data="dataList">
    <div class="comment-list-container">
        <!-- 头部日期筛选 -->
        <div class="header">
            <div class="date-filter">
                <div>开班：</div>
                <date-bar :sdate='classSaleRate.sdate' :edate='classSaleRate.edate' :index="quickDateIndex" @changeDate="changeDate">
                </date-bar>
            </div>
            <div class="filter-bar" @click="filter" :class="filterSelect?'color-blue':''">
                <span>筛选</span>
                <svg class="icon">
                <use xlink:href="#ixz-shaixuan"></use>
            </svg>
            </div>

        </div>

        <!-- 内容部分 -->
        <div class="list-body">
            <!-- cavans图表区 -->
            <div class="csr_chart_wrap" v-if="dataList.length > 0">
                <div class="csrSelecteSchool_wrap  flex_center">
                    <div class="csrSelecteSchool flex_center" @click="showSelectCampus=true">
                        <div class="csrSelSch col-1">{{campusName}}</div>
                        <div class="scrCNo col-0">{{campusName1}}</div>
                        <svg class="iconfont_xz col-0" aria-hidden="true"><use xlink:href="#ixz-xiangyou"></use></svg>
                    </div>
                </div>
                <div class="csrSet" data-target="section" @click="showSetFlag=true">
                    <svg class="iconfont_xz col-0" aria-hidden="true"><use xlink:href="#ixz-shezhi"></use></svg>
                    设置
                </div>
                <!-- <canvas id="csr_chart" class="banner_chart" ></canvas> -->
                <xgjcharts class="banner_chart" :options="options" :resizeFalg="resizeFalg"></xgjcharts>
            </div>
            <!-- 表格数据区 -->
            <div class="dtable">
                <div class="classSaleRate_list_head">
                    <p class="header-text">满班率</p>
                    <p class="header-text">班级数</p>
                </div>
                <div class="classSaleRate_list">
                    <div class="classSaleRate_list_item" v-for="(item,index) in dataList" :key='index' @click="classClick(item)">
                        <div>
                            <i class="classSaleRate_item_color"></i>{{item.FullClassRand}}
                        </div>
                        <div class="item-count">
                            <span>{{item.ClassCount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 选择校区 -->
        <select-campus :opened.sync="showSelectCampus" :campusList="campusList" @close="showSelectCampus = false" @selectCampus="selectCampus">
        </select-campus>
        <classSaleRateSetup :opened.sync="showSetFlag" :setupData="csrsListData" @resetData="resetData" @close="showSetFlag = false"></classSaleRateSetup>
        <class-details :opened.sync="showDetail" :classid="classid" @close="showDetail = false" :FullClassRand="FullClassRand"></class-details>
        <loading class="loading" v-show="isLoading" :isDefault="false"></loading>
    </div>
</scroller-base>
</template>

<script>
import {
    getClassFull
} from "teacher/api/classSale";
import classSaleRateSetup from './child/classSaleRateSetup';
import selectCampus from './child/selectCampus';
import classDetails from './child/classDetails';
const colorArr = ['#ff9191', '#9bcdf3', '#f5ef60', '#cf7edb', '#ebabdd', '#a3edff', '#f8daa8', '#abedd9', '#8a75fb', '#90e496', '#ffe2d0', '#f2b6bd', '#a6aeff', '#8aeee3', '#fd58b0', '#e5b563', '#a7df74', '#ffea86', '#ff6ee4', '#c891ff'];
const colorArr1 = ['#31a0f8', '#5ab2f8', '#4dadf8', '#5db3f8', '#3da5f8']; // 无数据
export default {
    name: "class-sale",
    data() {
        return {
            wxTitle: "满班率报表",
            isLoading: false,
            showSetFlag: false,
            quickDateIndex: -1,
            dataList: [],
            classSaleRate: {
                "teacherid": "", //员工列表：不传代表所有，
                "term": "", //期段
                "grade": "", //年级
                "subject": "", //科目
                "category": "", //类型
                "sdate": "", //开班时间开始时间
                "edate": "", //开班时间结束时间
                "isOneToOne": 0, //是否包含已结业，1包含，0不包含
                "otherClass": 0, //是否包含试听及补课班级，0包含，1不包含
                "year": '',
                "campusids": "", //校区ID
                "isMasterCome": 1
            },
            csrsListData: [],
            showSelectCampus: false,
            campusList: [],
            showDetail: false,
            classid: '',
            FullClassRand: '',
            resizeFalg: 0,
            options: {
                title: {
                    text: "满班率",
                    left: 'center',
                    top: 'center',
                    textStyle: {
                        color: "#fff",
                        fontSize: '24',
                        fontWeight: '400'
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['74%', '87%'],
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        // {value:335},
                        // {value:310},
                        // {value:234},
                        // {value:135},
                        // {value:1548}
                    ]
                }]
            },
            filterData: {},
        };
    },
    computed: {
        campusName() {
            let str = '';
            if (this.campusList.length > 0) {
                str = this.campusList[0].Name;
            }
            return str;
        },
        campusName1() {
            let str = '不限' + app.sysInfo.Title_Campus;
            if (this.campusList.length > 1) {
                str = '等' + this.campusList.length + '个' + app.sysInfo.Title_Campus;
            } else if (this.campusList.length == 1) {
                str = '';
            };
            return str;
        },
        filterSelect() {
            if (this.filterData.category) {
                if (this.classSaleRate.teacherid || this.filterData.checkJieYe || this.filterData.checkTry) {
                    return true;
                } else if (this.filterData.term.length > 0 || this.filterData.grade.length > 0 || this.filterData.subject.length > 0 || this.filterData.category.length > 0 || this.filterData.year.length > 0) {
                    return true;
                }
            }
            return false;
        }
    },
    methods: {
        filter() {
            app.courseFilter({
                type: 'teacher',
                initData: this.filterData,
                hasMore: true
            }).then(res => {
                console.log(res);
                this.filterData = res;
                this.resetData();
            })
        },
        classClick(item) {
            this.classid = item.classData.join();
            this.FullClassRand = item.FullClassRand;
            console.log(this.classid);
            this.showDetail = true;
        },
        changeDate(obj) {
            this.classSaleRate.sdate = obj.sdate;
            this.classSaleRate.edate = obj.edate;
            this.quickDateIndex = obj.index;
            this.resetData();
        },
        setFilterData() {
            if (this.filterData.category) {
                this.classSaleRate.teacherid = this.filterData.teacherID; //员工列表：不传代表所有，
                this.classSaleRate.term = this.filterData.term.map(item => {
                    return item.ID
                }).join(); //期段
                this.classSaleRate.grade = this.filterData.grade.map(item => {
                    return item.ID
                }).join(); //年级
                this.classSaleRate.subject = this.filterData.subject.map(item => {
                    return item.ID
                }).join(); //科目
                this.classSaleRate.category = this.filterData.category.map(item => {
                    return item.ID
                }).join(); //类型
                this.classSaleRate.year = this.filterData.year.map(item => {
                    return item.ID
                }).join(); // 时间
                this.classSaleRate.isOneToOne = this.filterData.checkJieYe ? 1 : 0; //是否包含已结业，1包含，0不包含
                this.classSaleRate.otherClass = this.filterData.checkTry ? 0 : 1; //是否包含试听及补课班级，0包含，1不包含
            }
        },
        resetData() {
            this.isLoading = true;
            this.csrsListData = [];
            this.dataList = [];
            this.setFilterData();
            getClassFull(this.classSaleRate).then(res => {
                if (res.ErrorCode == app.errok) {
                    this.dataList = res.Data;
                    this.options.series[0].data = [];
                    let num = 0;
                    this.dataList.forEach((item, i) => {
                        this.options.series[0].data.push({
                            value: item.ClassCount,
                            itemStyle: {
                                color: colorArr[i]
                            }
                        })
                        num += item.ClassCount;
                        let arr = item.FullClassRand.split('-');
                        let num1 = parseInt(arr[0]);
                        let num2 = parseInt(arr[1]);
                        this.csrsListData.push([num1, num2]);
                    })
                    if (num == 0) {
                        this.options.series[0].data = [];
                        this.dataList.forEach((item, i) => {
                            this.options.series[0].data.push({
                                value: 1,
                                itemStyle: {
                                    color: colorArr1[i]
                                }
                            })
                        })
                    }


                    console.log(this.options);
                    this.resizeFalg++;
                    this.isLoading = false;
                }
            })
        },
        //选择校区
        selectCampus(arr) {
            this.showSelectCampus = false;
            this.campusList = arr;
            this.classSaleRate.campusids = this.campusList.map(obj => {
                return obj.Key
            }).join();
            this.resetData();
        },
    },
    created() {
        this.classSaleRate.sdate = app.tool.getDatesByIndex(3).sdate;
        this.classSaleRate.edate = app.tool.getDatesByIndex(3).edate;
        this.resetData();
    },
    watch: {
        showDetail(newval) {
            if (!newval) {
                this.wxTitle = "满班率报表";
                app.tool.setDocTitle(this.wxTitle);
            }
        },
        showSetFlag(newval) {
            if (newval) {
                this.wxTitle = "满班率分组设置";
                app.tool.setDocTitle(this.wxTitle);
            }else {
                this.wxTitle = "满班率报表";
                app.tool.setDocTitle(this.wxTitle);
                this.csrsListData = [];
                this.dataList.forEach((item, i) => {
                    let arr = item.FullClassRand.split('-');
                    let num1 = parseInt(arr[0]);
                    let num2 = parseInt(arr[1]);
                    this.csrsListData.push([num1, num2]);
                })
            }
        }
    },
    mounted() {},
    beforeDestroy() {},
    components: {
        classSaleRateSetup,
        selectCampus,
        classDetails,
    }
};
</script>
