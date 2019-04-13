<!-- 富文本区域组件 -->
<style lang="scss" >
	.rich-text-box {
		padding-top: 10px;
		padding-bottom: 10px;
		margin-left: 10px;
		margin-right: 10px;
		overflow: hidden;
		// img {
		// 	max-width: 100%;
		// }
		* {
			max-width: 100%;
		}
		span {
			white-space: normal !important;
		}
	}
</style>

<template>
	<div class="rich-text-box" ref="richTextBox" v-html="richText"></div>
</template>

<script>
	export default {
		name: 'rich-text-area',
		props: {
			richText: {
				type: String
			},
			// 是否开启图片加载完成时发射'imgLoaded'事件
			enableImgLoadEvent: {
				type: Boolean,
				default: true
			},
			// 是否开启图片预览
			enableImagePreview: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
			};
		},
		methods: {
			// 等比收缩图片, 并在图片加载完成时发射'imgLoaded'事件出去, 以便让外层的父组件可以在适合的时机刷新滚动条;
			imageLoadHandler(img, maxW) {
				return new Promise(resolve => {
					let	w = parseInt(img.style.width || img.getAttribute("width")),
						h = parseInt(img.style.height || img.getAttribute("height"));

					// 如果获取到的'宽度'、'高度'都存在, 且'宽度'大于富文本容器的宽度, 则按比例收缩图片;
					// 其它情况已经是自动适应的, 就不需要再理会了...
					if (w && h && w > maxW) {
						img.style.width = maxW + "px";
						img.style.height =  maxW / w * h + "px";
					}

					img.addEventListener('load', () => {
						resolve('onload');
					})
					img.addEventListener('error', () => {
						resolve('onerror');
					})
				}).then(res => {
					this.enableImgLoadEvent && this.$emit('imgLoaded');
					return res;
				})
			},
			// 对图片的有效性验证并处理, 开启图片预览
			processor() {
				let richTextBox = this.$refs.richTextBox,
					maxW = richTextBox.offsetWidth,
					imgs = richTextBox.querySelectorAll("img"),
					urls = [], // 需要传给'预览'方法的图片链接的数组
					imgPromiseAll = [],
					// 是否是以'http://'、'https://'开头,或者是base64;
					regHeader = new RegExp('^((http|https):\/\/|data:image)');

				Array.prototype.forEach.call(imgs, (img, index) => {
					let src = img.src;
					// 如果'img'的src属性存在并且是合规的图片地址
					if (src && regHeader.test(src)) {
						urls.push(src);
						// 将img加载处理器的promise放入imgPromiseAll数组中, 
						imgPromiseAll.push(this.imageLoadHandler(img, maxW));
					} else {
						// 如果'img'的src属性不存在或不是合理的图片地址
						img.style.width = 0;
						img.style.height = 0;
					}
				})

				// 从'urls'数组中去除掉无效的'src'
				Promise.all(imgPromiseAll).then(res => {
					res.forEach( (msg, index) => {
						msg === 'onerror' && urls.splice(index, 1);
					})
				})

				// 如果开启了图片预览, 代理点击事件, 调用'微信JS-SDK'提供图片预览;
				// 保证在500ms内不会重复打开两次预览(用户快速双击时), 造成不好的体验;
				if (this.enableImagePreview) {
					let prevClickTime = 0;
					richTextBox.addEventListener('click', event => {
						let curClickTime = new Date().getTime();
						if (curClickTime - prevClickTime < 500) {
							return;
						}
						prevClickTime = curClickTime;
			            let target = event.target;
			            if(target.nodeName.toLowerCase() === 'img'){
    		            	app.sdk.previewImage({
    	                		current: target.src, // 当前显示图片的http链接
    	                		urls: urls // 需要预览的图片http链接列表
    	                	})
			            }
					})
				}
			}
		},
		mounted() {
			this.processor();
		}
	};
</script>

