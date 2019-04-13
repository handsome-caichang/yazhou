<!-- 个人中心界面 -->
<style lang="scss" scoped>



    .personal-center {
        .header {
            padding: 13px;
            display: flex;
            background-color: #2196f3;
            color: $color-white;
            @include background-img(false, cover);
            .avatar {
                width: 73px;
                height: 73px;
                border-radius: 50%;
                background-color: #EEF1F6;
                border: 2px solid $color-white;
                @include background-img(false, cover);
            }
            .info {
                flex: 1;
                font-size: 12px;
                padding-left: 10px;
                line-height: 1;
                @include flex-between;
                .serial {
                    padding-bottom: 6px;
                }
                .name {
                    font-size: 20px;
                    padding-bottom: 10px;
                }
            }
        }
        .nav {
            .nav-item {
                padding: 0 15px;
                height: 49px;
                color: $color-3;
                @include border-bottom;
                @include flex-between;
                background-color: $color-white;
                font-size: 16px;
                .nav-icon {
                    margin-right: 10px;
                }
                .nav-content {
                    color: $color-9;
                }
            }
        }
        .edit-password {
            padding: 0 15px;
            height: 49px;
            color: $color-3;
            @include border-bottom;
            @include flex-between;
            background-color: $color-white;
            font-size: 16px;
            .card-lf {
                .icon {
                    margin-right: 10px;
                }
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }

    }
</style>

<template>
    <scroller-base class="personal-center" v-if="info">
        <div @click="goToPersonalInformation" class="header"
             :style="'backgroundImage:url('+personalCenterBg+')'">
            <div class="avatar" :style="'background-image:url('+info.UserPhoto+')'"></div>
            <div class="info">
                <div>
                    <div class="name">{{info.Name}}</div>
                    <div class="serial">学号：{{info.Serial}}</div>
                    <div>电话：{{info.SMSTel}}</div>
                </div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
            </div>
        </div>
        <div class="nav">
            <div v-for="item in list"
                 v-if="judgeShow(item)">
                <div class="void" v-if="item.showVoid"></div>
                <div class="nav-item"
                     @click="changeContent(item)">
						<span>
							<svg class="icon nav-icon" aria-hidden="true">
								<use :xlink:href="item.icon"></use>
							</svg>{{item.text}}
						</span>
                    <span class="nav-content">
							<span v-if="item.name=='point'">{{info.Point|formatNumber}}</span>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-youjiantou"></use>
							</svg>
						</span>
                </div>
            </div>
            <div class="void"></div>
        </div>
        <!--修改密码-->
        <router-link class="edit-password" tag="div" :to="`/passwordModify/${uname}`">
            <div class="card-lf">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiugaimima1"></use>
                </svg>
                修改密码
            </div>
            <div class="card-rt"></div>
            <span class="nav-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </span>
        </router-link>
    </scroller-base>
</template>

<script>
    import {processGet} from 'parent/api/common';

    /**@description
     *  上课统计：配置项App_ShowCourseCount（师生信上是否显示课时统计信息）：0不显示1显示
     *  交费记录：配置项App_ShowFeeChargeList（师生信上是否显示交费记录）：0不显示1显示
     *  预制订单：配置项EnableClassOnline（是否启用在线选课报名功能）：0禁用1启用手机端2启用web端3都启用
     *  TODO：学生秀地址、预制订单入口、这个配置项是干嘛的？？？SSX_Personal_FeeRecords（是否禁止展示师生信个人中心交费记录功能）：0否1是
     */
    export default {
        name: 'personal-center',
        data() {
            return {
                wxTitle: '个人中心',
                info: null,
                uname: '',
                personalCenterBg: require('./img/personal-center-bg.jpg'),
                list: [{
                    href: 'GrowthList',
                    icon: '#icon-wodechengchang',
                    text: '我的成长',
                    showVoid: true
                }, {
                    href: "statisticsList",
                    icon: "#icon-shangketongji",
                    text: "上课统计",
                    showVoid: false,
                    name: 'courseCount'
                }, {
                    href: 'examScore',
                    icon: '#icon-chafen',
                    text: '查分',
                    showVoid: false
                }, /*{
				 	href: '',
				 	icon: '#icon-wodechuqin',
				 	text: '我的出勤',
				 	showVoid: true
				},*/{
                    href: 'transaction',
                    icon: '#icon-jiaoyijilu',
                    text: '交费记录',
                    showVoid: true,
                    name: 'feeRecord'
                }, {
                    href: 'orderList/0',
                    icon: '#icon-wodedingdan',
                    text: '预制订单',
                    showVoid: false,
                    name: 'order'
                }, {
                    icon: '#icon-wodejifen',
                    text: '我的积分',
                    showVoid: false,
                    name: 'point'
                }, /* {
                    href: 'coupon',
                    icon: '#icon-youhuiquan',
                    text: '我的优惠券',
                    showVoid: false,
                    name: 'coupon'
                }, */ {
                    icon: '#icon-qiehuanyonghu',
                    text: '切换用户',
                    showVoid: true,
                    name: 'changeLogin'
                }, {
                    href: 'suggestion',
                    icon: '#icon-tousuyujianyi',
                    text: app.sysInfo.Title_SSX_Suggest,
                    showVoid: true
                }]
            }
        },
        methods: {
            loadData() {
                processGet({
                    pname: 'parentAccount'
                }).then(res => {
                    if (res.errcode === app.errok) {
                        this.info = res.data;
                        this.uname = res.data.UserName;
                    }
                })
            },
            judgeShow(item) { //判断显示
                if (item.name === 'order' && !(app.sysInfo.EnableClassOnline == 1 || app.sysInfo.EnableClassOnline == 3)) { //预制订单是否显示
                    return false;
                }
                if (item.name === 'courseCount' && this.info.ShowCourseCount != 1) { //上课统计是否显示
                    return false;
                }
                if (item.name === 'feeRecord' && this.info.ShowFeeRecord != 1) { //交费记录是否显示
                    return false;
                }
                return true;
            },
            changeContent(item) { //处理页面跳转/其他的点击事件
                if (item.href) {
                    this.$router.push(`/${item.href}`);
                } else {
                    if (item.name === 'point') {
                        this.$router.push(`/point?point=${this.info.Point}&pointAdd=${this.info.Point_Add}&pointReduce=${this.info.Point_Reduce}`);
                    } else if (item.name === 'changeLogin') {
                        location.href = app.sysInfo.ChangeLoginURL;
                    }
                }
            },
            goToPersonalInformation(){
                if(app.sysInfo.EnableSSXStudentInfo==1 && app.sysInfo.isStudent==1){
                    this.$router.push('/xyxPersonalInformation/2')
                }else{
                    this.$router.push('/personalInformation')
                }
            }
        },
        created() {
            if (this.$route.name === 'home' && this.$route.params.homeIndex === '3') {
                this.loadData();
            }
        },
        watch: {
            $route(to) {
                if (to.name === 'home' && to.params.homeIndex === '3') {
                    this.loadData();
                }
            }
        }
    }
</script>