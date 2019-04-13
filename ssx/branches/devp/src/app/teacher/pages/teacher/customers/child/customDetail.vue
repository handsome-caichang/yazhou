<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute(0, 0, 49px, 0);
        width: 100%;
        .heard {
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            font-size: 13px;
            color: $color-9;
            background-color: $color-assist-1;
        }
        .item {
            height: 44px;
            line-height: 44px;
            display: flex;
            padding: 0 12px;
            border-bottom: 1px solid $color-assist-1;
            font-size: 15px;
            .item-left {
                flex: 1;
                color: $color-9;
            }
            .item-right {
                flex: 1;
                text-align: right;
                color: $color-3;
            }
            .spec {
                position: relative;
                
                .content {
                    width: 150px;
                    @include ellipsis-single;
                    position: absolute;
                    right: 10px;
                }
                .icon-wrapper {
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                }
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
    }
    .bottom {
        @include position-absolute(false, 0, 0, 0);
        padding: 0 15px;
        height: 49px;
        @include flex-between;
        font-size: 13px;
        border-top: 1px solid $color-assist-1;
        justify-content: flex-end;
        .record, .edit {
            height: 28px;
            line-height: 28px;
            width: 93px;
            border: 1px solid $color-primary;
            color: $color-primary;
            text-align: center;
            border-radius: 50px;
        }
        .edit {
            background-color: $color-primary;
            color: $color-white;
            margin-left: 10px;
        }
    }
</style>

<template>
    <div>
        <scroller-base class="wrapper" :data="detail">
            <div>
                <div class="heard">
                    基本信息
                </div>
                <div class="item">
                    <div class="item-left">录入时间</div>
                    <div class="item-right">{{detail.CreateTime}}</div>
                </div>
                <div class="item">
                    <div class="item-left">姓名</div>
                    <div class="item-right">{{detail.Name}}</div>
                </div>
                <div class="item">
                    <div class="item-left">性别</div>
                    <div class="item-right">{{detail.Sex}}</div>
                </div>
                <div class="item">
                    <div class="item-left">手机号码</div>
                    <div class="item-right">{{detail.SMSTel}}</div>
                </div>
                <div class="heard">
                    招生信息
                </div>
                <div class="item">
                    <div class="item-left">招生来源</div>
                    <div class="item-right spec" @click="showCustomFrom">
                        <div class="content">
                            {{detail.SaleModeName}}
                        </div>
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-left">所属校区</div>
                    <div class="item-right">{{detail.CampusName}}</div>
                </div>
                <div class="item">
                    <div class="item-left">主责任人</div>
                    <div class="item-right">{{detail.SalePersonName}}</div>
                </div>
                <div class="item">
                    <div class="item-left">意向级别</div>
                    <div class="item-right">
                        <svg class="icon" aria-hidden="true" v-for="i in detail.WillLevel">
                            <use xlink:href="#icon-xingxingxuanzhong"></use>
                        </svg>
                    </div>
                </div>
                <div class="item">
                    <div class="item-left">客户状态</div>
                    <div class="item-right">{{detail.CustomerStatusName}}</div>
                </div>
                <div class="item">
                    <div class="item-left">预约试听时间</div>
                    <div class="item-right">222</div>
                </div>
                <div class="void"></div>
            </div>
        </scroller-base>
        <div class="bottom">
            <router-link tag="div" :to="`/communicationRecord/${$route.params.id}`" class="record">沟通记录</router-link>
            <div class="edit">编辑</div>
        </div>
    </div>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers'
    export default {
        data() {
            return {
                detail: 20
            }
        },
        methods: {
            showCustomFrom() {
                app.dialog('alert', {
                    title: '招生来源',
                    text: this.detail.SaleModeName,
                    btn: {
                        text: '我知道了',
                        style: {
                            fontSize: '15px',
                            color: '#1E88F5',
                        }
                    },
                    clickMask2close: true
                })
            },
            renderPage() {
                getCustomers({pname: 'getcustomer', id: this.$route.params.id, name: this.$route.params.name}).then(res=> {
                    if (res.errcode == app.errok) {
                        this.detail = res.data
                    }
                })
            }
        },
        mounted() {
            this.renderPage()
        }
    }
</script>