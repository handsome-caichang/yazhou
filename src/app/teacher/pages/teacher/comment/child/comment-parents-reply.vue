<!--查看家长回复-->
<style scoped lang="scss">
	
	
	.comment-parents-reply {
		background-color: $color-assist-1;
		.card {
			background-color: $color-white;
			.card-content {
				padding: 12px;
				color: $color-6;
				padding-right: 26px;
				position: relative;
				max-height: 80px;
                margin-bottom: 10px;
				.date {
					font-size: 12px;
					color: $color-9;
					margin-bottom: 4px;
				}
				.evaluation,
				.star {
					margin-bottom: 4px;
					font-size: 13px;
					@include ellipsis-single;
				}
				.arrow {
					position: absolute;
					right: 12px;
					top: 40%;
				}
			}

		}
		.scroller {
			@include position-absolute(0, 0, 0, 0);
			overflow: hidden;
		}
		.noData-temp {
			@include position-absolute;
		}
	}
	
	// 动画
	.as-reply-enter-active,
	.as-reply-leave-active {
		transition: all $duration $timing;
		transform: translate3d(0, 0, 0);
	}
	
	.as-reply-enter,
	.as-reply-leave-active {
		transition: all $duration $timing;
		transform: translate3d(100%, 0, 0);
	}
</style>

<template>
	<transition name="as-reply">
		<div class="comment-parents-reply" v-show="opened" @close="close">
			<scroller-base :data="renderData" class="scroller">
				<div class="card" v-for="(item,index) in replylist" @click="showReplyDetails(index)">
					<div class="card-content">
						<div>
							<div class="date">{{item.CreateTime.replace(/-/g,'.')}}</div>
							<div class="evaluation">{{item.Content}}</div>
							<div class="star">{{item.StrStar}}</div>
						</div>
						<div class="arrow">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-youjiantou"></use>
							</svg>
						</div>
					</div>
				</div>
				
				<empty-page class="noData-temp" v-if="replylist.length == 0" :type="1001"></empty-page>
			</scroller-base>
            <CommentReplyDetails
                    :detailIndex="index"
                    :opened.sync="openReviewDetail"
                    :detailList="detailList">
            </CommentReplyDetails>
            <loading v-show="isLoading"></loading>
        </div>
    </transition>
</template>

<script>
    
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';
    import CommentReplyDetails from './child/comment-reply-details';
    export default {
        name: "comment-parents-reply",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            replylist: {
                type: Array,
                default: false
            }
        },
        data() {
            return {
                openReviewDetail:false,
                isLoading:true,
                index:0,//用来传递下一级
                detailList:[]//用来传递下一级
            }
        },
        computed: {
            renderData() {
                return {
                    replylist: this.replylist
                }
            }
        },
        methods: {
            showReplyDetails(index) {
                this.openReviewDetail =!this.openReviewDetail;
                this.detailList = this.replylist;
                this.index = parseInt(index);
            },
            handleEmit(){
                app.tool.setDocTitle('回复列表');
            }
        },
        created() {
        },
        mounted() {
            app.eventDefine.on('commentSetTitle', this.handleEmit);
        },
        beforeDestroy() {
            app.eventDefine.off('commentSetTitle', this.handleEmit);
        },
        components: {
            CommentReplyDetails,
            EmptyPage
        },
        watch:{
            opened(newVal,oldVal){
                if(newVal){
                    setTimeout(()=>{
                        this.isLoading = false;
                    },301)
                }
            }
        }
    }
</script>
