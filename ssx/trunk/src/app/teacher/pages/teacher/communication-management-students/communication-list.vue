<style lang="scss" scoped>
    
	

    .communication-list {
        background-color: #eef1f6;
        /* 页签 */
        .tab {
            background-color: #ffffff;
            width: 100%;
            height: 49px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            @include border-bottom;
            line-height: 26px;
            .tab-item {
                margin: 0;
                width: 46.13333333%;
                height: 26px;
                border: 1px solid #1E88F5;
            }
            .active {
                background-color: #1E88F5;
                color: #ffffff;
                font-size: 15px;
                position: relative;
            }
            .date {
                font-size: 12px;
            }
            .corner {
                background-color: #FF735C;
                position: absolute;
                top: 4px;
                right: 10px;
                width: 17px;
                height: 17px;
                line-height: 18px;
                font-size: 12px;
                color: #ffffff;
                border-radius: 100%;
            }
            .un-active {
                font-size: 15px;
                color: #1E88F5;
                position: relative;
                .date {
                    color: #878787;
                }
                
            }
        }
        /* 查询栏 */
        .serach {
            background-color: #ffffff;
            height: 49px;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .filter-box {
                display: flex;
                .btn {
                    font-size: 13px;
                    text-align: center;
                    width: 48px;
                    height: 28px;
                    line-height: 28px;
                    background-color: #eef1f6;
                    color: #666666;
                    border-radius: 50px;
                }
            }
        }
        /* 搜索 */
        .serach-box {
            display: flex;
            border: 1px solid #EEF1F6;
            border-radius: 100px;
            width: 64%;
            ::-webkit-input-placeholder {
                color: #BBBBBB;
                font-size: 12px;
            }
            span {
                width: 49px;
                height: 100%;
                line-height: 28px;
                text-align: center;
                color: #666666;
                background-color: #eef1f6;
                border-radius: 100px;
            }
        }
        /* 列表 */
        .list-container {
            position: absolute;
			top: 98px;
			bottom: 0;
			left: 0;
			right: 0;
            .scroller {
				@include position-absolute;
				overflow: hidden;
				// padding-top: 4px;
			}
            .item {
                background-color: #ffffff;
                min-height: 224.5px;
                margin-top: 5px;
                .top-layout {
                    min-height: 44px;
                    @include border-bottom;
                    padding: 7px 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .user {
                        display: flex;
                        align-items: center;
                        max-width: 83%;
                        .photo {
                            display: inline-block;
                            min-width: 30px;
                            min-height: 30px;
                            border-radius: 100%;
                            background-size: contain;
                            background-color: #eef1f6;
                        }
                        .name {
                            font-size: 16px;
                            color: #333333;
                            margin-left: 8px;
                            max-width: 58%;
                        }
                        .c-num {
                            font-size: 12px;
                            color: #999999;
                            margin-left: 8px;
                        }
                    }
                    .pre-commnuication {
                        .tip {
                            font-size: 12px;
                            color: #8B572A;
                        }
                    }
                }
                .center-layout {
                    padding: 0 12px;
                    max-height: 128.5px;
                    .center-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 12px;
                        width: 100%;
                        height: 24.5px;
                        &:first-child {
                            margin-top: 8px;
                        }
                        &:last-child {
                            margin-bottom: 5px;
                        }
                        span:first-child {
                            color: #666666;
                        }
                        span:last-child {
                            color: #333333;
                        }
                        span.light {
                            color: #1E88F5;
                        }
                    }
                }
                .bottom-layout {
                    height: 44px;
                    padding: 0 12px;
                    @include border-top;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    font-size: 12px;
                    .open-phone, .to-buy-detail {
                        padding: 3px 9px;
                        border: 1px solid #1E88F5;
                        color: #1E88F5;
                        border-radius: 100px;
                        margin-left: 12px;
                    }
                }
            }
        }
        /* 空白页 */
        .noData-temp {
            @include position-absolute;
        }
        /* 筛选 */
        .as-state {
            @include position-absolute(0, 0, 0, 0);
            z-index: 2;
        }
        .action-sheet {
            @include position-absolute(0, 0, 0, 0);
            z-index: 2;
        }
    }
