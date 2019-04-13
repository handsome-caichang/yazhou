<template>
    <div class="rank-list">
        <!-- 标题 -->
        <div class="title">
            <slot name="title" v-if="type==='top10'">
                <div class="title-slot top10">
                    <span>{{titleSplit[0]}}</span>
                    <span>{{titleSplit[1]}}</span>
                </div>
            </slot>

            <slot name="title" v-if="type==='sort5'">
                <div class="title-slot sort5">
                    <div v-bind:style="{color:color}">
                        <svg class="icon" v-bind:style="{fill:color}"><use xlink:href="#icon-tubiao1"></use></svg>
                        <span>{{title}}</span>
                    </div>

                    <div @click="toggleOrder">
                        <svg class="icon"><use :xlink:href="asc?'#icon-qiehuan':'#icon-qiehuanhou'"></use></svg>
                        {{asc?'切换至最后5名':'切换至前5名'}}
                    </div>
                </div>
            </slot>
        </div>

        <div class="rank-item no-data" v-if="data.list.length === 0">没有数据~</div>
        <!-- 排名榜 -->
        <div class="rank-item" v-for="(item,index) in data.list" :key="index">
            <!-- 排名文字 -->
            <div class="rank-item-content">
                <div>
                    <span v-if="index>=3 || !asc" >{{asc? index + 1 : data.total - index}}</span>
                    <svg class="icon" v-else>
                        <use :xlink:href="'#icon-icon-test' + (index + 1)"></use>
                    </svg>
                    <span>{{item.name}}</span>
                </div>

                <div v-if="type=='top10'">
                    <span>排名/总校区：</span>
                    <span class="red">{{item.totalRank}}</span>
                    <span>/{{data.total}}</span>
                </div>
            </div>

            <!-- 排名进度条 -->
            <div class="rank-bar-show">
                <div class="rank-bar-container">
                    <div class="rank-bar" v-bind:style="{width:rateList[index] + '%'}" v-bind:class="{'count-down':!asc}">
                        <span v-if="rateList[index]>40">{{item.value | formatNumberUnit(2)}}{{item.unit}}</span>
                    </div>
                        <span v-if="rateList[index]<=40">{{item.value | formatNumberUnit(2)}}{{item.unit}}</span>
                </div>
                <svg class="icon" @click="toggle(index)" v-show="expand">
                    <use :xlink:href="toggleList[index]?'#icon-shouqi':'#icon-zhankai'"></use>
                </svg>
            </div>

            <div class="rank-item-detail" v-show="toggleList[index]" v-if="expand">
                <div class="rank-item-detail-item" v-for="(detailItem,detailIndex) in detailList" :key="detailIndex">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                        <circle  cx="5" cy="5" r="3" :stroke="detailItem.color" stroke-width="2" fill="transparent"></circle>
                    </svg>
                    <span>{{detailItem.name}}</span>
                    <span>{{item.typesMap[detailItem.key]  | formatNumberUnit(2) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "rank-list",
        props: {
            data:{
                type:Object,
                default(){
                    return {
                        total:0,
                        list:[],         //rank,name,value
                        listCountDown:[],
                        chargeTypes:[]//收费类型
                    }
                },
                required:true
            },
            title:{
                type:String,
                default:''
            },
            type:{
                type:String,
                default:'top10'   //前10为'top10',前5或后5为'sort5'
            },
            expand:{
                type:Boolean,
                default:true,
            },        //是否有展开详情
            color:{
                type:String,
                default:'#78AEF9'
            }
        },
        data(){
            return {
                toggleList:[],
                rateList:[],        //计算宽度
                asc:true,           //前5还是后5.
                tempList:[],        //缓存前5后5.
                detailList:[],
            }
        },
        computed:{
            titleSplit(){
                return this.title.indexOf('-')> - 1 ? this.title.split('-') : ['排行榜','TOP10']
            }
        },
        methods:{
            toggle(index){
                this.$set(this.toggleList,index, !this.toggleList[index]);
                this.$emit("toggle");
            },
            toggleOrder(){
                this.asc = !this.asc;
                if (this.asc){
                    this.$emit('update:list',this.tempList[0]);
                } else {
                    this.$emit('update:list',this.tempList[1]);
                }
            },
            dealType(){
                const feeTypeColor = {
                    FeeType_Expand:'#7ACE4C',
                    FeeType_New:'#5DADE2',
                    FeeType_Continue:'#FFB508',
                    FeeType_Account:'#7460EE',
                    FeeType_Account_New:'#15D0BD',
                    FeeType_Account_Continue:'#15AC9D',
                    FeeType_Account_Introduce:'#00CE7D',
                    FeeType_Other:'#75859B'
                };
                this.detailList = [];
                this.data&&this.data.chargePie&&this.data.chargePie.forEach((item)=>{
                    this.detailList.push({
                        name:item.name,
                        key:item.chargeType,
                        color:feeTypeColor[item.chargeType],
                    })
                })
            }
        },
        mounted(){

        },
        watch:{
            'data.list'(newVal){
                this.expand && this.dealType();
                if (newVal && newVal.length > 0){
                    this.toggleList = newVal.map(item=>false);
                    this.rateList = rateCompute(newVal.map(item=>item.value));
                }
            },
            'data.listCountDown'(newVal){
                if (this.type == 'sort5'){
                    this.tempList = [[...this.data.list],[...this.data.listCountDown]];                
                }
            }
        }
    }


    function rateCompute(arr){
        let max = Math.max(...arr);
        return arr.map(item=>max === 0 ? 0 : (item/max) * 100);
    }
</script>

<style scoped lang="scss">
    
	
    .rank-list{
        width:100%;
        .title{
            height:50px;
            border-bottom: 1px solid #DCDCDC;
            .title-slot{
                
                width:100%;
                height:100%;
                &.top10{
                    @include flex-center;
                    span:first-child{
                        color:#333;
                        font-size:15px;
                        margin-right:10px;
                    }
                    span:last-child{
                        color:#666;
                        font-size:13px;
                        margin-top: 3px;
                    }
                }

                &.sort5{
                    padding:0 20px;
                    @include flex-between;
                    >div{
                        @include flex-center;
                        svg{
                            margin-right:5px;
                        }
                        &:first-child{
                            font-size:15px;
                        }
                        &:last-child{
                            font-size:13px;
                            color:#666666;
                        }
                    }
                }
            }
        }

        .rank-item{
            @include flex-center(column);
            padding:10px 20px;
            border-bottom: 1px solid #DCDCDC;
            &.no-data{
                height:140px;
            }
            .rank-item-content{
                @include flex-between;
                width:100%;
                line-height: 30px;
                font-size:14px;
                color:#666666;
                >div:first-child{
                    color:#333333;
                    @include ellipsis-single;
                    span:first-child{
                        margin-right:10px;
                    }
                }
                >div:last-child{
                    min-width: 125px;
                }
                span.red{
                    color:#FF7B90;
                }
            }
            .rank-bar-show{
                height:30px;
                width:100%;
                margin-bottom:10px;
                @include flex-between;
                .rank-bar-container{
                    width:calc(100% - 40px);
                    @include flex-center;
                    justify-content: flex-start;
                    >span{
                        margin-left:10px;
                        color:#78AEF9;
                    }
                    .rank-bar{
                        background:#78AEF9;
                        border-radius:5px;
                        height:30px;
                        padding-right:20px;
                        @include flex-center;
                        justify-content: flex-end;
                        color:#FFFFFF;
                        &.count-down{
                            background:#F8800A;
                        }
                    }
                }
            }

            .rank-item-detail{
                height: 80px;
                width: 100%;
                @include flex-center;
                justify-content: flex-start;
                flex-wrap:wrap;
                .rank-item-detail-item{
                    min-width:33%;
                    font-size:12px;
                    white-space: nowrap;
                    padding-right:5px;
                    >span{
                        color:#999999
                    }
                    >span:last-child{
                        color:#333
                    }

                }
            }
        }
    }

</style>