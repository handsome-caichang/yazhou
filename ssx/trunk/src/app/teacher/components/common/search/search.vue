<style scoped lang="scss">
	
	
	.search {
		width: 100%;
		height: $h-2;
		background-color: $color-assist-1;
		padding: 8px 15px;
		position: relative;
		.search-icon {
			position: absolute;
			top: 14px;
			left: 20px;
		}
		.input {
			width: 100%;
			height: 100%;
			line-height: 28px;
			padding-left: 25px;
			background-color: $color-white;
		}
	}
</style>

<template>
	<div class="search">
		<div class="search-icon">
			<svg class="icon" aria-hidden="true">
			    <use xlink:href="#icon-sousuo"></use>
			</svg>
		</div>
		<input  
			type="text" 
			v-model="text" 
			class="input" 
			ref="input"
			v-on:focus="initValue" 
			placeholder="搜索">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: ''
			}
		},
		methods: {
			initValue() {
				
			}
		},
		watch: {
			text(val) {	
				if (val !== '') {
					this.$emit('getUserInput', this.text)
				}
			}
		}
	}
</script>