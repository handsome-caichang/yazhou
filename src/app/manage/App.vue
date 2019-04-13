<style lang="scss">
// 全局 根路由/页面 基础样式
#app {
  @include position-absolute;
  overflow: hidden;
  .page-veiw {
    @include position-absolute;
  }
}

.custom-router-page {
  background-color: #fff;
}
</style>

<template>
  <div id='app'>
    <custom-router-view class="page-veiw"></custom-router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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