</style>
<template>
    <div class="communication-list">
        <!-- tab -->
        <div class="tab">
            <span class="tab-item" :class="[pagingOption.params.type == 0 ? 'active' : 'un-active']" @click="changeTab('all')">
                <span>全部</span>
            </span>
            <span class="tab-item" :class="[pagingOption.params.type == 1 ? 'active' : 'un-active']" @click="changeTab">
                <span>待沟通</span>
                <!-- <span class="date">{{ date }}</span> -->
                <span class="corner" v-show="corner > 0">{{ corner }}</span>
            </span>
        </div>

        <!-- 条件筛选 -->
        <div class="serach">
            <!-- 搜索框 -->
            <div class="serach-box">
                <input type="text" placeholder="姓名/电话/学号" v-model="pagingOption.params.query">
                <span @click="serachList">搜索</span>
            </div>
            <div class="filter-box">
                <span class="btn" @click="showSortBox">排序</span>
                <span class="btn" @click="showFilterBox" v-if="pagingOption.params.type == 0">筛选</span>
            </div>
		</div>

        <!-- 全部/待沟通 -->
        <div class="list-container">
            <scroller-super 
				class="scroller" 
				:type="2" 
				:data="list" 
				:pagingOption="pagingOption" 
				@loadData="loadData" 
				ref="communicationListIScroller">
				<div v-for="item in list" :key="item.ID" class="item">
                    <!-- 头像，用户名 -->
					<div class="top-layout" @click="toCommunicationDetail(item.ID)">
                        <div class="user">
                            <span class="photo" :style="'backgroundImage: url('+item.Photo+')'"></span>
                            <span class="name">{{ item.Name }}</span>
                            <span class="c-num">沟通次数：{{ item.CommunicationCount }}</span>
                        </div>
                        <div class="pre-commnuication">
                            <span class="tip" v-if="item.CommunicationType == 1">待沟通</span>
                            <svg class="icon card-next" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>

                    <!-- 沟通记录 -->
                    <div class="center-layout" @click="toCommunicationDetail(item.ID)">
                        <div class="center-item"><span>上次沟通</span><span>{{ item.LastDate && item.LastDate.split('T')[0] || '' }}</span></div>
                        <div class="center-item"><span>下次沟通</span><span>{{ item.NextDate && item.NextDate.split('T')[0] || '待定' }}</span></div>
                        <div class="center-item"><span>手机号码</span><span>{{ item.SMSTel }}</span></div>
                        <div class="center-item"  v-if="app.tool.op('StudentFeeQuery')"><span>剩余学费</span><span class="light">￥{{ item.Money|formatNumber }}</span></div>
                        <div class="center-item"><span>学管师</span><span>{{ item.MasterUserName }}</span></div>
                    </div>
                    <div class="bottom-layout">
                        <a :href="'tel:' + item.SMSTel " class="open-phone" v-if="app.tool.op('StudentTelQuery')">拨号</a>
                        <span class="to-buy-detail" @click="checkBuyDetail(item.ID)">查看购买详情</span>
                    </div>
				</div>
				
				<empty-page class="noData-temp" v-if="list.length == 0" :type="4" :text="noneTips"></empty-page>
			</scroller-super>
        </div>

        <!-- 排序 -->
        <sort-sheet 
        :list="sortFilter.arr" 
        :opened.sync="sortFilter.opened"
        @clickSort="sortType" 
        :title="sortFilter.title"
        :initType="'1-0'">
        </sort-sheet>

        <!-- 筛选 -->
        <FilterList :opened.sync="filter.opened" @filterParam="filterParam">
        </FilterList>

        <!-- Loading -->
        <loading class="loading" v-show="isLoading" :bgType="bgType"></loading>
    </div>
