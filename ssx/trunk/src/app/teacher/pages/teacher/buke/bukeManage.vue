<style scoped lang="scss">
    
    

    .buke-manage-container {
        background-color: $color-white;
        .header {
            .date-box {
                height: 44px;
                line-height: 44px;
                padding: 0 15px;
                @include flex-between;
                @include border-bottom;
                .buke-filter{
                    width: 48px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    background-color: $color-assist-1;
                    color: $color-6;
                    border-radius: 28px;
                }
            }
            .campus-box {
                padding: 13px 30px 13px 15px;
                font-size: 14px;
                color: $color-6;
                position: relative;
                @include flex-between;
                .campus {
                    max-width: 70%;
                    color: $color-6;
                    @include ellipsis-single;
                }
                .icon {
                    position: absolute;
                    top: 15px;
                    right: 12px;

                }
            }
        }
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 48px;
            line-height: 48px;
            @include shadow-base;
            @include flex-between;
            padding: 10px 12px;
            .btn {
                display: inline-block;
                height: 28px;
                line-height: 28px;
                text-align: center;
                min-width: 100px;
                border-radius: 26px;
                color: $color-3;
                font-size: 15px;
            }
            .btn-1 {
                border: 1px solid #DDDDDD;
                min-width: 65px;
            }
            .btn-2 {
                border: 1px solid $color-primary;
                color:$color-primary;
                margin-left: 10px;
            }
            .btn-3 {
                margin-left: 10px;
                color: $color-white;
                background-color: $color-primary;
            }
        }
        .scroller {
            @include position-absolute(99px, 0, 48px, 0);
            background-color: $color-white;
            &.bottom-distance {
                bottom: 0;
            }
            .card {
                line-height: 1;
                @include border-bottom;
                position: relative;
                .base-info {
                    margin-bottom: 15px;
                    @include ellipsis-single;
                    .sname {
                        color: $color-3;
                        font-size: 16px;
                    }
                    .serial {
                        margin-left: 5px;
                        font-size: 11px;
                        color: $color-9;
                    }
                    .reason {
                        margin-left: 17px;
                        font-size: 12px;
                        color: #8C572A;
                    }
                }
                .class-info {
                    font-size: 12px;
                    display: flex;
                    .cname {
                        margin-right: 15px;
                        color: $color-9;
                        flex: 1;
                        @include ellipsis-single;
                        .name {
                            color: $color-3;
                        }
                    }
                    .ctime {
                        width: 140px;
                        color: $color-9;
                        .time {
                            color: $color-3;
                        }
                    }
                }
            }
            .card0 {
                padding: 15px 10px 15px 40px;
                .icon {
                    position: absolute;
                    top: 28px;
                    left: 15px;
                    font-size: 18px;
                }
            }
            .card1 {
                padding-right: 60px;
                .card-lf {
                    padding: 10px;
                }
                .card-rt {
                    position: absolute;
                    width: 60px;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .back-mend {
                        display: inline-block;
                        width: 40px;
                        height: 22px;
                        line-height: 22px;
                        font-size: 13px;
                        color: #BBBBBB;
                        text-align: center;
                        border-radius: 30px;
                        border: 1px solid #CCCCCC;
                    }
                }
            }
            .card2 {
                padding: 15px 10px 15px 10px;
            }
        }
    }

    .noData-temp, .as-campus, .as-filter {
        @include position-absolute;
        z-index: 2;
    }
    .noData-temp.bottom-distance{
        bottom: 0;
    }
    .noList {
        top: 91px;
        bottom: 48px;
    }

    .void {
        width: 100%;
        height: 10px;
        background-color: $color-assist-1;
    }
</style>

