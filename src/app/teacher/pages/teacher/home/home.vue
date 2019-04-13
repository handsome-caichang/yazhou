<!-- 老师端 -->
<style scoped lang="scss">
	.home {
		.home-group {
			@include position-absolute(0, 0, $h-1, 0);
			background-color: #edf1f7;
			overflow: hidden;
		}
		.component {
			@include position-absolute(0, 0, 0, 0);
			z-index: 1;
			opacity: 0;
			&.active {
				z-index: 2;
				opacity: 1;
			}
		}
		.bottom {
			height: $h-1;
			width: 100%;
            border-top: 1px solid #eeeeee;
			@include position-absolute(false, 0, 0, 0);
			background: #FCFCFC;
			display: flex;
			.item {
				flex: 1;
                position: relative;
				@include flex-center(column);
				.icon {
					font-size: 20px;
				}
				.text {
                    display: block;
					font-size: $fs-small-s;
					margin-top: 3px;
				}
                .unread{
                    position: absolute;
                    top: 5px;
                    right: 25%;
                    width: 6px;
                    height: 6px;
                    border-radius: 10px;
                    background-color: #ff3433;
                }
			}
			.active {
				color: $color-primary;
			}
		}
	}
</style>

<template>
	<div class="home">
		<div class="home-group">
			<component class="component"
                v-for="(item, index) in renderList"
                :key="index"
                :is="item.component"
                :class="{active: activeIndex === index}">
			</component>
		</div>

		<div class="bottom">
			<div class="item"
                v-for="(item, index) in renderList"
                @click="changeContent(item, index)"
                :class="{active:index==activeIndex}"
                v-show="judgeShow(index)">
				<svg class="icon" aria-hidden="true">
					<use :xlink:href="index === activeIndex ? item.iconAction : item.icon"></use>
				</svg>
                <div class="unread" v-show="index==1&&app.sysInfo.HasUnReadMsg>0"></div>
				<span class="text">{{index === 3 ? currole.Name : item.text}}</span>
			</div>
		</div>

        <!-- 切换用户角色 -->
        <role-actionsheet
            :opened.sync="changeRoleFlag"
            @changeLoading="(bool)=>{isLoading = bool}">
        </role-actionsheet>

        <!-- 切换用户遮罩 -->
        <loading v-show="isLoading" :bgType="1"></loading>
	</div>
</template>

<script>
    import Main from "./main";
    import PersonalCenter from "../personal-center/personal-center";
    import RoleActionsheet from "teacher/components/common/actionsheets/role-actionsheet";

	export default {
		data() {
			return {
                activeIndex: parseInt(this.$route.params.homeIndex) || 0,
                isLoading: false,  //加载动画
                changeRoleFlag: false, //身份切换
                renderList:[{
                    icon: "#icon-shouye1",
                    iconAction: "#icon-shouyexuanzhong",
                    text: "主页",
                    component: Main
                },{
                    icon: "#icon-shishengxin1",
                    iconAction: "#icon-shishengxinxuanzhong",
                    text: "师生信"
                },{
                    icon: "#icon-wode1",
                    iconAction: "#icon-wodexuanzhong",
                    text: "我的",
                    component: PersonalCenter
                }
                ]
			}
        },
        computed: {
			...Vuex.mapState([
				'currole'
            ]),
			wxTitle(){
				let title = '';
				
				switch(this.activeIndex){
					case 0:
						title = app.sysInfo.FullName+' - '+app.sysInfo.CompanyName || '主页';
						break;
					default:
						title = this.renderList[this.activeIndex].text;
						break;
				}
				
				return title;
            }
		},
		methods: {
            judgeShow(index){
                if (index==1 && (this.currole.Id==1024||(this.currole.Id!=1024&&app.sysInfo.parentMessageTo==0))) {
                    return false;
                }
                if (index==3 && (app.sysInfo.RoleList.length<=1)) {
                    return false;
                }
                return true;
            },
			changeContent(item,index) {
                if (item.component) {
					this.activeIndex = index;
					this.$router.replace(`/home/${index}`);
				}else {
					if (index == 1) { //师生信
                        app.gotoIM()
                    }else if (index == 3) { //身份切换
						this.changeRoleFlag = true;
					}
				}
            },
            handleRole(){
                let para = {
                    item:{
                        icon: "#icon-shenfenxuanze-weijihuo",
                        iconAction: "#icon-shenfenxuanze-jihuo"
                    },
                    index:3
                };
                this.changeContent(para.item,para.index)
            }
        },
        mounted() {
            app.eventDefine.on('mainTeacherchangeRole', this.handleRole);
        },
        beforeDestroy() {
            app.eventDefine.off('mainTeacherchangeRole');
        },
        components: {
            RoleActionsheet
        }
	}
</script>