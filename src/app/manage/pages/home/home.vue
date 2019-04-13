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
import UserCenter from "manage/pages/user-center/user-center.vue";
import ActivityManage from "manage/pages/activity-manage/activity-manage.vue";

export default {
  name: 'home',
  data() {
    return {
      home: {
        list: [
          {
            icon: "#iconhuodongku",
            img: require("./img/huodongku.png"),
            imgactive: require("./img/huodongkuactive.png"),
            text: "活动库",
            component: Main
          },
          {
            icon: "#iconhuodongguanli",
            img: require("./img/huodongguanli.png"),
            imgactive: require("./img/huodongguanliactive.png"),
            text: "活动管理",
            component: ActivityManage
          },
          {
            icon: "#iconwode",
            img: require("./img/wode.png"),
            imgactive: require("./img/wodeactive.png"),
            text: "我的",
            component: UserCenter
          }
        ]
      },
      oldIndex: this.$route.params.homeIndex || '0'
    };
  },
  computed: {
      activeIndex() {
         if(this.$route.params.homeIndex == undefined) {
           return this.oldIndex;
         }else {
           this.oldIndex = this.$route.params.homeIndex;
           return this.$route.params.homeIndex;
         }
      },
    ...Vuex.mapState(["userConfig"]),
    wxTitle() {
      let title = "";
      switch (this.activeIndex) {
        case '0':
          title = "妙招生";
          break;
        case '1':
          title = "活动管理";
          break;
        case '2':
          title = "我的";
          break;
      }

      return title;
    }
  },
  methods: {
    changeContent(item, index) {
      this.$route.params.homeIndex = index+'';
      this.$router.replace(`/home/${index}`);
    }
  },
  comments: [Main]
};
</script>