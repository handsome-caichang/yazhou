<style lang="scss" scoped>
	.app-search {
		@include position-absolute;
		background-color: $color-white;
		.app-search-header {
			.search-bar {
				height: $h-2;
				padding-left: $edge-x;
				@include flex-between;
				.search-bar-input {
					flex: 1;
					height: $h-6;
					line-height: $h-6;
					padding: 0 17px;
					border-radius: $h-6;
					border: 1px solid $color-primary;
					color: $color-3;
				}
				.search-bar-icon {
					padding: 0 $edge-x;
					height: 100%;
					@include flex-center;
					.icon {
						color: $color-primary;
						font-size: 20px;
					}
				}
			}
			.void {
			    height: $void;
			    background-color: $color-assist-1;
			}
		}
		.app-search-body {
			@include position-absolute($h-2 + $void);
		}
	}
</style>

<template>
	<div class="app-search">
		<div class="app-search-header">
			<div class="search-bar">
				<input class="search-bar-input" v-model="searchText">
				<div class="search-bar-icon" @click="gotoSearchList(searchWord)">
					<svg class="icon heard-icon" aria-hidden="true">
					    <use xlink:href="#icon-sousuoicon"></use>
					</svg>
				</div>				
			</div>
			<div class="void"></div>
		</div>

		<!-- 内容主体部分，可滚动 -->
		<div class="app-search-body">
			<component :is="curComponent" :word="searchWord" @search="gotoSearchList"></component>
		</div>
	</div>
</template>

<script>
	 
	import HistoryHot from './children/history-hot/history-hot.vue'
	import SearchMate from './children/search-mate/search-mate.vue'

	export default {
		name: 'app-search',
		mixins: [app.mixin.shareMixin],
		data () {
			return {
				wxTitle: "搜索",
				// 搜索关键字
				searchText: "",
				prevPath: "",
			}
		},
		computed: {
			// 处理后的搜索关键字
			searchWord() {
				return app.tool.trim(this.searchText);
			},
			// 当前应该展示'历史搜索'还是'搜索关健字匹配'组件
			curComponent() {
				return this.searchWord === "" ? HistoryHot : SearchMate;
			}
		},
		methods: {
			gotoSearchList(word) {
				if (word) {
					this.$router.push(`/searchList/-1/${encodeURIComponent(word)}/${encodeURIComponent(word)}?showHeard=true`);
				}
			}
		},
	};
</script>

