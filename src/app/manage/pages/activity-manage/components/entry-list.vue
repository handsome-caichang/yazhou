<!--报名名单-->
<style lang="scss" scoped>
    .entry-list {
        @include position-absolute(0, 0, 49px, 0);
        .header {
            @include flex-center;
            background-color: #EEF1F6;
            height: 44px;
            line-height: 44px;
            .search-box {
                margin: 0 $edge/2 0 $edge/2 + 2;
                color: $color-3;
                flex: 1;
                .search {
                    padding: 0 12px 0 28px;
                    height: $h-6;
                    line-height: $h-6;
                    border-radius: $h-6;
                    background-color: $color-white;
                    position: relative;
                    width: 100%;
                    input {
                        outline: none;
                        margin-left: 5px;
                    }
                }
                svg {
                    position: absolute;
                    top: 7px;
                    left: 12px;
                }
            }
            .activity-box {
                padding: 0 28px 0 12px;
                height: $h-6;
                line-height: $h-6;
                border-radius: $h-6;
                background-color: $color-white;
                position: relative;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-right: 5px;
                vertical-align: middle;
                min-width: 100px;
                svg {
                    position: absolute;
                    top: 7px;
                    right: 12px;
                }
            }
        }
        .scroller {
            background-color: #F7F8FA;
            overflow: hidden;
            @include position-absolute(44px, 0, 0, 0);
            .card-container {
                // padding-bottom: 20px; 
            }
            .card {
                border-radius: 10px;
                background-color: #fff;
                padding: 15px 85px 15px 70px;
                margin: 12px;
                line-height: 1;
                position: relative;
                min-height: 70px;
                .card-left {
                    position: absolute;
                    left: 20px;
                    top: 15px;
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    background-color: #E1F1F6;
                    @include background-img(false,cover);
                }
                .card-center {
                    font-size: 16px;
                    color: $color-3;
                    .name {
                        @include ellipsis-single;
                    }
                    .tel {
                        display: block;
                        margin-top: 12px;
                        color: $color-9;
                        font-size: 13px;
                    }
                }
                .card-right {
                    position: absolute;
                    right: 20px;
                    top: 0px;
                    bottom: 0px;
                    text-align: right;
                    @include flex-center;
                    color: #999;
                    &.isfollow {
                        color: #FE5C00;
                    }
                    svg {
                        margin-right: 4px;
                        width: 18px;
                        height: 18px;
                    }
                }
            }
        }
        .loading{
            top: 45px !important;
        }
        .empty {
            padding: 0 12px;
            font-size: 16px;
            text-align: center;
            background-color: #fff;
            @include position-absolute(0, 0, 0, 0);
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
            .empty-adv {
                position: absolute;
                bottom: 24px;
                left: 12px;
                right: 12px;
                height: 0;
                padding-top: 34%;
                margin-top: 72px;
                @include background-img(false,cover);
            }
        }
        .as-actionsheets {
            @include position-absolute($h-2, 0, 0, 0);
            z-index: 2;
        }
    }
</style>

