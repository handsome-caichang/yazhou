<!-- 注册页面选择校区/年级 -->

<style lang="scss" scoped>
    
    
    
	.sel-item {
        height: $h-2;
        line-height: $h-2;
        padding-left: $edge;
        padding-right: $edge;
        color: $color-3-s;
        &.between {
            @include flex-between;            
        }
        &.active {
            color: $color-primary;
        }
    }
</style>

<template>
	<action-sheet 
		:data="renderData"
		:scrollerClick="true"
		v-show="opened"
		@close="close">
		<ul>
            <li class="sel-item between" v-for="item in data" @click="emitEvent(item,flag)"
            	:class="{active:item.ID===id}"
            	>
            	{{item.Name}}
            	<svg v-if="item.ID===id" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanzhong"></use>
                </svg>
            </li>
        </ul>
	</action-sheet>
</template>

<script>
	
	export default {
		name: 'actionsheet-select',
		props: {
			opened: {
				type: Boolean,
				default: false
			},
			data: {
				type: Array,
				default: null
			},
			id: '',
			flag: {
				type: Number,	//1为选择校区，2为选择年级
				default: -1
			}
		},
		data() {
            return {
				clickNum: 0
            }
        },
        computed: {
			renderData() {
	            return {
	            	data: this.data,
	            	clickNum: this.clickNum
	            }
	       	},
        },
		methods: {
			emitEvent(item, flag){
				this.$emit('selected',[item, flag]);
				this.close();
			},
			close(){
				this.$emit('update:opened', false);
			},
			refreshScroll(){
				this.clickNum++;
			}
		},
		components: {
		}
	}
</script>