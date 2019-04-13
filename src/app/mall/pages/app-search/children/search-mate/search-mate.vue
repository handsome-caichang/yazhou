<!-- 跟据搜索关健字匹配搜索项提示 -->
<style lang="scss" scoped>
	.search-mate {
		@include position-absolute;
		.mate-list {
			padding: 0 $edge;
			.mate-item {
				height: $h-2;
				line-height: $h-2;
				font-size: $fs-normal-x;
				color: $color-9;
				@include border-bottom;
				@include ellipsis-single;
			}
		}
	}

</style>

<template>
	<scroller-base class="search-mate" :data="suggestionWordList">	
		<ul class="mate-list">
			<li class="mate-item" 
				v-for="(item, index) in suggestionWordList"
				:key="index"
				:to="'/home/searchList/' + item.Keyword"
				@click="emitEvent(item.Keyword)" >
				{{item.Keyword}}
			</li>
		</ul>
	</scroller-base>
</template>

<script>
	//  
	import {getsuggestionword} from 'api/jie.js'

	export default {
  		name: 'search-mate',
  		props: {
  			word: {
  				type: String,
  				default: ""
  			}
  		},
	  	data () {
	    	return {
	    		suggestionWordList: [],
	    		swPromise: null
	    	};
	  	},
	  	computed: {
	  		// ...Vuex.mapState(['curCampus'])
	  	},
	  	methods: {
	  		update() {
	  			// 如果上次更新请求没有完成，则取消上次请求
	  			this.swPromise && this.swPromise.cancel('取消上次请求...');
	  			this.swPromise = getsuggestionword({
		  				Keyword: this.word,
		  				// CampusID: this.curCampus.id
		  			});
	  			this.swPromise.then(res => {
	  				this.suggestionWordList = res.Data;
	  			})
	  		},
	  		emitEvent(word) {
  		        this.$emit('search', word);
	  		},
	  	},
	  	created() {
	  		this.update();
	  	},
	  	watch: {
	  		word(newVal, oldVal) {
	  			if (newVal !== oldVal) {
	  				this.update();
	  			}
	  		}
	  	}
	};
</script>
