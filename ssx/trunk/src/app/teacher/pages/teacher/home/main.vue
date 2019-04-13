<!-- 老师端首屏 -->
<style scoped lang="scss">
    .main-teacher {
        background-color: $color-white;
        .banner-wrap {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 46.7%;
            .banner {
                @include position-absolute;
                .banner-item {
                    display: block;
                    height: 100%;
                    @include background-img(false, cover);
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
                .icon{
                    width: 10px;
                    height: 14px;
                }
            }
        }
        .void{
            height: 5px;
            width: 100%;
            background-color: #EEF1F6;
        }
        .role{
            @include position-absolute;
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
            <slider class='banner' :autoPlay="true">
                <a class="banner-item"
                   v-for="banner in banneres"
                   :style="'background-image:url('+ banner.Image + ')'"
                ></a>
            </slider>
        </div>
        <!--切换角色-->
        <div class="role-wrap" @click="changeRole" ref="userRole">当前身份：
            <span class="role-name">
                {{currole.Name}}
                <svg class="icon" aria-hidden="true" v-if="app.sysInfo.RoleList&&app.sysInfo.RoleList.length>1">
                    <use :xlink:href="roleFlag?'#icon-xuanzeshenfen-shang':'#icon-xuanzeshenfen-xia'"></use>
                </svg>
            </span>
        </div>
        <div class="void"></div>
        <!-- 老师端和校长端组件 -->
        <component :is="current"></component>
    </scroller-base>
</template>

<script>
    import MainTeacher from "./child/main-teacher";
    import MainMaster from "./child/main-master";
    import {processGet} from 'teacher/api/common';

    export default {
        name: 'main-page',
        data() {
            return {
                roleFlag: false, //身份切换
            }
        },
        computed:{
            ...Vuex.mapState([
				'currole'
            ]),
            current(){
                return this.currole.Id == 1024 ? MainMaster : MainTeacher
            },
            banneres() {
                return [{
                    "Image": require('./img/banner001.jpg')
                }]
            }
		},
        methods: {
            ...Vuex.mapMutations([
                'set_currole'
            ]),
            changeRole() {
                if(app.sysInfo.RoleList&&app.sysInfo.RoleList.length<2){
                    return
                }
                this.roleFlag = true;
                app.eventDefine.emit('mainTeacherchangeRole');
            },
            closeDor(){
                this.roleFlag = false;
            }
        },
        mounted() {
            window.teacherHome = this;
            app.eventDefine.on('roleActionSheetChangeArrow', this.closeDor);
        },
        beforeDestroy() {
            app.eventDefine.off('roleActionSheetChangeArrow');
        }
	}
</script>