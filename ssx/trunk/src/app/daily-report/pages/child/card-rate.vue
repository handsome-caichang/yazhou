<template>
    <div class="card-home" :style="{background:color}">
        <div class="title">
            <div class="title-name" @click.stop = "$emit('clickHelp',$event)">
                {{data.title}}
                <svg class="icon">
                    <use xlink:href="#icon-bangzhu"></use>
                </svg>
            </div>
            <div class="title-num">
                <span class="big">{{data.rate | formatNumberUnit(2)}}</span>
                <span class="small">%</span>
            </div>
        </div>

        <div class="content">
            <div class="total">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                    <circle  cx="5" cy="5" r="3" stroke="#ffffff" stroke-width="2" fill="transparent"></circle>
                </svg>
                <span>{{data.countName[0]}}：{{data.count1}}</span>
            </div>

            <div class="part">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                    <circle  cx="5" cy="5" r="3" stroke="#F8E71C" stroke-width="2" fill="transparent"></circle>
                </svg>
                <span>{{data.countName[1]}}：{{data.count2}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card-home",
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
                        count2:0
                    }
                }
            },
            color:{
                type:String,
                default:'#78AEF9'
            }
        },
    }
</script>

<style scoped lang="scss">
    
	
    .card-home{
        padding:25px 0 20px 15px;
        border-radius: 4px;
        height:180px;
        color:#fff;
        .title{
            margin-bottom:30px;
            .title-name{
                font-size:13px;
                margin-bottom:5px;
                width: 70px;
            }
            .title-num{
                .big{
                    font-size:33px;
                }
            }
        }
        .content{
            >div{
                @include flex-center;
                justify-content:flex-start;
                margin-bottom:5px;
                opacity:0.72;
            }

        }
    }

</style>