<template>
    <div class="buke-manage-container">
        <div class="header">
            <div class="date-box">
                <div class="date">
                    <date-bar
                            class="date"
                            :sdate='pagingOption.params.sdate'
                            :edate='pagingOption.params.edate'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
                <div class="buke-filter" @click="openMultipleFilterAS">
                    <div>筛选</div>
                </div>
            </div>
            <div class="campus-box" @click="openCampusActionsheet">
                <div class="describe">选择{{app.sysInfo.Title_Campus}}</div>
                <div class="campus">{{currentCampu.name}}</div>
                <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-youjiantou">
                    </use>
                </svg>
            </div>

        </div>
        <div class="void"></div>
        <div class="body">
            <scroller-super
                    class="scroller"
                    :class="{'bottom-distance':pagingOption.params.type!==0}"
                    :type="2"
                    :data="list"
                    :pagingOption="pagingOption"
                    @loadData="loadData"
                    ref="bukeScroller">
                <!--未安排补课-->
                <div class="card0 card" v-if="pagingOption.params.type==0" @click="selectStu(item)"
                     v-for="(item,index) in list" :key="index">
                    <div class="base-info">
                        <span class="sname">{{item.StudentName}}</span>
                        <span class="serial">{{item.Serial}}</span>
                        <span class="reason">{{item.AbsentName}}</span>
                    </div>
                    <div class="class-info">
                        <span class="cname">
                            班级：<span class="name">{{item.ClassName}}</span>
                        </span>
                        <span class="ctime">
                            上课时间：<span class="time">{{item.StartTime}}</span>
                        </span>
                    </div>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.checked?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                    </svg>
                </div>

                <!--已安排补课未上课-->
                <div class="card1 card" v-if="pagingOption.params.type==1" v-for="(item,index) in list" :key="index">
                    <div class="card-lf" @click="getDetail(item.MendCourseID,item.StudentName)">
                        <div class="base-info">
                            <span class="sname">{{item.StudentName}}</span>
                            <span class="serial">{{item.Serial}}</span>
                            <span class="reason">{{item.AbsentName}}</span>
                        </div>
                        <div class="class-info">
                            <span class="cname">
                            班级：<span class="name">{{item.ClassName}}</span>
                            </span>
                            <span class="ctime">上课时间：<span class="time">{{item.StartTime}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="card-rt">
                        <span class="back-mend" @click="backMend(item)">撤销</span>
                    </div>
                </div>

                <!--已安排补课已上课-->
                <div class="card2 card" v-if="pagingOption.params.type==2"
                     @click="getDetail(item.MendCourseID,item.StudentName)"
                     v-for="(item,index) in list" :key="index">
                    <div class="base-info">
                        <span class="sname">{{item.StudentName}}</span>
                        <span class="serial">{{item.Serial}}</span>
                        <span class="reason">{{item.AbsentName}}</span>
                    </div>
                    <div class="class-info">
                        <span class="cname">班级：<span class="name">{{item.ClassName}}</span></span>
                        <span class="ctime">上课时间：<span class="time">{{item.StartTime}}</span></span>
                    </div>
                </div>
            </scroller-super>
            <empty-page class="noData-temp noList" :class="{'bottom-distance':pagingOption.params.type!=0}" type=1 text="还没有补课信息~" v-if="list.length == 0"></empty-page>
        </div>
        <div class="footer" v-show="pagingOption.params.type==0">
            <div>
                <div class="btn btn-1" v-if="MissStudentDelete" @click="deleteStu">删除</div>
            </div>
            <div>
                <div class="btn btn-2" v-if="MissStudentPlanCourse" @click="bukeAction(0)">跟班补课</div>
                <div class="btn btn-3" v-if="MissStudentPlanCourse" @click="bukeAction(1)">新开班补课</div>
            </div>

        </div>
        <loading class="loading" v-show="isLoading"></loading>
        <empty-page class="noData-temp" type=2 text="该用户没有可操作分校，请联系管理员~"
                    v-if="campusList.length == 0"></empty-page>
        <!--选择分校-->
        <buke-campus
                v-if="campusList.length > 0"
                class="as-campus"
                :opened.sync="openAsCampus"
                :campusList="campusList"
                :curCampuId="currentCampu.id"
                @bukeCampus="campuAction">
        </buke-campus>
        <!--补课详情-->
        <detail-filter
                v-if="campusList.length > 0"
                class="as-filter"
                :dataObj="detailObj"
                :opened.sync="openDetail">
        </detail-filter>
        <!-- 筛选 -->
        <multiple-filter
                v-if="campusList.length > 0"
                class="as-filter"
                @bukeMultiple="acceptMultiple"
                :absent="dictionary"
                :opened.sync="openMultiple">
        </multiple-filter>
    </div>
</template>

<script>
    import {processPost, savePost, processGet} from "teacher/api/common";
    import {getBukeDetail, getBukeClassroom} from 'teacher/api/buke';
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';
    import bukeCampus from './child/buke-campus';
    import detailFilter from './child/detail-filter';
    import multipleFilter from './child/multiple-filter';

    export default {
        name: "bukeManage",
        data() {
            return {
                wxTitle: "补课管理",
                MissStudentDelete: app.tool.op('MissStudentDelete'),//删除待补课记录
                MissStudentPlanCourse: app.tool.op('MissStudentPlanCourse'),//安排补课
                MissStudentBackCourse: app.tool.op('MissStudentBackCourse'),//撤销补课
                uerId: '',//基础参数信息
                userName: '',//基础参数信息
                dictionary: '',//基础参数信息 缺勤原因
                isLoading: true,
                quickDateIndex: -1,
                currentCampu: {
                    name: '',
                    id: ''
                },
                campusList: [],//校区数据
                openAsCampus: false, //是否展开‘校区选择’组件
                openDetail: false,//是否展开‘补课详情’组件
                openMultiple: false,//是否展开‘筛选’组件
                detailObj: {//查看详情
                },
                list: [],//学员数据（主要数据）
                pagingOption: {
                    api: processPost,
                    params: {
                        pname: "querymend",
                        studentName: "",//学生姓名
                        sdate: '',//开始时间
                        edate: '',//结束时间
                        absentCauseId: '',//请假原因id
                        className: '',//班级名称
                        shiftName: '',//课程名称
                        sort: '',//排序
                        // page: '',//分页
                        type: 0,//0是未安排补课，1是已安排补课未上课，2是已安排补课已上课
                        ShiftId: '',//课程id
                        ClassId: '',//班级id
                        CampusId: '',//校区id
                        teacherids: ''//老师id
                    },
                    pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'page',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'pageSize',
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: 'pageCount'
                    },
                },
                scrollerRefreshNum: 0
            }
        },
        computed: {},
        methods: {
            formatDateText(date) {
                let dArr = date.split('T')[0].split('-'),
                    tArr = date.split('T')[1].split(':');
                return dArr[1] + '.' + dArr[2] + ' ' + tArr[0] + ':' + tArr[1];
            },
            //获取基础参数
            getBaseData() {
                processPost({
                    pname: 'getcoursemenddictionary'
                }).then(res => {
                    this.userId = res.userId;
                    this.userName = res.userName;
                    this.dictionary = res.data.CauseList;
                })
            },
            // 数据加载
            loadData(ajaxPromise) {
                if (this.campusList.length < 1) {
                    return
                }
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = [];
                        }
                        if (this.pagingOption.params.type == 0) {
                            res.data.forEach(item => {
                                item.StartTime = this.formatDateText(item.StartTime);
                                item.checked = false;
                            });
                        } else {
                            // 格式化时间
                            res.data.forEach(item => {
                                item.StartTime = this.formatDateText(item.StartTime);
                            });
                        }

                        this.list = this.list.concat(res.data);
                    }
                })
            },
            //查看补课详情
            getDetail(id, name) {
                this.isLoading = true;
                getBukeDetail({
                    id: id
                }).then(res => {
                    this.detailObj = res.Data;
                    this.detailObj.StudentName = name;
                    this.isLoading = false;
                    this.openDetail = true;
                })
                //弹框提示的内容要不要转义？？
            },
            //撤销
            backMend(item) {
                //权限判断
                if (!this.MissStudentBackCourse) {
                    app.alert({
                        'title': '权限不足',
                        'text': '未授权。此操作需要以下权限：教务管理 - 补课管理 - 撤销补课',
                        btn: {
                            'text': '知道了',
                            'style': {},
                            'action': true
                        }
                    });
                    return;
                }

                app.confirm({
                    title: "提示",
                    text: `确定要撤销 '${item.StudentName}' 的补课信息吗？`
                }).then(res => {
                    if (res) {
                        savePost({
                            saveFlag: 'backmend',
                            id: item.CStid,//排课记录id
                            mendCourseId: item.MendCourseID,//补课排课id
                            studentUserId: item.StudentUserID//学员id
                        }).then(res => {
                            if (res.errcode == app.errok) {
                                app.toast('success', '撤销成功。');
                                this.isLoading = true;
                                this.$refs.bukeScroller.refresh();
                            } else {
                                app.toast('error', '撤销失败。');
                            }
                        })
                    }
                })
            },

            //日期选择
            changeDate(obj) {
                this.isLoading = true;
                this.pagingOption.params.sdate = obj.sdate;//显示
                this.pagingOption.params.edate = obj.edate;//显示
                this.quickDateIndex = obj.index;//快速选日期高亮
                this.$refs.bukeScroller.refresh({sdate: obj.sdate, edate: obj.edate})
            },
            openMultipleFilterAS() {
                this.openMultiple = !this.openMultiple;
            },
            // 打开校区弹窗
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
                this.$refs.bukeScroller.refresh({
                    'CampusId': obj.ID
                });
                app.ls.setStorage('bukeManageCampusId', {
                    campusId: obj.ID
                });
            },
            // 选择为安排补课学员
            selectStu(item) {
                item.checked = !item.checked;
            },
            //跟班补课||新开班补课
            bukeAction(flag) {
                //flag：0 跟班补课  1新开班补课
                if (!this.MissStudentPlanCourse) {
                    app.alert({
                        'title': '权限不足',
                        'text': '未授权。此操作需要以下权限：教务管理 - 补课管理 - 安排补课',
                        btn: {
                            'text': '知道了',
                            'style': {},
                            'action': true
                        }
                    });
                    return;
                }

                //学员不能重复
                let checkedStuLength = 0,//所选学员数量
                    checkedList = [];//所选学员数据列表
                this.list.forEach(item => {
                    item.checked && checkedStuLength++;
                    item.checked && checkedList.push(item);
                });
                if (checkedStuLength == 0) {
                    app.toast('info', '请先选择需要补课的学员。');
                    return
                } else {
                    let ids = [],
                        returnFlag = false;
                    for (let i = 0; i < checkedList.length; i++) {
                        let item = checkedList[i];
                        if (ids.indexOf(item.StudentUserID) == -1) {
                            ids.push(item.StudentUserID);
                        } else {
                            returnFlag = true;
                            app.toast('info', `${item.StudentName} 已经重复。`);
                            break
                        }
                    }
                    if (returnFlag) {
                        return
                    }
                }

                //课程不同不能同时安排补课
                let defaultStudent = checkedList[0],////默认所选第一个学员信息作为对比数据
                    shiftReturnFlag = false;
                for (let i = 0; i < checkedList.length; i++) {
                    let item = checkedList[i];
                    if (defaultStudent.ShiftID != item.ShiftID) {
                        app.toast('info', `${defaultStudent.StudentName} 与其他学员的缺勤课程不相同，不能同时安排补课。`);
                        shiftReturnFlag = true;
                        break
                    }
                }
                if (shiftReturnFlag) {
                    return
                }

                let studentArr = [];
                checkedList.forEach(item => {
                    studentArr.push({
                        'Name': item.StudentName,
                        'StudentID': item.StudentUserID,
                        'CstID': item.CStid
                    })
                });

                //共享参数丢状态机
                app.ls.setStorage('bukeManage', {
                    shift: defaultStudent.ShiftID,
                    shiftName: defaultStudent.ShiftName,
                    students: studentArr,
                    campusId: this.pagingOption.params.CampusId,
                    userId: this.userId,
                    userName: this.userName
                });

                //顺利安排补课
                if (flag == 0) {
                    this.$router.push({path: `/bukeManageFollowClass`})
                } else {
                    //获取教室信息 注意参数大小写
                    getBukeClassroom({
                        campusId: this.pagingOption.params.CampusId
                    }).then(res => {
                        if (res.Data.length) {
                            //共享参数丢状态机
                            app.ls.setStorage('bukeManageClassroom', {
                                filterClassRoom: res.Data
                            });
                            this.$router.push({path: `/bukeManageNewClass`})
                        } else {
                            app.toast('info', '该校区暂未设置教室。')
                        }
                    });

                }

            },
            //删除学员
            deleteStu() {
                //权限判断
                if (!this.MissStudentDelete) {
                    app.alert({
                        'title': '权限不足',
                        'text': '未授权。此操作需要以下权限：教务管理 - 补课管理 - 删除待补课记录',
                        btn: {
                            'text': '知道了',
                            'style': {},
                            'action': true
                        }
                    });
                    return;
                }
                let nameArr = [], idArr = [];
                this.list.forEach(item => {
                    if (item.checked) {
                        idArr.push(item.CStid);
                        nameArr.push(item.StudentName);
                    }
                });
                //没有选择学员时提示
                if (idArr.length == 0) {
                    app.toast('info', '请先选择需要删除的学员。');
                    return
                }
                //confirm
                let confirmText = nameArr.join(',');
                app.confirm({
                    title: "确定要删除以下学员吗？",
                    text: confirmText
                }).then(res => {
                    if (res) {
                        savePost({
                            saveFlag: 'deletemend',
                            id: idArr.join(',')
                        }).then(res => {
                            if (res.errcode == app.errok) {
                                app.toast('success', '删除成功。');
                                this.isLoading = true;
                                this.$refs.bukeScroller.refresh();
                            } else {
                                app.toast('error', '删除失败。')
                            }
                        })
                    }
                })

            },
            handleEmit() {
                this.isLoading = true;
                this.$refs.bukeScroller.refresh();
            },
            acceptMultiple(obj) {
                this.isLoading = true;
                // 重置确认都要赋值再刷新
                this.pagingOption.params.type = obj.type;
                this.pagingOption.params.ClassId = obj.ClassId;
                this.pagingOption.params.ShiftId = obj.ShiftId;
                this.pagingOption.params.absentCauseId = obj.absentCauseId;
                this.pagingOption.params.className = obj.className;
                this.pagingOption.params.shiftName = obj.shiftName;
                this.pagingOption.params.studentName = obj.studentName;
                this.$refs.bukeScroller.refresh(this.pagingOption.params);
            }
        },
        created() {
            this.campusList = app.sysInfo.CampusList;//校区赋值
            if(app.sysInfo.CampusList.length>0){
                this.pagingOption.params.CampusId = (app.sysInfo.CampusList.length && app.sysInfo.CampusList[0].ID) || '';//课程列表所需第一个校区id
                //共享参数补课校区id
                app.ls.setStorage('bukeManageCampusId', {
                    campusId: this.pagingOption.params.CampusId
                });
                this.pagingOption.params.sdate = app.tool.getDatesByIndex(2, app.localTimeToServer).sdate;
                this.pagingOption.params.edate = app.tool.getDatesByIndex(2, app.localTimeToServer).edate;
                this.currentCampu.name = app.sysInfo.CampusList[0].Name;//组件回显
                this.currentCampu.id = app.sysInfo.CampusList[0].ID;//组件回显
                this.getBaseData();//获取基础信息
            }

        },
        mounted() {
            app.eventDefine.on('BukeNewClass', this.handleEmit);
            app.eventDefine.on('BukeFollowClass', this.handleEmit);
        },
        beforeDestroy() {
            app.eventDefine.off('BukeNewClass', this.handleEmit);
            app.eventDefine.off('BukeFollowClass', this.handleEmit);
        },
        components: {
            EmptyPage,
            bukeCampus,
            detailFilter,
            multipleFilter
        }
    }
</script>

