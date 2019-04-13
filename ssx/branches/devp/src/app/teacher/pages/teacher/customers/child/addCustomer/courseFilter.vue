<style scoped lang="scss">
    
    
    
    
    .container {
        @include position-absolute;
        .course-heard-wrapper {
            .course-heard {
                height: 44px;
                @include flex-center;
                padding: 0 12px;
                .input {
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    background-color: $color-assist-1;
                    border-radius: 3px;
                    color: $color-6;
                }
                .text {
                    width: 65px;
                    height: 28px;
                    line-height: 28px;
                    background-color: $color-primary;
                    color: $color-white;
                    text-align: center;
                }
            }
            .app-course {
                display: flex;
                height: $h-3;
                line-height: $h-3;
                background-color: $color-white;
                @include border-bottom($color-border-1);
                @include border-top($color-border-1);
                .filter {
                    flex: 1;
                    text-align: center;
                    @include border-right;
                    &:last-child:after {
                        display: none;
                    }
                    &.filter1 {
                        &:before {
                            content: "";
                            @include position-absolute(false, 0, 0, false);
                            border-bottom: 9px solid $color-9;
                            border-left: 9px solid transparent;
                        }
                    }
                    &.active {
                        color: $color-primary;
                        &.filter1:before {
                            border-bottom: 9px solid $color-primary;
                        }
                    }
                }
            }
        }
        .scroll {
            // @include position-absolute;
            .course-item {
                line-height: 44px;
                border-bottom: 1px solid $color-assist-1;
                padding: 0 12px;
                font-size: 15px;
                color: $color-3;
                word-break: break-word;
            }
        }
        .actionsheet-wrapper {
            @include position-absolute(84px, 0, 0, 0);
            z-index: 100;
            // @include position-absolute;
            .wrapper {
                // height: 100px;
                background-color: $color-white;
                .item {
                    height: $h-2;
                    @include flex-center;
                    .text {
                        height: $h-5;
                        line-height: $h-5;
                        padding: 0 25px;
                        border-radius: $h-5;
                        &.active {
                            color: $color-white;
                            background-color: $color-primary;
                        }
                    }
                }
            }
        }
    }

</style>

<template>
        <action-sheet 
            class="container" 
            v-show="opened"
            :scrollerConfig="scrollerConfig"
            :data="scrollData"
            :position="'sideRight'"
            :fullParent="true">
            <div class="course-heard-wrapper" slot="header">
                <div class="course-heard">
                    <input type="text" class="input" v-model="searchText" placeholder="课程名称">
                    <div class="text" @click="init()">搜索</div>
                </div>
                <div class="app-course">
                    <div class="filter filter1" 
                        v-for="opt in opts1" 
                        :class="{active:isActive(opt.key)}"
                        @click="toogleFilter(opt.key)">
                        {{opt.name}}        
                    </div>
                </div>
            </div>
            <div class="scroll">
                <div class="course-item"
                     v-for="item in courseList"
                     @click="selectCourse(item)">
                    {{item.Name}}         
                </div>
            </div>
            <select-item slot="header"
                class="actionsheet-wrapper"
                :opened.sync="openFilterAS"
                :itemList="select[curFilterType]"
                @selectItem="selectItem">
               
            </select-item>
        </action-sheet>
</template>

<script>
    import {getShiftType, getCustomers} from 'teacher/api/customers'
    import SelectItem from './selectItem'
    
    
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: true
            },
            list: {
                type: Array
            },
            campusObj: {
                type: Object
            }
        },
        computed: {
            scrollData() {
                return {
                    list: this.courseList,
                    type: this.curFilterType
                }
            }
        },
        data() {
            return {
                opts1: [{
                        name: '年份',
                        key: 'Years'
                    },{
                        name: '期段',
                        key: 'CLASS_TERM'
                    },{ 
                        name: '类型',
                        key: 'SHIFT_CAT'
                    },{
                        name: '科目',
                        key: 'SUBJECT'
                    }],
                classTypesFlag: true,
                filteres: [],
                curFilterType:'Years',
                searchText: '',
                openFilterAS: false,
                select: {},
                courseList: [],
                scrollerConfig:{
                    tag: 'base'
                },
            }
        },
        methods: {
            ...Vuex.mapMutations(['set_selectWillCourse']),
             //切换显示或隐藏赛选蓝
            toogleFilter(filterKey) {
                if (filterKey === this.curFilterType) {
                    this.openFilterAS = !this.openFilterAS
                } else {
                    this.curFilterType = filterKey
                    this.openFilterAS = true
                }
            },
            selectItem(obj) {
                this.openFilterAS = false
                if (JSON.stringify(obj) == "{}") {
                    this.select[this.curFilterType].forEach(obj => {
                        obj.isSelect = false
                    })
                } else {
                    let arr = this.select[this.curFilterType]
                    arr.forEach(obj => {
                        obj.isSelect = false
                    })
                    arr[obj.index].isSelect = true
                }
                this.init()
            },
            isActive(key) {
                let flag = false
                this.select[key] && this.select[key].forEach(obj => {
                    if (obj.isSelect) flag = true
                })
                return flag
            },
            getSelectItem(key) {
                let arr = this.select[key]
                let id = ''
                arr && arr.forEach(obj => {
                    if (obj.isSelect) id = obj.ID
                })
                return id
            },
            init() {
                let params = {
                    pname: 'queryshift',
                    Grade: '',
                    //科目
                    Subject: this.getSelectItem('SUBJECT'),
                    //类型
                    Category: this.getSelectItem('SHIFT_CAT'),
                    Query: this.searchText,
                    campus: this.campusObj.Key,
                    shiftType: 0,
                    //期段
                    Term: this.getSelectItem('CLASS_TERM'),
                    Year: this.getSelectItem('Years'),
                    desc: '',
                    sort: 'Name',
                    status: 1,
                    page: 1
                }
                getCustomers(params).then(res => {
                    if (res.errcode == app.errok) {
                        this.courseList = res.data
                    }
                })
            },
            selectCourse(obj) {
                let arr = []
                this.list.forEach(item => {
                    arr.push(item.willCourse.id)
                })
                if (arr.indexOf(obj.ID) > -1) {
                    app.toast('info', '请选择不同意向课程。')
                    return 
                }
                this.$emit('selectCourse', {
                    id: obj.ID,
                    name: obj.Name
                })
            },
            
        },
        watch: {
            opened(val) {
                this.select['Years'] = []
                for (let i = 0; i < 5; i++) {
                    this.select['Years'].push({
                        Value: new Date().getFullYear() - i,
                        ID: new Date().getFullYear() - i
                    })
                }
                getShiftType({condition: 'CLASS_TERM,SUBJECT,SHIFT_CAT'}).then(res => {
                    if (res.ErrorCode == app.errok) {
                        this.select = Object.assign(this.select, res.Data)
                        for(var key in this.select) {
                            this.select[key].forEach(obj => {
                                this.$set(obj, 'isSelect', false)
                            })
                        }
                    }
                })
                this.init()
            }
        },
        components: {
            SelectItem,
            
        }
    }
</script>