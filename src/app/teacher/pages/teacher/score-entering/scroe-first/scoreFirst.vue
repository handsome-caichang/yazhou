<!--成绩查询-->
<style scoped lang="scss">
    
    

    .score-query-container {
        background-color: $color-white;
        .header {
            height: 44px;
            @include flex-between;
            padding: 0 12px;
            border-bottom: 1px solid $color-assist-1;
            .date-box {
                flex: 1;
            }
            .buke-filter {
                width: 48px;
                height: 28px;
                line-height: 28px;
                color: $color-6;
                text-align: center;
                background-color: #EEF1F6;
                border-radius: 50px;
                font-size: 13px;
            }
        }
        .campus-box {
            height: 44px;
            font-size: 15px;
            @include flex-between;
            padding: 0 12px;
            .text {
                width: 80px;
                color: $color-6;
            }
            .mid {
                flex: 1;
                text-align: right;
                color: $color-3;
            }
            .icon-wrapper {
                width: 20px;
            }
            @include ellipsis-single;
        }
        .void {
            height: 5px;
            background-color: $color-assist-1;
        }
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 48px;
            line-height: 48px;
            @include shadow-base;
            font-size: 16px;
            background-color: $color-primary;
            color: $color-white;
            text-align: center;
        }
        .scroller {
            @include position-absolute(93px, 0, 48px, 0);
            background-color: $color-white;
            .card {
                background-color: $color-white;
                padding: 12px;
                padding-left: 40px;
                color: $color-3;
                @include border-bottom;
                position: relative;
                .card-lf {
                    position: absolute;
                    top: 0;
                    left: 0;
                    line-height: 1;
                    padding: 40.5px 12px;
                    .icon {
                        font-size: 18px;
                    }
                }
                .card-rt {
                    .rt-box {
                        color: $color-9;
                        .title {
                            @include flex-between;
                            .name {
                                color: $color-3;
                                font-size: 16px;
                                padding-right: 3px;
                                @include ellipsis-single;
                            }
                            .date {
                                font-size: 11px;
                                color: #BBBBBB;
                            }
                        }
                        .content {
                            font-size: 14px;
                            .pro {
                                margin-top: 8px;
                                @include ellipsis-single;
                            }
                            .count {
                                margin-top: 8px;
                                display: flex;
                                .num {
                                    color: $color-3;
                                }
                                .class-num {
                                    width: 27%;
                                    @include ellipsis-single;
                                }
                                .exam-num {
                                    width: 37%;
                                    @include ellipsis-single;
                                }
                                .ave-score {
                                    width: 36%;
                                    @include ellipsis-single;
                                    .num {
                                        color: orange;
                                    }
                                }

                            }
                        }
                    }
                }
                &.left-distance{
                    padding-left: 12px;
                }
            }
            &.bottom-distance{
                bottom:0;
            }
        }
    }

    .noData-temp, .as-campus, .as-filter {
        @include position-absolute;
        z-index: 2;
    }
    .void {
        width: 100%;
        height: 5px;
        background-color: $color-assist-1;
    }
</style>

