
<style lang="scss" scoped>
	.multi-student-list-container {
        .as-body{
		    @include position-absolute(0, 0, 0, 0);
		    z-index: 999999;
		    .item{
		    	@include flex-between;
		    	padding:0 12px;
		    	color:$color-3;
		    	height: 60px;
		    	border-bottom:1px solid $color-assist-1;
		    	.item-lf{
		    		@include flex-center;
		    		.icon{
		    			font-size: 18px;
		    			margin-right:16px;
		    		}
		    		.photo{
		    			width: 40px;
		    			height: 40px;
		    			border:1px solid transparent;
		    			border-radius: 40px;
					    margin-right: 12px;
					    background-color: $color-assist-1;
					    @include background-img();
		    		}
		    	}
		    	.item-rt{
		    		color:$color-9;
		    	}
		    }
                        
        }
        .header{
        	height: 60px;
		    line-height: 60px;
		    text-align: center;
		    font-size: 16px;
		    background: $color-assist-1;
		    padding:0 12px;
		    @include ellipsis-single;
        }
		.footer {
            height: 48px;
            background: $color-white;
            @include flex-between;
            @include border-top;
            padding: 0 12px;
            .select{
                line-height: 1;
                .icon{
                    font-size: 18px;
                }
            }
            .btn{
                min-width: 70px;
                height: 28px;
                line-height: 28px;
                color: $color-white;
                background: $color-primary;
                text-align: center;
                border-radius: 28px;
            }
        }
	}
	.noData-temp,.loading {
		@include position-absolute;
	}
	
</style>

<template>
	<div class="multi-student-list-container" >
		<action-sheet 
            class="as-body"
			v-show="opened" 
			:data="list" 
			:fullParent="true"
			:position="'sideRight'" 
			@close="close">

			<div class="header" slot='header' v-if="list.length>0">
				{{Data.ClassName}}
			</div>

	        <div class="item" v-for="item in list" :key="item.StudentID" @click="chooseItem(item)">
	        	<div class="item-lf">
	        		<svg class="icon icon-duoxuan-weixuanze" aria-hidden="true">
						<use :xlink:href="item.checked?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
					</svg>
					<div class="photo" :style="'background-image:url('+ item.Photo +')'"></div>
					<div class="name">{{ item.StudentName }}</div>	
	        	</div>
	        	<div class="item-rt">
	        		<div v-if="item.IsSend == 1">已发送</div>
	        	</div>
	       		
	        </div>

			<!-- 全选，确定 -->
			<div class="footer" slot="footer" v-if="list.length>0">
                <div class="select" @click="chooseAll">
                    <svg class="icon icon-duoxuan" aria-hidden="true">
                        <use :xlink:href="isCheckedAll?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                    </svg>
                    全选
                </div>
                <div class="btn" @click="submit">
                    确定({{checkedTotal}})
                </div>
			</div>
            <!-- 空白页 -->
            <empty-page class="noData-temp" v-if="list.length==0" :type="1001" text="没有找到学员哦"></empty-page>
		</action-sheet>
		
	</div>
</template>

<script>
	import EmptyPage from "teacher/components/common/empty-page/empty-page.vue";
	export default {
		name: "multi-student-list",
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			opened: {},			
			paraData: {
				type: Object
			},
			echoData: {
				type: Object
			}
		},
		data() {
			return {
				Data:{},
				list:[],
				isCheckedAll:false,
				checkedTotal: 0, // 总数
			};
		},
		methods: {
			dealItem(arr,flag){
				arr&&arr.forEach((item)=>{
					item.checked = flag;
				})
				return arr
			},
			chooseAll() {
				if(this.isCheckedAll){
					this.list = this.dealItem(this.list,false);
					this.checkedTotal = 0;
				}else{
					this.list = this.dealItem(this.list,true);
					this.checkedTotal = this.list.length;
				}
				// watch 会改变全选勾选
			},
			chooseItem(item) {
                if(item.checked){
                    item.checked = false;
                    this.checkedTotal --;
                }else{
                    item.checked = true;
                    this.checkedTotal ++;
				}
				// watch 会改变全选勾选
			},
			submit(){
				this.Data.checkedNum = 0;
				this.list.forEach((item)=>{
					item.checked&&this.Data.checkedNum++
				});
				
				// 全选当前班级学员时，当前班级信息(this.Data)的checked置为true；反之false
				if(this.Data.Students.length&&(this.Data.checkedNum == this.Data.Students.length)){
					this.Data.checked = true;
				}else{
					this.Data.checked = false;
				}
				this.$emit('acceptStudentData',this.Data);
				this.close();
			}
		},
		watch: {
			opened(newVal) {
				if(newVal) {
					// 全选勾选和总数初始化
					this.checkedTotal = 0;
					// 当前班级信息 单选或多选
					if(this.echoData && (this.paraData.CourseID==this.echoData.CourseID)){
						this.Data = app.tool.clone(this.echoData);
					}else{
						this.Data = app.tool.clone(this.paraData);
					}
					
                	this.Data.Students.forEach((item)=>{
						if(item.checked){
							this.checkedTotal ++;	
						}
                	})
                    // 当前班级下的学员单独拿出来，为了方便
                    if(this.Data.Students){
                    	this.list = this.Data.Students;
                    }
				}
			},
			checkedTotal(newVal,oldVal){
				this.isCheckedAll = this.list.every(item => item.checked);
			}
		},
		components: {
			EmptyPage
		}
	};
</script>