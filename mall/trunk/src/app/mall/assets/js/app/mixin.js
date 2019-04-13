
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
                }, app.duration)
            }

            this.cancel();
            this.$router.back();
        },
        cancel() {
            this._cancel();
        },
        _cancel() {
            // this.interiorClose = true;
            // this.$emit('update:opened', false);
            // this.$router.popupWindow.pop();

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
                if (!this.interiorClose) {
                    this.$router.back();
                }
            }
        }
    }
};


// 全局路由钩子，用来修改微信文档标题；在使用标准的vue-router时可用;
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
}