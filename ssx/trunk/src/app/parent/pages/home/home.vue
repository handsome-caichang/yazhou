<style scoped lang="scss">
	
	
	.home {
        background-color: $color-white;
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
				@include flex-center(column);
				.icon {
					font-size: 20px;
				}
				.text {
                    display: block;
					font-size: $fs-small-s;
					margin-top: 3px;
				}
			}
			.active {
				color:#FF8369;
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
				:class="{active:index==home.activeIndex}">
				<svg class="icon" aria-hidden="true">
					<use :xlink:href="index === home.activeIndex ? item.iconAction : item.icon"></use>
				</svg>
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
						icon: '#icon-shouye1',
						iconAction: '#icon-shouyexuanzhong',
						text: '首页',
						component: Main
					},{
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
						title = this.userConfig.documenttitle || '首页';
						break;
                    case 1:
						title = '个人中心';
						break;
				}
				
				return title;
			}
		},
		methods: {
			changeContent(item, index) {
                this.home.activeIndex = index;
                this.$router.replace(`/home/${index}`);
			}
		}
	}
</script>