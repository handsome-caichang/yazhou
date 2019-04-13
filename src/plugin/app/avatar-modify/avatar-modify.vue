<!-- 修改头像的界面 -->
<style lang="scss" scoped>
	@import 'src/plugin/scss/variable.scss';
	@import 'src/plugin/scss/mixin.scss';
	
	.avatar-modify{
        z-index: 100;
		@include position-absolute;
        .modify-page{
            @include position-absolute;
        }
		.modify-bg{
			height:100%;
			width:100%;
			background:black;
			text-align:center;
			overflow:hidden;
			position:relative;
			.modify-wrap {
				height: 100%;
				width: 100%;
				z-index: 1;
				position: absolute;
				overflow: hidden;
			}
			.modify-mask {
				position: relative;
				background: #000;
				opacity: 0.2;
			}
            .modify-area{
				background: transparent;
				border: 1px solid rgba(255, 255, 255, 0.5);
			}
			.modify-img {
				position: absolute;
				top: 0;
				bottom: 0;
				width: 100%;
				left: 0;
				z-index: 0;
				margin: auto;
			}
			.modify-handlerbar {
				position: absolute;
				left: 0;
				bottom: 0;
				height: 60px;
				width: 100%;
				background: rgba(25, 25, 25, 0.8);
				line-height: 100%;
			}
			.modify-handlerbar>.cancel-btn,
			.modify-handlerbar>.enter-btn {
				display: inline-block;
				width: 70px;
				line-height: 60px;
				color: $color-white;
			}
			.modify-handlerbar>.cancel-btn {
				float: left;
			}
			.modify-handlerbar>.enter-btn {
				float: right;
			}	
		}
	}
</style>

<template>
    <action-sheet 
        v-show="opened"
        class="avatar-modify"
        :fullParent="true"
        :position="'sideRight'">
        <div class="modify-page">
            <div class='modify-bg'>
                <div class='modify-wrap'>
                    <div class='modify-mask'></div>
                    <div class='modify-area' 
                        @touchstart.prevent="areaStart($event)"
                        @touchmove.prevent="areaMove($event)"
                        @touchend.prevent="areaEnd($event)"
                    ></div>
                    <div class='modify-mask'></div>
                    <div class='modify-handlerbar'>
                        <a class='cancel-btn' @click="closed()">取消</a>
                        <a class='enter-btn' @click="commited()">选取</a>
                    </div>
                </div>
                <img :src='this.opts.localImgData||this.opts.localId' class='modify-img' @load="imageLoader()"/>
            </div>
        </div>
     </action-sheet>
</template>

