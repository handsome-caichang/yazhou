<!--修改上课进度子组件-->
<style scoped lang="scss">
	
	
	$padding:15px;
	.schedule-container {
		@include position-absolute;
		z-index: 9999991;
		color: $color-3;
		background: $color-white;
		.schedule-item {
			height: 42px;
			padding: 0 $padding;
			font-size: 15px;
			border-bottom: 1px solid #e6e4e4;
			@include flex-between;
			.icon {
				font-size: 16px;
			}
			.schedule-item-chapter {
				@include flex-between;
				@include ellipsis-single;
				width: 80%;
				display: inline-block;
				.schedule-item-content {
					padding-left: 20px;
				}
			}
		}
	}
</style>

<template>
	<action-sheet 
		class="schedule-container" 
		v-show="opened" 
		:position="'sideRight'" 
		:fullParent="true" 
		ref="actionsheet" 
		@close="close" 
		:data="schedule">
		<div v-for="(item,index) in schedule" class="schedule-item" @click="selectChapter(index)">
			<div class="schedule-item-chapter">
				<span>{{item.Title}}</span>
				<span class="schedule-item-content">{{item.Content}}</span>
			</div>

			<div class="schedule-item-raido">
				<svg class="icon" aria-hidden="true">
					<use :xlink:href="index==selectIndex?'#icon-danxuan':'#icon-danxuan-weixuanze'"></use>
				</svg>
			</div>
		</div>
	</action-sheet>
</template>

<script>
	export default {
		name: "course-content",
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			schedule: {
				type: Array,
				default: [],
			},
			opened: false,
			selectIndex: 0,
		},
		methods: {
			selectChapter(index) {
				this.$emit('selectChapter', index);
				this.close();
			},
			refresh() {
				this.$refs.actionsheet.refresh();
			}
		}
	}
</script>