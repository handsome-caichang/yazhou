<!--查看家长回复 详情-->
<style scoped lang="scss">
    
    
    .comment-reply-details{
        @include position-absolute;
        .scroller {
            background-color: #F3F6FC;
            @include position-absolute(0, 0, 0, 0);
            overflow: hidden;
            .body {
                padding: 12px;
                .card {
                    padding: 12px;
                    background-color: $color-white;
                    text-align: center;
                    margin-bottom: 10px;
                    .card-text {
                        font-size: 16px;
                        color: $color-3;
                        text-align: center;
                        margin-bottom: 12px;
                    }
                    .card-star {
                        .icon {
                            font-size: 30px;
                            margin: 0 2px;
                        }
                    }
                }
                .text-area {
                    padding: 12px;
                    background-color: $color-white;
                    .content {
                        padding: 12px;
                        font-size: 15px;
                        color: #333333;
                        border: 1px solid $color-assist-1;
                    }
                }
            }
        }
    }
    // 动画
    .as-details-enter-active,
    .as-details-leave-active {
        transition: all $duration $timing;
        transform: translate3d(0, 0, 0);
    }

    .as-details-enter,
    .as-details-leave-active {
        transition: all $duration $timing;
        transform: translate3d(100%, 0, 0);
    }
</style>

<template>
    <transition name="as-details">
        <div class="comment-reply-details" v-show="opened">
            <scroller-base :data="renderData" class="scroller">
                <div class="body">
                    <div class="card" v-show="ListScoreDetail" v-for="(item,index) in ListScoreDetail">
                        <div class="card-text">{{item.scopename}}</div>
                        <div class="card-star">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.scope>0?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.scope>1?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.scope>2?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.scope>3?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.scope>4?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="text-area" v-show="list.content">
                        <div class="content">
                            {{list.content}}
                        </div>
                    </div>
                </div>
                <empty-page class="noData-temp" v-if="list== ''" :type="1001"></empty-page>
            </scroller-base>
            <loading v-show="isLoading"></loading>
        </div>
    </transition>
</template>

<script>
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';
    
    export default {
        name: "comment-reply-details",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            detailList: {
                type: Array,
                default: false
            },
            detailIndex: {
                type: Number,
                default: false
            }
        },
        data() {
            return {
                list: [],
                ListScoreDetail: [],
                isLoading:true,
            }
        },
        computed: {
            renderData() {
                return {
                    detailList: this.detailList
                }
            }
        },
        components: {
            EmptyPage
        },
        watch: {
            opened: function (newVal, oldVal) {
                if (newVal) {
                    app.tool.setDocTitle('回评详情');
                    this.list = this.detailList[this.detailIndex];
                    this.ListScoreDetail = this.detailList[this.detailIndex].listscoredetail;
                    setTimeout(()=>{
                        this.isLoading = false;
                    },301)
                }else{
                    //自定义事件改标题
                    app.eventDefine.emit('commentSetTitle');
                }
            }
        }
    }
</script>
