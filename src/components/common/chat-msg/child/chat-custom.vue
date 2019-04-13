<style lang="scss" scoped>
@import "../../../../assets/scss/variable.scss";
@import "../../../../assets/scss/mixin.scss";
@import "./mixin.scss";

.box {
  display: flex;
  .content {
    flex: 1;
    display: block;
    position: relative;
    padding: 11px 14px;
    line-height: 18px;
    border-radius: 4px;
    word-break: break-word;
	.title {
		color: #333;
		font-size: 14px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.desc {
		color: #999;
		font-size: 11px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
    font-weight: 200;

	}
	.img {
		height: 40px;
		float: right;
		margin-top: 5px;
		margin-left: 5px;
	}
  }
  .custom-tag {
    padding: 0 5px;
    .icon {
      width: 28px;
      height: 18px;
    }
  }
  &.in {
    .content {
      color: #333;
      background-color: #fff;
      @include triangle-left;
      .icon {
        color: #979797;
      }
    }
  }
  &.out {
    color: #fff;
    flex-direction: row-reverse;
    .content {
      color: #fff;
      background-color: #1e88f5;
      @include triangle-right;
      .icon {
        color: #e0e0e0;
      }
    }
    .custom-tag {
      .icon {
        color: #fff;
      }
    }
  }
  &.coupon {
     color: #fff;
    flex-direction: row-reverse;
    .content {
      color: #fff;
      background-color: #fff;
      @include triangle-right(#fff);
      .icon {
        color: #e0e0e0;
      }
    }
  }
}
</style>

<template>
	<div class="box"  :class="{'in': msg.flow === 'in', 'out': (msg.flow === 'out' && ccnt.Type != '5'), 'coupon': (msg.flow === 'out' && ccnt.Type == '5')}">
		<a class="content" :href="msgUrl" v-if="ccnt.Type != '5'" v-html="ccnt.Title">
			<svg class="icon" aria-hidden="true">
			    <use xlink:href="#icon-lianjie"></use>
			</svg>
		</a>
		<a class="content" :href="ccnt.UrlParams.MsgUrl" v-if="ccnt.Type == '5'">
			<p class="title" v-html="ccnt.Title"></p>
			<img class="img" v-if="ccnt.UrlParams.ImgUrl" align="right" :src="ccnt.UrlParams.ImgUrl" alt="">
			<p class="desc">{{ccnt.UrlParams.Desc}}</p>
		</a>
		<div class="custom-tag">
			<svg class="icon" aria-hidden="true">
			    <use :xlink:href="`#${ccTags[ccnt.Type]}`"></use>
			</svg>
		</div>
	</div>
</template>

<script>
import { getCustomMsgUrl } from "src/assets/js/common/custom-msg.js";

export default {
  name: "chat-text",
  props: {
    msg: {
        type: Object
    }
  },
  data() {
    return {
      ccTags: {
        "2": "icon-pingjia",
        "3": "icon-zuoye",
        "4": "icon-xiaoxi",
        "5": "icon-huodong"
      },
    };
  },
  computed: {
    // 自定义消息的内容对象
    ccnt() {
      let content = JSON.parse(this.msg.content);
      if (content.Type == '5') {
        if (content.UrlParams.MsgUrl) {
          content.UrlParams.MsgUrl = (content.UrlParams.MsgUrl.indexOf('http') < 0 ? 'https://' : '') + content.UrlParams.MsgUrl;
        }
      }
      return content;
    },
    msgUrl() {
      return getCustomMsgUrl(this.ccnt);
    }
  },
  mounted() {
  }
};
</script>

