<style scoped lang="scss">
.home {
  .home-group {
    @include position-absolute(0, 0, $h-1, 0);
    background-color: #edf1f7;
    overflow: hidden;
    color: #aaaaaa;
  }
  .component {
    @include position-absolute(0, 0, 0, 0);
    z-index: 1;
    opacity: 0;
    &.active {
      z-index: 2;
      opacity: 1;
    }
  }
  .bottom {
    height: $h-1;
    width: 100%;
    border-top: 1px solid #eeeeee;
    @include position-absolute(false, 0, 0, 0);
    background: #fcfcfc;
    display: flex;
    .item {
      flex: 1;
      position: relative;
      @include flex-center(column);
      .icon {
		font-size: 20px;
		color:#AAAAAA
      }
      .text {
        display: block;
        font-size: $fs-small-s;
        margin-top: 3px;
        color: #aaaaaa;
      }
      .unread {
        position: absolute;
        top: 5px;
        right: 25%;
        width: 6px;
        height: 6px;
        border-radius: 10px;
        background-color: #ff3433;
      }
      img {
		width: 20px;
		color:#AAAAAA
		
      }
    }
    .active {
      color: #ff8369;
	}
	.text.active {
      color: #ff8369;
	}
  }
}
</style>

<template>
	<div class="home">
		<div class="home-group">
			<component 
				v-for="(item, index) in home.list" 
				class="component" 
				:key="index" 
        @changeIndex="changeIndex"
				:is="item.component" 
				:class="{active: activeIndex == index}">
			</component>
		</div>
		<div class="bottom">
			<div 
				v-for="(item, index) in home.list" :key="index"
                class="item"
				@click="changeContent(item, index)"
				:class="{active:index==activeIndex}">
				<img :src="index==activeIndex?item.imgactive:item.img" >
				<span class="text" :class="{active:index==activeIndex}">{{item.text}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import Main from "./main";
import DemoTab from "./demoTab";
import UserCenter from "user/pages/user-center/user-center.vue";
export default {
  name: 'home',
  mixins: [app.mixin.shareMixin],
  data() {
    return {
      home: {
        list: [
          //  {
          //   icon: "#iconhuodongku",
          //   img: require("./img/huodongku.png"),
          //   imgactive: require("./img/huodongkuactive.png"),
          //   text: "首页",
          //   component: DemoTab
          // },
          {
            icon: "#iconhuodongguanli",
            img: require("./img/huodongguanli.png"),
            imgactive: require("./img/huodongguanliactive.png"),
            text: "我的活动",
            component: Main
          },
          {
            icon: "#iconwode",
            img: require("./img/wode.png"),
            imgactive: require("./img/wodeactive.png"),
            text: "个人中心",
            component: UserCenter
          }
        ]
      },
      activeIndex: '0'
    };
  },
  computed: {
    ...Vuex.mapState(["userConfig"]),
    wxTitle() {
      let title = "";
      switch (this.activeIndex) {
        // case '0':
        //   title = "首页";
        //   break;
        case '0':
          title = "我的活动";
          break;
        case '1':
          title = "个人中心";
          break;
      }
      return title;
    }
  },
  created() {
      this.v_shareResolve(function () {
        return {
            title: this.wxTitle,
            // desc: this.wxTitle,
            url: '/home',
            // imgUrl: 'https://cdn01.xiaogj.com/file/4f6257359a904707997e52fe0d1b10bb/201903/6510822ee6524c68a58fa09dc2648112.png'
        };
    })
  },
  methods: {
    changeContent(item, index) {
        this.activeIndex = index+'';
        app.tool.setDocTitle(this.wxTitle);
    },
    changeIndex(index) {
        this.activeIndex = index;
        app.tool.setDocTitle(this.wxTitle);
    }
  },
  comments: [Main,UserCenter,DemoTab]
};
</script>