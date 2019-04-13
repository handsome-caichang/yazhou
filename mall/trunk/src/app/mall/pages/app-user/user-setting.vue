<!-- 设置界面 -->
<style lang="scss" scoped>
    .user-setting {
        @include position-absolute;
		background-color: $color-assist-1;
		.list{
			position: relative;
			height: $h-1;
			line-height: $h-1;
			font-size: $fs-normal-x;
			padding: 0 27px 0 15px;
			@include flex-center;
			@include border-bottom;
			background-color: $color-white;
			.list-hd{
				width: 90px;
				flex: 1 0 90px;
				color: #888888;
				.avatar{
					display: block;
					width: 35px;
					height: 35px;
					border-radius: 50%;
					@include background-img(false,cover);
				}
			}
			.list-bd{
				color: $color-3;				
				text-align: right;
				@include ellipsis-single;
				&.fade{
					font-size: $fs-normal;
					color: #BBBBBB;
				}
			}
			.next{
				position: absolute;
				right: 13px;
			    top: 0;
			    bottom: 0;
			    margin: auto 0;
				color: $color-9;
			}
			&.cate{
				margin-bottom: $void;
			}
			&:last-child{
				@include border-none;
			}
			&.avatar-wrapper{
				height: 60px;
				line-height: 60px;
			}
			&.log-off{
				color: $color-primary;
				font-size: $fs-big-s;
			}
		}
		.link{
			width: 100%;
		}
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="user-setting">
		<scroller-base class="scroller" :data="userInfo">
			<div class="list avatar-wrapper cate" @click="updateAvatar">
				<div class="list-hd"><span class="avatar" :style="'background-image:url('+userInfo.Image+')'"></span></div>
				<div class="list-bd fade">更换头像</div>
				<svg class="icon next" aria-hidden="true">
					<use xlink:href="#icon-xiangxia"></use>
				</svg>
			</div>
			<div class="list">
				<div class="list-hd">学员姓名</div>
				<div class="list-bd">{{userInfo.StudentName}}</div>
			</div>
			<div class="list">
				<div class="list-hd">手机号码</div>
				<div class="list-bd">{{userInfo.Mobile}}</div>
			</div>
			<div class="list cate">
				<div class="list-hd">在读年级</div>
				<div class="list-bd">{{userInfo.Grade}}</div>
			</div>
			<div class="list">
				<router-link to="/addressSetting/0" class="link">
					<div class="list-hd">收货地址</div>
					<div class="list-bd"></div>
					<svg class="icon next" aria-hidden="true">
						<use xlink:href="#icon-xiangxia"></use>
					</svg>
				</router-link>
			</div>
			<div class="list cate">
				<router-link to="/passwordSetting" class="link" append>
					<div class="list-hd">修改密码</div>
					<svg class="icon next" aria-hidden="true">
						<use xlink:href="#icon-xiangxia"></use>
					</svg>
				</router-link>
			</div>
			<div class="list log-off" @click="userLogOut">退出登录</div>
		</scroller-base>
		<loading v-if="isLoading" :bgType="1"></loading>
	</div>
</template>

<script>
	import { logout,changeImage,getCurrentUserInfo } from 'api/lc';
	
	export default{
		name:'user-setting',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
               	wxTitle: "设置",
               	isLoading: false,
               	avatarTimer: null
            }
        },
		computed: {
			...Vuex.mapState([
				'userInfo'
			])
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
            updateAvatar(){ //修改头像
				let _this = this;
                app.sdk.highChooseImage({
                    max: 1
                }).then(res => {
                    if (res.length > 0) {
                        let localImage = res[0];
                        //编辑完成图片
                        app.avatarModify(localImage).then(res => {
                            this.isLoading = true;
                            localImage.promise.then(resolve => {
                                changeImage({
                                    MediaID: localImage.serverId,
                                    X: parseInt(res.x),
                                    Y: parseInt(res.y),
                                    CutWidth: res.areaWidth,
                                    CutHeight: res.areaheight,
                                    UpWidth: parseInt(res.width)
                                }).then(res => {
                                    _this.isLoading = false;
                                    if (res.ErrorCode == app.errok) {
                                        app.toast('success', '头像修改成功。');
                                        _this.isFinish();
                                    }else{
                                        app.toast('error', res.ErrorMsg);
                                    }
                                })
                            })
                        })
                    }
                });
			},
			userLogOut(){ //退出登录
				this.isLoading = true;
				logout().then(res => {
					this.isLoading = false;
					if (res.ErrorCode == app.errok) {
                        if (window.__wxjs_environment === 'miniprogram') { //小程序处理
                            wx.miniProgram.navigateBack({ //界面回退
                                delta: 1
                            });
                            wx.miniProgram.postMessage({ //数据传递
                                data: {
                                    showExitBtn: true,
                                    userName: this.userInfo.StudentName
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
					    
					    // 先返回到首页
					    this.$router.back();
					    setTimeout(() => {
					    	// 让首页回到第一个导航'首页处'
					    	homeNav && homeNav.click(0);
					    	// 再跳转到登陆页
					    	// setTimeout(() => {
					    	// 	app.mallApp.$router.push('/login');
					    	// }, 30)
					    }, (app.duration + 100))
					}else{
						app.toast('error', res.ErrorMsg);
					}
				});
			},
			isFinish(){ //轮询获取最新的头像
				let _this = this;
				getCurrentUserInfo({
					isUpdating: true
				}).then(res => {
					if (res.ErrorCode == app.errok) {
						if (_this.userInfo.Image == res.Data.Image) {
							_this.avatarTimer = setTimeout(function(){
								_this.isFinish();
							},1000);
						}else{
							_this.set_userInfo(res.Data);
							clearTimeout(_this.avatarTimer);
						}
					}else{
						app.toast('error', res.ErrorMsg);
					}
				})
			}
		}
	}
</script>