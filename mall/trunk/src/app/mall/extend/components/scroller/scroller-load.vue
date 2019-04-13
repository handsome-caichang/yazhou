<!-- iscroll 滚动组件 -->
<style lang="scss" scoped>
    
    .scroller-load-bar-interface {
        width: 100%;
        background-color: $color-assist-1;
        .load-bar-default {
            height: $h-2;
            line-height: $h-2;
            text-align: center;
            font-size: 14px;
            color: #666;
            .load-icon {
                width: 22px;
                height: 22px;
                vertical-align: middle;
                margin-right: 6px;
            }
            .loading-text {
                vertical-align: middle;
            }
        }
    }
    
</style>
<template>
    <scroller-base ref="baseScrollerVue" :data="data" :options="options">
        <slot></slot>

        <!-- 加载展示栏 -->
        <div class="scroller-load-bar-interface" 
            :slot="slotName"
            v-show="paging.hasData&&enable"
            ref='loadBar'>
                <slot name="loadBar">
                    <div class="load-bar-default">
                        <!-- <img class="load-icon" :src="paging.loadBar.img"> -->
                        <img class="load-icon" src="./img/loading-small.gif">
                        <span class="load-text">加载中...</span>
                    </div>
                </slot>
        </div>
    </scroller-base>
</template>
<script>
    export default {
        name: 'scroller-load',
        props: {
            data: {
                default: null
            },
            // 开启何种分页模式, 1:上拉加载, 2: 下拉加载;
            type: {
                type: Number,
                default: 1
             },
            // 参照'pagingDefault'传参
            pagingOption: {
                type: Object
            },
            enable: { //处理首次不加载
                type: Boolean,
                default: true
            },
            options:{
                type: Object
            },
        },
        data() {
            return {
                // 用于取消正在请求数据的ajax
                cancelHttp: null,
                // 用于保存'baseScroller'滚动条实例
                scroller: null,
                // 分页默认配置项
                pagingDefault: {
                    // 获取数据的API接口
                    api: null,
                    // 请求分页数据需要的查询参数,不包括页码信息,对象类型
                    params: null,
                    // 分页刷新模式, 'replace'用新参数替换原参数, 'push'新参数追加覆盖原参数
                    model: 'push',
                    // 是否自动获取第一页数据
                    autoLoadFirst: true,
                    // 设置距离底部多少距离时触发'upload'事件,默认值为50,数字类型
                    threshold: 50,
                    // 页码配置信息
                    pageOpt: {
                        indexKey: 'pageindex', //分页初始页码的'key'、'value'
                        indexVal: 1,
                        sizeKey: 'pagesize', //每页请求数据长度的'key'、'value'
                        sizeVal: 30,
                        countKey: 'totalpage' //后端返回的总页数'key'
                    },
                    // 页码信息对象
                    page: {},
                    // paging的状态，是否正在请求数据
                    isLoading: false,
                    // 是否还有数据可以拉取,显示或隐藏分页状态条
                    hasData: false,
                    // 判断是否还有分页数据的钩子,必需返回一个值;
                    hasDataHook: function (res) {
                        let errorcode = res.result.code;
                        if (errorcode === app.errok) {
                            let pageindex = res.page.pageindex;
                            return pageindex < res.page[this.pageOpt.countKey];
                        }
                        return true;
                    }
                },
                paging: {},
                pageIndexKey: '',
                initedIndex: 0,
                // isEnable: this.enable
            }
        },
        computed: {
            slotName() {
                return this.type === 1 ? 'bottom' : 'top';
            }
        },
        methods: {
            // 获取加载更多栏的高度
            _getLoadBarHeight(){
                this.loadBarHeight = this.$refs.loadBar.offsetHeight;
            },
            // 初始化分页'paging'实例
            __initPaging() {
                // 页码配置信息, 这样的话外部可以只传部分参数;
                var pageOpt = Object.assign({},this.pagingDefault.pageOpt, this.pagingOption.pageOpt); //避免
                this.paging = Object.assign({}, this.pagingDefault, this.pagingOption);
                this.paging.pageOpt = pageOpt;

                this.pageIndexKey = this.paging.pageOpt.indexKey;
                this.initedIndex = this.paging.pageOpt.indexVal;
                this.paging.page[this.pageIndexKey] = this.initedIndex;
                this.paging.page[this.paging.pageOpt.sizeKey] = this.paging.pageOpt.sizeVal;
                this.paging.page['sortfield'] = this.paging.pageOpt.sortfield;
                this.paging.page['isdesc'] = this.paging.pageOpt.isdesc;
            },
            _initPaging() {
                this.__initPaging()
                // 拉取第一页数据,并触发相应事件,把请求数据的promise对象做为事件参数传递出去
                if (this.paging.autoLoadFirst) {
                    this.pagingLoad();
                }
            },
            pagingLoad() {
                // this.isEnable = true;
                
                // 如果正在请求数据
                if (this.paging.isLoading) {
                    // 如果不是刷新分页操作,直接return;
                    if (this.paging.page[this.pageIndexKey] > this.initedIndex) return;

                    // 如果正在请求数据时,忽然进行刷新分页操作,则取消之前的数据请求;
                    if (this.paging.page[this.pageIndexKey] === this.initedIndex) {
                        this.cancelHttp("操作被用户取消");
                    }
                }

                if (this.paging.page[this.pageIndexKey] === this.initedIndex || this.paging.hasData) {
                    // 将paging实例的状态置为正在请求数据, 避免在上一次分页请求还未加载完成时重复加载多次, 
                    this.paging.isLoading = true;
                    // let ajax = this.paging.api(Object.assign({}, this.paging.params, this.paging.page));
                    let ajax = this.paging.api(Object.assign({}, this.paging.params, {page: this.paging.page}));
                    this.cancelHttp = ajax.cancel;
                    let promise = ajax.then(res => {
                            let errorcode = res.result.code;
                            // let errorcode = res.ErrorCode||res.errcode;
                            if (errorcode === app.errok) {
                                this.paging.page[this.pageIndexKey] += 1;

                                this.paging.isLoading = false;

                                // 刷新分页状态条, 通过判断是否还有分页数据来显示或隐藏分页状态条;
                                this.paging.hasData = this.paging.hasDataHook(res);
                            }
                            return res;
                        })

                    // 触发'loadData'事件,把请求数据的promise对象做为事件参数传递出去
                    this.$emit('loadData', promise);
                    this.paging.page[this.pageIndexKey] === this.initedIndex && this.$emit('loadFirst', promise);

                    return promise;
                }
            },
            // 分页刷新操作, 即重新开始从第一页开始请求数据; 外部需要自己清空列表数据;
            pagingRefresh(params) {
                if (this.paging.model === 'push') {
                    params && params.params && Object.assign(this.paging.params, params.params);
                    params && params.pageOpt && (this.paging.page['sortfield'] = this.paging.pageOpt.sortfield);
                    params && params.pageOpt && (this.paging.page['isdesc'] = this.paging.pageOpt.isdesc);
                    params && !params.params && !params.pageOpt && Object.assign(this.paging.params, params);
                } else if (this.paging.model === 'replace') {
                    params && params.params && (this.paging.params = params.params);
                    params && params.pageOpt && (this.paging.page['sortfield'] = this.paging.pageOpt.sortfield);
                    params && params.pageOpt && (this.paging.page['isdesc'] = this.paging.pageOpt.isdesc);
                    params && !params.params && !params.pageOpt && (this.paging.params = params);
                }

                this.paging.page[this.pageIndexKey] = this.initedIndex;
                this.paging.page[this.paging.pageOpt.sizeKey] = this.paging.pageOpt.sizeVal;
                this.paging.hasData = false;
                

                let promise = this.pagingLoad();

                // 刷新时让滚动条重新滚动到顶部
                promise.then(res => {
                    this.scroller.scrollTo(0, 0);
                })

                return promise;
            },
            // 当api发生变化时，调用本方法刷新
            transPaging() {
                this.$nextTick(() => {
                    this.__initPaging();
                    return this.pagingLoad();
                })
            }
        },
        mounted() {
            this._initPaging();
            let s = this.scroller = this.$refs.baseScrollerVue.scroller;
            s.on('scrollEnd', () => {
                if(!this.enable) return;
                // 可滚动的内容区域高度是否大于滚动容器高度
                this._getLoadBarHeight();
                let boolean1 = s.scrollerHeight - s.wrapperHeight > this.loadBarHeight;

                // 是否滚动到可以'加载新数据'的位置
                let boolean2 = s.scrollerHeight - s.wrapperHeight + s.y < this.paging.threshold + this.loadBarHeight;

                // 滚动到合适的位置时'加载新数据' 
                if (boolean1 && boolean2) {
                    this.pagingLoad();
                }
            });
        }
    };
</script>
