<template>
    <div class="rank-emp">
        <!-- 标题 -->
        <div class="title">
            <slot name="title">
                <div class="title-slot">
                    <span>{{titleSplit[0]}}</span>
                    <span>{{titleSplit[1]}}</span>
                </div>
            </slot>
        </div>
        <div class="rank-item no-data" v-if="list.length ===0" style="justify-content:center" >没有数据~</div>
        <!-- 排名榜 -->
        <div class="rank-item" v-for="(item,index) in list" :key="index">
            <div>
                <span v-if="index>=3" >{{ index + 1}}</span>
                <svg class="icon" v-if="index < 3">
                    <use :xlink:href="'#icon-icon-test' + (index + 1)"></use>
                </svg>
                <img class="photo-icon" v-bind:src="item.photo == ''?userpicture:item.photo"/>
                <span>{{item.employeeName}}</span>
            </div>
            <div>{{item[keyName]}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "rank-emp",
        props: {
            list:{
                type:Array,
                default(){
                    return []
                }
            },
            title:{
                type:String,
                default:''
            },
            keyName:{
                type:String,
                default:'money'
            }
        },
        computed:{
            titleSplit(){
                return this.title.indexOf('-')> - 1 ? this.title.split('-') : ['排行榜','TOP10']
            }
        },
        data(){
            return {
                userpicture:require('../../assets/img/userpicture.png')
            }
        },
        methods:{
           
        },
        mounted(){
        },
        watch:{
            
        }
    }
</script>

<style scoped lang="scss">
    
	
    .rank-emp{
        width:100%;
        .title{
            height:50px;
            border-bottom: 1px solid #DCDCDC;
            .title-slot{
                @include flex-center;
                width:100%;
                height:100%;
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
        }

        .rank-item{
            @include flex-between;
            padding:10px 20px;
            border-bottom: 1px solid #DCDCDC;
            height:70px;
            &.no-data{
                height:140px;
            }
            >div:first-child{
                @include flex-center;
                span:first-child{
                    width:15px;
                }
                .photo-icon{
                    height:40px;
                    width:40px;
                    border-radius:50%;
                    border:1px solid #fff;
                    background:#5dbbcb;
                    margin:0 5px;
                }
            }
            >div:last-child{
                color:#7ACE4C;
                font-size:16px;
            }
        }
    }

</style>