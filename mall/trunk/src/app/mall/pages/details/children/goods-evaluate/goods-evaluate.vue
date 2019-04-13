<!--  -->
<style lang="scss" scoped>



.goods-evaluate {
  @include position-absolute(0, 0, false, false);
  bottom: 50px;
  width: 100%;
  height: 100%;
  background-color: #EEF1F6;
  z-index: 100;
  .scroller {
    background-color: $color-white;
    width: 100%;
    height: 100%;
		@include position-absolute(10px);
  }
  .item {
    padding: 20px 25px 17px 12px;
    @include border-bottom;
    background-color: $color-white;
    .item-heard {
      @include flex-between;
      .item-left {
        width: 36px;
        height: 36px;
        .head-img {
          @include background-img(false, cover);
          height: 100%;
          background-color: $color-assist-1;
          border-radius: 100%;
        }
      }
      .item-right {
        flex: 1;
        margin-left: 10px;
        .name {
          @include flex-between;
          .UserName {
            height: $fs-normal-x;
            line-height: $fs-normal-x;
            font-size: $fs-normal-x;
            color: $color-3;
          }
          .time {
            color: $color-9;
            font-size: $fs-small-x;
          }
        }
      }
    }
    .item-content {
      padding-left: 6px;
      margin-top: $fs-normal-x;
      font-size: $fs-normal;
      color: $color-9;
      line-height: $fs-big-x;
    }
    .item-reply {
      padding: 21px 7px 10px 7px;
      margin-top: $fs-normal-x;
      font-size: $fs-normal;
      line-height: $fs-big-x;
      background-color: $color-assist-1;
      border-radius: 8px;
      color: $color-6;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: -10px;
        left: 45px;
        width: 0;
        height: 0;
        border-width: 0 10px 10px;
        border-style: solid;
        border-color: transparent transparent $color-assist-1; /*透明 透明  灰*/
      }
    }
  }
  .noData_temp {
    @include position-absolute;
  }
}
.as-slide-enter-active,
.as-slide-leave-active {
  transition: all $duration $timing;
}
.as-slide-enter,
.as-slide-leave-active {
  transform: translate3d(100%, 0, 0);
}
</style>

<template>
 <transition name="as-slide">
	<div class="goods-evaluate">
		<scroller-load 
      ref="scroller"
			:data="ratingsList"
			@loadData="renderData"
			:pagingOption="pagingOption"
			class="scroller">
			<div>
				<div class="item" v-for="(item, index) in ratingsList" :key="index">
					<div class="item-heard">
						<div class="item-left">
							<div class="head-img" :style="'background-image:url('+ item.UserImage + ')'"></div>
						</div>
						<div class="item-right">
							<div class="name">
								<span class="UserName">{{item.UserName}}</span>
								<span class="time">{{item.Date|formatDatetime('yyyy-MM-dd')}}</span>
							</div>
						</div>
					</div>
					<div class="item-content">{{item.Comment}}</div>
					<div class="item-reply" v-if="item.Reply">{{item.Reply}}</div>
				</div>
			</div>
		</scroller-load>
		<empty-page class="noData_temp" :type="2" v-if="ratingsList.length === 0"></empty-page>
	</div>
 </transition>
</template>

<script>
import { getRatings } from "api/yy";
import EmptyPage from "common/empty-page/empty-page.vue";

export default {
  mixins: [app.mixin.popupWindowRouteMixin],
  name: "goods-evaluate",
  props: {
    refeshStr: {
      type: String
    },
    opened: {
      type: Boolean
    }
  },
  data() {
    return {
      ratingsList: [],
      pagingOption: {
        // 列表页请求地址
        api: getRatings,
        params: {
          ProductID: this.$route.params.ID
        }
      }
    };
  },
  methods: {
    renderData(ajaxPromise) {
      ajaxPromise.then(res => {
        this.isLoading = false;
        if (res.ErrorCode == app.errok) {
          if (res.PageIndex === 1) {
            this.ratingsList = [];
          }
          this.ratingsList = this.ratingsList.concat(res.Data);
        }
      });
    }
  },
  watch: {
    opened(newValue) {
       if (newValue) {
        app.tool.setDocTitle("全部评价");
        this.$refs.scroller.scroller && this.$refs.scroller.scroller.refresh();
      }else {
        app.tool.setDocTitle("商品详情");
      }
    }
  },
  components: {
    EmptyPage
  }
};
</script>