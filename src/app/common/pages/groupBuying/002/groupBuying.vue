<style lang="scss" scoped>
.groupBuying-container {
    // position: relative;
    .groupBuying {
        @include position-absolute(0, 0, 49px, 0);
        background-color: #ffa200;
        .hotinfo {
            height: 32px;
            line-height: 32px;
            padding-left: 20px;
            color: #666666;
            font-size: 13px;
            display: flex;
            align-items: center;
            background-color: #ffffff;
            .image {
                display: inline-block;
                margin-right: 4px;
                width: 28px;
            }
        }
        .content {
            .bannerimg {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 50%;
                .bagimg {
                    display: block;
                    width: 100%;
                }
                .banner {
                    @include position-absolute;
                    .banner-item {
                        display: block;
                        height: 100%;
                        @include background-img(false, cover);
                        background-color: $color-assist-1;
                        border-radius: 4px;
                    }
                }
                .point {
                    position: absolute;
                    right: 0px;
                    bottom: 15px;
                    text-align: center;
                    width: 44px;
                    height: 44px;
                    padding: 6px 6px 6px 12px;
                    background: linear-gradient(
                        180deg,
                        rgba(255, 225, 113, 1) 0%,
                        rgba(252, 250, 195, 1) 100%
                    );
                    border-radius: 25px 0px 0px 25px;
                    color: #fc7815;
                    font-size: 13px;
                }
            }
            .price-box {
                padding: 0px 15px;
                display: flex;
                justify-content: space-between;
                color: #fff;
                background: linear-gradient(
                    270deg,
                    rgba(255, 137, 27, 1) 0%,
                    rgba(242, 75, 19, 1) 100%
                );
                .left {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 45px;
                    font-size: 12px;
                    .xiahua {
                        text-decoration: line-through;
                        font-size: 10px;
                        margin-top: 5px;
                    }
                    .price {
                        font-weight: bold;
                        font-size: 24px;
                        margin-right: 8px;
                    }
                }
                .right {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .text {
                        .point {
                            font-size: 12px;
                            text-align: right;
                        }
                        .time {
                            margin-top: 2px;
                            font-size: 12px;
                            span {
                                background-color: #fff;
                                color: #fc4019;
                                padding: 2px 0px;
                                min-width: 20px;
                                text-align: center;
                                display: inline-block;
                                border-radius: 4px;
                            }
                        }
                    }
                }
            }
            .container-group {
                margin: 18px 7px 0px;
                background-color: #fff;
                position: relative;
            }
            .group-box {
                height: 125px;
                @include background-img(false, cover);
                padding: 10px 15px 16px;
                .group-top-box {
                    display: flex;
                    justify-content: space-between;
                    .shard-box {
                        .shardicon {
                            font-size: 25px;
                            margin-left: 13px;
                            color: #fe5c00;
                        }
                    }
                    .title {
                        font-size: 16px;
                        color: #333;
                        line-height: 22px;
                        @include ellipsis-multi;
                        .num {
                            display: inline-block;
                            height: 16px;
                            line-height: 16px;
                            padding: 0 7px;
                            text-align: center;
                            border: 1px solid #fe0600;
                            border-radius: 10px;
                            color: #fe0600;
                            margin-right: 5px;
                            font-size: 12px;
                        }
                    }
                }
                .group-info {
                    display: flex;
                    justify-content: space-between;
                    color: #999;
                    margin-top: 12px;
                }
            }
            .group-item {
                margin: 0 12px;
                background: rgba(255, 246, 234, 1);
                border-radius: 3px;
                border: 1px solid rgba(255, 223, 153, 0);
                position: relative;
                min-height: 130px;
                margin-top: 22px;
                .title {
                    // @include background-img(false, cover);
                    text-align: center;
                    font-weight: bold;
                    font-size: 17px;
                    color: #751215;
                    width: 100%;
                    padding: 20px 0px 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i {
                        position: relative;
                        display: inline-block;
                        width: 7px;
                        height: 7px;
                        border-radius: 7px;
                        border: 2px solid rgba(255, 180, 15, 1);
                        background-color: #fff;
                        &::after {
                            content: "";
                            position: absolute;
                            width: 9px;
                            height: 1px;
                            top: 50%;
                            background: rgba(255, 180, 15, 1);
                        }
                    }
                    i:first-child {
                        margin-right: 7px;
                        &::after {
                            left: 0px;
                            transform: translate(-15px, -50%);
                        }
                    }
                    i:last-child {
                        margin-left: 7px;
                        &::after {
                            right: 0px;
                            transform: translate(15px, -50%);
                        }
                    }
                    // position: absolute;
                    // left: 50%;
                    // top: 0;
                    // transform: translate(-50%, -50%);
                }
                .content {
                    .top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-left: 8%;
                        padding-right: 8%;
                        color: #fff;
                        span {
                            height: 32px;
                            line-height: 32px;
                            width: 32px;
                            text-align: center;
                            border-radius: 32px;
                        }
                        .one {
                            background: rgba(255, 187, 77, 1);
                            box-shadow: 0px 7px 6px 0px rgba(255, 182, 38, 0.16);
                            margin-right: 11px;
                        }
                        .line {
                            height: 1px;
                            background-color: #ffbc2e;
                            width: 15%;
                        }
                        .tow {
                            background: rgba(255, 123, 17, 1);
                            box-shadow: 0px 7px 6px 0px rgba(255, 147, 38, 0.16);
                            margin-left: 15px;
                            margin-right: 15px;
                        }
                        .three {
                            margin-left: 14px;
                            background: rgba(239, 78, 26, 1);
                            box-shadow: 0px 6px 6px 0px rgba(248, 95, 19, 0.16);
                        }
                    }
                    .bottom {
                        margin-top: 17px;
                        margin-bottom: 20px;
                        display: flex;
                        justify-content: space-between;
                        color: #751319;
                        text-align: center;
                        padding-left: 4%;
                        padding-right: 4%;
                        span {
                            font-size: 14px;
                            width: 60px;
                            line-height: 22px;
                        }
                    }
                    .userbox {
                        padding-left: 16px;
                        padding-right: 16px;
                        .useritem {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 20px;
                            &:last-child {
                                margin-bottom: 24px;
                            }
                            .left {
                                display: flex;
                                align-items: center;
                                img {
                                    display: inline-block;
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 40px;
                                }
                                .userinfo {
                                    margin-left: 11px;
                                    .username {
                                        color: #333;
                                        font-size: 13px;
                                        margin-bottom: 7px;
                                        span {
                                            color: #e73114;
                                        }
                                    }
                                    .time {
                                        font-size: 12px;
                                        color: #999;
                                    }
                                }
                            }
                            .btn {
                                border-radius: 15px;
                                width: 73px;
                                height: 30px;
                                line-height: 30px;
                                text-align: center;
                                background: rgba(255, 129, 0, 1);
                                color: #fff;
                                font-size: 13px;
                            }
                        }
                    }
                    .course {
                        padding: 0px 16px 24px;
                        .coursetitle {
                            color: #c45f3a;
                            font-size: 15px;
                            margin-bottom: 8px;
                            font-weight: bold;
                        }
                        .point {
                            line-height: 21px;
                            font-size: 14px;
                            color: #666666;
                            white-space: pre-wrap;
                            .point-address,
                            .point-phone {
                                color: #666666;
                                margin-right: 12px;
                            }
                        }
                        .courseimg {
                            margin-top: 16px;
                            width: 100%;
                            display: block;
                            border-radius: 2px;
                        }
                    }
                    .center {
                        padding: 0px 20px 8px;
                        color: #333;
                        font-size: 13px;
                        text-align: center;
                        @include ellipsis-single;
                        span {
                            color: #e73114;
                        }
                    }
                    .user-list {
                        padding: 0 2px 22px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        li {
                            margin: 5px;
                            border-radius: 50px;
                            box-sizing: content-box;
                            img {
                                display: block;
                                width: 50px;
                                height: 50px;
                                border-radius: 50px;
                            }
                            .icon {
                                width: 50px;
                                height: 50px;
                                color: #aaa;
                            }
                        }
                        .leader {
                            border: 1.5px solid rgba(255, 146, 3, 1);
                            position: relative;
                            &::after {
                                content: "团长";
                                position: absolute;
                                top: -7px;
                                right: 0px;
                                padding: 1px 3px;
                                text-align: center;
                                background: rgba(255, 146, 3, 1);
                                border-radius: 9px;
                                color: #fff;
                                font-size: 11px;
                            }
                        }
                    }
                }
            }
            .all-user {
                margin: 0 15px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 2px 4px 0px rgba(251, 245, 237, 1);
                border-radius: 8px;
                border: 3px solid rgba(255, 223, 153, 1);
                margin-top: 30px;
                margin-bottom: 20px;
                .all-title {
                    color: #333;
                    text-align: center;
                    padding: 20px 0px;
                    font-weight: bold;
                }
                .all-list {
                    padding: 0 3% 16px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    li {
                        display: inline-block;
                        padding: 3px;
                        img {
                            display: block;
                            width: 40px;
                            height: 40px;
                            border-radius: 40px;
                        }
                        &:last-child {
                            margin-right: 0px;
                        }
                    }
                }
            }
        }
        .watch-more {
            text-align: center;
            color: #999;
            padding-bottom: 12px;
        }
        .group-bgcimg {
            position: absolute;
            top: -10px;
            width: 100%;
        }
        .footer-point {
            color: #c17635;
            font-size: 14px;
            text-align: center;
            padding-bottom: 12px;
        }
    }
    .footer-btn {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 49px;
        line-height: 49px;
        background: #ff8b02;
        color: #fff;
        text-align: center;
        font-size: 17px;
    }
    .footer-img-btn {
        position: absolute;
        bottom: 36px;
        right: 26px;
        img {
            width: 75px;
        }
    }
    .footer-tow-btn {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 49px;
        line-height: 49px;
        font-size: 17px;
        color: #333;
        background-color: #fff;
        text-align: center;
        display: flex;
        .preview {
            width: 112px;
            border-top: 1px solid #dddddd;
        }
        .save {
            flex: 1;
            background: rgba(255, 139, 2, 1);
            color: #fff;
        }
        .jieshu {
            background-color: #d7d7d7;
            color: #666666;
        }
        .shoukong {
            background-color: #ffd29c;
            color: #fff;
        }
    }
}
</style>

