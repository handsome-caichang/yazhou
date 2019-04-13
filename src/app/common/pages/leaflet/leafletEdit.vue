<!-- 微传单-编辑界面 -->
<style lang="scss" scoped>
.wrapper {
    background-color: #f7f8fa;
    .scroll {
        @include position-absolute(0, 0, 49px, 0);
        .header-point {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6);
            line-height: 16px;
            padding: 8px 22px 10px 20px;
            background-color: #fff6ee;
            display: flex;
            .icon {
                width: 12px;
                height: 12px;
                color: #ffa352;
            }
            span {
                padding-left: 8px;
            }
        }
        .title {
            text-align: center;
            line-height: 43px;
            height: 43px;
            font-size: 15px;
            color: #333;
            font-weight: bold;
            background-color: #fff;
            margin-top: 10px;
        }
        .seting {
            background-color: #fff;
            .border-bottom {
                border-bottom: 1px solid #f7f8fa;
                // border-bottom: 1px solid red;
                padding-bottom: 20px;
            }
            .setting-point {
                color: #aaaaaa;
                font-size: 12px;
                font-weight: 400;
            }
            .line {
                display: flex;
                padding: 10px 20px;
                .icon {
                    width: 22px;
                    height: 14px;
                }
            }
            .addImg {
                margin-top: 10px;
                padding: 0px 20px 20px;
                .img-box .img-item .img-grid .img-wrap .img {
                    background-size: contain;
                }
            }
            .flex-row {
                padding-top: 18px;
                flex-direction: column;
                align-items: flex-start;
            }
            // textarea {
            //   padding: 8px 0px;
            //   line-height: 20px;
            //   font-size: 14px;
            //   color: #333;
            //   &::placeholder {
            //     color: #cccccc;
            //   }
            // }
            .select {
                color: #ccc;
                padding: 15px;
                display: flex;
                align-items: center;
                background-color: #f7f8fa;
                width: 100%;
                justify-content: space-between;
                font-weight: normal;
                margin-bottom: 20px;
                margin-top: 16px;
                border-radius: 4px;
                .icon {
                    margin-left: 8px;
                    color: #c2ccdc;
                    transition: all 0.3s;
                    transform: rotate(-90deg);
                }
                .icon.active {
                    transform: rotate(0deg);
                }
            }
            .select.active {
                color: #666666;
            }
        }
        .input-item {
            padding: 0px 20px;
            color: #333333;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 50px;
            input {
                width: 80px;
                height: 34px;
                line-height: 34px;
                border-radius: 4px;
                background-color: #f7f8fa;
                text-align: left;
                color: #666666;
                margin-right: 10px;
                &::placeholder {
                    color: #ccc;
                }
            }
            .input-box {
                margin-top: 16px;
                width: 100%;
                text-align: left;
                padding: 15px 15px;
                background-color: #f7f8fa;
                color: #666666;
                &::placeholder {
                    color: #ccc;
                }
            }
            .switch-wrapper {
                padding: 16px;
                padding-right: 0px;
                .switch {
                    width: 32px;
                    height: 20px;
                    // background-color: $color-assist-1;
                    border-radius: 20px;
                    background-color: #a5adb7;
                    position: relative;
                    transition: all 0.2s;
                    .cycle {
                        width: 15px;
                        height: 15px;
                        background-color: #fff;
                        border-radius: 12px;
                        position: absolute;
                        left: 53%;
                        top: 50%;
                        transform: translate(-100%, -50%);
                        transition: all 0.2s;
                    }
                }
                .on {
                    background-color: #00ce7d;
                    .cycle {
                        transform: translate(0%, -50%);
                    }
                }
            }
        }
        .vux-cell-box:not(:first-child):before {
            border: none !important;
        }
    }
    .btn {
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
            background-color: #ff8b02;
            color: #fff;
        }
    }
    .loading {
        z-index: 999999;
    }
}
</style>

