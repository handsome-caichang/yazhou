<!-- 选择日期组件 -->
<style lang="scss" scoped>
	@import 'src/plugin/scss/mixin.scss';
	@import 'src/plugin/scss/variable.scss';
	.date-bar {
		display: flex;
		line-height: 26px;
		.date-btn {
			width: 90px;
            @media (min-width: 320px) {
                width: 80px;
            }
			font-size: 12px;
			text-align: center;
			border-radius: 50px;
			border: 1px solid $color-assist-1;
		}
		.qiuck-date-btn {
			margin-left: 4px;
			width: 44px;
            @media (min-width: 320px) {
                width: 35px;
            }
			text-align: center;
			border-radius: 50px;
			border: 1px solid $color-assist-1;
		}
	}
</style>

<template>
	<div class="date-bar">
		<div class="date-btn" @click="selectDate('sdate')">{{sdate?sdate:'开始日期'}}</div>
		<div>&nbsp;-&nbsp;</div>
		<div class="date-btn" @click="selectDate('edate')">{{edate?edate:'结束日期'}}</div>
		<div class="qiuck-date-btn" @click="quickSelectDate">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-sanjiaoxing"></use>
			</svg>
		</div>
	</div>
</template>

<script>
	/*
	 *	选择日期组件
	 *	@param sdate 开始日期
	 *	@param edate 结束日期
	 *	@param index 快速选择日期的下标
	 * */
	export default {
		name: 'date-bar',
		props: {
			sdate: { //开始日期
				type: String,
				default: ''
			},
			edate: { //结束日期
				type: String,
				default: ''
			},
			index: { //快速选择日期的下标
				type: Number,
				default: -1
			},
			shortcuts: { //快速选择日期的数组
				type: Array,
				default:()=>{
                    return ['今天','昨天','本周','最近7天','最近30天','本月','上月']
                }
			}
		},
		methods: {
			selectDate(type) { //选择日期
				app.calendar({
					value: type == 'sdate' ? this.sdate : this.edate
				}).then(res => {
					let obj = {
						sdate: this.sdate,
						edate: this.edate,
						index: this.index
					};

					if(type == 'sdate') {
						obj.sdate = res;
					} else {
						obj.edate = res;
					}

					this.$emit('changeDate', obj);
				});
			},
			quickSelectDate() { //快速选择
				app.quickDate({
					index: this.index,
					shortcuts: this.shortcuts
				}).then(res => {
					this.$emit('changeDate', res);
				})
			}
		}
	}
</script>