<template>
	<div class="groupBuying-container">
		<scroller-base class="groupBuying" ref="scrollBars" :data="renderData">
			<p class="hotinfo">
				<img class="image" :src="laba"> 已有{{detail.actinsrecruitcount.visitcount}}人查看，已有{{detail.actinsrecruitcount.enterusercount}}人报名
			</p>
			<div class="content">
				<!-- 背景 -->
				<div class="bannerimg">
					<slider ref="slider" class='banner' :autoPlay="true" :data="activeSetingImgList">
						<a class="banner-item" v-for="(item,index) in activeSetingImgList" @click="previewImg(item,'activeSetingImgList')" :key="index" :style="`background-image:url( ${item.filepath||item.localImgData||item.localId} )`"></a>
					</slider>
					<span class="point" @click="openActiveRuleOpened">活动说明</span>
				</div>

				<!-- 价格 -->
				<div class="price-box">
					<div class="left">
						<div class="price">
							<span style="font-size:12px;">&#165;</span> {{detail.actinsconfiggroup.groupprice}}
						</div>
						<p class="xiahua">&#165; {{detail.actinsconfiggroup.originalprice}}</p>
					</div>
					<div class="right">
						<div class="text">
							<p class="point">离活动结束还剩</p>
							<p class="time">
								<span v-if="type != 'add' && getComputedD > 0" class="day">{{getComputedD}}</span>&nbsp;{{ (type != 'add' && getComputedD > 0) ? '天': ''}}&nbsp;
								<span>{{type == 'add' ? '99' : getComputedH}}</span>&nbsp;:
								<span>{{type == 'add' ? '99' : getComputedM}}</span>&nbsp;:
								<span>{{type == 'add' ? '99' : getComputedS}}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="container-group">
                    <img class="group-bgcimg" :src="bgcimg">
					<!-- 团购信息 -->
					<div class="group-box">
						<div class="group-top-box">
							<p class="title">
								<span class="num">{{detail.actinsconfiggroup.groupusercount}}人团</span>{{detail.title}}</p>
							<div class="shard-box" @click="shardClick">
								<svg class="icon shardicon" aria-hidden="true">
									<use xlink:href="#iconfenxiang"></use>
								</svg>
							</div>
						</div>
						<div class="group-info">
							<span>在拼团: {{detail.actinsrecruitcount.groupawaitcount}}</span>
							<span>已成团: {{detail.actinsrecruitcount.groupcount}}</span>
							<span>可开团: {{detail.actinsconfiggroup.groupcountmax}}</span>
						</div>
					</div>

					<!-- 拼团介绍 单独接口-->
					<div class="group-item" style="margin-top: 0px" v-if="groupmember.length > 0">
						<div class="title">
							<i></i>我的团
							<i></i>
						</div>
						<div class="content">
							<div class="center" v-if="grouplacknumber != 0">【{{groupmember.length > 0 ? groupmember.filter(item => item.roletype == 1)[0].enterusername : ''}}的团】 您只差
								<span>{{grouplacknumber}}</span> 人,就可以成团了</div>
							<div class="center" v-if="grouplacknumber == 0">恭喜你，你参与的团已满团！</div>
							<ul class="user-list">
								<li v-for="(item,index) in detail.actinsconfiggroup.groupusercount > 4 ? 4 : detail.actinsconfiggroup.groupusercount" :key="index" :class="groupmember[index] ? (groupmember[index].roletype == 1 ? 'leader' : '' ) : ''">
									<img :src="groupmember[index] ? groupmember[index].photourl : ''" v-if="groupmember[index]">
									<svg class="icon" aria-hidden="true" v-if="!groupmember[index]">
										<use xlink:href="#iconkongrenyuan"></use>
									</svg>
								</li>
						        <li style="color:#A7A7A7;text-align: center;" v-if="detail.actinsconfiggroup.groupusercount > 4">
                                    <svg class="icon" aria-hidden="true" style="width:12px;">
										<use xlink:href="#icongengduo1"></use>
									</svg>
                                </li>
							</ul>
						</div>
                        <div class="watch-more" @click="watchMore" v-if="detail.actinsconfiggroup.groupusercount > 4">点击查看全部
                            <span>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconxiala"></use>
                                </svg>
                            </span>
                        </div>
					</div>

					<!-- 拼团介绍 -->
					<div class="group-item">
						<div class="title">
							<i></i>拼团介绍
							<i></i>
						</div>
						<div class="content">
							<div class="top">
                                <img :src="tpe1" style="width: 37px;">
                                <img :src="arror" style="width: 22px;">
                                <img :src="tpe2" style="width: 37px;">
                                <img :src="arror" style="width: 22px;">
                                <img :src="tpe3" style="width: 37px;">
								<!-- <span class="one">

                                </span>
								<i class="line"></i>
								<span class="tow">

                                </span>
								<i class="line"></i>
								<span class="three">

                                </span> -->
							</div>
							<div class="bottom">
								<span>报名开团 或者参团</span>
								<span>&nbsp;喊好友 一起拼团</span>
								<span>达到人数 拼团成功</span>
							</div>
						</div>
					</div>

					<!-- 正在拼团 -->
					<div class="group-item" v-if="groupcunt.length > 0">
						<div class="title">
							<i></i>正在拼团
							<i></i>
						</div>
						<div class="content">
							<div class="userbox">
								<div class="useritem" v-for="(item,index) in groupcunt" :key="index">
									<div class="left">
										<img :src="item.groupphotourl" alt="">
										<div class="userinfo">
											<p class="username">{{item.groupname}}的团 只差
												<span>{{item.groupusercount}}</span> 人</p>
											<!-- <p class="time">剩余 {{item.time}}</p> -->
										</div>
									</div>
									<div class="btn" @click="gotoCanyu(item)">去参团</div>
								</div>
							</div>
						</div>
					</div>

					<!-- 课程介绍 -->
					<div class="group-item">
						<div class="title">
							<i></i>课程介绍
							<i></i>
						</div>
						<div class="content">
							<div class="course">
								<p class="coursetitle">{{detail.productname}}</p>
								<p class="point">{{detail.productdescribe}}</p>
								<img @load="imgLoad" class="courseimg" v-for="(item,index) in activeRuleImgList" @click="previewImg(item,'activeRuleImgList')" :key="index" :src="`${item.FilePath||item.filepath||item.localImgData||item.localId}`">
							</div>
						</div>
					</div>

					<!-- 机构介绍 -->
					<div class="group-item" style="margin-bottom: 20px;">
						<div class="title">
							<i></i>机构介绍
							<i></i>
						</div>
						<div class="content">
							<div class="course">
								<p class="coursetitle">机构简介</p>
								<p class="point">{{detail.orgintroduce}}</p>
								<img @load="imgLoad" class="courseimg" v-for="(item,index) in campanyInfoImgList" @click="previewImg(item,'campanyInfoImgList')" :key="index" :src="`${item.FilePath||item.filepath||item.localImgData||item.localId}`">
								<p class="coursetitle" style="margin-top: 20px;">联系方式</p>
								<p class="point">
									<span>{{detail.contactinfo}}</span>
								</p>
								<!-- <span class="point-address">联系地址</span>{{groupBuyingData.campanyInfo.contactInformation}}</p> -->
								<!-- <p class="point"> -->
								<!-- <span class="point-phone">联系电话</span>{{groupBuyingData.campanyInfo.phone}}</p> -->
							</div>
						</div>
					</div>
					<!-- 看看谁拼了团  暂时不做-->
					<div class="all-user" v-if="false">
						<p class="all-title">看看谁拼了团</p>
						<ul class="all-list">
							<li v-for="(item,index) in userheaderlist" :key="index"><img :src="item"></li>
						</ul>
					</div>
					<p class="footer-point">本活动方案由 妙招生 提供支持</p>
				</div>
			</div>
		</scroller-base>
		<div class="footer-btn" @click="addMyActive" v-if="!isUser">{{ (type == 'preview' || type == 'managepreview') ? '返回' : '立即制作我的活动'}}</div>
		<!-- <div class="footer-img-btn" v-if="isUser">
      <img :src="btnImg">
    </div> -->
		<div class="footer-tow-btn" v-if="isUser">
			<a class="preview" :href="`tel:${detail.orgphone}`" v-if="leftBtnText != '我要开团'">{{leftBtnText}}</a>
			<span class="preview" @click="leftClick" v-if="leftBtnText == '我要开团'">{{leftBtnText}}</span>
			<span class="save" @click="rightClick" :class="detail.isexpire == 1 ? 'jieshu' : ( (detail.isfull == 1 && rightBtnText == '已售罄') ? 'shoukong' : '')">{{rightBtnText}}</span>
		</div>
		<active-rule :opened="activeRuleOpened" @close="activeRuleOpened = false" :text="detail.contentmain"></active-rule>
		<kaituan-success :groupusercount="detail.actinsconfiggroup.groupusercount" :opened="kaituan" @close="nodeopen" :userList="userList" @toLook="shardClick"></kaituan-success>
		<pingtuan-success :groupusercount="detail.actinsconfiggroup.groupusercount" :opened="pingtuan" @close="nodeopen" :userList="userList" @toLook="shardClick"></pingtuan-success>
		<enroll-sucess :opened="showSucess" class="enroll-sucess" @share="kaituanClick" :type='"group"' @offClick="showSucess = false"></enroll-sucess>
		<loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
	</div>
