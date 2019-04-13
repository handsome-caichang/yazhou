<!-- 评语列表 -->
<style scoped lang="scss">
    
    .as-body{
        @include position-absolute();
        z-index: 9999991;
        // background-color: $color-assist-1;
        .body{
            background-color: $color-assist-1;
            .item-box{
                padding: 12px 12px 0 12px;
                background-color: $color-assist-1;
                &:last-child{
                    padding:12px;
                }
                .item{
                    background-color: $color-white;
                    padding: 18px 15px;
                    border-radius: 4px;
                    .item-top{
                        @include flex-between();
                        font-size: 16px;
                        margin-bottom: 15px;
                        .name{
                            color:$color-3;
                            @include ellipsis-single;
                        }
                        .operate{
                            .icon{
                                font-size: 16px;
                                margin-left:15px; 
                            }
                        }
                    }
                    .item-bottom{
                        background-color: $color-assist-1;
                        position: relative;
                        padding: 8px 33px 8px 10px;
                        .text{
                            &.isClose{
                                @include ellipsis-multi(2);
                            }
                        }
                        
                        .arrow{
                            position: absolute;
                            right: 10px;
                            top: 8px;

                        }
                    }
                }
            }
            
        }
        
        .footer{
            background-color: $color-primary; 
            height: 44px;
            line-height: 44px;
            text-align: center;
            color: $color-white;
            font-size:16px;
        }
    }
    .add-pop{
        @include position-absolute();
    }
    
</style>

<template>
    <div class="remark-container">
        <action-sheet
            class="as-body"
            :position="'sideRight'"
            v-show="opened"
            :fullParent="true"
            :scrollerStyle="scrollerStyle"
            @close="close"
            :data="renderData">
            <div class="body">
                <div class="item-box" v-for="(item,index) in list" :key="index">
                    <div class="item">
                        <div class="item-top">
                            <div class="name">
                                {{item.name}}
                            </div>
                            <div class="operate">
                                <svg aria-hidden="true" class="icon" @click="openAddpopAS(item)">
                                    <use xlink:href="#icon-bianji1">
                                    </use>
                                </svg>
                                <svg aria-hidden="true" class="icon" @click="deleteItem(item)">
                                    <use xlink:href="#icon-shanchu3">
                                    </use>
                                </svg>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="text"  :class="{isClose:item.isClose}">
                                {{item.content}}
                            </div>
                            <div class="arrow" @click="showFullComment(item)">
                                <svg aria-hidden="true" class="icon">
                                    <use :xlink:href="item.isClose?'#icon-xiala':'#icon-shangla'">
                                    </use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer" slot="footer" @click="openAddpopAS">
                新增评语
            </div>
        </action-sheet>

        <add-pop class="add-pop"
            :opened.sync="isOpenAddPop"
            :popType="2"
            :paraData="paraItem">
        </add-pop>

    </div>
    
</template>


<script>
    import AddPop from './add-pop.vue';    
    import {getCoursecommenttemplatelist,getCoursecommenttemplatebyid,opCoursecommenttemplate} from 'teacher/api/common.js'
    export default {
        name: "category",
        mixins:[app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            parentid:{
                type: String,
                default:''
            }
        },
        data() {
            return {
                scrollerStyle: {
                    background: "#eef1f6"
                },
                list:[],
                isOpenAddPop:false,
                paraItem:{},
                refreshNum:0
            }
        },
        computed: {
            renderData() {
                return {
                    list:this.list,
                    opened: this.opened,
                    refreshNum:this.refreshNum
                }
            }
        },
        methods: {
            getData(){
                console.log('666666666666')
                getCoursecommenttemplatelist({
                    companyid:app.sysInfo.CompanyID,
                    type:1,
                    parentid:this.parentid,
                }).then((res)=>{
                    console.log(res)
                    if(res.result.code == app.errok){
                        this.list = res.data;
                    }

                })
             
                // this.list = [
                //     {
                //         name:'上课情况',
                //         remark:'一如既往的好，课堂不但听得认真，回答问题很棒，作业做得也不错',
                //         isClose:true,
                //     },
                //     {
                //         name:'上课情况2',
                //         remark:'一如既往的好，课堂不但听得认真，回答问题很棒，作业做得也不错。生活中的你文雅恬静，时常会看到你甜甜的笑容。还记得吗？田径场上当你取得佳绩归来时，你的平静掩饰不住。',
                //         isClose:true,
                //     },
                //     {
                //         name:'上课情况3',
                //         remark:'一如既往的好，课堂不但听得认真，回答问题很棒，作业做得也不错',
                //         isClose:true,
                //     },
                //     {
                //         name:'上课情况4',
                //         remark:'一如既往的好，课堂不但听得认真，回答问题很棒，作业做得也不错',
                //         isClose:true,
                //     },
                //     {
                //         name:'上课情况5',
                //         remark:'一如既往的好，课堂不但听得认真，回答问题很棒，作业做得也不错',
                //         isClose:true,
                //     },
                //     {
                //         name:'上课情况6',
                //         remark:'一如既往的好，课堂不但听得认真，回答问题很棒，作业做得也不错',
                //         isClose:true,
                //     },
                //     {
                //         name:'上课情况56',
                //         remark:'一如既往的好，课堂不但听得认真，回答问题很棒，作业做得也不错',
                //         isClose:true,
                //     },
                //     {
                //         name:'上课情况776',
                //         remark:'一如既往的好，课堂不但听得认真，回答问题很棒，作业做得也不错',
                //         isClose:true,
                //     },
                // ]
            },
            //    编辑
            openAddpopAS(item){
                this.paraItem = item;
                this.isOpenAddPop = !this.isOpenAddPop;
            },
            // 删除
            deleteItem(item){
                app.confirm({
                    title: "提示",
                    text: `确定要删除“${item.name}”吗？`,
                    btns: [{
                        text: '取消',
                        style: {color: '#333'},
                        action: false // 'cancel'
                    }, {
                        text: '确定',
                        style: {color:'#1E88F5'},
                        action: true // 'confirm'
                    }]
                }).then(sel => {
                    if (sel) {
                        //调删除接口
                    }
                });
            },
            showFullComment(item){
                item.isClose = !item.isClose;
                this.refreshNum++
            }
        },
        components: {
            AddPop
        },
        watch:{
            opened(newVal,oldVal){
                if(newVal){
                    console.log('remark this',this)
                    this.getData();
                }
            }
        }
    }
</script>