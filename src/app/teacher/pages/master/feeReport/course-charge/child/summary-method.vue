<!--汇总方式弹框-->
<style scoped lang="scss">
    .iconfont_xz{
        width: 1em;
        height: 1em;
        vertical-align: -.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .as-body{
        @include position-absolute;
        .pop-title{
            line-height: 44px;
            background-color: #f0f0f0;
            color: #666;
            z-index: 2;
            height: 44px;
            padding: 0 12px;
            margin-bottom: 2px;
        }
        .title{
            line-height: 34px;
            background-color: #f1f3f8;
            color: #999;
            padding-left: 12px;
            padding-right: 12px;
        }
        .item{
            background-color: #fff;
            padding: 12px 10px;
            border-bottom: 1px solid #eaeaea;
            color: #333;
            @include flex-between;
            word-break: break-all;
            .icon{
                color: $color-primary;
            }
        }
    }

</style>

<template>
    <action-sheet class="as-body" v-show="opened" :position="sideRight" @close="close" :data="renderData">
        <div class="pop-title" @click="goBack()">
            <svg class="iconfont_xz" aria-hidden="true"><use xlink:href="#ixz-xiangzuo"></use></svg>
            汇总方式
        </div>
        <div class="title">按课程</div>
        <div class="item" v-for="(item,index) in listCourse" :key="index" @click="selectMethod(item)">
            <div class="name">{{item.name}}</div>
            <svg class="iconfont_xz icon" v-show="current==item.name" aria-hidden="true">
                <use xlink:href="#ixz-xuanzhongdagou"></use>
            </svg>
        </div>
        <div class="title">按时间</div>
        <div class="item" v-for="(item) in listTime" @click="selectMethod(item)">
            <div class="name">{{item.name}}</div>
            <svg class="iconfont_xz icon" v-show="current==item.name" aria-hidden="true">
                <use xlink:href="#ixz-xuanzhongdagou"></use>
            </svg>
        </div>

    </action-sheet>
</template>

<script>
    export default {
        name: "summary-method",
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            opened:{}
        },
        data() {
            return {
                wxTitle: "",
                sideRight:'sideRight',
                listCourse:[{name:'名称',dataType:2},{name:'年份',dataType:3},{name:'期段',dataType:4},{name:'年级',dataType:5},{name:'科目',dataType:6},{name:'类型',dataType:7}],
                listTime:[{name:'月',dataType:1},{name:'天',dataType:0}],
                current:''
            }
        },
        computed: {
            renderData(){
                return{

                }
            }
        },
        methods: {
            goBack(){
                this.close()
            },
            selectMethod(item){
                this.current = item.name;
                this.$emit('acceptSummaryMethod',item);
                this.close();
            }
        },
        created() {
        },
        components: {}
    }
</script>

