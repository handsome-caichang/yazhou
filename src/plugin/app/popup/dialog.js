import DialogOpts from './dialog.vue'

// 'VueDialog' 是通过'DialogOpts'扩展的'VUE'子类
// router 是传进来的vue-router路由实例
let VueDialog, router;
    

/**
 * alert 'options' 选项说明：
 * {
 *    title: '标题',
 *    titleStyle: {},   // 标题样式
 *    text: '需要提示的内容',
 *    textStyle: {},    // 内容部分样式
 *    html: 'html片段', //'html'与'text'不能同时传递
 *    btn: {
 *        text: '确定',
 *        style: {},
 *        action: true
 *    }
 * }
 * 可以直接传'options'对象,也可以传一个'text';
 * 参数：options | text 
 */
function alert (options) {
    return Dialog('alert', options)
}

/**
 * confirm 'options' 选项说明：
 * {
 *    title: '标题',
 *    titleStyle: {},   // 标题样式
 *    text: '需要提示的内容',
 *    textStyle: {},    // 内容部分样式
 *    html: 'html片段', //'html'与'text'不能同时传递
 *    btns: [{
 *              text: '取消',
 *              style: {color: '#333'},
 *              action: false // 'cancel'
 *           },{
 *              text: '确定',
 *              style: {},
 *              action: true // 'confirm'
 *          }]
 * }
 * 可以直接传'options'对象,也可以传一个'text';
 * 参数：options | text 
 */
function confirm (options) {
    return Dialog('confirm', options)
}

function getEl () {
    let el = document.createElement('div');
    document.querySelector('body').appendChild(el);
    return el;
}

function Dialog(type, options) {
    let props = Object.assign({type: type}, typeof options === 'object' ? options : {text: options});
    return new VueDialog({
            el: getEl(),
            router,
            propsData: props
        });
}

Dialog.install = function(Vue, opt) {
    VueDialog = Vue.extend(DialogOpts);
    router = opt.router;

    Object.assign(opt.root, {
        dialog: Dialog,
        alert: alert,
        confirm: confirm
    })
}

export default Dialog;