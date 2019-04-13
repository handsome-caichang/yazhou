<style scoped lang="scss">
    .tem-search-container{
        @include position-absolute(0,0,0,0);
        background-color: $color-white;
        .search-box{
            height: 44px;
            line-height: 44px;
            padding: 8px 12px;
            font-size: 13px;
            .box{
                height: 28px;
                border: 1px solid $color-assist-1;
                border-radius: 28px;
                @include flex-between;
                .search-input{
                    padding-left: 12px;
                }
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
        .head{
            padding: 6px 13px;
            @include flex-between;
            .title{
                font-size: 15px;
                color: $color-3;
            }
            .delete{
                font-size: 15px;
                color: red;
            }
        }

        .scroller-head{
            @include position-absolute(76px,0,0,0);
            .history-body{
                padding: 6px 12px;
                display: flex;
                flex-wrap: wrap;
                .item{
                    height: 28px;
                    line-height: 28px;
                    padding: 0 21px;
                    margin-top: 10px;
                    margin-right: 10px;
                    border-radius: 28px;
                    border: 1px solid  $color-assist-1;
                    background-color: #F8F8F8;
                    font-size: 13px;
                    color: #bbbbbb;
                }
            }
        }
        .scroller-body{
            @include position-absolute(44px,0,0,0);
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
    }

    // 动画
    .as-tem-search-enter-active,
    .as-tem-search-leave-active {
        transition: all $duration $timing;
        transform: translate3d(0, 0, 0);
    }
    .as-tem-search-enter,
    .as-tem-search-leave-active {
        transition: all $duration $timing;
        transform: translate3d(100%, 0, 0);
    }
</style>

<template>
    <transition name="as-tem-search">
        <div class="tem-search-container" v-show="opened">
            <!--搜索框-->
            <div class="search-box" slot="header">
                <div class="box">
                    <input class="search-input" type="text" ref="inputEle" v-model="queryText" placeholder="搜索作业模板">
                    <div class="btn" @click="search">搜索</div>
                </div>
            </div>

            <!--历史搜索 标题-->
            <div class="head" v-show="app.tool.trim(queryText)==''">
                <div class="title">历史搜索</div>
                <div class="delete" @click="deleteHistoryKeyWorlds">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shanchu2"></use>
                    </svg>
                </div>
            </div>
            <!--历史搜索 内容-->
            <scroller-base
                    class="scroller-head"
                    :data="historyKeyWordsList"
                    v-show="app.tool.trim(queryText)==''">
                <div class="history-body">
                    <div class="item" v-for="(key,index) in historyKeyWordsList" :key="index" @click="chooseRecord(key)">
                        {{key}}
                    </div>
                </div>
            </scroller-base>

            <!--搜索结果-->
            <scroller-base
                    class="scroller-body"
                    :data="list"
                    v-show="app.tool.trim(queryText)!=''">
                <div class="body">
                    <div class="card" v-for="(item,index) in list " :key="index" @click="choseTem(item)">
                        <div class="item">{{item.Name}}</div>
                    </div>
                </div>
                <!--空白页 只有搜索结果为空时才展示-->
                <empty-page class="noData-temp" v-show="app.tool.trim(queryText)!==''&&list.length==0" :type="2" text="暂无数据"></empty-page>
            </scroller-base>

        </div>
    </transition>
</template>

<script>
    // 1.历史数据最多十条
    // 2.搜索出来的也最多十条

    //situation
    //1.没有历史记录时，显示模板名称

    import { processGet,processCPost,processPost } from 'teacher/api/common.js'
    import EmptyPage from "teacher/components/common/empty-page/empty-page.vue";
    export default {
        name: "tem-search",
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            opened: {},
            position: {
                type: String,
                default: "sideRight"
            },
            classid:{
                type: String
            }
        },
        data() {
            return {
                wxTitle: "",
                refreshNum:0,
                queryText:'',//搜索关键字
                historyKeyWordsList:[],
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
            search(){
                // 带着参数返回上层
                this.$emit('HomeworktemKeyword',this.queryText);
                this.close();
            },
            choseTem(item){
                processGet({pname:'getjobtemplateinfo',id:item.ID}).then(res=>{
                    if(res.errcode == app.errok){
                        //通知发作业页面接收模板
                        app.eventDefine.emit('acceptHomeworkTem',{
                            Name:res.data.Name,
                            Content:res.data.Content,
                            AudioList:res.data.AudioList,
                            ImageList:res.data.ImageList,
                            VideoList:res.data.VideoList,
                            AttachmentsList:res.data.AttachmentsList,
                            LinkList:res.data.LinkList,
                        });
                        this.close();
                        
                        //通知父窗口关闭
                        this.$emit('homeworkTemClose');
                        
                    }
                })

            },
            chooseRecord(str){
                this.queryText = str;
            },
            // 聚焦
            focuInput(){
                setTimeout(()=>{this.$refs.inputEle.focus();},501);
            },
            //删除历史记录
            deleteHistoryKeyWorlds(){
                processGet({
                    pname:'deletesearchrecords',
                }).then(res=>{
                    if(res.errcode == app.errok){
                        this.getKeyWords();
                    }
                })
            },
            // 获取作业历史搜索
            getKeyWords(){
                processGet({
                    pname:'querysearchkeyword',
                    pageIndex:1,
                    pageSize: 10
                }).then(res=>{
                    // 没有数据的时候是null
                    if((res.errcode == app.errok) && res.data[0]){
                        this.historyKeyWordsList  = res.data;
                    }else{
                        this.historyKeyWordsList = [];
                    }
                })
            },
            // 模糊匹配
            getList(){
                processCPost({
                    pname:'queryjobtemplate',
                    classid:this.classid,
                    keyword:this.queryText,
                    pageCount: 1,
                    pageIndex: 1,
                    pageSize: 10
                }).then(res=>{
                    if(res.errcode == app.errok){
                        this.list  = res.data;
                    }
                })
            }
        },
        created() {
        },
        components: {
            EmptyPage
        },
        watch: {
            opened(newVal, oldVal) {
                if (newVal) {
                    this.queryText = '';
                    this.getKeyWords();
                    this.getList();
                    this.focuInput();
                    this.refreshNum++
                }
            },
            queryText(newVal) {//input时 触发搜索刷新
                if(app.tool.trim(newVal)!==''){
                    this.getList();
                }

            }
        }
    }
</script>

