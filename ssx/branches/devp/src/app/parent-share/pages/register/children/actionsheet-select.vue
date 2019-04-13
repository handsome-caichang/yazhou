<style lang="scss" scoped>
	.sel-item {
		padding: 10px;
        color: $color-3-s;
        &.between {
            @include flex-between;            
        }
        &.active {
            color: $color-primary;
			.address {
				color: $color-primary;
			}
        }
		.address {
			color: #999;
		}
		.item-text {
			width: 80%;
			@include  ellipsis-single;
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
            <li class="sel-item between" v-for="item in data" @click="emitEvent(item)" :key="item.ID"
            	:class="{active:item.ID===id}"
            	>
				<div class="item-text">
					<p>{{item.Name}}</p>
					<p class="address">{{item.Address}}{{item.AreaName}}</p>	
				</div>
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
			emitEvent(item){
				this.$emit('selected',item);
				this.close();
			},
			close(){
				this.$emit('update:opened', false);
			},
			refreshScroll(){
				this.clickNum++;
			}
		},
	}
</script>