<template>
    <div class="card-percent" :style="{backgroundColor:color,backgroundImage:'url('+foreBg+')'}">
        <div class="title">
            <div class="title-name" @click.stop = "$emit('clickHelp',$event)">
                {{data.title}}
                <svg class="icon">
                    <use xlink:href="#icon-bangzhu"></use>
                </svg>
            </div>
            <div class="title-icon" v-if="type==1" >
                <svg class="icon" style="fill:#fff;">
                    <use xlink:href="#icon-huangguan"></use>
                </svg>
            </div>
        </div>

        <div class="content" :class="type==1?'type1':'type2'">
            <div  class="rate" v-if="data.rate==0">-</div>
            <div  class="rate" v-else>
                {{ data.rate | formatNumberUnit(2)}}%
            </div>
            <div class="total" v-if="type==1">
                <span>班级数：</span>
                <span>{{data.total}}</span>
            </div>
            <div class="detail" v-if="type==2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                        <circle  cx="5" cy="5" r="3" stroke="#ffffff" stroke-width="2" fill="transparent"></circle>
                    </svg>
                    <span>{{data.countName[0]}}：{{data.count1}}</span>
                </div>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                        <circle  cx="5" cy="5" r="3" stroke="#F8E71C" stroke-width="2" fill="transparent"></circle>
                    </svg>
                    <span>{{data.countName[1]}}：{{data.count2}}</span>
                </div>
            </div>
        </div>

        <div class="content-more" v-if="data.count3!= null">
             <div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                    <circle  cx="5" cy="5" r="3" stroke="#ffffff" stroke-width="2" fill="transparent"></circle>
                </svg>
                <span class="more-title">{{data.countName[0]}}：&nbsp;</span>
                <span class="more-number">{{data.count3}}</span>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                    <circle  cx="5" cy="5" r="3" stroke="#F8E71C" stroke-width="2" fill="transparent"></circle>
                </svg>
                <span class="more-title">{{data.countName[1]}}：</span>
                <span class="more-number">&nbsp;{{data.count4}}</span>
            </div>
        </div>

    </div>
</template>

<script>
    const foreBg = require('../../assets/img/foreBg.png')
    export default {
        name: "card-percent",
        mixins: [],
        props: {
            data:{
                type:Object,
                default(){
                    return {
                        rate:0,
                        total:0,
                        title:'',
                        countName:['',''],
                        count1:0,
                        count2:0,
                        count3:null,
                        count4:null
                    }
                }
            },
            type:{
                type:Number,
                default:1
            },
            color:{
                type:String,
                default:'#78AEF9'
            }
        },
        data(){
            return {
                foreBg,
            }
        }
    }
</script>

<style scoped lang="scss">
    
	
    .card-percent{
        padding:10px 15px;
        border-radius: 6px;
        height:100px;
        color:#fff;
        background-size:90% 100%;
        background-repeat: no-repeat;
        .title{
            @include flex-between;
            .title-name{
                font-size:16px;
            }
            .title-icon{
                svg{
                    font-size: 24px;
                }
            }
        }
        .content{
            margin-top:3px;
            @include flex-between;
            &.type1{
                align-items: baseline;
            }
            div:first-child{
                font-size:44px;
            }
            div.total{                
                span:first-child{
                    font-size:14px;
                    color:rgba(255,255,255,.5);
                }
                span:last-child{
                    color:#F8E71C;
                }
            }

            div.detail{
                >div{
                    font-size:13px;
                    color:#fff;
                    @include flex-center;
                    justify-content:flex-start;
                    margin-bottom:5px;
                    opacity:0.72;
                }
            }
        }

        .content-more{
            margin-top:3px;
            @include flex-between;
            font-size:13px;
            >div{
                @include flex-between;
                .more-title{
                    opacity: 0.72;
                    margin-top:-3px;
                }
                .more-number{
                    font-size:14px;

                }
            }

        }
    }

</style>