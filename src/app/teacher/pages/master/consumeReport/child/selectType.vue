<style lang="scss" scoped>
.role-actionsheet {
    @include position-absolute;
    z-index: 10;

    .header {
        height: 44px;
        line-height: 44px;
        padding: 0 12px;
        background-color: #f0f0f0;
    }
    .containers {
        // @include position-absolute;
        .content {
            background-color: $color-white;

            .item-header {
                height: 34px;
                line-height: 34px;
                background-color: #f1f3f8;
                padding: 0 12px;
            }

            .item {
                height: 42px;
                line-height: 42px;
                padding: 0 12px;
                display: flex;
                border-top: 1px solid $color-assist-1;

                &:last-child {
                    border-bottom: 1px solid $color-assist-1;
                }

                .item-left {
                    flex: 1;
                }

                .item-right {
                    width: 30px;
                    text-align: right;
                }
            }
        }
    }
}
</style>

<template>
<action-sheet class="role-actionsheet" :position="'sideRight'" :data="list" v-show="opened" @close="close" ref="actionsheet">
    <div class="header" slot="header" @click="close">
        <svg class="icon" aria-hidden="true">
                <use xlink:href="#ixz-xiangzuo"></use>
            </svg>
        汇总方式
    </div>
    <div class="containers">
        <div class="content" v-for="(item,index) in list" :key="index">
            <div class="item-header">{{item.text}}</div>
            <div class="item" v-for="(type, y) in item.arr" :key="y" @click="_triggerBtn(type, item.text)">
                <div class="item-left">{{type.text}}</div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true" v-if="type.isSelect">
                        <use xlink:href="#icon-gouxuan"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</action-sheet>
</template>

<script>
export default {
    mixins: [app.mixin.popupWindowRouteMixin],
    props: {

    },
    data() {
        return {
            opened: false,
            list: [{
                text: '按课程',
                arr: [{
                    text: '名称',
                    dataType: 2
                }, {
                    text: '年份',
                    dataType: 3
                }, {
                    text: '期段',
                    dataType: 4
                }, {
                    text: '年级',
                    dataType: 5
                }, {
                    text: '科目',
                    dataType: 6
                }, {
                    text: '类型',
                    dataType: 7
                }]
            }, {
                text: '按班级',
                arr: [{
                    text: '名称',
                    dataType: 9
                }, {
                    text: '科目',
                    dataType: 8
                }]
            }, {
                text: '按时间',
                arr: [{
                    text: '月',
                    dataType: 1
                }, {
                    text: '天',
                    dataType: 0
                }]
            }]
        }
    },
    methods: {
        _triggerBtn(item, headerText) {
            item.isSelect = true
            this.list.forEach(obj => {
                obj.arr.forEach(oobj => {
                    if (oobj.dataType !== item.dataType) {
                        oobj.isSelect = false
                    } else {
                        oobj.isSelect = true
                    }
                })
            })
            this._resolve({
                dataType: item.dataType,
                text: `${headerText}-${item.text}`
            })
            this.close()
        },
        show(resolve) {
            this.opened = true
            this.promise = new Promise(rsv => {
                this._resolve = rsv
            })
            return this.promise
        }
    },
    mounted() {
        this.list.forEach(obj => {
            obj.arr.forEach(item => {
                this.$set(item, 'isSelect', false)
            })
        })
    },
    watch: {
        opened(newval) {
            if (newval) {
                console.log(this.$refs.actionsheet);
                this.$nextTick(() => {
                    this.$refs.actionsheet.refresh();
				})
            }
        }
    }
}
</script>
