<!-- 快速选择日期弹出层 -->
<style lang="scss" scoped>
	@import "src/plugin/scss/variable.scss";
	@import "src/plugin/scss/mixin.scss";
	
	.quickdate-actionsheet {
		@include position-absolute;
		font-size: $fs-normal-x;
		z-index: 9999990;
		.date-hd {
			@include flex-center;
			height: 50px;
			color: $color-9;
		}
		.date-item {
			padding: 12px 15px;
			color: $color-3;
			@include border-top;
			@include flex-between;
			&.active {
				color: $color-primary;
			}
		}
	}
</style>

<template>
	<action-sheet @close="close" v-show="opened" :data="opened" class="quickdate-actionsheet">
		<div slot="header" class="date-hd">日期快速选择</div>
		<div class="date-item" @click="select(item.id)" :class="{'active':item.id === quickDateIndex}" v-for="item in quickDateArr" :key="item.id">
			{{item.name}}
			<svg class="icon" aria-hidden="true" v-show="item.id === quickDateIndex">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
		</div>
	</action-sheet>
</template>

<script>
	import ActionSheet from 'src/plugin/components/action-sheet/action-sheet.vue';
	import {popupWindowRouteMixin} from 'src/plugin/app/mixin/mixin.js';
	

	let defaultOpt = {
		quickDateIndex: -1, //快速选择的下标
		quickDateArr: ['今天','昨天','本周','最近7天','最近30天','本月','上月']
	}

	export default {
		name: 'quickdate-actionsheet',
		mixins: [popupWindowRouteMixin],
		data() {
			return {
				opts: {},
				opened: false,
				_resolve: null,
				quickDateIndex: -1,
				quickDateArr: [],
				shortcuts: {
					'不限': { 
						id: -99,
						name: '不限'
					}, 
					'今天': {
						id: 0,
						name: '今天'
					}, 
					'昨天': {
						id: 1,
						name: '昨天'
					}, 
					'本周': {
						id: 2,
						name: '本周'
					}, 
					'最近7天': {
						id: 3,
						name: '最近7天'
					}, 
					'最近30天': {
						id: 4,
						name: '最近30天'
					}, 
					'本月': {
						id: 5,
						name: '本月'
					}, 
					'上月': {
						id: 6,
						name: '上月'
					}
				}
			}
		},
		methods: {
			show(options) {
				if(!(options === undefined || typeof options === 'object')) return
				this.opts = Object.assign({}, defaultOpt, options);
				this.quickDateIndex = this.opts.index;
				
				if(Array.isArray(this.opts.shortcuts)){
					this.quickDateArr = this.opts.shortcuts.map(item=>this.shortcuts[item])
				}

				this.opened = true;
				return new Promise(resolve => {
					this._resolve = resolve;
				})
			},
			select(index) {
				this.close();
				if(index!=-99){
					this._resolve(Object.assign({}, {
						index: index
					}, app.tool.getDatesByIndex(index, app.localTimeToServer)));
				}else {
					this._resolve({
						index: index,
						edate: "",
						sdate: ""
					});
				}
				
			}
		},
		components: {
			ActionSheet
		}
	}
</script>