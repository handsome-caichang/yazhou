<!-- 名师详情页 -->
<style lang="scss" scoped>
	.teacher-detail {
		background-color: $color-assist-1;
		.header {
			height: 170px;
			background-color: $color-white;
			@include flex-center(column);
			.teacher-img {
				@include background-img;
				width: 70px;
				height: 70px;
				border-radius: 70px;
				border: 1px solid $color-border;
				background-color: $color-assist-1;
				margin-bottom: 15px;
			}
			.name {
				color: $color-3;
				font-size: $fs-big;
				line-height: $fs-big-s + 10;
			}
			.subject {
				color: $color-6;
				font-size: $fs-normal-x;
				line-height: $fs-normal-x + 10;
				padding: 0 10px;
				@include ellipsis-multi;
			}
		}
		.rich-text-area {
			background-color: $color-white;
		}
		.void {
		    height: $void;
		    background-color: $color-assist-1;
		}
		.section-row {
			background-color: $color-assist-1;
			padding-bottom: 12px;
			.title {
				height: $h-2;
				font-size: $fs-normal-x;
				color: $color-3;
				background-color: $color-assist-1;
				@include flex-center;
			}
			.section-list {
				padding: 0 $edge;
			}
		}
	}
</style>

<template>
	<scroller-base class="teacher-detail" :data="scrollerData" >
		<div v-if="teacherDetail.Title">
			<div class="header">
				<div class="teacher-img" :style="{'background-image': `url(${teacherDetail.Image})`}"></div>
				<div class="name">{{teacherDetail.Title}}</div>
				<div class="subject" v-if="teacherDetail.TitleSub">授课科目：{{teacherDetail.TitleSub}}</div>
			</div>
			
			<div v-if="teacherDetail.Content" class="rich-text-area">
				<div class="void"></div>
				<rich-text-area 
					:richText="teacherDetail.Content" 
					@imgLoaded="imgsNum += 1">
				</rich-text-area>
			</div>

			<div class="section-row" v-if="teacherDetail.Products.length">
				<!-- 楼层标题 -->
				<div class="title">
					<span>在售课程</span>
				</div>
				<!-- 楼层商品列表 -->
				<div class="section-list">
					<div class="section-item"
						v-for="(item, index) in teacherDetail.Products">
						<!-- 传入版块类型及单个商品对象 -->
						<shop-row :data="item"></shop-row>
						<div class="void" v-if="index !== teacherDetail.Products.length - 1"></div>
					</div>
				</div>
			</div>
		</div>
	</scroller-base>
</template>

<script>
	import ShopRow from 'common/shop-row/shop-row.vue'
	import RichTextArea from 'common/rich-text-area/rich-text-area.vue'
	import {getWebsiteModuleDetail} from 'api/jie.js'

	export default {
		name: 'teacher-detail',
		mixins: [app.mixin.shareMixin],
		data () {
			return {
				wxTitle: "名师详情",
				imgsNum: 0,
				teacherDetail: {}
			};
		},
		computed: {
			scrollerData() {
				return {
					data: this.teacherDetail,
					imgsNum: this.imgsNum
				}
			}
		},
		methods: {
		},
		created() {
		    getWebsiteModuleDetail({
		    	id: this.$route.params.id
		    }).then(res => {
		    	if (res.ErrorCode === app.errok) {
		    		this.teacherDetail = res.Data;

		    		this.v_shareResolve(function () {
		    		    return app.tool.mallShare({
					        title: `${this.wxTitle} - ${res.Data.Title}`,
					        desc: this.$store.state.config.Summary,
					        link: app.tool.parseToWXshareUrl(this.$route.fullPath),
					        imgUrl: this.$store.state.config.Logo
					    });
		    		})
		    	}
		    })
		},
		components: {
			ShopRow,
			RichTextArea
		}
	};
</script>

