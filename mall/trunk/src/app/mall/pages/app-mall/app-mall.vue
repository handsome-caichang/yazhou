<!-- 主屏-商城页面 -->
<style lang="scss" scoped>
    
    

    .app-mall {
        @include position-absolute;
        background-color: $color-white;
        .app-mall-header {
            display: flex;
            height: $h-2;
            line-height: $h-2;
            padding: 0 $edge/2;
            background-color: $color-assist-1;
            .campus-box {
                @include flex-between;
                color: $color-3-s;
                padding: 0 $edge/2;
                .campus {
                    display: inline-block;
                    max-width: 5*$fs-normal + 2;
                    @include ellipsis-single;
                    margin-right: 5px;
                }
                .icon {
                    font-size: $fs-small-s;
                }
            }
            .search-box {
                flex: 1;
                @include flex-center;
                margin: 0 $edge/2 0 $edge/2 + 2;
                color: $color-9;
                .search {
                    width: 100%;
                    height: $h-6;
                    line-height: $h-6;
                    border-radius: $h-6;
                    background-color: $color-white;
                    text-align: center;
                }
            }
        }
        .app-mall-body {
            @include position-absolute($h-2);
            .banner-wrap {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 46.7%;
                @at-root .banner {
                    @include position-absolute;
                    .banner-item {
                        display: block;
                        height: 100%;
                        @include background-img(false, cover);
                        background-color: $color-assist-1;
                    }
                }
            }
        }        
    }
    .loading {
        @include position-absolute($h-2);
        overflow: hidden;
    }
    .void {
        height: $void;
        background-color: $color-assist-1;
    }

    .as-campus {
        @include position-absolute($h-2, 0, 0, 0);
        z-index: 2;
    }
</style>

<template>
    <div class="app-mall">
        <!-- 头部校区选择及搜索栏 -->
        <div class="app-mall-header">
            <div class="campus-box" @click="openCampusActionsheet">
                <span class="campus">{{curCampus.name}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangxia1"></use>
                </svg>
            </div>
            <router-link class="search-box" to="/search">
                <div class="search">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                    {{config.SeachWatermark||'搜索课程、物品'}}
                </div>
            </router-link>
        </div>
        
        <!-- 内容主体部分，可滚动 -->
        <scroller-super class="app-mall-body"
            :type="1"
            :api="apiPromise" 
            v-if="curCampus.id"
            :data="mallData">
            <div style="background-color: #FFF;">
                <!-- banner图  -->
                <div class="banner-wrap" v-if="banneres.length !=0">
                    <slider class='banner' :autoPlay="true" >
                        <div class="banner-item"
                            v-for="banner in banneres"
                            @click="gotoBannerDetail(banner)"
                            :style="'background-image:url('+ banner.Image + ')'"
                        ></div>
                    </slider>
                </div>

                <!-- 微官网相关内容 -->
                <website-chip 
                    v-if="websiteData" 
                    :menu="websiteData.menu" 
                    :news="websiteData.news">
                </website-chip>

                <!-- 商品楼层版块 -->
                <div class="floor-wrap" 
                    v-for="(item, index) in floorList"
                    v-if="item.Ads.length > 0 || item.Products.length > 0">
                    <component                     
                        :is="item.Code === 'PACKAGE' || item.Code === 'HOT_PRODUCT' ? comps.SectionGird : comps.SectionRow" 
                        :data="item">
                    </component>
                    <div class="void" v-if="index === 0" ></div>
                </div>
                <div class="void"></div>
            </div>
        </scroller-super>

        <!-- 加载中... -->
        <loading class="loading" v-show="loading" :isDefault="false"></loading>
        
        <actionsheet-campus class="as-campus" 
            ref="filter"
            position="top"
            :opened.sync="openAsCampus"
        ></actionsheet-campus>
    </div>
</template>

<script>
     
    import SectionGird from './children/section-gird/section-gird.vue'
    import SectionRow from './children/section-row/section-row.vue'
    import ActionsheetCampus from 'common/actionsheets/actionsheets-campus.vue'
    import websiteChip from 'page/website/chip/website-home-chip.vue'
    import {getAllHomePageData} from 'api/jie.js'

    export default {
        name: 'app-mall',
        data() {
            return {
                loading: true,
                isRender: false,
                animNum: 0,
                // 渲染楼层用到的动态组件
                comps: {
                    SectionGird, 
                    SectionRow
                },
                // banner图轮播数据
                banneres: [],
                // 楼层数据
                floorList: [],
                websiteData: null,
                // 是否展开'校区选择'组件
                openAsCampus: false,
            }
        },        
        computed: {
            ...Vuex.mapState(['curCampus','config']),
            // 传递给"scroller"组件的数据,应当把所有会影到内容区域高度部分的数据都添加进来;
            mallData() {
                return {
                    banneres: this.banneres,
                    floorList: this.floorList,
                    websiteData: this.websiteData,
                    animNum: this.animNum,
                }
            }
        },
        methods: {
            openCampusActionsheet() {
                this.openAsCampus = !this.openAsCampus;
            },
            gotoBannerDetail(banner) {
                if (banner.Url) {
                    app.tool.gotoLink(banner.Url, this.$router);
                } else if (banner.Content) {
                    this.$router.push(`/cpage/banner/${banner.ID}`);
                }
            },
            apiPromise() {
                let promise = getAllHomePageData({
                    GetFloorListRequest: {
                        CampusID: this.$store.state.curCampus.id,
                        PageIndex: 1,
                        PageSize: 10000
                    }
                })
                promise.then(res => {
                    if (res.ErrorCode === app.errok) {
                        this.banneres = res.Data.BannerList;
                        this.floorList = res.Data.FloorList.Data;
                        //小银星定制
                        if (this.config.EnableDisplayTeacher === 0) {
                            res.Data.Module = res.Data.Module.filter(obj => obj.Name !== '名师库')
                        }
                        this.websiteData = {
                            menu: res.Data.Module,
                            news: res.Data.Notice
                        };

                        this.loading = false;
                        this.isRender = true;

                        /*假数据
                        console.log(this.floorList)
                        this.floorList[0].Products.forEach(item => {
                            item.ApplyStartDate = '2018/01/09 23:19:00+0800'
                            item.ApplyEndDate = '2019/01/04 17:19:00+0800'
                        })
                        console.log(this.floorList)*/
                    }
                })
                return promise;
            },
            renderPage() {
                this.loading = true;
                this.apiPromise();
            },
        },
        created() {
            if (this.$route.name === 'home' && this.$route.params.homeIndex === '0') {
                // 如果存在当前选中校区，则开始渲染页面;
                this.curCampus.id && this.renderPage();
            }
        },
        watch: {
            openAsCampus(newVal) {
                this.$emit('open-actionsheet', newVal);
                setTimeout(newVal => {
                    this.animNum ++;
                }, app.duration)
            },
            // 观察校区的改变，并触发该页面的重渲;
            curCampus(val, oldval) {
                this.renderPage();
            },
            $route(to, from) {
                if (this.isRender === false && to.name === 'home' && to.params.homeIndex === '0') {
                    this.renderPage();
                }
            },
        },
        components: {
            SectionGird,
            SectionRow,
            ActionsheetCampus,
            websiteChip
        }
    };
</script>
