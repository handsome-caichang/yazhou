<style scoped lang="scss">

    .action-sheet{
        @include position-absolute;
        .search-box{
            height: 44px;
            line-height: 44px;
            padding: 8px 12px;
            font-size: 13px;
            .box{
                height: 28px;
                border: 1px solid $color-assist-1;
                border-radius: 28px;
                padding-left: 12px;
                @include flex-between;
                .btn{
                    width: 50px;
                    height: 28px;
                    line-height: 28px;
                    background-color: $color-assist-1;
                    text-align: center;
                    border-radius: 28px;
                    color: $color-6;
                }
            }
        }
        .tem-body{
            background-color: $color-white;
        }
        .body{
            .card{
                height: 40px;
                line-height: 40px;
                @include border-bottom;
                font-size: 14px;
                color: $color-3;
                margin: 0 12px;
            }
        }
    }
    .noData-temp{
        @include position-absolute;
    }

</style>
<style>
    .homeworkTemAS.action-sheet .scroll-box{
            background-color: #ffffff;

    }
</style>

<template>
    <div class="tem-container">

        <action-sheet
                class="action-sheet homeworkTemAS"
                v-show="opened"
                :scrollerConfig="scrollerConfig"
                :scrollerStyle="scrollerStyle"
                :data="renderData"
                :fullParent="true"
                :position="position"
                ref="temScroll"
                @loadData="loadData"
                @close="close">
            <!--搜索框-->
            <div class="search-box" @click="search" slot="header">
                <div class="box">
                    <div class="guide">{{queryText}}</div>
                    <div class="btn">搜索</div>
                </div>
            </div>
            <div class="tem-body">
                <!--模板列表-->
                <div class="body">
                    <div class="card" v-for="(item,index) in list" :key="index" @click="choseTem(item)">
                        <div class="item">{{item.Name}}</div>
                    </div>
                </div>
            </div>
            <empty-page class="noData-temp" v-if="list.length==0" :type="2" text="暂无数据"></empty-page>
            <loading class="loading" v-show="isLoading" :bgType="0"></loading>
        </action-sheet>

        <tem-search
                @HomeworktemKeyword="acceptKeyWord"
                @homeworkTemClose=homeworkTemClose
                :classid="classid"
            	:opened.sync="openTemSearch">
        </tem-search>


    </div>
</template>

<script>
    import EmptyPage from "teacher/components/common/empty-page/empty-page.vue";
    import TemSearch from './tem-search.vue'
    import {processGet,processPost} from 'teacher/api/common.js'

    export default {
        name: "tem",
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            opened: {},
            classid:{
              type:String
            },
            position: {
                type: String,
                default: "sideRight"
            },

        },
        data() {
            return {
                wxTitle: "",
                isLoading: true,
                refreshNum:0,
                openTemSearch:false,
                scrollerStyle:{
                    'background-color':'#ffffff'
                },
                scrollerConfig:{
                    tag: 'super',
                    type: 2,
                    pagingOption: {
                        autoLoadFirst: false,//初始化没有classid,所以第一次不加载
                        api: processGet,
                        params: {
                            pname: 'queryjobtemplate',
                            classid:'',
                            keyword:'',
                        },
                        pageOpt: {
                            // 分页初始页码的'key'、'value'
                            indexKey: 'page',
                            indexVal: 1,
                            // 每页请求数据长度的'key'、'value'
                            sizeKey: 'pageSize',
                            sizeVal: 20,
                            // 后端返回的总页数'key'
                            countKey: 'pageCount'
                        }
                    }
                },
                queryText:'搜索作业模板',
                list:[]
            }
        },
        computed: {
            renderData(){
                return {
                    list:this.list,
                    refreshNum:this.refreshNum
                }
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.data)
                    }
                })
            },
            search(){
                this.openTemSearch = !this.openTemSearch;
            },
            acceptKeyWord(keyword){
                this.queryText = keyword;
                this.scrollerConfig.pagingOption.params.keyword = keyword;
                this.$refs.temScroll.refresh(this.scrollerConfig.pagingOption);

            },
            choseTem(item){
                processGet({pname:'getjobtemplateinfo',id:item.ID}).then(res=>{
                    if(res.errcode == app.errok){
                        this.$emit('homeworkTem',{
                            Title:res.data.Title,
                            Name:res.data.Name,
                            Content:res.data.Content,
                            AudioList:res.data.AudioList,
                            ImageList:res.data.ImageList,
                            VideoList:res.data.VideoList,
                            AttachmentsList:res.data.AttachmentsList,
                            LinkList:res.data.LinkList,
                        });
                        this.close();
                    }else{
                        app.toast('error',res.errmsg);
                    }
                })

            },
            homeworkTemClose(){
                setTimeout(() => {
                    this.close();
                }, 30)
            }
        },
        created() {
        },
        components: {
            EmptyPage,
            TemSearch
        },
        watch: {
            opened(newVal, oldVal) {
                if (newVal) {
                    this.queryText = '搜索作业模板';
                    this.scrollerConfig.pagingOption.params.classid = this.classid;//赋值classid
                    this.scrollerConfig.pagingOption.params.keyword = '';//前进 进来时清楚搜索

                    this.$refs.temScroll.refresh();//避免重复请求
                    this.refreshNum++
                }


            }
        }
    }
</script>

