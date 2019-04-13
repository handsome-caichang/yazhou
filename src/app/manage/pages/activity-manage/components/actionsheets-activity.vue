<!-- 选择校区组件 -->
<style lang="scss" scoped>
    .action-sheet {
        @include position-absolute;
    }
    .cs-item {
        height: $h-2;
        line-height: $h-2;
        padding-left: $edge;
        padding-right: $edge;
        color: $color-3-s;
        @include ellipsis-single;
        &.active {
            color: #FE5C00;
        }
    }
</style>

<template>
    <action-sheet 
        class="action-sheet"
        v-show="opened" 
        position="top" 
        :maskToClose="true"
        @close="close"
        :data="renderData">
        <ul>
            <li class="cs-item"
                :class="{active: judgeActive({id:''})}"
                @click="changeActivity({id:''})">全部活动</li>
            <li 
                class="cs-item"
                v-for="(activity,index) in activityList"
                :key="index"
                :class="{active: judgeActive(activity)}"
                @click="changeActivity(activity)">{{activity.title}}</li>
        </ul>
    </action-sheet>
</template>

<script>
    export default {
        name: 'actionsheets-activity',
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            opened: {},
            activityList: {
                type: Array,
                default: []
            },
            curActivity: {
                type: Array,
                default: []
            },
            list: {
                type: Array,
                default: []
            }
        },
        data () {
            return {
                num: 0
            }
        },
        computed: {
            renderData(){
                return {
                    activityList:this.activityList,
                    num:this.num
                }
            }
        },
        methods: {
            // 判断是否是选中项
	  		judgeActive(filter) {
                let id = this.curActivity.length>0?this.curActivity[0]:'';
                return filter.id == id;
            },
            changeActivity(ac) {
                this.$emit('changeActivity', ac);
                this.close();
            }
        },
        watch: {
           opened() {
               console.log(this.num)
               this.num++;
           } 
        }
    }
</script>