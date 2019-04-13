<style scoped lang="scss">
	@import "../../../assets/scss/variable.scss";
	@import "../../../assets/scss/mixin.scss";

	.item-filter {
		position: absolute;
		top: 0;
		right: 0;
		width: 40px;
		height: 40px;
		display: flex;
		background-color: red;
		background: rgba(255, 255, 255, 0.5);
		box-shadow: 0 2px 4px 0 rgba(30, 136, 245, .2);
		border-radius: 40px 0px 0px 40px;
		transition: all $duration $timing; 
		z-index: 2; 
		&.unfold {
			width: 100%;
			padding-left: 16px;
			background: rgba(255, 255, 255,0.9);
		}
		.filter-list {
			flex: 1;
			overflow-y: hidden;
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 40px;
			.old-history {
				display: block;
				height: 27px;
				line-height: 27px;
				font-size: 14px;
				color: #999;
			}
			.list-content {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.cus-msg {
					text-align: center;
					padding: 0 11px;
					height: 27px;
					line-height: 27px;
					border: 1px solid #1E88F5;
					margin-left: 8px;
					color: #1E88F5;
					font-size: 15px;
					border-radius: 4px;
				}
				.cus-msg:first-child {
					margin-left: 0;
				}
			}
		}
		.toggle-btn {
			width: 40px;
			height: 40px;
			@include flex-center;
		}
	}
	
</style>

<template>
	<div class="item-filter" :class="{unfold: unfoldPackageFilter}">
		<div class="filter-list" v-if="unfoldPackageFilter">
			<!-- <a class="old-history" :href="oldHistoryUrl">
				<svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-lishixiaoxi"></use>
				</svg>
				历史消息
			</a> -->
			<div class="old-history"></div>

			<div class="list-content">
				<span class="cus-msg" v-for="item in cusList" @click="chooseCustom(item.CustomType)">
					{{item.text}}
				</span>
			</div>
		</div>
		<div class="toggle-btn" @click="togglePackageFilter">
			<svg class="icon" aria-hidden="true">
			    <use :xlink:href="unfoldPackageFilter ? '#icon-youhua' :  '#icon-zuohua'"></use>
			</svg>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			from: String,
			to: String
		},
		data() {
			return {
				unfoldPackageFilter: false,
				isSelect: true,
				cusList: [
                    {
                       	text: '作业',
                       	CustomType: 3
                    },{
                       	text: '通知',
                       	CustomType: 4
                    },{
                       	text: '评价',
                       	CustomType: 2
                    }
                ]
			}
		},
		computed: {
			// 拼装去老版消息界面的url
			/*oldHistoryUrl() {
				let state = this.$store.state,
					isTeacher = state.userWone.TeacherRole,
					teacherRole = state.userWone.TeacherRole,
					teacherUrl = state.teacherUrl,
					parentUrl = state.parentUrl,
					paramArr = ['pname=toTeacher_detail', 'type=-1'],
					paramStr = '';

				if (isTeacher) {
					paramArr.push(`studentId=${this.to}`)
					paramArr.push(`teacherRole=${teacherRole}`)
				} else {
					paramArr.push(`teacherId=${this.to}`)
				}

				paramStr = encodeURIComponent(paramArr.join('&'))

				return`${isTeacher ? teacherUrl : parentUrl}${paramStr}`
			}*/
		},
		methods: {
			togglePackageFilter() {
				this.unfoldPackageFilter = !this.unfoldPackageFilter;
			},
			chooseCustom(index) {
				this.unfoldPackageFilter = false

				this.$router.push({
					name: 'customMsg', 
					params: {
						FromAccID: this.from, 
						ToAccID:this.to, 
						CustomType: index
					}
				})
			},
		}
	}
</script>