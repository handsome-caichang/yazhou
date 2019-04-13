/* 上课点评分享 */
<style lang="scss" scoped>
.comment-share {
  background-color: #f3f3f3;
  .empty-box {
    @include position-absolute;
    @include flex-center(column);
    background-color: $color-assist-1;
    .empty-img {
        width: 206px;
        height: 160px;
        @include background-img("./imgs/shixiao.png", cover);
    }
    .empty-tips {
      margin-top: 28px;
      font-size: $fs-normal-x;
      color: $color-9;
    }
  }
  .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    img {
      width: 100%;
    }
  }
  .comment-wrap {
    padding-top: 45.07%;
    .comment {
      margin: 0 10px;
      background-color: rgba(254, 249, 242, 1);
      box-shadow: 0px 4px 8px 0px rgba(146, 164, 196, 0.4);
      border-radius: 8px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      // 头像
      .img-box {
        width: 88px;
        height: 88px;
        background-color: transparent;
        border-radius: 100%;
        margin-top: -40px;
        padding: 5px;
        .img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          background-color: #f3f3f3;
          border: 5px solid rgba(254, 249, 232, 1);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      // 姓名
      .info {
        // margin-top: 10px;
        div {
          text-align: center;
          &:first-child {
            font-size: 16px;
            color: #333333;
          }
          &:last-child {
            margin-top: 2px;
            color: #666666;
            font-size: 11px;
          }
        }
      }
      .avg-scope {
        padding-top: 16px;
      }
      // 积分汇总
      .score-board {
        // width: 100%;
        // margin-top: 15px;
        .summary {
          text-align: center;
          font-size: 11px;
          .score {
            color: #ff6e7c;
            font-size: 30px;
            font-family: Arial-Black;
            font-weight: bold;
          }
          .label {
            color: #999999;
          }
          .rank {
            background-color: #f2f2f2;
            border-radius: 10px;
            height: 21.5px;
            line-height: 22px;
            margin: 5px 15px 0;
            padding: 0 15px;
          }
        }
      }
      // 积分明细
      .rate {
        margin: 25px 15px 0;
        width: 100%;
        .item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          div {
            width: 50%;
            &:first-child {
              text-align: right;
            }
            &:last-child {
              margin-left: 20px;
              text-align: left;
              .icon {
                color: #fce59e;
              }
            }
          }
        }
      }
      // 内容
      .content {
        width: 100%;
        margin: 15px;
        .icon {
          width: 100%;
          font-size: 27px;
          height: 32px;
        }
        .txt {
          position: relative;
          margin: 10px 15px 0;
          color: #666666;
          font-size: 14px;
          padding: 2px 0;
          span {
            line-height: 34px;
            border: 1px solid #d4d4dd;
            border-left: none;
            border-right: none;
            padding: 12px 0 5px;
            &::after {
              content: "";
              position: absolute;
              bottom: 5px;
              left: 0;
              width: 100%;
              height: 1px;
              background-color: #d4d4dd;
            }
          }
          &::before {
            content: "";
            position: absolute;
            top: -6px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #d4d4dd;
          }
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #d4d4dd;
          }
        }
        .voice {
          margin: 30px 15px 0;
          .itemVoice {
            width: 175px;
            height: 40px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid rgba(238, 238, 238, 1);
            text-align: right;
            line-height: 40px;
            padding: 0 14px;
            color: #999999;
            position: relative;
            margin: 0 8px;

            background-image: url("./imgs/voice-fff-bg.png");
            background-size: 12px 17px;
            background-position: 10px 11px;
            background-repeat: no-repeat;
            margin-bottom: 15px;
            &::before {
              position: absolute;
              left: -18px;
              top: 10px;
              content: "";
              border: 9px solid rgba(238, 238, 238, 1);
              border-top-color: transparent;
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
            &::after {
              position: absolute;
              left: -17px;
              top: 10px;
              content: "";
              border: 9px solid #ffffff;
              border-top-color: transparent;
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
          }
          .play {
            background-image: url("./imgs/voice-fff-bg.gif");
            background-size: 18px 17px;
            background-position: 7px 11px;
          }
        }
        .img {
          margin: 15px 15px 0;
        }
        // .video{
        //     margin: 15px 15px 0;
        // }
      }
    }
    .juanzhou {
      height: 49px;
      background-image: url("./imgs/paper-bg.png");
      background-size: 100% 100%;
      position: relative;
      margin: -15px 5px 0 0;
      z-index: 1;
    }
  }

  // 学校信息
  .school-info {
    margin: 10px 10px 0;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px 0px rgba(146, 164, 196, 0.4);
    border-radius: 8px;
    position: relative;
    min-height: 200px;
    padding-bottom: 30px;
    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .photo {
        width: 60px;
        height: 60px;
        background-position: 100%;
        background-size: cover;
        background-color: #f3f3f3;
        border-radius: 100%;
      }
      .name {
        color: #333333;
        font-size: 16px;
        margin-top: 6px;
        font-weight: 600;
      }
      .desc {
        color: #666666;
        font-size: 12px;
        margin: 15px 15px 0;
        word-break: break-all;
        min-width: 100%;
        padding: 0 15px;
        word-break: break-all;
      }
      .tel {
        font-size: 12px;
        margin-top: 12px;
        padding: 0 15px;
        width: 100%;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
        .tel-number {
          display: inline-block;
          color: $color-primary;
          margin-left: 15px;
          margin-top: 5px;
        }
      }
    }
    .banner-wrap {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 46.7%;
      margin-top: 15px;
      .alone-img {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: 100% 100%;
      }
      .banner {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        .banner-item {
          display: block;
          height: 100%;
          background-repeat: no-repeat;
          background-attachment: scroll;
          background-position: center center;
          background-size: cover;
          background-color: #eef1f6;
        }
      }
    }
    &::before {
      position: absolute;
      top: 0;
      right: 10px;
      width: 55px;
      height: 53px;
      content: "";
      background-position: 100% 100%;
      background-size: cover;
      background-image: url("./imgs/Group-9-Copy@3x.png");
    }
  }

  // 报名
  .jion-us {
    background-size: 100% 100%;
    height: 450px;
    margin: 10px 10px 0;
    border-radius: 8px;
    padding: 0 15px;
    input {
      padding: 15px;
      height: 49px;
      color: #333333;
      font-size: 16px;
      background: rgba(236, 236, 245, 1);
      border-radius: 4px;
      outline: none;
      margin-bottom: 15px;
      &:focus {
        border: 1px solid rgba(30, 136, 245, 1);
      }
    }
    .imgCode {
      > div {
        background-color: transparent !important;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .code {
      display: flex;
      justify-content: space-between;
      input {
        width: 65.38%;
      }
      > div {
        width: 33%;
        height: 49px;
        text-align: center;
        line-height: 49px;
        color: #ffffff;
        background-color: rgba(57, 200, 112, 1);
        border-radius: 4px;
      }
      .active {
        background-color: #a8dcbc;
      }
    }
    .btn {
      margin: 45px 2px;
      height: 49px;
      background-color: #f5a623;
      border-radius: 100px;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      line-height: 49px;
    }
  }
}

.video-box {
  padding: 15px 15px 20px;
  box-sizing: content;
  .video-wrap {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 61.54%;
    .video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-attachment: scroll;
      background-size: cover;
      background-position: center;
      .video-task {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        @include flex-center;
        .icon {
          font-size: 55px;
          height: 1em;
        }
      }
    }
  }
}
</style>

