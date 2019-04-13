<template>
    	<div class="tab-bar ">
            <div class="semicircle">
			    <div class="tab-item " v-bind:class="{'semicircle active':type == 'day'}" @click="changeTab('day')">日报</div>
                <div class="tab-item"  v-bind:class="{'semicircle active':type == 'month'}" @click="changeTab('month')">月报</div>
                <div class="tab-item"  v-bind:class="{'semicircle active':type == 'year'}" @click="changeTab('year')">年报</div>
            </div>
		</div>
</template>

<script>
    export default {
        name: "tabBar",
        props: {
            type:{
                type:String,
                default:'month'           //'day','month','year'
            }
        },
        data(){
            return {

            }
        },
        methods:{
            changeTab(type){
                this.$emit("changeType",type);
            }
        }
    }
</script>

<style scoped lang="scss">
	
    
    .semicircle{
        position: relative;
        &:before,&:after{
            content:'';
            position:absolute;
            width:40px;
            top:0;
            height:40px;
            border-radius: 40px;
            background:#EEF1F6;
            z-index: 1;
        }
        &:before{
            left:-20px;
        }
        &:after{
            right:-20px;
        }

        &.active:before,&.active:after{
            width:41px;
            z-index: 2;
            background:#78AEF9;
        }
    }
    
    .tab-bar{
        @include flex-center;
        padding:0 15px;
        >div{
            background:#EEF1F6;
            height:40px;
            width:calc(100% - 40px);
            @include flex-between;
            >div.tab-item{
                width:27%;
                height:100%;
                @include flex-center;
                font-size:14px;
                &.active{
                    background:#78AEF9;
                    color:#fff;
                }
            }
        }
    }
</style>