<!-- 班级、课程筛选组件 -->

<style lang="scss" scoped>
	
	
	
	.sort-wrap {
		padding: 10px 0;
		.sort{
		    .level1{
		        position: relative;
		        padding: 0 $edge;
		        height: $h-3;
		        line-height: $h-3;
		        font-size: $fs-normal-x;
		        @include flex-between;
		        .level1-name{
		            position: relative;
		            padding-left: 8px;
		        	color: $color-black;
		        	@include ellipsis-single;
		            &:before {
		                content: "";
		                @include position-absolute(50%, false, false, 0);
		                transform: translate(0, -50%);
		                height: $fs-big;
		                width: 4px;
		                background-color: $color-primary;
		            }
		        }
		        &.active {
		        	.level1-name {
		        		color: $color-primary;		        		
		        	}
		        }
		    }
		    .content-body{
		        .level2 {
		        	height: $h-3;
		        	line-height: $h-3;
		        	padding-left: $edge + 8px;
		        	padding-right: $edge;
		            font-size: $fs-normal;
		            color: $color-black;
		            @include ellipsis-single;
		            &.active {
		            	color: $color-primary;
		            }
		        }
		        .content {
		            padding: 0 $edge/2;
		            display: flex;
		            flex-wrap: wrap;
		            .item-wrap {
		                padding: $edge/2;
		                width: 25%;
		                overflow: hidden;
		                .item {
		                    display: block;
		                    padding: 0 4px;
		                    height: $h-4;
		                    line-height: $h-4;
		                    text-align: center;
		                    color: $color-3;
		                    background-color: $color-assist-1;
		                    border-radius: 5px;
		                    font-size: $fs-normal-s;
		                    @include ellipsis-single;
							&.active {
								background-color: $color-primary;
								color: $color-white;
							}
		                }
		            }
		        }
		    }
		}
	}
</style>

<template>
	<action-sheet
		v-show="opened"
		@close="close" 
		position="top" 
		:scrollerStyle="scrollerStyle"
		:data="sortData">

		<div class="sort-wrap">
            <div class="sort" v-for="item in sort">
                <div class="level1" 
                	:class="{active: item.ID === selected.TypeID}" 
                	@click="changeSelected(item.ID)">
                    <div class="level1-name">{{item.Name}}</div>
                </div>

                <div class="content-body">
                    <div class="content" v-if="item.ChildrenLevel==2">
                        <div class="item-wrap" v-for="child in item.Children">
                            <div class="item" 
                            	:class="{active: child.ID === selected.TypeID}" 
                            	@click="changeSelected(child.ID)">
                            	{{child.Name}}
                        	</div>
                        </div>
                    </div>
                </div>
                    
                <div class="content-body" v-if="item.ChildrenLevel==3" v-for="child in item.Children">
                    <div class="level2" 
                    	:class="{active: child.ID === selected.TypeID}"
                    	@click="changeSelected(child.ID)">
                    	{{child.Name}}
                	</div>
                    <div class="content">
                        <div class="item-wrap" v-for="subchild in child.Children">
                            <div class="item" 
                            	:class="{active: subchild.ID === selected.TypeID}" 
                        		@click="changeSelected(subchild.ID)">
                        		{{subchild.Name}}
                    		</div>
                        </div>
                    </div>
                </div>
            </div>
	    </div>
	</action-sheet>
</template>

<script>
	 
	import {getqueryparamters} from 'api/jie.js';

	export default {
	  	name: 'goods-sort-filter',
	  	mixins: [app.mixin.popupWindowRouteMixin],
	  	props: {
	  		opened: {
	  			type: Boolean,
	  			default: true
	  		}
	  	},
	  	data () {
		    return {
		    	// 用于保存各种筛选项
		    	sort: null,
		    	// 已选的筛选结果
		    	selected: {
		    		Type: [2, 4],
		    		TypeID: ""
		    	}
		    }
	  	},
	  	computed: {
	  	    ...Vuex.mapState(['curCampus']),
	  	    // actionsheet样式
	  	    scrollerStyle() {
	  	    	return {
	  	    		"max-height": "75vh"
	  	    	}
	  	    },
	  	    sortData() {
	  	    	return {
	  	    		opened: this.opened,
	  	    		sort: this.sort
	  	    	}
	  	    }
	  	},
	  	methods: {
	  		changeSelected(id) {
	  			this.selected.TypeID = this.selected.TypeID == id ? '' : id;
	  			this.emitEvent();
	  			this.close();
	  		},
	  		emitEvent() {
	  			this.$emit('changeFilter', this.selected);
	  		},
	  		getSortTree() {
	  			// 获取分类树
	  			getqueryparamters(this.selected).then(res => {
	  			    if (res.ErrorCode === app.errok) {
	  			        this.sort = res.Data.TypeTree;
	  			    }
	  			})
	  		}
	  	},
	  	created() {
	  		this.getSortTree();
	  	},
	  	watch: {
	  	    // 观察当前选中校区的改变, 并重置筛选结果, 
	  	    // 同时触发筛选结果改变事件, 从而使父页面的列表页重渲;
	  	    curCampus(newCampus, oldCampus) {
	  	        // 重置筛选条件
      	        this.selected = {
      	            Type: [2, 4],
		    		TypeID: "",
      	        }
	  	        this.emitEvent();
	  	        this.getSortTree();
	  	    }
	  	},
	  	components: {
	  	}
	};
</script>

