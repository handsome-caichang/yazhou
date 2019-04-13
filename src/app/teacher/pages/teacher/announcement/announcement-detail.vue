<style lang="scss" scoped>
	
	
	.scroller {
		@include position-absolute;
		overflow: hidden;
		background-color: #ffffff;
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
					<rich-text-area :richText="content" @imgLoaded="imgState++"></rich-text-area>
				</div>
			</div>
			<loading class="loading" v-show="isLoading"></loading>
		</scroller-base>
	</div>
</template>

<script>
    import { processGet } from "teacher/api/common";
    import RichTextArea from 'teacher/components/common/rich-text-area/rich-text-area.vue';
	
	export default {
        name: "announcement-detail",
        mixins: [app.mixin.shareMixin],
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
				processGet(this.params).then(res => {
					if(res.errcode == 200) {
						this.title = res.data.title;
						this.date = res.data.date;
						this.content = app.tool.richTextToHtml(app.dom.parseDom(res.data.content));
                        this.isLoading = false;
                        app.eventDefine.emit('refresh-announcement-list',res.data.id);
                        this.handlerDetail(this.$router.currentRoute.params.id,this.title);
					}
				});
			},
            handlerDetail(id,t){
                // 参数 id:公告ID
                this.v_shareResolve({
                    title:'学校公告',
                    desc:t,
                    link:`${location.protocol}//${location.host}/weixin/teacher/static/share/announcement/announcementShare.html?id=${id}`,
                    imgUrl: location.protocol + "//" + location.host + '/weixin/teacher/static/share/imgs/share.png'
                })
            }
		},

	};
</script>