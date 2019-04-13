<!-- 通讯录班级列表 -->
<style lang="scss" scoped>
	@import "../../../../../assets/scss/variable.scss";
	@import "../../../../../assets/scss/mixin.scss";

	.contact-class {
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
		.contact-class-scroller {
			@include position-absolute(44px,0,0,0);
			.result {
				background-color: #FFF;
				.sort {
					height: 28px;
					line-height: 28px;
					padding: 0 15px;
					color: #999;
					@include border-bottom(#EDF1F7);
				}
				.separate {
					height: 9px;
					background-color: #EDF1F7;
				}
				.class-list {
					.item-box {
						display: block;
						padding: 0 15px;
						@include border-bottom(#EDF1F7);
						.item {
							position: relative;
							height: 50px;
							line-height: 50px;
							padding-right: 70px;
							.content-box {
								width: 100%;
								height: 100%;
								position: relative;
								.wrap {
									position: absolute;
									max-width: 100%;
									.name {
										font-size: 17px;
										color: #333;
										@include ellipsis-single;
									}
									.number {
										position: absolute;
										top: 0;
										left: 100%;
										padding-left: 8px;
										color: #999;
									}
								}						
							}				
							.icon {
								position: absolute;
								right: 0;
								top: 50%;
								transform: translate(0, -50%);
							}
						}
					}
				}
				.member-list {
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
			//     @include position-absolute;
			//     // z-index: 1000;
			// }		
		}
	}
</style>

<template>
	<div>
		<div class="contact-class">
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
				:data="scrollData"
				class="contact-class-scroller"
				>
				<div class="result">
					<div class="sort" v-show="searchClassList.length > 0 && searchKeyword">班级</div>
					<div class="class-list">
						<router-link class="item-box"
							v-for="item in searchClassList"
							:key="item.ClassID"
							:to="`/contactClassMember/${item.ClassID}/${encodeURIComponent(item.ClassName)}`">
							<div class="item">
								<div class="content-box">
									<div class="wrap">
										<div class="name">
											{{item.ClassName}}
										</div>
										<div class="number">({{item.MemberCount}})</div>
									</div>							
								</div>						
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-xiayibu"></use>
								</svg>
							</div>					
						</router-link>
					</div>
					
					<div class="separate"></div>
					
					<div class="sort" v-show="searchMemberList.length > 0  && searchKeyword">联系人</div>
					<div class="member-list" v-show="searchKeyword">
						<div class="item"
							v-for="user in searchMemberList"
							:key="user.UserID"
							@click="gotoChat(user)">
							<div class="avatar" :style="{backgroundImage: `url(${getUserAvatar(user)})`}"></div>
							{{user.NickName}}
						</div>
					</div>
				</div>

				<loading class="loading" :bgType="1" v-show="loading"/>
			</scroller-base>
		</div>
	</div>	
</template>

<script>
import config from 'src/configs'
import {getStudents, getAccID} from 'src/api/jie.js'

export default {
	name: 'contact-class',
	props: {
		list: Array
	},
	data () {
		return {
			// 搜索关健字
			keyword: "",
			searchMemberList: [],
			loading: false,
			smAjax: null,
		}
	},
	computed: {
		searchKeyword() {
			let kw = this.keyword.trim().toLocaleLowerCase()
			if (!kw) {
				this.searchMemberList = []
				this.loading = false
			}
			return kw
		},
		// 根据搜索关健字动态更新联系人列表
		searchClassList() {
			let kw = this.searchKeyword
			if (!kw) return this.list
			return this.list.filter(item => {
				return item.ClassName.toLocaleLowerCase().indexOf(kw) > -1 || item.ClassPinyin.toLocaleLowerCase().indexOf(kw) > -1
			})
		},
		scrollData() {
			return {
				searchClassList: this.searchClassList,
				searchMemberList: this.searchMemberList
			}
		}
	},
	methods: {
		reset() {
			this.keyword = ""
		},
		// 获取用户头像
		getUserAvatar (user) {
			return user.Image || config.defaultUserIcon
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
	watch: {
		searchKeyword(nv, ov) {

			this.smAjax && this.smAjax.cancel()

			if (nv) {
				this.loading = true
				this.smAjax = getStudents({keyword: nv})
				this.smAjax.then(res => {
					if (res.ErrorCode === app.errok) {
						this.loading = false
						this.searchMemberList = res.Data
					}
				})
			}
		}
	}
}
</script>

