<!-- 主屏-选课报名页面 -->
<style lang="scss" scoped>
    
    
    
    .app-course {
        @include position-absolute;
        .app-course-header {
            display: flex;
            height: $h-3;
            line-height: $h-3;
            background-color: $color-white;
            @include border-bottom($color-border-1);
            z-index: 2;
            .search {
                width: 40px;
                @include border-right;
                @include flex-center;
            }
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
                    color: $color-primary;
                    &.filter1:before {
                        border-bottom: 9px solid $color-primary;
                    }
                }
            }
        }
        .app-course-scroller,
        .filter-actionsheet,
        .loading {
            @include position-absolute($h-3);
        }
        .loading {
            z-index: 2;
        }
        .filter-actionsheet {
            z-index: 3;
        }
        .as-campus {
            @include position-absolute(0, 0, 0, 0);
            z-index: 2;
        }
    }
</style>

<template>
    <div class="app-course">
        <!-- 头部筛选栏 -->
        <div class="app-course-header">
            <router-link tag="div" to="/search" class="search">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
            </router-link>
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
        
        <!-- 班级列表区域 -->
        <goodsList class="app-course-scroller"
            v-if="curCampus.id && showGoodsList"
            :anim="animNum"
            :api="api" 
            :params="params"
            :emptyPageType="9"
            @loadFirst="changMask">
        </goodsList>

        <course-filter class="filter-actionsheet"
            v-if="curCampus.id && showGoodsList"
            :opened.sync="openFilterAS"
            :type="curFilterType"
            @changeFilter="opts => {params = opts}"
            @openSelectCampus="openSelectCampus">
        </course-filter>
        <!-- 选择校区 -->
        <actionsheet-campus class="as-campus" 
            ref="filter"
            position="top"
            :opened.sync="openAsCampus"
        ></actionsheet-campus>

        <!-- 加载中... -->
        <loading class="loading" v-show="loading"></loading>
    </div>
</template>

<script>
     
    import GoodsList from 'common/goods-list/goods-list.vue'
    import CourseFilter from './children/course-filter.vue'
    import ActionsheetCampus from 'common/actionsheets/actionsheets-campus.vue'
    import {getSearchList} from 'api/jie.js'

    export default {
        name: 'app-course',
        data () {
            return {
                loading: true,
                showGoodsList: false,
                openFilterAS: false,
                animNum: 0,
                curFilterType: 'Grades',
                // key值根据接口来定
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
                api: getSearchList,
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
                openAsCampus: false
            };
        },
        computed: {
            ...Vuex.mapState(['curCampus']),
        },
        methods: {
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
            // 加载首屏列表数据时显示加载中遮罩;
            changMask(firstAjaxPromise) {
                // this.loading = true;
                firstAjaxPromise.then(res => {
                    this.loading = false;
                })
            },

            //
            openSelectCampus() {
                this.openFilterAS = false
                setTimeout(() => {
                    this.openAsCampus = !this.openAsCampus
                }, 350)
            }
        },
        created() {
            if (this.$route.name === 'home' && this.$route.params.homeIndex === '1') {
                this.showGoodsList = true;
            }
        },
        components: {
            GoodsList,
            CourseFilter,
            ActionsheetCampus
        },
        watch: {
            openFilterAS(newVal) {
                this.$emit('open-actionsheet', newVal);
                setTimeout(newVal => {
                    this.animNum ++;
                }, app.duration)
            },
            $route(to) {
                if (to.name === 'home' && to.params.homeIndex === '1') {
                    this.showGoodsList = true;
                }
            },
            curCampus(newVal) {
                this.loading = true;
                if (!(this.$route.name === 'home' && this.$route.params.homeIndex === '1')) {
                    this.showGoodsList = false;
                }
            }
        }
    }
</script>