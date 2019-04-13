<!-- 喜欢列表界面 -->

<style lang="scss" scoped>
    .favorite-list {
        @include position-absolute;
		background-color: $color-assist-1;
		.header{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: $h-3;
			line-height: $h-3;
			background-color: $color-white;
			.header-l{
				display: inline-block;
				font-size: $fs-normal-x;
				padding: 0 15px;
				.icon{
					color: #CCCCCC;
					font-size: $fs-big;
					padding-right: 6px;
					&.active{
						color: $color-primary;
					}
				}
			}
			.header-r{
				padding: 0 15px;
				float: right;
				font-size: $fs-normal-s;
			}
		}
		.body{
			position: absolute;
			top: $h-3;
			left: 0;
			right: 0;
			bottom: 0;
			&.edit{
				bottom: $h-2;
			}
			.list-wrapper{
				padding: 10px 10px 0 10px;
			}
			.void{
				height: 9px;
	   			background-color: $color-assist-1;
			}
		}
		.footer{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: $h-2;
			@include flex-center;
			color: $color-white;
			font-size: $fs-big;
			background-color: $color-assist;
		}
		.noData_temp {
			@include position-absolute;
			background-color: $color-assist-1;
		}
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="favorite-list">
		<div class="header">
			<span class="header-l" v-show="isEdit" @click="selectAll()">
				<svg class="icon" aria-hidden="true" :class="{active:judgeSelectAll()}">
	    			<use :xlink:href="judgeSelectAll()?'#icon-danxuanxuanzhong':'#icon-danxuanweixuanzhong'"></use>
	    		</svg>全选
			</span>
			<span class="header-r" @click="toggleEdit">{{isEdit?'完成':'编辑'}}</span>
		</div>

		<div class="body" :class="{'edit': isEdit}">
			<scroller-load class="scroller"
				@loadData="renderData" 
				:data="sData" 
				:pagingOption="pagingOption" 
				ref="pagingScroller">
				<div class="list-wrapper">
					<div v-for="item in list" class="list-item">
						<shop-row :type="item.type" :data="item" :isEdit="isEdit" @select="selectProduct" :sList="selectList"></shop-row>
						<div class="void"></div>
					</div>
				</div>
			</scroller-load>
		</div>

		<div class="footer" v-show="isEdit" @click="deletePro">删除</div>
		
		<empty-page class="noData_temp" :type="7" v-if="list.length === 0"></empty-page>
		
		<loading v-if="isLoading"></loading>
	</div>
</template>

<script>
	import ShopRow from './children/shop-row/shop-row.vue';
    import EmptyPage from 'common/empty-page/empty-page.vue';
     
    import { getFavorites,deleteFavorites } from 'api/lc';
	
	export default{
		name:'favorite-list',
        mixins: [app.mixin.shareMixin],
		data() {
		    return {
		    	pagingOption: {
		    		api: getFavorites,
		            params: {}
		        },
		        list: [],
		        selectList: [],
		        isLoading: true,
		        isEdit: false,
		   		wxTitle:"喜欢"
		    }
		},
		computed: {
			sData(){
				return{
					isEdit: this.isEdit,
					list: this.list
				}
			},
			ids(){
				return this.selectList.map(pro => {
					return pro.ID
				})
			}
        },
        methods: {
        	...Vuex.mapMutations([
	  			'set_cartListRefreshFlag'
	  		]),
        	renderData(ajaxPromise) {
                ajaxPromise.then(res => {
                	this.isLoading = false;
                    if (res.ErrorCode == app.errok) {
                    	if (res.PageIndex === 1) {
                    		this.list = [];
                    	} 
                        this.list = this.list.concat(res.Data);
                    }
                })
        	},
        	toggleEdit(){ //编辑/完成
        		this.isEdit = !this.isEdit;
        		if (!this.isEdit) {
        			this.selectList = []
        		}
        	},
        	judgeSelectAll(){ //判断是否全选
        		if (this.list.length>0) {
        			return this.list.length === this.selectList.length;
        		}
        		return false;
        	},
        	selectAll(){ //全选
        		if (this.list.length>0) {
        			this.selectList = this.list.length === this.selectList.length ? [] : app.tool.clone(this.list);  
        		}
        	},
        	selectProduct(pro){ //单选商品
        		let index = this.ids.indexOf(pro.ID);
        		
        		if (index == -1) {
        			this.selectList.push(app.tool.clone(pro));
        		}else{
        			this.selectList.splice(index,1);
        		}
        	},
        	deletePro(){ //取消喜欢
        		if (this.ids.length>0) {
        			app.confirm('确定取消收藏吗？').then(res => {
	  					if (res === true) {
	  						deleteFavorites({
	  							IDs: this.ids
	  						}).then(res => {
	  							if (res.ErrorCode == app.errok) {
	  								app.toast('success', '取消收藏成功。');
	  								this.list = [];
	  								this.selectList = [];
	  								this.isEdit = false;
	  								this.$refs.pagingScroller.pagingRefresh({});
			                        this.set_cartListRefreshFlag();
	  							}
	  						});
	  					}
	  				});
        		}
        	}
        },
        components:{
        	ShopRow,
        	EmptyPage
        }
	}
</script>