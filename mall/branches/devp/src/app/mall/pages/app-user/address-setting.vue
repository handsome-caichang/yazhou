<!-- 地址管理界面 -->

<style lang="scss" scoped>
    .address-setting {
        @include position-absolute;
		background-color: $color-assist-1;
		.body{
			position: absolute;
			top: 0;
			left: 0;
			bottom: $h-2;
			width: 100%;
			.list{
				background-color: $color-white;
				.list-bd{
					padding: 0 15px;
					@include border-bottom;
					.info{
						font-size: $fs-big-s;
						color: $color-3-s;
						padding: 12px 0 12px 0;
						@include flex-between;
					}
					.desc{
						color: #888888;
						@include fs-lh(13);
						padding-bottom: 14px;
					}
				}
				.list-ft{
					color: #888888;
					padding: 0 15px;
					height: $h-2;
					line-height: $h-2;
					font-size: $fs-normal-s;
					@include flex-between;
					.default{
						color: $color-primary;
					}
					.def-icon{
						font-size: 20px;
						vertical-align:text-bottom;
					}
					.edit-icon{
						padding: 0 5px 0 13px;
						font-size: $fs-big-s;
						vertical-align: sub;
					}
					.link{
						display: inline-block;
						color: inherit;
					}
				}
				.void{
					background-color: $color-assist-1;
					height: $void-x;
				}
			}
			.noData_temp {
				@include position-absolute;
			}
		}
		.footer{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: $h-2;
			line-height: $h-2;
			text-align: center;
			color: $color-white;
			font-size: $fs-big-s;
			background-color: $color-primary;
			.link{
				display: block;
				color: inherit;
			}
		}
    }
    .scroller{
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="address-setting">
		<div class="body">
			<scroller-base class="scroller" :data="addressList">
				<div class="list" v-for="(item,index) in addressList">
					<div class="list-bd" @click="selectAddress(item)">
						<div class="info"><label>{{item.Contact}}</label>{{item.Mobile}}</div>
						<div class="desc">{{item.Address}}</div>
					</div>
					<div class="list-ft">
						<div :class="{default:item.IsDefault}" @click="setDefaultAddress(item.ID, index)">
							<svg class="icon def-icon" aria-hidden="true">
								<use :xlink:href="item.IsDefault?'#icon-danxuanxuanzhong':'#icon-danxuanweizhong'"></use>
							</svg>
							{{item.IsDefault?'默认地址':'设为默认'}}
						</div>
						<div>
							<span>
								<router-link :to="{path:'/addressEdit/0',query:item}" class='link'>
									<svg class="icon edit-icon" aria-hidden="true">
										<use xlink:href="#icon-bianji1"></use>
									</svg>编辑
								</router-link>
							</span>
							<span @click="deleteAddress(item)">
								<svg class="icon edit-icon" aria-hidden="true">
									<use xlink:href="#icon-shanchu4"></use>
								</svg>删除
							</span>
						</div>
					</div>
					<div class="void"></div>
				</div>
			</scroller-base>
			
			<empty-page class="noData_temp" :type="8" v-if="addressList.length === 0"></empty-page>
		</div>
		<div class="footer"><router-link to="/addressEdit/0" class="link">新增</router-link></div>
		<loading v-if='isLoading' :bgType='1'></loading>
	</div>
</template>

<script>
	import EmptyPage from 'common/empty-page/empty-page.vue'
	 
	import { getAddressList,setDefaultAddress,deleteAddress } from 'api/lc';
	
	export default{
		name:'address-setting',
        mixins: [app.mixin.shareMixin],
		data() {
            return {
            	isLoading: true,
               	wxTitle:"我的收货地址"
            }
        },
		computed: {
			...Vuex.mapState([
				'addressList',
				'orderAddress',
				'addrListRefreshFlag'
			]),
			flag(){ //从订单界面跳转过来->1,从收货地址管理跳转过来->0
				return Number.parseInt(this.$route.params.ptype);
			}
		},
        methods: {
        	...Vuex.mapMutations([
        		'set_addressList',
        		'set_orderAddress'
        	]),
			renderPage(bool) { //渲染页面：type为1的时候是删除了订单中已选的收货地址
				getAddressList().then(res => {
        			if (res.ErrorCode == app.errok) {
        				this.isLoading = false;
        				this.set_addressList(res.Data);
        				if (bool) {
        					this.setOrderAddress();
        				}
        			}
        		})
            },
            selectAddress(addr){ //选择收货地址
            	if (this.flag == 1) {
            		this.set_orderAddress(addr);
            		this.$router.back();
            	}
            },
        	deleteAddress(addr){ //删除地址
        		if (addr.IsDefault) {
        			app.toast('info','不允许删除默认地址。');
        			return;
        		}
        		app.confirm('确定要删除该地址吗？').then(res => {
  					if (res === true) {
  						this.isLoading = true;
		        		deleteAddress({
		        			AddressID: addr.ID
		        		}).then(res => {
		        			this.isLoading = false;
		        			if (res.ErrorCode ==  app.errok) {
		        				app.toast('success', '删除地址成功。');
		        				if ((this.flag==1)&&(addr.ID==this.orderAddress.ID)) {
		        					this.renderPage(true);
		        				}else{
		        					this.renderPage();
		        				}
		        			}else{
		        				app.toast('error', res.ErrorMsg);
		        			}
		        		});
  					}
  				});
        	},
        	setDefaultAddress(id, index){ //设置默认地址
        		this.isLoading = true;
        		setDefaultAddress({
        			AddressID: id
        		}).then(res => {
        			this.isLoading = false;
        			if (res.ErrorCode == app.errok) {
        				this.renderPage();
        			}else{
        				app.toast('error', res.ErrorMsg);
        			}
        		});
        	},
        	setOrderAddress(){
        		if (this.addressList.length>0) {
        			this.addressList.forEach((addr,index)=>{
        				if (addr.IsDefault) {
        					this.set_orderAddress(addr);
        				}
        			});
        		}else{
        			this.set_orderAddress({});
        		}
        	}
        },
        created(){
			this.renderPage();
        },
        watch: {
        	addrListRefreshFlag(newVal,oldVal){
        		this.isLoading = true;
        		this.renderPage();
        	}
        },
        components:{
        	EmptyPage
        }
	}
</script>