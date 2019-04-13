<style lang="scss" scoped>
    
	

    /* 筛选 */
    .action-sheet {
        @include position-absolute(0, 0, 0, 0);
        z-index: 2;
        .header {
            height: 49px;
            line-height: 49px;
            padding: 0 15px;
            color: rgba(102,102,102,1);
        }
        .item {
            padding: 0 15px;
            font-size: 15px;
            color: rgba(102,102,102,1);
            .item-value {
                word-break: break-all;
                height: 49px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
        }
        .header {
            height: 49px;
            @include border-bottom;
        }
        .item {
            .light {
                color: #1E88F5;
            }
        }
    }
</style>
<template>

        <!-- 选项 -->
        <action-sheet 
            class="action-sheet" 
            v-show="opened" 
            :position="position"
            :data="_list"
            @close="close" 
            >
            
                <div slot="header" class="header">{{ header }}</div>
                <div class="item" v-if="list.length > 0">
                    <div class="item-value" v-for="item in list" :key="item.ID" @click.stop.prevent="choose(item)" :class="{'light': item.checked}">
                        {{ item.Value}}
                    </div>
                </div>
                <!-- 自定义 -->
                <slot></slot>
            
        </action-sheet>

</template>
<script>
    export default {
        name: "checked-communication-list",
		mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
				type: Boolean,
				default: false
			},
            header: {
                type: String,
                default: '原因'
            },
            list: {
                type: Array,
                default: function() {
                    return  [];
                }
            },
			position: {
				type: String,
				default: "bottom"
			}
        },
        data() {
            return {
            }
        },
        computed: {
            _list() {
                return {
                    show: this.opened,
                    list: this.list
                }
            }
        },
        methods: {
            // 返回选择的数据
            choose(item) {
                // 重置选中状态
                this.list.forEach(item => item.checked = false);
                item.checked = true;
                this._back();
                this.$emit('emitData', item);
            },
            _back() {
                this.close();
            }
        },
    }
</script>
