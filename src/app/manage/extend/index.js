import vueComponents from './components/components.js'


const extend = {
    install: function(Vue, options) {
        Vue.mixin({
        	components: vueComponents
        });

        // util.install(Vue, options)
    }
};

export default extend;
