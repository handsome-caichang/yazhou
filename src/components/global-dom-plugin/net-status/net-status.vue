<style lang="scss" scoped>
	.net-status {
		line-height: 22px;
		font-size: 12px;
		color: #666;
		text-align: center;
		background-color: rgba(240,250,235,1);
		&.error {
			background-color: rgba(253,223,221,1);
		}
	}
</style>

<template>
	<div v-show="opened">
		<div class="net-status" :class="{error: !net}">
			<svg class="icon audio-icon" aria-hidden="true">
			    <use :xlink:href="`#${net ? 'icon-zhengque' : 'icon-jingshi'}`"></use>
			</svg>
			{{net ? ' 网络已连接, 可以正常使用' : ' 当前网络不可用，请检查你的网络设置'}}
		</div>
	</div>
</template>

<script>

let outer = null;

export default {
  	name: 'net-status',
  	data () {
    	return {
			opened: false
    	}
  	},
  	computed: {
  		...Vuex.mapState(['net'])
  	},
  	watch: {
  		net(status) {
  			if (status) {
  				outer = setTimeout(() => this.opened = false, 2000)
  			} else {
  				this.opened = true
  				clearTimeout(outer)
  			}
  		}
  	}
}
</script>

