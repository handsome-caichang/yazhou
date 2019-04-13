<!--  -->
<style lang="scss" scoped>



.goods-issue {
  @include position-absolute(0, 0, false, false);
  bottom: 50px;
  width: 100%;
  height: 100%;
  background-color: #EEF1F6;
  z-index: 99;
  .scroller {
    background-color: $color-white;
    width: 100%;
    @include position-absolute(10px,0, 50px);
    .item {
      @include border-bottom;
      background-color: $color-white;
      padding: 21px 17px 20px 12px;
      .question {
        display: flex;
        .question-icon {
          .icon {
            font-size: 25px;
          }
        }
        .question-content {
          font-size: $fs-normal-x;
          color: $color-3;
          margin-left: $fs-small-x;
          line-height: 20px;
        }
      }
      .answer {
        margin: 12px 0 0 37px;
        padding: 9px 11px 12px 12px;
        display: flex;
        background-color: $color-assist-1;
        border-radius: 6px;
        .answer-icon {
          .icon {
            font-size: 25px;
          }
        }
        .answer-content {
          font-size: $fs-normal;
          color: $color-6;
          line-height: 21px;
          margin-left: 7px;
        }
      }
    }
  }
  .go-question {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgba(30, 136, 245, 1);
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
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
		<div class="goods-issue">
			<scroller-load
				ref="scroller"
				class="scroller"
				:data="questList"
				@loadData="renderData"
				:pagingOption="pagingOption"
				>
				<div>
					<div class="item" v-for="(item,index) in questList" :key="index">
						<div class="question"  v-if="item.Question">
							<span class="question-icon">
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-wen"></use>
								</svg>
							</span>
							<div class="question-content">{{item.Question}}</div>
						</div>
						<div class="answer" v-if="item.Answer">
							<span class="answer-icon">
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-da"></use>
								</svg>
							</span>
							<div class="answer-content">{{item.Answer}}</div>
						</div>
					</div>
				</div>
			</scroller-load>
			<div class="go-question" @click="goQuestion">去提问</div>
			<empty-page class="noData_temp" :type="3" v-if="questList.length === 0"></empty-page>
		</div>
   </transition>
</template>

<script>
import { getQuestions } from "api/yy";
import EmptyPage from "common/empty-page/empty-page.vue";
export default {
  mixins: [app.mixin.popupWindowRouteMixin],
  name: "goods-issue",
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
      questList: [],
      pagingOption: {
        // 列表页请求地址
        api: getQuestions,
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
            this.questList = [];
          }
          this.questList = this.questList.concat(res.Data);
        }
      });
    },
    goQuestion() {
      this.$emit("sendQuestion");
    }
  },
  watch: {
    refeshStr(val) {
      if (val) {
        this.questList.unshift({
          Question: val,
          Answer: ""
        });
      }
    },
    opened(newValue) {
      if (newValue) {
        app.tool.setDocTitle("全部提问");
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



