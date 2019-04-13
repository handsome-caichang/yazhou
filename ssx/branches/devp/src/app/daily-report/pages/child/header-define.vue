<template>
    	<div class="header">
            <slot>
			    <div class="title">{{data.title}}</div>
            </slot>
            <div class="content">
			    <div  v-for="item in data.content" :key="item.name">
                    <span>{{item.name}}：</span>
                    <span class="val">{{item.value}}</span>
                    </div>
            </div>
		</div>
</template>

<script>
    export default {
        name: "headerDefine",
        props: {
            data:{
                type:Object,
                default(){
                    return {
                        title:'运营总览',
                        content:[{name:'日期',value:'2018-05-02'}]
                    }
                }
            }
        },
    }
</script>

<style scoped lang="scss">

    .header{
        @include flex-center(column);
        margin-bottom: 12px;
        padding-top: 15px;
        .title{
            @include fs-lh(16);
            font-weight: bold;
            color: $color-black;
            margin-bottom:5px;
        }
        .content{
            @include fs-lh(12);
            @include flex-center;
            color:$color-6;
            >div{
                span.val{
                    color:$color-3;    
                }
                &:nth-child(2){
                     margin-left:25px;
                }
            }
        }
    
    }
</style>