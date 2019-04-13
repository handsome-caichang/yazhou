<style lang="scss" scoped>
    
	

    .buy-detail {
        background-color: #eef1f6;
        /* 列表 */
        .list-container {
            position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
            .scroller {
				@include position-absolute;
				overflow: hidden;
			}
            .item {
                background-color: #ffffff;
                // max-height: 172px;
                margin-bottom: 5px;
                .first-column {
                    color: #999999;
                }
                .body-column {
                    color: #666666;
                }
                .class-name {
                    color: #333;
                    font-size: 16px;
                    // display: flex;
                    // flex-direction: row;
                    // align-items: center;
                    padding: 12px;
                    .campus {
                        color: #8B572A;
                        font-size: 12px;
                        padding-left: 10px;
                    }
                }
                .center-table {
                    padding: 0 12px;
                    >div {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 0;
                        span {
                            height: 100%;
                            &:not(:nth-child(1)) {
                                text-align: right;
                                flex: 3;   
                            }
                        }
                    }
                }
                .total {
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 12px;
                    color: #999999;
                    @include border-top;
                    span {
                        height: 100%;
                            text-align: right;
                        &:not(:nth-child(1)) {
                            flex: 3;   
                        }
                    }
                    .light {
                        color: #1E88F5;
                    }
                    .warm {
                        color: #ff3c00;
                    }
                }
            }
        }
        /* 空白页 */
        .noData-temp {
            @include position-absolute;
        }
        .action-sheet {
            @include position-absolute(0, 0, 0, 0);
            z-index: 2;
        }
    }
</style>
<template>
    <div class="buy-detail">

        <!-- 购买详情 -->
        <div class="list-container">
            <scroller-super 
				class="scroller" 
				:type="2" 
				:data="list" 
				:pagingOption="pagingOption" 
				@loadData="loadData" 
				ref="buyDetailIScroller">

				<div v-for="item in list" :key="item.ShiftID" class="item">
                    
                    <!-- 班级校区 -->
                    <div class="class-name">
                        <span>{{ item.ShiftName}}</span>
                        <span class="campus" v-if="item.ShiftCampusNameList.length > 0">
                            <span v-for="(campus, key1) in item.ShiftCampusNameList" :key="key1">
                                {{ campus.CampusName }}
                            </span>
                        </span>
                    </div>

                    <!-- 表格 -->
                    <div class="center-table">
                        <div class="buy">
                            <span class="first-column">购买：</span>
                            <span class="body-column">{{ item.ShiftBuyAmount + item.UnitName }}</span>
                            <span class="body-column" v-if="app.sysInfo.StudentFeeQuery==1">￥{{ item.ShiftBuyMoney|formatNumber }}</span>
                        </div>
                        <div class="used">
                            <span  class="first-column">消费：</span>
                            <span class="body-column">{{ item.ShiftConsumeAmount + item.UnitName }}</span>
                            <span class="body-column" v-if="app.sysInfo.StudentFeeQuery==1">￥{{ item.ShiftConsumeMoney|formatNumber }}</span>
                        </div>
                        <div class="expire" v-if="app.sysInfo.EnableFeeOutDate=1">
                            <span class="first-column">过期：</span>
                            <span class="body-column">{{ item.ShiftOutDateAmount + item.UnitName }}</span>
                            <span class="body-column" v-if="app.sysInfo.StudentFeeQuery==1">￥{{ item.ShiftOutDateMoney|formatNumber }}</span>
                        </div>
                    </div>

                    <!-- item底部汇总 -->
                    <div class="total">
                        <span>剩余：</span>
                        <span>{{ item.ShiftRemainAmount + item.UnitName }}</span>
                        <span :class="[item.ShiftRemainMoney > 0 ? 'light' : 'warm']" v-if="app.sysInfo.StudentFeeQuery==1">￥{{ item.ShiftRemainMoney|formatNumber }}</span>
                    </div>
				</div>
				
				<empty-page class="noData-temp" v-if="list.length == 0" :type="4" :text="noneTips"></empty-page>
			</scroller-super>
        </div>

        <!-- Loading -->
        <loading class="loading" v-show="isLoading" :bgType="bgType"></loading>
    </div>
</template>
<script>
    import EmptyPage from "teacher/components/common/empty-page/empty-page";
    import {getCommunicationList} from "teacher/api/communication";

    export default {
        name: "buy-detail",
        components: {
            EmptyPage
        },
        data() {
            return {
                wxTitle: '购买详情',
                list: [],
                noneTips: '还没有购买记录哦',
                pagingOption: {
                    api: getCommunicationList,
                    params: {
                        pname: 'courseConsume_Student',
                        studentUserID: this.$router.currentRoute.params.studentUserID,
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
                bgType: 0,
                isLoading: true
            }
        },
        methods: {
            // 查询全部的沟通记录
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if(res.errcode == 200) {
                        this.list = res.pageIndex == 1 ? [].concat(res.data) : [].concat(this.list, res.data);
                    }
                })
            },
            // 按条件查询
            _refresh() {
                this.bgType = 1;
                this.isLoading  = true;
                this.$refs.buyDetailIScroller.refresh(this.pagingOption.params);
            }
        }
    }
</script>
