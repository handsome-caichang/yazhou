<!--通知、公告列表页-->
<style lang="scss" scoped>


.notice-list {
  background-color: #edf1f7;
  .header {
    .tab {
      display: flex;
      height: 40px;
      font-size: 15px;
      background-color: #fff;
      @include border-bottom;
      .tab-item {
        flex: 1;
        @include flex-center;
        &:first-child {
          @include border-right;
        }
        .filerClass {
          padding: 5px;
        }
        .tab-item-text {
          @include flex-center;
          height: 100%;
          padding: 0 5px;
          border-bottom: 2px solid transparent;
          &.active {
            border-bottom: 2px solid #1e88f5;
            color: #1e88f5;
          }
        }
      }
    }
  }
  .body {
    margin-top: 10px;
    @include position-absolute(40px);
    .card {
      line-height: 1;
      padding: 20px 15px;
      @include border-bottom;
      background-color: $color-white;
      .card-hd {
        font-size: 16px;
        height: 18px;
        line-height: 18px;
        .name {
          display: inline-block;
          max-width: 80%;
          color: $color-3;
          @include ellipsis-single;
        }
      }
      .card-bd {
        padding-top: 4px;
        font-size: 12px;
        color: $color-9;
        .card-text {
          margin-top: 8px;
          .cname {
            font-size: 12px;
            display: inline-block;
            max-width: 60%;
            margin-left: 4px;
            vertical-align: top;
            color: $color-6;
            @include ellipsis-single;
          }
          .c-school {
            color: $color-9;
          }
        }
      }
      .card-badge {
        font-size: 12px;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .action-sheet {
    @include position-absolute(0);
    .contact-member-box {
      background-color: #fff;
      padding-bottom: 6px;
      .member-title {
        color: #1e88f5;
        font-size: 16px;
        padding: 30px 30px 10px;
        text-align: center;
      }
      .member-conter {
        padding: 0px 30px;
        .conter-item {
          margin-bottom: 6px;
          font-size: 13px;
          .item-left {
            color: #666;
            flex-shrink: 0;
          }
          .item-right {
            color: #333333;
            word-wrap: break-word;
            word-break: normal;
            .item-style {
              color: #1e88f5;
            }
          }
        }
        div.conter-item {
          display: flex;
        }
      }
    }
    .member-btn {
      margin-top: 10px;
      color: #333;
      font-size: 16px;
      line-height: 43px;
      text-align: center;
      border-top: 1px solid #dedede;
    }
   
  }
  .campus-sheet{
    @include position-absolute(0, 0, 0, 0);
     .cs-content {
      .cs-item {
        height: $h-2;
        line-height: $h-2;
        padding-left: $edge;
        padding-right: $edge;
        color: $color-3-s;
        @include ellipsis-single;
        &.center {
          text-align: center;
        }
        &.between {
          @include flex-between;
        }
        &.active {
          color: $color-primary;
        }
      }
    }
    .cs-header {
      padding-top: 14px;
      line-height: 55px;
      text-align: center;
      color: $color-3;
      font-size: $fs-big;
      @include border-bottom($color-border-1);
    }
    .cs-footer {
      padding-bottom: 25px;
    }
  }
  .sheet-filer {
    @include position-absolute(0, 0, 0, 0);
    .filer-title {
      height: 50px;
      line-height: 50px;
      color: $color-9;
      text-align: center;
    }
    .filer-container {
      background-color: #fff;
      .filer-conter {
        .filer-item {
          padding: 12px 15px;
          color: $color-3;
          @include border-top;
          display: flex;
          justify-content: space-between;
          &.active {
            color: #1e88f5;
          }
        }
      }
    }
  }
  .noData-temp {
    @include position-absolute;
  }
}
</style>

<template>
	<div class="notice-list">
		<!-- 头部 -->
		<div class="header">
        <div class="tab">
          <div class="tab-item" @click="clickActive(0)">
            <div class="tab-item-text" :class="{active : activePage == 0}">{{currentClass}}
            </div>
            <span class="filerClass">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiala"></use>
                </svg>
              </span>
          </div>
          <div class="tab-item" @click="clickActive(1)">
            <div class="tab-item-text" :class="{active : activePage == 1}">待选班级</div>
          </div>
        </div>
		</div>

		<!-- 列表部分 -->
		<scroller-base
			class="body"
			:data="filerLists"
			ref="myScroller">
			<div class="card" v-for="(item, index) in filerLists" :key="index" @click="clickClass(item)">
				<div class="card-hd">
					<span class="name">{{item.Name}}</span>
				</div>
				<div class="card-bd">
           <p class="card-text" v-if="activePage == 0">
            <svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-xiaoqu2"></use>
						</svg>
            <span class="cname c-school">
						 	{{item.ShiftCampusName}}
						</span>
          </p>
					<p class="card-text"  v-if="activePage == 0">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-shijian1"></use>
						</svg>
						<span class="cname" >
						 	{{item.StudentCourseTime}}
						</span>
					</p>
					<!-- <p class="card-text"  v-if="activePage == 0">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-laoshifabu"></use>
						</svg>
						<span class="cname">
						 	{{item.TeacherName}}
						</span>
					</p> -->

					<!-- <p class="card-text"  v-if="activePage == 1">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-xiaoqu2"></use>
						</svg>
						<span class="cname c-school">{{item.CampusName}}</span>
					</p> -->
					<p class="card-text" v-if="activePage == 1">
						<svg class="icon" ar5ia-hidden="true">
							<use xlink:href="#icon-kecheng1"></use>
						</svg>
						<span class="cname">课程数量：{{item.RemainAmount}}{{item.UnitName}}</span>
					</p>
				</div>
				<span class="card-badge" :style="setColor(item.state)"> {{item.state | currentFiler}}</span>
			</div>
			<empty-page class="noData-temp" :type="13" :text='activePage == 0 ? noClassText : "没有待选班级的课程哦~"'  v-if="filerLists.length == 0"></empty-page>
		</scroller-base>

   <!-- 详情 -->
		<action-sheet 
		class="action-sheet" 
		v-show="opened" 
		:position="'center'" 
		:data="item"
		@close="close">
      <div class="contact-member-box">
        <p class="member-title">{{item.Name}}</p>
        <div class="member-conter">
          <div class="conter-item">
            <div class="item-left">所属课程：</div>
            <div class="item-right ">{{item.ShiftName}}</div>
          </div>
          <p class="conter-item">
            <span class="item-left">开班日期：</span>
            <span class="item-right">{{item.OpenDate | timeFilters}}</span>
          </p>
          <p class="conter-item">
            <span class="item-left">入班日期：</span>
            <span class="item-right">{{item.ClassInDate | timeFilters}}</span>
          </p>
          <p class="conter-item">
            <span class="item-left">班级人数：</span>
            <span class="item-right"><span class="item-style">{{item.StudentCount}}</span>/{{item.MaxStudentsAmount}}</span>
          </p>
          <p class="conter-item" v-if="item.UnitCode != 3">
            <span class="item-left">已上／已排课次：</span>
            <span class="item-right"><span class="item-style">{{item.FinishedCourseTimes}}</span>/{{item.CreatedCourseTimes}}{{item.UnitName}}</span>
          </p>
          <p class="conter-item"  v-if="item.UnitCode != 3">
            <span class="item-left">上课进度：</span>
            <span class="item-right"><span class="item-style">{{item.FinishedCourseNumbers}}</span>/{{item.FinishedCourseNumbers}}</span>
          </p>
          <p class="conter-item">
            <span class="item-left">授课教师：</span>
            <span class="item-right">{{item.TeacherName}}</span>
          </p>
          <p class="conter-item">
            <span class="item-left">上课教室：</span>
            <span class="item-right">{{item.ClassroomName}}</span>
          </p>
          <p class="conter-item">
            <span class="item-left">上课校区：</span>
            <span class="item-right">{{item.ShiftCampusName}}</span>
          </p>
          <div class="conter-item">
            <div class="item-left">上课时间：</div>
            <div class="item-right ">{{item.StudentCourseTime}}</div>
          </div>
        </div>
      </div>
      <div class="member-btn" slot="footer" @click="opened = false">关闭</div>
		</action-sheet>

    <!-- 筛选 -->
    <action-sheet 
      class="sheet-filer"
      v-show="openFiler" 
      :position="'bottom'"
      :data="filerList"
      @close="closeFiler" 
      >
        <p class="filer-title" slot="header">班级筛选</p>
       <div class="filer-container">
         <div class="filer-conter" v-for="(item, index) in filerList" :key="index" @click="changeClass(index)">
           <div class="filer-item" :class="{active : item.flag}">{{item.name}}
             <span class="filer-ico" v-if="item.flag">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-danxuan"></use>
                </svg>
             </span>
           </div>
         </div>
       </div>
    </action-sheet>

    <action-sheet 
        ref="campSheet"
        class="campus-sheet"
        v-show="openAsCampus" 
        @close="closeCampus" 
        :position="'center'" 
        :data="camList">
        <div class="cs-header" slot="header">选择校区</div>
        <ul class="cs-content">
            <li 
                class="cs-item center"
                v-for="(campus, index) in camList"
                :key="index"
                @click="changeCampus(campus)">
                <span>{{campus.Name}}</span>
            </li>
        </ul>
        <div class="cs-footer" slot="footer"></div>
    </action-sheet>

		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
import EmptyPage from "parent/components/common/empty-page/empty-page";
import { processPost } from "parent/api/common";
export default {
  name: "look-class",
  mixins: [app.mixin.popupWindowRouteMixin],
  data() {
    return {
      wxTitle: "在线选班",
      list: [
        /* {
          Name: "数学奥数培训班数学奥数培训班数学奥数培训班数学奥数培训班",  // 班級名称
          ClassroomName: "李老师 copy",  // 教师名称
          StudentCourseTime: "周一至周五 19:00-19:25",  // 上课时间
          TeacherName: "李老师 copy",  // 老师名称
          ClassInDate: "李老师 copy", // 入班时间
          OpenDate: "李老师 copy", // 开班时间
          ShiftCampusName: "李老师 copy", // 校区名称
          ShiftName: "李老师 copy", //  课程名称
          MaxStudentsAmount: 20, // 人数
          StudentCount: 2, // 当前人数
          CreatedCourseNumbers: 68, // 上课进度 
          CreatedCourseTimes: 68,  // 计划排课次数
          FinishedCourseNumbers: 9, // 当前上课进度 
          FinishedCourseTimes: 9,  // 当前排课进度
          state: "0",
        } */
      ],
      openAsCampus: false,
      camList: [
      ],
      courseList: [
        /* {
          CampusName: "444444444444",    // 校区名称
          name: "数学数学奥数培训班数学奥数培训班数学奥数培训班奥数培训班",    //  课程名称
          RemainAmount: "25",   // 课程数量
          ShiftName: "李老师 copy", //  课程名称
          ShiftID: "11111",
          CampusId: '11111'
        },*/
      ],
      currentClass: "全部班级",
      opened: false,
      openFiler: false,
      isLoading: true,
      item: {},
      activePage: 0,
      filerList: [
        {
          name: "全部班级",
          state: 99,
          flag: true
        },
        {
          name: "当前在读班级",
          state: 0,
          flag: false
        },
        {
          name: "已报待读班级",
          state: 1,
          flag: false
        },
        {
          name: "以往就读班级",
          state: 2,
          flag: false
        }
      ],
      noClassText: "还没有报读班级哦~",
      campusItem: {},
    };
  },
  filters: {
    /* 右边文案 */
    currentFiler(state) {
      switch (state) {
        case "0":
          return "当前在读";
          break;
        case "1":
          return "已报待读";
          break;
        case "2":
          return "以往就读";
          break;
        default:
          return "我要选班";
      }
    },
    /* 时间 */
    timeFilters(time) {
      if (!time) return "";
      return time.replace(/-/g, ".");
    }
  },
  computed: {
    /* 列表显示的数据 */
    filerLists() {
      if (this.activePage == 0) {
        let state = "";
        this.filerList.forEach(el => {
          if (el.flag) {
            state = el.state;
          }
        });
        if (state == 99) return this.list;
        return this.list.filter(el => el.state == state);
      } else {
        return this.courseList;
      }
    }
  },
  methods: {
    clickActive(index) {
      if (this.activePage == 0 && index == 0) {
        this.openFiler = true;
      } else {
        this.activePage = index;
        this.$refs.myScroller.refresh();
      }
    },
    /* 筛选班级  */
    changeClass(index) {
      this.filerList.forEach(el => {
        el.flag = false;
      });
      this.filerList[index].flag = true;
      this.currentClass = this.filerList[index].name;
      if (index != 0) {
        this.noClassText = `还没有${this.currentClass}哦~`;
      } else {
        this.noClassText = "还没有报读班级哦~";
      }
      this.closeFiler();
    },
    /*  关闭筛选弹窗 */
    closeFiler() {
      this.openFiler = false;
    },
    closeCampus() {
      this.camList = [];
      this.openAsCampus = false;
    },
    /* 关闭详情 */
    close() {
      this.opened = false;
    },
    /* 点击列表的item  */
    clickClass(item) {
      if (this.activePage == 0) {
        this.item = item;
        this.opened = true;
      }else {
        this.campusItem = item;
        processPost({ pname: "campusListGranted",shiftId : item.ShiftID}).then(res => {
          if (res.errcode == 200) {
            this.camList = res.data;
            this.$refs.campSheet && this.$refs.campSheet.refresh();
            if (this.camList.length == 1) {
              this.$router.push({path: `/lookClass/${this.campusItem.ShiftID};${this.camList[0].ID}`});
            }else if(this.camList.length > 0){
              this.openAsCampus = !this.openAsCampus;
            }
          }
        })
      }
    },
    changeCampus(item) {
      this.openAsCampus = !this.openAsCampus;
      this.$router.push({path: `/lookClass/${this.campusItem.ShiftID};${item.ID}`});
    },
    setInitData(arr, obj) {
      arr.forEach(item => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            item[key] = obj[key];
          }
        }
      });
    },
    /*  设置右边样式 */
    setColor(state) {
      if (state == "1") {
        return { color: "#46BEEE" };
      } else if (state == "0") {
        return { color: "#F5A206" };
      } else if (state == "2") {
        return { color: "#CCCCCC" };
      } else {
        return {
          border: "1px solid #1E88F5",
          color: "#1E88F5",
          "border-radius": "15px",
          "line-height": "22px",
          width: "64px",
          "text-align": "center",
          "font-size": "12px"
        };
      }
    },
    /*  初始化数据 */
    initData() {
      this.isLoading = true;
      processPost({ pname: "classList" }).then(res => {
        if (res.errcode == 200) {
          this.setInitData(res.data.currentClassList, { state: "0" });
          this.setInitData(res.data.unreadClassList, { state: "1" });
          this.setInitData(res.data.historyClassList, { state: "2" });
          this.list = res.data.currentClassList;
          this.list.push(...res.data.unreadClassList);
          this.list.push(...res.data.historyClassList);
          processPost({ pname: "shiftListWithoutClass" }).then(data => {
            if (data.errcode == 200) {
              data.data.forEach(item => {
                item.Name = item.ShiftName;
              });
              this.courseList = data.data;
              this.$refs.myScroller.refresh();
              this.isLoading = false;
            }
          });
        }
      });
    }
  },
  created() {
    app.event.on("uplookClassData", () => {
      console.log("回来了 ");
      this.initData();
    });
    this.initData();
  },
  destroyed() {
    app.event.off("uplookClassData");
  },
  components: {
    EmptyPage
  }
};
</script>