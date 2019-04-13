<!-- 消息详情界面 -->
<style lang="scss" scoped>
    .message-detail {
        @include position-absolute;
		background-color: $color-assist-1;
		.header{
			padding: 18px 0 8px 0;
			text-align: center;
			@include fs-lh(12)
		}
		.body{
			background-color: $color-white;
			padding: 15px 20px;
			min-height: 230px;
			@include fs-lh(15);
			.title{
				margin-bottom: 20px;
				.title-icon{
					display: inline-block;
					width: 30px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					border-radius: 50%;
					border: 1px solid #DADADA;
					svg{
						font-size: $fs-normal-x;
					}
				}
				.title-content{
					padding-left: 5px;
				}
			}
		}
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="message-detail">
		<scroller-base class="scroller" :data="message">
			<div>
				<div class="header">{{message.Date}}</div>
				<div class="body">
					<div class="title">
						<span class="title-icon">
							<svg class="icon" aria-hidden="true">
		                		<use xlink:href="#icon-youhuiquan"></use>
							</svg>
						</span>
						<span class="title-content">{{message.Title}}</span>
					</div>
					<div>{{message.Content}}</div>
				</div>
			</div>
		</scroller-base>
		<loading v-if='isLoading'></loading>
	</div>
</template>

<script>
	import { getMessageDetail } from 'api/lc';
	export default {
		name:'message-detail',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
            	isLoading: true,
            	message: {},
               	wxTitle:"消息详情"
            }
        },
        methods: {
        	_getMessageDetail(){
        		getMessageDetail().then(res => {
        			if (res.ErrorCode == 200) {
        				this.message = res.Data;
        				this.isLoading = false;
        			}
        		});
        	}
        },
        created() {
        	this._getMessageDetail();
        }
	}
</script>