<template>
	<div class="wrapper">
		<save-success :opened="saveSuccessFlag"></save-success>
		<scroller-base class="scroll" ref="scrollBars" :data="scrollData">
			<p class="header-point">
                <span style="padding-left:0px;">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconzhushishuoming"></use>
                    </svg>
                </span>
				<span>提示：活动期间，家长可通过微传单直接报名参与。</span>
			</p>
			<p class="title" style="margin-top:0">-&nbsp;&nbsp;活动设置&nbsp;&nbsp;-</p>
			<div class="seting">
				<div class="input-item">
                    <p class="require-icon">活动主题
						<span class="setting-point">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#iconzhushishuoming"></use>
							</svg>
							最多添加三张，建议尺寸750*375
						</span>
					</p>
					<!-- <span class="require-icon">活动主题图*</span>
					<p class="setting-point">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#iconzhushishuoming"></use>
						</svg>
						最多添加一张，建议尺寸750*375
					</p> -->
				</div>
				<div class="border-bottom addImg">
					<img-area :imageMaxNum="1" :imageFileList="activeSeting.imgList" @imageFinished="activeSetingImageFinished">
					</img-area>
				</div>
				<div class="input-item border-bottom flex-row">
					<span class="require-icon">机构名称</span>
					<fe-text-area placeholder="请输入机构名称" v-model="activeSeting.campanyName" rows="1" maxlength="15"></fe-text-area>
				</div>
				<div class="input-item border-bottom flex-row">
					<span class="require-icon">活动主题</span>
					<fe-text-area v-model="activeSeting.activeTitle" rows="2" maxlength="30"></fe-text-area>
				</div>
				<div class="input-item flex-row">
					<span class="require-icon">活动截止时间</span>
					<span class="select" @click="selectActivedTime" :class="activeSeting.activedTime ? 'active' : ''">
						{{activeSeting.activedTime ? activeSeting.activedTime : '请选择'}}
						<svg class="icon" aria-hidden="true" :class="showSelectActivedTime ? 'active' : ''">
							<use xlink:href="#iconxiala"></use>
						</svg>
					</span>
				</div>
			</div>
			<p class="title">-&nbsp;&nbsp;活动规则&nbsp;&nbsp;-</p>
			<div class="seting">
				<div class="input-item">
					<span class="">是否限制参与人数</span>
					<div class="switch-wrapper" @click="changeMaxPeople">
						<div class="switch" :class="{'on': isMaxPeople}">
							<div class="cycle" ref="cycle"></div>
						</div>
					</div>
				</div>
				<div class="input-item" v-if="isMaxPeople">
					<span class="">限制参与人数</span>
					<p>
						<input type="number" v-model.number="activeRule.enterusercountmax">人
					</p>
				</div>
				<div class="input-item border-bottom flex-row" style="padding-bottom: 10px;">
					<span class="">活动描述</span>
					<fe-text-area v-model="activeRule.contentmain"></fe-text-area>
				</div>
			</div>
			<p class="title">-&nbsp;&nbsp;机构介绍&nbsp;&nbsp;-</p>
			<div class="seting">
                <div class="input-item flex-row border-bottom">
					<span class="">机构简介</span>
					<fe-text-area v-model="campanyInfo.info" maxlength="500"></fe-text-area>
				</div>
                <div class="input-item">
					<span class="">机构图片</span>
				</div>
				<div class="border-bottom addImg">
					<img-area :imageMaxNum="3" :imageFileList="campanyInfo.imgList" @imageFinished="campInfoImageFinished">
					</img-area>
				</div>
				<div class="input-item border-bottom flex-row">
					<span class="">联系信息</span>
					<fe-text-area v-model="campanyInfo.contactInformation" rows="3"></fe-text-area>
				</div>
			</div>
			<p class="title">-&nbsp;&nbsp;其他设置&nbsp;&nbsp;-</p>
			<div class="seting">
				<div class="input-item flex-row">
					<span class="require-icon">机构电话</span>
					<input class="input-box" type="tel" v-model="campanyInfo.phone" placeholder="请输入机构电话">
				</div>
				<p class="setting-point line">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#iconzhushishuoming"></use>
					</svg>
					设置机构电话后，家长可快速打电话进行查询
				</p>
			</div>
			<div class="seting" style="padding-bottom: 10px;">
				<div class="input-item flex-row">
					<span>提交按钮</span>
					<input class="input-box" type="text" maxlength="6" v-model="campanyInfo.enterbuttonname" placeholder="请输入提交按钮名称">
				</div>
				<p class="setting-point line">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#iconzhushishuoming"></use>
					</svg>
					提交按钮可自定义，这里是家长点击报名的按钮； 最多可输入6个字；
				</p>
			</div>
		</scroller-base>
		<loading class="loading" v-show="isLoading" :bgType='1'></loading>
		<div class="btn">
			<span class="preview" @click="preview">预览</span>
			<span class="save" @click="saveInfo">保存</span>
		</div>
	</div>
</template>

