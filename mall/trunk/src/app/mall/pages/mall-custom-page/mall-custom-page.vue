<!-- 商城所有富文本页面 -->
<style lang="scss" scoped>
	
	

	.mall-custom-page {
		@include position-absolute;
	}
</style>

<template>
	<scroller-base class="mall-custom-page" :data="scrollerData">
		<rich-text-area v-if="richText" :richText="richText" @imgLoaded="imgsNum += 1"></rich-text-area>
	</scroller-base>
</template>

<script>
	import RichTextArea from 'common/rich-text-area/rich-text-area.vue'
	import {getADByID, getBannerByID} from 'api/jie.js'

	export default {
		name: 'mall-custom-page',
		mixins: [app.mixin.shareMixin],
		data () {
			return {
				wxTitle: "活动详情",
				imgsNum: 0,
				richText: ""
			};
		},
		computed: {
			scrollerData() {
				return {
					richText: this.richText,
					imgsNum: this.imgsNum
				}
			}
		},
		created() {
			let type = this.$route.params.type, api;
			if (type === 'ad') {
				api = getADByID;
			} else if (type === 'banner') {
				api = getBannerByID;
			}
			api({
				ID: this.$route.params.id
			}).then(res => {
				if (res.ErrorCode === app.errok) {
					this.richText = res.Data.Content;
				}
			})
		},
		components: {
			RichTextArea
		},
	};
</script>

