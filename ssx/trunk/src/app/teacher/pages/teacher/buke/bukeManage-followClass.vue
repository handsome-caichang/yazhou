<style scoped lang="scss">
    
    

    .bukeManage-followClass-container {
        .scroller {
            @include position-absolute(54px, 0, 74px, 0);
            .item{
                position: relative;
                line-height: 1;
                padding: 15px 10px 15px 40px;
                background-color: $color-white;
                @include border-bottom;
                .item-top{
                    color: $color-3;
                    font-size: 16px;
                    clear: both;
                    .date{
                        margin: 0 3px;
                    }
                    .class-counts{
                        color: $color-9;
                        font-size: 12px;
                        .count{
                            color: $color-3;
                        }
                    }
                    .tname{
                        display: block;
                        max-width: 15%;
                        float: right;
                        font-size: 12px;
                        color: #8B572A;
                        line-height: 16px;
                        /*padding-right: 2px;*/
                        @include ellipsis-single;
                    }
                }
                .item-bottom{
                    margin-top: 15px;
                    font-size: 12px;
                    .croom{
                        display: inline-block;
                        width: 42%;
                        color: $color-9;
                        @include ellipsis-single;
                        .name{
                            color: $color-3;
                        }
                        &.cfg{
                            width: 50%;
                        }
                    }
                    .cprogress{
                        display: inline-block;
                        width: 32%;
                        color: $color-9;
                        @include ellipsis-single;
                        .progress{
                            color: $color-3;
                        }
                    }
                    .ctime{
                        display: inline-block;
                        width: 26%;
                        vertical-align: top;
                        text-align: right;
                        color: $color-9;
                        &.cfg{
                            width: 50%;
                        }
                    }
                }
                .icon{
                    font-size: 18px;
                    position: absolute;
                    left: 15px;
                    top: 28px;
                }
            }
        }
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
        }
        .footer {
            position: absolute;
            width: 100%;
            bottom: 0;
            .stus{
                height: 30px;
                line-height: 30px;
                background-color: #FFF8A6;
                color:$color-6;
                padding: 0 15px;
                @include ellipsis-single;
                .name{
                    color: $color-3;
                    margin-left: 15px;

                }
            }
            .btn-area{
                height: 44px;
                line-height: 44px;
                text-align: center;
                font-size: 16px;
                display: flex;
                .cancel{
                    flex: 1;
                    color: $color-3;
                    background-color: $color-white;
                }
                .submit{
                    flex: 1;
                    color: $color-white;
                    background-color: $color-primary;
                }
            }
        }
    }

    .void {
        width: 100%;
        height: 10px;
        background-color: $color-assist-1;
    }
    .noData-temp{
        @include position-absolute(54px, 0, 74px, 0);
    }
    .as-filter{
        @include position-absolute;
        z-index: 2;
    }
</style>

<template>
    <div class="bukeManage-followClass-container">
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
                <div class="buke-filter" @click="openMultipleFilterAS">
                    <div>筛选</div>
                </div>
            </div>
        </div>
        <div class="void"></div>
        <scroller-super
                class="scroller"
                :type="2"
                :data="list"
                :pagingOption="pagingOption"
                @loadData="loadData"
                ref="bukeNewClassScroller">
            <div class="item" v-for="(item,index) in list" :key="index" @click="selectFollowClass(item)">
                <div class="item-top">
                    {{item.bukeWeek}}<span class="date">{{item.bukeDateTime}}</span><!----><span class="class-counts">
                        在班人数：<span class="count">{{item.StudentCount}}/{{item.MaxStudentsAmount}}</span>
                    </span><!----><span class="tname">{{item.TeacherNames}}</span>
                </div>
                <div class="item-bottom">
                    <span class="croom" :class="{'cfg':!item.showbar}">教室：<span class="name">{{item.ClassroomName}}</span>
                    </span><!----><span class="cprogress" v-if="item.showbar">进度：<span class="progress">{{item.FinishedCourseNumbers}}/{{item.CreatedCourseNumbers}}</span>
                    </span><!----><span class="ctime" :class="{'cfg':!item.showbar}">
                    时长：<span class="time">{{item.Duration}}</span></span>
                </div>
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.ID==checkedClassID?'#icon-danxuan':'#icon-danxuan-weixuanze'"></use>
                </svg>
            </div>
            <empty-page class="noData-temp" v-if="list.length==0" :type="1" text="还没有补课班级~"></empty-page>

        </scroller-super>
        <div class="footer">
            <div class="stus">
                上课学员<span class="name" v-for="item in students">{{item.Name}}</span>
            </div>
            <div class="btn-area">
                <div class="submit" @click="submit">确认</div>
            </div>
        </div>
        <loading class="loading" v-show="isLoading"></loading>
        <!--筛选-->
        <follow-multiple-filter
                class="as-filter"
                @bukeFollowMultiple="acceptMultiple"
                :shiftObj="shiftObj"
                :opened.sync="openMultiple">

        </follow-multiple-filter>
    </div>
</template>

