<style lang="scss">
// 全局 根路由/页面 基础样式
#app {
  @include position-absolute;
  overflow: hidden;
  .page-veiw {
    @include position-absolute;
  }
  .footer-img-btn {
    position: absolute;
    bottom: 60px;
    right: 15px;
    z-index: 999;
    img {
      width: 75px;
    }
  }
}

.custom-router-page {
  background-color: #fff;
}
</style>

<template>
  <div id='app'>
    <custom-router-view class="page-veiw"></custom-router-view>
    <div class="footer-img-btn" v-if="isShowZhaoshen" @click="togoManage">
      <img :src="btnImg">
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isShowZhaoshen: true,
      btnImg: require("user/assets/img/zhaoshen.png")
    };
  },
  mounted() {
    app.manageApp = this;
  },
  computed: {
    ...Vuex.mapState(["curTime", "endTime"])
  },
  methods: {
    ...Vuex.mapMutations(["setCurTime"]),
    startSetInterval() {
      if (this.curTime > 0) {
        clearInterval(app.setIntervalObj);
        app.setIntervalObj = setInterval(() => {
          let endTimeSecond = Math.floor(new Date().getTime() / 1000) + 1;
          if (this.endTime - this.curTime <= 0) {
            clearInterval(app.setIntervalObj);
            app.event.emit("setIntervalEnd");
          } else {
            this.setCurTime(endTimeSecond);
          }
        }, 1000);
      }
    },
    stopSetInterval() {
      clearInterval(app.setIntervalObj);
    },
    togoManage() {
       wx.miniProgram.navigateTo({
          url: `/pages/zhaoshengPage/zhaosheng`,
          success: function() {},
          fail: function() {
            app.alert("跳转失败，请刷新页面重试。");
          }
        });
    }
  },
  components: {
  },
  created() {
    app.event.on("startSetInterval", this.startSetInterval);
    app.event.on("stopSetInterval", this.stopSetInterval);
  }
};
</script>