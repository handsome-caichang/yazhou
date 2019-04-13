<!-- 主屏-用户中心页面 -->
<style lang="scss" scoped>
	
	
	.app-user {
		line-height: 1;
		@include position-absolute;
		@include flex-center;
		font-size: $fs-big;
		overflow: hidden;
		background-color: $color-assist-1;
		.info {
			text-align: center;
			height: 150px;
			@include background-img(false, cover);
			.avatar {
				display: inline-block;
				margin-top: 20px;
				width: 63px;
				height: 63px;
				border-radius: 50%;
				@include background-img(false, cover);
			}
			.name {
				color: $color-white;
				font-size: 20px;
				margin: 7px 0 10px 0;
			}
			.serial {
				color: $color-white;
				font-size: $fs-small;
			}
		}
		.nav-row {
			margin-bottom: $void;
			@include flex-center;
			background-color: $color-white;
			.item {
				flex: 1;
				color: $color-3;
				text-align: center;
				font-size: $fs-normal-s;
				.link{
					height: 90px;
					@include flex-center(column);
					.tips{
						position: relative;
						svg {
							font-size: 24px;
							margin-bottom: 11px;
						}
						.num{
							position: absolute;
							top: -9px;
							right: -9px;
					        min-width: 16px;
						    height: 16px;
						    color: $color-white;
						    line-height: 16px;
						    padding: 0 4px;
						    font-size: $fs-small-s;
						    border-radius: 8px;
						    background-color: $color-assist;
						    text-align: center;
						}
					}
				}
			}
		}
		.nav {
			.nav-item {
				height: 55px;
				line-height: 55px;
				padding: 0 $edge-x;
				color: $color-3;
				font-size: $fs-big-s;
				background-color: $color-white;
				@include border-bottom;
				.link{
					@include flex-between;
					.nav-icon {
						font-size: 20px;
						margin-right: $edge-x;
					}
				}
				.nav-next {
					color: $color-9;
				}
				&.cate {
					margin-bottom: $void;
				}
			}
		}
		.void {
			height: $void;
			background-color: $color-assist-1;
		}
        .log-out {
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            color: #AAAAAA;
            text-align: center;
            background-color: #FFFFFF;
        }
		.scroller {
			@include position-absolute;
			overflow: hidden;
		}
	}
</style>

<template>
	<div class="app-user">
		<scroller-super class="scroller" :api="apiPromise" :data="renderData">
			<div>
				<div class="info" :style="'backgroundImage:url('+userBg+')'">
					<span class="avatar" :style="{'background-image': userInfo.Image ? `url(${userInfo.Image})` : ''}"></span>
					<p class="name">{{userInfo.StudentName}}</p>
					<p class="serial" v-if="userInfo.Number&&!userInfo.IsEmployee">学员学号：{{userInfo.Number}}</p>
				</div>
				<div class="nav-row" v-if="!userInfo.IsEmployee">
					<div class="item" v-for="(item,index) in navRows">
						<router-link :to="`/orderList/${index}`" class="link" >
							<span class="tips">
								<svg class="icon" aria-hidden="true">
									<use :xlink:href="item.icon"></use>
								</svg>
								<span class="num" v-if="item.count>0">{{item.count>99?'99+':item.count}}</span>
							</span>
							<p>{{item.text}}</p>
						</router-link>
					</div>
				</div>
				<div class="nav">
					<div 
						class="nav-item" 
						:class="{cate:item.showEdge}" 
						v-for="(item, index) in navs" 
						v-show="judgeShow(item)">
						<router-link :to="`/${item.router}`" class="link" >
							<label>
								<svg class="icon nav-icon" aria-hidden="true">
									<use :xlink:href="item.icon"></use>
								</svg>{{item.text}}
							</label>
							<svg class="icon nav-next" aria-hidden="true">
								<use xlink:href="#icon-xiangxia"></use>
							</svg>
						</router-link>
					</div>
				</div>
				<div class="void"></div>
                <div class="log-out" v-if="userInfo.IsEmployee" @click="userLogOut">
                    <svg class="icon nav-next" aria-hidden="true">
                        <use xlink:href="#icon-tuichudenglu1"></use>
                    </svg>&nbsp;退出当前账号
                </div>
			</div>
		</scroller-super>
	</div>
</template>

