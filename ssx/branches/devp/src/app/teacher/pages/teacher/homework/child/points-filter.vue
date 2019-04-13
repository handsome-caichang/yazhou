<!--作业详情 成绩选择-->
<style scoped lang="scss">
    .as-body {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
        .pi-item {
            list-style: none;
            padding: 6px 12px;
            color: $color-3-s;
            text-align: center;
            @include ellipsis-single;
            div {
                width: 78px;
                height: 32px;
                line-height: 32px;
                border-radius: 32px;
                margin: 0 auto;
                &.active {
                    color: $color-white;
                    background-color: $color-primary;
                }
            }
        }
    }
    .as-body {
        font-size: 15px;
        .item {
            @include flex-between;
            @include border-top;
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            &.active{
                color: $color-primary;
            }
        }
    }
</style>

<template>
    <action-sheet class="as-body" v-show="opened" @close="close" :data="pointsData">
        <div :class="{active:judgeActive(obj)}" class="item" @click="selectScore(obj)" v-for="(obj,index) in levelList">
            <div>{{obj.Rank}}</div>
            <div v-show="judgeActive(obj)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: 'points-filter',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            levelList: {// 成绩等级列表
                type: Array,
                default: false
            }
        },
        data() {
            return {
                scrollNum: 0, // 刷新滚动条
                selected: null // 已选择的等级
            }
        },
        computed: {
            pointsData() {
                return {
                    levelList: this.levelList,
                    opened: this.opened
                }
            }
        },
        methods: {
            selectScore(newVal) {
                this.selected = newVal;
                this.$emit("homeworkLevelPoint", this.selected);
                this.close()
            },
            judgeActive(obj) {
                if (this.selected) {
                    return this.selected.ID == obj.ID;
                }
            },
            handleEmit(){
                this.selected=null;
            }
        },
        created() {
        },
        mounted() {
            app.eventDefine.on('homeworkCommentResetPointChosed',this.handleEmit);
        },
        beforeDestroy() {
            app.eventDefine.off('homeworkCommentResetPointChosed');
        },
        components: {
            
        }
    }
</script>