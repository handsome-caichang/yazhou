<style lang="scss" scoped>
	.wrapper {
		.search {
			height: 44px;
			background-color: $color-white;
			@include flex-center;
			padding: 0 10px;
			.icon-wrapper {
				color: $color-3;
				font-size: 12px;
				width: 48px;
				height: 28px;
				line-height: 28px;
				margin-left: 10px;
				text-align: center;
			}
			.input {
				border: 1px solid $color-9;
				height: 28px;
				line-height: 28px;
				color: $color-9;
				background-color: $color-white;
				border-radius: 28px;
				font-size: 12px;
			}
		}
		.website-list {
			background-color: $color-assist-1;
			@include position-absolute(44px, 0, 0, 0);
			.empty-page {
				@include position-absolute;
			}
			.list-one {
				
			}
			.list-two {
				@include position-absolute(0, 0, 0, 0);
			}
		}
	}
</style>

<template>
	<!-- <scroller-load 
		class="website-list"
		:data="list"
		:pagingOption="pagingOption"
		@loadData="loadData">
		<component :is="component" v-if="list.length" :list="list"></component>
		<empty-page :type="12" v-if="list.length==0" class="empty-page"></empty-page>
	</scroller-load> -->
	<div class="wrapper">
		<div class="search" v-if="showSearch">
			
			<input type="text" 
				:placeholder="!searchFlag ? placeholderText : ''" 
				class="input" 
				ref="input" v-model="text">
			<div class="icon-wrapper" @click="search">
				搜索
			</div>
		</div>
		<scroller-load
			ref="scroll"
			class="website-list"
			:data="list"
			:pagingOption="pagingOption"
			@loadData="loadData">
			<component :is="component" v-if="list.length" :list="list"></component>
			<empty-page :type="12" v-if="list.length==0" class="empty-page"></empty-page>
		</scroller-load>
	</div>
</template>

<script>
	// 名师库列表
	import TeacherList from '../children/list-page/website-teacher-list.vue'
	// 其它列表
	import ContactList from '../children/list-page/website-contact-list.vue'
	// import ActivityList from '../children/list-page/website-activity-list.vue'
	import {getWebsiteModuleList} from 'api/jie.js'

	import EmptyPage from 'common/empty-page/empty-page'

	let comps = [TeacherList, ContactList];

	export default {
		name: 'website-list-page',
		mixins: [app.mixin.shareMixin],
		data () {
			return {
				wxTitle: this.$route.params.title,
				component: comps[this.$route.params.type],
				pagingOption: {
					api: getWebsiteModuleList,
					params: {
						ID: this.$route.params.id,
						keyWord: this.text
					},
				},
				list: [],
				text: '',
				placeholderText: "  搜索老师姓名、授课科目",
				searchFlag: false,
				swPromise: null,
				showSearch: true
			};
		},
		methods: {
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					if (res.ErrorCode === app.errok) {
						if (res.PageIndex === 1) {
							this.list = [];
						} 
						this.list = this.list.concat(res.Data);
					}
				})
			},
			search() {
				// let str1 = this.text.replace(/(^\s*)|(\s*$)/g, "")
				// if (!str1.length) return
				this.$refs.scroll.pagingRefresh({keyWord: this.text})
			}
		},
		watch: {
			// text(newval, oldval) {
			// 	this.searchFlag = true
			// 	let str1 = newval.replace(/(^\s*)|(\s*$)/g, "")
			// 	let str2 = oldval.replace(/(^\s*)|(\s*$)/g, "")
			// 	if (!str1.length || str1 === str2) {
			// 		return 
			// 	} else {
			// 		this.$refs.scroll.pagingRefresh({keyWord: str1})
			// 	}
			// }
		},
		created() {
			this.v_shareResolve(function () {
				return app.tool.mallShare({
			        title: this.wxTitle,
			        desc: this.$store.state.config.Summary,
			        link: app.tool.parseToWXshareUrl(this.$route.fullPath),
			        imgUrl: this.$store.state.config.Logo
			    });
			})
		},
		mounted() {
			if (parseInt(this.$route.params.type) === 0) {
				this.showSearch = true
			} else {
				this.showSearch = false
				this.$nextTick(() => {
					this.$refs.scroll.$el.style.top = 0
				})
			}
		},
		components: {
			EmptyPage
		}
	};
</script>

