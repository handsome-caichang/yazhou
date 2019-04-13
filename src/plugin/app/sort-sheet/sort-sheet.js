import sortSheet from './sort-sheet.vue';

let Plugin = {},
    vueInstance;

Plugin.install = function(Vue, opt){
	opt.root.sortSheet = function(){
	    if (!vueInstance) {
	        let el = document.createElement('div')
	        	document.querySelector('body').appendChild(el)
            
            let vueClass = Vue.extend(sortSheet);

	        vueInstance = new vueClass({
	            el: el,
	            router: opt.router
	        })
        }
        return vueInstance.show(...arguments);
	}
}

export default Plugin;