<!-- 历史搜索 热门推荐 -->
<style lang="scss" scoped>
	.history-hot {
		@include position-absolute;
		
		.history-title,
		.hot-title {
			height: $h-2;
			line-height: $h-2;
			padding: 0 $edge;
			font-size: $fs-normal-x;
			color: $color-3;
			font-weight: 500;
			@include flex-between;
			.icon {
				padding: $edge;
				margin-right: -$edge;
			}
		}
		.keywordlist {
			padding: 10px $edge/2 20px;
			display: flex;
			flex-wrap: wrap;
			.item {
				max-width: 100%;
				height: 30px;
				line-height: 30px;
				margin: $edge/2;
				padding: 0 17px;
				background-color: $color-assist-3;
				border-radius: 30px;
				@include ellipsis-single;
			}
		}
	}

</style>

<template>
	<scroller-base class="history-hot" :data="scrollData">	
		<div v-if="historyList.length > 0">
			<div class="history-title">
				<span>历史搜索</span>
				<svg class="icon search-icon" aria-hidden="true" @click="clearSearchHistory">
					<use xlink:href="#icon-shanchu1"></use>
				</svg>
			</div>
			<ul class="keywordlist">
				<li class="item" 
					v-for="(keyword, index) in historyList"
					:key="index"
					@click="emitEvent(keyword)"
				>
					{{keyword}}
				</li>
			</ul>
		</div>

		<div v-if="hotList.length > 0">
			<div class="hot-title">热门搜索</div>
			<ul class="keywordlist">
				<li class="item" 
					v-for="(keyword, index) in hotList"
					:key="index"
					@click="emitEvent(keyword)"
				>
					{{keyword}}
				</li>
			</ul>
		</div>
	</scroller-base>
</template>

<script>
	import {gethistoryhotkewordlist, clearHistoryKeywordList} from 'api/jie.js'

	export default {
  		name: 'history-hot',
	  	data () {
	    	return {
	    		// 历史搜索词
	    		historyList: [],
	    		// 热门搜索词
	    		hotList: []
	    	};
	  	},
	  	computed: {
	  		scrollData() {
	  			return {
	  				historyList: this.historyList,
	  				hotList: this.hotList
	  			}
	  		}
	  	},
	  	methods: {
	  		clearSearchHistory() {
	  			app.confirm('确定清空历史搜索吗？').then(res => {
	  				if (res === true) {
	  					this.historyList = [];
	  					// 发送清空搜索历史记录请求
	  					clearHistoryKeywordList();
	  				}
	  			})
	  		},
	  		emitEvent(word) {
  		        this.$emit('search', word);
	  		},
	  	},
	  	created() {
	  		// 请求后端数据，获取热门搜索词和历史搜索词
	  		gethistoryhotkewordlist().then(res => {
	  			this.historyList = res.Data.HistoryKeyword;
	  			this.hotList = res.Data.HotKeyword;
	  		})
	  	}
	};
</script>

