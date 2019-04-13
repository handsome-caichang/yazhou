<!-- 消息列表界面 -->
<style lang="scss" scoped>
    
    

    .message-list {
        @include position-absolute;
		background-color: $color-assist-1;
		.list-item{
			position: relative;
			@include border-bottom;
			padding: 20px 15px;
			background-color: $color-white;
			.list-item-icon{
				position: absolute;
				display: inline-block;
				width: 50px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				border-radius: 50%;
				border: 1px solid #DADADA;
				svg{
					font-size: 20px;
				}
			}
			.list-item-content{
				position: relative;
			    padding-left: 60px;
			    min-height: 50px;
			    .title{
			    	@include fs-lh(15);
			    	color: $color-3;
			    }
			    .detail{
			    	margin-top: 10 - (16 - 12)/2 - (25 - 15)/2 + px;
			    	color: $color-6;
			    	@include fs-lh(12);
			    	@include ellipsis-single;
			    }
			}
			.list-item-date{
				position: absolute;
				top: $edge;
				right: 15px;
				color: $color-9;
				font-size: $fs-small-x;
			}
		}
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="message-list">
		<scroller-load class="scroller" @loadData="renderData" :data="list" :pagingOption="pagingOption">
			<div>
				<div class="list-item" v-for="(item,index) in list">
					<router-link :to="{path:'/messageDetail',query:{ID:item.ID}}">
						<span class="list-item-icon">
							<svg class="icon" aria-hidden="true">
		                		<use xlink:href="#icon-youhuiquan"></use>
							</svg>
						</span>
						<div class="list-item-content">
							<div class="title">{{item.Title}}</div>
							<div class="detail">{{item.Content}}</div>
						</div>
						<span class="list-item-date">{{item.Date}}</span>
					</router-link>
				</div>
			</div>
		</scroller-load>
		<loading v-if="isLoading"></loading>
	</div>
</template>

<script>
	import { getMessageList } from 'api/lc';
	
	export default{
		name:'message-list',
        data() {
            return {
            	pagingOption: {
                    api: getMessageList
                },
                list:[],
                isLoading: true,
               	wxTitle:"消息"
            }
        },
        methods: {
        	renderData(ajaxPromise) {
                ajaxPromise.then(res => {
                	this.isLoading = false;
                	if (res.ErrorCode == app.errok) {
                		if (res.PageIndex === 1) {
							this.list = [];
						}
                        this.list = this.list.concat(res.Data);
                    }
                })
        	}
        }
	}
</script>