</template>
<script>
    import EmptyPage from "teacher/components/common/empty-page/empty-page";
    import {getCommunicationList} from "teacher/api/communication";
    import FilterList from "./child/filter.vue";

    export default {
        name: "communication-list",
        components: {
            EmptyPage,
            FilterList
        },
        data() {
            return {
                wxTitle: '学员沟通',
                list: [],
                date: '(近7天)', // tab上的时间
                corner: 0, // tab上的角标
                bgType: 0,
                noneTips: '没有沟通记录哦',
                pagingOption: {
                    api: getCommunicationList,
                    params: {
                        pname: 'communication',
                        query: '',
                        cost: '',
                        endcost: '',
                        snextdate: '', 
                        enextdate: '',
                        sort: 'LastDate',
                        desc: 1,
                        type: '',
                        sdate: '',
                        edate: '',
                        classid: ''
                    },
                    pageOpt: {
						// 分页初始页码的'key'、'value'
						indexKey: "page",
						indexVal: 1,
						// 每页请求数据长度的'key'、'value'
						sizeKey: "pageSize",
						sizeVal: 20,
						// 后端返回的总页数'key'
						countKey: "pageCount"
					}
                },
                params: {
                    cost: '',
                    endcost: '',
                    snextdate: '', 
                    enextdate: '',
                    sdate: '',
                    edate: '',
                    type: ''
                },
                weekData: [],
                // 排序
                sortFilter: {
                    opened: false,
                    title: '沟通学员排序',
                    arr: [
                        {name: '姓氏'}, 
                        {name: '沟通时间'}, 
                        {name: '跟进时间'}
                    ],
                    iconType: 2
                },
                filter: {
                    opened: false
                },
                isLoading: true
            }
        },
        created() {
            // 只是为了获取最近7天的沟通记录数量
            let params = Object.assign({}, this.pagingOption.params, {
                sdate: '',
                edate: '',
                snextdate: '', 
                // enextdate: app.filters.formatDatetime(new Date(Number(new Date())+7*1000*24*3600), 'yyyy-MM-dd'),
                enextdate: '',
                type: 1,
            });
            getCommunicationList(params).then(res => {
                this.isLoading = false;
                if(res.errcode == 200) {
                    // type为1时，请求了最近7天的数据
                    this.corner = res.totalCount;
                }
            });
        },
        methods: {
            // 查询全部的沟通记录
            loadData(ajaxPromise) {
                let self = this;
                ajaxPromise.then(res => {
                    self.isLoading = false;
                    if(res.errcode == 200) {
                        self.list = res.pageIndex == 1 ? [].concat(res.data) : [].concat(self.list, res.data);
                    }
                })
            },
            // 切换页签
            changeTab(flag) {
                // 最近7天： type: 1
                this.pagingOption.params.type =  flag === 'all' ? '' : 1;
                if(this.pagingOption.params.type == 1) {
                    this.bgType = 1;
                    this.isLoading = true;
                    this.noneTips = '没有待沟通记录哦';
                    Object.assign(this.pagingOption.params, {
                        sdate: '',
                        edate: '',
                        snextdate: '', 
                        // enextdate: app.filters.formatDatetime(new Date(Number(new Date())+7*1000*24*3600), 'yyyy-MM-dd'),
                        enextdate: '',
                        type: 1,
                    });
                    this._refresh();
                } else {
                    this.noneTips = '没有沟通记录哦';
                    Object.assign(this.pagingOption.params, this.params);
                    this._refresh();
                }
            },
            // 搜索按钮
            serachList() {
                // 查询字段： query: '***'
                this._refresh();
            },
            // 排序
            showSortBox() {
                this.sortFilter.opened = true;
            },
            sortType(item) {
                // 全部、默认（沟通时间倒序排列）：pname: communication, desc 1, sort: 'LastDate', type: ''
                // 沟通时间正序排列： desc 0, sort: 'LastDate'
                // 按姓名倒序： desc 1, sort: 'Name'
                // 按姓名正序： desc 0, sort: 'Name'
                // 按下次跟进时间倒序： desc 1, sort: 'NextDate'
                // 按下次跟进时间倒序： desc 0, sort: 'NextDate'
                // 确定正序倒序
                this.pagingOption.params.desc = item.desc ? 0 : 1;
                console.log(item)
                // 确定排序字段
                this.pagingOption.params.sort = item.index == 0 ? 'Name' : 
                    item.index == 1 ? 'LastDate' : 'NextDate';
                this._refresh();
            },
            // 筛选
            showFilterBox() {
                this.filter.opened = true;
            },
            // 返回筛选条件
            filterParam(params) {
                // 筛选条件只筛选全部
                Object.assign(this.params, params);
                Object.assign(this.pagingOption.params, this.params);
                this._refresh();
            },
            // 查看沟通详情
            toCommunicationDetail(studentID) {
                this.$router.push({path: `/communicationRecord/${studentID}`, component: '/communicationRecord/'});
            },
            // 查看购买详情
            checkBuyDetail(studentUserID) {
                this.$router.push({path: `/buyDetail/${studentUserID}`, component: 'buyDetail'})
                console.log('查看购买详情')
            },
            // 按条件查询
            _refresh() {
                this.bgType = 1;
                this.isLoading  = true;
                this.$refs.communicationListIScroller.refresh();
            }
        }
    }
</script>
