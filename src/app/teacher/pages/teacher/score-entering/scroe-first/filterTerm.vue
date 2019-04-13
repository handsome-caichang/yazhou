<style scoped lang="scss">
    
    
    /* .action-sheet {
        @include position-absolute;
    } */
    .card {
        // @include position-absolute(0, 0, 40px, 0);
        .type {
            padding: 20px 15px 0 15px;
            .type-title {
                display: flex;
                margin-bottom: 15px;
                .text {
                    flex: 1;
                    font-size: 15px;
                    color: $color-3;
                }
                .icon-wrapper {
                    @include flex-between;
                }
            }
            .type-content {
                display: flex;
                flex-wrap: wrap;
                .item {
                    padding: 0 17px;
                    width: 47.5%;
                    height: 31px;
                    line-height: 31px;
                    text-align: center;
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
                & :nth-child(odd) {
                    margin-right: 10px;
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
                height: 44px;
                line-height: 44px;
                border-bottom: 1px solid $color-assist-1;
                display: flex;
                .item-title {
                    width: 80px;
                    font-size: 15px;
                    color: $color-3;
                }
                .content {
                    flex: 1;
                    color: $color-primary;
                    font-size: 12px;
                    text-align: right;
                    @include ellipsis-single;
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
            class="action-sheet"
            v-show="opened"
            @close="close"
            :data="computedList"
            :position="'sideRight'">
        <div class="card">
            <div class="type">
                <div class="type-title">
                    <div class="text">类型</div>
                    <div class="icon-wrapper" @click="longListTag=!longListTag">
                        <svg aria-hidden="true" class="icon">
                            <use :xlink:href="longListTag?'#icon-shangla':'#icon-xiala'"></use>
                        </svg>
                    </div>
                </div>
                <div class="type-content">
                    <div class="item" 
                         v-for="item in computedList"
                         :class="{'active': item.isSelect}" 
                         @click="choseItem(item)">
                             {{item.Value}}
                    </div>
                </div>
            </div>
            <div class="exam-name">
                <div>
                    考试名称
                </div>
                <input class="input" placeholder="请输入考试名称" v-model="queryText">
            </div>
            <div class="exam-item">
                <div class="item-wrapper">
                    <div class="item-title">考试项目</div>
                    <div class="content" @click="emitSelect('subject')">{{examSubStr}}</div>
                    <div class="icon-wrapper" @click="emitSelect('subject')">
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
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean
            },
            examTypeList: {
                type: Array
            },
            examSubjectList: {
                type: Array
            },
            examSubStr: {
                type: String
            },
            classObj: {
                type: Object
            }
        },
        computed: {
            computedList() {
                return this.longListTag ? this.list : this.shortList
            }
        },
        data() {
            return {
                list: [],
                shortList: [],
                longListTag: false,
                queryText: ''
            }
        },
        methods: {
            choseItem(item) {
                this.list.forEach(obj => {
                    if (obj.ID === item.ID) {
                        obj.isSelect = !obj.isSelect
                    } else {
                        obj.isSelect = false
                    }
                })

            },
            emitSelect(str) {
                this.$emit('selectExamMore', str)
            },
            reset() {
                this.queryText = ''
                this.list.forEach(obj => obj.isSelect = false)
                this.$emit('resetData')
            },
            filterConditions() {
                this.$emit('filterConditions', {
                    queryText: this.queryText,
                    selectTypeArr: this.list
                })
            }
        },
        created() {

        },
        watch: {
            opened(val) {
                this.list = app.tool.clone(this.examTypeList)
                if (this.list.length > 4) this.shortList = this.list.slice(0, 4)
            }
        }
    }
</script>