<template>
    <div class="entry-list">
        <div class="header">
            <div class="search-box">
                <div class="search">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconsousuoicon"></use>
                    </svg><input placeholder="搜索电话、姓名" v-model="inputVal"/>
                </div>
            </div>
            <div class="activity-box" @click="openActionsheets=true">
                {{activityName}}
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconxiala"></use>
                </svg>
            </div>
        </div>
        <scroller-super class="scroller"
            :type="2" 
            :data="list" 
            :pagingOption="pagingOption" 
            @loadData="loadData" 
            ref="pagingScroller">
            <div class="card-container" :style="{'padding-bottom': list.length == 0 ? '0px' : '20px'}">
                <div class="card" v-for="(item,index) in list" :key="index">
                    <div class="card-left" :style="'background-image:url('+item.avatar+')'"></div>
                    <div class="card-center">
                        <div class="name" style="height: 16px;">{{item.name}}</div>
                        <a class="tel" :href="`tel:${item.phone}`" v-if="item.phone">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icondianhua"></use>
                            </svg>{{item.phone}}
                        </a>
                    </div>
                    <div class="card-right" :class="item.isfollow?'isfollow':''" @click="operateFollow(item)">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.isfollow?'#iconyigenjin':'#iconqugenjin'"></use>
                        </svg>{{item.isfollow?'已跟进':'去跟进'}}
                    </div>
                </div>
                <div class="empty" v-if="list.length === 0">
                    <svg class="icon empty-img" aria-hidden="true">
                        <use xlink:href="#iconkong"></use>
                    </svg>
                    <div class="empty-desc">此处空空如也，要加油哦～</div>
                    <div class="empty-btn" @click="()=>{$router.push(`/home/0`);}">我要分享活动</div>
                    <div class="empty-adv" :style="'background-image:url('+img+')'" @click="$router.push('/wonderfulmethod')"></div>
                </div>
            </div>
        </scroller-super>
        
        <!--加载中... -->
        <loading class="loading" v-show="isLoading" :type="1"></loading>
        <actionsheets-activity
            class="as-actionsheets"
            :opened.sync="openActionsheets"
            @changeActivity="changeActivity"
            :activityList="activityList"
            :list="list"
            :curActivity="pagingOption.params.instanceids"
        ></actionsheets-activity>
    </div>
</template>

<script>
    /*
        TODO：点击我要分享活动，页面跳转到我的活动列表；
     */
    import ActionsheetsActivity from  './actionsheets-activity.vue';
    import {getsignuplist,followshareenter,getactinsbaselist} from 'manage/api/common.js';

    export default {
        name: 'entry-list',
        data() {
            return {
                wxTitle: "报名名单",
                isLoading: false,
                openActionsheets: false,
                list: [],
                inputVal: '',
                activityList: [], //活动集合
                img: require("../img/intro-banner.png"),
                pagingOption: {
					api: getsignuplist,
					params: {
                        instanceids: [], //实例编号(不传为获取全部)
                        keyword: '', //关键字
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
                timeout: ""
            }
        },
        computed: {
            activityName(){
                if(this.pagingOption.params.instanceids.length==0){
                    return '全部活动';
                }else {
                    let name = '';
                    this.activityList.forEach(ac=> {
                        if(ac.id == this.pagingOption.params.instanceids[0]){
                            name = ac.title;
                        }
                    })
                    return name;
                }
            }
        },
        methods: {
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
            operateFollow(users) { //修改跟进状态
                if(users.isfollow==0) {
                    app.confirm({
                        title: '',
                        text: '此名单确定已经联系跟进？',
                        textStyle: {
                            'text-align': 'center',
                            'color': '#030303',
                            'font-size': '16px',
                            'padding': '20px 0 30px 0'
                        }
                    }).then(res => {
                        if (res==true) {
                            this.updateFollow(users.id,1);
                        }
                    });
                }else {
                    this.updateFollow(users.id,0);
                }
            },
            updateFollow(id,type){
                followshareenter({
                    id: id,//报名人员编号
                    type: type//跟进状态 1跟进 0取消	
                }).then(res=> {
                    if(res.result.code == app.errok) {
                        app.toast('success', '修改成功。');
                        this.$refs.pagingScroller.refresh(this.pagingOption.params);
                    }else {
                        app.toast('error', app.result.msg);
                    }
                })
            },
            changeActivity(ac){ //筛选活动
                this.pagingOption.params.instanceids = ac.id? [ac.id]: [];
                this.$refs.pagingScroller.refresh(this.pagingOption.params);
            }
        },
        created() {
            getactinsbaselist({ //获取活动实例基础信息集合（不分页）
                activityinstanceidlist: [], //活动实例id，字符串数组，后端转成long处理。	
                createuseridlist: [], //创建者userid，字符串数组，后端转成long处理。
                statuslist: [1], //状态id，-1已删除，0停用/失效，1正常/启用	
                keyword: '' //查询关键词（名称、标题）
            }).then(res=> {
                this.activityList = res.data||[];
            })
        },
        watch: {
            inputVal(val){
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.pagingOption.params.keyword = val;
                    this.$refs.pagingScroller.refresh(this.pagingOption.params);
                }, 300)
            }
        },
        components: {
            ActionsheetsActivity
        }
    }
</script>