<script>
	 
    import { getOrderCount,logout } from 'api/lc';
	import userBg from './userBg.png';
    
	export default {
		name: 'app-user',
		data() {
			return {
				userBg,
				navRows: [{
					icon: '#icon-dingdanicon',
					text: '订单',
					count: 0
				}, {
					icon: '#icon-daifukuanicon1',
					text: '待付款',
					count: 0
				}, {
					icon: '#icon-yifukuanicon',
					text: '已付款',
					count: 0
				}, {
					icon: '#icon-daipingjiaicon',
					text: '待评价',
					count: 0
				}],
				navs: [
				//二期修改（暂缓）
				/*{
					icon: '#icon-xiaoxiicon',
					text: '消息',
					router: 'messageList',
					showEdge: true
				},*/
				{
					icon: '#icon-youhuiquanicon',
					text: '优惠券',
					router: 'couponList',
					showEdge: false
				},{
					icon: '#icon-xihuanicon',
					text: '喜欢',
					router: 'favoriteList',
					showEdge: true
				},/*{
					icon: '#icon-bangzhuicon',
					text: '帮助中心',
					router: 'helpCenter',
					showEdge: false
				},*/{
					icon: '#icon-shezhiicon',
					text: '设置',
					router: 'userSetting',
					showEdge: true
				}]
			}
		},
		computed: {
			...Vuex.mapState([
				'config',
				'agent',
            	'userInfo',
            	'userPageRefreshFlag'
            ]),
            renderData() {
                return {
                	agent: this.agent,
					userInfo: this.userInfo,
					userPageRefreshFlag: this.userPageRefreshFlag
                }
           	},
		},
		methods: {
            ...Vuex.mapMutations([
				'set_userInfo',
				'set_addressList',
				'set_appCart',
				'set_appFavorite',
				'set_cartTotalMoney',
				'set_orderAddress',
				'set_appCartCampus',
				'set_goodsDetailCampus',
				'set_vaildCartList',
				'set_expiredCartList'
			]),
		    apiPromise() {
		    	let promise = getOrderCount();
		    	promise.then(res => {
					if (res.ErrorCode==app.errok) {
						let data = res.Data;
						this.navRows[1].count = data.WaitForPayOrderCount;
						this.navRows[3].count = data.WaitForCommentOrderCount;
					}
				});
				return promise;
		    },
			renderOrderCount() {
				this.apiPromise();
			},
			judgeShow(item) {
				//客服为0/后台设置关闭优惠券则隐藏入口
				if (((item.router=='helpCenter')&&(this.agent.length==0)) || ((item.router=='couponList')&&(this.config.EnableCoupon==0))) {
					return false;
				}
				return true;
            },
            userLogOut() { //小程序退出登录
                app.confirm('确定要退出登录吗？').then(res => {
	  				if (res === true) {
                        logout().then(res => {
                            if (res.ErrorCode == app.errok) {
                                if (window.__wxjs_environment === 'miniprogram') { //小程序处理
                                    wx.miniProgram.navigateBack({ //界面回退
                                        delta: 1
                                    });
                                    wx.miniProgram.postMessage({ //数据传递
                                        data: {
                                            showExitBtn: true,
                                            userName: this.userInfo.Name
                                        }
                                    })
                                }

                                this.set_userInfo({});
                                this.set_addressList([]);
                                this.set_appCart(-1);
                                this.set_appFavorite([]);
                                this.set_cartTotalMoney(0);
                                this.set_orderAddress({});
                                this.set_vaildCartList([]);	//购物车有效商品列表
                                this.set_expiredCartList([]);
                                this.set_appCartCampus({
                                    "ID": "",
                                    "Name": "",
                                    "Products": []
                                });
                                this.set_goodsDetailCampus({
                                    "ID": "",
                                    "Name": "",
                                    "Products": []
                                });
                                
                                setTimeout(() => {
                                    homeNav && homeNav.click(0); //让首页回到第一个导航'首页处'
                                }, (app.duration + 100))
                            }else{
                                app.toast('error', res.ErrorMsg);
                            }
                        });
                    }
                });
            }
		},
		created() {
			if (this.$route.name === 'home' && this.$route.params.homeIndex === '4') {
			    this.renderOrderCount();
            }
			if (this.userInfo.IsEmployee) {
				this.navs = [{
					icon: '#icon-wodeyejiicon',
					text: '业绩统计',
					router: 'achievement',
					showEdge: true
				},{
					icon: '#icon-xihuanicon',
					text: '喜欢',
					router: 'favoriteList',
					showEdge: true
				}]
			}
		},
		watch:{
			userPageRefreshFlag(newVal,oldVal){ //是否刷新待支付订单数量
				this.renderOrderCount();
			},
			$route(to) {
			    if (to.name === 'home' && to.params.homeIndex === '4') {
			        this.renderOrderCount();
			    }
			}
		}
	}
</script>