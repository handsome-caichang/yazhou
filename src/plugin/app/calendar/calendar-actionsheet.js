import calendarOpts from './calendar-actionsheet.vue';

let vuePlugin = {},
    vueInstance;

vuePlugin.install = function (Vue, opt) {
    opt.root.calendar = function(){
        if (!vueInstance) {
            let el = document.createElement('div'),
                vueClass = Vue.extend(calendarOpts); //通过'calendarOpts'扩展的Vue子类

            document.querySelector('body').appendChild(el);
            vueInstance = new vueClass({
                el: el,
                router: opt.router  //vue-router路由实例
            });
        }
        return vueInstance.show(...arguments);
    }
}

export default vuePlugin;