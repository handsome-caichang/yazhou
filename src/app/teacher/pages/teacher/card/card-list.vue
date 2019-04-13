<style lang="scss" scoped>
    .communication-list {
        background-color: #eef1f6;
        /* 查询栏 */
        .serach {
            background-color: #ffffff;
            height: 49px;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        /* 搜索 */
        .serach-box {
            display: flex;
            border: 1px solid #EEF1F6;
            border-radius: 100px;
            width: 80%;
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
			top: 54px;
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
                margin-top: 5px;
                position: relative;
                .yijinyong {
                    width: 50px;
                    height: 50px;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    opacity: 0.4;
                }
                .top-layout {
                    min-height: 44px;
                    @include border-bottom;
                    padding: 7px 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .user {
                        max-width: 76%;
                        .photo {
							color: #fff;
                            display: inline-block;
                            border-radius: 16px;
							font-size: 12px;
							padding: 2px 5px;
                            width: 46px;
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
                        .icon{
                            vertical-align: bottom;
                        }
                        .tip {
							// margin-right: 8px;
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
    }
</style>
<template>
    <div class="communication-list">
        <!-- 条件筛选 -->
        <div class="serach">
            <!-- 搜索框 -->
            <form class="serach-box" action="javascript:;">
                <input ref="searchDom" type="search" placeholder="电子推荐卡名称" v-model="searchName">
                <span @click="search">搜索</span>
            </form>
		</div>
        <!-- 全部/待沟通 -->
        <div class="list-container">
            <scroller-base 
				class="scroller" 
				:data="list" 
				>
				<div  class="item" v-for="(item, index) in searchList" :key="index">
                    <!-- 头像，用户名 -->
					<div class="top-layout">
                        <div class="user">
                            <span class="photo" :style="{backgroundColor: item.statusName == '使用中' ? '#F5A206' : '#DDDDDD'}">{{item.statusName == '使用中' ? '进行中' : item.statusName}}</span>
                            <span class="name">{{  item.name }}</span>
                        </div>
						<div class="pre-commnuication" @click="clickPush(item, 1)">
                            <span class="tip">查看统计数据</span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>

                    <!-- 沟通记录 -->
                    <div class="center-layout">
                        <div class="center-item"><span>授权数量</span><span>{{ item.authCount}}</span></div>
                        <div class="center-item"><span>领取数量</span><span>{{ item.useCount}}</span></div>
                        <div class="center-item"><span>剩余数量</span><span>{{ item.remainCount }}</span></div>
                    </div>
                    <div class="bottom-layout">
                        <span class="to-buy-detail" v-if="item.statusName == '使用中' && item.authStatus != 0" @click="clickPush(item, 0)">通过学员转发</span>
                        <span class="to-buy-detail" @click="toShareCard(item)">直接转发</span>
                    </div>
                    <svg class="icon yijinyong" v-if="item.authStatus == 0" aria-hidden="true">
                        <use xlink:href="#icon-yijinyong"></use>
                    </svg>
				</div>
				<empty-page class="noData-temp" v-if="searchList.length == 0" :type="11" :text="noneTips"></empty-page>
			</scroller-base>
        </div>
    </div>
</template>
<script>
    import EmptyPage from "teacher/components/common/empty-page/empty-page";
    import {processGet} from "teacher/api/common.js"
    export default {
        name: "card-list",
        components: {
            EmptyPage,
        },
        data() {
            return {
                wxTitle: '电子推荐卡',
                noneTips: '您还没有参与任何活动~',
                searchName: '',
                modelName: '',
                list: [    
					// {
                    //     name: "144546343",  // 活动名称
                    //     title: '',  // 微信title
					// 	authCount: 30, // 授权数量
					// 	useCount: 30, // 领取数量
                    //     remainCount: 30,  // 剩余数量
                    //     statusName: '使用中', // 电子推荐卡状态
                    //     recommendcardId: "41412", //  电子推荐卡id
                    //     authStatus: '1', //  是否授权 1 授权 0 禁用
                    //     recommendCardSendId: '1', // 转发生成ID 
                    // },
					// {
                    //     name: "144546343",
                    //     title: '',
					// 	authCount: 30,
					// 	useCount: 30,
                    //     remainCount: 30,
                    //     statusName: '已到期',
                    //     recommendCardId: "41412",
                    //     recommendCardSendId: 30,
                    //     authStatus: '1',
					// },
					// {
                    //     name: "144546343",
                    //     title: '',
					// 	authCount: 30,
					// 	useCount: 30,
                    //     remainCount: 30,
                    //     statusName: '已关闭',
					// 	recommendcardId: "41412",
					// 	recommendCardSendId: 30,
                    //     authStatus: '1',
					// },
					// {
                    //     name: "144546343",
                    //     title: '',
					// 	authCount: 30,
					// 	useCount: 30,
                    //     remainCount: 30,
                    //     statusName: '已关闭',
					// 	recommendcardId: "41412",
					// 	recommendCardSendId: 30,
                    //     authStatus: '0',
					// }
				],
            }
		},
		 computed: {
			// 根据搜索关健字动态更新联系人列表
			searchList() {
				let kw = this.modelName.trim().toLocaleLowerCase();
				if (!kw) return this.list;
				return this.list.filter(item => {
					return item.name.toLocaleLowerCase().indexOf(kw) > -1;
				});
			}
		},
        created() {
           processGet({
               pname: 'recommendCardList'
           }).then(res => {
                if (res.errcode == app.errok) {
                    this.list = res.data;
                }
           })
        },
        methods: {
            toShareCard(item) {
                let h =`${location.protocol}//${location.host}/weixin/parent/share.html#/card?recommendcardId=${item.recommendCardId}&companyID=${app.sysInfo.CompanyID}`
                processGet({
                    pname: 'recommendCardSendId',
                    recommendCardId: item.recommendCardId
                }).then(res => {
                    if (res.errcode == app.errok) {
                        console.log(h);
                        location.href = h + '&cardId=' + res.data;
                    }
                })
            },
			clickPush(item, type) {
				if (type == 0) {
					this.$router.push({path: `/cardAdd/${item.recommendCardId}`})
				}else if(type == 1){
					this.$router.push({path: `/cardDetail/${item.recommendCardId}`})
				}else {
					
				}
            },
            search() {
               this.modelName= this.searchName;
            }
        }
    }
</script>
