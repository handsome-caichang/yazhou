// 自定义事件组件
export function Event () {
    this._listeners = {},
    this.on = function(type, fn) {
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        if (typeof fn === "function") {
            this._listeners[type].push(fn);
        }    
        return this;
    },
    this.emit = function(type) {
        var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
                if (typeof arrayEvent[i] === "function") {
                    Array.prototype.splice.call(arguments, 0, 1, {type: type})
                    arrayEvent[i].apply(null, arguments)
                }
            }
        }
        return this;
    },
    this.off = function(type, fn) {
        var arrayEvent = this._listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                for (var i = 0, length = arrayEvent.length; i < length; i += 1){
                    if (arrayEvent[i] === fn){
                        this._listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else {
                delete this._listeners[type];
            }
        }
        return this;
    }
}

export const event = new Event();

//用来处理业务逻辑的自定义事件对象池
export const eventDefine = new Event();     

/**
 * 在安卓设备上监听'resize'事件,判断是否为键盘弹出或收起；并触发键盘弹出或收起的事件;
 * 并在键盘收起时, 使获取焦点的表单元素失焦;
**/
var isListenKeyboard = false
export const listenKeyboard = function () {
    if (isListenKeyboard === true) {
        return
    }
    isListenKeyboard = true
    
    if (app.isAndroid) {
        //获取当前页面高度
        let preHeight = document.documentElement.clientHeight, curHeight; 
        window.addEventListener('resize', function (e) {
            curHeight = document.documentElement.clientHeight;
            // 如果差值大于100,说明是键盘弹出; 如果差值小于-100，则说明是键盘收起;
            if (preHeight - curHeight > 100) {
                app.event.emit('keyboardup')
            } else if (preHeight - curHeight < -100) {
                let focus = document.querySelectorAll(":focus")[0];
                focus && focus.blur();
                app.event.emit('keyboarddown')
            }
            preHeight = curHeight;
        })
    }

    // 如果是IOS设备，并且IOS系统主版本大于等于12。 
    // 解决在微信各种webview环境下键盘弹出后，webview窗口不会回滚的问题。
    if (app.isIDevice && app.iosFullVersion.split('.')[0] > 11) {
        window.addEventListener('load', function () {
            document.body.addEventListener('focusout', function(e) {
                document.body.scrollTop = 0
            });

            // document.body.addEventListener('focusin', function (e) {
            //     console.log(e);
            // });
        })
    }
}

export const area = {
    start: function (e) {
        let point = e.changedTouches[0]
        e.target.pp = {x: point.pageX, y : point.pageY}
    },
    move: function (e) {
        let  el =  e.target
            ,style = app.dom.getStyle(el)
            ,bth = parseInt(style['border-top-width'])
            ,bbh = parseInt(style['border-bottom-width'])
            ,height = el.offsetHeight - bth - bbh
            ,scrollTop = el.scrollTop
            ,scrollHeight = el.scrollHeight
            ,point = e.changedTouches[0]
            ,cp = {x: point.pageX, y : point.pageY}
            ,pp = el.pp
            ,xl = Math.abs(cp.x - pp.x)
            ,yl = Math.abs(cp.y - pp.y)
            ,flag = (yl > 0 && yl >= xl) ? true : false
            ,direction = cp.y > pp.y ? 'down' : 'up'

        if (el._stop) {
            e.stopPropagation()
        } else if (flag) {
            if (height === scrollHeight) {

            } else if (scrollTop === 0 && direction === 'down') {

            } else if (height + scrollTop === scrollHeight && direction === 'up') {

            } else {
                e.stopPropagation()
                el._stop = true
            }
        }

        el.pp = cp
    },
    end: function (e) {
        e.target._stop = false
    }
}

