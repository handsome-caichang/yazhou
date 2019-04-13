<!-- 基于vux封装的日历插件 -->
<style lang="scss">
	@import "src/plugin/scss/variable.scss";
	@import "src/plugin/scss/mixin.scss";
	.calendar-actionsheet {
		@include position-absolute;
		z-index: 9999990;
	}
	
	.inline-calendar td.current>span.vux-calendar-each-date {
		background-color: $color-primary !important;
	}
	
	.vux-prev-icon,
	.vux-next-icon {
		border: 1px solid $color-primary !important;
		border-top: none !important;
		border-right: none !important;
	}
	
	.inline-calendar td.is-today,
	.inline-calendar td.is-today.is-disabled {
		color: $color-primary !important;
	}
</style>

<template>
	<action-sheet class="calendar-actionsheet" v-show="opened" @close="close">
		<inline-calendar ref="cal" v-model="value" @click.native="click" @on-change="change"></inline-calendar>
	</action-sheet>
</template>

<script>
	import { InlineCalendar } from 'vux';
	import {popupWindowRouteMixin} from 'src/plugin/app/mixin/mixin.js';
	import ActionSheet from 'src/plugin/components/action-sheet/action-sheet.vue';

	let defaultOpt = { //接收参数
		value: '', //当前选中日期，使用v-model绑定
		autoClosed: true //是否自动关闭弹窗
	}

	export default {
		name: 'calendar-actionsheet',
		mixins: [popupWindowRouteMixin],
		data() {
			return {
				value: '',
				opts: {},
				opened: false,
				autoClosed: true,
				_resolve: null
			}
		},
		methods: {
			click() {
				this.flag = true;
			},
			change(val) { //值变化时触发
				if(!this.flag) return
				this.opts.autoClosed && this.close();
				this._resolve(val);
			},
			show(options) { //弹出日历组件
				if(!(options === undefined || typeof options === 'object')) return

				this.opts = Object.assign({}, defaultOpt, options);

				this.value = this.opts.value;
				this.autoClosed = this.opts.autoClosed;

				this.flag = false;
				this.opened = true;
				return new Promise((resolve) => {
					this._resolve = resolve
				});
			}
		},
		components: {
			ActionSheet,
			InlineCalendar
		}
	}
</script>