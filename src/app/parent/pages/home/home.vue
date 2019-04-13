<style scoped lang="scss">
	
	
	.home {
		.home-group {
			@include position-absolute(0, 0, $h-1, 0);
			background-color: #EDF1F7;
			overflow: hidden;
		}
		.component {
			@include position-absolute(0, 0, 0, 0);
			z-index: 1;
			opacity: 0;
			&.active {
				z-index: 2;
				opacity: 1;
			}
		}
		.bottom {
			height: $h-1;
			width: 100%;
			border-top: 1px solid #eeeeee;
			@include position-absolute(false, 0, 0, 0);
			background: #FCFCFC;
			display: flex;
			.item {
				flex: 1;
                position: relative;
				@include flex-center(column);
				.icon {
					font-size: 20px;
				}
				.text {
                    display: block;
					font-size: $fs-small-s;
					margin-top: 3px;
				}
                .unread{
                    position: absolute;
                    top: 5px;
                    right: 25%;
                    width: 6px;
                    height: 6px;
                    border-radius: 10px;
                    background-color: #ff3433;
                }
			}
			.active {
				color: #FF8369;
			}
		}
	}
</style>

<template>
	<div class="home">
		<div class="home-group">
			<component 
				v-for="(item, index) in home.list" 
				class="component" 
				:key="index" 
				:is="item.component" 
				:class="{active: home.activeIndex === index}">
			</component>
		</div>

		<div class="bottom">
			<div 
				v-for="(item, index) in home.list"
                class="item"
				@click="changeContent(item, index)"
                v-show="item.show"
				:class="{active:index==home.activeIndex}">
				<svg class="icon" aria-hidden="true">
					<use :xlink:href="index === home.activeIndex ? item.iconAction : item.icon"></use>
				</svg>
                <div class="unread" v-show="index==1&&app.sysInfo.HasUnReadMsg>0"></div>
				<span class="text">{{item.text}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Main from './main';
	import PersonalCenter from 'parent/pages/personal-center/personal-center';

	export default {
		data() {
			return {
				home: {
					activeIndex: parseInt(this.$route.params.homeIndex) || 0,
					list: [{
					    show:true,
						icon: '#icon-shouye1',
						iconAction: '#icon-shouyexuanzhong',
						text: '首页',
						component: Main
					}, {
					    show:app.sysInfo.isStudent==1,
						icon: '#icon-shishengxin1',
						iconAction: '#icon-shishengxinxuanzhong',
						text: app.sysInfo.Title_SSX_Menu
					}, {
                        show:true,
						icon: '#icon-xuankebaoming',
						iconAction: '#icon-xuankebaomingxuanzhong',
						text: app.sysInfo.Title_SSX_Mall
					}, {
                        show:true,
						icon: '#icon-wode1',
						iconAction: '#icon-wodexuanzhong',
						text: '我的',
						component: PersonalCenter
					}]
				},
			}
		},
		computed: {
			...Vuex.mapState([
				'userConfig'
			]),
			wxTitle(){
				let title = '';
				
				switch(this.home.activeIndex){
					case 0:
						title = this.userConfig.documentTitle || '首页';
						break;
					case 3:
						title = '个人中心';
						break;
				}
				
				return title;
			}
		},
		methods: {
			changeContent(item, index) {
				if (item.component) {
					this.home.activeIndex = index;
					this.$router.replace(`/home/${index}`);
				}else {
					if (index == 1) { //跳转师生信
						app.gotoIM()
					}else if (index == 2) { //跳转商城
						location.href = app.sysInfo.MallURL;
					}
				}
			}
		}
	}
</script>