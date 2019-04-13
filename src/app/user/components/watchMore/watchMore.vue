<style scoped lang="scss">
    .role-actionsheet {
        @include position-absolute(0, 0, 0, 0);
        z-index: 9999;
        .header {
            height: 48px;
            width: 100%;
            // @include flex-between;
            color: #FE5C00;
            font-size: 18px;
            // border-radius: 16px 16px 0 0;
            .header-content {
                @include flex-between;
                margin-top: 10px;
                .marg-auto {
                    margin: 0 auto;
                    @include flex-between;
                    .mar-r {
                        margin-right: 5px;
                    }
                    .mar-l {
                        margin-left: 5px;
                    }
                    .line {
                        display: inline-block;
                        width: 16px;
                        height: 2px;
                        background-color: #FE5C00;
                    }
                    .dot {
                        display: inline-block;
                        width: 4px;
                        height: 4px;
                        background-color:  #FE5C00;
                        border-radius: 2px;
                    }
                }
            }
            .text {
                font-size: 13px;
                color: #999;
                text-align: center;
                margin-top: 12px;
                .spec1 {
                    font-size: 14px;
                    color: #333;
                }
                .spec2 {
                    font-size: 14px;
                    color: red;
                }
            }
        }
        .content {
            padding: 0 30px;
            .useritem {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
                &:last-child {
                    margin-bottom: 24px;
                }
                .left {
                    display: flex;
                    align-items: center;
                    img {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        border-radius: 40px;
                    }
                    .userinfo {
                        margin-left: 11px;
                        .username {
                            color: #333;
                            font-size: 13px;
                            margin-bottom: 7px;
                            span {
                                color: #e73114;
                            }
                        }
                        .time {
                            font-size: 12px;
                            color: #999;
                        }
                    }
                }
                .right {
                    min-width: 50px;
                    .price {
                        color: #f03232;
                        font-weight: bold;
                    }
                }
            }
            .user-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                li {
                    margin: 5px;
                    border-radius: 50px;
                    img {
                        display: block;
                        width: 50px;
                        height: 50px;
                        border-radius: 50px;
                    }
                    .icon {
                        width: 50px;
                        height: 50px;
                        color: #aaa;
                    }
                }
                .leader {
                    border: 1.5px solid rgba(255, 146, 3, 1);
                    position: relative;
                    &::after {
                        content: "团长";
                        position: absolute;
                        top: -7px;
                        right: 0px;
                        padding: 1px 3px;
                        text-align: center;
                        background: rgba(255, 146, 3, 1);
                        border-radius: 9px;
                        color: #fff;
                        font-size: 11px;
                    }
                }
            }
        }
        .contentgroupBuy {
            padding: 22px 12px 20px;
        }
        .bottom {
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 17px;
            color: #fff;
            background-color: #FF8B02;
        }
    }
</style>

<template>
    <action-sheet class="role-actionsheet" :position="'bottom'" v-if="opened" @close="close">
        <div class="header" slot="header">
            <div class="header-content">
                <div class="marg-auto">
                    <span class="line mar-r"></span>
                    <span class="dot mar-r"></span>
                    {{title}}
                    <span class="dot mar-l"></span>
                    <span class="line mar-l"></span>
                </div>
            </div>
            <div class="text" v-if="type=='groupBuy'">已有<span class="spec1">{{list.length}}</span>人参团，还差<span class="spec2">{{groupAllCount - list.length}}</span>人成团</div>
        </div>
        <div class="content" v-if="type=='bargain'">
            <div class="useritem" v-for="(item,index) in list" :key="index">
                <div class="left">
                    <img :src="item.wechatphoto" alt="">
                    <div class="userinfo">
                        <p class="username">{{item.wechatname}}
                            <p class="time">{{item.entermessage}}</p>
                    </div>
                </div>
                <div class="right">砍掉
                    <div class="price">
                        <span style="font-size:12px;">&yen;&nbsp;</span>{{item.money}}</div>
                </div>
            </div>
        </div>
        <div class="content contentgroupBuy" v-if="type=='groupBuy'">
            <ul class="user-list">
                <li v-for="(item,index) in groupAllCount" :key="index" :class="{'leader':list[index] && list[index].roletype==1}">
                    <img :src="list[index].photourl" v-if="list[index]&&list[index].photourl">
                    <!-- v-if="!groupmember[index]" -->
                    <svg class="icon" aria-hidden="true" v-else>
                        <use xlink:href="#iconkongrenyuan"></use>
                    </svg>
                </li>
            </ul>
        </div>
        <div class="bottom" slot="footer" @click="close">关闭</div>
    </action-sheet>
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        data() {
            return {
                type: '',
                opened: false,
                title: '',
                list: [],
                groupAllCount: 0,
            }
        },
        methods: {
            show(opts) {
                console.log(opts);
                this.type = opts.type;
                this.title = opts.title;
                this.list = opts.list;
                if (this.type == 'groupBuy') {
                    this.groupAllCount = opts.groupAllCount
                }
                console.log(this.list)
                this.opened = true;
            }
        }
    }
</script>