/* 通知-选择接受班级-多选 */
<style lang="scss" scoped>


// background-color: #eef1f6;
.action-sheet {
    @include position-absolute(0, 0, 0, 0);
    // z-index: 2;
}
.noData-temp {
    @include position-absolute;
}
.as-state {
    @include position-absolute;
}
.top-search {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  height: 44px;
  .search-classname {
    display: flex;
    justify-content: space-between;
    height: 28px;
    width: 76.53333333%;
    border: 1px solid rgba(238, 241, 246, 1);
    border-radius: 100px;
    > input {
      width: inherit;
      max-width: 287px;
      height: 100%;
    }
    input::-webkit-input-placeholder {
      color: rgba(170, 170, 170, 1);
    }
    > span {
      width: 44px;
      height: 100%;
      line-height: 28px;
      background: rgba(238, 241, 246, 1);
      color: rgba(102, 102, 102, 1);
      text-align: center;
      border-radius: 100px;
    }
  }
  .rank-class-time {
    width: 44px;
    height: 28px;
    line-height: 28px;
    background: rgba(238, 241, 246, 1);
    color: rgba(102, 102, 102, 1);
    text-align: center;
    border-radius: 100px;
  }
}
.to-detail {
  &:first-child {
    margin-top: 4px;
  }
  @include border-bottom;
  background: #ffffff;
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .left-div {
    height: 100%;
    line-height: 44px;
  }
  .right-div {
    width: calc(100% - 28px);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
        max-width: 95%;
        display: flex;
        .name {
            @include ellipsis-single;
        }
        .reads {
            margin-left: 5px;
            margin-right: 5px;
            .strong {
                color: rgba(27, 112, 242, 1);
            }
        }
        .campusname {
            color: rgba(139, 87, 42, 1);
            font-size: 12px;
            @include ellipsis-single;
        }
    }
  }
}
.icon-duoxuan {
  min-width: 18px;
  min-height: 18px;
  margin-right: 10px;
}
.bottom-fixed-button {
  // position: absolute;
  height: 48px;
  background: #fff;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  padding: 12px;
  @include border-top;
  .flex-item-span {
    font-size: 15px;
    &:last-child {
      width: 24.533333%;
      min-width: 70px;
      height: 28px;
      line-height: 28px;
      color: #fff;
      background: rgba(30, 136, 245, 1);
      text-align: center;
      border-radius: 100px;
    }
  }
}
</style>
<template>
  <div class="notice-class-container">
      <action-sheet 
          class="action-sheet"
          v-show="opened"
          :position="position"
          :scrollerStyle="scrollerStyle"
          :fullParent="true"
          :data="originalClass"
          @close="closeClassAction"
          ref="noticeClassAS"
      >
          <!-- 搜索/排序 -->
          <div slot="header" class="top-search">
              <div class="search-classname">
                  <input type="text" placeholder="班级名称" v-model="searchName">
                  <span @click="searchClassName">搜索</span>
              </div>
              <div @click="openSort" class="rank-class-time">
                  排序
              </div>
          </div>

          <div class="to-detail" v-for="(item, key) in originalClass" :key="item.classid">

              <div class="left-div">
                  <svg class="icon icon-duoxuan" aria-hidden="true" @click="chooseClass(item)">
                      <use :xlink:href="item.checked==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
                  </svg>
              </div>

              <div class="right-div" @click="chooseStudent(item)">
                  <div>
                    <span class="name">{{item.classname}}</span>
                    <span class="reads">(<span :class="{strong: item.chooseNum != 0}">{{item.chooseNum}}</span>/{{item.amount}})</span>
                    <span class="campusname">{{item.campusname}}</span>
                  </div>
                  <svg class="icon card-next" aria-hidden="true">
                      <use xlink:href="#icon-youjiantou"></use>
                  </svg>
              </div>

          </div>

          <!-- 空白页 -->
          <empty-page class="noData-temp" v-if="originalClass.length == 0" :type="1001" text="没有找到班级哦"></empty-page>

            <!-- 全选，确定 -->
          <div slot="footer" class="bottom-fixed-button">
              <span class="flex-item-span" @click="chooseAll" v-if="originalClass.length>0">
                  <svg class="icon icon-duoxuan" aria-hidden="true">
                  <use :xlink:href="isAll==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
                  </svg>
                  全选
              </span>
              <span v-else> </span>
              <span class="flex-item-span" @click="ok">
                  <span v-if="originalClass.length>0">确定({{counter}})</span>
                  <span v-else>取消</span>
              </span>
          </div>


      </action-sheet>
		<loading class="loading" v-show="isLoading"></loading>
        <!--筛选-->
        <sort-sheet 
        :list="sortTag" 
        :opened.sync="opentFilter"
        @clickSort="filterType" 
        :title="sortTitle"
        :initType="'1-0'">
        </sort-sheet>

      <!-- 选择班级学生 -->
      <Checked
        :opened.sync="checked.opened"
        :checkList="checked.list"
        :header="checked.classname"
        @getStudentList="getStudentList"
        ref="checked"
        ></Checked>
  </div>
