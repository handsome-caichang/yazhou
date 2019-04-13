<!--作业点评选择模板-->
<style lang="scss">
    
    

    .evaluation-template {
        @include position-absolute(0, 0, 0, 0);
        overflow: hidden;
        background-color: $color-white;
        .header {
            height: 44px;
            padding: 8px 12px;
            font-size: 13px;
            .search {
                border-radius: 28px;
                border: 1px solid $color-assist-1;
                color: $color-6;
                @include flex-center;
                input {
                    flex: 1;
                    margin: 0;
                    padding: 0;
                    border: none;
                    box-shadow: none;
                    height: 28px;
                    line-height: 28px;
                    padding-left: 17px;
                    border-radius: 28px;
                    color: #333;
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;

                }
                .search-btn {
                    width: 49px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    background-color: $color-assist-1;
                    border-radius: 50px;
                }
            }
        }
        .void {
            height: 9px;
            background-color: $color-assist-1;
        }
        .as-body {
            @include position-absolute(53px, 0, 49px, 0);
            clear: both;
            ul {
                margin: 0;
                padding: 0;
            }
            .title-area {
                float: left;
                width: 27%;
                color: $color-9;
                .title-scroller {
                    @include position-absolute(0, 73%, 0, 0);
                    overflow: hidden;
                    background-color: #fbfbfd;
                }
                .title-list {
                    border-left: 5px solid transparent;
                    background-color: #fbfbfd;
                    list-style: none;
                    font-size: 15px;
                    /*padding: 10px 6px 10px 7px;*/
                    padding-left: 7px;
                    padding-right: 6px;
                    height: 44px;
                    line-height: 44px;
                    /*line-height: 200%;*/
                    @include border-bottom;
                    @include ellipsis-single;
                    &.active {
                        border-left: 5px solid $color-primary;
                        background-color: $color-white;
                    }
                }
            }
            .con-area {
                float: right;
                width: 73%;
                .con-scroller {
                    @include position-absolute(0, 0, 0, 27%);
                    overflow: hidden;
                }
            }
        }
        .as-body-query {
            .con-query-scroller {
                @include position-absolute(53px, 0, 49px, 0);
                overflow: hidden;
            }
        }
        .con-list {
            position: relative;
            list-style: none;
            padding: 12px 12px 12px 38px;
            .title {
                font-size: 15px;
                color: $color-6;
                /*max-width: 89%;*/
                margin-bottom: 8px;
                margin-right: 22px;
                @include ellipsis-single;
            }
            .con {
                font-size: 12px;
                color: $color-9;
                &.more {
                    @include ellipsis-multi;
                }
            }
            .ic-select {
                position: absolute;
                top: 13px;
                left: 12px;
                font-size: 18px;
            }
            .ic-more {
                position: absolute;
                width: 22px;
                height: 20px;
                top: 13px;
                right: 12px;
                text-align: right;
            }
        }
        .footer {
            height: 49px;
            line-height: 49px;
            font-size: 16px;
            color: $color-white;
            background-color: $color-primary;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }
        .noData-temp {
            @include position-absolute;
            background-color: $color-white;
        }
    }

    // 动画
    .as-evaluation-template-enter-active, .as-evaluation-template-leave-active {
        transition: all $duration $timing;
        transform: translate3d(0, 0, 0);
    }

    .as-evaluation-template-enter, .as-evaluation-template-leave-active {
        transition: all $duration $timing;
        transform: translate3d(100%, 0, 0);
    }

</style>

