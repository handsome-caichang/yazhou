import base from '../base.js'

// 实现在组件'mounted'生命周期时监听window的'resize'事件
// 并在'destroyed'生命周期时移除相应的监听
// 该mixin用于解决滚动组件、轮播组件在生成时会重复注册对'resize'事件的监听导致的性能问题；
export const winResizeMixin = {
    mounted() {
        window.addEventListener('resize',this._winResizeHandler)
    },
    destroyed() {
        window.removeEventListener('resize',this._winResizeHandler)
    },
    methods: {
        _winResizeHandler() {
            throw new Error('component must implement winResizeHandler method')
        }
    }
};


// 修复在钉钉上，弹窗快速点击造成多级路由回退的问题;
function repairDdPopupRouterBug() {
    if (base.env === 'dd') {
        if (!window.ddRouterBugDom) {

            window.ddRouterBugDom = document.createElement('div')
            window.ddRouterBugDom.style.position = "absolute"
            window.ddRouterBugDom.style.width = "100%"
            window.ddRouterBugDom.style.height = "100%"
            window.ddRouterBugDom.style.zIndex = 999999999
            window.ddRouterBugDom.style.display = "none"

            document.querySelector('body').appendChild(window.ddRouterBugDom)
        }
        window.ddRouterBugDom.style.display = 'block'
        setTimeout(() => {
            window.ddRouterBugDom.style.display = 'none'
        }, 1000)
    }
}

export const popupWindowRouteMixin = {
    methods: {
        close(type) {
            // 防止在关闭动画时多次点击,造成路由多次回退;
            if (this.isCloseing) {
                return;
            } else {
                this.isCloseing = true;
                setTimeout(() => {
                    this.isCloseing = false;
                }, app.config.duration + 100)
            }

            this.cancel();
            this.$router.back();
        },
        cancel() {
            this._cancel();
        },
        _cancel() {
            this.interiorClose = true;
            if (this.$props && this.$props.opened !== undefined){
            	this.$emit('update:opened', false);
            } else {
            	this.opened = false;
            }
            this.$router.popupWindow.pop();
        },
    },
    watch: {
        opened(newVal) {
            if (newVal) {
                this.interiorClose = false;
                this.$router.popupWindow.push(this)
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        pwIndex: this.$router.popupWindow.length
                    }
                })
            } else {
                // 修复在钉钉上，弹窗快速点击造成多级路由回退的问题;             
                repairDdPopupRouterBug();

                if (!this.interiorClose) {
                    // console.log("back..........");
                    this.$router.back();
                }
            }
        }
    }
};


// 用来修改微信文档标题；在使用标准的vue-router时可用;
// 目前没有使用，因为我们改造了vue-routre
export const setDocTitleMixin = {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            let matched = vm.$route.matched,
                len = matched.length,
                comp_last = matched[len - 1].instances.default,
                comp_last2 = len > 1 ? matched[len - 2].instances.default : null;
            setTimeout(() => {
                vm === comp_last && comp_last.wxTitle && app.tool.setDocTitle(comp_last.wxTitle);
            }, 0);
        });
    },
    beforeRouteUpdate (to, from, next) {
        this.$nextTick(() => {
            setTimeout(() => {
                this.wxTitle && app.tool.setDocTitle(this.wxTitle);
            }, 0);
        });
        next();
    }
};

// 分享mixin
/*  1. 引入该mixin    
    mixins: [app.mixin.shareMixin]
    2. 在合适的时机调用this.v_shareResolve方法, 传入分享参数;如:
    created() {
        this.v_shareResolve({
            title: '我是标题',
            desc: '我是要分享的描述信息、内容。。。',
            link: location.href,
            imgUrl: 'http://static.dingtalk.com/media/lADPBbCc1YOadDfNAoDNAoA_640_640.jpg'
        })
    }*/
export const shareMixin = {
    created: function() {
        let sharePromise = new Promise(resolve => this.v_shareResolve = resolve)

        if (window.__wxjs_environment === 'miniprogram'){
            this.v_updateShareMessage()
        }

        this.$on('pageshow', () => {
            sharePromise.then(params => {
                this.v_shareParams = params
                this.v_updateShareMessage()
            })
        })
    },
    methods: {
        v_updateShareMessage() {
            if (this.v_shareParams) {
                let options = typeof this.v_shareParams === 'function' 
                    ? this.v_shareParams() 
                    : this.v_shareParams

                if (window.__wxjs_environment === 'miniprogram'){
                    wx.miniProgram.postMessage({
                        data: {
                            options: options,
                            fullPath: options ? this.$route.fullPath : "/" 
                        }
                    })
                } else {
                    options && app.sdk.share(options)
                }
            }
        }
    }
}


