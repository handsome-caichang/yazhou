
<!--客户端-我的活动-->
<style scoped lang="scss">
    .home {
        @include position-absolute;
        background-color: #f7f8fa;
        overflow: hidden;
        .search-box {
            background-color: #eef1f6;
            padding: 8px 10px;
            .search {
                height: 28px;
                line-height: 28px;
                background: rgba(255, 255, 255, 1);
                border-radius: 28px;
                padding: 0 23px 0 12px;
                color: #333333;
                font-size: 13px;
                position: relative;
                .icon {
                    position: absolute;
                    right: 1%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 12px;
                }
            }
        }
        .tip {
            background: linear-gradient(
                270deg,
                rgba(255, 137, 27, 1) 0%,
                rgba(242, 75, 19, 1) 100%
            );
            height: 45px;
            line-height: 45px;
            padding: 0 12px;
            color: #fff;
            font-size: 14px;
            display: flex;
            align-items: center;
            .icon1 {
                margin-right: 7px;
            }
            .ellipsis-single {
                @include ellipsis-single;
            }
        }
        .scroll {
            @include position-absolute(44px, 0, 0, 0);
            background-color: #f7f8fa;
            .list {
                padding-bottom: 15px;
                overflow: hidden;
                li {
                    margin: 12px;
                    background-color: #fff;
                    border-radius: 10px;
                    position: relative;
                    .top {
                        color: #333333;
                        height: 45px;
                        font-size: 16px;
                        line-height: 45px;
                        position: relative;
                        padding: 0 60px 0 58px;
                        border-radius: 10px 10px 0 0;
                        .label {
                            position: absolute;
                            top: 50%;
                            left: 8px;
                            transform: translate(0, -50%);
                            width: 41px;
                            height: 18px;
                            line-height: 18px;
                            border-radius: 0px 10px 10px 0px;
                            color: #fff;
                            font-size: 10px;
                            text-align: center;
                        }
                        .point {
                            @include ellipsis-single;
                        }
                    }
                    .middle-box {
                        position: relative;
                        padding-left: 100px;
                        min-height: 75px;
                        display: flex;
                        align-items: center;
                        color: #999;
                        .li-img {
                            position: absolute;
                            left: 8px;
                            width: 75px;
                            height: 75px;
                            margin-right: 15px;
                            @include background-img(false,cover);
                            background-color: #F7F8FA;
                        }
                        .price-box {
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            margin-bottom: 15px;
                            .price {
                                color: #F03232;
                                font-size: 20px;
                                margin-right: 6px;
                                font-weight: 500;
                            }
                            .xiahua {
                                text-decoration: line-through;
                                font-size: 10px;
                                color: #666;
                            }
                        }
                    }
                    .ac-status {
                        position: absolute;
                        z-index: 1;
                        &.expire {
                            width: 62px;
                            height: 62px;
                            top: 0;
                            right: 0;
                        }
                        &.pic {
                            top: 12px;
                            right: 12px;
                            width: 46px;
                            height: 16px;
                            background-size: cover;
                            background-repeat: no-repeat;
                        }
                }
            }
            .bottom-box {
                box-shadow: 0px 2px 4px 0px rgba(79, 94, 163, 0.14);
                border-radius: 0px 0px 10px 10px;
                padding: 8px 16px 8px;
                border-top: 1px solid rgb(244, 244, 245);
                margin-top: 9px;
                display: flex;
                justify-content: space-between;
                .left {
                    font-size: 13px;
                    color: #999;
                    display: flex;
                    align-items: center;
                    .time {
                        font-size: 14px;
                        color: #FE5C00;
                    }
                }
                .right {
                    width: 56px;
                    height: 28px;
                    color: #FE5C00;
                    line-height: 28px;
                    border-radius: 28px;
                    text-align: center;
                    border: 1px solid #FE5C00;
                    &.disabled {
                        color: #CCCCCC;
                        border: 1px solid #CCCCCC;
                    }
                }
            }
            }
        }

        .noList {
            @include position-absolute;
            z-index: 1;
            text-align: center;
            margin-top: 130px;
            p {
                margin-top: 35px;
                font-size: 16px;
                color: #999;
            }
            .icon {
                width: 120px;
                height: 95px;
            }
        }
        .as-actionsheets {
            @include position-absolute($h-2, 0, 0, 0);
            z-index: 2;
        }
        .footer-btn {
            position: absolute;
            bottom: 36px;
            right: 26px;
            z-index: 999;
            img {
                width: 75px;
            }
        }
    }
</style>

