<!-- 选择校区组件 -->
<style lang="scss" scoped>
    .cs-item {
        height: $h-2;
        line-height: $h-2;
        padding-left: $edge;
        padding-right: $edge;
        color: $color-3-s;
        @include ellipsis-single;
        &.between {
            @include flex-between;            
        }
        &.active {
            color: #FE5C00;
        }
    }
</style>

<template>
    <action-sheet 
        v-show="opened" 
        position="top" 
        :maskToClose="true"
        @close="close"
        :data="activityList">
        <ul>
            <li 
                class="cs-item between"
                v-for="(activity,index) in activityList" :key="index"
                :class="{active: judgeActive(activity)}"
                @click="changeActivity(activity)">
                <span>{{activity.name}}</span>
            </li>
        </ul>
    </action-sheet>
</template>

<script>
    export default {
        name: 'actionsheets-activity',
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            opened: {
                type: Boolean,
                default: false
            },
            curActivity: {
                type: Object,
                default: {
                    value: 0,
                    name: '全部活动'
                }
            }
        },
        data() {
            return {
                activityList: [
                    {
                        value: 0,
                        name: '全部活动'
                    },{
                        value: 1,
                        name: '拼团'
                    },{
                        value: 2,
                        name: '砍价'
                    },{
                        value: 3,
                        name: '其他'
                    },
                ]
            };
        },
        methods: {
            // 判断是否是选中项
	  		judgeActive(filter) {
                return this.curActivity.value == filter.value
            },
            changeActivity(ac) {
                this.$emit('changeActivity', ac);
                this.close();
            }
        }
    }
</script>