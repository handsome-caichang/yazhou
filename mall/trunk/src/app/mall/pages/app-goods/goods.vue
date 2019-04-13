<style lang="scss" scoped>
    .goods-wrapper {
        @include position-absolute;
        .red-bg1 {
            background-color: #FF4A36FF;
        }
        .red-bg2 {
            background-color: #FF8C2BFF;
        }
        .select-heard {
            display: flex;
            height: $h-3;
            line-height: $h-3;
            background-color: $color-white;
            @include border-bottom($color-border-1);
            z-index: 2;
            border-radius: 8px 8px 0 0;
            .filter {
                flex: 1;
                text-align: center;
                @include border-right;
                &:last-child:after {
                    display: none;
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
            @include position-absolute;
            .header {
                width: 100%;
                height: 129px;
                @include background-img($url: './img/2.png', $size: cover) 
                .campus-box {
                    height: 38px;
                    line-height: 38px;
                    padding: 0 15px;
                    color: $color-white;
                    font-size: 16px;
                }
                .search-box {
                    @include flex-center;
                    padding: 0 15px;
                    color: $color-9;
                    .search {
                        width: 100%;
                        height: 34px;
                        line-height: 34px;
                        border-radius: 34px;
                        background-color: $color-assist-1;
                        text-align: center;
                    }
                }
                .menu-slider-box {
                    margin-top: 12px;
                    color: $color-white;
                    font-size: 14px;
                    height: 44px;
                    .website-menu {
                        .menu-item {
                            height: 49px;
                            @include flex-center(column);
                            .text {
                                max-width: 100%;
                                padding-bottom: 6px;
                                &.active {
                                    font-size: 15px;
                                    border-bottom: 2px solid $color-white;
                                }
                            }
                        }
                    }
                }
            }
            
            .card {
                padding: 13px 12px 14px 12px;
                display: flex;
                background-color: $color-white;
                border-bottom: 1px solid $color-assist-1;
                .card-left {
                    width: 118px;
                    .img {
                        // height: 78px;
                        position: relative;
                        border: 1px solid $color-white;
                        border-radius: 2px;
                        @include dynamic-wh(118px, 0.75);
                        @include background-img(false, cover);
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
                    width: 0;
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
                        @include ellipsis-single;
                    }
                    .other {
                        margin-top: 13px;
                        display: flex;
                        .price {
                            font-size: 17px;
                            color: #E93A0F;
                            max-width: 75px;
                        }
                        .num {
                            flex: 1;
                            margin-left: 40px;
                            text-align: right;
                            font-size: 11px;
                            color: #F03232;
                        }
                    }
                }
            }
        }
        .as-campus {
            @include position-absolute(0, 0, 0, 0);
            z-index: 2;
        }
        .filter-actionsheet {
            @include position-absolute(169px, 0, 0, 0);
        }
        .aaa {
            @include position-absolute(40px, 0, 0, 0);
        }
        .loading {
            @include position-absolute(169px, 0, 0, 0);
        }
    }

</style>

<template>
    <div class="goods-wrapper">
        <div class="red-bg1">
            <div class="select-heard" ref="selectHeard" v-if="moveUp">
                <div class="filter" 
                    v-for="opt in opts1"
                    :class="{active: openFilterAS && opt.key === curFilterType}"
                    @click="toggleFilter(opt.key)">
                    {{opt.name}}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xuanzhong2"></use>
                    </svg>
                </div>
                <div class="filter filter2"
                    :class="{active: openFilterAS && curFilterType === 'filtrate'}"
                    @click="toggleFilter('filtrate')">
                    筛选
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shaixuanicon"></use>
                    </svg>
                </div>
            </div>
        </div>
        <scroller-super class="goods-list-scroller"
            :type="2"
            :data="scrollData"
            :options="{probeType:3}"
            :pagingOption="pagingOption"
            @loadData="loadData"
            ref="scroll">
            <div class="header" ref="header">
                <div class="campus-box" @click="openCampusActionsheet">
                    <span class="campus">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiaoquxuanze"></use>
                        </svg>
                        {{curCampus.name}}
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xuanzhong2"></use>
                        </svg>
                    </span>
                </div>
                <router-link class="search-box" to="/search">
                    <div class="search">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sousuoicon"></use>
                        </svg>
                        搜索商品
                    </div>
                </router-link>
                <swiper class="menu-slider-box"
                    :itemMinWidth="90"
                    v-if = "menu.length > 0"
                    >
                    <ul class="website-menu" ref="sliderWrapper">
                        <li class="menu-item" 
                            v-for="(item, index) in menu" 
                            :key="index"
                            @click="changeSecondHeard(item, index)"
                            >
                            <span class="text" :class="{active:index===heardActive}">{{item.text}}</span>
                        </li>
                    </ul>
                </swiper>
            </div>
            <div class="red-bg2">
                <div class="select-heard" ref="selectHeard" v-if="!moveUp">
                    <div class="filter" 
                        v-for="opt in opts1"
                        :class="{active: openFilterAS && opt.key === curFilterType}"
                        @click="toggleFilter(opt.key)">
                        {{opt.name}}
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xuanzhong2"></use>
                        </svg>
                    </div>
                    <div class="filter filter2"
                        :class="{active: openFilterAS && curFilterType === 'filtrate'}"
                        @click="toggleFilter('filtrate')">
                        筛选
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shaixuanicon"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <router-link tag="div" 
                :to="`/detail/${item.ID}/${item.Type}`" 
                class="card" 
                v-for="(item,index) in list"
                :key="index">
                <div class="card-left">
                    <div class="img" :style="'background-image:url('+item.Image+')'">
                        <div class="sale-not" v-if="Math.random()>0.5">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yishouqing"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="card-right">
                    <div class="name">{{item.Name}}</div>
                    <div class="info">开课时间：2019.03.12</div>
                    <div class="info">上课时间：周一至周三10:30,周四至周五5：30</div>
                    <div class="other">
                        <div class="price">&#165;{{item.Money|formatNumber}}</div>
                        <div class="num">
                            仅剩7名
                        </div>
                    </div>
                </div>
            </router-link>
        </scroller-super>
        <course-filter 
            class="filter-actionsheet"
            :style="{'top':moveUp?'40px':'169px'}"
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
    import bgImg from './img/1.png'
    export default {
        data() {
            return {
                // 是否展开'校区选择'组件
                openAsCampus: false,
                openFilterAS: false, //筛选组件
                heardActive: 0,
                menu: [{
                    text: '正在报名'
                }, {
                    text: '教材教辅'
                }, {
                    text: '精品课推荐'
                }, {
                    text: '其他'
                }, {
                    text: '名字很长很长'
                },{
                    text: '正在报名'
                }, {
                    text: '教材教辅'
                }, {
                    text: '精品课推荐'
                }, {
                    text: '其他'
                }, {
                    text: '名字很长很长'
                }],
                list: [],
                pagingOption: {
                    api: getSearchList,
                    params: {
                        CampusID: '',
                    }
                },
                curFilterType: 'Grade',
                opts1: [
                    {
                        name: "年级",
                        key: "Grade"
                    }, {
                        name: "科目",
                        key: "Subject"
                    }, {
                        name: "班型",
                        key: "ClassType"
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

                bgImg: bgImg,
                loading: true,

                moveUp: false
            }
        },
        computed: {
            ...Vuex.mapState(['curCampus']),
            scrollData() {
                return {
                    list: this.list,
                    moveUp: this.moveUp
                }
            }
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
                this.init()
            },
            scrollHandle() {
                let ev = this.$refs.scroll
                let s = ev.scroller
                s.on('scroll', (e) => {
                    if (s.y < -129) {
                        this.moveUp = true
                        this.$refs.header.style.display = 'none'
                        ev.$el.style.top = 40 + 'px'
                    } else {
                        this.moveUp = false
                        this.$refs.header.style.display = ''
                        ev.$el.style.top = 0
                    }
                })
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
            this.scrollHandle()
        },
        components: {
            ActionsheetCampus,
            CourseFilter
        }
    }
</script>