<template>
    <scroller-base 
        class="comment-share"
        :data="renderData"
        ref="ShareFrame"
        >

        <div v-if="isshow">
            <!-- <div class="top"  :style="'backgroundImage:url('+ require('./imgs/header-bg.png') +''"></div> -->
            <div class="top">
                <img src="./imgs/header-bg.png" alt="">
            </div>

            <div class="comment-wrap">

                <div class="comment">
                    
                    <div class="img-box">
                        <div class="img"  :style="'backgroundImage:url('+ schoolInfo.studentPhoto +''"></div>
                    </div>
                    
                    <div class="info">
                        <div>{{ schoolInfo.studentName }}</div>
                        <div>{{ detail.data &&detail.data.ClassName }}</div>
                    </div>
                    
                    <!-- 评分为0时不显示 -->
                    <div class="avg-scope" v-if="avg > 0">

                        <div class="score-board">
                            <div class="summary">
                                <div class="score">{{ avg }}</div>
                                <div class="label">课堂评分</div>
                                <div class="rank">
                                    {{ getRank }}
                                    <svg aria-hidden="true" 
                                        class="icon star" >
                                        <use xlink:href='#icon-dianzan'></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div class="rate">
                            <star v-for="(tstar, index) in detail.ListScopeTeacherDetail.filter((item) => { return item.Scope > 0;})"
                                :key="index"
                                :title="tstar.CourseCommentScopeSettingName"
                                :desc="tstar.Describe"
                                :starsDesc="detail.ListScopeDesc"
                                :selectedStarsNum="tstar.Scope">
                            </star>
                        </div>

                    </div>

                    <div class="content">
                        
                        <!-- 文字 -->
                        <div v-if="detail.data.TeacherContent.length > 0">

                            <div class="icon">
                                <svg aria-hidden="true" class="icon">
                                    <use xlink:href="#icon-bi"></use>
                                </svg>
                            </div>
                            
                            <div class="txt">
                                <span>
                                    {{ detail.data.TeacherContent }}
                                </span>
                            </div>

                        </div>

                        <!-- voice -->
                        <div class="voice" ref="voiceBox">

                            <div :data-url="item.FilePath" class="itemVoice" v-for="(item, index) in detail.ListAudioFile" :key="index">
                                <span>{{ item.FileLength }}"</span>
                            </div>

                        </div>

                        <!-- img -->
                        <div class="img" v-if="detail.ListImgFile.length>0">
                            <img-area
                                :edit="false"
                                :imageType="1"
                                :imageFileList="detail.ListImgFile"
                                @imageLoaded="addScrollNum"
                                >
                            </img-area>
                        </div>
                        <div class="video-box" v-for="(item, index) in detail.ListVideo" :key="index">
                            <div class="video-wrap">
                                <div class="video"
                                    :style="{backgroundImage: `url(${getThumbUrl(item)})`}"
                                    :data-src="item.FilePath"
                                    @touchstart="app.video.setSrc(item.FilePath)"
                                    @mousedown="app.video.setSrc(item.FilePath)"
                                    @click="openVideo">
                                    <div class="video-task">
                                        <svg aria-hidden="true" class="icon">
                                            <use xlink:href="#icon-bofang"></use>
                                        </svg>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>

                <!-- 卷轴 -->
                <div class="juanzhou"></div>
            </div>
            
               
            <!-- 学校简介 -->
            <!-- 因为学校名称和学校简介是比必须的，所以pc端没有设置时这两个值都没有。此时不展示这个模块 -->
            <div class="school-info" ref="AnchorSchoolInfo"
                v-if="schoolInfo.companyName != '' && schoolInfo.companyDes != ''"
            >
                <div class="info">
                    <div style="height: 30px"></div>
                    <div class="photo" v-if="schoolInfo.companyLogoPath.length>0" :style="'backgroundImage:url(https:'+ schoolInfo.companyLogoPath +''"></div>
                    <div class="photo" v-else :style="'backgroundImage:url('+ require('./imgs/Group-2@3x.png') +''"></div>
                    <div class="name">{{ schoolInfo.companyName }}</div>
                    <!-- <div class="desc">{{ schoolInfo.companyDes }}</div> -->
                    <rich-text-area 
                        class="rich-text"
                        v-if="schoolInfo.companyDes"
                        :richText="app.tool.richTextToHtml(schoolInfo.companyDes)" 
                        ></rich-text-area>
                    <div class="tel" v-if="schoolInfo.compnayTel&&schoolInfo.compnayTel!=''">
                        <div>
                            <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-dianhua"></use>
                        </svg>
                            联系电话：
                        </div>
                        <a class="tel-number" v-for="item in schoolInfo.companyTelArr" :key="item" :href="'tel:'+item">{{ item }}</a>
                    </div>
                </div>
                <div class="banner-wrap" v-if="schoolInfo.companyImages.length >= 1">
                    <div class="alone-img" v-if="schoolInfo.companyImages.length == 1" @click="previewImage(schoolInfo.companyImages, 0)" :style="'backgroundImage:url('+ schoolInfo.companyImages[0].FilePath +''">
                    </div>
                    <slider v-else class='banner' :autoPlay="true" :data="schoolInfo.companyImages">
                        <!-- <a class="banner-item"
                            v-for="(banner, key) in test"
                            :style="'background-image:url('+ banner + ')'"
                            :key="key"
                            @click="previewImage(test, key)"
                        ></a> -->
                        <a class="banner-item"
                            v-for="(banner, key) in schoolInfo.companyImages"
                            :style="'background-image:url('+ banner.FilePath + ')'"
                            :key="key"
                            @click="previewImage(schoolInfo.companyImages, key)"
                        ></a>
                    </slider>
                </div>
            </div>

            <!-- 我要报名 -->
            <div class="jion-us" :style="'background-image:url('+ require('./imgs/jion-us.png') + ')'">
                <div style="height: 115px"></div>
                <div>
                    <input v-if="getFlag" type="text" placeholder="请输入学员姓名" v-model="studentName" />
                    <input v-else type="text" placeholder="请输入学员姓名" v-model="studentName" disabled/>
                </div>
                <div>
                    <input v-if="getFlag" type="text" placeholder="请输入联系手机号" v-model="tel"/>
                    <input v-else type="text" placeholder="请输入联系手机号" v-model="tel" disabled/>
                </div>
                <div class="code imgCode" id='code64'>
                    <input v-if="getFlag" type="text" placeholder="请输入图形验证码" v-model="imgCode"/>
                    <input v-else type="text" placeholder="请输入图形验证码" v-model="imgCode" disabled/>

                    <div v-if="getFlag"  @click="getImgCode" :style="'background-image:url('+ codebase64 + ')'"></div>
                    <div v-else  :style="'background-image:url('+ codebase64 + ')'"></div>
                </div>
                <!-- <div class="code">
                    <input v-if="getFlag" type="text" placeholder="请输入短信验证码" v-model="telCode"/>
                    <input v-else type="text" placeholder="请输入短信验证码" v-model="telCode" disabled/>

                    <div v-if="getFlag" @click="getMsg" :class="{'active': timer.isLive}">{{ timer.btnTxt }}</div>
                    <div v-else :class="{'active': timer.isLive}">{{ timer.btnTxt }}</div>
                </div> -->
                <div v-if="getFlag" class="btn" @click="joinUs">报 名</div>
                <div v-else class="btn">报 名</div>
            </div>

            <div style="height: 30px"></div>
        </div>
        <div class="empty-box" v-if="!isshow">
            <div class="empty-img" ></div>
            <div class="empty-tips">此评价已失效</div>
	    </div>
        <loading class="loading" v-show="isLoading"></loading>
    </scroller-base>
    
