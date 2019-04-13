<style lang="scss" scoped>
    .communication-list {
        background-color: #eef1f6;
        /* 查询栏 */
        .header-box {
            height: 40px;
            padding-right: 22px;
            padding-left: 16px;
            display: flex;
            align-items: center;
            background-color: #ffffff;
            .text {
                flex: 1;
                line-height: 40px;
                font-size:13px;
                color:rgba(102,102,102,1);
            }
        }
        /* 列表 */
        .list-container {
            position: absolute;
			top: 40px;
			bottom: 0;
			left: 0;
			right: 0;
            .scroller {
				@include position-absolute;
				overflow: hidden;
                .item {
                    margin-top: 1px;
                    height: 44px;
                    padding-right: 22px;
                    padding-left: 16px;
                    display: flex;
                    align-items: center;
                    background-color: #ffffff;
                    .text {
                        flex: 1;
                        line-height: 44px;
                        font-size:15px;
                        color:rgba(51,51,51,1);
                        display: flex;
                        justify-content: space-between;
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
        <div class="header-box">
            <span class="text">接收人</span>
            <span class="text">浏览次数</span>
            <span class="text">领取数量</span>
		</div>
        <!-- 全部/待沟通 -->
        <div class="list-container">
            <scroller-base 
				class="scroller" 
				:data="list" 
				>
				<div class="item" v-for="(item, index) in list" :key="index" @click="toIm(item)">
                    <span class="text">{{item.studentName}}</span>
                    <span class="text">{{item.scanCount}}</span>
                    <div class="text">
                        {{item.useCount}}
                        <div class="icon-box" v-if="item.isStudent == 1">
                            <svg class="icon card-next" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
				</div>
			</scroller-base>
			<empty-page class="noData-temp" v-if="list.length == 0" :type="4" :text="noneTips"></empty-page>
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
                wxTitle: '查看详情',
                noneTips: '您还未转发给学员，请快去转发吧~',
                list: [
                    // {
					// 	studentName: "老师", // 转发名称
					// 	scanCount: 30,  // 浏览次数
                    //     useCount: 30,  // 领取次数
                    //     isStudent: 1,  // 是否是学生
                    //     studentUserID: '' // 学生id
					// },
                ],
                id: ''
            }
		},
		 computed: {
			
		},
        created() {
            this.id = this.$route.params.id;
            processGet({
               pname: "recommendCardHistory",
               recommendCardId: this.id
           }).then(res => {
                if (res.errcode == app.errok) {
                    this.list = res.data;
                }
           }) 
        },
        methods: {
			toIm(item) {
                if(item.isStudent == 1 && item.studentUserID) {
                    app.gotoIM({toUserID: item.studentUserID})
                }
            }
        }
    }
</script>
