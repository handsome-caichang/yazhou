<style scoped lang="scss">
    
    
    .wrapper {
        .header {
            @include flex-between;
            padding: 0 10px;
            height: 40px;
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
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .title {
            height: 40px;
            @include flex-between;
            padding: 0 15px;
            font-size: 13px;
            color: #999;
            border-bottom: 1px solid $color-assist-1;
            
            .name, .grade, .campus {
                flex: 1;
            }
            .grade {
                padding-left: 10px;
            }
        }
        .icon-wrapper {
            width: 30px;
        }
        .scroll {
            @include position-absolute(90px, 0, 49px, 0);
            .item {
                @include flex-between;
                padding: 9px 15px;
                background-color: $color-white;
                border-bottom: 1px solid $color-assist-1;
                .stu-info {
                    flex: 1;
                    .name {
                        font-size: 15px;
                        color: $color-3;
                    }
                    .number {
                        font-size: 11px;
                        color: $color-9;
                    }
                }
                .grade {
                    flex: 1;
                    padding-left: 10px;
                    color: $color-6;
                    font-size: 14px;
                }
                .campus {
                    flex: 1;
                    font-size: 14px;
                    color: #060606;
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            line-height: 49px;
            background-color: $color-primary;
            color: $color-white;
            text-align: center;
            font-size: 15px;
        }
        .as-filter, .as-campus {
            @include position-absolute;
            z-index: 2;
        }
        .noData-temp {
            @include position-absolute(90px, 0, 49px, 0);
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="date-box">
                <div class="date">
                    <date-bar
                            class="date"
                            :sdate='pagingOption.params.indate1'
                            :edate='pagingOption.params.indate2'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
            </div>
            <div class="buke-filter" @click="showFilter=true">
                筛选
            </div>
        </div>
        <div class="void"></div>
        <div class="title">
            <div class="icon-wrapper"></div>
            <div class="name">姓名</div>
            <div class="grade">年级</div>
            <div class="campus">校区</div>
        </div>
        <scroller-super
                class="scroll"
                ref="scroll"
                :type="2"
                :pagingOption="pagingOption"
                :data="list"
                @loadData="loadData">
                <div>
                    <div class="item" v-for="item in list" @click="item.isSelect=!item.isSelect">
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                            </svg>
                        </div>
                        <div class="stu-info">
                            <div class="name">{{item.Name}}</div>
                            <div class="number">{{item.Serial}}</div>
                        </div>
                        <div class="grade">{{item.Grade}}</div>
                        <div class="campus">{{item.CampusName}}</div>
                    </div>
                </div>
        </scroller-super>
        <div class="bottom" @click="jumpRouter">确定</div>
        <empty-page class="noData-temp"
                    v-if="list.length == 0" 
                    :text="empeyText">
        </empty-page>
        <filter-stu
            class="as-filter"
            :opened.sync="showFilter"
            :stuStatusObj="stuStatusObj"
            :classObj="classObj"
            :shiftObj="shiftObj"
            @selectClassShift="selectClassShift"
            @resetData="resetData"
            @filterConditions="filterConditions">
            
        </filter-stu>

        <!-- 选择班级或者课程 -->
        <select-class
            class="as-campus"
            :opened.sync="showSelectClass"
            :totalObj="totalObj"
            :curStr="curStr"
            @resetClass="resetClass"
            @selectDone="selectDone"></select-class>
    </div>

</template>

<script>
    import {QueryBrief} from 'teacher/api/score'
    import FilterStu from './filterStu.vue'
    import SelectClass from './selectClass'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';
    export default {
        data() {
            return {
                wxTitle: "选择学员",
                quickDateIndex: 4,
                pagingOption: {
                    api: QueryBrief,
                    autoLoadFirst: parseInt(app.sysInfo.EnableStudentQueryEmpty) === 1,
                    params: {
                        campusid: app.ls.get('curCampusObj').id,
                        Query: '',
                        status: 1,
                        sort: 'Name',
                        indate1: app.tool.getDatesByIndex(4, app.localTimeToServer).sdate,
                        indate2: app.tool.getDatesByIndex(4, app.localTimeToServer).edate
                    }
                },
                list: [],
                showFilter: false,
                stuStatusObj: {},

                showSelectClass: false,
                curStr: '',
                classObj: {},
                shiftObj: {},
                enableStudentQueryEmpty: parseInt(app.sysInfo.EnableStudentQueryEmpty) === 1,//开启配置项
                empeyText: this.enableStudentQueryEmpty ? '没找到相关学员' : '请输入需要查询学员的姓名/学号/电话',
                queryText: ''
            } 
        },
        computed: {
            totalObj() {
                /*if (this.curStr === 'shift') return this.shiftObj
                if (this.curStr === 'class') return this.classObj*/
                return {
                    shiftObj: this.shiftObj,
                    classObj: this.classObj
                }
            }
        },
        methods: {
            //日期选择
            changeDate(obj) {
                this.isLoading = true;
                this.pagingOption.params.indate1 = obj.sdate;//显示
                this.pagingOption.params.indate2 = obj.edate;//显示
                this.quickDateIndex = obj.index;//快速选日期高亮
                if (!this.enableStudentQueryEmpty) {
                    let tips = app.tool.checkQueryLength(this.queryText)
                    if (tips) {
                        app.toast('info', tips)
                        return
                    }
                }
                this.$refs.scroll.refresh({indate1: obj.sdate, indate2: obj.edate})
            },
            loadData(ajaxPromise) {
                this.isLoading = false;
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
            selectClassShift(str) {
                this.curStr = str
                this.showSelectClass = true
            },
            resetData() {
                this.classObj = {}
                this.shiftObj = {}
                this.$refs.scroll.refresh({
                    Query: '',
                    status: 1,
                    shiftName: '',
                    shiftId: '',
                    className: '',
                    classId: ''
                })
            },
            resetClass() {
                if (this.curStr === 'shift') this.shiftObj = {}
                if (this.curStr === 'class') this.classObj = {}
            },
            selectDone(obj) {
                if (this.curStr === 'shift') this.shiftObj = obj
                if (this.curStr === 'class') this.classObj = obj
                this.showSelectClass = false
            },
            filterConditions(obj) {
                let params = {}
                this.queryText = params.Query = obj.queryText
                params.status = obj.stuStatusObj.value
                params.shiftName = this.shiftObj.Name
                params.shiftId = this.shiftObj.ID
                params.className = this.classObj.Name
                params.classId = this.classObj.ID
                params.sort = 'Name'

                this.stuStatusObj = obj.stuStatusObj
                this.$refs.scroll.refresh(params)
                this.showFilter = false
            },
            jumpRouter() {
                let tempArr = this.list.filter(obj => obj.isSelect)
                if (!tempArr.length) {
                    app.toast('info', '请选择学员')
                    return     
                }
                let stuId = tempArr.map(obj => obj.ID).join()
                app.ls.set('studentID', stuId)
                this.$router.push(`/stuList/1`)
            }
        },
        created() {
            window.a = this
        },
        components: {
            FilterStu,
            SelectClass,
            EmptyPage
        }
    }
</script>