<template>
    <transition name="as-evaluation-template">
        <div class="evaluation-template" v-show="opened" :data="stateData">
            <!--搜索-->
            <div class="header">
                <div class="search">
                    <input v-model="searchText" type="text" placeholder="输入评价模板">
                    <span class="search-btn" @click="search(searchWord)">搜索</span>
                </div>
            </div>
            <div class="void"></div>
            <!--搜索列表-->
            <div v-if="isSearching" class="as-body-query">
                <scroller-base class="con-query-scroller" :data="queryScroll">
                    <div class="con-list " v-for="(item,index) in queryList" @click="selectCon(item,index)">
                        <div class="title">{{item.name}}</div>
                        <div class="con" :class="{more:item.moreFlag}">{{item.content}}</div>
                        <div class="ic-select">
                            <svg aria-hidden="true" class="icon">
                                <use :xlink:href="item.checked==true?'#icon-duoxuan':'#icon-duoxuan-weixuanze'">
                                </use>
                            </svg>
                        </div>
                        <div class="ic-more" @click.stop="showFullContent(item)">
                            <svg aria-hidden="true" class="icon">
                                <use :xlink:href="item.moreFlag?'#icon-xiala':'#icon-shangla'">
                                </use>
                            </svg>
                        </div>
                    </div>
                    <empty-page class="noData-temp" v-if="queryList.length == 0" :type="1001"></empty-page>
                </scroller-base>
            </div>
            <div class="as-body" v-else>
                <empty-page class="noData-temp" :type="1001" v-if="temTitleList.length == 0"></empty-page>
                <!--标题(类)-->
                <div class="title-area">
                    <scroller-base class="title-scroller" :data="titleScroll">
                        <div class="title-list"
                             v-for="(item,index) in temTitleList"
                             :class="{active: titleIndex === index}"
                             @click="selectTitle(index,item.id)">
                            {{item.name}}
                        </div>
                    </scroller-base>
                </div>
                <!--模板内容-->
                <div class="con-area">
                    <scroller-base class="con-scroller" :data="conScroll" ref="conScroller">
                        <div class="con-list" v-for="(item,index) in temConList" @click="selectCon(item,index)">
                            <div class="title">{{item.name}}</div>
                            <div class="con" :class="{more:item.moreFlag}">{{item.content}}</div>
                            <div class="ic-select">
                                <svg aria-hidden="true" class="icon">
                                    <use :xlink:href="item.checked==true?'#icon-duoxuan':'#icon-duoxuan-weixuanze'">
                                    </use>
                                </svg>
                            </div>
                            <div class="ic-more" @click.stop="showFullContent(item)">
                                <svg aria-hidden="true" class="icon">
                                    <use :xlink:href="item.moreFlag?'#icon-xiala':'#icon-shangla'">
                                    </use>
                                </svg>
                            </div>
                        </div>
                        <empty-page class="noData-temp" v-if="temConList.length == 0" :type="1001"></empty-page>
                    </scroller-base>
                </div>
            </div>
            <!--确定提交-->
            <div class="footer" @click="submit">确定</div>
            <!--加载中-->
            <loading class="loading" v-show="isLoading"></loading>
            <!--加载出错-->
            <empty-page class="noData-temp" v-if="ajaxErr" :type="1001"></empty-page>
        </div>
    </transition>
</template>

