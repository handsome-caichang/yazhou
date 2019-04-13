import quickDateOpts from './quickdate-actionsheet.vue';

let vuePlugin={},
	vueInstance;

vuePlugin.install = function(Vue, opt) {
    opt.root.quickDate = function(){
        if (!vueInstance) {
            let el = document.createElement('div'),
                vueClass = Vue.extend(quickDateOpts);

            document.querySelector('body').appendChild(el);
            vueInstance = new vueClass({
                el: el,
                router: opt.router
            })
        }
        return vueInstance.show(...arguments);
    }
}

export default vuePlugin;