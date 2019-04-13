<!-- 选择图片组件 -->
<style lang="scss" scoped>
	@import 'src/plugin/scss/mixin.scss';
	@import 'src/plugin/scss/variable.scss';

	.img-box {
		display: flex;
		flex-wrap: wrap;
		.img-item{
			position: relative;
			display: flex;
            width: calc(33.3% - 7px);
            &:nth-child(3n+2){
                margin-right: 10px;
                margin-left: 11px;
            }
            &:nth-child(3n) {
                margin-bottom: 15px;
            }
            &:last-child {
                margin-top: 0;
                margin-bottom: 0;
            }
			.img-grid{
				width: 100%;
				height: 0;
				padding-top: 100%;
				border-radius: 2px;
				position: relative;
                border: 1px solid $color-border;
                &.no-bd{
                    border: none;
                }
				.img-wrap{
					@include position-absolute;
					@include flex-center(column);
					.img{
						width: 100%;
                        height: 100%;
                        @include background-img;
					}
					svg{
						width: 30px;
						height: 30px;
					}
					.img-add-tips{
						margin-top: 13px;
						font-size: 10px;
						color: #BBBBBB;
					}
				}
				.img-delete{
				    position: absolute;
				    top: -10px;
				    right: -10px;
				    width: 20px;
				    height: 20px;
				}
				.img-fail{
					@include position-absolute;
					@include flex-center;
					font-size: 10px;
					background-color: $color-primary;
                }
            }
        }
        .img-pd{
            padding-bottom: 5px;
            &:last-child{
                padding-bottom: 0;
            }
        }
        img{
            max-width: 100%;
            display: block;
        }
	}
</style>

<template>
    <div class="img-area">
        <!-- 一排展示三张图片 -->
        <div class="img-box" v-if="imageType==0">
            <div class="img-item" v-for="item in currentImgs">
                <div class="img-grid" :class="{'no-bd':!edit}">
                    <!-- 图片展示 -->
                    <div class="img-wrap">
                        <div class="img" 
                            :style="`backgroundImage:url('${item.FilePath||item.filepath||item.localImgData||item.localId}')`"
                            @click="previewImg(item)"
                            v-if="item.status!=='fail'">
                        </div>
                    </div>

                    <!-- 删除 -->
                    <svg aria-hidden="true" class="icon img-delete" @click="deleteImg(item)" v-show="edit">
                        <use xlink:href="#icon-shanchuxueyuan"></use>
                    </svg>
                </div>
            </div>
            <!-- 添加图片 -->
            <div class="img-item" v-if="canAddImage&&edit">
                <div class="img-grid" @click="chooseImg">
                    <div class="img-wrap">
                        <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-tianjiatupian"></use>
                        </svg>
                        <div class="img-add-tips">添加图片</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 一排展示一张图片 -->
        <div class="img-box" v-if="imageType==1" ref="imgBox">
            <div v-show="currentImgs.length>0">
                <img class="img-pd" v-for="img in currentImgs" :src="img.FilePath||img.filepath" @click="previewImg(img)">
            </div>
        </div>
    </div>
</template>

<script>
    /**@description
     *  图片展示路径要求：WKWebview：base64图片，其他内核：无路径要求
     *  图片预览路径要求：http:开头||localId
     */
    let msgArr= [], //消费的图片数组
        consumeing= false, //是否正在消费
        count = 0;

	export default {
		name: 'img-area',
		props: {
            edit: { //false:展示true:编辑
				type: Boolean,
				default: true, 
            },
            imageType: { //0一行展示三张图片，1一行展示一张图片
				type: Number,
				default: 0
            },
			imageMaxNum: { //最大上传的图片数量
				type: Number,
				default: 9
			},
			imageFileList: { //数据库图片数组
				type: Array,
				default: function(){
					return [];
				}
			}
        },
        data(){
            return {
                currentImgs: [], //图片数组
                fileIdList: [], //删除的图片
                preClickTime: 0 //预览点击的时间
            }
        },
		computed:{
			canAddImage() { //是否达到最大上传数
				return (this.imageMaxNum-this.currentImgs.length)>0
            }
		},
		methods: {
            previewImg(img) { //预览图片
                let curClickTime = new Date().getTime();
                if (curClickTime - this.preClickTime < 500) { //保证在500ms内不会重复打开两次预览(用户快速双击时), 造成不好的体验;
                    return;
                }
                this.preClickTime = curClickTime;

                let current = img.localId || app.tool.getAbsUrl(img.FilePath||img.filepath),
                    urls =  this.currentImgs.map(img => {
                        return img.localId || app.tool.getAbsUrl(img.FilePath||img.filepath);
                    });

                app.sdk.previewImage({
                    current: current,
                    urls: urls
                });
			},
            deleteImg(img) { //删除图片
                let ids = this.currentImgs.map(image => {
                        return image.ID || image.id || image.localId;
                    }),
                    index = ids.indexOf(img.ID || img.id || img.localId);
                
				if(index !== -1) {
                    this.currentImgs.splice(index, 1);
                    if (img.ID || img.id) {
                        this.fileIdList.push(img.ID||img.id);
                    }
                    this.$emit('imageFinished', this.currentImgs, this.fileIdList);
                    this.$emit('imageLoaded', this.currentImgs);
				}
			},
            chooseImg() { //选择图片
                app.sdk.highChooseImage({
		    		max: this.imageMaxNum - this.currentImgs.length //设置可选图片数量
                }).then(res => {
                    this.currentImgs = this.currentImgs.concat(res);
                    this.$emit('imageFinished', this.currentImgs, this.fileIdList);
                    this.$emit('imageLoaded', this.currentImgs);
                })
            },
            imgLoadHandler() {
                let imgBox = this.$refs.imgBox,
					imgs = imgBox.querySelectorAll("img");

                Array.prototype.forEach.call(imgs, (img, index) => {
                    img.addEventListener('load', () => {
                        setTimeout(() => {
                            this.$emit('imageLoaded', this.currentImgs); //图片加载完成触发
                        }, 10)
                    })
				})
			}
        },
        created() { //传入的服务器图片
			if(this.imageFileList.length > 0) {
				this.currentImgs = app.tool.clone(this.imageFileList);
			}
        },
        mounted() {
			this.imageType==1 && this.imgLoadHandler();
		},
        watch: {
            imageFileList(val){
                this.currentImgs = app.tool.clone(val);
            }
        }
    }
</script>