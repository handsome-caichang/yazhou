/** 
  * 在 vue-router 2.7.0 的基础上进行扩展改造
  * 新增一个'beforeChange'钩子,
  * 并改写原型链上的'push'、'replace'方法, 
  * 以便在路由跳转时可以做一些统一处理;
  */

/**
  * beforeChange用例: 在线商城系统, 在每次路由切换时,需要动态在hash上加上当前校区的查询参数
  *   function beforeChange(location) {
  *       if (!location.query.cid) {
  *           location.query.cid = store.state.curCampus.id;
  *       }
  *       return location;
  *   }
  *   
  *  const router = new VueRouter({
  *       routes,
  *       beforeChange
  *   });
  */

;
(function() {
    var VR = VueRouter
        ,key = null

    Vue.event = new Vue()

    VueRouter = function VueRouter(options) {
        VR.call(this, options)
        this.beforeChange = options.beforeChange || function (location) {return location};
        Vue.event.$emit('instanceVueRouter', this)
    }

    for (key in VR) {
        if (VR.hasOwnProperty(key)) {
            VueRouter[key] = VR[key]
        }
    }

    VueRouter.prototype = VR.prototype

    VueRouter.prototype.formatLocation = function formatLocation(location, routeMode) {
        if (typeof location === 'string') {
            location = {
                path: location
            }
        }

        if (!location.query) {
            location.query = {};
        }

        location.routeMode = routeMode;
        window.routeMode = routeMode;
        VueRouter.routeMode = routeMode;

        return location;
    }

    VueRouter.prototype.push = function push(location, onComplete, onAbort) {
        location = this.formatLocation(location, 'push');
        this.history.push(this.beforeChange(location), onComplete, onAbort)
    }

    VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
        location = this.formatLocation(location, 'replace');
        this.history.replace(this.beforeChange(location), onComplete, onAbort);
    }


    // 是否正在发生路由跳转(页面正在做转场动画)
    VueRouter.routing = false

    // 在单次路由切换过程中，'popstate'事件触发的次数；
    VueRouter.popstateNum = 0

    // 在单次路由切换过程中，是更新了当前路由还是跳转了路由；
    // type取值：'goto'表示跳转到新路由、'update'表示更新当前路由 
    VueRouter.routeType = ''

    // 在单次路由切换过程中，'popstate'事件触发的次数；
    VueRouter.setPopstateNum = function (type) {
        if (type === 'add') {
            this.popstateNum += 1;
        }
        if (type === 'reset') {
            this.popstateNum = 0;
        }
        if (type === 'popstate-stop') {
            this.popstateNum = -1;
        }
    }

    // 在单次路由切换过程中，是更新了当前路由还是跳转了路由；
    // type取值：'goto'表示跳转到新路由、'update'表示更新当前路由 
    VueRouter.setRouteType = function (type) {
        this.routeType = type;
    }


    // 在实例化路由时, 注册如下全局路由前置守卫(路由钩子)：
    Vue.event.$on('instanceVueRouter', function (router) {
        // 实现弹窗路由化, 并在路由后退时关闭弹出框
        router.popupWindow = [];
        router.beforeEach(function (to, from, next) {
            if (to.query.pwIndex && to.query.pwIndex < router.popupWindow.length) {
                router.popupWindow[router.popupWindow.length - 1].cancel();
            }
            if (!to.query.pwIndex && router.popupWindow.length > 0) {
                router.popupWindow[router.popupWindow.length - 1].cancel();
            }

            next();
        })

        // 如里正在进行页面转场动画, 则阻止路由继续跳转;
        router.beforeEach(function (to, from, next) {
            if (VueRouter.routing) {
                next(false);
                // 重置popstateNum的记数；
                VueRouter.setPopstateNum('reset')
            } else {
                next();
            }
        })
    })
})();