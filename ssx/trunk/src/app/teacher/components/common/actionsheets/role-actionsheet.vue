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
        :data="app.sysInfo.RoleList" 
        @close="close">
		<div slot="header" class="actionsheet-hd">身份切换</div>
		<div class="actionsheet-item"
            @click="select(item)"
            :class="{'active':item.Id==app.sysInfo.currole.Id}"
            v-for="item in app.sysInfo.RoleList">{{item.Name}}
			<svg class="icon" aria-hidden="true" v-show="item.Id==app.sysInfo.currole.Id">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
		</div>
	</action-sheet>
</template>

<script>
    import {processGet} from 'teacher/api/common.js';    

	export default {
		name: 'role-actionsheet',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
		methods: {
            ...Vuex.mapMutations([
                'set_currole'
            ]),
			select(params) {
                this.close();
                if (params.Id != app.sysInfo.currole.Id) {
                    this.$emit('changeLoading', true);
                    processGet({
                        pname: 'main',
                        currole: params.Id
                    }).then(res => {
                        this.$emit('changeLoading', false);
                        if (res.errcode === app.errok) {
                            this.set_currole(params);
                            app.sysInfo = Object.assign(app.sysInfo,res.data,{
                                currole: params,
                                changePassword: res.changePassword,
                                parentMessageTo: res.parentMessageTo
                            });
                            window.teacherHome.$refs.scrollBar.scroller.scrollToElement(window.teacherHome.$refs.userRole);
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