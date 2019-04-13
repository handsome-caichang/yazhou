<!-- 校长报表总览界面 -->
<style scoped lang="scss">
    .page {
        background-color: #EEF1F6;
        @include position-absolute(0, 0, 0, 0);
        overflow: auto;
    }
    .search-box {
        height: 35px;
        padding-right: 12px;
        color: $color-3;
        font-size: 12px;
        @include flex-between;
        background-color: $color-white;
        .time-box {
            display: flex;
            align-items: center;
            .left {
                width: 35px;
                @include flex-center;
                @media (max-width: 320px) {
                    width: 28px;
                }
            }
            .center {
                width: 30px;
                font-size: 18px;
                text-align: right;
                @media (max-width: 320px) {
                    width: 28px;
                }
            }
        }
        // .subject-box {
        //     min-width: 90px;
        // }
    }
    .student-box,
    .sale-box,
    .consume-box,
    .refund-box,
    .class-box {
        margin: 10px 10px 0 10px;
        padding-top: 20px;
        line-height: 1;
        border-radius: 4px;
        border: 1px solid #E4EBF6;
        background-color: $color-white;
        box-shadow:0px 0px 12px 0px rgba(0,0,0,0.08);
        .box-header {
            padding: 0 15px 0 12px;
            @include flex-between;
            color: $color-3;
            .right {
                color: $color-9;
                font-size: 12px;
            }
            &.lborder {
                border-left: 2px solid #4499FF;
            }
            &.sale-lborder {
                border-left: 2px solid #FFB508;
            }
            &.consume-lborder {
                border-left: 2px solid #99D6EA;
            }
            &.refund-lborder {
                border-left: 2px solid #FF8369;
            }
            &.class-lborder {
                border-left: 2px solid #6EA8FD;
            }
        }
        .data {
            display: flex;
            padding: 25px 0 20px 0;
            font-size: 11px;
            .data-item {
                flex: 1;
                text-align: center;
                line-height: 1;
                .num {
                    margin-right: 3px;
                    color: #333;
                    font-size: 15px;
                    font-weight: 600;
                    &.blue {
                        color: #78AEF9;
                    }
                    &.yellow {
                        color: #FFB508;
                    }
                }
                .desc {
                    margin-top: 5px;
                    svg {
                        margin-right: 3px;
                    }
                }
            }
        }
    }
    .sale-box {
        .sale-box-echarts {
            padding: 15px 10px 26px 10px;
        }
        .sale-box-content {
            padding: 0 10px;
            background-color: #F9F9F9;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            .split {
                border-bottom: 1px solid #EEF1F6;
            }
            .sale-box-content-item {
                display: inline-block;
                margin: 12px 0 12px 0;
                width: 33.33%;
                color: #999999;
                font-size: 11px;
                text-align: center;
                .unit {
                    color: #333333;
                }
                .num {
                    display: inline-block;
                    margin: 6px 4px 0 0;
                    color: #333333;
                    font-size: 13px;
                    font-weight: 500;
                }
                &.br {
                    border-right: 1px solid #EEF1F6;
                }
            }
        }
    }
    .consume-box {
        .consume-box-content {
            display: flex;
            padding: 25px 15px;
            color: $color-white;
            .consume-left {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-right: 10px;
            }
            svg {
                position: absolute;
                right: 0;
                bottom: 0;
                opacity: 0.16;
            }
        }
        .consume-count,
        .consume-day {
            padding: 15px 0 0 15px;
            font-size: 11px;
            .num {
                font-size: 20px;
            }
        }
        .consume-count {
            position: relative;
            flex: 1;
            margin-bottom: 10px;
            border-radius: 4px;
            background:linear-gradient(180deg,rgba(173,226,241,1) 0%,rgba(117,192,222,1) 100%);
            svg {
                font-size: 33px;
            }
        }
        .consume-day {
            position: relative;
            flex: 1;
            border-radius: 4px;
            background:linear-gradient(180deg,rgba(159,203,244,1) 0%,rgba(102,155,229,1) 100%);
            svg {
                font-size: 42px;
            }
        }
        .consume-money {
            position: relative;
            flex: 1.316;
            height: 131px;
            border-radius: 4px;
            @include flex-center(column);
            background:linear-gradient(158deg,rgba(255,232,162,1) 0%,rgba(255,209,118,1) 100%);
            .num {
                font-size: 30px;
            }
            svg {
                font-size: 61px;
            }
        }
    }
    .refund-box-content {
        display: flex;
        padding: 25px 15px;
        color: $color-white;
        font-size: 11px;
        .num {
            font-size: 30px;
            margin-bottom: 5px;
        }
        .person {
            position: relative;
            height: 131px;
            flex: 1;
            margin-right: 10px;
            background: linear-gradient(155deg,rgba(173,192,241,1) 0%,rgba(117,139,222,1) 100%);
            border-radius: 4px;
            @include flex-center(column);
        }
        .money {
            height: 131px;
            position: relative;
            flex: 1.3;
            background: linear-gradient(144deg,rgba(255,184,169,1) 0%,rgba(255,164,147,1) 100%);
            border-radius: 4px;
            @include flex-center(column);
        }
        svg {
            position: absolute;
            right: 0;
            bottom: 0;
            opacity: 0.16;
            font-size: 75px;
        }
    }
    .class-box-content {
        @include flex-between;
        margin: 30px 30px 25px 30px;
        >div {
            width: 33%;
            @include flex-center(column);
            div:last-child {
                @include fs-lh(13);
                color: $color-3;
                .icon{
                    fill: #ccc;
                    margin-left: 3px;
                    font-size: 13px;
                }
            }
        }
    }
    .void {
        height: 10px;
    }
    .margin-5 {
        margin-bottom: 5px;
    }
    .as-actionsheet {
        @include position-absolute;
        .item {
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            color: $color-3-s;
            @include ellipsis-single;
            @include flex-between;
            &.lighHeight {
                color: $color-primary;
            }
        }
    }
