<!-- 满班率/出勤率/续费率详情 -->
<style scoped lang="scss">
    .page {
        background-color: #EEF1F6;
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
    }
    .body {
        .card {
            padding: 20px 15px;
            margin: 10px 10px 0 10px;
            font-size: 12px;
            border-radius: 4px;
            background-color: $color-white;
            border: 1px solid #EEF1F6;
            box-shadow:0px 0px 6px 0px rgba(0,0,0,0.08);
            .cname {
                color: $color-3;
                font-size: 16px;
                margin-bottom: 10px;
            }
            .info {
                display: flex;
                >div {
                    flex: 1;
                    @include ellipsis-single;
                    &:first-child {
                        flex: 1.5;
                    }
                    &:last-child {
                        text-align: right;
                    }
                }
                .percent {
                    color: #F5A206;
                }
            }
        }
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
        </div>
        <scroller-load class="body">
            <div class="card">
                <div class="cname">班级名称</div>
                <div class="info">       
                    <div>上课老师：李老师</div>
                    <div>人数：4/10</div>
                    <div>{{this.type==1?'满班率':this.type==2?'出勤率':'续费率'}}：<span class="percent">40.00%</span></div>
                </div>
            </div>
            <div class="card">
                <div class="cname">班级名称</div>
                <div class="info">       
                    <div>上课老师：王老师、陈老师、李老师</div>
                    <div>人数：40/110</div>
                    <div>{{this.type==1?'满班率':this.type==2?'出勤率':'续费率'}}：<span class="percent">40.00%</span></div>
                </div>
            </div>
        </scroller-load>

        <time-filter :opened.sync="openTimeActionsheet"></time-filter>
    </div>
</template>

<script>
    import TimeFilter from './child/time-filter.vue';

    export default {
        name: 'fullClassRateDetail',
        data() {
            return {
                wxTitle: '班级列表',
                openTimeActionsheet: false, //选择时间间隔
                type: 1, //类型：满班率、出勤率、续费率
            }
        },
        methods: {
            changeTime(type) {

            },
            triggerTimeSearch() {
                this.openTimeActionsheet = true;
            }
        },
        created() {
            this.type = this.$route.query.type;
            this.wxTitle = this.type==1?'满班率':this.type==2?'出勤率':'续费率';
        },
        components:{
            TimeFilter
        }  
    }
</script>