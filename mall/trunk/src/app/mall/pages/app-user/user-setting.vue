<!-- 设置界面 -->
<style lang="scss" scoped>
    .user-setting {
        @include position-absolute;
		background-color: $color-assist-1;
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
        background-color: $color-assist-1;
        .avatar-wrapper {
            height: 69px;
            @include flex-between;
            background-color: $color-white;
            padding: 0 12px;
            font-size: 15px;
            color: $color-3;
            .avatar {
                display: flex;
                justify-content: flex-end;
                flex: 1;
                .avatar-t {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    margin-right: 6px;
                    @include background-img(false,cover);
                }
            }
        }
        .void {
            height: 10px;
        }
        .list {
            height: 50px;
            padding: 0 12px;
            background-color: $color-white;
            .list-body {
                height: 100%;
                @include flex-between;
                border-bottom: 1px solid #EAEAEAFF;
                .list-left {
                    font-size: 15px;
                    color: $color-3;
                }
                .list-right {
                    font-size: 14px;
                    color: $color-6;
                }
            }            
        }
    }
</style>

<template>
	<div class="user-setting">
		<scroller-base class="scroller" :data="userInfo">
			<div class="avatar-wrapper">
                <div class="list-right fade">头像</div>
				<div class="avatar" @click="updateAvatar">
                    <div class="avatar-t" :style="'background-image:url('+userInfo.Image+')'"></div>
                </div>
				<svg class="icon next" aria-hidden="true">
					<use xlink:href="#icon-xiangxia"></use>
				</svg>
			</div>
            <div class="void"></div>
			<div class="list">
                <div class="list-body">
    				<div class="list-left">姓名</div>
    				<div class="list-right">白小伙</div>
                </div>
			</div>
			<div class="list">
                <div class="list-body">
				    <div class="list-left">性别</div>
				    <div class="list-right">女
                        <svg class="icon next" aria-hidden="true">
                            <use xlink:href="#icon-xiangxia"></use>
                        </svg>
                    </div>
                </div>
			</div>
			<div class="list">
                <div class="list-body">
				    <div class="list-left">出生日期</div>
				    <div class="list-right">
                        1986年10月12号
                        <svg class="icon next" aria-hidden="true">
                            <use xlink:href="#icon-xiangxia"></use>
                        </svg>
                    </div>
                </div>
			</div>
			<div class="list">
                <div class="list-body">
                    <div class="list-left">公立学校</div>
                    <div class="list-right">师大附中</div>
                </div>
            </div>
            <div class="list">
                <div class="list-body">
                    <div class="list-left">年级</div>
                    <div class="list-right">二年级</div>
                </div>
            </div>
            <div class="list">
                <div class="list-body">
                    <div class="list-left">公立班级</div>
                    <div class="list-right">一般</div>
                </div>
            </div>
            <div class="list">
                <div class="list-body">
                    <div class="list-left">手机号</div>
                    <div class="list-right">18595652585</div>
                </div>
            </div>
		</scroller-base>
		<loading v-if="isLoading" :bgType="1"></loading>
	</div>
</template>

<script>
	import { logout,changeImage,getCurrentUserInfo } from 'api/lc';
	
	export default{
		name:'user-setting',
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