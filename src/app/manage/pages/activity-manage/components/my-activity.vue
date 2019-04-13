<!-- 我的活动 -->
<style lang="scss" scoped>
    .activity-manage {
        @include position-absolute(0, 0, 49px, 0);
        .scroller{
            @include position-absolute;
            overflow: hidden;
            background-color: #F7F8FA;
        }
        // .loading{
        //     top: 45px !important;
        // }
        .noData_temp {
            @include position-absolute;
        }
        .void {
            height: 12px;
        }
        .card-box {
            .card {
                position: relative;
                margin: 12px;
                border-radius: 10px;
                background-color: #fff;
                box-shadow:0px 4px 8px 0px rgba(79,94,163,0.14);
                .card-header {
                    color: #333;
                    height: 45px;
                    padding: 0 8px;
                    font-size: 16px;
                    @include flex-between;
                    .title {
                        display: inline-block;
                        max-width: 80%;
                        @include ellipsis-single;
                        .img {
                            width: 41px;
                            height: 18px;
                            margin-right: 8px;
                            vertical-align: text-bottom;
                            margin-bottom: 3px;
                        }
                        svg {
                            width: 41px;
                            height: 18px;
                            margin-right: 8px;
                        }
                    }
                    .person {
                        margin-right: 12px;
                        font-size: 13px;
                        svg {
                            margin-right: 4px;
                            color: #AAAAAA;
                        }
                    }
                }
                .card-body {
                    .card-body-box {
                        position: relative;
                        padding: 0 8px 0 90px;
                        min-height: 70px;
                        .card-body-l{
                            position: absolute;
                            left: 8px;
                            width: 70px;
                            height: 70px;
                            margin-right: 12px;
                            // padding-top: 100%;
                            @include background-img(false,cover);
                            background-color: #F7F8FA;
                        }
                        .card-body-r{
                            color: #999;
                            font-size: 13px;
                            line-height: 1;
                            .price-box {
                                font-size: 12px;
                                display: flex;
                                align-items: center;
                                margin-bottom: 12px;
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
                            .time{
                                margin-bottom: 8px;
                            }
                        }
                    }
                    .card-body-btns{
                        @include flex-center;
                        line-height: 20px;
                        margin-top: 8px;
                        .card-body-btn{
                            flex: 1;
                            margin: 6px 0;
                            font-size: 12px;
                            text-align: center;
                            &:first-child{
                                border-right: 1px solid rgb(244, 244, 245);
                                .person {
                                    font-size: 15px;
                                    color: #333;
                                }
                            }
                            &:last-child{
                                .person {
                                    font-size: 15px;
                                    color: #FE5C00;
                                }
                            }
                        }
                    }
                }
                .card-footer {
                    border-top: 1px solid rgb(244, 244, 245);
                    @include flex-between;
                    padding: 12px 4px 12px;
                    .btn {
                        display: inline-block;
                        padding: 0 16px;
                        margin-left: 8px;
                        height: 28px;
                        line-height: 28px;
                        font-size: 12px;
                        color: #666666;
                        border-radius: 14px;
                        border: 1px solid #CCCCCC;
                        &.orange{
                            border: 1px solid #FE5C00;
                            color: #FE5C00;
                        }
                    }
                    svg {
                        width: 16px;
                        height: 16px;
                        margin-right: 16px;
                    }
                }
                .ac-status {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 62px;
                    height: 62px;
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
        }
        .void-split {
            height: 12px;
        }
        .time-split {
            height: 45px;
            line-height: 45px;
            text-align: center;
        }
        .empty {
            padding: 0 12px;
            font-size: 16px;
            text-align: center;
            background-color: #fff;
            @include position-absolute;
            .empty-img {
                width: 111px;
                height: 115px;
                margin: 28px auto 25px auto;
                @include background-img(false,cover);
            }
            .empty-desc {
                color: #999;
            }
            .empty-btn {
                margin: 32px auto 12px auto;
                width: 260px;
                height: 44px;
                line-height: 44px;
                border-radius: 22px;
                color: #fff;
                background-color: #FF8B02;
            }
            .empty-tips {
                color: #CCCCCC;
                font-size: 12px;
            }
            .empty-adv {
                position: absolute;
                bottom: 24px;
                left: 12px;
                right: 12px;
                height: 0;
                padding-top: 34%;
                @include background-img(false,cover);
            }
        }
    }
</style>

<template>
    <div class="activity-manage">
        <scroller-super class="scroller"
            :type="2" 
            :data="list" 
            :pagingOption="pagingOption" 
            @loadData="loadData" 
            ref="pagingScroller">
            <div class="card-box" v-for="(item,index) in list" :key="index">
                <div class="card">
                    <div class="card-header">
                        <span class="title">
                            <img class="img" :src="item.activitytype==1?pingtuan:item.activitytype==2?kanjia:weichuandan">
                            {{item.title}}
                        </span>
                    </div>
                    <div class="card-body">
                        <div class="card-body-box" @click="preview(item)">
                            <div class="card-body-l" :style="'background-image:url('+item.imageurl+')'"></div>
                            <div class="card-body-r">
                                <div class="price-box" v-if="item.activitytype != 3">活动价：&emsp;&nbsp;
                                    <span class="price"><span style="font-size:12px;">&yen;</span>{{item.activitytype==1?item.actinsconfiggroup.groupprice:item.actinsconfigbargain.floorprice}}</span>
                                    <p class="xiahua">&yen; {{item.activitytype==1?item.actinsconfiggroup.originalprice:item.actinsconfigbargain.originalprice}}</p>
                                </div>
                                <div class="time">发布时间：&nbsp;{{item.createtime}}</div>
                                <div>结束时间：&nbsp;{{item.expiretime}}</div>
                            </div>
                        </div>
                        <div class="card-body-btns">
                            <div class="card-body-btn">浏览：<span class="person">{{item.actinsrecruitcount.visitcount}}</span>人</div>
                            <div class="card-body-btn" @click="gotoEntryList(item)">报名：<span class="person">{{item.actinsrecruitcount.enterusercount}}</span>人</div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div>
                            <span class="btn" @click="editActivity(item)">编辑</span>
                            <span class="btn orange" @click="goShard(item,'poster')">海报</span>
                            <span class="btn orange" @click="goShard(item,'share')">去招生</span>
                        </div>
                        <div>
                            <svg class="icon" aria-hidden="true" @click="deleteActivity(item)">
                                <use xlink:href="#iconshanchu"></use>
                            </svg>
                        </div>
                    </div>
                    <svg class="icon ac-status" aria-hidden="true" v-if="item.isexpire==1">
                        <use xlink:href="#iconyijieshu"></use>
                    </svg>
                    <span v-else>
                        <svg class="icon ac-status" aria-hidden="true" v-if="item.isfull==1">
                            <use xlink:href="#iconyishouqing"></use>
                        </svg>
                        <span class="ac-status pic" v-else :style="'backgroundImage:url('+ongoingImg+')'"></span>
                    </span>
                </div>
            </div>
            <div class="void"></div>
        </scroller-super>
        <div class="empty" v-if="list.length === 0">
            <svg class="icon empty-img" aria-hidden="true">
                <use xlink:href="#iconkong"></use>
            </svg>
            <div class="empty-desc">此处空空如也，发布一个活动试试～</div>
            <div class="empty-btn" @click="togoHome">我要招生</div>
            <div class="empty-tips">轻松招生，丰富的招生活动，一键免费发布</div>
            <div class="empty-adv" :style="'background-image:url('+img+')'" @click="$router.push('/wonderfulmethod')"></div>
        </div>
        <!-- 跳转使用 -->
        <a v-show="false" ref="target" class="target" :href="href" target="_blank"></a>
        <!-- 加载中... -->
        <loading class="loading" v-show="isLoading" :type="1"></loading>
    </div>
</template>

<script>
    import {getactinspagelist,opactins,addactivityshare} from 'manage/api/common.js';
    import kanjia from '../img/kanjia.png';
    import pingtuan from '../img/pingtuan.png';
    import weichuandan from '../img/weichuandan.png';
    export default {
        name:'my-activity',
        data() {
            return {
                isLoading: false,
                list: [],
                kanjia:kanjia,
                pingtuan:pingtuan,
                weichuandan:weichuandan,
                flag: '',
                img: require("../img/intro-banner.png"),
                ongoingImg: require("../img/status-ongoing.png"),
                pagingOption: {
					api: getactinspagelist,
					params: {
                        query: {
                            activityinstanceidlist: [], //活动实例id，字符串数组，后端转成long处理。	
                            createuseridlist: [], //创建者userid，字符串数组，后端转成long处理。
                            statuslist: [1], //状态id，-1已删除，0停用/失效，1正常/启用	
                            keyword: '' //查询关键词（名称、标题）
                        }
					},
					pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'pageindex',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'pagesize',
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: 'totalpage'
                    }
                },
                href: ''
            }
        },
        methods: {
            togoHome() {
                this.$router.replace('/home/0')
            },
            preview(item) {
                this.$router.push({
                    path: `/templateDetail/${item.actstyid}`,
                    query: { type: "managepreview", templateid: item.acttmpid, id: item.id}
                });
            },
            goShard(item,t) {
                if (window.__wxjs_environment === 'miniprogram'){
                    addactivityshare({
                        id: item.id,
                        type: 1 //1 管理端 2 用户端
                    }).then(res => {
                        if (res.result.code == 200) { //跳转到小程序原生界面
                            let styleStr = 'styleid='+ encodeURIComponent(item.actstyid),
                                shareidStr = 'shareid='+ encodeURIComponent(res.id),
                                idStr = 'id='+ encodeURIComponent(item.id),
                                activitytypeStr = 'activitytype='+encodeURIComponent(item.activitytype),
                                templateStr = 'templateid='+encodeURIComponent(item.acttmpid);

                            if(t == 'poster'){ //海报
                                wx.miniProgram.navigateTo({
                                    url:`/pages/poster/poster?${styleStr}&${shareidStr}&${idStr}&${activitytypeStr}&${templateStr}`,
                                    success: function(){},
                                    fail: function(){
                                        app.alert('跳转失败，请刷新页面重试。');            
                                    }
                                });
                            }else if(t == 'share'){ //去招生
                                let styleStr = 'styleid='+ encodeURIComponent(item.actstyid),
                                    shareidStr = 'shareid='+ encodeURIComponent(res.id),
                                    idStr = 'id='+ encodeURIComponent(item.id),
                                    activitytypeStr = 'activitytype='+encodeURIComponent(item.activitytype),
                                    templateStr = 'templateid='+encodeURIComponent(item.acttmpid);
                                wx.miniProgram.navigateTo({
                                    url:`/pages/share/share?${styleStr}&${shareidStr}&${idStr}&${activitytypeStr}&${templateStr}`,
                                    success: function(){},
                                    fail: function(){
                                        app.alert('跳转失败，请刷新页面重试。');            
                                    }
                                });
                            }
                        }else {
                            app.toast('error',res.result.msg);
                        }
                    })
                }
            },
            editActivity(prop) { //编辑活动
				this.$router.push({path: `/templateEdit/${prop.actstyid}`,query: {type: 'edit', templateid: prop.acttmpid, id: prop.id}}); // id = 实例id
            },
            deleteActivity(prop) { //删除活动
                app.confirm({
                    title: '',
                    text: '是否删除此活动？',
                    textStyle: {
                        'text-align': 'center',
                        'color': '#030303',
                        'font-size': '16px',
                        'padding': '20px 0 30px 0'
                    }
                }).then(res => {
                    if (res === true) {
                        opactins({
                            optype: 3, //操作类型（0未知，1新增，2修改，3删除）	
                            ids: [prop.id] //要删除的活动实例Id集合	
                        }).then(res=> {
                            if(res.result.code == app.errok) {
                                this.$refs.pagingScroller.refresh(this.pagingOption.params);
                            }else {
                                app.toast(res.result.msg);
                            }
                        })
                    }
                });
            },
            gotoEntryList(prop) { //指定活动报名名单
                this.$router.push(`/activityEntryList/${prop.id}`);
            },
            compareDate(curTime) {
                let fmt = "yyyy-MM-dd",
                    today = app.filters.formatDatetime(new Date(),fmt),
                    arr = today.split("-"),
                    year = arr[0],
                    month = Number(arr[1]) - 1,
                    day = Number(arr[2]),
                    week = Number((new Date(today)).getDay());
                
                week = week == 0 ? 7 : week;
                let thisWeek = [new Date(year, month, day - week ,0,0,0),new Date(year, month, day + 6 - week,24,0,0)];
                let preWeek = [new Date(year, month, day - week - 7,0, 0, 0) , new Date(year, month, day - week - 1, 24,0,0)]
                let curTimeArr = curTime.split(' '),
                    curDateArr = curTimeArr[0].split('-'),
                    curHourArr = curTimeArr[1].split(':'),
                    current = new Date(curDateArr[0],curDateArr[1],curDateArr[2],curHourArr[0],curHourArr[1],curHourArr[2]);
                let a = current.getDate(),b = thisWeek[0].getDate(), c = thisWeek[1].getDate();
                if(a >= b && a <=  c){
                    return '本周';
                }else if(a >= preWeek[0].getDate() && a <= preWeek[1].getDate()){
                    return '上周';
                }else if(a < preWeek[0].getDate()){
                    return '更早';
                }
            },
            loadData(ajaxPromise) {
                this.isLoading = true;
                ajaxPromise.then(res=> {
                    this.isLoading = false;
					if (res.result.code == app.errok) {
						if (res.page.pageindex === 1) {
							this.list = [];
						}
                        this.list = this.list.concat(res.data);
					}
                })
            },
            refresh() {
                this.$nextTick(() => {
                    this.$refs.pagingScroller.refresh(this.pagingOption.params);
                })
            }
        },
        created () {
            app.event.on('myActiveRefresh', this.refresh);
        },
        destroyed() {
            app.event.off('myActiveRefresh');
        }
    }
</script>