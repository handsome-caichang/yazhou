<!--考试成绩查询-->
<style scoped lang="scss">
    
    
    .score-query-class-conteiner{
        .header{
            background-color: $color-white;
            padding: 0 12px;
            height: 40px;
            color: $color-9;
            line-height: 40px;
            font-size: 13px;
            display: flex;
            .class-name{
                width: 60px;
                flex: 1;
            }
            .num{
                width: 52px;
                margin-left: 5px;
                text-align: right;
            }

        }
        .scroller{
            @include position-absolute(50px,0,0,0);
            background-color: $color-white;
            .card{
                padding: 0 12px;
                height: 44px;
                color: $color-3;
                line-height: 44px;
                font-size: 14px;
                background-color: $color-white;
                @include border-bottom;
                display: flex;
                .name{
                    width: 60px;
                    flex: 1;
                    @include ellipsis-single;
                }
                .score{
                    width: 52px;
                    margin-left: 5px;
                    text-align: right;
                    .max{
                        color: $color-primary;
                    }
                    .min{
                        color: #8B572A;
                    }
                    .average{
                        color: #F8800A;
                    }
                }
            }
        }
    }
    .noData-temp {
        @include position-absolute;
    }
    .void{
        width: 100%;
        height: 10px;
        background-color: $color-assist-1;
    }
</style>

<template>
    <div class="score-query-class-conteiner">
        <div class="header">
            <div class="class-name">班级名称</div>
            <div class="num">考试人数</div>
            <div class="num">最高分</div>
            <div class="num">最低分</div>
            <div class="num">平均分</div>
        </div>
        <div class="void"></div>
        <scroller-super class="scroller"
                       :type="2"
                       :data="list"
                       :pagingOption="pagingOption"
                       @loadData="loadData"
                       ref="scoreQueryClassScroller">
            <router-link tag="div" :to="`/ScoreQueryStudent/${item.ExamID}/${item.ClassID}`" class="card" v-for="(item,index) in list" :key="index">
                <div class="name">{{item.ClassName}}</div>
                <div class="score"><span>{{item.StudentNum}}</span></div>
                <div class="score"><span class="max">{{item.MaxScore}}</span></div>
                <div class="score"><span class="min">{{item.MinScore}}</span></div>
                <div class="score"><span class="average">{{item.averageScore}}</span></div>
            </router-link>
            <empty-page class="noData-temp" v-if="list.length == 0" :type="1" text="还没有成绩噢~"></empty-page>
        </scroller-super>

        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import {getScoreQueryClass} from "teacher/api/score.js";
    import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';
    export default {
        name: "score-query-class",
        data() {
            return {
                wxTitle:'考试成绩查询',
                isLoading:true,
                list:[],
                pagingOption:{
                    api:getScoreQueryClass,
                    params:{
                        examId:'',
                        classID:''//这里注意：这个字段一定要传，而且要传空值。
                    },
                    pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'PageIndex',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'PageSize',
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: 'PageCount'
                    }
                }
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = []
                        }
                        res.Data.forEach(item=>{
                           item.averageScore=item.StudentNum==0?0:this.formatScore(item.SumScore/item.StudentNum)
                        })
                        this.list = this.list.concat(res.Data)
                    }
                })
            },
            formatScore(sco){
                return new Number(sco).toFixed(2)
            }

        },
        created() {
            this.pagingOption.params.examId = this.$route.params.examid;
        },
        components:{
            EmptyPage
        }
    }
</script>

