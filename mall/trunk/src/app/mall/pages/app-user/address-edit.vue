<!-- 地址新增界面  -->

<style lang="scss" scoped>
    
    

    .address-edit {
        @include position-absolute;
		background-color: $color-assist-1;
		font-size: $fs-normal-x;
		.item{
			display: block;
			background-color: $color-white;
			@include border-bottom;
			&.flex{
				@include flex-center;
			}
			.title-1{
				height: 45px;
				line-height: 45px;
				padding-left: 15px;
			}
			.title-2{
				width: 80px;
    			flex: 1 0 80px;
				height: $h-1;
				line-height: $h-1;
				padding-left: 15px;
			}
			input{
				height: 49px;
				color: $color-3;
				&.pb{
					height: 35px;
				}
			}
		}
		.operate{
			height: $h-1;
			line-height: $h-1;
			margin-top: $void;
			background-color: $color-white;
			&.btn{
				text-align: center;
				font-size: $fs-big-s;
				color: $color-primary;
			}
		}
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="address-edit">
		<scroller-base class="scroller">
			<label class="item">
				<div class="title-1">详细地址</div>
				<input type="text" class="pb" v-model="addr.Address"/>
			</label>
			<label class="item flex">
				<div class="title-2">收货人</div>
				<input type="text" v-model="addr.Contact"/>
			</label>
			<label class="item flex">
				<!-- <div class="title-2">联系电话</div> -->
				<div class="title-2">手机号码</div>
				<input type="tel" v-model="addr.Mobile"/>
			</label>
			<div class="operate btn">
				<div @click="addressSubmit">保存</div>
			</div>
		</scroller-base>
		<loading v-if='isLoading' :bgType='1'></loading>
	</div>
</template>

<script>
	 
	import { editAddress } from 'api/lc';
 	
 	const phoneReg = /^1\d{10}$/;
 	
	export default{
		name:'address-edit',
        data() {
            return {
            	defaultAddr: {
					Contact: '', //联系人
					Mobile: '', //联系电话
					Address: '', //地址
					IsDefault: false //是否设为默认
            	},
            	addr: {},
            	wxTitle: "地址编辑",
            	isLoading: false
            }
        },
        computed: {
        	...Vuex.mapState([
        		'addressList'
        	]),
        	flag(){ //从订单界面跳转过来->1,从收货地址管理跳转过来->0
				return Number.parseInt(this.$route.params.etype);
			}
        },
        methods: {
        	...Vuex.mapMutations([
        		'set_orderAddress',
        		'set_addrListRefreshFlag'
        	]),
        	getAddr() {
        		this.addr = {
        			...this.defaultAddr,
        			...this.$route.query
        		}
        	},
        	addressSubmit(){
        		if (this._baseValidate()) {
        			this.isLoading = true;
					if (this.addr.ID) {
						this.addr.AddressID = this.addr.ID;
					}
					if (this.addressList.length === 0) { //从未设置过收货地址->新增时设置为默认收货地址
						this.addr.IsDefault = true;
					}
					this.addr.Contact = this.addr.Contact.trim();
					this.addr.Mobile = this.addr.Mobile.trim();
					this.addr.Address = this.addr.Address.trim();
	        		editAddress(this.addr).then(res => {
        				this.isLoading = false;
	        			if (res.ErrorCode == app.errok) {
	        				this.set_addrListRefreshFlag();
	        				if (this.flag === 1) { //从订单界面新增
	        					let newAddr = app.tool.clone(this.addr);
	        					newAddr.ID = res.Data;
	        					this.set_orderAddress(newAddr);
	        				}
	        				this.$router.back();
	        			}else{
	        				app.toast('error', res.ErrorMsg);
	        			}
	        		});
        		}
        	},
        	_baseValidate() {
        		console.log("Aaaa");
        		if (!this.addr.Address.trim()) {
					app.toast('info', '详细地址不能为空。');
        			return;
        		}
        		if (!this.addr.Contact.trim()) {
					app.toast('info', '收货人不能为空。');
        			return;
        		}
        		console.log(this.addr.Mobile);
        		if (!this.addr.Mobile) {
        			app.toast('info','手机号不能为空。');
        			return;
        		}else if(!app.telReg.test(this.addr.Mobile)){
        			app.toast('info','手机号码格式不正确，请重新输入。');
        			return;
        		}
        		/*if(!this.addr.Mobile.trim()) {
					app.toast('info','联系电话不能为空。');
        			return;
        		}*/
        		return true;
        	},
        },
        created(){
			this.getAddr();
        }
	}
</script>