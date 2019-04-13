<style lang="scss" scoped>
    
	

    /* 筛选 */
    .action-sheet {
        @include position-absolute(0, 0, 0, 0);
        z-index: 2;
        .header,
        .item {
            .light {
                color: #1E88F5;
            }
            .icon-duoxuan {
                width: 1rem;
                height: 1rem;
                margin-right: 10px;
                margin-top: 2px;
            }
            padding: 0 15px;
            font-size: 15px;
            color: rgba(102,102,102,1);
            >div {
                display: flex;
                flex-direction: row;
                padding-top: 15px;
                padding-bottom: 15px;
                .txt {
                    display: flex;
                    flex-direction: column;
                    flex: 8;
                    .desc {
                        font-size: 12px;
                        color: #999999;
                        word-break: break-word;
                    }
                    .is-multi {
                        @include ellipsis-multi(2);
                        // 如果是符号，将无法自动换行。这里重写word-break属性
                        word-break: break-word;
                    }
                }
                .show-all {
                    text-align: right;
                    width: 20px;
                    height: 20px;
                    .icon-duoxuan {
                        margin-right: 0;
                        width: 10px;
                    }
                }
            }
        }
        .header {
            height: 49px;
            @include border-bottom;
        }
        .footer {
            width: 100%;
            height: 49px;
            background-color: #1E88F5;
            text-align: center;
            line-height: 49px;
            color: #ffffff;
            font-size: 16px;
        }
    }
</style>
<template>

        <!-- 选项 -->
        <action-sheet 
            class="action-sheet" 
            :data="list"
            v-show="opened" 
            :fullParent="true"
            :position="position"
            @close="closeFilterAction" 
            >
            
                <div v-if="header" slot="header" class="header">{{ header }}</div>
                <div class="item">
                    <div v-for="item in list">
                        <div @click="chooseItem(item)">
                            <svg class="icon icon-duoxuan" aria-hidden="true">
                                <use :xlink:href="item.checked==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
                            </svg>
                        </div>
                        <div class="txt" @click="chooseItem(item)">
                            <span class="title">
                                {{ item.Value}}
                            </span>
                            <span :class="['desc', {'is-multi': !item.show && item.Describe.length > 80}]">{{ item.Describe }}</span>
                        </div>
                        <div class="show-all" @click="view(item)" v-if="item.Describe.length > 80">
                            <svg class="icon icon-duoxuan" aria-hidden="true">
                                <use :xlink:href="item.show==false?'#icon-xiala':'#icon-shangla'"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div slot="footer">
                    <div class="footer" @click="ok">确定</div>
                </div>
            
        </action-sheet>

</template>
<script>
    export default {
        name: "choose-communication-list",
		mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
				type: Boolean,
				default: false
			},
            header: {
                type: String
            },
            footer: {
                default: ''
            },
            list: {
                type: Array
            },
			position: {
				type: String,
				default: "sideRight"
			}
        },
        data() {
            return {
            }
        },
        methods: {
            closeFilterAction() {
                this.$emit("update:opened", false);
            },
            // 显示全部
            view(item) {
                item.show = !item.show;
            },
            // 返回选择的数据
            chooseItem(item) {
                // 重置选中状态
                item.checked = !item.checked;
            },
            // 确定
            ok() {
                this.closeFilterAction();
                this.$emit('emitData', this.list.filter(item => item.checked))
            },
            _back() {
                this.$router.back();
            }
        }
    }
</script>
