<!-- 个人中心界面 -->
<style lang="scss" scoped>
	
	
	.personal-center{
		.header{
			padding: 13px;
            @include flex-center;
			background-color: #2196f3;
			color: $color-white;
			@include background-img(false, cover);
			.avatar{
				width: 73px;
				height: 73px;
				border-radius: 50%;
                background-color: #EEF1F6;
				border: 1px solid $color-white;
				@include background-img(false, cover);
			}
			.info{
				flex: 1;
				padding-left: 10px;
				font-size: 12px;
				.name{
					font-size: 20px;
					padding-bottom: 10px;
				}
                .role{
                    display: inline-block;
                    padding: 3px 9px;
				    border: 1px solid $color-white;
                    border-radius: 50px;
                    font-size: 10px;
                }
			}
		}
		.nav{
			.nav-item{
				padding:0 15px;
				height: 44px;
				@include border-bottom;
				@include flex-between;
				background-color: $color-white;
                font-size: 15px;
				.nav-icon{
					margin-right: 10px;
				}
			}
		}
		.void{
			height: 10px;
			background-color: $color-assist-1;
		}
	}
</style>

<template>
	<scroller-base class="personal-center">
		<div class="header" :style="'backgroundImage:url('+personalCenterBg+')'">    
			<div class="avatar" :style="'background-image:url('+userphoto+')'"></div>
			<div class="info">
                <div class="name">{{app.sysInfo.name}}</div>
                <div class="role">{{currole.name}}</div>
			</div>
		</div>
		<div class="nav">
			<div v-for="item in list" 
				v-if="judgeShow(item)">
                <div class="void" v-if="item.showVoid"></div>
				<div class="nav-item"
					@click="triggerChange(item)">
						<span>
							<svg class="icon nav-icon" aria-hidden="true">
								<use :xlink:href="item.icon"></use>
							</svg>{{item.text}}
						</span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
				</div>
			</div>
            <div class="void"></div>
		</div>
        <loading class="loading" v-show="isLoading"></loading>
	</scroller-base>
</template>

<script>
    import {opuserphoto,getuserinfobyuid,logout} from 'teacher/api/personal-center';
	
	export default {
		name: 'personal-center',
		data () {
			return {
				wxTitle: '个人中心',
				isLoading: false,
                personalCenterBg: require('./img/personal-teacher.jpg'),
                avatarTimer: null, //获取头像地址轮询
				list: [{
					href: 'passwordModify',
					icon: '#icon-xiugaimima',
					text: '修改密码',
                    showVoid: true
				},{
					icon: '#icon-xiugaitouxiang',
					text: '修改头像',
                    showVoid: false,
                    name: 'updateAvatar'
				},{
					href: 'workInfo',
					icon: '#icon-gongzuotongji',
					text: '工作统计',
					showVoid: true
				},{
					href: 'commentRank',
					icon: '#icon-pingjiapaiming',
					text: '家长评价排名',
					showVoid: false
                },/*{
					href: 'suggestion',
					icon: '#icon-tousuyujianyi1',
					text: '投诉与建议',
					showVoid: false,
				 	name: 'suggestion'
                },*/
                /*{
					href: location.protocol + "//" + location.host + "/weixin/teacher/t-show/show.aspx?id=" + app.sysInfo.id,
					icon: '#icon-laoshixiu',
					text: '老师秀',
                    showVoid: true,
                    name: 'ssxShow'
                },*/
                {
					icon: '#icon-tuichudenglu',
					text: '退出登录',
					showVoid: true,
				 	name: 'loginOut'
                }],
                userphoto: app.sysInfo.userphoto
			}
        },
        computed: {
			...Vuex.mapState([
				'currole'
            ])
        },
		methods: {
			judgeShow(item){ //判断显示
				if (item.name==='ssxShow' && app.sysInfo.enablessxshow!=1) { //老师秀
					return false;
				}
				return true;
			},
			triggerChange(item){ //处理页面跳转/其他的点击事件
				if (item.href) {
					this.$router.push(`/${item.href}`);
				}else{
					if (item.name == 'updateAvatar'){ //修改头像
                        this.updateAvatar();
                    }else if (item.name == 'loginOut') { //退出登录
                        this.isLoading = true;
						logout().then(res => {
                            this.isLoading = false;
                            if (res.result.code == app.errok) {
                                app.sdk.closeWindow();
                            }else{
                                app.toast('error','退出登录失败。');
                            }
                        })
					}
				}
            },
            updateAvatar(){ //修改头像
                app.sdk.highChooseImage({
		    		max: 1
                }).then(res => {
                    if (res.length > 0) {
                        let localImage = res[0];

                        //编辑完成图片
                        app.avatarModify(localImage).then(res => {
                            this.isLoading = true;
                            localImage.promise.then(resolve => {
                                opuserphoto({
                                    mediaids: localImage.serverId,
                                    upwidth: parseInt(res.width), //放大后宽度
                                    x: parseInt(res.x), //x轴坐标
                                    y: parseInt(res.y), //y轴坐标
                                    cutwidth: res.areaWidth, //截取后宽度
                                    cutheight: res.areaheight, //截取后高度
                                }).then(res => {
                                    this.isLoading = false;
                                    if (res.result.code == app.errok) {
                                        app.toast('success', '头像修改成功。');
                                        this.isFinish();
                                    }else{
                                        app.toast('error', res.result.msg);
                                    }
                                })
                            })
                        })
                    }

	    		});
            },
            isFinish(){ //轮询获取最新的头像
                getuserinfobyuid().then(res => {
					if (res.result.code == app.errok) {
						if (app.sysInfo.userphoto == res.data.userphoto) {
							this.avatarTimer = setTimeout(() => {
                                this.isFinish();
                            },1000);
						}else{
							this.userphoto = app.sysInfo.userphoto = res.data.userphoto;
							clearTimeout(this.avatarTimer);
						}
					}else{
						app.toast('error', res.result.msg);
					}
                })
			}
        }
	}
</script>