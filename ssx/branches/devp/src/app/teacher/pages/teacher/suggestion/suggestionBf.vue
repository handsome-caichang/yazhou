<style scoped lang="scss">
	
    
	.scroll {
		@include position-absolute(0,0,0,0);
		background-color: $color-assist-1;
		.item {
			padding: 15px;
			background-color: $color-white;
			border-bottom: 1px solid $color-assist-1;
			.item-top {
				display: flex;
				.avatar {
					width: 40px;
					height: 40px;
					background-color: $color-assist-1;
					margin-right: 12px;
					border-radius: 50%;
					background-repeat: no-repeat;
					background-attachment: scroll;
					background-position: center;
					background-size: 100% 100%;
				}
				.text {
					flex: 1;
					.name {
						font-size: 16px;
						color: $color-3;
					}
					.time {
						font-size: 12px;
						color: $color-9;
					}

				}

			}
			.content {
				margin-top: 10px;
				font-size: 15px;
				color: $color-3;
				line-height: 24px;
				max-height: 100px;
				overflow: hidden;
			}
			.slide-down {
				text-align: right;
				color: $color-primary;
			}
			.img-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				.img {
					width: 33.3%;
					height: 108px;
					// width: 108px;
					padding-right: 10px;
					margin-top: 10px;
					.img-content {
						background-color: #f00;
						height: 100%;
					}
				}
			}
		}
	}
</style>

<template>
	<scroller-load 
		class="scroll"
		:data="list"
		@loadData="renderData"
		:pagingOption="pagingOption">
		<div class="item" v-for="(item, index) in list" :key="index">
			<router-link tag="div" :to="`/suggestionDetail/${item.ID}`">
				<div class="item-top" >
					<div class="avatar" :style="{backgroundImage: `url(${item.Photo})`}"></div>
					<div class="text">
						<div class="name">{{item.Name}}</div>
						<div class="time">{{item.CreateTime}}</div>
					</div>
				</div>
				<div class="content" ref="content" v-html="item.Content"></div>
			</router-link>
			<div class="slide-down" v-if="showArr[index]" @click="slide(index, 'down')">展开</div>
			<div class="slide-down" v-if="showArr[index]==false" @click="slide(index, 'up')">收起</div>
			<div class="img-wrapper" v-if="false">
				<div class="img" v-for="i in 3">
					<div class="img-content"></div>
				</div>
			</div>
		</div>
	</scroller-load>
</template>

<script>
	import {getSuggestionList} from 'teacher/api/suggestion'
	export default { 
		data() {
			return {
				showArr:[],
				list: [],
				pagingOption: {
					api: getSuggestionList,
					params: {

					}
				}
			}
		},
		computed: {
		},
		methods: {
			renderData(ajaxPromise) {
				ajaxPromise.then(res => {
					if (res.ErrorCode === app.errok) {
						if (res.PageIndex === 0) {
							this.list = []
						}
						this.list = this.list.concat(res.Data)
					}
				})
			},
			slide(index, direction) {
				if (direction == 'up') {
					this.$refs.content[index].style.maxHeight = '100px'
					this.showArr.splice(index, 1, true)
				} else {
					this.$refs.content[index].style.maxHeight = '10000px'
					this.showArr.splice(index, 1, false)
				}
			}
		},
		mounted() {
			// console.log(this.$refs);
			window.a = this
			this.list.forEach((item, index) => {
				if (this.$refs.content[index].clientHeight === 100) {
					this.showArr.splice(index, 1, true)
				}
			})
		}
	}
</script>