<!-- 家长端首屏 -->
<style scoped lang="scss">
.main {
  // background-color: #f7f8fa;
    background-color: $color-white;

  .banner-container {
    // padding-top: 8px;
    // padding-bottom: 35px;
    padding-bottom: 11px;
    // background-color: $color-white;
  background-color: #f7f8fa;
    .banner-wrap {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 46.7%;
      .banner {
        @include position-absolute;
        .banner-item {
          display: block;
          height: 100%;
          @include background-img(false, cover);
        }
      }
    }
  }
  .section-wrap {
    // margin-top: 11px;
    background-color: $color-white;
    position: relative;
    .title {
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: rgba(51, 51, 51, 1);
      font-weight: bold;
      font-size: 15px;
    }
    .table-container {
      height: 44px;
      display: flex;
      justify-content: space-around;
      overflow: hidden;
      li {
        display: inline-block;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        color: rgba(78, 78, 78, 1);
        width: 67px;
      }
      li.active {
        color: rgba(254, 92, 0, 1);
        font-size: 19px;
      }
    }
    .content {
      border-top: 1px solid #e7e7e7;
      padding: 11px 12px;
      li {
        margin-bottom: 29px;
        box-shadow: 0px 4px 8px 0px rgba(79, 94, 163, 0.15);
        border-radius: 10px;
        .img-box {
          position: relative;
          width: 100%;
          padding-top: 50%;
          border-radius: 10px 10px 0 0;
          .li-img {
             @include position-absolute(0,0,0,0);
              display: block;
              height: 100%;
              width: 100%;
              border-radius: 10px 10px 0 0;
              @include background-img(false, cover);
          }
        }
        .box {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left-box {
            width: 70%;
            .name {
              font-size: 16px;
              color: rgba(51, 51, 51, 1);
              margin-bottom: 8px;
              @include ellipsis-single;
            }
            .info {
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              .lingyong {
                color: #333333;
              }
              .hot {
                color: #fe5c00;
              }
            }
          }
          .btn {
            width: 88px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background: rgba(255, 139, 2, 1);
            box-shadow: 0px 13px 26px 0px rgba(255, 108, 1, 0.23);
            border-radius: 28px;
            font-size: 14px;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    
  .noList {
    @include position-absolute(0,0,0,0);
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
  }
}
</style>

<template>
  <scroller-base class="main" ref="scrollBar" :data="curTab">
    <!-- banner图  -->
    <div class="banner-container">
      <div class="banner-wrap" v-if="banneres.length !=0">
         <slider ref="newslider" class='banner' :autoPlay="false">
          <a class="banner-item" v-for="(banner,index) in banneres" :key="index" @click="goDetail(banner)" :style="'background-image:url('+ banner.image + ')'"></a>
        </slider>
        <!-- <new-slider ref="newslider" class='banner' :autoPlay="false">
            <img class="banner-item" v-for="(item,index) in banneres" @click="goDetail(item)" :key="index" :src="item.image" />
          <a class="banner-item" v-for="(banner,index) in banneres" :key="index" @click="goDetail(item)" :style="'background-image:url('+ banner.image + ')'"></a>
        </new-slider> -->
      </div>
    </div>
    <!-- 模块 -->
    <div class="section-wrap">
      <p class="title">-&nbsp;&nbsp;招生方案&nbsp;&nbsp;-</p>
      <div class="table-box" ref="tab">
        <ul class="table-container">
          <li v-for="(item,index) in tabList" :key="index" @click="tabClick(item.activitytype)" :class="item.activitytype == curTab ? 'active':''">{{item.name}}</li>
        </ul>
      </div>
      <div class="noList" v-if="contentTabList.length == 0">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconkong"></use>
        </svg>
        <p>暂无节日活动模板哦～</p>
      </div>
      <ul class="content" v-if="contentTabList.length > 0">
        <li v-for="item in contentTabList" :key="item.type" @click="itemGo(item)">
          <!-- <img :src="item.imageurl"> -->
          <div class="img-box">
            <div class="li-img" :style="`background-image:url( ${item.imageurl||item.filepath} )`"></div>
          </div>
          <div class="box">
            <div class="left-box">
              <p class="name">{{activitytypeName(item.activitytype)}}&nbsp;|&nbsp;{{item.name}}</p>
              <p class="info">领用
                <span class="lingyong">{{item.taskcount}}</span> 人 &#8226; 最高招生
                <span class="hot">{{item.maxUser}}</span> 人</p>
            </div>
            <div class="btn">我要领取</div>
          </div>
        </li>
      </ul>
    </div>
  </scroller-base>
</template>

<script>
import newSlider from "../../components/newSlider.vue";
import { gettemplateinfos } from "manage/api/common.js";
export default {
  data() {
    return {
      list: [],
      tabList: [
        {
          name: "全部",
          activitytype: "all"
        },
        // {
        //   name: "推荐",
        //   activitytype: "hot"
        // },
        {
          name: "拼团",
          activitytype: 1
        },
        {
          name: "砍价",
          activitytype: 2
        },
        {
          name: "微传单",
          activitytype: 3
        },
        {
          name: "节日",
          activitytype: 4
        }
      ],
      contentList: [
        // {
        //   templateid: '101',
        //   styleid: "1001",
        //   imageurl: require("./img/banner2.png"),
        //   name: "课程价格由你砍到低",
        //   taskcount: 295,
        //   number: 95,
        //   activitytype: 1, // 1 砍价  2 拼团 3 微传单
        // },
      ],
      curTab: "all",
      tabObj: null
    };
  },
  computed: {
    banneres() {
      return [
         {
          image: require("./img/banner1.png"),
          href: "wonderfulmethod"
        },
        // {
        //   image: require("./img/banner1.png")
        // },
        // {
        //   image: require("./img/banner2.png")
        // }
      ];
    },
    contentTabList() {
      if (this.curTab == "all" || this.curTab == "hot") {
        return this.contentList;
      } else {
        return this.contentList.filter(
          item => item.activitytype == this.curTab
        );
      }
    }
  },
  methods: {
    tabClick(item) {
      this.curTab = item;
    },
    activitytypeName(activitytype) {
      if (activitytype == 1) {
        return "拼团";
      } else if (activitytype == 2) {
        return "砍价";
      } else if (activitytype == 3) {
        return "微传单";
      }
    },
    itemGo(item) {
      // 查看活动模板详情通过 互动id ，跟后台对应, type: 用来区分是查看默认的活动模板还是用户创建的
      this.$router.push({
        path: `/templateDetail/${item.styleid}`,
        query: { type: "add", templateid: item.templateid }
      });
    },
    goDetail(item) {
      this.$router.push(`/${item.href}`);
    },
    imgLoadin() {
      this.$nextTick(() => {
        this.$refs.scrollBar.refresh();
      });
    }
  },
  created() {
    if (this.$route.query.activitytype) {
      this.curTab = this.$route.query.activitytype;
    }
    gettemplateinfos({
    }).then(res => {
      if (res.result.code == 200) {
        this.contentList = res.data;
        this.contentList.forEach(item => {
          if (item.activitytype == 1) {
            item.taskcount += 2212;
            item.maxUser = 1137;
          } else if (item.activitytype == 2) {
            item.taskcount += 1231;
            item.maxUser = 876;
          } else if (item.activitytype == 3) {
            item.taskcount += 897;
            item.maxUser = 543;
          }
        });
        this.imgLoadin();
      }
    });
    this.$nextTick(() => {
      this.imgLoadin()
    });
  },
  watch: {
    curTab() {this.imgLoadin()}
  },
  components: {
    newSlider
  }
};
</script>