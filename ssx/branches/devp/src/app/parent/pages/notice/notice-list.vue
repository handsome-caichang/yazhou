<!--通知、公告列表页-->
<style lang="scss" scoped>
.notice-list {
    .header {
        .tab {
            display: flex;
            height: 40px;
            font-size: 15px;
            @include border-bottom;
            .tab-item {
                flex: 1;
                @include flex-center;
                &:first-child {
                    @include border-right;
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
                .tab-item-amount {
                    @include flex-center;
                    background-color: #ff3c00;
                    color: $color-white;
                    font-size: 12px;
                    margin-top: -10px;
                    height: 16px;
                    line-height: 16px;
                    padding: 0 4px;
                    min-width: 16px;
                    border-radius: 8px;
                }
            }
        }
    }
    .body {
        @include position-absolute(40px);
        .card {
            line-height: 1;
            height: 76px;
            padding: 20px 33px 20px 15px;
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
                .name-icon {
                    display: inline-block;
                    vertical-align: top;
                }
                svg {
                    font-size: 13px;
                }
            }
            .card-bd {
                padding-top: 6px;
                font-size: 12px;
                color: $color-9;
                .cname {
                    display: inline-block;
                    max-width: 60%;
                    margin-left: 14px;
                    vertical-align: top;
                    @include ellipsis-single;
                }
            }
            .card-badge {
                position: absolute;
                right: 26px;
                top: 0;
                bottom: 0;
                margin: auto 0;
                display: inline-block;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: #ff3c00;
            }
            .card-next {
                position: absolute;
                right: 12px;
                top: 0;
                bottom: 0;
                margin: auto 0;
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
      <!-- 去除日期筛选,默认所有 -->
      <!-- <div class="date">
	        	<date-bar :sdate='pagingOption.params.sdate' :edate='pagingOption.params.edate' :index="quickDateIndex" @changeDate="changeDate"></date-bar>
			</div>
        	<div class="void"></div> -->
      <div class="tab">
        <div class="tab-item" @click="changeTab(0)">
          <div class="tab-item-text" :class="{active : activePage == 0}">老师通知</div>
          <div class="tab-item-amount" v-show="msgUnRead > 0">{{msgUnRead}}</div>
        </div>
        <div class="tab-item" @click="changeTab(1)">
          <div class="tab-item-text" :class="{active : activePage == 1}">学校公告</div>
          <div class="tab-item-amount" v-show="pblIfUnRead > 0">{{pblIfUnRead}}</div>
        </div>
      </div>
    </div>
    <!-- 列表部分 -->
    <scroller-super v-show="activePage == 0" class="body" :type="2" :data="messageList" :pagingOption="pagingOption" ref="myScroller" @loadData="loadDataMessage">
      <router-link tag="div" class="card" v-for="item in messageList" :to="`/noticeDetail/${item.teacheruserid}?type=${activePage}&id=${item.messageid}`" :key="item.id">
        <div class="card-hd">
          <span class="name">{{item.title }}</span>
          <span class="name-icon">
            <svg class="icon" aria-hidden="true" v-if="item.isFile==1">
              <use xlink:href="#icon-guanlian"></use>
            </svg>
          </span>
        </div>
        <div class="card-bd">
          <span v-if="activePage == 0">{{item.createtime | formatDatetime('MM.dd hh:mm')}}</span>

          <span class="cname">{{item.classname}}</span>
        </div>
        <div class="card-badge" v-if="item.isread==0"></div>
        <svg class="icon card-next" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </router-link>
      <empty-page class="noData-temp" :type="activePage == 0 ? 3 : 4" v-if="list.length == 0"></empty-page>
    </scroller-super>

    <scroller-super v-show="activePage == 1" class="body" :type="2" :data="list" :pagingOption="mpagingOption" ref="myMessageScroller" @loadData="loadData">
      <router-link tag="div" class="card" v-for="item in list" :to="`/noticeDetail/${item.id}?type=${activePage}`" :key="item.id">
        <div class="card-hd">
          <span class="name">{{item.title}}</span>
          <span class="name-icon">
            <svg class="icon" aria-hidden="true" v-if="item.isFile==1">
              <use xlink:href="#icon-guanlian"></use>
            </svg>
          </span>
        </div>
        <div class="card-bd">

          <span v-if="activePage == 1">{{item.date | formatDatetime('MM.dd')}}</span>
          <span class="cname">{{item.className}}</span>
        </div>
        <div class="card-badge" v-if="item.isRead==0"></div>
        <svg class="icon card-next" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </router-link>
      <empty-page class="noData-temp" :type="activePage == 0 ? 3 : 4" v-if="list.length == 0"></empty-page>
    </scroller-super>
    <loading class="loading" v-show="isLoading"></loading>
  </div>
</template>

<script>
import {
    getnoticelist,
    getmessagelistforstudent,
    gethomepageinfo
} from "parent/api/common";
import EmptyPage from "parent/components/common/empty-page/empty-page";

const TAB_PAGE = ["message", "publicInfo"];
let tmpPage = 0;

export default {
    name: "notice-list",
    data() {
        return {
            wxTitle: "消息通知",
            list: [],
            messageList: [],
            isLoading: true,
            quickDateIndex: 3, //快捷日期
            activePage: 0, //选项卡是老师通知0:'message' 还是学校公告1:'publicInfo'
            msgUnRead: 0, //未读的老师通知数量
            pblIfUnRead: 0, //未读的学校公告数量
            pagingOption: {
                api: getmessagelistforstudent,
                params: {
                    // pname: TAB_PAGE[0],
                    // type: 4,
                    startdate: "",
                    enddate: ""
                },
                pageOpt: {
                    isdesc: false,
                    sortfield: "",
                    indexKey: "pageindex", // 分页初始页码的'key'、'value'
                    indexVal: 1,
                    sizeKey: "pagesize", // 每页请求数据长度的'key'、'value'
                    sizeVal: 20,
                    countKey: "totalpage" // 后端返回的总页数'key'
                }
            },
            mpagingOption: {
                api: getnoticelist,
                params: {
                    // pname: TAB_PAGE[0],
                    // type: 4,
                    startdate: "",
                    enddate: ""
                },
                pageOpt: {
                    isdesc: false,
                    sortfield: "",
                    indexKey: "pageindex", // 分页初始页码的'key'、'value'
                    indexVal: 1,
                    sizeKey: "pagesize", // 每页请求数据长度的'key'、'value'
                    sizeVal: 20,
                    countKey: "totalpage" // 后端返回的总页数'key'
                }
            }
        };
    },
    methods: {
        loadData(ajaxPromise) {
            ajaxPromise.then(res => {
                this.isLoading = false;
                if (res.result.code == app.errok) {
                    if (res.page.pageindex === 1) {
                        this.list = [];
                    }
                    this.list = this.list.concat(res.data);
                }
            });
        },
        loadDataMessage(ajaxPromise) {
            ajaxPromise.then(res => {
                this.isLoading = false;

                if (res.result.code == app.errok) {
                    if (res.page.pageindex === 1) {
                        this.messageList = [];
                    }
                    this.messageList = this.messageList.concat(res.data);
                }
            });
        },
        /*changeDate(obj){
				let params = this.pagingOption.params;
				obj.sdate && (params.sdate= obj.sdate);
				obj.edate && (params.edate = obj.edate);
				(obj.index !== undefined) && (this.quickDateIndex = obj.index);
				this.$refs.myScroller.refresh(params);
			},*/

        changeTab(num) {
            if (this.activePage == num) return;
            tmpPage = num;
            this.activePage = tmpPage;
            this.$refs.myScroller.refresh({});
            this.$refs.myMessageScroller.refresh({});
        }
    },
    created() {
        let param = app.tool.parseHash(),
            type = param.query.type == 1 ? 1 : 0;
        console.log(param.query);
        this.activePage = tmpPage = type;
        // this.pagingOption.params.pname = TAB_PAGE[type];
        if (app.sysInfo.message_unread !== undefined) {
            this.msgUnRead = app.sysInfo.message_unread;
            this.pblIfUnRead = app.sysInfo.publicInfo_unread;
        } else {
            gethomepageinfo({ isparent: 1 }).then(res => {
                console.log(res);
                if (res.result.code === app.errok) {
                    this.msgUnRead = app.sysInfo.message_unread = +res.data
                        .message;
                    this.pblIfUnRead = app.sysInfo.publicInfo_unread = +res.data
                        .publicInfo;
                }
            });
        }
    },
    mounted() {
        //一旦读取了某条未读通知,那么把该通知的置为已读
        app.eventDefine.on("notice_list_read_event", (type, id) => {
            this.list.some(item => {
                if (item.id == id && item.isRead == 0) {
                    item.isRead = 1;
                    if (this.activePage == 0) {
                        this.msgUnRead--;
                        app.sysInfo.message_unread--;
                    } else {
                        this.pblIfUnRead--;
                        app.sysInfo.publicInfo_unread--;
                    }
                }
            });
        });
    },
    beforeDestroy() {
        app.eventDefine.off("notice_list_read_event");
    },
    components: {
        EmptyPage
    }
};
</script>