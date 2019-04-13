import datetimePicker from './datetime-picker.vue';

let Plugin = {},
    vueInstance;

Plugin.install = function(Vue, opt){
	opt.root.datetimePicker = function(){
	    if (!vueInstance) {
	        let el = document.createElement('div')
	        	document.querySelector('body').appendChild(el)
            
            let vueClass = Vue.extend(datetimePicker);

	        vueInstance = new vueClass({
	            el: el,
	            router: opt.router
	        })

	        var args = arguments
	        return new Promise(resolve => {
	        	setTimeout(() => {
	        		resolve(vueInstance.show(...args));
	        	},80)
	        })
	    } else {
	    	return vueInstance.show(...arguments);
	    }
	}
}

export default Plugin;