<script>
import { opactins, getactinsdetail, gettemplateinfo } from "manage/api/common.js";
import saveSuccess from "common/components/common/save-success.vue";
import { templateData } from "./001/leaflet.js";
import {tempalteMixin} from 'common/pages/template-mixin.js';
export default {
    name: "leafletEdit",
    mixins: [tempalteMixin],
    data() {
        return {
            wxTitle: "微传单",
            type: "",
            id: "",
            saveSuccessFlag: false,
            templateid: "",
            styleid: "",
            isMaxPeople: false,
            activeSeting: {
                imgList: [
                    {
                        type: 10,
                        filepath:
                            "https://cdn01.xiaogj.com/file/e97bc11b7c364af693d0e1b8bdba83a6/201903/9c34aee59e1d4005911e8f0bfd2185d7.png"
                    }
                ],
                campanyName: "",
                activeTitle: "",
                activedTime: ""
            },
            activeRule: {
                contentmain: "",
                createuserid: "",
                islimitenterusercount: 0,
                enterusercountmax: 0
            },
            campanyInfo: {
                info: "",
                imgList: [
                    {
                        type: 30,
                        filepath:
                            "https://cdn01.xiaogj.com/file/7b4842887b1143e5a77b3e4cd04a0e01/201903/03a8d42fc6be4602bdfcdb37cd35df9a.png"
                    }
                ],
                contactInformation: "",
                phone: "",
                enterbuttonname: ""
            },
            detail: {},
            isLoading: false,
            changeImgList: {
                activeSetingImgList: [],
                campanyInfoImgList: []
            },
            tijiaoZhong: false
        };
    },
    computed: {
        scrollData() {
            return {
                isMaxPeople: this.isMaxPeople,
                img1: this.activeSeting.imgList,
                img2: this.campanyInfo.imgList
            };
        }
    },
    methods: {
        activeSetingImageFinished(imgs, del) {
            // this.activeSeting.imgList = imgs;
            this.changeImgList.activeSetingImgList = [];
            imgs.forEach(item => {
                item.TYPE = 10;
                this.changeImgList.activeSetingImgList.push(item);
            });
        },
        campInfoImageFinished(imgs, del) {
            // this.campanyInfo.imgList = imgs;
            this.changeImgList.campanyInfoImgList = [];
            imgs.forEach(item => {
                item.TYPE = 30;
                this.changeImgList.campanyInfoImgList.push(item);
            });
        },
        changeMaxPeople() {
            this.isMaxPeople = !this.isMaxPeople;
        },
        selectActivedTime() {
            this.showSelectActivedTime = true;
            app
                .datetimePicker({
                    format: "YYYY-MM-DD HH:mm",
                    date: this.activeSeting.activedTime
                        .replace("T", " ")
                        .replace(/-/g, "/")
                })
                .then(res => {
                    console.log(res);
                    if (new Date(res).getTime() - new Date().getTime() < 0) {
                        app.toast("error", "活动截止日期不能小于当前日期");
                        return;
                    }
                    this.activeSeting.activedTime = res;
                    this.showSelectActivedTime = false;
                });
        },
        setEditData() {
            this.activeSeting.activedTime = this.detail.expiretime;
            this.activeSeting.activeTitle = this.detail.title;
            this.activeSeting.campanyName = this.detail.orgname;

            this.activeRule.contentmain = this.detail.contentmain;
            this.activeRule.enterusercountmax = this.detail.actinsconfigleaflet.enterusercountmax;
            this.isMaxPeople =
                this.detail.actinsconfigleaflet.islimitenterusercount == 1
                    ? true
                    : false;

            this.campanyInfo.phone = this.detail.orgphone;
            this.campanyInfo.info = this.detail.orgintroduce;
            this.campanyInfo.contactInformation = this.detail.contactinfo;
            this.campanyInfo.enterbuttonname = this.detail.enterbuttonname;

            this.activeSeting.imgList = this.detail.actinsfilelist.filter(
                item => item.type == 10
            );
            this.campanyInfo.imgList = this.detail.actinsfilelist.filter(
                item => item.type == 30
            );
            this.changeImgList.activeSetingImgList = [
                ...this.activeSeting.imgList
            ];
            this.changeImgList.campanyInfoImgList = [
                ...this.campanyInfo.imgList
            ];
        },
        setUpdate() {
            let data = {
                id: this.id,
                acttmpid: this.templateid, //活动模板Id（string型long）
                actstyid: this.styleid, //活动风格Id（string型long）
                activitytype: 3, //活动类型（0未知，1拼团，2砍价，3传单）
                expiretime: this.activeSeting.activedTime, //过期时间
                title: this.activeSeting.activeTitle, //活动实例标题
                imageurl: "", //主图Url
                enterbuttonname: this.campanyInfo.enterbuttonname,
                contentmain: this.activeRule.contentmain, //活动描叙
                orgname: this.activeSeting.campanyName, //机构名称
                orgphone: `${this.campanyInfo.phone}`, //机构电话
                orgintroduce: this.campanyInfo.info, //机构介绍
                contactinfo: this.campanyInfo.contactInformation, //联系地址
                actinsconfigleaflet: {
                    //活动实例拼团配置
                    islimitenterusercount: this.isMaxPeople ? 1 : 0, // 是否最大名额
                    enterusercountmax: this.activeRule.enterusercountmax // 最大人数
                },
                actinsfilelist: []
            };
            return data;
        },
        preview() {
            let actinsfilelist = [];
            this.changeImgList.activeSetingImgList.forEach(item => {
                item.type = 10;
            });
            this.changeImgList.campanyInfoImgList.forEach(item => {
                item.type = 30;
            });
            let imgList = [
                ...this.changeImgList.activeSetingImgList,
                ...this.changeImgList.campanyInfoImgList
            ];
            imgList.forEach(item => {
                // 图片
                actinsfilelist.push({
                    type: item.type,
                    filepath:
                        item.FilePath ||
                        item.filepath ||
                        item.localImgData ||
                        item.localId
                });
            });
            let data = this.setUpdate();
            data.actinsfilelist = actinsfilelist;
            let imgUrl = "";
            if (this.activeSeting.imgList.length > 0) {
                let item = this.activeSeting.imgList[0];
                if (item.serverId) {
                    imgUrl = item.serverId;
                } else {
                    imgUrl =
                        item.FilePath || item.filepath || item.localImgData;
                }
            }
            data.imageurl = imgUrl;
            app.ls.set("previweData", data);
            console.log(data);
            this.$router.push({
                path: `/templateDetail/${this.styleid}`,
                query: { type: "preview", templateid: this.templateid }
            });
        },
        saveInfo() {
            if (this.changeImgList.activeSetingImgList.length == 0) {
                app.toast("error", "请添加活动主题图");
                return false;
            }
            if (!this.activeSeting.campanyName) {
                app.toast("error", "请填写机构名称");
                return;
            }
            // if (!this.activeSeting.imgList.length) {
            //     app.toast("error", "请填写机构名称");
            //     return;
            // }
            if (!this.activeSeting.activeTitle) {
                app.toast("error", "请填写活动主题");
                return;
            }
            if (!this.campanyInfo.phone) {
                app.toast("error", "请填写机构电话");
                return;
            }
            if (this.tijiaoZhong) {
                return;
            }
            this.isLoading = true;
            this.tijiaoZhong = true;
            let actinsfilelist = [];
            let _promise = [];
            this.changeImgList.activeSetingImgList.forEach(item => {
                item.TYPE = 10;
                if (item.promise) {
                    _promise.push(item.promise);
                }
            });
            this.changeImgList.campanyInfoImgList.forEach(item => {
                item.TYPE = 30;
                if (item.promise) {
                    _promise.push(item.promise);
                }
            });
            Promise.all(_promise).then(res => {
                let _url = [];
                let imgList = [
                    ...this.changeImgList.activeSetingImgList,
                    ...this.changeImgList.campanyInfoImgList
                ];
                imgList.forEach(item => {
                    // 图片
                    if (item.serverId) {
                        actinsfilelist.push({
                            type: item.TYPE,
                            serverid: item.serverId
                        });
                    } else {
                        actinsfilelist.push({
                            type: item.TYPE,
                            filepath:
                                item.FilePath ||
                                item.filepath ||
                                item.localImgData
                        });
                    }
                });
                let data = this.setUpdate();
                data.actinsfilelist = actinsfilelist;
                let imgUrl = "";
                if (this.changeImgList.activeSetingImgList.length > 0) {
                    let item = this.changeImgList.activeSetingImgList[0];
                    if (item.serverId) {
                        imgUrl = item.serverId;
                    } else {
                        imgUrl =
                            item.FilePath || item.filepath || item.localImgData;
                    }
                }
                data.imageurl = imgUrl;
                console.log(data);
                opactins({
                    optype: this.type == "add" ? 1 : 2,
                    actinslist: [data]
                }).then(res => {
                    this.isLoading = false;
                    if (res.result.code == 200) {
                        app.event.emit("myActiveRefresh");
                        this.saveSuccessFlag = true;
                        setTimeout(() => {
                            this.saveSuccessFlag = false;
                            this.$router.replace("/home/1");
                        }, 1000);
                    } else {
                        this.tijiaoZhong = false;
                        app.toast("error", res.result.msg);
                    }
                });
            });
        }
    },
    created() {
        this.type = this.$route.query.type;
        if (this.type == "add") {
            this.templateid = this.$route.query.templateid;
            this.styleid = this.$route.params.id;
            gettemplateinfo({
                styleid: this.styleid
            }).then(res => {
                console.log(res)
                if (res.result.code == app.errok) {
                    this.detail = res.data;
                    this.setAddress();
                    this.setEditData();
                }
            })
            // this.detail = templateData;
            console.log(this.detail);
        } else {
            this.templateid = this.$route.query.templateid;
            this.styleid = this.$route.params.id;
            this.id = this.$route.query.id;
            getactinsdetail({
                actinsid: this.id
            }).then(res => {
                if (res.result.code == 200) {
                    this.detail = res.data;
                    this.setEditData();
                    app.event.emit("myActiveRefresh");
                    this.$router.replace("/home/1");
                }
            });
        }
    },
    components: {
        saveSuccess
    }
};
</script>