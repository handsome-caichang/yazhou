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
            }
            .un-active {
                font-size: 15px;
                color: #1E88F5;
                position: relative;
                .date {
                    font-size: 12px;
                    color: #878787;
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
            }
        }
        /* 筛选 */
        .serach {
            background-color: #ffffff;
            height: 49px;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
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
				padding-top: 4px;
			}
            .item {
                background-color: #ffffff;
                height: 224.5px;
                margin-top: 5px;
                .top-layout {
                    height: 44px;
                    @include border-bottom;
                    padding: 0 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .user {
                        display: flex;
                        align-items: center;
                        .photo {
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            border-radius: 100%;
                            background-size: contain;
                            background-color: #eef1f6;
                        }
                        .name {
                            font-size: 16px;
                            color: #333333;
                            margin-left: 8px;
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
                    height: 128.5px;
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
    }
</style>
<template>
    <div class="communication-list">
        <!-- tab -->
        <div class="tab">
            <span class="tab-item" :class="[!isActive ? 'active' : 'un-active']">
                <span>全部</span>
            </span>
            <span class="tab-item" :class="[isActive ? 'active' : 'un-active']">
                <span>待沟通</span>
                <span class="date">{{ date }}</span>
                <span class="corner">{{ corner }}</span>
            </span>
        </div>

        <!-- 条件筛选 -->
        <div class="serach">
			<date-bar 
				:sdate='pagingOption.params.sdate' 
				:edate='pagingOption.params.edate' 
				:index="quickDateIndex" 
				@changeDate="changeDate">
			</date-bar>
            <span class="btn">排序</span>
            <span class="btn">筛选</span>
		</div>

        <!-- 全部/待沟通 -->
        <div class="list-container">
            <scroller-super 
				class="scroller" 
				:type="2" 
				:data="list" 
				:pagingOption="pagingOption" 
				@loadData="loadData" 
				ref="announcementListIScroller">
				<div v-for="item in list" :key="item.ID" class="item">
                    <!-- 头像，用户名 -->
					<div class="top-layout">
                        <div class="user">
                            <span class="photo" :style="'backgroundImage: url('+item.Photo+')'"></span>
                            <!-- <img :src="item.Photo" class="photo"> -->
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
                    <div class="center-layout">
                        <div class="center-item"><span>上次跟进</span><span>{{ item.LastDate }}</span></div>
                        <div class="center-item"><span>下次跟进</span><span>{{ item.NextDate }}</span></div>
                        <div class="center-item"><span>手机号码</span><span>{{ item.SMSTel }}</span></div>
                        <div class="center-item"><span>剩余学费</span><span class="light">{{ item.Money }}</span></div>
                        <div class="center-item"><span>学管师</span><span>{{ item.MasterUserName }}</span></div>
                    </div>
                    <div class="bottom-layout">
                        <span class="open-phone">拨号</span>
                        <span class="to-buy-detail">查看购买详情</span>
                    </div>
				</div>
				
				<empty-page class="noData-temp" v-if="list.length == 0" :type="4" text="还没有沟通记录哦"></empty-page>
			</scroller-super>
        </div>

        <!-- 空白页 -->
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>
<script>
    import EmptyPage from "teacher/components/common/empty-page/empty-page";
    import {getCommunicationList} from "teacher/api/communication";

    export default {
        name: "communication-list",
        components: {
            EmptyPage
        },
        data() {
            return {
                list: [],
                quickDateIndex: -1,
                date: '(近7天)', // tab上的时间
                corner: '8', // tab上的角标
                isActive: false, // 是否为活动页签
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
                        sdate: app.tool.getDatesByIndex(4, app.localTimeToServer).sdate,
						edate: app.tool.getDatesByIndex(4, app.localTimeToServer).edate
                    },
                    pageOpt: {
						// 分页初始页码的'key'、'value'
						indexKey: "pageIndex",
						indexVal: 1,
						// 每页请求数据长度的'key'、'value'
						sizeKey: "pageSize",
						sizeVal: 20,
						// 后端返回的总页数'key'
						countKey: "pageCount"
					}
                },
                
                isLoading: true
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if(res.errcode == 200) {
                        this.list = res.pageIndex == 1 ? [].concat(res.data) : [].concat(this.list, res.data)
                    }
                })
            },
            changeDate(date) {
                this.quickDateIndex = date.index;
                this.isLoading = true;
            }
        }
    }
</script>
