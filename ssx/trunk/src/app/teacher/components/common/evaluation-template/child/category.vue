<!-- 模板类别 -->
<style scoped lang="scss">
    
    .category-container{
        .as-body{
            @include position-absolute();
            z-index: 9999990;
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
                        display: flex;
                        background-color: $color-white;
                        padding: 15px;
                        border-radius: 4px;
                        .item-lf{
                            flex: 4;
                            @include ellipsis-single;
                            .name{
                                font-size: 16px;
                                color:$color-3;
                                margin-bottom: 10px;
                            }
                            .count{
                                font-size: 12px;
                                color:$color-9;
                            }
                        }
                        .item-rt{
                            flex:1;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            .icon{
                                font-size: 16px;
                                margin-left: 15px;
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
    }

</style>

<template>
<div class="category-container">
    <action-sheet
        class="as-body"
        v-show="opened"
        :position="'sideRight'"
        :fullParent="true"
        :scrollerStyle="scrollerStyle"
        @close="close"
        :data="renderData">
        <div class="body">
            <div class="item-box" v-for="(item,index) in list" :key="index">
                <div class="item">
                    <div class="item-lf" @click="openCommentAS">
                        <div class="name">{{item.name}}</div>
                        <div class="count">共{{item.count}}条评语</div>
                    </div>
                    <div class="item-rt">
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
                
            </div>
        </div>
        
        <div class="footer" slot="footer" @click="openAddpopAS">
            新增类别
        </div>
        
    </action-sheet>
    
    <add-pop class="add-pop"
        :opened.sync="isOpenAddPop"
        :popType="1"
        :paraData="paraItem">
    </add-pop> 
    
    <remark class="remark"
        :opened.sync="isOpenComment">
    </remark>

</div>
    
</template>


<script>
    import AddPop from './add-pop.vue';    
    import Remark from './remark.vue'
    export default {
        name: "category",
        mixins:[app.mixin.popupWindowRouteMixin],
        props: {
            opened: {}
        },
        data() {
            return {
                scrollerStyle: {
                    background: "#eef1f6"
                },
                list:[],
                isOpenAddPop:false,
                isOpenComment:false,
                paraItem:{}
            }
        },
        computed: {
            renderData() {
                return {
                    list:this.list,
                    opened: this.opened,
                }
            }
        },
        methods: {
            getData(){
                this.list = [
                    {
                        name:'系统默认',
                        count:4
                    },
                    {
                        name:'好平如此',
                        count:3
                    },
                    {
                        name:'平平淡淡',
                        count:2
                    },
                    {
                        name:'普普通通',
                        count:1
                    },
                    {
                        name:'平凡无奇',
                        count:6
                    },
                    {
                        name:'呵呵呵呵',
                        count:7
                    },
                    {
                        name:'你走吧',
                        count:8
                    },
                    {
                        name:'爆炸类别',
                        count:8
                    },
                ]
            },
            // 编辑
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
            // 新增评语弹框
            openCommentAS(){
                this.isOpenComment = !this.isOpenComment;
            }
        },
        components: {
            AddPop,
            Remark
        },
        watch:{
            opened(newVal,oldVal){
                if(newVal){
                    this.getData();
                }
            }
        }
    }
</script>