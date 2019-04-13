
import ToastOpts from './toast.vue'

// 'VueToast' 是通过'ToastOpts'扩展的'VUE'子类
// 'toast'是'VueToast'的一个实例
let VueToast, toast;

// 对toast单例的'show'方法进行代理
// 在使用时可以如下方式传参
function Toast (type, text, duration) {
    toast.show.apply(this, arguments)
}

function getEl () {
    let el = document.createElement('div');
    document.querySelector('body').appendChild(el);
    return el;
}

/*
 * props选项说明：
 * {
 *     duration: Number // 显示的持续时间
 *  }
 */
Toast.init = function () {
    window.addEventListener('load', function () {
        toast = new VueToast({
            el: getEl(),
        });
    })
}

Toast.install = function(Vue, {root}) {
    VueToast = Vue.extend(ToastOpts);
    this.init();
    
    Object.assign(root, {
        toast: Toast
    })
}

export default Toast;