</template>
<script>
import {getclassstudentformessage} from 'teacher/api/notice';
import Checked from "./student-list.vue";
import EmptyPage from "teacher/components/common/empty-page/empty-page";

export default {
  name: "notice-class-list",
  mixins: [app.mixin.popupWindowRouteMixin],
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "sideRight"
    }
  },
  data() {
    return {
        iconType:2,
        searchName: '',
        originalClass:[],   // 接口获取的数据
        selectedClass: [],  // 接收选中的班级和学生
        acceptStudents: [], // 接收选中的学生
        backupData: [], //  缓存搜索的原始数据
        checked: {
            opened: false,
            classname: "",
            list: []
        }, //学生列表
        classid: null,
        isAll: false, // 是否选中所有
        chooseNum: 0, // 当前选中的数量
        selectClass: null, // 学生列表显示班级名称
        selectList: null, // 当前已选择列表
        counter: 0, // 总数
        scrollerStyle: {
            background: "#eef1f6"
        },
        isLoading: false,
        opentFilter: false,
        sortTitle: '班级列表排序选择',
        sortTag: [
            {name: '默认'}, 
            {name: '班级名称'}, 
            {name: '上课时间'}
        ]
    };
  },
  methods: {
	// 通过班级名称搜索
    searchClassName() {
        if(this.searchName != '') {
            // 如果没有备份过数据，就备份列表原始数据
            if(this.backupData.length == 0) {
                this.backupData = [...this.originalClass]
            }
            // 满足搜索条件的数据
            let _result = this.originalClass.filter(item => item.classname.indexOf(this.searchName) > -1);
            // 重新排列
            this.originalClass = [..._result];
        } else {
            // 如果搜索条件为空，就恢复列表顺序
            if(this.backupData.length > 0) {
                this.originalClass = [...this.backupData];
            }
        }
		// 清空搜索值
		// this.searchName = '';
    },
    // 打开排名
    openSort() {
        this.opentFilter = !this.opentFilter;
    },
    // 通过排序条件搜索
    filterType(item) {
         let param = {
            sort: item.index == 0 || item.index == 1 ? 'name' : 'date',
            desc: item.desc ? 0 : 1
        }
        this._getClassList(param.desc, param.sort);
    },
    // 选择整个班级的学生
    chooseClass(item) {
        // 选中的状态
        item.checked = !item.checked;
        // 选中后标记数量
        item.chooseNum = item.checked ? item.amount : 0;

        // 当前选中的人数
        var _counter = 0;
        this.originalClass.forEach(item1 => {
            item.studentlist = [];
            item.selectAll = true;
            _counter = _counter + item1.chooseNum;
        });
        this.counter = _counter;
                
        // 是否选中了所有班级
        this.isAll = this.originalClass.every(item2 => item2.checked);
    },
    closeClassAction() {
        this.$emit("update:opened", false);
    },
    ok() {
        /* 
            // 返回的数据格式
            [{
                "selectAll": true,
                "classid": "af45e042-1d82-4e10-933f-5269be85e64b",
                "classname": ".net从精通到零_school1_18022301",
                "amount": "",
                "courseid": "00000000-0000-0000-0000-000000000000",
                "studentlist": [{
                    "StudentID": "478e0e92-b91f-428d-a222-2a5f8ab3cd3f",
                    "StudentName": "李沐沐沐",
                    "index": "0"
            }]
        }] */
        // 确认时返回已选择的接收人
        this.selectedClass = app.tool.clone(this.originalClass);
        // 提交时不需要这个字段
        delete this.selectedClass.messagestudentinfo;
        // 提交数据到notice-add.vue
        this.$emit("getAccpets", this.selectedClass.filter(item => item.selectAll || item.chooseNum > 0));
        // 关闭面板
        this.closeClassAction();
    },
    chooseAll() {
      let _counter = 0;
      // 切换全选状态
      this.isAll = !this.isAll;
      // 全选的数量
      this.originalClass.forEach(item => {
        if (this.isAll) {
          item.checked = true;
          item.chooseNum = item.amount;
          item.studentlist = [];
          item.selectAll = true;
          _counter = _counter + item.amount;
        } else {
          item.checked = false;
          item.chooseNum = 0;
          item.selectAll = false;
        }
      });
      this.counter = _counter;
    },
    // 选择班级里的学生
    chooseStudent(item) {
        const self = this;
        // 打开接收人选择面板
        self.checked.opened = true;
        // 当前选中的班级id
        self.classid = item.classid;
        // 传班级名称给checked组件
        self.checked.classname = item.classname;

        // 是否有选择过：1，学生列表选择后保存的数据；2，直接选中某个班的所有学生
        let _choosed = self.acceptStudents.some(_item => self.classid == _item.classid);
        // 没有就初始化checked.list
        if (!_choosed) {
            // 调试中:item.messagestudentinfo新增一个isread字段，发布通知时后端需要
            item.messagestudentinfo.forEach(item => {
                item['isread'] = 0;
            });
            self.checked.list = [...item.messagestudentinfo]
            // 判断进入学生列表时是否已经有选中的班级，就全选该班级的学生
            const _some = this.studentAllChoose(item);
            self.checked.list.forEach((__item, key) => {
                _some ? __item.checked = true : __item.checked = false;
                
                // 数据最终将提交给页面，这里处理成接口需要的数据
                __item['index'] = key;
            });
        } else {
            // 存在记录就返回这条记录
            self.checked.list = self.acceptStudents.filter(item => item.classid == self.classid)[0].studentlist;
        }
        // 选中该班所有学生时，chooseNum == self.checked.list.length
        if(item.chooseNum != 0 && item.chooseNum == self.checked.list.length) {
            self.checked.list.forEach(item => {
                item.checked = true;
            });
        }
        //   console.log("选择的学生------->", item, self.checked.list);
    },
    // 获取该班选择的学生，缓存到tempStudents，点击确定后返回给notice-add.vue
    getStudentList(data) {
        console.log(data)
      // data:{chooseNum: this.chooseNum,list: this.checkList}
      // acceptStudents: [{classid: 0, name:'', chooseNum: 0, list:[]}]
      const self = this;
      // 更新templist
      if (self.acceptStudents.length > 0) {
        self.acceptStudents.forEach(item => {
          // 如果已经选择过该班级的学生就直接展示记录
          if (item.classid === self.classid) {
            item.studentlist = data.list; // 更新选中的学生
            item.chooseNum = data.chooseNum; // 更新选中的数量
          } else {
            self.acceptStudents.push({
              classid: self.classid, // 当前选择的班级的id
              classname: self.checked.classname, // 当前选择的班级的名称
              chooseNum: data.chooseNum, // 当前选择班级的学生数量
              studentlist: data.list // 当前选择班级的学生列表
            });
          }
        });
      } else {
        self.acceptStudents.push({
          classid: self.classid, // 当前选择的班级的id
          classname: self.checked.classname, // 当前选择的班级的名称
          chooseNum: data.chooseNum, // 当前选择班级的学生数量
          studentlist: data.list // 当前选择班级的学生列表
        });
      }

      self.counter = 0;
      // 更新当前选择的班级的状态
      self.originalClass.forEach(item => {
		  // 更新当前班级选择的人数
        if (item.classid === self.classid) {
          item.chooseNum = data.chooseNum;
          item.studentlist = data.list.filter(item => item.checked);
        }
		// 更新选中状态
		item.amount != 0 && item.amount == item.chooseNum ? item.checked = true : item.checked = false;
        // 更新总数
        self.counter = self.counter + item.chooseNum;
        // 是否选中了整个班级
        item.selectAll = item.checked;
      });
	},
	// 是否已经选中了该班的所有人
	studentAllChoose(currentItem) {
		const _filter = this.originalClass.filter(_filter => _filter.chooseNum > 0)
		const _some = _filter.some(_some => currentItem.classid == _some.classid);
		return _some;
    },
    _getClassList(desc = 0, sort = 'name') {
        this.isLoading = true;
        let self = this,
            _params = {
                uid: app.sysInfo.id,
                userrole: app.sysInfo.currole.id == 4 ? 3 : app.sysInfo.currole.id == 16 ? 1 : 2,
                sortfield: sort,
                isdesc: desc,
                querybyname: ''
            };
        getclassstudentformessage(_params).then(res => {
            this.isLoading = false;
            if (res.result.code == 200) {
                self.originalClass = res.data.messageshiftinfo;

                // 数据最终将提交给页面，这里处理成接口需要的数据
                self.originalClass.forEach(item => {
                    self.$set(item, 'checked', false);
                    self.$set(item, 'chooseNum', 0);
                });
            }
        });
    }
  },
  watch: {
    opened(newVal) {
        // 初始化列表数据
        let self = this;
        if (newVal) {
                // 如果有选择过班级并确定selectedClass.list一定有值，这也是回显的数据
            if (self.selectedClass.length > 0) {
                // 如果已经请求过班级数据，传入选择后的班级列表。状态回显
                self.originalClass = app.tool.clone(self.selectedClass);
                this.isLoading = false;
            } else {
               this._getClassList();
            }
        } else {

        }
	}
  },
  components: {
    EmptyPage,
    Checked
  }
};
</script>