<template>
    <div class="home">
        <div class="search-box">
            <div class="search" @click="openActionsheets=!openActionsheets">
                {{curActivity.name}}
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconxiala"></use>
                </svg>
            </div>
        </div>
        <div class="tip" v-if="tip.activityshareid" @click="togo(tip)">
        <svg class="icon icon1" aria-hidden="true">
            <use xlink:href="#iconkehuduan-tongzhi"></use>
        </svg>
        <span class="ellipsis-single">{{tipName}}</span>
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#iconjiantou"></use>
            </svg>
        </div>
        <scroller-super ref="pagingScroller" 
            :style="{top:scrollTop}" 
            class="scroll" 
            :type="2" 
            :data="dataList" 
            :pagingOption="pagingOption" 
            @loadData="loadData">
            <ul class="list" v-if="list.length>0">
                <li v-for="(item, index) in list " :key="index">
                    <div class="top">
                        <img class="label" :src="item.type==1?pingtuan:item.type==2?kanjia:weichuandan">
                        <div class="point">{{item.description}}</div>
                        <svg class="icon ac-status expire" aria-hidden="true" v-if="item.isexpire==1">
                            <use xlink:href="#iconyijieshu"></use>
                        </svg>
                        <span class="ac-status pic" v-else-if="item.shareuserstatus==1" :style="'backgroundImage:url('+ongoingImg+')'"></span>
                        <span class="ac-status pic" v-else-if="item.shareuserstatus==2" :style="'backgroundImage:url('+completeImg+')'"></span>
                    </div>
                    <div class="middle-box" @click="togo(item)">
                        <div class="li-img" :style="`background-image:url( ${item.filepath||item.imgurl} )`"></div>
                        <div>
                            <div class="price-box" v-if="item.type != 3">
                                <span class="price"><span style="font-size:12px;">&#165;</span>{{item.discountprice}}</span>
                                <p class="xiahua">&#165; {{item.fullprice}}</p>
                            </div>
                            <div>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconxiaoqu"></use>
                                </svg>&nbsp;{{item.companyname}}</div>
                        </div>
                        <!-- <img :src="item.imgurl" class="li-img" @click="togo(item)"> -->
                    </div>
                    <div class="bottom-box">
                        <div class="left"><span v-if="item.isexpire==0&&item.shareuserstatus==1">距结束：<span class="time">{{handleTime(item.expire)}}</span></span></div>
                        <div class="right" :class="item.isexpire==1?'disabled':''" @click="shareClick(item)">分享</div>
                    </div>
                </li>
            </ul>
        </scroller-super>
        <div class="noList" v-if="list.length == 0">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconkong"></use>
            </svg>
            <p @click="trigger()">您还没有任何活动哦～</p>
        </div>
        <actionsheets-activity class="as-actionsheets" :opened.sync="openActionsheets" @changeActivity="changeActivity" :curActivity="curActivity"></actionsheets-activity>
        <loading class="loading" v-show="isLoading" :type="1"></loading>
    </div>
</template>