<script>
    import {getBukeFollowList} from 'teacher/api/buke';
    import {savePost} from "teacher/api/common";
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';
    import FollowMultipleFilter from "./child/follow-multiple-filter"

    export default {
        name: "bukeManage-followClass",
        data(){
            return{
                wxTitle: "跟班补课",
                quickDateIndex:-1,
                isLoading:true,
                openMultiple:false,//打开筛选
                shiftObj:{//用于筛选组件的参数
                    id:'',
                    name:''
                },
                list:[],//主数据
                checkedClassID:'',//选中的跟班班级id
                students:[],//跟班补课的学员
                pagingOption: {
                    api: getBukeFollowList,
                    params: {
                        campus:'',//校区id
                        shift:'',//课程id
                        shiftName:'',//课程名称
                        classId:'',//班级id
                        className:'',//班级名称
                        courseFlag:1,//查询没有取消的排课
                        // startDate:'2014-08-03',//上课开始日期
                        startDate:app.tool.getDatesByIndex(2, app.localTimeToServer).sdate,//上课开始日期
                        endDate:app.tool.getDatesByIndex(2, app.localTimeToServer).edate,//上课结束日期
                        Forenoon:1,//上午
                        Afternoon:1,//下午
                        Nightnoon:1,//晚上
                        finished:0
                    }
                },
                savePara:{
                    type:1,
                    CourseID:'',
                    ShiftID:'',
                    CampusID:'',
                    StartTime:'',
                    EndTime:'',
                    ClassroomID:'',
                    CheckConflict:0,
                    Teachers:[{
                        ID:'00000000-0000-0000-0000-000000000000',
                        Name:'',
                        Role:1
                    },{
                        ID:'00000000-0000-0000-0000-000000000000',
                        Name:'',
                        Role:0
                    }],
                    CstList:[]
                }
            }
        },
        computed:{},
        methods:{
            formatWeekText(date){
                let weekDays = ["周日","周一","周二","周三","周四","周五","周六"],
                    dArr=date.split('T')[0].split('-'),
                    tArr = date.split('T')[1].split(':'),
                    index = new Date(dArr[0],dArr[1]-1,dArr[2],tArr[0],tArr[1],tArr[2]).getDay();
                return weekDays[index]
            },
            formatTimeText(date){
                let dArr = date.split('T')[0].split('-'),
                    tArr = date.split('T')[1].split(':');
                return dArr[1]+'.'+dArr[2]+' '+tArr[0]+':'+tArr[1]
            },
            changeDate(obj){
                this.isLoading = true;
                this.pagingOption.params.startDate = obj.sdate;//显示
                this.pagingOption.params.endDate = obj.edate;//显示
                this.quickDateIndex = obj.index;//快速选日期高亮
                this.$refs.bukeNewClassScroller.refresh({startDate: obj.sdate, endDate: obj.edate})
            },
            // 数据加载
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = [];
                        }
                        res.Data.length&&res.Data.forEach(item=>{
                            item.bukeWeek = this.formatWeekText(item.StartTime);
                            item.bukeDateTime = this.formatTimeText(item.StartTime);
                            item.showbar = app.sysInfo.ShowClassProgressBar==1?true:false;
                        });
                        this.list = this.list.concat(res.Data);
                    }
                    this.isLoading = false;
                })
            },
            //筛选
            openMultipleFilterAS(){
                this.openMultiple = !this.openMultiple;
            },
            //选择班级
            selectFollowClass(item){
                if(!(this.checkedClassID == item.ID)){
                    this.checkedClassID = item.ID;

                    this.savePara.CourseID = item.ID;
                    this.savePara.ClassID= item.ClassID;
                    this.savePara.ShiftID= item.ShiftID;
                    // this.savePara.CampusID  submit赋值
                    this.savePara.StartTime = item.StartTime;
                    this.savePara.EndTime= item.EndTime;
                    this.savePara.ClassroomID= item.ClassroomID;
                }
            },
            //确认
            submit(){
                if(this.checkedClassID==''){
                    app.toast('info','请您选择一个上课教室。');
                    return
                }
                this.savePara.CampusID= this.pagingOption.params.campus;
                this.savePara.CstList = this.students;

                this.send();
            },
            send(){
                savePost({
                    saveFlag:'putmend',
                    data:JSON.stringify(this.savePara)
                }).then(res=>{
                    if(res.errcode==app.errok){
                        app.toast('success', '安排补课成功。');
                        this.$router.back();
                        app.eventDefine.emit('BukeFollowClass');
                    }else{
                        app.toast('error',res.errmsg)
                    }
                })
            },
            acceptMultiple(obj){
                this.isLoading = true;
                this.pagingOption.params.classId = obj.classObj.id;
                this.pagingOption.params.className = obj.classObj.name;
                this.pagingOption.params.courseNumbers = obj.courseNumbers;
                this.$refs.bukeNewClassScroller.refresh(this.pagingOption.params);
            }
        },
        created(){
            let para = app.ls.getStorage('bukeManage');
            this.pagingOption.params.campus = para.campusId;
            this.pagingOption.params.shift = para.shift;
            this.pagingOption.params.shiftName = para.shiftName;
            this.students = para.students;
            this.shiftObj.id = para.shift;//用于筛选组件props
            this.shiftObj.name = para.shiftName;//用于筛选组件props

        },
        components:{
            EmptyPage,
            FollowMultipleFilter
        }
    }
</script>

