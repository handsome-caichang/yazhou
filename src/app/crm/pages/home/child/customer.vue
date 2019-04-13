<style scoped lang="scss">
    .wrapper {
        @include position-absolute;
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
    <div class="wrapper">
        <!--搜索框-->
         <div class="search">
            <router-link class="search-box" to="/search/3">
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
        <div class="header">
            <div class="tab" 
                 v-for="(item,index) in list"
                 :class="{active: index === activeIndex}"
                 @click="activeIndex=index">
                 <span >
                    {{item.text}}
                 </span>
            </div>
        </div>
        <div class="content">
            <comm-page :params="list[activeIndex].params">
            </comm-page>
        </div>
    </div>
</template>

<script>
    import CommPage from 'crm/components/commPage/commPage.vue'
    
    export default {
        data() {
            return {
                activeIndex: 0,
                list: [{
                    text: '跟进中',
                    params: {
                        scope: 3,
                        keyWords: '',
                        sourcetype: 1,
                        status: 3
                    }
                }, {
                    text: '试听中',
                    params: {
                        scope: 3,
                        keyWords: '',
                        sourcetype: 1,
                        status: 4
                    }
                }, {
                    text: '转化成功',
                    params: {
                        scope: 3,
                        keyWords: '',
                        sourcetype: 1,
                        status: 5
                    }
                }],
            }
        },
        methods: {
            
        },
        mounted() {
            
        },
        components: {
            CommPage
        }
    }
</script>