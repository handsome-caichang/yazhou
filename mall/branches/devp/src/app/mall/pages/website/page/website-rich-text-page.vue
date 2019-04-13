<!-- 微官网所有富文本页面 -->
<style lang="scss" scoped>
	.website-rich-text-page {
		@include position-absolute;
		.website-rich-text-page-header {
			padding-top: 10px;
			padding-left: $edge;
			padding-right: $edge;
			.title {
				font-size: 20px;
				line-height: 2em;
				color: $color-3;
			}
			.date {
				margin-left: 20px;
				color:$color-9;
			}
		}
	}
</style>

<template>
	<scroller-base class="website-rich-text-page" :data="scrollerData">
		<div class="website-rich-text-page-header">
			<div class="title">{{richData.Title}}</div>
			<span class="date" v-if="richData.CreateTime">{{richData.CreateTime | formatDatetime('yyyy-MM-dd hh:mm')}}</span>
		</div>
		<rich-text-area v-if="richData.Content" :richText="richData.Content" @imgLoaded="imgsNum += 1"></rich-text-area>
	</scroller-base>
</template>

<script>
	import RichTextArea from 'common/rich-text-area/rich-text-area.vue'
	import {getWebsiteModuleDetail, getWebsiteNoticeDetail} from 'api/jie.js'

	export default {
		name: 'website-rich-text-page',
		mixins: [app.mixin.shareMixin],
		data () {
			return {
				wxTitle: this.$route.params.title,
				imgsNum: 0,
				richData: "",
			};
		},
		computed: {
			scrollerData() {
				return {
					richData: this.richData,
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
		    		this.richData = res.Data;

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
		mounted() {
			// 如果返回的富文本内容为空，则....
			// if ((!$(".details_wrap").text().trim()) && imgs.length == 0) {
			// 	$(".details_wrap").append("<div class='noData'><img src='@Url.Content("~/Areas/Weiweb/Content/imgs/noData.png ")'><div class='noData-tips'>暂无数据</div><div>");
			// }
		},
		components: {
			RichTextArea
		},
	};
</script>