<script>
    import {popupWindowRouteMixin} from 'src/plugin/app/mixin/mixin.js';
    import ActionSheet from 'src/plugin/components/action-sheet/action-sheet.vue';

	export default {
        name: 'avatar-modify',
        mixins: [popupWindowRouteMixin],
		data(){
			return{
				top: 0,
				left: 0,
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 0,
				width: 0,
				height: 0,
				maxWidth: 0,
				areaWidth: 0,
				areaheight: 0,
				areaTopEdge: 0,
				areaBottomEdge: 0,
				editHeight: 0,
				$img: null,
                $eidtharea: null,
                opened: false,
                _resolve: null,
                opts: {
                    localId: '',
                    localImgData: '', //图片的base64(WKWebview)
                    serverId: '', //图片的serverId
                    promise: null,
                    resolve: null
                }
			}
		},
		methods: {
            show(options) {
                if(!(options === undefined || typeof options === 'object')) return

				this.opts = Object.assign({}, this.opts, options);

				this.opened = true;
				return new Promise((resolve) => {
                    this._resolve = resolve;
				});
			},
            closed(){
                this.opened = false;
            },
			commited(){
				this._resolve({
					x: this.left*-1,
					y: this.areaTopEdge-this.top,
					width: this.width,
					areaWidth: this.areaWidth,
					areaheight: this.areaheight
				});
				this.closed();
			},
			imageLoader() {
				var areah,
					imgh,
					imgw,
					$area = document.querySelectorAll(".modify-wrap")[0];
					
				this.$img = document.querySelectorAll(".modify-img")[0];
				
				imgw = this.$img.clientWidth;
				imgh = this.$img.clientHeight;
				areah = $area.offsetHeight;
				
				//初始化图片距离
				this.$img.style.top = (areah-imgh)/2+'px';
				this.$img.style.margin = 0+'px';
	
				//初始化编辑区域、遮罩高度
				document.querySelectorAll(".modify-area")[0].style.height=imgw+'px';
				document.querySelectorAll(".modify-mask")[0].style.height=(areah-imgw)/2+'px';
				document.querySelectorAll(".modify-mask")[1].style.height=(areah-imgw)/2+'px';
				
				//初始化数据
				this.$eidtharea = document.querySelectorAll(".modify-area")[0];
				this.width = this.$img.width; //图片宽度
				this.height = this.$img.height; //图片高度
				this.maxWidth = 2*this.width; //最大图片宽度
				this.areaWidth = this.$eidtharea.offsetWidth; //编辑区域宽度
				this.areaheight = this.$eidtharea.offsetHeight; //编辑区域高度
				this.areaTopEdge = this.$eidtharea.offsetTop; //编辑区域距顶部距离
				this.areaBottomEdge = document.querySelectorAll(".modify-mask")[1].offsetTop; //下层mask距顶部距离
				this.editHeight = document.querySelectorAll(".modify-wrap")[0].offsetHeight; //弹出层高度
				
				this.top = this.$img.offsetTop; //图片距顶部距离
				this.left = this.$img.offsetLeft; //图片距左边距离
			},
			areaStart(e){ //touchstart
				var touch1 = e.touches[0];
				this.x1 = touch1.pageX;
				this.y1 = touch1.pageY;
				
				var touch2 = e.touches[1];
				
				if(touch2){
					this.x2 = touch2.pageX;
					this.y2 = touch2.pageY;
				}
			},
			areaMove(e){ //touchmove
				var touch1 = e.touches[0],
					cx1 = touch1.pageX,
					cy1 = touch1.pageY;
				
				var touch2 = e.touches[1];
				if(touch2){//scale
					var	cx2 = touch2.pageX,
						cy2 = touch2.pageY;
					
					var scale1 = Math.sqrt((cx1-this.x1)*(cx1-this.x1)+(cy1-this.y1)*(cy1-this.y1));
					var scale2 = Math.sqrt((cx2-this.x2)*(cx2-this.x2)+(cy2-this.y2)*(cy2-this.y2));
					
					if(this.bePinch(cx1,cy1,cx2,cy2)){
						this.width = parseInt((scale1+scale2)*3)/1000*this.width+this.width;
						if(this.width >= 1080){
							this.width = 1080;
						}
						this.$img.style.width = this.width+'px';
						var cheight = this.$img.height;
						this.top -= (cheight-this.height)/2;
						this.height = cheight;
					}else{
						this.width = this.width-parseInt((scale1+scale2)*3)/1000*this.width;
						if(this.width < this.areaWidth){
							this.width = this.areaWidth;
						}
						this.$img.style.width = this.width+'px';
						var cheight = this.$img.height;
						this.top += (this.height-cheight)/2;
						this.height = cheight;
					}
					this.x1 = cx1;
					this.y1 = cy1;
					this.x2 = cx2;
					this.y2 = cy2;
					
					this.$img.style.top = this.top+'px';
					
				}else{//move
					this.moveImg(cx1,cy1);
				}
			},
			areaEnd(e){ //touchend
				if(this.top > this.areaTopEdge){
					this.top = this.areaTopEdge;
				}else if(this.top < (this.areaBottomEdge-this.height)){
					this.top = this.areaBottomEdge-this.height;
				}
				
				if(this.height < this.areaheight){
					this.top = (this.editHeight-this.height)/2
				}
				
				if(this.left > 0){
					this.left = 0;
				}else if(this.left < (this.areaWidth-this.width)){
					this.left = this.areaWidth-this.width;
				}
				this.$img.style.top = this.top+'px';
				this.$img.style.left = this.left+'px';
			},
			bePinch(cx1,cy1,cx2,cy2){ //处理放大图片
				var rx=Math.abs(this.x1-this.x2),
					ry=Math.abs(this.y1-this.y2),
					crx=Math.abs(cx1-cx2),
					cry=Math.abs(cy1-cy2);
				if(crx>rx||cry>ry){
					return true;
				}
			},
			moveImg(cx1,cy1){ //处理移动图片
				this.top=this.top+cy1-this.y1;
				this.left=this.left+cx1-this.x1;
				
				if(this.top>this.areaTopEdge){
					this.top=this.areaTopEdge;
				}else if(this.top<(this.areaBottomEdge-this.height)){
					this.top=this.areaBottomEdge-this.height;
				}
				
				if(this.left>0){
					this.left=0;
				}else if(this.left<(this.areaWidth-this.width)){
					this.left=this.areaWidth-this.width;
				}
				var pos={
					top:this.top,
					left:this.left<0?this.left:0
				}
				if(this.height<this.areaheight){
					delete pos.top;
				}
				
				this.$img.style.top=pos.top+'px';
				this.$img.style.left=pos.left+'px';
				this.x1=cx1;
				this.y1=cy1;
			}
        },
        components: {
            ActionSheet
        }
	}
</script>