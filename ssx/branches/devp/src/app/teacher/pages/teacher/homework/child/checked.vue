<!-- 发送作业->选择学员 -->
<style lang="scss" scoped>
	.hasHead {
		top: 60px;
	}
	.noData-temp {
		@include position-absolute;
	}
	.student-item {
		height: 60px;
		@include border-top;
		background: #ffffff;
		padding-left: 12px;
		padding-right: 12px;
		display: flex;
		align-items: center;
		>div:first-child {
			display: flex;
			align-items: center;
		}
		.is-send {
			color: #999999;
		}
		.photo {
			width: 40px;
			height: 40px;
            display: inline-block;
			border-radius: 100px;
			border: 1px solid #ffffff;
			margin-left: 16px;
			margin-right: 12px;
            background-color: #eef1f6;
            @include background-img;
		}
		.student-name {
			font-size: 15px;
			color: #333333 100%;
		}
	}
	.class-name {
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 16px;
		background: #eef1f6;
		@include ellipsis-single;
		padding-left: 12px;
		padding-right: 12px;
	}
	.icon-duoxuan,
	.icon-duoxuan-weixuanze {
		width: 18px;
		height: 18px;
	}
	.bottom-fixed-button {
		height: 48px;
		background: #fff;
		width: 100%;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 12px;
		padding: 12px;
		@include border-top;
		.flex-item-span {
			font-size: 15px;
			&:last-child {
				width: 24.533333%;
				min-width: 70px;
				height: 28px;
				line-height: 28px;
				color: #fff;
				background: rgba(30, 136, 245, 1);
				text-align: center;
				border-radius: 100px;
			}
		}
	}
</style>

<template>
	<action-sheet 
		class="action-sheet" 
		v-show="opened" 
		:data="list" 
        :position="'sideRight'" 
		:fullParent="true"
		@close="close">
		<div slot="header" class="class-name">{{Data.classname}}</div>
		<div v-for="(item, key) in list" 
			class="student-item" 
            :key="item.studentid"
			@click="chooseItem(item)">
            <svg class="icon icon-duoxuan-weixuanze" aria-hidden="true">
                <use :xlink:href="item.checked==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
            </svg>
            <span class="photo" :style="'background-image:url('+ item.photo +')'"></span>
            <span class="student-name">{{item.studentname}}</span>
		</div>
		<div slot="footer" class="bottom-fixed-button" v-if="list.length>0" >
			<span class="flex-item-span" @click="chooseAll">
                <svg class="icon icon-duoxuan-weixuanze" aria-hidden="true">
                	<use :xlink:href="isCheckedAll==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
                </svg>全选
            </span>
			<span class="flex-item-span" @click="submit">确定({{checkedTotal}})</span>
		</div>
		<!-- 空白页 -->
		<empty-page class="noData-temp" v-if="list.length == 0" :type="1001" text="该班级没有学员哦"></empty-page>
	</action-sheet>
</template>

<script>
	import EmptyPage from "teacher/components/common/empty-page/empty-page.vue";

	export default {
		name: "Checked",
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
				Data: {},
                list: [],
				isCheckedAll: false,
				checkedTotal: 0, // 已选择的数量
			}
		},
		methods: {
            dealItem(arr,flag){
				arr&&arr.forEach((item)=>{
					item.checked = flag;
				})
				return arr
			},
            chooseAll() { //全选学员
				this.isCheckedAll = !this.isCheckedAll;
				this.isCheckedAll ? (this.checkedTotal = this.list.length) : (this.checkedTotal = 0);
				this.list.forEach(item => this.isCheckedAll ? item.checked = true : item.checked = false);
            },
            chooseItem(item) { //选择学员
            	item.checked = !item.checked;
                item.checked ? this.checkedTotal++ : this.checkedTotal--;
            },
            submit() { //点击确定
                this.Data.checkedNum = 0;
				this.list.forEach((item)=>{
					item.checked&&this.Data.checkedNum++
				});
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
					if(this.echoData && (this.paraData.courseid==this.echoData.courseid)){
						this.Data = app.tool.clone(this.echoData);
					}else{
						this.Data = app.tool.clone(this.paraData);
					}
                	this.Data.homeworkstudentinfos.forEach(item=> {
						if(item.checked){
							this.checkedTotal++;	
						}
                	})
                    // 当前班级下的学员单独拿出来，为了方便
                    if(this.Data.homeworkstudentinfos){
                    	this.list = this.Data.homeworkstudentinfos;
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