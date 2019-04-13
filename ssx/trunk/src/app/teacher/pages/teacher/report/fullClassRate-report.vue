<!-- 满班率/出勤率/续费率 -->
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
    .title-box,
    .item-box {
        display: flex;
        padding: 0 14px 0 15px;
        .column1,
        .column2 {
            flex: 2;
        }
        .column3 {
            flex: 1;
        }
    }
    .title-box {
        margin-top: 10px;
        height: 34px;
        line-height: 34px;
        color: $color-3;
        font-size: 13px;
        background-color: #F2F2F2;
        @include border-top(#DEDEDE);
        @include border-bottom(#DEDEDE);
    }
    .body {
        background-color: $color-white;
        .item-box {
            height: 44px;
            line-height: 44px;
            @include border-bottom(#EEF1F6);
            .column2 {
                color: #1E88F5;
            }
            .column3 {
                color: #F5A206;
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
        <div class="title-box">
            <div class="column1">校区</div>
            <div class="column2">班级数</div>
            <div class="column3">{{this.wxTitle}}</div>
        </div>
        <scroller-load class="body">
            <div class="item-box" @click="gotoPage('fullClassRateDetail')">
                <div class="column1">解放中路校区</div>
                <div class="column2">3</div>
                <div class="column3">45%</div>
            </div>
            <div class="item-box" @click="gotoPage('fullClassRateDetail')">
                <div class="column1">解放中路校区</div>
                <div class="column2">3</div>
                <div class="column3">45%</div>
            </div>
            <div class="item-box" @click="gotoPage('fullClassRateDetail')">
                <div class="column1">解放中路校区</div>
                <div class="column2">3</div>
                <div class="column3">45%</div>
            </div>
        </scroller-load>

        <time-filter :opened.sync="openTimeActionsheet"></time-filter>
    </div>
</template>

<script>
    import TimeFilter from './child/time-filter.vue';
    
    export default {
        name: 'fullClassRateReport',
        data() {
            return {
                wxTitle: '满班率',
                openTimeActionsheet: false, //选择时间间隔
                type: 1, //类型：满班率、出勤率、续费率
            }
        },
        methods: {
            changeTime(type) {

            },
            triggerTimeSearch() {
                this.openTimeActionsheet = true;
            },
            gotoPage(path) {
                this.$router.push(`/${path}?type=${this.type}`);
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