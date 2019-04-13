<style scoped lang="scss">
    .clue-container {
        background-color: $color-assist-1;
        .search{
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            background-color: $color-assist-1;
            font-size: 13px;
            @include flex-center;
            .search-box{
                flex: 1;
                color: $color-9;
                .search {
                    width: 100%;
                    height: 28px;
                    // line-height: 20px;
                    @include flex-between;
                    border-radius: 28px;
                    background-color: $color-white;
                    text-align: center;
                    .text {
                        display: inline-block;
                        margin-left: 4px;
                    }
                    .search-content {
                        margin: 0 auto;
                    }
                }
            }
            
        }
        .header {
            display: flex;
            height: 44px;
            line-height: 44px;
            background-color: $color-white;
            font-size: 14px;
            color: $color-9;
            .tab {
                flex: 1;
                text-align: center;
                span {
                    display: inline-block;
                    height: 44px;
                    border-bottom: 2px solid transparent;
                }
                &.active {
                    color: #5991FF;
                    span {
                        border-bottom: 2px solid #5991FF;
                    }

                }

            }
        }
        .content {
            @include position-absolute(88px, 0, 0, 0);
        }
    }
</style>

<template>
    <div class="clue-container">
        <!--搜索框-->
        <div class="search">
            <router-link class="search-box" to="/search/2">
                <div class="search">
                    <div class="search-content">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sousuo"></use>
                        </svg> 
                        <span class="text">搜索客户名、手机号</span>
                    </div>
                </div>
            </router-link>
        </div>
        <!--tab选项卡-->
        <div class="header">
            <div class="tab" 
                 v-for="(item,index) in headList" 
                 :key="index" 
                 :class="{'active':index === activeIndex}"
                 @click="selectTab(index)">
                 
                <span class="bom">{{item.name}}</span>
            </div>
        </div>
        <div class="content">
            <!-- <comm-page :params="params"> -->
            <comm-page :params="headList[activeIndex].params">
            </comm-page>
            
        </div>
    </div>
</template>

<script>
    import CommPage from 'crm/components/commPage/commPage.vue'
    export default {
        name: 'clue',
        data() {
            return {
                activeIndex: 0,
                headList: [{
                    name: '自己添加',
                    params: {
                        scope: 2, //1 公海 2线索  3私海
                        sourcetype: 1, // 1自己添加 2 公司分配 3 公海 4 我的推广
                        keyword: '',
                        status: 2
                    }
                }, {
                    name: '公司分配',
                    params: {
                        scope: 2, //1 公海 2线索  3私海
                        sourcetype: 2, // 1自己添加 2 公司分配 3 公海 4 我的推广
                        keyword: '',
                        status: 2
                    }
                }, {
                    name: '来自公海',
                    params: {
                        scope: 2, //1 公海 2线索  3私海
                        sourcetype: 3, // 1自己添加 2 公司分配 3 公海 4 我的推广
                        keyword: '',
                        status: 2
                    }
                }, {
                    name: '我的推广',
                    params: {
                        scope: 2, //1 公海 2线索  3私海
                        sourcetype: 4, // 1自己添加 2 公司分配 3 公海 4 我的推广
                        keyword: '',
                        status: 2
                    }
                }]
            }
        },
        computed: {
            // params() {
            //     return Object.assign({}, this.headList[this.activeIndex].params)
            // }
        },
        methods: {
            selectTab(index) {
                if (this.activeIndex == index) return
                this.activeIndex = index
                // this.params = Object.assign({}, this.headList[activeIndex].params)

            }
        },
        created() {
            window.a = this
        },
        components: {
            CommPage
        }
    }

</script>