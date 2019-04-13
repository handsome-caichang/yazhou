<!-- 个人中心界面 -->
<style lang="scss" scoped>
	
	
	.personal-center{
		.header{
			padding: 13px;
			display: flex;
			background-color: #2196f3;
			color: $color-white;
			@include background-img(false, cover);
			.avatar{
				width: 73px;
				height: 73px;
				border-radius: 50%;
                background-color: #EEF1F6;
				border: 2px solid $color-white;
				@include background-img(false, cover);
			}
			.info{
				flex: 1;
				font-size: 12px;
				padding-left: 10px;
                line-height: 1;
				@include flex-between;
                .serial{
                    padding-bottom: 6px;   
                }
				.name{
					font-size: 20px;
					padding-bottom: 10px;
				}
			}
		}
		.nav{
			.nav-item{
				padding:0 15px;
				height: 49px;
				color: $color-3;
				@include border-bottom;
				@include flex-between;
				background-color: $color-white;
                font-size: 16px;
				.nav-icon{
					margin-right: 10px;
				}
                .nav-content{
                    color: $color-9;
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
	<scroller-base class="personal-center" v-if="info">
		<router-link tag="div" to="/personalInformation" class="header" :style="'backgroundImage:url('+personalCenterBg+')'">
			<div class="avatar" :style="'background-image:url('+info.userphoto+')'"></div>
			<div class="info">
				<div>
					<div class="name">{{info.name}}</div>
					<div class="serial">学号：{{info.serial}}</div>
					<div>电话：{{info.smstel}}</div>
				</div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou1"></use>
				</svg>
			</div>
		</router-link>
		<div class="nav">
			<div v-for="item in list" 
				v-if="judgeShow(item)">
                <div class="void" v-if="item.showVoid"></div>
				<div class="nav-item"
					@click="changeContent(item)">
						<span>
							<svg class="icon nav-icon" aria-hidden="true">
								<use :xlink:href="item.icon"></use>
							</svg>{{item.text}}
						</span>
						<span class="nav-content">
							<span v-if="item.name=='point'">{{info.point|formatNumber}}</span>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-youjiantou"></use>
							</svg>
						</span>
				</div>
			</div>
            <div class="void"></div>
		</div>
	</scroller-base>
</template>

<script>
	import {getuserinfobyuid,logout} from 'parent/api/personal-center.js';
    
	export default {
		name: 'personal-center',
		data () {
			return {
				wxTitle: '个人中心',
				info: null,
				personalCenterBg: require('./img/personal-center-bg.jpg'),
				list: [{
					href: 'GrowthList',
					icon: '#icon-wodechengchang',
					text: '我的成长',
					showVoid: true
				}/*,{
					icon: '#icon-xueshengxiu',
					text: '学生秀',
                    showVoid: true,
                    name: 'ssx'
				}*/,{
					href:"statisticsList",
					icon:"#icon-shangketongji",
					text:"上课统计",
					showVoid: false,
				 	name: 'courseCount'
				},{
					href: 'transaction',
					icon: '#icon-jiaoyijilu',
					text: '交费记录',
					showVoid: false,
				 	name: 'feeRecord'
				},{
                    href:"point",
				 	icon: '#icon-wodejifen',
				 	text: '我的积分',
				 	showVoid: false,
				 	name: 'point'
				},/*{
				 	href: '',
				 	icon: '#icon-wodechuqin',
				 	text: '我的出勤',
				 	showVoid: true
				},*/{
					icon: '#icon-qiehuanyonghu',
					text: '切换用户',
					showVoid: true,
				 	name: 'changeLogin'
                },/*{
					href: 'suggestion',
					icon: '#icon-tousuyujianyi',
					text: app.sysInfo.title_ssx_suggest,
					showVoid: true
				}*/]
			}
		},
		methods: {
			loadData(){
				getuserinfobyuid().then(res => {
					if (res.result.code === app.errok) {
						this.info = res.data;
					}
				})
			},
			judgeShow(item){ //判断显示
                if (item.name=='courseCount' && app.sysInfo.app_showcoursecount!=1) { //上课统计是否显示
					return false;
				} else if (item.name=='feeRecord' && app.sysInfo.app_showfeechargelist!=1) { //家长端>显示交费记录
					return false;
				}
				return true;
			},
			changeContent(item){ //处理页面跳转/其他的点击事件
				if (item.href) {
					this.$router.push(`/${item.href}`);
				}else{
					if (item.name === 'ssx') {
                        location.href = location.protocol + "//" + location.host + "/weixin/parent/p-show/show.aspx?id=" + this.info.id;
                    }else if (item.name === 'changeLogin') {
                        logout().then(res => {
                            this.isLoading = false;
                            if (res.result.code == app.errok) {
						        location.replace(app.sysInfo.changeloginurl);
                            }else{
                                app.toast('error','切换用户失败。');
                            }
                        })
					}
				}
			}
		},
		created(){
			if (this.$route.name==='home' && this.$route.params.homeIndex==='1') {
                this.loadData();
			}
		},
		watch: {
			$route(to){
				if (to.name==='home' && to.params.homeIndex==='1') {
					this.loadData();
				}
			}
		}
	}
</script>