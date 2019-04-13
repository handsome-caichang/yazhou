import watchMore from './watchMore.vue';

let Plugin = {},
    vueInstance;

Plugin.install = function(Vue, opt) {
    opt.root.watchMore = function() {
        if (!vueInstance) {
            let el = document.createElement('div')
            document.querySelector('body').appendChild(el)
            let vueClass = Vue.extend(watchMore);
            vueInstance = new vueClass({
                el: el,
                router: opt.router,
            })
        }
        return vueInstance.show(...arguments)
    }
    // opt.store
}

export default Plugin;