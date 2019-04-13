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
                    width: 30px;
                    height: 17px;
                    // background-color: $color-assist-1;
                    border-radius: 17px;
                    background-color: #a5adb7;
                    position: relative;
                    transition: all 0.2s;
                    .cycle {
                        width: 12px;
                        height: 12px;
                        background-color: #fff;
                        border-radius: 12px;
                        position: absolute;
                        left: 50%;
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
		<scroller-base class="scroll" ref="scrollBars">
			<p class="header-point">
                <span style="padding-left:0px;">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconzhushishuoming"></use>
                    </svg>
                </span>
				<span>提示：团长在活动时间内成功邀请规定人数参加拼团，参团 人员（含团长）皆可获得课程优惠</span>
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

				</div>
				<div class="addImg border-bottom">
					<img-area :imageMaxNum="3" :imageFileList="activeSeting.imgList" @imageLoaded="imageLoaded" @imageFinished="setingImageFinished">
					</img-area>
				</div>
				<div class="input-item flex-row border-bottom ">
					<span class="require-icon">机构名称</span>
					<fe-text-area placeholder="请输入机构名称" v-model="activeSeting.campanyName" rows="1" maxlength="15"></fe-text-area>
					<!-- <div class="select" :class="value ? 'active' : ''">
                        <x-address title="" :raw-value='true' :value-text-align="'left'" placeholder="请输入省/市/区" v-model="value" :list="ChinaAddressV4Data"></x-address>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconxiala"></use>
                        </svg>
                    </div> -->
				</div>
				<div class="input-item flex-row border-bottom " style="padding-bottom: 20px;">
					<span class="require-icon">活动标题</span>
					<fe-text-area v-model="activeSeting.activeTitle" rows="2"  maxlength="30"></fe-text-area>
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
				<div class="input-item flex-row border-bottom">
					<span class="">课程名称</span>
					<fe-text-area placeholder="请输入课程名称" v-model="activeRule.className" rows="1" maxlength="30"></fe-text-area>
				</div>
				<div class="input-item  flex-row border-bottom" style="padding-bottom: 20px;">
					<span class="">课程描述</span>
					<fe-text-area v-model="activeRule.classInfo" maxlength="500"></fe-text-area>
				</div>
				<div class="input-item">
					<span class="">课程图片</span>
				</div>
				<div class="addImg border-bottom">
					<img-area :imageMaxNum="1" :imageFileList="activeRule.imgList" @imageLoaded="imageLoaded" @imageFinished="classImageFinished">
					</img-area>
				</div>
			</div>
			<div class="seting">
				<div class="input-item">
					<span class="require-icon">原价</span>
					<p>
						<input :disabled="isEdit" type="number" maxlength="10" v-model.number="activeRule.pirce" placeholder="请输入价格">元
					</p>
				</div>
				<p class="setting-point line border-bottom">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#iconzhushishuoming"></use>
					</svg>
					活动发布后不能修改
				</p>
				<div class="input-item">
					<span class="require-icon">拼团价</span>
					<p>
						<input :disabled="isEdit" type="number" maxlength="10" v-model.number="activeRule.discountPrice" placeholder="请输入价格">元
					</p>
				</div>
				<p class="setting-point line border-bottom">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#iconzhushishuoming"></use>
					</svg>
					活动发布后不能修改
				</p>
				<div class="input-item">
					<span class="require-icon">成团人数</span>
					<p><input type="number" :disabled="isEdit" maxlength="3" v-model.number="activeRule.groupNumber" placeholder="请输入人数">人</p>
				</div>
				<p class="setting-point line border-bottom">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#iconzhushishuoming"></use>
					</svg>
					活动发布后不能修改，建议合理设置成团人数，人数 越少，成团率越高
				</p>
				<div class="input-item">
					<span class="">成团数上限</span>
					<p><input type="number" maxlength="5"  v-model.number="activeRule.groupLimit" placeholder="请输入个数">个</p>
				</div>
				<p class="setting-point line border-bottom">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#iconzhushishuoming"></use>
					</svg>
					成团人数达到上限后，活动停止，发布后修改数量不 能小于当前数量
				</p>
				<!-- <div class="input-item">
                    <span class="">自动成团</span>
                    <div class="switch-wrapper" @click="activeRule.autoGroup = !activeRule.autoGroup">
                        <div class="switch" :class="{'on': activeRule.autoGroup}">
                            <div class="cycle" ref="cycle"></div>
                        </div>
                    </div>
                </div> -->
				<!-- <p class="setting-point line">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconzhushishuoming"></use>
                    </svg>
                    开启后，参团人员数未满时系统会自动成团
                </p> -->
				<div class="input-item flex-row" style="padding-bottom: 20px;">
					<span class="">活动描述</span>
					<fe-text-area v-model="activeRule.activeInfo" maxlength="500"></fe-text-area>
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
				<div class="addImg border-bottom">
					<img-area :imageMaxNum="3" :imageFileList="campanyInfo.imgList" @imageLoaded="imageLoaded" @imageFinished="campanyImageFinished">
					</img-area>
				</div>
				<div class="input-item flex-row" style="padding-bottom: 20px;">
					<span class="">联系信息</span>
					<fe-text-area v-model="campanyInfo.contactInformation" rows="3" maxlength="200"></fe-text-area>
				</div>
			</div>
			<p class="title" style="color: #666">-&nbsp;&nbsp;其他设置&nbsp;&nbsp;-</p>
			<div class="seting" style="padding-bottom: 10px;">
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
		</scroller-base>
		<loading class="loading" v-show="isLoading" :bgType='1'></loading>
		<div class="btn">
			<span class="preview" @click="preview">预览</span>
			<span class="save" @click="save">保存</span>
		</div>
	</div>
</template>

<script>
import { opactins, getactinsdetail,gettemplateinfo } from "manage/api/common.js";
import { ChinaAddressV4Data } from "vux";
import saveSuccess from "common/components/common/save-success.vue";
import {tempalteMixin} from 'common/pages/template-mixin.js';
export default {
    mixins: [tempalteMixin],
    data() {
        return {
            wxTitle: "拼团方案",
            type: "",
            saveSuccessFlag: false,
            templateid: "",
            styleid: "",
            id: "", // 编辑的时候 ，实例id
            ChinaAddressV4Data: ChinaAddressV4Data,
            isEdit: false,
            showSelectActivedTime: false,
            activeSeting: {
                imgList: [],
                campanyName: "",
                activeTitle: "",
                activedTime: ""
            },
            activeRule: {
                className: "",
                classInfo: "",
                imgList: [],
                pirce: "",
                discountPrice: "",
                groupNumber: "",
                groupLimit: "",
                autoGroup: false,
                activeInfo: ""
            },
            campanyInfo: {
                info: "",
                imgList: [],
                contactInformation: "",
                phone: ""
            },
            detail: {},
            isLoading: false,
            changeImgList: {
                activeSetingImgList: [],
                activeRuleImgList: [],
                campanyInfoImgList: []
            },
            tijiaoZhong: false
        };
    },
    methods: {
        ...Vuex.mapMutations(["setEndTime"]),
        imageLoaded(imgs, del) {
            this.refresh();
        },
        setingImageFinished(imgs, del) {
            this.changeImgList.activeSetingImgList = [];
            imgs.forEach(item => {
                this.changeImgList.activeSetingImgList.push(item);
            });
        },
        classImageFinished(imgs, del) {
            this.changeImgList.activeRuleImgList = [];
            imgs.forEach(item => {
                this.changeImgList.activeRuleImgList.push(item);
            });
        },
        campanyImageFinished(imgs, del) {
            this.changeImgList.campanyInfoImgList = [];
            imgs.forEach(item => {
                this.changeImgList.campanyInfoImgList.push(item);
            });
        },
        refresh() {
            this.$refs.scrollBars.refresh();
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
                    if (res.indexOf("NaN") == -1) {
                        this.activeSeting.activedTime = res;
                    }
                    this.showSelectActivedTime = false;
                });
        },
        preview() {
            let actinsfilelist = [];
            this.changeImgList.activeSetingImgList.forEach(item => {
                item.TYPE = 10;
            });
            this.changeImgList.activeRuleImgList.forEach(item => {
                item.TYPE = 20;
            });
            this.changeImgList.campanyInfoImgList.forEach(item => {
                item.TYPE = 30;
            });
            let imgList = [
                ...this.changeImgList.activeSetingImgList,
                ...this.changeImgList.activeRuleImgList,
                ...this.changeImgList.campanyInfoImgList
            ];
            imgList.forEach(item => {
                // 图片
                actinsfilelist.push({
                    type: item.TYPE,
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
            data.actinsrecruitcount = {
                // 处理默认模板数据
                groupawaitcount: 10, // 待成团
                groupcount: 20, // 已成团
                visitcount: 8000, // 预览人数
                enterusercount: 4000 // 报名人数
            };
            Window.previweData = data;
            console.log(data);
            this.$router.push({
                path: `/templateDetail/${this.styleid}`,
                query: { type: "preview", templateid: this.templateid }
            });
        },
        save() {
            if (this.verification() && !this.tijiaoZhong) {
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
                this.changeImgList.activeRuleImgList.forEach(item => {
                    item.TYPE = 20;
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
                        ...this.changeImgList.activeRuleImgList,
                        ...this.changeImgList.campanyInfoImgList
                    ];
                    // alert(JSON.stringify(imgList))

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
                                item.FilePath ||
                                item.filepath ||
                                item.localImgData;
                        }
                    }
                    data.imageurl = imgUrl;
                    console.log(data);
                    opactins({
                        optype: this.isEdit ? 2 : 1,
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
        setEditData() {
            this.activeSeting.activedTime = this.detail.expiretime;
            this.activeSeting.activeTitle = this.detail.title;
            this.activeSeting.campanyName = this.detail.orgname;

            this.activeRule.activeInfo = this.detail.contentmain;
            this.activeRule.className = this.detail.productname;
            this.activeRule.classInfo = this.detail.productdescribe;
            this.activeRule.pirce = this.detail.actinsconfiggroup.originalprice;
            this.activeRule.discountPrice = this.detail.actinsconfiggroup.groupprice;
            this.activeRule.groupNumber = this.detail.actinsconfiggroup.groupusercount;
            this.activeRule.groupLimit = this.detail.actinsconfiggroup.groupcountmax;
            this.activeRule.autoGroup =
                this.detail.actinsconfiggroup.isautogroup == 1 ? true : false;

            this.campanyInfo.phone = this.detail.orgphone;
            this.campanyInfo.info = this.detail.orgintroduce;
            this.campanyInfo.contactInformation = this.detail.contactinfo;

            this.activeSeting.imgList = this.detail.actinsfilelist.filter(
                item => item.type == 10
            );
            this.activeRule.imgList = this.detail.actinsfilelist.filter(
                item => item.type == 20
            );
            this.campanyInfo.imgList = this.detail.actinsfilelist.filter(
                item => item.type == 30
            );

            this.changeImgList.activeSetingImgList = [
                ...this.activeSeting.imgList
            ];
            this.changeImgList.activeRuleImgList = [...this.activeRule.imgList];
            this.changeImgList.campanyInfoImgList = [
                ...this.campanyInfo.imgList
            ];

            this.isLoading = false;
        },
        setUpdate() {
            let data = {
                id: this.id,
                acttmpid: this.templateid, //活动模板Id（string型long）
                actstyid: this.styleid, //活动风格Id（string型long）
                activitytype: 1, //活动类型（0未知，1拼团，2砍价，3传单）
                expiretime: this.activeSeting.activedTime, //过期时间
                title: this.activeSeting.activeTitle, //活动实例标题
                imageurl: "", //主图Url
                contentmain: this.activeRule.activeInfo, //主要内容
                productname: this.activeRule.className, //产品名称
                productdescribe: this.activeRule.classInfo, //产品描述
                orgname: this.activeSeting.campanyName, //机构名称
                orgphone: this.campanyInfo.phone + "", //机构电话
                orgintroduce: this.campanyInfo.info, //机构介绍
                contactinfo: this.campanyInfo.contactInformation, //联系地址
                actinsconfiggroup: {
                    //活动实例拼团配置
                    originalprice: this.activeRule.pirce, // 原价
                    groupprice: this.activeRule.discountPrice, // 拼团价
                    groupusercount: this.activeRule.groupNumber, // 成团人数
                    groupcountmax: this.activeRule.groupLimit, // 成团数上限
                    isautogroup: this.activeRule.autoGroup ? 1 : 0 // 自动成团
                },
                actinsfilelist: []
            };
            return data;
        },
        verification() {
            if (this.changeImgList.activeSetingImgList.length == 0) {
                app.toast("error", "请添加活动主题图");
                return false;
            }
            if (!this.activeSeting.activeTitle) {
                app.toast("error", "请填写活动标题");
                return false;
            }
            if (!this.activeSeting.campanyName) {
                app.toast("error", "请填写机构名称");
                return false;
            }
            if (!this.activeSeting.activedTime) {
                app.toast("error", "请填写活动截止时间");
                return false;
            }
            if (!this.activeRule.pirce) {
                app.toast("error", "请填写原价");
                return false;
            }
            if (!this.activeRule.discountPrice) {
                app.toast("error", "请填写拼团价");
                return false;
            }
            if (!this.activeRule.groupNumber) {
                app.toast("error", "请填写成团人数");
                return false;
            }
            if (!this.campanyInfo.phone) {
                app.toast("error", "请填写机构电话");
                return false;
            }
            return true;
        }
    },
    computed: {},
    created() {
        this.isLoading = true;
        this.type = this.$route.query.type;
        if (this.type == "add") {
            this.isEdit = false;
            this.templateid = this.$route.query.templateid;
            this.styleid = this.$route.params.id;
            gettemplateinfo({
                styleid: this.$route.params.id
            }).then(res => {
                  if (res.result.code == 200) {
                    this.detail = res.data;
                    // 这个是机构信息
                    this.setAddress();
                    this.setEditData();
                }else {
                    app.toast('error',res.result.msg)
                }
            })
        } else {
            this.isEdit = true;
            this.templateid = this.$route.query.templateid;
            this.styleid = this.$route.params.id;
            this.id = this.$route.query.id;
            getactinsdetail({
                actinsid: this.id
            }).then(res => {
                if (res.result.code == 200) {
                    this.detail = res.data;
                    this.setEditData();
                }
            });
        }
        this.$nextTick(() => {
            this.refresh();
        });
    },
    components: {
        saveSuccess
    }
};
</script>