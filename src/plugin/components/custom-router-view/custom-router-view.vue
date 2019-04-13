<!-- 全局引用的样式 -->
<style lang="scss">
    @import 'src/plugin/scss/variable.scss';
    @import 'src/plugin/scss/mixin.scss';

    // 基础样式
    .custom-router-view {
        .custom-router-pages {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
            .custom-router-page {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                &.forward {
                    animation: forward 300ms ease-in-out;
                }
                &.back {
                    animation: back 300ms ease-in-out;
                }
            }
        }
        .root-router-view {
            @include position-absolute;
            z-index: 1;
            display: none;
        }
    }

    // 需要在应用层给一个全局的 custom-router-page 的background-color色
    // .custom-router-page {
    //     background-color: #EDF1F7;
    // }

    @keyframes forward {
        0% {
            transform: translate3d(100%, 0, 0);
        }
        100% {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes back{
        0% {
            transform: translate3d(0%, 0, 0);
        }
        100% {
            transform: translate3d(100%, 0, 0);
        }
    }
</style>

<template>
    <div class='custom-router-view'>
        <!-- 全局路由总线容器 -->
        <router-view class="root-router-view"></router-view>

        <!-- 不使用v-show来配合做动画, 是因为'iscroll'没办法刷新隐藏状态的滚动条 -->
        <div class="custom-router-pages">
            <component 
                class="custom-router-page"
                v-for="(component, key) in allPages"
                v-if="component" 
                :is="component" 
                :class="[key === animPageName ? animClass : '', key]"
                :key="key"
                :ref="key"
            >
            </component>
        </div>
        
    </div>
</template>

<script>
    window.addEventListener('load', function () {
        app.windowIsOnload = true
    })

    export default {
        name: 'App',
        components: {
            // GlobalDomPlugin,
        },
        data() {
            return {
                // 每一页的'z-index'
                zIndex: 1,
                // 路由切换时的动画类型
                animClass: "",
                // 发生路由转换时, 需要做动画的页面
                animPageName: "",
                // 路由目标页
                toName: "",
                // 路由原始页
                fromName: "",
                // 缓存拉取过来的可以路由的页面组件
                pageCaches: {},
                // 用于保存当前拉取过来的可以路由的组件(可以理解为一个page页组件类的集合); 示例如下：
                singlePages: {
                    // 'home': null,
                },
                morePages: {
                    /*details: {
                        component: null,
                        pageSum: 0,
                        pageArr: [],
                        max: 2
                    }*/
                },
            }
        },
        computed: {
            toPage() {
                return this.toName ? this.$refs[this.toName][0].$el : '';
            },
            fromPage() {
                return this.fromName ? this.$refs[this.fromName][0].$el : '';
            },
            allPages() {
                let mpages = {}, key; 
                for (key in this.morePages) {
                    this.morePages[key].pageArr.forEach(pobj => {
                        mpages[pobj.pageKey] = pobj.component;
                    })
                }
                return {
                    ...this.singlePages,
                    ...mpages
                }
            }
        },
        methods: {
            // 修改应用的title
            setTitle(pageInstance) {
                let title = pageInstance && pageInstance.wxTitle;
                // app.tool.setDocTitle(title || '师生信');
                app.tool.setDocTitle(title || app.defaultTitle);
            },
            pageHandle() {
                setTimeout(()=>{
                    this.$nextTick(() => {
                        let pageInstance = this.$refs[this.toName][0];
                        pageInstance.$emit('pageshow');
                        this.setTitle(pageInstance);
                    })
                }, 0);
            },
            // 路由转场动画
            routeTransition(direction) {
                this.pageHandle();

                // if (VueRouter.routeType === 'update') {
                //     if (this.toName === 'home' || this.toName === 'customMsg') {
                //         return ;
                //     }
                // }
                if (VueRouter.routeType === 'update' && this.toName === this.fromName) {
                    return ;
                }

                if(direction === 'forward') {
                    this.animClass = 'forward';
                    this.animPageName = this.toName;
                } else if (direction === 'back') {
                    this.animClass = 'back';
                    this.animPageName = this.fromName;
                } else if (direction === undefined) {
                    this.$nextTick(() => {
                        this.toPage.style.zIndex = this.zIndex++;
                    })
                }
            },
            // 在单次路由切换过程中，观察路由是后退还是点击前进的
            judgeRouteDirection() {
                let direction;
                // 说明是后退
                if (VueRouter.popstateNum === 2) {
                    direction = 'back';
                }
                // 说明是点击跳转的路由前进
                if (VueRouter.popstateNum === 1) {
                    direction = 'forward';
                }
                // 重置popstateNum的记数；
                VueRouter.setPopstateNum('reset');
                return direction;
            },
            // 监听动画事件, 调整各页面的'z-index'的值;
            addAnimEvent() {
                // 动画开始时事件
                window.addEventListener("webkitAnimationStart", e => {
                    VueRouter.routing = true;
                    // 如果是路由前进
                    if (Array.prototype.indexOf.call(e.target.classList, 'forward') !== -1 ) {
                        this.toPage.style.zIndex = this.zIndex++;
                    }
                    // 如果是路由后退, 先给目标页和原始页的'z-index'增大的目的为了考虑到比如'购物车这样的单实例页面'可能会在动画的过程中'zindex'的值高于目标页面;
                    if (Array.prototype.indexOf.call(e.target.classList, 'back') !== -1 ) {
                        if (this.toPage.nodeType !== 1) {
                            throw new Error('目标元素的nodeType不是1, 请查看vue组件中的顶层标签是否使用的异步获取的v-if判断。')
                        }
                        this.toPage.style.zIndex = this.zIndex++;
                        this.fromPage.style.zIndex = this.zIndex++;
                    }
                })
                // 动画结束时事件
                window.addEventListener("webkitAnimationEnd", e => {
                    // 如果是后退事件, 在动画结束时给目标路由页'z-index'加1;
                    if (Array.prototype.indexOf.call(e.target.classList, 'back') !== -1 ) {
                        if (this.toPage.nodeType !== 1) {
                            throw new Error('目标元素的nodeType不是1, 请查看vue组件中的顶层标签是否使用的异步获取的v-if判断。')
                        }
                        this.toPage.style.zIndex = this.zIndex++;
                        this.destroyedPage();
                    }
                    // 在页面被替换时，销毁被替换的页面;
                    if (Array.prototype.indexOf.call(e.target.classList, 'forward') !== -1) {
                        if (window.routeMode === 'replace' && this.toName !== this.fromName) {
                            this.destroyedPage();
                        }
                    }
                    VueRouter.routing = false;
                })
            },
            // 在后退动画完成时, 销毁相应页面
            destroyedPage() {
                if (!this.fromName) {
                    return ;
                }

                if (this.fromName !== 'cart') {
                    let pn = this.fromName.split('-')[0]
                    if (this.morePages[pn]) {
                        this.morePages[pn].pageArr.pop();
                        this.morePages[pn].pageSum--;
                    } else {
                        this.singlePages[this.fromName] = ""
                    }
                }
            },
            // 监听'popstate'事件, 在单次路由切换过程中记录事件触发次数, 
            // 用于识别路由跳转是点击界面元素的前进行为, 还是按返回键的后退事件;
            // 需要注意现在无法识别在浏览器中的历史记录前进和后退按钮; 统一当做是后退来处理;
            addPopstateEvent() {
                function adpe() {
                    setTimeout(() => {
                        window.addEventListener('popstate', e => {
                            VueRouter.setPopstateNum('add');
                            // console.log("window popstate event .....", e);
                        })

                        // window.addEventListener('hashchange', e => {
                        //     console.log("window onhashchange event .....", e);
                        // })
                    }, 0)
                }

                if (app.windowIsOnload) {
                    adpe()
                } else {
                    window.addEventListener('load', function () {
                        adpe()
                    })
                }
            },
            // 是否匹配中路由，如果没有则导航到主页
            checkRoute() {
                let route = this.$route;
                // 当前路由未定义,进入默认路由页面
                if (route.path !== '/' && route.matched.length === 0) {
                    this.$router.replace('/')
                }
            }
        },
        created() {
            this.checkRoute();
            this.addPopstateEvent();
            this.addAnimEvent();
        },
        mounted() {
        },
        watch: {
            $route(to, from) {
                // console.log("... app route watch ....");
                // console.log(from);
                // console.log(to);
                
                // 弹框的显示与隐藏、打开与关闭;
                if (to.path === from.path) {
                    this.judgeRouteDirection();
                    return;
                }

                let toName = this.toName = to.name,
                    frName = this.fromName = from.name,
                    direction = this.judgeRouteDirection();

                // 在路由切换时, 隐藏微信菜单中的非基础功能按钮
                app.sdk.triggerMenu(false);

                new Promise((resolve, reject) => {
                    if (typeof to.meta.page === 'function') {
                        // (异步组件写法)如果需要的页面路由组件不存在
                        if (!this.pageCaches[toName]) {
                            to.meta.page().then(component => {
                                component = component.default

                                // 缓存页面路由组件; 以当前路由的'name'为键, 'meta'下的page函数内的异步组件为值;
                                this.$set(this.pageCaches, toName, component);
                                resolve(component);
                            })
                        } else {
                            resolve(this.pageCaches[toName]);
                        }
                    } else {
                        // 同步组件(所有路由组件打包在一起)
                        if (!this.pageCaches[toName]) {
                            let component = to.meta.page;
                            this.$set(this.pageCaches, toName, component);
                        }
                        resolve(this.pageCaches[toName]);
                    }
                }).then(component => {
                    if (!(to.meta.model && to.meta.model.type === 'more')) {
                        if (toName === 'cart' && this.$refs['cart'] && direction === 'forward') {
                            this.$refs['cart'][0].$emit('scrollToTop');
                        }

                        !this.singlePages[toName] && this.$set(this.singlePages, toName, component);

                        if (from.meta.model && from.meta.model.type === 'more' && this.morePages[from.name].pageArr.length) {
                            this.fromName = this.morePages[from.name].pageArr[this.morePages[from.name].pageArr.length - 1].pageKey;
                        }
                    } else {
                        if (!this.morePages[toName]) {
                            this.$set(this.morePages, toName, {
                                component: component,
                                pageSum: 100,
                                pageArr: [],
                                max: to.meta.model.max,
                            })
                        }

                        if (direction === 'back') {
                            let mpgo = this.morePages[to.name];
                            let pageArr = mpgo.pageArr;

                            if (toName !== frName) {
                                if (!pageArr.length) {
                                    pageArr.push({
                                        pageKey: `${toName}-${mpgo.pageSum - 1}`,
                                        component: component
                                    });
                                }
                                this.toName = pageArr[pageArr.length - 1].pageKey;

                                if (from.meta.model && from.meta.model.type === 'more' && this.morePages[from.name].pageArr.length) {
                                    this.fromName = this.morePages[frName].pageArr[this.morePages[frName].pageArr.length - 1].pageKey;
                                }
                            } else {
                                if (pageArr.length === 1) {
                                    pageArr.unshift({
                                        pageKey: `${toName}-${mpgo.pageSum - 2}`,
                                        component: component
                                    });
                                }
                                this.toName = pageArr[pageArr.length - 2].pageKey;
                                this.fromName = pageArr[pageArr.length - 1].pageKey;
                            }
                        } else { // 非后退到to.meta.model.type === 'more'的页面;(可以是前进，也可以是直接通过url进入)
                            let mpgo = this.morePages[toName];
                            let pageArr = mpgo.pageArr;
                            if (pageArr.length === mpgo.max) {
                                pageArr.shift();
                            }
                            pageArr.push({
                                pageKey: `${toName}-${mpgo.pageSum++}`,
                                component: component
                            });
                            
                            this.toName = pageArr[pageArr.length - 1].pageKey;

                            if (toName !== frName) {
                                if (from.meta.model && from.meta.model.type === 'more' && this.morePages[from.name].pageArr.length) {
                                    this.fromName = this.morePages[frName].pageArr[this.morePages[frName].pageArr.length - 1].pageKey;
                                }
                            } else {
                                this.fromName = pageArr[pageArr.length - 2].pageKey;
                            }
                        }
                    }
                    this.routeTransition(direction);
                })
            },
        }
    };
</script>