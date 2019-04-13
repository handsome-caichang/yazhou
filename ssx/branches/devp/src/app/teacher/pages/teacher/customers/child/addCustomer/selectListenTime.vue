<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .wrapper {
            .header {
                height: 44px;
                line-height: 44px;
                text-align: center;
                font-size: 15px;
            }
            .week {
                padding: 0 12px;
                margin-bottom: 15px;
                .week-heard {
                    height: 37px;
                    line-height: 37px;
                    font-size: 14px;
                    color: $color-9;
                }
                .week-body {
                    height: 35px;
                    line-height: 35px;
                    display: flex;
                    border: 1px solid #eaeaea;
                    .item {
                        flex: 1;
                        text-align: center;
                        border-right: 1px solid #eaeaea;
                        &:last-child {
                            border-right: none;
                        }
                    }
                    .active {
                        background-color: $color-primary;
                        color: $color-white;
                    }
                }
            }
            .bottom {

                height: 49px;
                line-height: 49px;
                background-color: $color-primary;
                color: $color-white;
                text-align: center;
            }
        }
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :scrollerConfig="scrollerConfig"
        v-show="opened" 
        @close="close">
        <div class="wrapper">
            <div class="header">预约试听时间</div>
            <div class="week">
                <div class="week-heard">星期</div>
                <div class="week-body">
                    <div v-for="item in weekList" 
                         class="item"
                         :class="{active:item.isSelect}"
                         @click="selectWeek(item)">{{item.name}}</div>
                </div>
            </div>
            <div class="week">
                <div class="week-heard">时间</div>
                <div class="week-body">
                    <div v-for="item in timeList" 
                         class="item"
                         :class="{active:item.isSelect}"
                         @click="selectWeek(item)">{{item.name}}</div>
                </div>
            </div>
            <div class="bottom" @click="selectTime">确定</div>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            whosVocation: {
                type: String
            }
        },
        computed: {
            ...Vuex.mapState(['customConfigInfo'])
        },
        data() {
            return {
                scrollerConfig: {
                    tag: 'base'
                },
                weekList: [{name: '一',value: 1},{name: '二',value: 2},{name: '三',value: 3},{name: '四',value: 4},{name: '五',value: 5},{name: '六',value: 6},{name: '日',value: 7}],
                timeList: [{name: '上午',value: 8},{name: '下午',value: 9},{name: '晚上',value: 10}]
            }
        },
        methods: {
            selectWeek(obj) {
                obj.isSelect = !obj.isSelect
            },
            selectTime() {
                this.$emit('selectTime', {
                    week: this.weekList,
                    time: this.timeList
                })
            }
        },
        created() {
            this.weekList.forEach(obj => {
                this.$set(obj, 'isSelect', false)
            })
            this.timeList.forEach(obj => {
                this.$set(obj, 'isSelect', false)
            })
        }
    }
</script>