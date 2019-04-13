<!-- 课表 -->
<style lang="scss" scoped>


$background-color: #edf1f7;
.select-container {
  background-color: $background-color;
  .class-base {
    @include position-absolute(0px);
    top: $h-2;
    bottom: 50px;
    padding: 0px 10px;
    margin-top: 10px;
    .class-list {
      margin-bottom: 10px;
      background-color: #fff;
      padding: 25px 20px 20px;
      .member-title {
        color: $color-3;
        font-size: 16px;
        margin-bottom: 10px;
        padding-right: 20px;
        position: relative;
        .select-flag {
          height: 16px;
          width: 16px;
          border-radius: 2px;
          position: absolute;
          top: 0px;
          right: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          .card-next {
            color: #fff;
            font-size: 16px;
          }
        }
      }
      .member-conter {
        .conter-item {
          margin-bottom: 6px;
          font-size: 11px;
          .item-left {
            color: $color-6;
            flex-shrink: 0;
          }
          .item-right {
            color: $color-3;
            word-wrap: break-word;
            word-break: normal;
            padding-right: 20px;
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
    .noData-temp {
      @include position-absolute;
    }
  }
  .quick-sort-course {
    height: 50px;
    background: #1e88f5;
    color: $color-white;
    @include flex-center;
    font-size: 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .action-sheet {
    z-index: 1;
    @include position-absolute(0px);
    .card-ft {
      line-height: 44px;
      @include flex-center;
      @include border-top(#dedede);
      background-color: #fdfdfd;
      * {
        flex: 1;
        text-align: center;
        &:first-child {
          color: #7b7b7b;
          @include border-right(#dedede);
        }
        &:last-child {
          color: $color-primary;
        }
      }
    }
    .sheet-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px 20px;
      .st-title {
        font-size: 16px;
        color: $color-3;
        margin: 30px 0px 20px;
      }
      .conter {
        background-color: #f1f5ff;
        padding: 14px 20px 16px;
        width: 100%;
        min-height: 120px;
        .ct-text {
          color: #3673ff;
          font-size: 14px;
        }
      }
      .point {
        margin-top: 30px;
        margin-bottom: 10px;
        color: $color-6;
        font-size: 11px;
        .color-red {
          color: #ff3433;
        }
      }
    }
  }
  .app-mall-header {
    display: flex;
    height: $h-2;
    line-height: $h-2;
    padding: 0 $edge/2;
    background-color: #fff;
    .campus-box {
      width: 100%;
      @include flex-between;
      color: $color-3-s;
      padding: 0 10px;
      .campus {
        display: inline-block;
        @include ellipsis-single;
        margin-right: 5px;
      }
      .icon {
        font-size: $fs-small-s;
      }
    }
  }
  .cam-container{
  }
  .campus-sheet{
    @include position-absolute(0, 0, 0, 0);
    top: $h-2;
    z-index: 10;
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
}
</style>

<template>
<div class="select-container">
  <div class="app-mall-header">
    <div class="campus-box" @click="openCampusActionsheet">
        <span class="campus">{{curCampus.Name}}</span>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangxia1"></use>
        </svg>
    </div>
  </div>

	<scroller-base class="class-base" ref="scrollBase" :data="list">
    <div class="class-list" v-for="(item, index) in list" :key="index" @click="changeClass(index)">
        <p class="member-title">{{item.Name}} 
            <span class="select-flag" :style="{border: !item.flag ? '1px solid #DDDDDD' : ''}">
                <svg class="icon card-next" aria-hidden="true" v-if="item.flag">
                  <use xlink:href="#icon-duoxuan"></use>
                </svg>
            </span>
        </p>
        <div class="member-conter">
            <p class="conter-item">
              <span class="item-left">开班日期：</span>
              <span class="item-right">{{item.OpenDate | timeFilters}}</span>
            </p>
            <p class="conter-item">
              <span class="item-left">班级人数：</span>
              <span class="item-right"><span class="item-style">{{item.StudentCount}}</span>/{{item.MaxStudentsAmount}}</span>
            </p>
            <p class="conter-item">
              <span class="item-left">已上／已排课次：</span>
              <span class="item-right"><span class="item-style">{{item.FinishedCourseTimes}}</span>/{{item.CreatedCourseTimes}}{{item.UnitName}}</span>
            </p>
            <div class="conter-item">
              <div class="item-left">授课教师：</div>
              <div class="item-right ">{{item.TeacherName}}</div>
            </div>
            <p class="conter-item">
              <span class="item-left">上课教室：</span>
              <span class="item-right">{{item.ClassroomName}}</span>
            </p>
            <div class="conter-item">
              <div class="item-left">上课时间：</div>
              <div class="item-right ">{{item.StudentCourseTime}}</div>
            </div>
        </div>
    </div>
    <empty-page class="noData-temp" :type="13" :text="'当前暂无班级'" v-show="list.length===0"></empty-page>
	</scroller-base>

  <action-sheet 
		class="action-sheet" 
		v-show="opened" 
		:position="'center'" 
		:data="selectList"
		@close="close">
            <div class="sheet-container">
                <p class="st-title">选班确认</p>
                <div class="conter">
                    <p class="ct-text" v-html="className()"></p>
                </div>
                <p class="point"><span class="color-red">*</span> 一经选定，将不能自己修改，请谨慎操作</p>
            </div>
            <div class="card-ft" slot="footer">
                <div @click="opened = false">取消</div><div @click="confirms">确认</div>
            </div>
	</action-sheet>

  <action-sheet ref="campusSheet"
        class="campus-sheet"
        v-show="openAsCampus" 
        @close="closeCampus" 
        :position="'top'" 
        :data="renderData">
        <div class="cs-item between"
            v-for="(campus, index) in camList"
            :class="[{'active': curCampus.ID === campus.ID}]"
            :key="index"
            @click="changeCampus(campus)">
            <span>{{campus.Name}}</span>
            <svg class="icon" aria-hidden="true" v-if="curCampus.ID === campus.ID"><use xlink:href="#icon-danxuan"></use></svg>
        </div>
  </action-sheet>

  <div class="quick-sort-course"  @click="confirm" :style="isSelect()">确认<span>(已选{{selectFlag()}}个)</span></div>

	<loading class="loading" v-show="isLoading" :bgType="bgType"></loading>
</div>
</template>

<script>
import { processPost, savePost } from "parent/api/common";
import EmptyPage from "parent/components/common/empty-page/empty-page";
export default {
  name: "select-class",
  mixins: [app.mixin.popupWindowRouteMixin],
  data() {
    return {
      wxTitle: "在线选班",
      openAsCampus: false,
      isLoading: true,
      list: [
        /*  {
          id: '12321',
          name: "数学奥数培训班", // 班級名称
          ClassroomName: "李老师 copy", // 教师名称
          StudentCourseTime: "周一至周五 19:00-19:25", // 上课时间
          TeacherName: "李老师 copy", // 老师名称
          InDate: "李老师 copy", // 入班时间
          OpenDate: "李老师 copy", // 开班时间
          ShiftCampusName: "李老师 copy", // 校区名称
          ShiftName: "李老师 copy", //  课程名称
          MaxStudentsAmount: 20, // 人数
          StudentCount: 2, // 当前人数
          CreatedCourseNumbers: 68, // 计划排课次数
          CreatedCourseTimes: 68, // 上课进度
          FinishedCourseNumbers: 9, // 当前排课进度
          FinishedCourseTimes: 9, // 当前上课进度
          flag: true
        },*/
      ],
      curCampus: {
      },
      camList: [
      ],
      refreshNum:0,
      ShiftID: "",
      CampusId: "",
      opened: false, // 弹框
      selectList: [], // 勾选的班级
      bgType: 0,
      classRadio: true // 0不开启(默认)，1只能单选报班，2可以多选报班
    };
  },
  filters: {
    /* 时间 */
    timeFilters(time) {
      if (!time) return "";
      return time.replace(/-/g, ".");
    }
  },
  computed:{
    renderData(){
      return {
        camList:this.camList,
        num:this.refreshNum
      }
    }
  },
  methods: {
    changeCampus(item) {
      if (item.ID == this.CampusId){
        this.openAsCampus = !this.openAsCampus;
        return;
      } ;
      this.openAsCampus = !this.openAsCampus;
      this.curCampus = item;
      this.CampusId = item.ID;
      this.initData();
    },
    /* 选择班级 */
    changeClass(index) {
      if (this.classRadio) {
        this.list.forEach((item, i) => {
          if (i == index) {
            item.flag = !item.flag;
          } else {
            item.flag = false;
          }
        });
      } else {
        this.list[index].flag = !this.list[index].flag;
      }
    },
    closeCampus() {
      this.openAsCampus = false;
    },
    /*  关闭弹窗 */
    close() {
      this.opened = false;
    },
    /* 筛选了几个 */
    selectFlag() {
      let num = 0;
      this.list.forEach(el => {
        if (el.flag) {
          num++;
        }
      });
      return num;
    },
    /* 按钮是否可以点击 */
    isSelect() {
      let flag = true;
      this.list.forEach(el => {
        if (el.flag) {
          flag = false;
        }
      });
      if (flag) {
        return { background: "#8EC3FA" };
      } else {
        return {};
      }
    },
    /* 首次点击按钮  */
    confirm() {
      this.selectList = this.list.filter(item => item.flag);
      if (this.selectList.length > 0) {
        this.opened = true;
      }
    },
    /*  再次确认提交 */
    confirms() {
      console.log("提交");
      this.opened = false;
      this.bgType = 1;
      this.isLoading = true;
      let classIds = "";
      this.selectList.forEach(res => {
        classIds += res.ID + ",";
      });
      classIds = classIds.substring(0, classIds.length - 1);
      savePost({
        saveFlag: "studentInClass",
        classIds: classIds
      }).then(res => {
        this.isLoading = false;
        this.bgType = 0;
        if (res.errcode == 200) {
          app.toast("success", "选班成功", 1000);
          setTimeout(() => {
            app.event.emit("uplookClassData");
            this.$router.go(-1);
          }, 1000);
        } else if (res.errcode == 421) {
          // app.alert(res.errmsg);
          app.alert({
            title: "上课时间冲突提醒",
            html: `<span style="color: #3673ff;">“${
              res.data.classNameOne
            }”</span>与<span style="color: #3673ff;">“${
              res.data.classNameTwo
            }”</span>上课时间冲突，请重新选择 `
          });
          // app.alert({
          //   title: "上课时间冲突提醒",
          //   text: res.errmsg
          // });
        } else {
          app.toast("error", res.errmsg, 1000);
        }
      });
    },
    /* 选中班级的名称显示 */
    className() {
      let name = "";
      this.selectList.forEach(item => {
        if (item.flag) {
          name += item.Name + "；";
        }
      });
      return name;
    },
    getCam() {
       processPost({ pname: "campusListGranted",shiftId : this.ShiftID}).then(res => {
        if (res.errcode == 200) {
          this.camList = res.data;
          this.camList.forEach(res => {
            if (res.ID == this.CampusId) {
              this.curCampus = res;
            }
          });
          // setTimeout(() => {
          //   this.$refs.scrollBase._initScroll();
            
          // }, 0);
          // console.log(this.$refs.scrollBase._initScroll());
          // this.$refs.campusSheet &&  this.$refs.campusSheet.refresh();
        }
      });
    },
    initData() {
      this.isLoading = true;
      processPost({
        pname: "classListOfShift",
        ShiftID: this.ShiftID,
        CampusId: this.CampusId
      }).then(res => {
        console.log(res);
        if (res.errcode == 200) {
          res.data.forEach(item => {
            item.flag = false;
          });
          this.list = res.data;
          // this.$refs.scrollBase && this.$refs.scrollBase.refresh();
          this.isLoading = false;
        }
      });
    },
    openCampusActionsheet() {
      this.openAsCampus = !this.openAsCampus;
      this.refreshNum++
    }
  },
  created() {
    app.sysInfo.EnableInClassByStudent == "1"
      ? (this.classRadio = true)
      : (this.classRadio = false);
    this.ShiftID = this.$route.params["id"].split(";")[0];
    this.CampusId = this.$route.params["id"].split(";")[1];
    this.getCam();
    this.initData();
  },
  components: {
    EmptyPage
  }
};
</script>