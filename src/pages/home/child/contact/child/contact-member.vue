<!-- 通讯录联系人列表 -->
<style lang="scss" scoped>
	@import "../../../../../assets/scss/variable.scss";
	@import "../../../../../assets/scss/mixin.scss";
	
	.contact-member {
		position: relative;
		height: 100%;
		.search-bar {
			height: 44px;
			padding: 0 10px;
			@include flex-between;
			.search-box {
				flex: 1;
				display: flex;
				align-items: center;
				height: 28px;
				line-height: 28px;
				background-color: #FFF;
				border: 1px solid #e7e7e7;
				border-radius: 4px;
				overflow: hidden;
				.icon {
					margin-left: 12px;
				}
				.search {
					flex: 1;
					padding: 0 8px;
					height: 28px;
					line-height: 28px;
					border: 1px solid #FFF;
					-webkit-appearance: none;
					--webkit-user-select: text;
					-webkit-font-smoothing: antialiased;
					outline: none;
				}
			}
			.search-reset {
				padding-left: 10px;
				color: #1E88F5;
				font-size: 16px;
			}
		}
		.contact-member-scroller {
			@include position-absolute(44px,0,0,0);
			.list {
				background-color: #FFF;
				.item {
					display: block;
					position: relative;
					height: 50px;
					line-height: 50px;
					padding-left: 53px;
					padding-right: 15px;
					color: #333;
					font-size: 17px;
					@include border-bottom(#EDF1F7);
					@include ellipsis-single;
					.avatar {
						position: absolute;
						left: 10px;
						top: 6px;
						width: 38px;
						height: 38px;
						border-radius: 50%;
						border: 1px solid #FFF;
						background-color: #EEF1F6;
						background-repeat: no-repeat;
						background-attachment: scroll;
						background-position: center;
						background-size: 100% 100%;
					}
				}
			}			
		}
		// .loading {
		// 	@include position-absolute;
		// 	z-index: 2;
		// }
	}
</style>

<template>
	<div class="contact-member-box">
		<div class="contact-member">
			<div class="search-bar">
				<div class="search-box">
					<svg class="icon" aria-hidden="true">
					    <use xlink:href="#icon-sousuo"></use>
					</svg>
					<input class="search" type="" name="" placeholder="搜索" v-model="keyword">
				</div>
				<div class="search-reset" v-if="searchKeyword" @click="reset">取消</div>
			</div>

			<scroller-base
				:data="searchList"
				class="contact-member-scroller"
				>
				<div class="list">
					<div class="item"
						v-for="user in searchList"
						:key="user.UserID"
						@click="gotoChat(user)">
						<div class="avatar" :style="{backgroundImage: `url(${getUserAvatar(user)})`}"></div>
						{{user.NickName}}
					</div>
				</div>
			</scroller-base>

			<loading class="loading" :bgType="1" v-show="isloading"></loading>
		</div>
	</div>
</template>

<script>
import config from 'src/configs'
import {getAccID} from 'src/api/jie.js'

export default {
	name: 'contact-member',
	props: {
		list: Array
	},
	data () {
		return {
			// 搜索关健字
			keyword: "",
			// 是否显示遮罩
			isloading: false
		}
	},
	computed: {
		searchKeyword() {
			return this.keyword.trim().toLocaleLowerCase()
		},
		// 根据搜索关健字动态更新联系人列表
		searchList() {
			let kw = this.searchKeyword
			if (!kw) return this.list
			return this.list.filter(item => {
				return item.NickName.toLocaleLowerCase().indexOf(kw) > -1 || item.Pinyin.toLocaleLowerCase().indexOf(kw) > -1
			})
		}
	},
	methods: {
		// 获取用户头像
		getUserAvatar (user) {
			return user.Image || config.defaultUserIcon
		},
		reset() {
			this.keyword = ""
		},
		gotoChat(user) {
			new Promise(resolve => {
				if (user.AccID) {
					resolve(user.AccID)
				} else {
					this.isloading = true
					getAccID({userID: user.UserID})
						.then(res => {
							resolve(res.Data.AccID)
							this.isloading = false
						})
				}
			}).then(accID  => {
				let curl = `/chat/p2p/${accID}/${encodeURIComponent(user.NickName)}`
				this.$router.push(curl)
			})
		}
	},
	created() {
		
	},
	watch: {
	}
}
</script>