</template>

<script>
import {
  getClassComment,
  getMsg,
  postShareRegisterCommunication,
  getCompanyLogo
} from "parentShare/api/share";
import RichTextArea from "parentShare/components/common/rich-text-area/rich-text-area.vue";
import EmptyPage from "parentShare/components/common/empty-page/empty-page.vue";
import Star from "./child/star";

var query = app.tool.parseQuery();

export default {
  name: "shangkendiaopign",
  mixins: [app.mixin.shareMixin],
  components: {
    RichTextArea
  },
  data() {
    return {
      wxTitle: "上课点评",
      detail: null,
      schoolInfo: null,
      clickNum: 0,
      timer: {
        isLive: false,
        durtion: 5,
        btnTxt: "获取验证码",
        startTime: null
      },
      tel: "",
      telCode: "",
      studentName: "",
      imgCode: "",
      studentInfo: {
        name: "",
        photo: ""
      },
      id: query.id,
      // 学校id
      companyId: query.companyId,
      // 校区id,报名必须
      campusid: "",
      topic: "courseCommentRegister",
      codebase64: "",
      // 分享出去的学校名称
      title: "",

      _voice: "",
      status: 0,
      isLoading:true
    };
  },
  computed: {
    getFlag() {
      // _flag=0，表示pc端预览；预览的时候只保留学校信息。点评信息区域和我要报名区域不要。
      return query._flag != 0;
    },
    renderData() {
      return {
        detail: this.detail,
        schoolInfo: this.schoolInfo,
        clickNum: this.clickNum,
        imgArr: this.schoolInfo && this.schoolInfo.companyImages
      };
    },
    isshow() {
      return this.detail;
    },
    avg() {
      let score = 0;
      this.detail.ListScopeTeacherDetail.forEach(item => {
        score += item.Scope;
      });
      return (score / this.detail.ListScopeTeacherDetail.length).toFixed(2);
    },
    getSchoolName() {
      return this.schoolInfo.companyName;
    },
    getPreview() {
      let arr = [
        {
          title: `我家${this.schoolInfo.studentName}在老师眼里原来这么棒！`,
          desc: `在${this.getSchoolName}学习，孩子点滴进步看得见！`
        },
        {
          title: `原来我家${
            this.schoolInfo.studentName
          }上课的时候是这样的......老师评价得太到位啦！`,
          desc: `在${this.getSchoolName}学习，孩子点滴进步看得见！`
        },
        {
          title: `老师对我家${
            this.schoolInfo.studentName
          }评价这么好，不炫耀下真说不过去！`,
          desc: `自从上了${this.getSchoolName}，再也不用担心孩子的学习！`
        }
      ];
      return arr[Math.round(Math.random() * (arr.length - 1))];
    },
    getRank() {
      let str = "",
        _avg = this.avg;

      if (_avg == 5) {
        str = "本堂课表现堪称完美";
      } else if (_avg >= 4.8 && _avg < 5) {
        str = "已超越99%的同龄孩子";
      } else if (_avg >= 4.5 && _avg < 4.8) {
        str = "已超越95%的同龄孩子";
      } else if (_avg >= 4.8 && _avg < 5) {
        str = "已超越99%的同龄孩子";
      } else if (_avg >= 4 && _avg < 4.5) {
        str = "已超越90%的同龄孩子";
      } else if (_avg >= 3.5 && _avg < 4) {
        str = "已超越80%的同龄孩子";
      } else if (_avg >= 3 && _avg < 3.5) {
        str = "已超越70%的同龄孩子";
      } else if (_avg >= 2.5 && _avg < 3) {
        str = "已超越60%的同龄孩子";
      } else if (_avg >= 2 && _avg < 2.5) {
        str = "已超越50%的同龄孩子";
      } else if (_avg > 0 && _avg < 2) {
        str = "表现不错，再接再厉";
      }
      return str;
    }
  },
  created() {
    if (this.getFlag) {
      // 分享
      getClassComment({
        id: this.id,
        companyId: this.companyId
      }).then(res => {
        this.isLoading = false;
        if(res.errorcode === 600){
            this.detail = null;
        }
        this.detail = res.data.commentDetail;
        this.schoolInfo = res.data.detail;
        this.schoolInfo.companyTelArr = this.dealTel(
          res.data.detail.compnayTel
        );
        // 校区id
        this.campusid = this.detail.data.CampusId;

        // 分享
        this.handlerDetail(this.getPreview);
      });
    } else {
      // pc预览
    }

    // 获取图形验证码
    this.getImgCode();
    window.setSchoolInfoToClassCommentShare = this.setData;
  },
  mounted() {
    setTimeout(() => {
      window.ShareFrame = this.$refs.ShareFrame;
      window.AnchorSchoolInfo = this.$refs.AnchorSchoolInfo;
      window.FindSchoolEl = function() {
        ShareFrame.scroller.scrollToElement(AnchorSchoolInfo);
      };
      this.playVoice();
    }, 2000);
  },
  methods: {
    //处理电话
    dealTel(s) {
      let str = s; //传入的字符串
      let arr = [];
      if (str == null || str == "") {
        return arr;
      } else {
        //PC会做限制 只会有中英文的分号;先将中文全转英文，然后分隔英文即可。
        let newStr = str && str.replace(/\；/g, ";");
        arr = newStr && newStr.split(";");
        return arr;
      }
    },
    // 播放视频
    openVideo() {
      app.voice.flag && app.voice.stop();
      app.video.play();
    },
    // 播放语音
    playVoice() {
      this.getFlag;

      let voiceBox = this.$refs.voiceBox,
        opt = {
          // 语音加载中
          loading: () => {
            this.status = 1;
            this._voice.classList.add("loading");
          },
          // 语音播放中
          playing: () => {
            this.status = 2;
            this._voice.classList.add("play");
          },
          // 回到默认状态
          end: () => {
            this.status = 0;
            this._voice.classList.remove("loading");
            this._voice.classList.remove("play");
          },
          // 回到默认状态
          endAuto: () => {
            this.status = 0;
            this._voice.classList.remove("loading");
            this._voice.classList.remove("play");
          },
          // 回到默认状态
          error: () => {
            this.status = 0;
            this._voice.classList.remove("loading");
            this._voice.classList.remove("play");
          }
        };
      // console.log(voiceBox)
      voiceBox &&
        voiceBox.addEventListener("click", event => {
          // 点击播放中的语音时，停止播放
          if (this._voice && this._voice == event.target && this.status == 2) {
            app.voice.stop();
            return;
          }
          // 停止之前正在播放的语音,播放当前点击的语音
          this._voice && this._voice != event.target && app.voice.stop();

          this._voice = event.target;

          if (this._voice.className === "itemVoice") {
            // 播放语音
            app.voice.play(this._voice.getAttribute("data-url"), opt);
          }
        });
    },
    setImgHttpHeader(src) {
      return src.indexOf("http") < 0 ? `https:${src}` : src;
    },
    // 微信预览
    previewImage(banneres, key) {
      let _arr = [];
      banneres.forEach(item => {
        _arr.push(this.setImgHttpHeader(item.FilePath));
      });
      app.sdk.previewImage({
        current: _arr[key],
        urls: _arr
      });
    },
    handlerDetail(params) {
      // 分享出去的学校logo
      let _shareLogo = this.schoolInfo.companyLogoPath;

      this.v_shareResolve({
        title: params.title,
        desc: params.desc,
        link: `${location.href}`,
        imgUrl:
          _shareLogo.length > 0
            ? `${_shareLogo.indexOf("http") < 0 ? "https:" : ""}${_shareLogo}`
            : location.protocol +
              "//" +
              location.host +
              "/weixin/parent/static/img/Group-2@3x.f0e0b64.png"
      });
    },
    setData(obj) {
      this.schoolInfo = obj.detail;
      this.detail = obj.commentDetail;
    },
    getThumbUrl(item) {
      // 老的数据是FilePath,改版后统一成Url;
      return (
        item.ThumbPath ||
        `${item.FilePath}?x-oss-process=video/snapshot,t_1000,f_jpg,w_300`
      );
    },
    addScrollNum() {
      this.clickNum++;
    },
    getImgCode() {
      this.codebase64 = `/api/SSX/NotsignIn/GetValidationImage?companyid=${
        this.id
      }&topic=${this.topic}&_t_=${new Date().getTime()}`;
    },
    getMsg() {
      /* 是否输入了手机号码和验证码 */
      // 验证手机号,和后台保持一致，数字，11位
      let reg1 = /^\d{11}$/;
      if (!reg1.test(this.tel) || this.imgCode === "") {
        app.toast("info", "请输入手机号码和图形验证码以获取短信。");
        return;
      }

      // 发送短信
      getMsg({
        companyId: this.companyId,
        tel: this.tel,
        topic: this.topic,
        code: this.imgCode
      }).then(res => {
        if (res.ErrorCode == 200) {
          this.getImgCode();
          app.toast("success", "短信已发送。");
        } else {
          app.toast("info", res.ErrorMsg);
        }
      });
    },
    // 报名
    joinUs() {
      let reg1 = /^\d{11}$/;
      if (!reg1.test(this.tel)) {
        app.toast("info", "请输入正确的手机号码。");
        return;
      }
      postShareRegisterCommunication({
        companyId: this.companyId,
        sign: this.getSign(this.companyId, this.tel),
        tel: this.tel,
        data: this.tel,
        campusid: this.campusid,
        // telValidate: this.telCode,
        verificationCode: this.imgCode,
        studentName: this.studentName,
        refStudentId: query.studentId,
        msgId: query.id
      }).then(res => {
        if (res.ErrorCode == 200) {
          app.toast("success", "报名成功。");

          this.getImgCode();

          // 清空表单
          this.studentName = "";
          this.tel = "";
          this.imgCode = "";
          this.telCode = "";
        } else {
          app.toast("info", res.ErrorMsg);
        }
      });
    },
    //  获取签名
    getSign(companyId, tel) {
      return companyId + tel + "9355c2027d184436b23dfe4e9c37793e";
    }
  },
  components: {
    Star
  }
};
</script>

