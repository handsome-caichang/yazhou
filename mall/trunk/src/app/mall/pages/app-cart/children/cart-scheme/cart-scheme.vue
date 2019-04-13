<!-- 选择单科优惠 -->
<style lang="scss" scoped>
	
	
	
	.cart-scheme{
		@include position-absolute;
        z-index: 9999;
        overflow: hidden;
		.header{
			text-align: center;
			height: 56px;
			line-height: 56px;
		}
		ul{
			width: 100%;
			padding: 0 $edge;
			line-height: 1;
			.as-item {
				min-height: 50px;
				padding: 0 $edge/2;
				@include border-bottom($color-border-1);
				.item-title{
			       	padding: 10px 0;
			        color: $color-3-s;
			        font-size: $fs-normal;
			        // @include ellipsis-single;
		            // @include flex-between;
		            display: flex;
		            .item-name {
		            	flex: 1;
		            	line-height: 18px;
		            	word-break: break-word;
		            }
		            .icon-wrapper {
		            	@include flex-center;
		            	width: 23px;
			            .icon{
			            	font-size: $fs-big;
			            	color: #CCCCCC;
			            }            
				        &.active {
				            color: $color-primary;
				        }
		            }
				}
				.item-content{
					font-size: $fs-small-x;
					padding-bottom: 10px;
					color: $color-9;
				}
				&.disable{
					.item-title,
					.item-content{
						color: #CCCCCC !important;
					}
				}
				&:last-child{
					border-bottom: none;
				}
		    }
		}
		.footer{
	    	height: $h-2;
	    	line-height: $h-2;
	    	text-align: center;
	    	font-size: $fs-big-s;
	    	background: $color-primary;
	    	color: $color-white;
	    }
	}
</style>

<template>
	<action-sheet 
		v-show="opened"
		:data="product"
		@close="close"
		class="cart-scheme" 
		v-if="product">
		
		<div class="header" slot="header">优惠活动</div>
		
		<ul>
            <li class="as-item" :class="{disable:!item.IsCanUse}" @click="selectSchemeAction(item,1)" v-for="(item,index) in product.Schemes">
               <div class="item-title">
               	 	<div class="item-name">{{item.Name}}</div>
               	 	<div class="icon-wrapper">
		                <svg class="icon" aria-hidden="true">
		                    <use :xlink:href="judgeSelect(item.ID,curScheme)?'#icon-xuanzhong':'#icon-danxuanweixuanzhong'" v-if="item.IsCanUse"></use>
		                    <use xlink:href="#icon-Oval" v-if="!item.IsCanUse"></use>
		                </svg>
               	 	</div>
               </div>
               <div class="item-content">{{item.Conditions.join('  ')}}</div>
            </li>
            <li class="as-item" @click="selectSchemeAction(null,0)">
            	<div class="item-title">
	            	<div class="item-name">不使用优惠</div>
	            	<div class="icon-wrapper">
		            	<svg class="icon" aria-hidden="true">
		                    <use :xlink:href="!curScheme?'#icon-xuanzhong':'#icon-danxuanweixuanzhong'"></use>
		                </svg>
	            	</div>
            	</div>
            </li>
        </ul>
        
        <div class="footer" slot="footer" @click="confirmScheme">确定</div>
	</action-sheet>
</template>

<script>
	
	export default{
		mixins: [app.mixin.popupWindowRouteMixin],
		props:{
			opened: {},
			product: {
				type: Object
			},
			campusId: {
				type: String
			}
		},
		data(){
			return{
				curScheme: null
			}
		},
		methods:{
			judgeSelect(id,scheme){
				if (scheme) {
					return id == scheme.ID;
				}
				return false;
			},
			setDefaultScheme(scheme){ //设置已选的优惠
				this.curScheme = scheme;
			},
			selectSchemeAction(obj,flag){
				if (flag==1 && !obj.IsCanUse) {
					return;
				}
				this.curScheme = flag==1?obj:null;
			},
			confirmScheme(){
				this.close();
				if (!this.curScheme && !this.product.ChooseScheme) {
					return;
				}
				if (this.curScheme && this.product.ChooseScheme && (this.product.ChooseScheme.ID==this.curScheme.ID)) {
					return;
				}
				this.$emit('selectScheme',
					this.campusId,
					this.product,
					this.curScheme
				);
			}
		},
		components: {
		}
	}
</script>