</style>

<template>
    <div>
        <!-- <scroller-base :data="globalData" class="page"> -->
        <div class="page">
            <div class="search-box">
                <div class="time-box">
                    <div class="left" @click="changeTime(-1)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sanjiaoxing-copy"></use>
                        </svg>
                    </div>
                    2018.12.01～2018.12.30
                    <div class="center">
                        <svg class="icon" aria-hidden="true" @click.stop.prevent="triggerTimeSearch">
                            <use xlink:href="#icon-zhou"></use>
                        </svg>
                    </div>
                    <div class="left" @click="changeTime(1)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sanjiaoxing-copy-copy"></use>
                        </svg>
                    </div>
                </div>
                <!--
                <div class="subject-box" @click.stop.prevent="triggerSubjectSearch">文化课项目
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiala"></use>
                    </svg>
                </div>
                -->
            </div>
            <div class="student-box">
                <div class="box-header lborder" @click="gotoPage('studentReport')">
                    <div>学员概况</div>
                    <div class="right">查看
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="data">
                    <div class="data-item">
                        <div><span class="num">11</span>万人</div>
                        <div class="desc">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-zaidu"></use>
                            </svg>在读
                        </div>
                    </div>
                    <div class="data-item">
                        <div><span class="num">23</span>人</div>
                        <div class="desc">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xinzeng"></use>
                            </svg>新增
                        </div>
                    </div>
                    <div class="data-item">
                        <div><span class="num">5</span>人</div>
                        <div class="desc">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiuxue"></use>
                            </svg>休学
                        </div>
                    </div>
                    <div class="data-item">
                        <div><span class="num">6</span>人</div>
                        <div class="desc">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-tuixue"></use>
                            </svg>退学
                        </div>
                    </div>
                </div>
            </div>
            <div class="sale-box">
                <div class="box-header sale-lborder" @click="gotoPage('saleReport')">
                    <div>销售数据</div>
                    <div class="right">查看
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="data">
                    <div class="data-item">
                        <div><span class="num blue">44.20</span>万元</div>
                        <div class="desc">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiaoshoujine"></use>
                            </svg>实收金额
                        </div>
                    </div>
                    <div class="data-item">
                        <div><span class="num yellow">55.25</span>万元</div>
                        <div class="desc">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shishoujine"></use>
                            </svg>退费金额
                        </div>
                    </div>
                </div>
                <div class="sale-box-echarts">图表区域</div>
                <div class="sale-box-content">
                    <div class="sale-box-content-item br">
                        <div>预存</div>
                        <div class="unit"><span class="num">11110.00</span>元</div>
                    </div>
                    <div class="sale-box-content-item br">
                        <div>充值</div>
                        <div class="unit"><span class="num">2222.10</span>元</div>
                    </div>
                    <div class="sale-box-content-item">
                        <div>新增</div>
                        <div class="unit"><span class="num">3333.00</span>元</div>
                    </div>
                    <div class="split"></div>
                    <div class="sale-box-content-item br">
                        <div>续费</div>
                        <div class="unit"><span class="num">4444.00</span>元</div>
                    </div>
                    <div class="sale-box-content-item br">
                        <div>扩科</div>
                        <div class="unit"><span class="num">5555.00</span>元</div>
                    </div>
                    <div class="sale-box-content-item">
                        <div>其他</div>
                        <div class="unit"><span class="num">6666.00</span>元</div>
                    </div>
                </div>
            </div>
            <div class="consume-box">
                <div class="box-header consume-lborder" @click="gotoPage('consumeReport')">
                    <div>课消数据</div>
                    <div class="right">查看
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="consume-box-content">
                    <div class="consume-left">
                        <div class="consume-count">
                            <div class="num margin-5">123</div>
                            <div>课消数(课时)</div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-kexiaokeshi"></use>
                            </svg>
                        </div>
                        <div class="consume-day">
                            <div class="num margin-5">134</div>
                            <div>课消数(天)</div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-kexiaotian"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="consume-money">
                        <div>
                            <div class="margin-5"><span class="num">156</span>&nbsp;万元</div>
                            <div>课消金额</div>
                        </div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-baobiaojine"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="refund-box">
                <div class="box-header refund-lborder" @click="gotoPage('refundReport')">
                    <div>退费数据</div>
                    <div class="right">查看
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="refund-box-content">
                    <div class="item person">
                        <div>
                            <span class="num margin-5">167</span>
                            <div>结算（人次）</div>
                        </div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-renci"></use>
                        </svg>
                    </div>
                    <div class="item money">
                        <div>
                            <div class="margin-5"><span class="num">168</span>&nbsp;万元</div>
                            <div>结算金额</div>
                        </div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-baobiaojine"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="class-box">
                <div class="box-header class-lborder">班级数据</div>
                <div class="class-box-content">
                    <div @click.stop="gotoPage('fullClassRateReport',1)">
                        <echarts :setOption="pie1" style="height:80px;width:100%;" :key="1" :action="{type:'highlight',dataIndex:0}"></echarts>
                        <div>满班率</div>
                    </div>
                    <div @click.stop="gotoPage('fullClassRateReport',2)">
                        <echarts :setOption="pie2" style="height:80px;width:100%;" :key="2" :action="{type:'highlight',dataIndex:0}"></echarts>
                        <div>出勤率</div>
                    </div>
                    <div @click.stop="gotoPage('fullClassRateReport',3)">
                        <echarts :setOption="pie3" style="height:80px;width:100%;" :key="3" :action="{type:'highlight',dataIndex:0}"></echarts>
                        <div>续费率</div>
                    </div>
                </div>
            </div>
            <div class="void"></div>
        <!-- </scroller-base> -->
        </div>
        <time-filter :opened.sync="openTimeActionsheet"></time-filter>
        <!--
        <subject-filter :opened.sync="openSubjectActionsheet"></subject-filter>
        -->
    </div>
