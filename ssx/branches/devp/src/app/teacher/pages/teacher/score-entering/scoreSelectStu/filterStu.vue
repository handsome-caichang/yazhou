<style scoped lang="scss">
    
    
    .card {
        .type {
            padding: 20px 15px 0 15px;
            .type-title {
                margin-bottom: 15px;
                font-size: 15px;
                color: $color-3;
            }
            .type-content {
                display: flex;
                flex-wrap: wrap;
                .item {
                    width: 30%;
                    height: 31px;
                    line-height: 31px;
                    text-align: center;
                    margin-right: 8px;
                    font-size: 12px;
                    color: $color-3;
                    @include ellipsis-single;
                    background-color: $color-assist-1;
                    margin-bottom: 8px;
                    &.active {
                        background-color: $color-primary;
                        color: $color-white;
                    }
                }
                & :nth-child(3) {
                    margin-right: 0;
                }
                & :nth-child(6) {
                    margin-right: 0;
                }
            }
        }
        .exam-name {
            padding: 15px;
            font-size: 15px;
            color: $color-3;
            .input {
                padding: 12px;
                margin-top: 15px;
                font-size: 13px;
                border-radius: 2px;
                background-color: #FDFDFD;
                color: #BBBBBB;
                height: 40px;
                width: 100%;
                line-height: 40px;
                border: 1px solid $color-assist-1;
            }
        }
        .exam-item {
            padding: 15px;
            .item-wrapper {
                // height: 44px;
                // line-height: 44px;
                border-bottom: 1px solid $color-assist-1;
                // display: flex;
                @include flex-between;
                padding-bottom: 10px;
                .item-title {
                    width: 80px;
                    font-size: 15px;
                    color: $color-3;
                }
                .content {
                    flex: 1;
                    color: $color-primary;
                    min-height: 20px;
                    font-size: 12px;
                    text-align: right;
                    // @include ellipsis-single;
                }
                .icon-wrapper {
                    width: 20px;
                    text-align: right;
                }
            }
        }
    }
    .bottom {
        // @include position-absolute(false, 0, 0, 0);
        height: 40px;
        line-height: 40px;
        display: flex;
        font-size: 16px;
        .reset {
            flex: 1;
            text-align: center;
            color: $color-9;
            border-top: 1px solid $color-assist-1;
            background-color: $color-white;
        }
        .sure {
            flex: 1;
            text-align: center;
            background-color: $color-primary;
            color: $color-white;
        }
    }
</style>

<template>
    <action-sheet
            v-show="opened"
            @close="close"
            :data="list"
            :position="'sideRight'">
        <div class="card">
            <div class="exam-name">
                <div>
                    学员名称
                </div>
                <input class="input" placeholder="请输入学生姓名" v-model="queryText">
            </div>
            <div class="type">
                <div class="type-title">
                    学员状态
                </div>
                <div class="type-content">
                    <div class="item" 
                         v-for="item in list"
                         :class="{'active': item.isSelect}" 
                         @click="choseItem(item)">
                             {{item.name}}
                    </div>
                </div>
            </div>
            <div class="exam-item">
                <div class="item-wrapper">
                    <div class="item-title">课程名称</div>
                    <div class="content" @click="emitSelect('shift')">{{shiftObj.Name}}</div>
                    <div class="icon-wrapper" @click="emitSelect('shift')">
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="exam-item">
                <div class="item-wrapper">
                    <div class="item-title">班级名称</div>
                    <div class="content" @click="emitSelect('class')">{{classObj.Name}}</div>
                    <div class="icon-wrapper" @click="emitSelect('class')">
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer">
            <div class="reset" @click="reset">重置</div>
            <div class="sure" @click="filterConditions">确定</div>
        </div>
    </action-sheet>
</template>

<script>
    // enableStudentQueryEmpty //配置项
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean
            },
            stuStatusObj: {
                type: Object
            },
            classObj: {
                type: Object
            },
            shiftObj: {
                type: Object
            }
        },
        computed: {
        
        },
        data() {
            
            return {
                list: [ {name: '不限', value: -1}, 
                        {name: '试听', value: 0},
                        {name: '在读', value: 1},
                        {name: '停课', value: 2},
                        {name: '休学', value: 3},
                        {name: '已退学', value: 99}],
                queryText: ''
            }
        },
        methods: {
            choseItem(item) {
                this.list.forEach(obj => {
                    if (obj.value === item.value) {
                        obj.isSelect = !obj.isSelect
                    } else {
                        obj.isSelect = false
                    }
                })
            },
            emitSelect(str) {
                this.$emit('selectClassShift', str)
            },
            reset() {
                this.queryText = ''
                this.list.forEach(obj => {
                    if (obj.value === 1) {
                        obj.isSelect = true
                    } else {
                        obj.isSelect = false
                    }
                })
                this.$emit('resetData')
            },
            filterConditions() {
                let enableStudentQueryEmpty = parseInt(app.sysInfo.EnableStudentQueryEmpty) === 1,
                    obj = {}, tempArr = this.list.filter(obj => obj.isSelect),
                    tips = app.tool.checkQueryLength(this.queryText.trim())
                if (tempArr.length > 0) obj = tempArr[0]
                if (enableStudentQueryEmpty) {
                    this.$emit('filterConditions', {
                        queryText: this.queryText.trim(),
                        stuStatusObj: obj
                    })
                } else {
                    if (tips) {
                        app.toast('info', tips)
                        return
                    }
                    this.$emit('filterConditions', {
                        queryText: this.queryText.trim(),
                        stuStatusObj: obj
                    })
                }
            }
        },
        created() {

        },
        watch: {
            opened(val) {
                this.list.forEach(obj => {
                    if (this.stuStatusObj.value === undefined) {
                        if (obj.value === 1) {
                            this.$set(obj, 'isSelect', true)
                        } else {
                            this.$set(obj, 'isSelect', false)
                        }
                    } else {
                        if (obj.value === this.stuStatusObj.value) {
                            this.$set(obj, 'isSelect', true)
                        } else {
                            this.$set(obj, 'isSelect', false)
                        }
                    }
                })
            }
        }
    }
</script>
