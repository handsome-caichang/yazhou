<template>
	<div class="ecahrts"></div>
</template>

<script>
	import Echart from "./js/index";
	
	export default {
		name: "Echarts",
		props: {
			setOption: Object
		},
		data() {
			return {
				msg: "Welcome to Your Echarts",
				echart: null
			}
		},
		methods: {
			// 初始化echarts
			__init() {
				Echart.init(this.$el, this.setOption);
			},
			_setOption() {
				Echart.setOption(this.setOption);
				this._emit();
			},
			// 销毁实例
			_dispose() {
				Echart.dispose();
			},
			// 抛出绑定
			_emit() {
				Echart.emit(this);
			}
		},
		mounted() {
			this.__init();
		},
		watch: {
			setOption: {
				deep: true,
				handler(curVal, oldVal) {
					this._setOption(curVal);
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	.ecahrts {
		width: 100%;
		height: 100%;
	}
</style>