</template>

<script>
    import TimeFilter from './child/time-filter.vue';
    // import SubjectFilter from './child/subject-filter.vue';
	import {_indexPie1,_indexPie2,_indexPie3} from './option/pieIndex.js';
    // import {getmdatasummary} from 'teacher/api/report.js';
    
	export default {
        name: 'data-screen',
		data() {
			return {
				wxTitle: "数据总览",
                screenData: {},
                openTimeActionsheet: false, //选择时间间隔
                openSubjectActionsheet: false, //选择科目
                pie1:_indexPie1,
				pie2:_indexPie2,
				pie3:_indexPie3,
			}
		},
        computed:{
            globalData() {
                return {
                    openTimeActionsheet: this.openTimeActionsheet,
                    openSubjectActionsheet: this.openSubjectActionsheet
                }
            }
		},
        created() {
            // getmdatasummary({
            //     rangestart: '', //开始时间	
            //     rangeend: ''
            // }).then(res=> {
            //     this.screenData = res.data;
            // })
            // _indexPie1.setData(resolve.pie1);
            // this.pie1 = Object.assign({},_indexPie1);

            // _indexPie2.setData(resolve.pie2);
            // this.pie2 = Object.assign({},_indexPie2);

            // _indexPie3.setData(resolve.pie3);
            // this.pie3 = Object.assign({},_indexPie3);
        },
		methods: {
            changeTime(type) {

            },
            triggerTimeSearch() {
                this.openTimeActionsheet = true;
            },
            // triggerSubjectSearch() {
            //     this.openSubjectActionsheet = true;
            // },
            gotoPage(path,type) {
                this.$router.push(`/${path}?type=${type}`);
            }
		},
		components: {
            TimeFilter,
            // SubjectFilter
		}
	}


    // 数据转换
    const resolve = (function(){
		function getDayTrend(data,key,valKey){
            if (data[key]){   
                const list = [...data[key]];
                list.sort((a,b)=>{
                    return dateCreate(a.Date || a.date).getTime() - dateCreate(b.Date || b.date).getTime()
				})
				list.push(list[list.length-1]);
                return transTrend(list,'dd',valKey);
            } else {
                return null;
            }
		}

		function getPie(rate,name){
			return [{
				value:rate / 100,
				name
			},{
				value:1- rate / 100,
				name:''
			}]
		}

		return function(data){
			return {
				dayTrendCharge:getDayTrend(data,'dayChargeTrend','totalCharge'),
				dayTrendConsume:getDayTrend(data,'dayConsumeTrend','totalConsume'),
				pie1:getPie(data.fullClassRate,'满班率'),
				pie2:getPie(data.attendanceRate,'出勤率'),
				pie3:getPie(data.renewRate,'续费率'),
			}
		}
	})()
</script>