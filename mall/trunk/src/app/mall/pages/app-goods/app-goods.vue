<!-- 主屏-物品页面 -->
<style lang="scss" scoped>
    
    
    
    .app-goods {
        @include position-absolute;
        .app-goods-header {
            height: $h-3;
            line-height: $h-3;
            text-align: center;
            font-size: $fs-normal-x;
            background-color: $color-white;
            // box-shadow: 0 1px 3px 0 rgba(0,0,0,0.4);
            @include border-bottom($color-border-1);
            .icon{
                // vertical-align: middle;
                // font-size: 10px;
                color: $color-9;
            }
            &.active {
                color: $color-primary;
                .icon {
                    color: $color-primary;
                }
            }
        }
        .app-goods-scroller, 
        .filter-actionsheet,
        .loading {
            @include position-absolute($h-3);
        }
    }

    .loading {
        z-index: 2;
    }
    .filter-actionsheet {
        z-index: 3;
    }
</style>

<template>
    <div class="app-goods" v-if="curCampus.id">
        <!-- 头部筛选栏 -->
        <div class="app-goods-header" :class="{active: openFilterAS}" @click="openFilterAS = !openFilterAS">
            分类
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiala"></use>
            </svg>
        </div>
        
        <!-- 商品列表区域 -->
        <goodsList class="app-goods-scroller"
            v-if="curCampus.id && showGoodsList"
            :anim="animNum"
            :api="api" 
            :params="params"
            :emptyPageType="4"
            @loadFirst="changMask">
        </goodsList>

        <goods-sort-filter class="filter-actionsheet"
            v-if="curCampus.id && showGoodsList"
            :opened.sync="openFilterAS"
            @changeFilter="opts => {params = opts}">
        </goods-sort-filter>

        <!-- 加载中... -->
        <loading class="loading" v-show="loading"></loading>
    </div>
</template>

<script>
    import GoodsList from 'common/goods-list/goods-list.vue';
    import goodsSortFilter from './children/goods-sort-filter.vue';
     
    import {getSearchList} from 'api/jie.js';

    export default {
        name: 'app-goods',
        data () {
            return {
                loading: true,
                showGoodsList: false,
                openFilterAS: false,
                animNum: 0,
                api: getSearchList,
                params: {
                    Type: [2, 4],
                    TypeID: "",
                }
            };
        },
        computed: {
            ...Vuex.mapState(['curCampus'])
        },
        methods: {
            changMask(firstAjaxPromise) {
                // this.loading = true;
                firstAjaxPromise.then(res => {
                    this.loading = false;
                })
            }
        },
        created() {
            if (this.$route.name === 'home' && this.$route.params.homeIndex === '2') {
                this.showGoodsList = true;
            }
        },
        watch: {
            openFilterAS(newVal) {
                this.$emit('open-actionsheet', newVal);
                setTimeout(newVal => {
                    this.animNum ++;
                }, app.duration)
            },
            // 观察当前选中校区的改变，并触发该页面的重渲;
            curCampus(val, oldval) {
                this.loading = true;
                // 重置筛选条件
                this.params = {
                    Type: [2, 4],
                    TypeID: "",
                }
                if (!(this.$route.name === 'home' && this.$route.params.homeIndex === '2')) {
                    this.showGoodsList = false;
                }
            },
            $route(to) {
                if (to.name === 'home' && to.params.homeIndex === '2') {
                    this.showGoodsList = true;
                }
            }
        },
        components: {
            GoodsList,
            goodsSortFilter
        }
    }
</script>