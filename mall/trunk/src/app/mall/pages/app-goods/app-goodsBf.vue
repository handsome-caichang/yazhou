<style lang="scss" scoped>
    .goods {
        @include position-absolute;
        background-color: $color-white;
        .app-mall-header {
            // display: flex;
            height: 49px;
            line-height: 49px;
            padding: 0 $edge/2;
            .campus-box {
                flex: 1;
                width: 0;
                @include flex-between;
                color: $color-3-s;
                padding: 0 $edge/2;
                .campus {
                    display: inline-block;
                    @include ellipsis-single;
                    margin-right: 5px;
                }
                .icon {
                    font-size: $fs-small-s;
                }
            }
            .search-box {
                // flex: 1;
                width: 120px;
                @include flex-center;
                margin: 0 $edge/2 0 $edge/2 + 2;
                color: $color-9;
                .search {
                    width: 100%;
                    height: $h-6;
                    line-height: $h-6;
                    border-radius: $h-6;
                    background-color: $color-assist-1;
                    text-align: center;
                    color: $color-9;
                }
            }
        }
        .second-heard {
            height: 40px;
            display: flex;
            background-color: $color-white;
            font-size: 14px;
            .heard-item {
                flex: 1;
                text-align: center;
                height: 40px;
                line-height: 40px;
                position: relative;
                &.active {
                    color: $color-primary;
                }
                .spec {
                    position: absolute;
                    height: 2px;
                    width: 12px;
                    background-color: $color-primary;
                    bottom: 0;
                    left: 50%;
                    margin-left: -6px;
                }
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .select-heard {
            display: flex;
            height: $h-3;
            line-height: $h-3;
            background-color: $color-white;
            @include border-bottom($color-border-1);
            z-index: 2;
            .filter {
                flex: 1;
                text-align: center;
                @include border-right;
                &:last-child:after {
                    display: none;
                }
                &.filter1 {
                    &:before {
                        content: "";
                        @include position-absolute(false, 0, 0, false);
                        border-bottom: 9px solid $color-9;
                        border-left: 9px solid transparent;
                    }
                }
                &.active {
                    color: #F03232;
                    &.filter1:before {
                        border-bottom: 9px solid $color-primary;
                    }
                }
            }
        }
        .goods-list-scroller {
            @include position-absolute(134px, 0, 0, 0);
            .card {
                padding: 13px 12px 14px 12px;
                display: flex;
                background-color: $color-white;
                border-bottom: 1px solid $color-assist-1;
                .card-left {
                    width: 104px;
                    .img {
                        // height: 78px;
                        position: relative;
                        border: 1px solid $color-white;
                        border-radius: 2px;
                        @include dynamic-wh(104px, 0.75);
                        @include background-img(false, cover);
                        .tags {
                            width: 64px;
                            height: 15px;
                            line-height: 15px;
                            text-align: center;
                            background-color: #E93A0F;
                            border-radius: 0px 8px 8px 0px;
                            font-size: 11px;
                            color: $color-white;
                            @include position-absolute(0, false, false, 0);
                        }
                        .sale-not {
                            .icon {
                                font-size: 55px;
                            }
                            width: 100%;
                            height: 100%;
                            @include flex-between;
                            padding-left: 24px;
                        }
                    }
                }
                .card-right {
                    flex: 1;
                    margin-left: 12px;
                    .name {
                        font-size: 15px;
                        color: $color-3;
                        @include ellipsis-multi(2);
                    }
                    .info {
                        margin-top: 6px;
                        font-size: 12px;
                        color: $color-9;
                    }
                    .other {
                        margin-top: 16px;
                        display: flex;
                        .price {
                            font-size: 17px;
                            color: #E93A0F;
                            max-width: 75px;
                        }
                        .num {
                            flex: 1;
                            margin-left: 40px;
                            width: 0;
                            text-align: right;
                            @include ellipsis-single;
                            font-size: 12px;
                            color: $color-6;
                        }
                    }
                }
            }
        }
        .as-campus {
            @include position-absolute(0, 0, 0, 0);
            z-index: 2;
        }
        .loading {
            @include position-absolute(134px, 0, 0, 0);
        }
    }
</style>

<template>
    <div class="goods">
        <!-- 头部校区选择及搜索栏 -->
        <div class="app-mall-header">
            <div class="campus-box" @click="openCampusActionsheet">
                <span class="campus">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiaoquxuanze"></use>
                    </svg>
                    {{curCampus.name}}
                </span>
            </div>
        </div>
        <router-link class="search-box" to="/search">
            <div class="search">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuoicon"></use>
                </svg>
                搜索商品
            </div>
        </router-link>
        <div class="second-heard">
            <div class="heard-item" 
                v-for="(item,index) in secondHeardItem" 
                :class="{active:index==heardActive}" 
                @click="changeSecondHeard(item, index)">
                {{item.text}}
                <div class="spec" v-if="index==heardActive"></div>
            </div>
        </div>
        <div class="void"></div>
        <div class="select-heard">
            <div class="filter filter1" 
                v-for="opt in opts1"
                :class="{active: openFilterAS && opt.key === curFilterType}"
                @click="toggleFilter(opt.key)">
                {{opt.name}}
            </div>
            <div class="filter filter2"
                :class="{active: openFilterAS && curFilterType === 'filtrate'}"
                @click="toggleFilter('filtrate')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shaixuanicon"></use>
                </svg>
                筛选
            </div>
        </div>
        <scroller-super class="goods-list-scroller"
            :type="2"
            :data="list"
            :pagingOption="pagingOption"
            @loadData="loadData"
            ref="scroll">
            <div>
                <router-link tag="div" 
                    :to="`/detail/${item.ID}/${item.Type}`" 
                    class="card" 
                    v-for="(item,index) in list"
                    :key="index">
                    <div class="card-left">
                        <div class="img" :style="'background-image:url('+item.Image+')'">
                            <div class="tags" v-if="Math.random()>0.5">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-huo"></use>
                                </svg>仅剩10名
                            </div>
                            <div class="sale-not" v-else>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yishouqing"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="card-right">
                        <div class="name">{{item.Name}}</div>
                        <div class="info">开课时间：</div>
                        <div class="info">上课时间：</div>
                        <div class="other">
                            <div class="price">&#165;{{item.Money|formatNumber}}</div>
                            <div class="num">
                                10课时|20课时|30课时
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </scroller-super>

        <course-filter class="filter-actionsheet"
            v-if="curCampus.id"
            :opened.sync="openFilterAS"
            :type="curFilterType"
            @changeFilter="changeFilter">
        </course-filter>

        <actionsheet-campus class="as-campus" 
            ref="filter"
            position="top"
            :opened.sync="openAsCampus"
        ></actionsheet-campus>
        <loading class="loading" v-show="loading" :isDefault="false"></loading>
    </div>
</template>

<script>
    import {getSearchList} from 'api/jie.js'
    import ActionsheetCampus from 'common/actionsheets/actionsheets-campus.vue'
    import CourseFilter from './children/course-filter.vue'
    export default {
        data() {
            return {
                // 是否展开'校区选择'组件
                openAsCampus: false,
                openFilterAS: false, //筛选组件
                heardActive: 0,
                secondHeardItem: [{
                    text: '正在报名'
                }, {
                    text: '教材教辅'
                }, {
                    text: '精品课推荐'
                }, {
                    text: '其他'
                }],
                list: [],
                pagingOption: {
                    api: getSearchList,
                    params: {
                        CampusID: '',
                    }
                },
                curFilterType: 'Grades',
                opts1: [
                    {
                        name: "年级",
                        key: "Grades"
                    }, {
                        name: "科目",
                        key: "Subjects"
                    }, {
                        name: "期段",
                        key: "Terms"
                    },
                ],
                params: {
                    Type: [1, 3],
                    GradeID: "",
                    SubjectID: "",
                    TermID: "",
                    ShiftTypeIDs: [],
                    CourseDay: [],
                    CourseTime: [],
                    ExamID: this.$route.query.ExamId || ""
                },
                loading: true
            }
        },
        computed: {
            ...Vuex.mapState(['curCampus']),
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.loading = false
                    if (res.ErrorCode === app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = []
                        } 
                        this.list = this.list.concat(res.Data)
                        this.list = this.list.filter(obj => obj.Type !== 3)
                    }
                })
            },
            init(params) {
                this.loading = true
                params ? 
                    this.$refs.scroll.refresh() :
                    this.$refs.scroll.refresh(params)
            },
            // 切换显示或隐藏'筛选栏'
            toggleFilter(filterKey) {
                if (this.curCampus.id) {
                    if (filterKey === this.curFilterType) {
                        this.openFilterAS = !this.openFilterAS;
                    } else {
                        this.curFilterType = filterKey;
                        this.openFilterAS = true;
                    }
                }           
            },
            openCampusActionsheet() {
                this.openAsCampus = !this.openAsCampus
            },
            changeSecondHeard(item, index) {
                this.heardActive = index
                this.init()
            },
            changeFilter(obj) {
                console.log(obj)
                this.init()
            }
        },
        watch: {
            openAsCampus(newVal) {
                this.$emit('open-actionsheet', newVal)
            },
            openFilterAS(newVal) {
                this.$emit('open-actionsheet', newVal)
            },
        },
        mounted() {

        },
        components: {
            ActionsheetCampus,
            CourseFilter
        }
    }
</script>