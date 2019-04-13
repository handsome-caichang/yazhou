
<!--客户端-我的活动-->
<style scoped lang="scss">
.home {
  @include position-absolute;
  background-color: #f7f8fa;
  overflow: hidden;
  .search-box {
    background-color: #eef1f6;
    padding: 8px 10px;
    .search {
      height: 28px;
      line-height: 28px;
      background: rgba(255, 255, 255, 1);
      border-radius: 28px;
      padding: 0 23px 0 12px;
      color: #333333;
      font-size: 13px;
      position: relative;
      .icon {
        position: absolute;
        right: 1%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
      }
    }
  }
  .tip {
    background: linear-gradient(
      270deg,
      rgba(255, 137, 27, 1) 0%,
      rgba(242, 75, 19, 1) 100%
    );
    height: 45px;
    line-height: 45px;
    padding: 0 12px;
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    .icon1 {
      margin-right: 7px;
    }
    .ellipsis-single {
      @include ellipsis-single;
    }
  }
  // @include position-absolute(0, 0, 49px, 0);
  //       .scroller{
  //           @include position-absolute;
  // .scroll-boxs {
  // position: relative;
  .scroll {
    @include position-absolute(44px, 0, 0, 0);
    .list {
      padding-bottom: 15px;
      // @include position-absolute(0, 0, 0, 0);
      background-color: #f7f8fa;
      overflow: hidden;
      li {
        margin: 12px;
        background-color: #fff;
        border-radius: 10px;
        .top {
          border-radius: 10px 10px 0 0;
          height: 45px;
          line-height: 45px;
          font-size: 12px;
          color: #888;
          padding: 0 60px 0 50px;
          position: relative;
          .label {
            position: absolute;
            top: 50%;
            left: 0px;
            transform: translate(0, -50%);
            width: 41px;
            height: 18px;
            line-height: 18px;
            border-radius: 0px 10px 10px 0px;
            color: #fff;
            font-size: 10px;
            text-align: center;
          }
          .point {
            @include ellipsis-single;
          }
          .type {
            position: absolute;
            top: 50%;
            right: 0px;
            transform: translate(0, -50%);
            margin-right: 16px;
          }
        }
        .img-box {
          position: relative;
          width: 100%;
          padding-top: 50%;
          .li-img {
              display: block;
              height: 100%;
              @include position-absolute(0, 0, 0, 0);
              @include background-img(false, cover);
          }
        }
          
      }
      .content {
        box-shadow: 0px 2px 4px 0px rgba(79, 94, 163, 0.14);
        border-radius: 0px 0px 10px 10px;
        padding: 0 16px 8px;
        .title {
          color: #333;
          height: 38px;
          line-height: 38px;
          font-size: 16px;
          @include ellipsis-single;
        }
        .price-box {
          display: flex;
          justify-content: space-between;
          .left {
            font-size: 12px;
            display: flex;
            align-items: center;
            .xiahua {
              text-decoration: line-through;
              font-size: 10px;
              color: #999;
            }
            .price {
              color: #fe5c00;
              font-weight: bold;
              font-size: 20px;
              margin-right: 6px;
            }
          }
          .right {
            width: 56px;
            height: 28px;
            line-height: 28px;
            border-radius: 28px;
            color: #666;
            text-align: center;
            border: 1px solid rgba(204, 204, 204, 1);
          }
        }
      }
      li.pingtuan {
        .label {
          // background-color: #fe5c00;
          background:linear-gradient(60deg,#FFA202 0%,#FE6600 100%);
        }
        .type {
          color: #fe5c00;
        }
        .over {
          color: #999999;
        }
      }
      li.kanjia {
        .label {
          // background-color: #6acdc3;
          background:linear-gradient(60deg,#FF976F 0%,#FF3D37 100%);
        }
        .type {
          color: #FF3D37;
        }
        .over {
          color: #999999;
        }
      }
      li.chuandan {
        .label {
          // background-color: #77b7ff;
          background:linear-gradient(60deg,#9592FF 0%,#AC55FF 100%);
        }
        .type {
          color: #999999;
        }
      }
    }
  }
  // }

  .noList {
    @include position-absolute;
    z-index: 1;
    text-align: center;
    margin-top: 130px;
    p {
      margin-top: 35px;
      font-size: 16px;
      color: #999;
    }
    .icon {
      width: 120px;
      height: 95px;
    }
  }
  .as-actionsheets {
    @include position-absolute($h-2, 0, 0, 0);
    z-index: 2;
  }
  .footer-btn {
    position: absolute;
    bottom: 36px;
    right: 26px;
    z-index: 999;
    img {
      width: 75px;
    }
    // width: 50px;
    // height: 50px;
    // color: #fff;
    // font-size: 13px;
    // background: linear-gradient(
    //   180deg,
    //   rgba(255, 197, 7, 1) 0%,
    //   rgba(255, 146, 3, 1) 100%
    // );
    // box-shadow: 0px 8px 20px 0px rgba(255, 158, 43, 0.53);
    // border-radius: 50px;
    // @include toWrap;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
}
</style>

<template>
  <div class="home">
    <div class="search-box">
      <div class="search" @click="openActionsheets=!openActionsheets">
        {{curActivity.name}}
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconxiala"></use>
        </svg>
      </div>
    </div>
    <!-- <div class="tip" v-if="tip.activityshareid" @click="togo(tip)">
      <svg class="icon icon1" aria-hidden="true">
        <use xlink:href="#iconkehuduan-tongzhi"></use>
      </svg>
      <span class="ellipsis-single">{{tipName}}</span>
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#iconjiantou"></use>
      </svg>
    </div> -->
    <!-- <div class="scroll-boxs"> -->
    <scroller-super ref="pagingScroller" class="scroll" :type="2" :data="dataList" :pagingOption="pagingOption" @loadData="loadData">
      <ul class="list" v-if="list.length>0">
        <li v-for="(item, index) in list " :key="index" :class="statusClass(item)">
          <div class="top">
            <div class="label">{{activeName(item.type)}}</div>
            <div class="point">{{item.companyname}}</div>
            <div class="type" :class="statusClass(item)">{{statusName(item)}}</div>
          </div>
          <div class="img-box" @click="togo(item)">
            <div class="li-img" :style="`background-image:url( ${item.filepath||item.imgurl} )`"></div>
            <!-- <img :src="item.imgurl" class="li-img" @click="togo(item)"> -->
          </div>
          <div class="content">
            <div class="title">{{item.description}}</div>
            <div class="price-box">
              <div class="left">
                <div class="price" v-if="item.type != 3">
                  <span style="font-size:12px;">&#165;</span> {{item.discountprice}}
                </div>
                <p class="xiahua" v-if="item.type != 3">&#165; {{item.fullprice}}</p>
              </div>
              <div class="right" @click="shareClick(item)">分享</div>
            </div>
          </div>
        </li>
      </ul>
    </scroller-super>
    <!-- </div> -->
    <div class="noList" v-if="list.length == 0">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconkong"></use>
      </svg>
      <p @click="trigger()">您还没有任何活动哦～</p>
    </div>
    <actionsheets-activity class="as-actionsheets" :opened.sync="openActionsheets" @changeActivity="changeActivity" :curActivity="curActivity"></actionsheets-activity>
    <loading class="loading" v-show="isLoading" :type="1"></loading>
    <!-- <div class="footer-btn">
      <img :src="btnImg" >
    </div> -->
  </div>
</template>

<script>
import { getjoinactsharepublic, getjoinacttips } from "user/api/common.js";
import ActionsheetsActivity from "./actionsheets-activity.vue";
export default {
  data() {
    return {
      wxTitle: "我的活动",
      btnImg: require("../../assets/img/zhaoshen.png"),
      openActionsheets: false,
      scrollTop:'44px',
      curActivity: {
        value: 0,
        name: "全部活动"
      },
      tip: {
        needcount: "",
        activityshareid: "",
        activityinstanceid: "",
        type: ""
      },
      list: [],
      isLoading: false,
      pagingOption: {
        api: getjoinactsharepublic,
        params: {
          type: 0 //实例编号(不传为获取全部)
        },
        pageOpt: {
          // 分页初始页码的'key'、'value'
          indexKey: "pageindex",
          indexVal: 1,
          // 每页请求数据长度的'key'、'value'
          sizeKey: "pagesize",
          sizeVal: 20,
          // 后端返回的总页数'key'
          countKey: "totalpage"
        }
      },
      num: 0
    };
  },
  computed: {
    dataList() {
      return {
        num: this.num,
        data: this.list
      }
    },
    tipName() {
      if (this.tip.type == 1)
        return `您参与的拼团活动，就差${
          this.tip.needcount
        }人就成团了，快去看看吧~`;
      if (this.tip.type == 2)
        return `您参与的砍价活动，就差${
          this.tip.needcount
        }人就能砍到最低价了，快去邀请好友来砍价吧~`;
    }
  },
  methods: {
    shareClick(item) {
      let styleStr = "styleid=" + encodeURIComponent(item.styleid),
        shareidStr = "shareid=" + encodeURIComponent(item.activityshareid),
        idStr = "id=" + encodeURIComponent(item.activityinstanceid),
        activitytypeStr = "activitytype=" + encodeURIComponent(item.type),
        ruleid = "ruleid=" + encodeURIComponent(item.ruleid);
      wx.miniProgram.navigateTo({
        url: `/pages/share/share?${styleStr}&${shareidStr}&${idStr}&${activitytypeStr}&${ruleid}`,
        success: function() {},
        fail: function() {
          app.alert("跳转失败，请刷新页面重试。");
        }
      });
    },
    trigger() {
      // let succUrl = 'succUrl='+ encodeURIComponent(window.location.href.match(/[^#]*#/)[0] + '/orderList/1'),
      let succUrl = "succUrl=" + encodeURIComponent(window.location.href);
      wx.miniProgram.navigateTo({
        url: `/pages/attend/attend?${succUrl}`,
        success: function() {},
        fail: function() {
          app.alert("跳转失败，请刷新页面重试。");
        }
      });
    },
    changeActivity(ac) {
      this.curActivity = ac;
      //筛选活动
      this.pagingOption.params.type = ac.value;
      this.$refs.pagingScroller.refresh(this.pagingOption.params);
    },
    statusName(item) {
      // if (item.shareuserstatus == 1) {
      //   let s = "";
      //   if (item.type == 1) {
          // s = "拼团中";
        // } else if (item.type == 2) {
        //   s = "砍价中";
        // }
        return '进行中';
      // } else if (item.shareuserstatus == 2) {
      //   return "已完成";
      // } else {
      //   return "已过期";
      // }
    },
    activeName(type) {
      if (type == 1) return "拼团";
      if (type == 2) return "砍价";
      if (type == 3) return "微传单";
    },
    statusClass(item) {
      if (item.type == 1) {
        return item.shareuserstatus == 2 ? "pingtuan" : "pingtuan";
      } else if (item.type == 2) {
        return item.shareuserstatus == 2 ? "kanjia" : "kanjia";
      } else if (item.type == 3) {
        return "chuandan";
      }
    },
    togo(item) {
      this.$router.push({
        path: `/templateDetail/${item.styleid}`,
        query: { id: item.activityshareid, ruleid: item.ruleid }
      });
    },
    loadData(ajaxPromise) {
      this.isLoading = true;
      ajaxPromise.then(res => {
        this.isLoading = false;
        if (res.result.code == app.errok) {
          if (res.page.pageindex === 1) {
            this.list = [];
          }
          this.list = this.list.concat(res.data);
          this.imgLoading();
        }
      });
    },
    imgLoading() {
      this.$nextTick(() => {
        let imgBox = this.$refs.pagingScroller.$el;
        let imgs = imgBox.querySelectorAll("img");
        Array.prototype.forEach.call(imgs, (img, index) => {
          img.addEventListener("load", () => {
            this.num++;
          });
        });
      });
    }
  },
  created() {
    getjoinacttips().then(res => {
      if (res.result.code == 200) {
        if (res.data.length > 0) {
          this.tip = res.data[0];
          this.scrollTop = '98px'
        }
      } else {
        app.toast("error", res.result.msg);
      }
    });
    this.imgLoading();
  },
  components: {
    ActionsheetsActivity
  }
};
</script>