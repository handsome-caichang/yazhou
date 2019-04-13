import loading from './loading.vue';

let Plugin = {},
    vueInstance;

Plugin.install = function(Vue, opt){
    opt.root.loading = {
        show: function(){
            if (!vueInstance) {
                let el = document.createElement('div')
                    document.querySelector('body').appendChild(el)
                
                let vueClass = Vue.extend(loading);
    
                vueInstance = new vueClass({
                    el: el,
                    router: opt.router
                })
            }

            return vueInstance.show(...arguments);
        },
        close: function(){
            if (!vueInstance) return;
            return vueInstance.close();
        }
    }
}

export default Plugin;