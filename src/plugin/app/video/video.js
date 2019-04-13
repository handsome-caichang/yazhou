import VideoOpts from './video.vue'

let vueClass,
    vuePlugin = {},
    vueInstance;

vuePlugin.install = function (Vue, opt) {
    let root = opt.root,
        router = opt.router,
        a = 1

    Object.defineProperty(root, 'video', {
        get: function () {
            if (!vueInstance) {
                let el = document.createElement('div')
                document.querySelector('body').appendChild(el);

                vueClass = Vue.extend(VideoOpts);
                vueInstance = new vueClass({
                    el,
                    router
                });
            }
            return vueInstance
        }
    })
}

export default vuePlugin;

