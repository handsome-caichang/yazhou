import baoMingAction from './baoMingAction.vue';

let Plugin = {},
    vueInstance;

Plugin.install = function(Vue, opt){
	opt.root.baoMingAction = function(){
	    if (!vueInstance) {
	        let el = document.createElement('div')
	        	document.querySelector('body').appendChild(el)
            let vueClass = Vue.extend(baoMingAction);
	        vueInstance = new vueClass({
	            el: el,
				router: opt.router,
				store: opt.store
	        })
		}
		console.log(vueInstance)
	    return vueInstance.show();
	}
	// opt.store
}

export default Plugin;