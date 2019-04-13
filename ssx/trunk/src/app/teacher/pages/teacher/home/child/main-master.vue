<!-- 校长端首屏 -->
<style scoped lang="scss">
    .nav-title {
        margin: 22px 25px 0 25px;
        font-size: 13px;
        color: #535D75;
    }
    .nav {
        .nav-bar {
            @include flex-between();
            min-height: 60px;
            margin: 15px 20px 40px 20px;
            background: rgba(255,255,255,1);
            box-shadow: 0 8px 38px 0 rgba(202,202,202,.3);
            border-radius: 38px;
            .left {
                @include flex-center();
                .left-icon {
                    width: 40px;
                    height: 39px;
                    margin: 0 6px 0 13px;
                    @include background-img("../img/icon-xz-new.png", contain);
                }
                .left-content div {
                    line-height: 1;
                    &:first-child {
                        color: #404040;
                        font-size: 12px;
                        margin-bottom: 8px;
                    }
                    &:last-child {
                        color: #999999;
                        font-size: 11px;
                    }
                }
            }
            .right {
                color: #5991FF;
                font-size: 12px;
                svg {
                    color: #C2CCDC;
                    font-size: 12px;
                    margin-right: 16px;
                }
            }
        }
    }
    .report {
        .report-box {
            padding: 0 20px;
            display: flex;
            flex-wrap: wrap;
            .report-item {
                position: relative;
                margin-top: 15px;
                margin-bottom: 15px;
                width: calc((100% - 15px) / 2);
                border-radius: 10px;
                box-shadow: 0 8px 38px 0 rgba(202,202,202,.3);
                > div {
                    padding: 15px 20px;
                }
                &:nth-child(2n+1) {
                    margin-right: 15px;
                }
                p {
                    padding-top: 9px;
                    font-size: 13px;
                    color: #404040;
                }
                .icon {
                    font-size: 28px;
                }
                .icon-op {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    font-size: 60px;
                    opacity: .07;
                }
            }
        }
    }
    .noData-temp {
        padding-top: 100px;
        @media (max-width: 320px) {
            padding-top: 50px;
        }
        background-color: #fff !important;
    }
</style>

<template>
    <div>
        <empty-page class="noData-temp" :type="12" :text="emptyText" v-if="app.sysInfo.CampusList.length==0||noRight"></empty-page>
        <div v-else>
            <div class="nav" v-if="app.sysInfo.EnableNewDailyReport==1">
                <div class="nav-title">我的运营仪表盘</div>
                <div class="nav-bar" @click="goToDailyReport">
                    <div class="left">
                        <div class="left-icon"></div>
                        <div class="left-content">
                            <div>已为您生成运营日报</div>
                            <div>日期：{{yesterday}}</div>
                        </div>
                    </div>
                    <div class="right">立即查看
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#ixz-next"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="report">
                <div class="nav-title">校区数据统计报表</div>
                <div class="report-box">
                    <div v-for="(item,index) in list"
                        v-show="judgeShow(item)"
                        class="report-item"
                        :key="index">
                        <div @click="goTo(item)">
                            <svg class="icon icon-op" aria-hidden="true">
                                <use :xlink:href="item.icon"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.icon"></use>
                            </svg>
                            <p>{{item.text}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import EmptyPage from 'teacher/components/common/empty-page/empty-page';
	export default {
        name: 'main-master',
		data() {
			return {
                list: [{
                    icon: "#ixz-shoufei",
                    text: "收费报表",
                    name: 'fee',
                    href: 'feeMenu'              
                },{
                    icon: "#ixz-kexiao1",
                    text: "课消报表",
                    name: 'consume',
                    href: app.sysInfo.EnableDeptAddArea == '1' ? 'consumeReport' : 'consumeCampReport'
                },{
                    icon: "#ixz-yeji",
                    text: "业绩报表",
                    name: 'achievement',
                    href: 'achievementReport'
                },{
                    icon: "#ixz-banji1",
                    text: "班级报表",
                    name: 'class',
                    href: 'classSaleRate_section'
                }],
                yesterday: app.tool.getDatesByIndex(1).sdate
			}
		},
        computed:{
            noRight() {
                return !app.tool.op('ReportFeeQuery')&&!app.tool.op('ConsumeTotalProQuery')&&!app.tool.op('FullClassRateQuery');
            },
            emptyText() {
                return app.sysInfo.CampusList.length==0?'该用户没有可操作校区，请先分配校区':this.noRight?'该用户没有报表权限，请先分配权限':'';
            }
		},
		methods: {
            judgeShow(item) {
                if(item.name=='fee' && !app.tool.op('ReportFeeQuery')) {
                    return false;
                }
                if((item.name=='consume'||item.name=='achievement') && !app.tool.op('ConsumeTotalProQuery')) {
                    return false;
                }
                if(item.name=='class' && !app.tool.op('FullClassRateQuery')) {
                    return false;
                }
                return true;
            },
            goTo(item) {
                if(item.href) {
                    this.$router.push(`/${item.href}`);
                }
            },
            goToDailyReport() {
                window.location.href = './daily_report.html#/home?date=' + this.yesterday;
            }
		},
		components: {
			EmptyPage
		}
	}
</script>