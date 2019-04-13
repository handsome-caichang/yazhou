<!-- 选择整单优惠 -->

<style lang="scss" scoped>
	
	
	
	.order-scheme{
		@include position-absolute;
        z-index: 9999;
        overflow: hidden;
        width: 100%;
		.header{
			text-align: center;
			height: 56px;
			line-height: 56px;
		}
		ul{
			padding: 0 $edge;
			line-height: 1;
			.as-row {
				min-height: 50px;
				color: $color-3-s;
				padding: 0 $edge/2;
				@include border-bottom($color-border-1);
				.title{
					width: 100%;
			       	padding: 10px 0;
			        font-size: $fs-normal;
			        // @include ellipsis-single;
		            // @include flex-between;
		            display: flex;
		            .scheme-name {
		            	flex: 1;
		            	margin-right: 10px;
		            	word-break: break-word;
		            	line-height: 18px;
		            }
		            .no-sheme {
		            	flex: 1;
		            }
		            .icon-wrapper {
		            	width: 23px;
			            .icon{
			            	font-size: $fs-big;
			            	color: #CCCCCC;
			            }            
		            }
			        &.active {
			            color: $color-primary;
			        }
				}
				.content{
					font-size: $fs-small-x;
					padding-bottom: 10px;
					color: $color-9;
				}
				.item{
					display: flex;
					padding-bottom: $edge;
					font-size: $fs-normal-s;
					label{
						display: inline-block;
						width: 80px;
						line-height: 30px;
					}
					input{
						flex: 1;
						height: 30px;
						background-color: $color-assist-1;
					}
					::-webkit-input-placeholder {
						color: $color-9;
					}
				}
				&:last-child{
					border-bottom: none;
				}
				&.disable{
					.title,
					.content{
						color: #CCCCCC !important;
					}
				}
		    }
		}
		.footer{
	    	height: $h-2;
	    	line-height: $h-2;
	    	text-align: center;
	    	color: $color-white;
	    	font-size: $fs-big-s;
	    	background: $color-primary;
	    }
	}
</style>

<template>
	<action-sheet 
		ref="orderScheme"
		v-show="opened"
		@close="close"
		:data="renderData"
		class="order-scheme"
		v-if="schemes">
		
		<div class="header" slot="header">优惠活动</div>
		
		<ul>
            <li class="as-row" 
            	:class="{disable:!item.IsCanUse}" 
            	v-for="(item,index) in schemes">
            	<div @click="selectSchemeAction(item,1)">
	                <div class="title">
	               	 	<!-- <span>{{item.Name}}</span> -->
	               	 	<div class="scheme-name">{{item.Name}}</div>
	               	 	<div class="icon-wrapper">
			                <svg class="icon" aria-hidden="true">
			                	<use v-if="item.IsCanUse" :xlink:href="judgeSelect(item.ID,curScheme)?'#icon-xuanzhong':'#icon-danxuanweixuanzhong'"></use>
			                    <use v-if="!item.IsCanUse" xlink:href="#icon-Oval"></use>
			                </svg>
	               	 	</div>
	                </div>
	                <div class="content">{{item.Conditions.join('  ')}}</div>
            	</div>
               	<div v-if="item.HasIntroducerCondition&&judgeSelect(item.ID,curScheme)">
               		<div class="item"><label>介绍人姓名：</label><input placeholder="请输入介绍人姓名" type="text" v-model="IntroducerFullName"/></div>
               		<div class="item"><label>介绍人电话：</label><input placeholder="请输入介绍人手机号码" type="tel" v-model="IntroducerMobile"/></div>
               	</div>
            </li>
            <li class="as-row" @click="selectSchemeAction(null,0)">
            	<div class="title">
	            	<div class="no-sheme">不使用优惠</div>
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
			schemes: { //整单优惠列表
				type: Array
			}
		},
		computed: {
			renderData(){ //刷新滚动条
				return {
					schemes: this.schemes,
					clickNum: this.clickNum
				}
			}
		},
		data(){
			return{
				curScheme: null,
				IntroducerFullName: '',
				IntroducerMobile: '',
				clickNum: 0
			}
		},
		methods:{
			judgeSelect(id,scheme){ //判断选中
				if (scheme) {
					return id == scheme.ID;
				}
				return false;
			},
			setDefaultScheme(scheme,name,mobile){ //设置已选的整单优惠
				this.curScheme = scheme;
				this.IntroducerFullName = name ? name : '';
				this.IntroducerMobile = mobile ? mobile : '';
				this.clickNum++;
			},
			selectSchemeAction(obj,flag){ //选择
				if (flag==1&&!obj.IsCanUse) {
					return;
				}
				if ((this.curScheme&&obj&&this.curScheme.ID==obj.ID)||(!this.curScheme&&!obj)) {
					return;
				}
				this.IntroducerFullName = '';
				this.IntroducerMobile = '';
				this.curScheme = obj;
				this.clickNum++;
			},
			confirmScheme(){ //关闭
				if (this.curScheme&&this.curScheme.HasIntroducerCondition) {//如果有选择了介绍人
					if (!this.IntroducerFullName) {
						app.toast('info', '请填写介绍人姓名。');
						return;
					}
					if (!this.IntroducerMobile) {
						app.toast('info', '请填写介绍人电话。');
						return;
					}else if (!app.telReg.test(this.IntroducerMobile)) {
						app.toast('info', '介绍人电话格式不正确，请重新输入。');
						return;
					}
				}
				this.$emit('closeScheme',
					this.curScheme,
					this.IntroducerFullName,
					this.IntroducerMobile
				);
			}
		},
		components: {
			
		},
		watch: {
			// 刷新对输入框表单元素进行input的监听,以做到在ipnut输入内容时,可以动态的滚动到相应的表单元素;
			clickNum() {
				this.$nextTick(() => {
					this.$refs.orderScheme.$refs.scroller.refreshFormInputlisten()
				})
			}
		}
	}
</script>