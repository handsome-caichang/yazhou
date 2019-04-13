<style scoped lang="scss">
    
    
    
.select-campus-header {
    height: 44px;
    line-height: 44px;
    padding: 0 15px;
    background-color: $color-assist-1;
    text-align: left;
    z-index: 1;
}      
.role-actionsheet {
    @include position-absolute(49px, 0, 49px, 0);
    background-color: $color-assist-1;
    font-size: $fs-normal-x;
    z-index: 10;

    .wrapper {
        z-index: 10;

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
    
    .select-campus-wrapper {
        .actionsheet-item {
            padding: 15px;
            color: $color-3;
            @include flex-between;
            border-bottom: 1px solid $color-assist-1;
            background-color: $color-white;
            &.active {
                color: $color-primary;
            }
        }
    }
}
.course-filter {
    @include position-absolute;
    z-index: 100;
}
.bottom {
    z-index: 88;
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
.as-slide-enter-active, .as-slide-leave-active {
    transition: all $duration $timing;
}
.as-slide-enter, .as-slide-leave-active {
    transform: translate3d(100%, 0, 0);
}
</style>

<template>
        
<div class="big-wrapper">
    <transition name="as-slide">
        <div class="select-campus-header"  @click="goStepOne" v-show="stepTwo">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuobianjiantou"></use>
            </svg>
            选择校区
        </div>
    </transition>
    <transition name="as-slide">
        <div class="select-campus-header" @click="goStepOne" v-show="stepFour">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuobianjiantou"></use>
            </svg>
            选择意向班级
        </div>
    </transition>
    <scroller-base class="role-actionsheet" :data="scrollData" ref="scroll">
        <!-- 选择校区、课程、班级 -->
        <div class="wrapper" v-if="stepOne">
            <div class="item"
                 v-for="(item, index) in list">
                <div class="item-heard">
                    <div class="heard-left">{{item.title+`(${(index+1)})`}}</div>
                    <div class="heard-mid" @click="delItem(index)"></div>
                    <div class="heard-right" @click="delItem(index)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="item-body">
                    <div class="body-left">校区</div>
                    <div class="body-mid" @click="changeStep(2, index)">
                        {{item.campusObj.Value&&item.campusObj.Value.Name}}
                    </div>
                    <div class="body-right" @click="changeStep(2, index)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="item-body">
                    <div class="body-left">意向课程</div>
                    <div class="body-mid" @click="changeStep(3, index)">{{item.willCourse.name}}</div>
                    <div class="body-right" @click="changeStep(3, index)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="item-body" v-if="item.isShowWillClass">
                    <div class="body-left">意向班级</div>
                    <div class="body-mid" @click="changeStep(4, index)">{{item.willClass.Name}}</div>
                    <div class="body-right" @click="changeStep(4, index)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 选择校区 -->
        <transition name="as-slide">
            <div class="select-campus-wrapper" v-if="stepTwo">
                <div class="actionsheet-item"
                    v-for="(item, index) in campusList"
                    :class="{'active':isCampusActive(item)}"
                    @click="selectCampus(item)"
                    >
                    {{item.Value && item.Value.Name}}
                </div>
            </div>
        </transition>
        <!-- 选择意向班级 -->
        <transition name="as-slide">
            <div class="select-campus-wrapper" v-if="stepFour">
                <div class="actionsheet-item"
                    :class="{'active':isClassActive(item)}"
                    @click="selectClass(item)"
                    v-for="(item, index) in classList"
                    >
                    {{item.Name}}
                </div>
            </div>
        </transition>
    </scroller-base>
    <course-filter
        class="course-filter"
        :opened.sync="stepThree" 
        :list="list"
        @selectCourse="selectCourse">
    </course-filter>
    <div class="bottom"  v-if="stepOne">
        <div class="addCourse" @click="addItem">添加课程</div>
        <div class="sure" @click="submit">确认</div>
    </div>
</div>
</template>

<script>
    import CourseFilter from './courseFilter';
    import {getCustomers} from 'teacher/api/customers';
    
    export default {
        computed: {
            ...Vuex.mapState(['selectWillCourse']),
            scrollData() {
                if (this.stepOne) {
                    return this.list
                } else if(this.stepTwo){
                    return this.campusList
                }
            },

        },
        data() {
            return {
                scrollNum: 0,
                stepOne: true,
                stepTwo: false,
                stepThree: false,
                stepFour: false,
                list: [{
                    title: '课程',
                    campusObj: {},
                    willCourse: {},
                    willClass: {},
                }],
                scrollerConfig: {
                    tag: 'base'
                },
                campusList: [],
                curIndex: 0,
                classList: []

            }
        },
        methods: {
            selectCampus(item) {
                this.list[this.curIndex].campusObj = item
                this.goStepOne()
            },
            goStepOne() {
                this.stepTwo = false
                this.stepFour = false
                // setTimeout(() => {
                    this.stepOne = true
                    this.$refs.scroll.$el.style.top = 0
                    this.$refs.scroll.$el.style.bottom = '44px'
                // }, 300)
            },
            changeStep(index, curIndex) {
                this.scrollNum = this.scrollNum + 1
                this.curIndex = curIndex
                if (index == 2) {
                    this.stepOne = false
                    this.stepTwo = true
                    this.$refs.scroll.$el.style.top = '44px'
                    this.$refs.scroll.$el.style.bottom = 0
                } else if (index == 3) {
                    let id = this.list[curIndex].campusObj.Key
                    if (!id) {
                        app.toast('info', '请选择校区。')
                    } else {
                        this.stepOne = false
                        this.stepThree = true
                        this.$refs.scroll.$el.style.bottom = 0
                    }
                } else if (index == 4) {
                    this.stepOne = false
                    this.stepFour = true
                    this.$refs.scroll.$el.style.top = '44px'
                    this.$refs.scroll.$el.style.bottom = 0
                    let params = {
                        pname: 'queryclasspro',
                        campus: this.list[this.curIndex].campusObj.Key,
                        shift: this.list[this.curIndex].willCourse.id
                    }
                    getCustomers(params).then(res => {
                        if (res.errcode == app.errok) {
                            this.classList = res.data
                        }
                    })
                }
            },
            isCampusActive(obj) {
                let item = this.list[this.curIndex]
                if (item) {
                    return item.campusObj.Key == obj.Key
                } else {
                    return false
                }
            },
            isClassActive(obj) {
                let item = this.list[this.curIndex]
                if (item) {
                    return item.willClass.ID == obj.ID
                } else {
                    return false
                }
            },
            selectCourse(obj) {
                this.stepOne = true
                this.stepThree = false
                this.list[this.curIndex].willCourse = obj
                this.list[this.curIndex].willClass = {}
                this.list[this.curIndex].isShowWillClass = true
                this.$refs.scroll.$el.style.top = 0
                this.$refs.scroll.$el.style.bottom = '44px'
            },
            selectClass(obj) {
                this.stepFour = false
                this.list[this.curIndex].willClass = obj
                this.goStepOne()
            },
            delItem(index) {
                this.list.splice(index, 1)
            },
            addItem() {
                let obj = {
                        title: '课程',
                        campusObj: {},
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
                this.$router.push({name: 'addCustomer'})
            }
        },
        created() {
            this.stepOne = true
            this.stepTwo = false
            this.stepThree = false
            this.stepFour = false
            this.campusList = app.customConfigInfo.CampusList
            this.list.forEach(obj => {
                if (obj.willCourse.id) {
                    this.$set(obj, 'isShowWillClass', true)
                } else {
                    this.$set(obj, 'isShowWillClass', false)
                }
            })
        },
        watch: {
            stepThree(val) {
                if (!val) {
                    this.stepOne = true
                    this.stepTwo = false
                    this.stepThree = false
                    this.stepFour = false
                }
            }
        },
        mounted() {
            window.a = this
            this.$refs.scroll.$el.style.top = 0
        },
        components: {
            CourseFilter
        }
    }
</script>