</template>

<script>
import activeRule from "common/components/common/activeRule.vue";
import kaituanSuccess from "../kaituan-success.vue";
import pingtuanSuccess from "../pingtuan-success.vue";
import EnrollSucess from "common/components/common/enrollSucess.vue";
import {
    getsharedetail,
    getgroupcount,
    getgroupmember,
    joinactivity,
    joingroupactivityshare,
} from "user/api/common.js";
import { getactinsdetail, gettemplateinfo,gettemplategroupcount,gettemplategroupmember} from "manage/api/common.js";
import { setTimeout } from "timers";
//用来处理机构信息相关的模板数据 
import bgcimg from './bgcimg.png';
import tpe1 from './1.png';
import tpe2 from './2.png';
import tpe3 from './3.png';
import arror from './arror.png';
export default {
    name: "groupBuying",
    mixins: [app.mixin.shareMixin],
    data() {
        return {
            wxTitle: "拼团",
            isUser: false,
            isLoading: false,
            showSucess: false, // 此团已经满了
            bgType: 1,
            kaituan: false,
            pingtuan: false,
            leftBtnText: "联系机构",
            rightBtnText: "立即开团",
            bgcimg,
            tpe1,
            tpe2,
            tpe3,
            arror,
            laba: require("common/img/laba.png"), // 喇叭
            userheaderlist: [],
            detail: {
                actinsrecruitcount: {},
                actinsconfiggroup: {},
                isjoin: 0
            }, // 活动数据
            groupmember: [], //  当前团的数据
            groupcunt: [], //  团的数据
            activeSetingImgList: [], // 主题图
            activeRuleImgList: [], // 课程图
            campanyInfoImgList: [], //  机构图
            activeRuleOpened: false,
            type: "",
            templateid: "",
            ruleid: "", // 要加入的团id
            isMax: false, // 是否售空
            userList: [],
            grouplacknumber: 2,
            grant: "",
            scrollData: 0,
        };
    },
    computed: {
        ...Vuex.mapState(["userInfo"]),
        ...Vuex.mapGetters([
            "getComputedH",
            "getComputedM",
            "getComputedS",
            "getComputedD"
        ]),
         renderData() {
            return {
                scrollData: this.scrollData,
                detail: this.detail,
                groupmember: this.groupmember,
                activeSetingImgList: this.activeSetingImgList,
                activeRuleImgList: this.activeRuleImgList,
                campanyInfoImgList: this.campanyInfoImgList
            };
        }
    },
    methods: {
        ...Vuex.mapMutations(["setEndTime"]),
         imgLoad(){
            this.scrollData++;
        },
        nodeopen() {
            this.detailInit(false);
        },
        gotoCanyu(item) {
            if (this.isUser) {
                app.baoMingAction().then(res => {
                    if (res.action) {
                        let tel = res.tel;
                        let name = res.name;
                        joingroupactivityshare({
                            activityshareid: this.$route.query.id,
                            groupid: item.groupid,
                            name: name,
                            phone: tel
                        }).then(res => {
                            if (res.result.code == 200) {
                                this.ruleid = item.groupid;
                                this.getGroup("pingtuan");
                            } else {
                                app.toast("error", res.result.msg);
                            }
                        });
                    } else {
                    }
                });
                if (!this.userInfo.smstel) {
                    //判断没有手机号码
                    // 因为是参加其他团，去分享又是其他团的资料，所以回来的时候，需要把当前团的id带到hash；
                    let hashObj = app.tool.parseHash();
                    hashObj.query.ruleid = item.groupid;
                    let hashRul =
                        hashObj.hash + app.tool.jsonToQueryStr(hashObj.query);
                    location.hash = hashRul;
                    wx.miniProgram.navigateTo({
                        url:
                            `/pages/authphone/authphone?url=` +
                            encodeURIComponent(location.href),
                        success: function() {},
                        fail: function() {
                            app.alert("跳转失败，请刷新页面重试。");
                        }
                    });
                }
            }
        },
        previewImg(img, type) {
            let current =
                    img.localId ||
                    app.tool.getAbsUrl(img.FilePath || img.filepath),
                urls = this[type].map(img => {
                    return (
                        img.localId ||
                        app.tool.getAbsUrl(img.FilePath || img.filepath)
                    );
                });
            app.sdk.previewImage({
                current: current,
                urls: urls
            });
        },
        openActiveRuleOpened() {
            this.activeRuleOpened = true;
        },
        addMyActive() {
            if (this.type == "add") {
                this.$router.push({
                    path: `/templateEdit/${this.$route.params.id}`,
                    query: { type: this.type, templateid: this.templateid }
                });
            } else if (this.type == "preview" || this.type == "managepreview") {
                this.$router.back();
                app.event.emit("stopSetInterval");
            }
        },
        timeEnd() {
            // alert('时间结束了')
        },
        shardClick() {
            //用户端才能点击去分享
            if (this.isUser) {
                let styleStr =
                        "styleid=" + encodeURIComponent(this.$route.params.id),
                    shareidStr =
                        "shareid=" + encodeURIComponent(this.$route.query.id),
                    idStr = "id=" + encodeURIComponent(this.detail.id),
                    activitytypeStr =
                        "activitytype=" +
                        encodeURIComponent(this.detail.activitytype),
                    templateStr =
                        "templateid=" +
                        encodeURIComponent(this.detail.acttmpid);
                let ruleid = "ruleid=" + encodeURIComponent(this.ruleid);
                let url = `/pages/share/share?${styleStr}&${shareidStr}&${idStr}&${activitytypeStr}&${templateStr}`;
                if (
                    this.ruleid != undefined &&
                    this.ruleid != "" &&
                    this.ruleid != "undefined"
                ) {
                    url += `&${ruleid}`;
                }
                wx.miniProgram.navigateTo({
                    url: url,
                    success: function() {},
                    fail: function() {
                        app.alert("跳转失败，请刷新页面重试。");
                    }
                });
            }
        },
        kaituanClick() {
            this.showSucess = false;
            if (this.detail.isfull == 1) {
                app.alert("此活动已售罄");
                return;
            }
            this.joinActivity();
            if (!this.userInfo.smstel) {
                //判断没有手机号码
                wx.miniProgram.navigateTo({
                    url:
                        `/pages/authphone/authphone?url=` +
                        encodeURIComponent(location.href),
                    success: function() {},
                    fail: function() {
                        app.alert("跳转失败，请刷新页面重试。");
                    }
                });
            }
        },
        joinActivity() {
            app.baoMingAction().then(res => {
                if (res.action) {
                    let tel = res.tel;
                    let name = res.name;
                    joinactivity({
                        activityshareid: this.$route.query.id,
                        name: name,
                        phone: tel
                    }).then(res => {
                        if (res.result.code == 200) {
                            this.ruleid = res.id;
                            this.getGroup("kaituan");
                        } else {
                            app.toast("error", res.result.msg);
                        }
                    });
                } else {
                }
            });
        },
        canyu() {
            app.baoMingAction().then(res => {
                if (res.action) {
                    let tel = res.tel;
                    let name = res.name;
                    joingroupactivityshare({
                        activityshareid: this.$route.query.id,
                        groupid: this.ruleid,
                        name: name,
                        phone: tel
                    }).then(res => {
                        if (res.result.code == 200) {
                            this.getGroup("pingtuan");
                        } else {
                            app.toast("error", res.result.msg);
                        }
                    });
                } else {
                }
            });
            if (!this.userInfo.smstel) {
                //判断没有手机号码
                wx.miniProgram.navigateTo({
                    url:
                        `/pages/authphone/authphone?url=` +
                        encodeURIComponent(location.href),
                    success: function() {},
                    fail: function() {
                        app.alert("跳转失败，请刷新页面重试。");
                    }
                });
            }
        },
        leftClick() {
            if (this.leftBtnText == "我要开团") {
                this.kaituanClick();
            }
        },
        getGroup(type) {
            getgroupmember({
                activityshareid: this.$route.query.id,
                groupid: this.ruleid
            }).then(res => {
                if (res.result.code == 200) {
                    this.userList = [];
                    if (res.data) {
                        res.data.forEach(item => {
                            if (item.roletype == 1) {
                                this.userList.unshift(item);
                            } else {
                                this.userList.push(item);
                            }
                        });
                    }
                    this[type] = true;
                } else {
                    app.toast("error", res.result.msg);
                }
            });
        },
        rightClick() {
            if (this.rightBtnText == "立即开团") {
                this.kaituanClick();
            } else if (this.rightBtnText == "邀请好友一起来拼团") {
                // 分享
                this.shardClick();
            } else if (this.rightBtnText == "参与此团") {
                this.canyu();
            } else if (this.rightBtnText == "此团已满") {
                this.showSucess = true;
            }
        },
        detailInit(openFlag = true) {
            this.kaituan = false;
            this.pingtuan = false;
            // 详情
            this.isUser = true;
            let list = [];
            let getDetail = getsharedetail({
                shareid: this.$route.query.id,
                ruleid:
                    this.ruleid != undefined &&
                    this.ruleid != "" &&
                    this.ruleid != "undefined"
                        ? this.ruleid
                        : ""
            });
            let getgroupcounts = getgroupcount({
                activityshareid: this.$route.query.id,
                groupid: this.ruleid
            });
            let getGroupmembers = getgroupmember({
                activityshareid: this.$route.query.id,
                groupid: this.ruleid
            });
            Promise.all([getDetail, getgroupcounts, getGroupmembers]).then(res => {
                this.isLoading = false;
                if (res[2].result.code == 200) {
                    this.groupmember = res[2].data;
                    this.grouplacknumber = res[2].grouplacknumber;
                }
                if (res[1].result.code == 200) {
                    this.groupcunt = res[1].data;
                }
                if (res[0].result.code == 200) {
                    this.detail = res[0].data;
                    this.$emit("loadDataComplete", {
                        name: this.detail.title
                    });
                    // 模板主题图
                    this.activeSetingImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 10
                    );
                    // 模板产品图
                    this.activeRuleImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 20
                    );
                    // 模板机构图
                    this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 30
                    );
                    if (this.detail.isjoin == 0) {
                        // 是否参与
                        if (
                            this.ruleid != undefined &&
                            this.ruleid != "" &&
                            this.ruleid != "undefined"
                        ) {
                            this.leftBtnText = "我要开团";
                            this.rightBtnText = "参与此团";
                        } else {
                            this.leftBtnText = "联系机构";
                            this.rightBtnText = "立即开团";
                            if (this.detail.isfull == 1) {
                                this.rightBtnText = "已售罄";
                            }
                        }
                    } else {
                        this.leftBtnText = "联系机构";
                        this.rightBtnText = "邀请好友一起来拼团";
                    }
                    if (this.detail.isexpire == 1) {
                        this.leftBtnText = "联系机构";
                        this.rightBtnText = "已结束";
                    }
                    // 当前成团数 = 成团上线
                    if (
                        this.detail.actinsconfiggroup.groupcountmax >=
                        this.detail.actinsrecruitcount.groupcount
                    ) {
                        this.isMax = false;
                    } else {
                        this.isMax = true;
                    }
                    this.$nextTick(() => {
                        let imgBox = this.$refs.scrollBars.$el;
                        let imgs = imgBox.querySelectorAll("img");
                        Array.prototype.forEach.call(imgs, (img, index) => {
                            img.addEventListener("load", () => {
                                setTimeout(() => {
                                    this.$refs.scrollBars.refresh();
                                }, 100);
                            });
                        });
                    });
                    this.setEndTime(this.detail.expiretime);
                    app.event.emit("startSetInterval");
                } else {
                    app.toast("error", res[0].result.msg);
                }
                if (this.grouplacknumber == 0 && this.detail.isjoin == 0) {
                    this.showSucess = true;
                    this.rightBtnText = "此团已满";
                }
                if (this.grant == "phone" && openFlag) {
                    if (
                        this.ruleid != undefined &&
                        this.ruleid != "" &&
                        this.ruleid != "undefined"
                    ) {
                        this.canyu();
                    } else {
                        this.kaituanClick();
                    }
                }
            });
        },
        watchMore() {
            if (this.isUser) {
                 app.watchMore({
                    type: 'groupBuy',
                    title: '已参团人员',
                    list: this.groupmember,
                    groupAllCount: this.detail.actinsconfiggroup.groupusercount

                })
            }
        }
    },
    created() {
        this.type = this.$route.query.type;
        this.templateid = this.$route.query.templateid;
        this.grant = this.$route.query.grant;
        
        if (this.type == "add") { //新增
            let gettemplateinfoPro = gettemplateinfo({
                    styleid: this.$route.params.id
                }),
                gettemplategroupcountPro = gettemplategroupcount({
                    styleid: this.$route.params.id,
                    page: {
                        pagesize:10,
                        pageindex:1
                    }
                }),
                gettemplategroupmemberPro = gettemplategroupmember({
                    styleid: this.$route.params.id
                });
            this.isLoading = true;

            Promise.all([gettemplateinfoPro,gettemplategroupcountPro,gettemplategroupmemberPro]).then(res => {
                this.isLoading = false;
                if (res[0].result.code == 200) {
                    this.detail = res[0].data;
                    // 模板主题图
                    this.activeSetingImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 10
                    );
                    // 模板产品图
                    this.activeRuleImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 20
                    );
                    // 模板机构图
                    this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 30
                    );
                }else {
                    app.toast('error',res[0].result.msg);
                }
                // 模板其他团的数据
                if (res[1].result.code == 200) {
                    this.groupcunt = res[1].data;
                }else {
                    app.toast('error',res[1].result.msg);
                }
                // 模板单前团的数据
                 if (res[2].result.code == 200) {
                    this.groupmember = res[2].data;
                }else {
                    app.toast('error',res[2].result.msg);
                }
            })
        } else if (this.type == "preview") {
            let gettemplategroupcountPro = gettemplategroupcount({
                    styleid: this.$route.params.id,
                    page: {
                        pagesize:10,
                        pageindex:1
                    }
                }),
                gettemplategroupmemberPro = gettemplategroupmember({
                    styleid: this.$route.params.id
                });
                this.isLoading = true;

              Promise.all([gettemplategroupcountPro,gettemplategroupmemberPro]).then(res => {
                this.isLoading = false;
                // 模板其他团的数据
                if (res[0].result.code == 200) {
                    this.groupcunt = res[0].data;
                }else {
                    app.toast('error',res[0].result.msg);
                }
                // 模板单前团的数据
                if (res[1].result.code == 200) {
                    this.groupmember = res[1].data;
                }else {
                    app.toast('error',res[1].result.msg);
                }
                this.detail = Window.previweData;
                // 模板主题图
                this.activeSetingImgList = this.detail.actinsfilelist.filter(
                    item => item.type == 10
                );
                // 模板产品图
                this.activeRuleImgList = this.detail.actinsfilelist.filter(
                    item => item.type == 20
                );
                // 模板机构图
                this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                    item => item.type == 30
                );
                this.setEndTime(this.detail.expiretime);

                app.event.emit("startSetInterval");

            })
        } else if (this.type == "managepreview") { //管理端预览
            let getactinsdetailPro = getactinsdetail({
                actinsid: this.$route.query.id
            }),
            gettemplategroupcountPro = gettemplategroupcount({
                styleid: this.$route.params.id,
                page: {
                    pagesize:10,
                    pageindex:1
                }
            }),
            gettemplategroupmemberPro = gettemplategroupmember({
                styleid: this.$route.params.id
            })
            this.isLoading = true;

            Promise.all([gettemplategroupcountPro,gettemplategroupmemberPro,getactinsdetailPro]).then(res => {
                this.isLoading = false;
                // 模板其他团的数据
                if (res[0].result.code == 200) {
                    this.groupcunt = res[0].data;
                }else {
                    app.toast('error',res[0].result.msg);
                }
                // 模板单前团的数据
                if (res[1].result.code == 200) {
                    this.groupmember = res[1].data;
                }else {
                    app.toast('error',res[1].result.msg);
                }
                if(res[2].result.code == 200) {
                    this.detail = res[2].data;
                    // 模板主题图
                    this.activeSetingImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 10
                    );
                    // 模板产品图
                    this.activeRuleImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 20
                    );
                    // 模板机构图
                    this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                        item => item.type == 30
                    );
                    this.$nextTick(() => {
                        let imgBox = this.$refs.scrollBars.$el;
                        let imgs = imgBox.querySelectorAll("img");
                        Array.prototype.forEach.call(imgs, (img, index) => {
                            img.addEventListener("load", () => {
                                setTimeout(() => {
                                    this.$refs.scrollBars.refresh();
                                }, 100);
                            });
                        });
                    });
                    this.setEndTime(this.detail.expiretime);

                    app.event.emit("startSetInterval");
                }else {
                    app.toast('error',res[2].result.msg);
                }
            });
        } else {
            this.ruleid = this.$route.query.ruleid; // 如果是邀请好友来参加此团，那么需要带入这个团的id
            if (
                this.ruleid != undefined &&
                this.ruleid != "" &&
                this.ruleid != "undefined"
            ) {
                this.detailInit();
            } else {
                getsharedetail({
                    shareid: this.$route.query.id
                }).then(res => {
                    if (res.result.code == 200) {
                        if (res.data.ruleid) {
                            this.ruleid = res.data.ruleid;
                        }
                        this.detailInit();
                    } else {
                        app.toast("error", res.result.msg);
                    }
                });
            }
        }
        this.$nextTick(() => {
            let imgBox = this.$refs.scrollBars.$el;
            let imgs = imgBox.querySelectorAll("img");
            Array.prototype.forEach.call(imgs, (img, index) => {
                img.addEventListener("load", () => {
                    setTimeout(() => {
                        this.$refs.scrollBars.refresh();
                    }, 100);
                });
            });
        });
    },
    components: {
        activeRule,
        kaituanSuccess,
        pingtuanSuccess,
        EnrollSucess
    }
};
</script>