<script>
    import { getjoinactshare, getjoinacttips } from "user/api/common.js";
    import ActionsheetsActivity from "./actionsheets-activity.vue";
    export default {
        data() {
            return {
                wxTitle: "我的活动",
                ongoingImg: require("./img/status-ongoing.png"),
                completeImg: require("./img/status-complete.png"),
                kanjia: require("./img/kanjia.png"),
                pingtuan: require("./img/pingtuan.png"),
                weichuandan: require("./img/weichuandan.png"),
                openActionsheets: false,
                scrollTop:'44px',
                curActivity: {
                    value: 0,
                    name: "全部活动"
                },
                tip: {
                    needcount: "",
                    activityshareid: "",
                    activityinstanceid: "",
                    type: ""
                },
                list: [],
                isLoading: false,
                pagingOption: {
                    api: getjoinactshare,
                    params: {
                    type: 0 //实例编号(不传为获取全部)
                    },
                    pageOpt: {
                    // 分页初始页码的'key'、'value'
                    indexKey: "pageindex",
                    indexVal: 1,
                    // 每页请求数据长度的'key'、'value'
                    sizeKey: "pagesize",
                    sizeVal: 20,
                    // 后端返回的总页数'key'
                    countKey: "totalpage"
                    }
                },
                num: 0,
                timeout: null
            };
        },
        computed: {
            dataList() {
                return {
                    num: this.num,
                    data: this.list
                }
            },
            tipName() {
            if (this.tip.type == 1)
                return `您参与的拼团活动，就差${
                    this.tip.needcount
                }人就成团了，快去看看吧~`;
            if (this.tip.type == 2)
                return `您参与的砍价活动，就差${
                    this.tip.needcount
                }人就能砍到最低价了，快去邀请好友来砍价吧~`;
            }
        },
        methods: {
            shareClick(item) {
                if(item.isexpire==1){
                    return;
                }
                let styleStr = "styleid=" + encodeURIComponent(item.styleid),
                    shareidStr = "shareid=" + encodeURIComponent(item.activityshareid),
                    idStr = "id=" + encodeURIComponent(item.activityinstanceid),
                    activitytypeStr = "activitytype=" + encodeURIComponent(item.type),
                    ruleid = "ruleid=" + encodeURIComponent(item.ruleid);
                wx.miniProgram.navigateTo({
                    url: `/pages/share/share?${styleStr}&${shareidStr}&${idStr}&${activitytypeStr}&${ruleid}`,
                    success: function() {},
                    fail: function() {
                    app.alert("跳转失败，请刷新页面重试。");
                    }
                });
            },
            trigger() {
                let succUrl = "succUrl=" + encodeURIComponent(window.location.href);
                wx.miniProgram.navigateTo({
                    url: `/pages/attend/attend?${succUrl}`,
                    success: function() {},
                    fail: function() {
                    app.alert("跳转失败，请刷新页面重试。");
                    }
                });
                },
                changeActivity(ac) {
                this.curActivity = ac;
                //筛选活动
                this.pagingOption.params.type = ac.value;
                this.$refs.pagingScroller.refresh(this.pagingOption.params);
            },
            togo(item) {
                this.$router.push({
                    path: `/templateDetail/${item.styleid}`,
                    query: { id: item.activityshareid, ruleid: item.ruleid }
                });
            },
            loadData(ajaxPromise) {
                this.isLoading = true;
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        if (res.page.pageindex === 1) {
                            this.list = [];
                        }
                        res.data.forEach((item,index)=>{
                            item.expire = (new Date(item.expiretime.replace('T',' ').replace(/-/g,'\/')).getTime()- new Date().getTime())/1000;
                        })
                        this.list = this.list.concat(res.data);
                        this.imgLoading();
                        clearTimeout(this.timeout);
                        this.diffTime();
                    }
                });
            },
            imgLoading() {
                this.$nextTick(() => {
                    let imgBox = this.$refs.pagingScroller.$el;
                    let imgs = imgBox.querySelectorAll("img");
                    Array.prototype.forEach.call(imgs, (img, index) => {
                        img.addEventListener("load", () => {
                            this.num++;
                        });
                    });
                });
            },
            handleTime(value) {
                var second = parseInt(value), // 秒 
                    minute = 0, // 分
                    hour = 0, // 小时 
                    day = 0; //天
                
                if(second > 60) {
                    minute = parseInt(second/60); 
                    second = parseInt(second%60); 
                    if(minute > 60) {
                        hour = parseInt(minute/60); 
                        minute = parseInt(minute%60);
                        if(hour > 24) {
                            day = parseInt(hour/24);
                            hour = parseInt(hour%24); 
                        }
                    }
                }

                var result = '';
                result = second<10?("0"+second):second;
                result = (minute<10?("0"+minute):minute)+':'+result;
                result = (hour<10?("0"+hour):hour)+':'+result;
                result = day>0?(day+'天 '+result):result;
                return result; 
            },
            diffTime() {
                this.timeout = setTimeout(()=>{
                    let count = 0;
                    this.list.forEach((item,index)=>{
                        if (item.isexpire==0&&item.shareuserstatus==1) {
                            count++;
                            item.expire--;
                            if (item.expire<=0) {
                                item.isexpire=1;
                            }
                        }
                    });
                    if (count>0) {
                        this.diffTime();
                    }else{
                        clearTimeout(this.timeout);
                    }
                },1000);
            }
        },
        created() {
            getjoinacttips().then(res => {
                if (res.result.code == 200) {
                    if (res.data.length > 0) {
                    this.tip = res.data[0];
                    this.scrollTop = '98px'
                    }
                } else {
                    app.toast("error", res.result.msg);
                }
            });
            this.imgLoading();
            app.event.on('appActive', (e, args) => {
        		let diff = args.diffTime;
        		this.list.forEach((item,index)=>{
	                if (item.isexpire==0&&item.shareuserstatus==1) {
	                    item.expire -= diff;
	                    if (item.expire<=0) {
	                        item.isexpire=1;
	                    }
	                }
	            });
        	})
        },
        beforeDestroy() {
			app.event.off('appActive');
		},
        components: {
            ActionsheetsActivity
        }
    };
</script>