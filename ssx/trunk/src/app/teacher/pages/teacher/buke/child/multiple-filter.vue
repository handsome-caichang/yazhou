<style scoped lang="scss">
    
    

    .multiple-filter-container {
        .as-body {
            @include position-absolute;
        }
        .header {
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            color: $color-6;
            background-color: #f0f0f0;
            .back-btn {
                display: inline-block;
            }
        }
        .menupop {
            padding: 0 12px;
            .category {
                padding: 9px 0;
                @include border-bottom;
                display: flex;
                flex-wrap: wrap;
                .item {
                    margin: 10px 8px 10px 0;
                    max-width: 100%;
                    height: 28px;
                    line-height: 28px;
                    padding: 0 27px;
                    background-color: #f5f5f5;
                    border-radius: 28px;
                    font-size: 12px;
                    color: #4a4a4a;
                    @include ellipsis-single;
                    &.on {
                        color: $color-white;
                        background-color: $color-primary;

                    }
                }
            }
            .filter-item {
                height: 44px;
                line-height: 44px;
                @include flex-between;
                color: $color-6;
                position: relative;
                padding-right: 1.5em;
                @include border-bottom;
                .title {
                    min-width: 5em;
                    color: $color-6;
                }
                .selected {
                    max-width: 12em;
                    color: $color-primary;
                    @include ellipsis-single;
                }
                .icon {
                    font-size: 16px;
                    position: absolute;
                    right: 0px;
                    top: 14px;
                }
            }
            .student-name {
                @include border-bottom;
                .title {
                    height: 44px;
                    line-height: 44px;
                    color: $color-6;
                }
                .input-box {
                    overflow: hidden;
                    width: 100%;
                    height: 40px;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    border-radius: 3px;
                    box-shadow: none;
                    outline: none;
                    box-sizing: border-box;
                }
                .input-box::-webkit-input-placeholder {
                    color: #BBBBBB;
                }
            }
            .absent {
                @include border-bottom;
                .item-header {
                    @include flex-between;
                    .title {
                        height: 44px;
                        line-height: 44px;
                        color: $color-6;
                    }
                }
                .item-wrap {
                    overflow: hidden;
                    display: flex;
                    flex-wrap: wrap;
                    .title {
                        height: 44px;
                        line-height: 44px;
                    }
                    .reason {
                        width: 30%;
                        height: 38px;
                        line-height: 38px;
                        margin-bottom: 12px;
                        padding: 0 6px;
                        color: $color-3;
                        background-color: #f0f0f0;
                        text-align: center;
                        border-radius: 4px;
                        font-size: 12px;
                        @include ellipsis-single;
                        &:nth-child(3n+2) {
                            margin: 0 5%;
                        }
                        &.on {
                            color: $color-primary;
                            background-color: #b4e0ff;
                        }
                    }
                    &.showLess {
                        max-height: 100px;
                    }
                }

            }
        }
        .footer {
            height: 44px;
            line-height: 44px;
            text-align: center;
            display: flex;
            @include shadow-base;
            .reset {
                flex: 1;
                color: #4A4A4A;
            }
            .complete {
                flex: 1;
                color: $color-white;
                background-color: $color-primary;
            }
        }
    }

</style>

