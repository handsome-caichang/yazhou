import vueComponents from './components/components.js'

// 引入工具库
import appExtend from './app-extend/app-extend.js'

const extend = {
    install: function(Vue, options) {
        Vue.mixin({
            components: vueComponents
        });
    }
};

export default extend;