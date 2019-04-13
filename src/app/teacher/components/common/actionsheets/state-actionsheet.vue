<!-- 简单的状态筛选 -->
<style scoped lang="scss">
    
    

    .as-body {
        font-size: 15px;
        .header {
            height: 50px;
            line-height: 50px;
            color: $color-9;
            text-align: center;
        }
        .item {
            @include flex-between;
            @include border-top;
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            &.active {
                color: $color-primary;
            }
        }
    }
</style>

<template>
    <action-sheet class="as-body" v-show="opened" @close="close" :data="stateData">
        <div class="header" v-if="stateTitle">
            {{stateTitle}}
        </div>
        <div :class="{active:index==currentIndex}" class="item" @click="changeType(index)"
             v-for="(name,index) in stateList">
            <div>
                <svg class="icon" aria-hidden="true" v-if="(iconType!==0)&&(index==0)">
                    <use xlink:href="#icon-paixu-moren"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="(iconType!==0)&&(index!==0)">
                    <use :xlink:href="judgeOddEven(index)?'#icon-qian':'#icon-hou'"></use>
                </svg>
                {{name}}
            </div>
            <div v-show="index==currentIndex">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
            </div>
        </div>
    </action-sheet>
</template>

<script>

    /*******
     *******  适合少于等于5项的简单分类筛选
     ******   注意type值不是连续的数值时，记得在调用此组件的文件里加判断
     *****/
    /*
    * 1.引入并注册 ：import StateFilter from 'teacher/components/common/actionsheets/state-actionsheet.vue';
    * 2.<state-actionsheet
                @stateType="acceptType"  传递type值(number)来自定义对应关系
                class="as-state" 需要设置z-index
                :stateTitle="state.stateTitle" 自定义头部
                :stateList="state.stateList" 自定义选项内容
                :curState="state.curState" 自定义默认高亮选项
                :opened.sync="state.openState"> 开关弹框
        </state-actionsheet>
    *3.引用组件里data()里return
       state:{
            openState:false
            curState:2,
            stateTitle:'学生点评情况筛选',
            stateList:['全部', '未点评', '部分已评', '全已评'],
        },
    *4.通过传递的type来继续操作
    * */
    
    

    export default {
        name: "state-actionsheet",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            stateTitle: {
                type: String,
                default: null
            },
            stateList: {
                type: Array,
                default: null
            },
            //默认高亮第type项
            curState: {
                type: Number,
                default: 0
            },
            //图标类型 默认无图标
            iconType: {
                type: Number,
                default: 0
            }
        },
        computed: {
            stateData() {
                return {
                    opened: this.opened
                }
            }
        },
        methods: {
            changeType(index) {
                if (this.currentIndex !== index) {
                    this.currentIndex = index;
                    this.$emit('stateType', parseInt(index));
                    this.close()
                }
            },
            judgeOddEven(num) {
                let b = parseInt(num) % 2;
                if (b == 0) {
                    return 0
                }
                else if (b == 1) {
                    return 1
                }
            }
        },
        data() {
            return {
                currentIndex: this.curState
            }
        },
        components: {
            
        }
    }
</script>
