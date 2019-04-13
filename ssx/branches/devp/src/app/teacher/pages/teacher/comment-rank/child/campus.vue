 <!--家长排名-选择校区-多选-->
<style lang="scss" scoped>
	
	
	.to-detail {
		@include border-bottom;
		background: #ffffff;
		padding-left: 12px;
		padding-right: 12px;
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left-div {
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			max-width: 95%;
			.campusName {
				@include ellipsis-single;
			}
			.reads {
				margin-left: 5px;
				margin-right: 5px;
				.strong {
					color: rgba(27, 112, 242, 1);
				}
			}
			.campus {
				color: rgba(139, 87, 42, 1);
				font-size: 12px;
				@include ellipsis-single;
			}
		}
		.right-div {
			width: 20px;
			height: 100%;
			text-align: right;
			line-height: 44px;
		}
	}
	.icon-duoxuan {
		min-width: 18px;
		min-height: 18px;
		margin-right: 10px;
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
				// width: 24.533333%;
				// min-width: 70px;
				height: 28px;
				line-height: 28px;
				color: #fff;
				background: rgba(30, 136, 245, 1);
				text-align: center;
				border-radius: 100px;
                padding: 0 10px;
			}
		}
	}
	.action-sheet {
		@include position-absolute(0, 0, 0, 0);
		z-index: 2;
	}
</style>

<template>
	<div class="Campus-container">
		<action-sheet 
			class="action-sheet" 
			v-show="opened" 
			:position="'sideRight'" 
			@close="closeCampusAction" 
			:data="tempList" 
			:scrollerStyle="scrollerStyle" 
			ref="campusAS">
			<div @click="chooseCampus(item, key)" class="to-detail" v-for="(item, key) in tempList" :key="item.ID">
				<div class="left-div">
					<svg class="icon icon-duoxuan" aria-hidden="true">
						<use :xlink:href="item.checked&&item.checked==true?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
					</svg>
					<span class="campusName">{{item.Name}}</span>
				</div>
			</div>

			<div slot="footer" class="bottom-fixed-button">
				<span class="flex-item-span" @click="chooseAll">
					<svg class="icon icon-duoxuan" aria-hidden="true">
						<use :xlink:href="isAll==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
					</svg>全选
				</span>
				<span class="flex-item-span" @click="ok">确定({{counter}})</span>
			</div>
		</action-sheet>
	</div>
</template>

<script>

export default {
	name: "campus-list",
	mixins: [app.mixin.popupWindowRouteMixin],
  props: {
    opened: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      list: app.sysInfo.CampusList,
      tempListClone: [], //记录确定之前状态的tempList(初始克隆出来)
      tempList: [],
      isAll: false, // 是否选中所有
      counter: 0, // 总数
      scrollerStyle: {
        background: "#eef1f6"
      }
    };
  },
  methods: {
    // 选择整个班级的''
    chooseCampus(item, key) {
      let _status = !this.tempList[key].checked;
      _status ? this.counter++ 
          : this.counter > 0 
              ? this.counter-- : this.counter = 0;
      // 选中的状态
      this.$set(this.tempList[key], 'checked', _status);
        
      // 是否全选了
      this.isAll = this.tempList.every(item => item.checked);
    },
    closeCampusAction() {
      this.$emit("update:opened", false);
    },
    ok() {
      this.closeCampusAction();
      // 确定后保存状态
      this.tempListClone = app.tool.clone(this.tempList);
      // 提交到父组件的状态
      let _arr = this.tempList.filter(item => {
          return item.checked && item.checked == true;
      });
      let _isAll = _arr.length == this.tempList.length ? true : false;
      this.$emit("getCampus", _arr, _isAll);
    },
    chooseAll() {
      // 切换全选状态
      this.isAll = !this.isAll;
      this.isAll ? this.counter = this.tempList.length : this.counter = 0;
      // // 全选的数量
      Object.keys(this.tempList).forEach(key => {
        this.isAll ? this.tempList[key].checked = true : this.tempList[key].checked = false;
      });
    }
  },
  watch: {
    // // 监听父组件传来的值
    opened: function(newVal) {
      this.tempListClone.length == 0 ? this.tempList = app.tool.clone(this.list) : this.tempList = app.tool.clone(this.tempListClone);
      this.counter = this.tempList.filter(item => {
          return item.checked && item.checked == true;
      }).length;
      this.counter == this.tempList.length ? this.isAll = true : this.isAll = false;
    }
  },
  components: {
    
  }
};
</script>
