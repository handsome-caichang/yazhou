<style lang="scss" scoped>
	
	
	
	.ad-wrap {
		display: flex;
		flex-wrap: wrap;
		padding: $edge/2;
		&.ad-gird {
			.ad-item {
				width: 50%;
				padding: 0 $edge/2 $edge/2;
				.ad-img {
					display: block;
					width: 100%;
					height: 0;
					padding-top: 75%;
					@include background-img(false, cover);
					background-color: $color-assist-1;
				}
			}
		}
		&.ad-row {
			.ad-item {
				width: 100%;
				padding: 0 $edge/2 $edge/2;
				.ad-img {
					display: block;
					width: 100%;
					height: 0;
					padding-top: 36.62%;
					@include background-img(false, cover);
					background-color: $color-assist-1;
				}
			}
		}
	}

</style>

<template>
	<div>
		<div class="ad-wrap" :class="adClass">
			<div class="ad-item" v-for="item in ads">
				<div class="ad-img" 
					:style="'background-image:url(' + item.Image + ')'" 
					@click="openADPage(item)">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'floor-ad',
		props: {
			ads: {
				type: Array
			}
		},
		data () {
			return {
			};
		},
		computed: {
			adClass() {
				return this.ads.length === 1 ? 'ad-row' : 'ad-gird';
			}
		},
		methods: {
			openADPage(ad) {
				if (ad.Url) {
					app.tool.gotoLink(ad.Url, this.$router);
				} else {
					this.$router.push(`/cpage/ad/${ad.ID}`);
				}
			}
		}
	};
</script>

