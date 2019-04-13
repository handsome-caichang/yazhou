<style scoped lang="scss">
    .wrapper {
        .scroll {
            @include position-absolute(0, 0, 49px, 0);
            background-color: $color-assist-1;
            font-size: $fs-normal-x;
            .item-wrapper {
                .item {
                    background-color: $color-white;
                    border-bottom: 9px solid $color-assist-1;
                    .item-body, .item-heard {
                        padding: 0 12px;
                        height: 44px;
                        line-height: 44px;
                        display: flex;
                        font-size: 15px;
                        color: $color-6;
                        .body {
                            width: 80px;
                        }
                        .body-mid, .heard-mid {
                            flex: 1;
                            color: $color-3;
                            text-align: right;
                            @include ellipsis-single;
                        }
                        .body-right, .heard-right {
                            width: 15px;
                        }
                    }
                    .item-heard {
                        border-bottom: 1px solid $color-assist-1;
                    }    
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            background-color: $color-white;
            @include flex-center;
            border-top: 1px solid $color-assist-1;
            height: 49px;
            justify-content: flex-end;
            padding: 0 12px;
            .addCourse, .sure {
                width: 93px;
                height: 28px;
                text-align: center;
                border: 1px solid $color-primary;
                color: $color-primary;
                font-size: 15px;
                line-height: 28px;
                border-radius: 50px;
            }
            .sure {
                background-color: $color-primary;
                color: $color-white;
                margin-left: 15px;
            }
        }
    }

</style>

<template>
    <div class="wrapper">
        <scroller-base class="scroll" :data="list" ref="scroll">
            <div class="item-wrapper">
                <div class="item" v-for="(item, index) in list">
                    <div class="item-heard">
                        <div class="heard-left">{{item.title+`(${(index+1)})`}}</div>
                        <div class="heard-mid" @click="delItem(index)"></div>
                        <div class="heard-right" @click="delItem(index)">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shanchuyuyin2"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="item-body">
                        <div class="body-left">{{app.sysInfo.Title_Campus}}</div>
                        <div class="body-mid" @click="openSelectCamp(index)">
                            {{item.campusObj.Value&&item.campusObj.Value.Name}}
                        </div>
                        <div class="body-right" @click="openSelectCamp(index)">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="item-body">
                        <div class="body-left">意向课程</div>
                        <div class="body-mid" @click="openSelectCourse(index)">{{item.willCourse.name}}</div>
                        <div class="body-right" @click="openSelectCourse(index)">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="item-body" v-if="item.isShowWillClass">
                        <div class="body-left">意向班级</div>
                        <div class="body-mid" @click="openWillClass(index)">{{item.willClass.Name}}</div>
                        <div class="body-right" @click="openWillClass(index)">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </scroller-base>
        <div class="bottom">
            <div class="addCourse" @click="addItem">添加课程</div>
            <div class="sure" @click="submit">确认</div>
        </div>
        <!-- 选择校区 -->
        <select-campus
            :opened.sync="showSelectCampus"
            :campusObj="list[curIndex]?list[curIndex].campusObj:{}"
            @selectCampusObj="selectCampusObj">
        </select-campus>
        <!-- 选择意向课程 -->
        <course-filter
            :opened.sync="showCourseFilter" 
            :list="list"
            :campusObj="list[curIndex]?list[curIndex].campusObj:{}"
            @selectCourse="selectCourse">
        </course-filter>
        <!-- 选择意向班级 -->
        <select-will-class
            :opened.sync="showWillClass"
            :courseObj="obj" 
            @selectWillClass="selectWillClass">
                
        </select-will-class>
    </div>
</template>

<script>
    import CourseFilter from './courseFilter'
    import SelectCampus from './selectCampus'
    import SelectWillClass from './selectWillClass'
    import {getCustomers} from 'teacher/api/customers'
    export default {
        data() {
            return {
                wxTitle: "选择意向课程",
                list: [{
                    title: '课程',
                    campusObj: {},
                    willCourse: {},
                    willClass: {},
                }],
                showSelectCampus: false,
                showCourseFilter: false,
                showWillClass: false,
                curIndex: 0,
            }
        },
        computed: {
            obj() {
                if (!this.list[this.curIndex]) {
                    return {}
                } else {
                    return {
                        campus: this.list[this.curIndex].campusObj.Key,
                        shift: this.list[this.curIndex].willCourse.id
                    }
                }
            }
        },
        methods: {
            delItem(index) {
                this.list.splice(index, 1)
            },
            addItem() {
                let id = this.$route.params.id,
                    camObj = app.customConfigInfo.CampusList.filter(item => item.Key === id)[0],
                    obj = {
                        title: '课程',
                        campusObj: this.list[0]&&this.list[0].campusObj || camObj,
                        willCourse: {},
                        willClass: {},
                    }
                this.$set(obj, 'isShowWillClass', false)
                if (!this.list.length) {
                    this.list.push(obj)
                } else {
                    if(!this.list[this.list.length - 1].willCourse.id) {
                        app.toast('info', '请选择课程。')
                        return
                    } else {
                        this.list.push(obj)
                    }
                }
            },
            submit() {
                this.$router.go(-1)
                app.event.emit('selectData', this.list)
            },
            //选择校区回掉
            selectCampusObj(obj) {
                this.list[this.curIndex].campusObj = obj
                if (this.list[this.curIndex].willCourse.id) this.list[this.curIndex].willCourse = {}
                if (this.list[this.curIndex].willClass.ID) this.list[this.curIndex].willClass = {}
                this.showSelectCampus = false
            },
            openSelectCamp(index) {
                this.curIndex = index
                this.showSelectCampus = true
            },
            selectCourse(obj) {
                this.list[this.curIndex].willCourse = obj
                this.list[this.curIndex].isShowWillClass = true
                this.showCourseFilter = false
            },
            openSelectCourse(index) {
                this.curIndex = index
                this.showCourseFilter = true
            },
            openWillClass(index) {
                this.curIndex = index
                this.showWillClass = true
            },
            selectWillClass(obj) {
                this.showWillClass = false
                this.list[this.curIndex].willClass = obj
            }
        },
        created() {
            window.a = this
            let arr = app.ls.get('willClass')
            if (arr) {
                this.list = arr
            } else {
                let id = this.$route.params.id,
                    obj = app.customConfigInfo.CampusList.filter(item => item.Key === id)[0]
                this.list[0].campusObj = obj
            }
        },
        components: {
            SelectCampus,
            CourseFilter,
            SelectWillClass
        }
    }
</script>