<!-- 老师端首屏 -->
<style scoped lang="scss">
	
	
	.main-teacher {
        background-color: $color-white;
		.banner-wrap{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 46.7%;
			.banner{
				@include position-absolute;
				.banner-item{
					display: block;
					height: 100%;
					@include background-img(false,cover);
					background-color: $color-assist-1;
				}
			}
		}
        .role-wrap{
            height: 50px;
            line-height: 50px;
            background-color: $color-white;
            padding: 0 13px;
            color: $color-6;
            .role-name{
                color: #FF7700;
            }
        }
        .void{
            height: 5px;
            width: 100%;
            background-color: #F5F5F5;
        }
		.section-wrap{
			display: flex;
			flex-wrap: wrap;
			background-color: $color-white;
			position: relative;
            padding: 6.5px;
			.section-item{
                /*小屏*/
                @media (max-width: 540px) {
                    .square {
                        height: 0;
                        width: 100%;
                        padding-top: 100%;
                        position: relative;
                        z-index: 2;
                        display: flex;
                        .describe {
                            @include position-absolute;
                        }
                    }
                }
                /*大屏*/
                @media (min-width: 540px) {
                    padding: 20px;
                    .square {
                        .describe {
                            flex: 1;
                        }
                    }
                }

                width: calc((100% - 21px) / 3);
                position: relative;
                @include flex-center(column);
                margin: 3.5px 3.5px 10px 3.5px;
                border: 1px solid #F5F5F5;
                border-radius: 4px;
                .square {
                    flex: 1;
                    .describe {
                        @include flex-center(column);
                        .section-icon {
                            width: 55px;
                            height: 55px;
                            position: relative;
                            background-image: url("../img/labelsprite.png");
                            background-size: cover;
                            background-repeat: no-repeat;
                            margin-bottom: 10px;
                            &.courseList {
                                background-position: 0 0;
                            }
                            &.courseAttendanceList {
                                background-position: 0 -55px;
                            }
                            &.commentList {
                                background-position: 0 -110px;
                            }
                            &.homeworkList {
                                background-position: 0 -165px;
                            }
                            &.noticeList {
                                background-position: 0 -220px;
                            }
                            &.announcementList {
                                background-position: 0 -275px;
                            }
                        }
                    }
                }
                .num {
                    position: absolute;
                    top: -3px;
                    right: -15px;
                    min-width: 16px;
                    height: 16px;
                    line-height: 16px;
                    padding: 0 4px;
                    font-size: 12px;
                    border-radius: 8px;
                    text-align: center;
                    color: $color-white;
                    background-color: #E93A0F;
                }

			}
		}
	}
</style>

<template>
	<scroller-base
		class="scroller main-teacher"
		ref="scrollBar"
        :data="currole">
        	<!-- banner图  -->
            <div class="banner-wrap">
                <slider class='banner' :autoPlay="true" >
                    <a class="banner-item"
                        v-for="banner in banneres"
                        :style="'background-image:url('+ banner.Image + ')'"
                    ></a>
                </slider>
            </div>

            <!--切换角色-->
            <div class="role-wrap">
                当前身份：
                <span class="role-name" @click="changeRole">
                    {{currole.name}}
                    <svg class="icon" aria-hidden="true" v-if="app.sysInfo.roles&&app.sysInfo.roles.length>1">
                        <use :xlink:href="roleFlag?'#icon-xuanzeshenfen-shang':'#icon-xuanzeshenfen-xia'"></use>
                    </svg>
                </span>
            </div>
            <div class="void"></div>
			<!-- 模块 -->
            <div class="section-wrap" v-if="data">
                <router-link
                    class="section-item"
                    tag="div"
                    v-show="judgeShow(item)"
                    v-for="(item,index) in list"
                    :key="index"
                    :to="`/${item.href}`">
                    <div class="square">
                        <div class="describe">
                            <div class="section-icon" :class="item.href">
                                <span class="num" v-if="item.name=='publicInfo'&&data.publicinfocount>0">{{data.publicinfocount>99?'99+':data.publicinfocount}}</span>
                            </div>{{item.text}}
                        </div>
                    </div>

				</router-link>
            </div>
	</scroller-base>
</template>

<script>
    import {gethomepageinfo} from 'teacher/api/personal-center';

	export default {
        name: 'main-teacher',
		data() {
			return {
                data: null,
                roleFlag: false, //身份切换
                list: [{
                    text: '我的课表',
                    name: 'course',
                    href: 'courseList'
                },{
                    text: '上课点名',
                    name: 'attendance',
                    href: 'courseAttendanceList'
                },{
                    text: '上课点评',
                    name: 'comment',
                    href: 'commentList'
                },{
                    text: '作业',
                    name: 'homework',
                    href: 'homeworkList'
                },{
                    text: '通知',
                    name: 'notice',
                    href: 'noticeList'
                },{
                    text: '学校公告',
                    name: 'publicInfo',
                    href: 'announcementList'
                }]
			}
		},
        computed:{
            ...Vuex.mapState([
                'currole'
            ]),
			banneres(){
				return [{
					"Image": require('../img/banner001.jpg')
				}]
            }
		},
        created(){
			if (this.$route.name==='home' && this.$route.params.homeIndex==='0') {
				this.loadData();
			}
		},
		methods: {
            ...Vuex.mapMutations([
                'set_currole'
            ]),
            changeRole() {
                if(app.sysInfo.roles&&app.sysInfo.roles.length<2){
                    return
                }
                this.roleFlag = true;
                app.eventDefine.emit('mainTeacherchangeRole');
            },
            // 角色组件关闭时触发箭头方向的改变
            closeDor(){
                this.roleFlag = false;
            },
            judgeShow(item){ //判断菜单显示隐藏
                if (app.sysInfo.parentMessageTo==0) { //上课点评、作业、通知
                    if (item.name=='comment' || item.name=='homework' || item.name=='notice') {
                        return false;
                    }
                }
                return true;
            },
            loadData(){
                gethomepageinfo().then(res => {
                    if (res.result.code === app.errok) {
						this.data = res.data;
					}
                });
            }
		},
        mounted() {
            app.eventDefine.on('roleActionSheetChangeArrow', this.closeDor);
        },
        beforeDestroy() {
            app.eventDefine.off('roleActionSheetChangeArrow');
        },
        watch: {
            $route(to,from){
				if (to.name==='home' && to.params.homeIndex!==from.params.homeIndex && to.params.homeIndex==='0') {
					this.loadData();
				}
			}
        }
	}
</script>