<script>
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'

    export default {
        name: 'evaluation-template',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            goalType: {
                type: Number,
                default: 0
            },
            temOptions: {
                // 评价模板‘类’的方法
                apiTemTitle: {
                    type: Function,
                    default: null
                },
                // 评价模板 ‘内容’的方法
                apiTemCon: {
                    type: Function,
                    default: null
                },
                // 评价模板 ‘搜索’的方法
                apiTemQuery: {
                    type: Function,
                    default: null
                },
                params: {
                    type: Object,
                    default: null
                }
            }
        },
        data() {
            return {
                ajaxErr: false,
                isLoading: true,
                isSearching: false,
                temTitleList: [],//标题模板列表
                temConList: [],//内容模板列表
                queryList: [],//搜索之后的内容模板列表[搜索相关]
                searchText: '',//搜索关键字[搜索相关]
                query: '',//搜索所需的参数[搜索相关]
                queryCon: null,//搜索结果 选择列表[搜索相关]
                curClassId: null, //记录当前评价模板的id号
                titleIndex: 0, //记录当前评价模板标题（类）的位置
                matchIndex: null, //辅助字段 保存匹配的标题和对应的内容的位置{‘titleIndex’:[index1,index2..],...}
                matchCon: null //辅助字段 保存匹配的标题和对应的内容的位置{‘titleIndex’:[content1,content2..],...}
            }
        },
        computed: {
            conScroll() {
                return {
                    temConList: this.temConList
                }
            },
            titleScroll() {
                return {
                    temTitleList: this.temTitleList
                }
            },
            queryScroll() {
                return {
                    queryList: this.queryList
                }
            },
            searchWord() {
                return app.tool.trim(this.searchText)
            },
            stateData() {
                return {
                    opened: this.opened
                }
            }
        },
        methods: {
            // 获取类别
            _getTemTitle() {
                this.temOptions.apiTemTitle({
                    "type": this.goalType//0表示点评模板 1表示作业模板
                    // "isChildren": 0,
                    // "PageIndex": 1,
                    // "PageSize": 999
                }).then(res => {
                    this.ajaxErr = false;
                    if (res.result.code == app.errok) {
                        if (res.data.length < 1) {
                            this.isLoading = false;
                            this.ajaxErr = true;
                            return
                        }
                        this.temTitleList = res.data;
                        this.curClassId = res.data[0].id;
                        this.matchIndex = new Object();
                        this.matchCon = new Object();
                        this._getTemContent(this.curClassId);
                    } else {
                        app.toast('error', res.ErrorMsg);
                        this.isLoading = false;
                        this.ajaxErr = true;
                    }
                })
            },
            // 获取类别下的描述
            _getTemContent(id) {
                this.temOptions.apiTemCon({
                    "type": this.goalType,//0表示点评模板 1表示作业模板
                    // "isChildren": 1,
                    "parentid": id,
                    // "PageIndex": 1,
                    // "PageSize": 999
                }).then(res => {
                    this.isLoading = false;
                    //回显选择
                    if (app.tool.isEmptyObject(this.matchIndex)) {
                        res.data.forEach(item => {
                            item.checked = false;
                            item.moreFlag = true;
                        })
                    } else {
                        res.data.forEach((item, index) => {
                            if (this.matchIndex[this.titleIndex]) {
                                item.checked = this.matchIndex[this.titleIndex].indexOf(index) == -1 ? false : true;
                            } else {
                                item.checked = false;
                            }
                            item.moreFlag = true;
                        })
                    }
                    // 当下模板内容列表赋值
                    this.temConList = res.data;
                    // 模板内容滚动条置顶
                    this.$refs.conScroller && this.$refs.conScroller.scroller.scrollTo(0, 0);
                })
            },
            // 搜索
            _getEvalutionTemConQuery(query) {
                this.temOptions.apiTemQuery({
                    "type": 0,
                    "query": query
                }).then(res => {
                    this.isLoading = false;//加载中
                    res.data.forEach(item => {
                        item.checked = false;
                        item.moreFlag = true;
                    })
                    this.queryList = res.data;
                    this.queryCon = new Array(this.queryList.length);
                })
            },
            // 选择类别
            selectTitle(index, id) {
                this.titleIndex = index;
                this._getTemContent(id)
            },
            // 选择内容
            selectCon(item, index) {
                if (this.isSearching) {//搜索页面
                    this.queryList[index].checked = !this.queryList[index].checked;
                    if (item.checked == false) {//取消勾选
                        this.queryCon[index] = '';
                    } else {
                        this.queryCon[index] = item.content;
                    }

                } else {//选择页面
                    // index:模板内容的第 几 个模板;控制选择按钮
                    this.temConList[index].checked = !this.temConList[index].checked;
                    //判断是勾选还是取消勾选
                    //判断有没有obj[xxx]
                    if (item.checked == false) {//取消勾选
                        let posIndex = this.matchIndex[this.titleIndex].indexOf(index);
                        this.matchIndex[this.titleIndex].splice(posIndex, 1);
                        this.matchCon[this.titleIndex].splice(posIndex, 1);
                    } else {//勾选
                        //如果没有 obj[xxx]
                        if (!this.matchIndex[this.titleIndex]) {
                            this.matchIndex[this.titleIndex] = [index];
                            this.matchCon[this.titleIndex] = [item.content];
                        } else {
                            this.matchIndex[this.titleIndex].push(index);
                            this.matchCon[this.titleIndex].push(item.content);
                        }
                    }
                }

            },
            // 查看全部内容
            showFullContent(item) {
                item.moreFlag = !item.moreFlag;
            },

            search(query) {
                this.isLoading = true;
                if (query) {
                    this.isSearching = true;
                    this._getEvalutionTemConQuery(query)
                    this.temTitleList = [];//标题模板列表
                    this.temConList = [];//内容模板列表
                    this.curClassId = null; //记录当前评价模板的id号
                    this.titleIndex = 0; //记录当前评价模板标题（类）的位置
                    this.matchIndex = null; //辅助字段 保存匹配的标题和对应的内容的位置{‘titleIndex’:[index1,index2..],...}
                    this.matchCon = null;//辅助字段 保存匹配的标题和对应的内容的位置{‘titleIndex’:[content1,content2..],...}
                } else {
                    this._getTemTitle();
                    this.isSearching = false;
                    this.queryList = [];//搜索之后的内容模板列表[搜索相关]
                    this.searchText = '';//搜索关键字[搜索相关]
                    this.query = '';//搜索所需的参数[搜索相关]
                    this.queryCon = null;//搜索结果 选择列表[搜索相关]
                }


            },

            submit() {
                let _html = '';
                if (this.isSearching) {//搜索界面点‘确定’
                    this.queryCon.forEach(con => {
                        let str = app.tool.trim(con);
                        let reg = /[！，。!,.]/;
                        _html += str;
                        if (!reg.test(str)) {
                            _html += "。";
                        }
                    })
                } else {
                    for (let k in this.matchCon) {
                        this.matchCon[k].forEach(con => {
                            let str = app.tool.trim(con);
                            let reg = /[！，。!,.]/;
                            _html += str;
                            if (!reg.test(str)) {
                                _html += "。";
                            }
                        })
                    }
                }
                this.$emit('eva-tem', _html);
                this.close();
                this.isSearching = false;
            }
        },
        components: {
            EmptyPage
        },
        watch: {
            opened: function () {
                this.titleIndex = 0;//模板标题的高亮初始
                if (this.opened) {
                    this.query = '';
                    this._getTemTitle();
                }
            }
        }
    }
</script>