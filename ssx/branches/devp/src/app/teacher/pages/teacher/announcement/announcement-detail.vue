<style lang="scss" scoped>
	
	
	.scroller {
		@include position-absolute;
		overflow: hidden;
		.detail-container {
			padding: 0 15px;
			.top {
				display: flex;
				flex-direction: column;
				@include border-bottom;
				height: 80px;
				.title {
					@include ellipsis-single;
					font-size: 18px;
					color: rgba(51, 51, 51, 1);
					height: 45px;
					line-height: 50px;
				}
				.date {
					font-size: 15px;
					color: rgba(153, 153, 153, 1);
					height: 30px;
				}
			}
			.bottom-content {
				padding-top: 20px;
				padding-bottom: 20px;
				font-size: 15px;
				color: rgba(102, 102, 102, 1);
				word-wrap: break-word;
			}
		}
	}
</style>

<template>
	<div v-if="content!=''">
		<scroller-base class="scroller" :data="contentHtml">
			<div class="detail-container">
				<div class="top">
					<span class="title">{{ title }}</span>
					<span class="date">{{ date}}</span>
				</div>
				<div class="bottom-content">
					<rich-text-area v-if="content" :richText="content" @imgLoaded="imgState++"></rich-text-area>
				</div>
			</div>
			<loading class="loading" v-show="isLoading"></loading>
		</scroller-base>
	</div>
</template>

<script>
    import { getnotice } from "teacher/api/announcement";
    import RichTextArea from 'teacher/components/common/rich-text-area/rich-text-area.vue';
	
	export default {
        name: "announcement-detail",
        components: {
            RichTextArea
        },
		data() {
			return {
                wxTitle: "公告详情",
				title: "",
				content: "",
				date: "",
				params: {
					pname: 'publicInfo_detail',
					id: this.$router.currentRoute.params.id
                },
				isLoading: true,
                imgState: 0
			};
        },
        computed: {
            contentHtml() {
                return {
                    content: this.content,
                    imgState: this.imgState
                }
            }
        },
		created() {
			this.getDetail();
		},
		methods: {
			getDetail() {
				getnotice(this.params).then(res => {
					if(res.result.code == 200) {
						this.title = res.data.title;
						this.date = res.data.date;
						this.content = app.tool.richTextToHtml(res.data.content);
						this.isLoading = false;
					}
				});
			}
		},
		beforeDestroy() {
			// 移除小红点
			app.eventDefine.emit('refresh');
		}
	};
</script>