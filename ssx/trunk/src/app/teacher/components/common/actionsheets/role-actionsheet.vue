<!-- 切换身份 -->
<style lang="scss" scoped>
	
	
	
	.role-actionsheet {
		@include position-absolute;
		font-size: $fs-normal-x;
		z-index: 10;
		.actionsheet-hd {
			@include flex-center;
			height: 50px;
			color: $color-9;
		}
		.actionsheet-item {
			padding: 15px;
			color: $color-3;
			@include flex-between;
            &:not(:last-child){
                @include border-bottom;
            }
			&.active {
				color: $color-primary;
			}
		}
	}
</style>

<template>
	<action-sheet 
        class="role-actionsheet"
        v-show="opened" 
        :data="app.sysInfo.roles" 
        @close="close">
		<div slot="header" class="actionsheet-hd">身份切换</div>
		<div class="actionsheet-item"
            @click="select(item)"
            :class="{'active':item.id==currole.id}"
            v-for="item in app.sysInfo.roles">{{item.name}}
			<svg class="icon" aria-hidden="true" v-show="item.id==currole.id">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
		</div>
	</action-sheet>
</template>

<script>
    import {userchangerole} from 'teacher/api/personal-center';    

	export default {
		name: 'role-actionsheet',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...Vuex.mapState(['currole'])
        },
		methods: {
            ...Vuex.mapMutations([
                'set_currole'
            ]),
			select(params) {
                this.close();
                if (params.id != this.currole.id) {
                    this.$emit('changeLoading', true);
                    userchangerole({
                        role: params.id.toString()
                    }).then(res => {
                        this.$emit('changeLoading', false);
                        if (res.result.code === app.errok) {
                            this.set_currole(params);
                            app.sysInfo.currrole = params.id;
                            app.sysInfo.currole = params;
                        }
                    });
                }
			}
		},
        watch:{
            opened(oldVal,newVal){
                if(!oldVal){
                    app.eventDefine.emit('roleActionSheetChangeArrow');
                }
            }
        }
	}
</script>