<template>
    <div class="score-query-container">
        <div class="header">
            <div class="date-box">
                <div class="date">
                    <date-bar
                       class="date"
                       :sdate='pagingOption.params.startDate'
                       :edate='pagingOption.params.endDate'
                       :index="quickDateIndex"
                       @changeDate="changeDate">
                    </date-bar>
                </div>
            </div>
            <div class="buke-filter" @click="showFilter=true">
                筛选
            </div>
        </div>
        <div class="campus-box" @click="openCampusActionsheet">
            <div class="text">选择校区</div>
            <div class="mid">{{currentCampu.name}}</div>
            <div class="icon-wrapper">
                <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            
        </div>
        <div class="void"></div>
        <div class="body">
            <scroller-super
                    class="scroller"
                    :class="{'bottom-distance':!ExamScoreEdit}"
                    :type="2"
                    :data="list"
                    :pagingOption="pagingOption"
                    ref="scoreQueryScroller"
                    @loadData="loadData">
                <div class="card" v-for="(item,index) in list" :key="index" :class="{'left-distance':!ExamScoreEdit}">
                    <div class="card-lf" @click="selectClass(item)" v-if="ExamScoreEdit">
                        <svg aria-hidden="true" class="icon">
                            <use :xlink:href="item.isSelect?'#icon-danxuan':'#icon-danxuan-weixuanze'">
                            </use>
                        </svg>
                    </div>
                    <div class="card-rt">
                        <!-- <router-link tag="div" :to="`/ScoreQueryClass/${item.ID}`" class="rt-box"> -->
                        <div class="rt-box" @click="routerToReviseScore(item)">
                            <div class="title">
                                <div class="name">{{item.Name}}</div>
                                <div class="date">{{item.Date.replace(/\//g,'.')}}</div>
                            </div>
                            <div class="content">
                                <div class="pro">考试项目：{{item.SubJect}}</div>
                                <div class="count">
                                    <div class="class-num">班级数：<span class="num">{{item.ClassNum}}</span></div>
                                    <div class="exam-num">考试人数：<span class="num">{{item.StudentNum}}</span></div>
                                    <div class="ave-score">平均分：<span class="num">{{Math.floor(item.AverageScore*100)/100}}</span></div>
                                </div>
                            </div>
                        </div>
                        <!-- </router-link> -->
                    </div>
                </div>

                <empty-page class="noData-temp" :type="1" text="还没有考试信息~" v-if="list.length == 0"></empty-page>
            </scroller-super>
        </div>

        <div class="footer" @click="inputScore()" v-if="ExamScoreEdit">
            录入成绩
        </div>
        <loading class="loading" v-show="isLoading"></loading>
        <empty-page class="noData-temp" :type="2" text="该用户没有可操作分校，请联系管理员~"
                    v-if="campusList.length == 0"></empty-page>

        <!--选择分校-->
        <select-campus
            class="as-campus"
            :opened.sync="openAsCampus"
            :campusList="campusList"
            :curCampuId="currentCampu.id"
            @scoreCampus="campuAction">
        </select-campus>

        <!-- 筛选 -->
        <filter-term
            class="as-campus"
            :opened.sync="showFilter"
            :examTypeList="examTypeList"
            :examSubjectList="examSubjectList"
            :examSubStr="examSubStr"
            :classObj="classObj"
            @resetData="resetData"
            @selectExamType="selectExamType"
            @selectExamMore="selectExamMore"
            @filterConditions="filterConditions">
            
        </filter-term>

        <!-- 选择考试项目 -->
        <select-exam-item
            class="as-campus"
            :opened.sync="showSelectItem"
            :examSubjectList="examSubjectList"
            @selectExam="selectExam">
            
        </select-exam-item>

        <!-- 选择班级 -->
        <select-class
            class="as-campus"
            :campusObj="currentCampu"
            :opened.sync="showSelectClass"
            :classObj="classObj"
            @selectClassDone="selectClassDone"></select-class>
    </div>
</template>

<script>
    import {getScoreQuery, getExamType} from 'teacher/api/score.js';
    import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';
    import SelectCampus from './selectCampus.vue';
    import FilterTerm from './filterTerm.vue'
    import SelectExamItem from './selectExamItem'
    import SelectClass from './selectClass'

    export default {
        name: "score-query",
        data() {
            return {
                a: 1,
                wxTitle: "成绩查询",
                isLoading: true,
                ExamScoreEdit:null,
                quickDateIndex: 4,
                openAsCampus: false,
                campusList: [],
                currentCampu: {
                    name: '',
                    id: ''
                },
                pagingOption: {
                    api: getScoreQuery,
                    params: {
                        campusID: '',
                        startDate: app.tool.getDatesByIndex(4, app.localTimeToServer).sdate,
                        endDate: app.tool.getDatesByIndex(4, app.localTimeToServer).edate
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
                list: [],
                curExam: {//当前勾选的考试

                },

                showFilter: false,
                showSelectItem: false,
                showSelectClass: false,
                examTypeList: [],
                examSubjectList: [],
                classObj: {}
            }
        },
        computed: {
            examSubStr() {
                let str = ''
                str = this.examSubjectList.filter(obj => obj.isSelect).map(obj => obj.Value).join()
                return str
            },
            curExamObj() {
                let obj = {},
                    tempArr = this.list.filter(obj => obj.isSelect)
                if (tempArr.length > 0) {
                    obj.id = tempArr[0].ID
                    obj.name = tempArr[0].Name
                }
                return obj
            }
        },
        methods: {
            loadData(ajaxPromise) {
                this.isLoading = false;
                if (this.campusList.length < 1) {
                    return
                }
                ajaxPromise.then(res => {
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.Data)
                        this.list.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                    }
                })
            },
            //日期选择
            changeDate(obj) {
                this.isLoading = true;
                this.pagingOption.params.startDate = obj.sdate;//显示
                this.pagingOption.params.endDate = obj.edate;//显示
                this.quickDateIndex = obj.index;//快速选日期高亮
                this.$refs.scoreQueryScroller.refresh({startDate: obj.sdate, endDate: obj.edate})
            },
            selectClass(item) {
                this.list.forEach(obj => {
                    if (obj.ID === item.ID) {
                        obj.isSelect = !obj.isSelect
                    } else {
                        obj.isSelect = false
                    }
                })
            },
            //打开校区
            openCampusActionsheet() {
                if (this.campusList.length == 0) {
                    return
                }
                this.openAsCampus = !this.openAsCampus;
            },
            //接收分校信息
            campuAction(obj) {
                this.isLoading = true;
                this.currentCampu.name = obj.Name;
                this.currentCampu.id = obj.ID;
                this.$refs.scoreQueryScroller.refresh({
                    'campusID': obj.ID
                });
                app.ls.setStorage('bukeManageCampusId', {
                    campusID: obj.ID
                });
            },
            //选择考试类型
            selectExamType(item) {
                this.examTypeList.forEach(obj => {
                    if (obj.ID !== item.ID) {
                        obj.isSelect = false
                    } else {
                        obj.isSelect = true
                    }
                })
            },
            //选择考试项目或者班级
            selectExamMore(str) {
                if (str === 'subject') {
                    this.showSelectItem = true
                } else if(str === 'class') {
                    this.showSelectClass = true
                }
            },
            selectExam(list) {

                this.examSubjectList = app.tool.clone(list)
                this.showSelectItem = false
            },
            selectClassDone(obj) {
                this.classObj = obj
                this.showSelectClass = false
            },
            //成绩录入
            inputScore() {
                if (!this.curExamObj.id) {
                    app.toast('info', '请选择考试。')
                    return
                }
                app.ls.set('curExamObj', this.curExamObj)
                app.ls.set('curCampusObj', this.currentCampu)
                this.$router.push({path: `/scoreImport`})
            },
            //拉取后台数据
            getData() {
                let getExamTypePromise = getExamType({type: 'EXAM_TYPE'}),
                    getExamSubjectPromise = getExamType({type: 'EXAM_SUBJECT'})
                Promise.all([getExamTypePromise, getExamSubjectPromise]).then(res => {
                    if (res[0].ErrorCode == app.errok && res[1].ErrorCode == app.errok) {
                        this.examTypeList = res[0].Data
                        this.examSubjectList = res[1].Data
                        this.examTypeList.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                        this.examSubjectList.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                    }
                })
            },
            //跳转到修改成绩界面去
            routerToReviseScore(item) {
                console.log(item);
                let obj = {
                    name: item.Name,
                    id: item.ID
                }
                app.ls.set('curExamObj', obj)
                this.$router.push({path: `/ScoreQueryClass/${item.ID}`})
            },
            resetData() {
                this.classObj = {}
                this.examTypeList.forEach(obj => obj.isSelect = false)
                this.examSubjectList.forEach(obj => obj.isSelect = false)
                this.$refs.scoreQueryScroller.refresh({
                    query: '',
                    classId: '',
                    subjectId: '',
                    subjectName: '',
                    type: ''
                })
            },
            filterConditions(obj) {
                let params = {}, tempArr
                params.query = obj.queryText
                this.examTypeList = obj.selectTypeArr
                tempArr = this.examTypeList.filter(obj => obj.isSelect)
                params.classId = this.classObj.ID
                params.subjectId = this.examSubjectList.filter(obj => obj.isSelect).map(obj => obj.ID).join()
                params.subjectName = this.examSubStr
                if (tempArr.length) params.type = tempArr[0].ID
                this.showFilter = false
                this.$refs.scoreQueryScroller.refresh(params)
            }
        },
        created() {
            // 权限
            this.ExamScoreEdit = app.tool.op('ExamScoreEdit')
            this.campusList = app.sysInfo.CampusList//校区赋值
            app.ls.setStorage('bukeManageCampusId', {
                campusID: app.sysInfo.CampusList.ID
            });
            this.pagingOption.params.campusID = (app.sysInfo.CampusList.length && app.sysInfo.CampusList[0].ID) || ''//课程列表所需第一个校区id
            this.currentCampu.name = app.sysInfo.CampusList[0].Name//组件回显
            this.currentCampu.id = app.sysInfo.CampusList[0].ID//组件回显
            this.getData()
            
        },
        components: {
            SelectCampus,
            EmptyPage,
            FilterTerm,
            SelectExamItem,
            SelectClass
        }
    }
</script>

