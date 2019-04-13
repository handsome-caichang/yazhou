import vueComponents from './components/components.js'

// 引入工具库
import appExtendPlugin from './app-extend/app-extend.js'

export default {
    install: function(Vue, options) {
        appExtendPlugin.install(Vue, options)

        Vue.mixin({
            components: vueComponents
        });
    }
}