<template>
    <div class="multiple-filter-container" v-show="opened">
        <action-sheet
                v-show="opened"
                class="as-body"
                @close="close"
                :data="renderData"
                ref="multipleFilterScroller"
                :position="position">
            <div class="header" slot="header">
                <div class="back-btn" @click="close()">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zuobianjiantou"></use>
                    </svg>
                    筛选
                </div>
            </div>

            <div class="menupop">
                <div class="category">
                    <div class="item" @click="selectOption(item.type)" :class="{on:type==item.type}"
                         v-for="item in options">{{item.name}}
                    </div>
                </div>
                <!--课程-->
                <div class="filter-item" @click="openBukeProjectFilterAS()">
                    <span class="title">课程名称</span>
                    <span class="selected">{{projectObj.name}}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                <!--班级-->
                <div class="filter-item" @click="openBukeClassFilterAS()">
                    <span class="title">班级名称</span>
                    <span class="selected">{{classObj.name}}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                <!--学生姓名-->
                <div class="student-name">
                    <div class="title">学生姓名</div>
                    <div>
                        <input class="input-box" type="text" v-model="studentName" placeholder="请输入学生姓名">
                    </div>
                </div>
                <!--缺勤原因-->
                <div class="absent">
                    <div class="item-header" @click="showFullReason">
                        <div class="title">缺勤原因</div>
                        <div class="arrow">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="showFullReasonFlag?'#icon-shangla':'#icon-xiala'"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="item-wrap" :class="{showLess:!showFullReasonFlag}">
                        <div class="reason" :class="{on:absentID==res.ID}" v-for="(res,index) in absent" :key="index"
                             @click="selectAbsentReason(res.ID)">
                            {{res.Value}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer" slot="footer">
                <div class="reset" @click="multipleReset">重置</div>
                <div class="complete" @click="submit">完成</div>
            </div>

        </action-sheet>

        <!--课程-->
        <buke-project-filter
                @bukeSelectedProject="acceptProject"
                :opened.sync="openBukeProjectFilter">
        </buke-project-filter>

        <!--班级-->
        <buke-class-filter
                @bukeSelectedClass="acceptClass"
                :opened.sync="openBukeClassFilter">
        </buke-class-filter>
    </div>
</template>

<script>
    
    
    import BukeProjectFilter from "./child/buke-project-filter.vue";
    import BukeClassFilter from "./child/buke-class-filter.vue";

    export default {
        name: "multiple-filter",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            absent: {//缺勤原因
            },
            position: {
                type: String,
                default: "sideRight"
            }
        },
        computed: {
            renderData() {
                return {
                    refreshNum: this.refreshNum,
                    absent:this.absent,
                    classObj:this.classObj
                }
            }
        },
        data() {
            return {
                options: [{type: 0, name: '未安排补课'}, {type: 1, name: '已安排补课/未上课'}, {type: 2, name: '已安排补课/已上课'}],
                openBukeClassFilter: false,
                openBukeProjectFilter: false,
                showFullReasonFlag: false,//展开缺勤原因
                refreshNum: 0,
                studentName: '',//参数 学生姓名
                type: 0,//参数 0:未安排补课，1：已安排补课未上课 2：已安排补课已上课
                projectObj: {},//参数 课程信息
                classObj: {},//参数 课程信息
                absentID: '',//参数 缺勤原因id
                //以上参数作为显示用，当点击确定时才对paraObj赋值 每次进入页面的赋值给以上参数
                paraObj: {
                    type:0,
                    absentCauseId: '',
                    className: '',
                    shiftName: '',
                    ShiftId: '',
                    ClassId: '',
                    studentName: ''
                }
            }
        },
        methods: {
            openBukeClassFilterAS() {
                this.openBukeClassFilter = !this.openBukeClassFilter;
            },
            openBukeProjectFilterAS() {
                this.openBukeProjectFilter = !this.openBukeProjectFilter;
            },
            //接收课程信息
            acceptProject(obj) {
                this.projectObj = obj;
                //每次接收课程信息时，把班级信息清空，和PC端逻辑一致
                this.classObj = {
                    name:'',
                    id:''
                };
            },
            //接收班级信息
            acceptClass(obj) {
                this.classObj = obj;
            },
            //展开缺勤原因
            showFullReason() {
                this.showFullReasonFlag = !this.showFullReasonFlag;
                this.refreshNum++;
            },
            selectOption(type) {
                this.type = type;
            },
            //选择缺勤原因
            selectAbsentReason(id) {

                if (this.absentID == id) {
                    this.absentID = '';
                } else {
                    this.absentID = id;
                }
            },
            //重置
            multipleReset() {
                this.type = 0;
                this.projectObj = {};
                this.classObj = {};
                this.absentID = '';
                this.studentName = '';

                this.paraObj = {
                    type: 0,
                    absentCauseId: '',
                    className: '',
                    shiftName: '',
                    ShiftId: '',
                    ClassId: '',
                    studentName: ''
                };
                this.$emit('bukeMultiple', this.paraObj)
            },
            //确认
            submit() {
                this.paraObj.absentCauseId = this.absentID;
                this.paraObj.className = this.classObj.name;
                this.paraObj.shiftName = this.projectObj.name;
                this.paraObj.ShiftId = this.projectObj.id;
                this.paraObj.ClassId = this.classObj.id;
                this.paraObj.type = this.type;
                this.paraObj.studentName = this.studentName;
                this.close();
                this.$emit('bukeMultiple', this.paraObj);
            }

        },
        components: {
            BukeClassFilter,
            BukeProjectFilter
        },
        watch: {
            opened(newVal, oldVal) {
                if (newVal) {
                    this.absentID = this.paraObj.absentCauseId;
                    this.classObj.name = this.paraObj.className;
                    this.projectObj.name = this.paraObj.shiftName;
                    this.projectObj.id = this.paraObj.ShiftId;
                    this.classObj.id = this.paraObj.ClassId;
                    this.type = this.paraObj.type;
                    this.studentName = this.paraObj.studentName;
                    this.refreshNum++;
                }
            }
        }
    }
</script>

