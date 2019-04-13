import photoSelect from './photo-select.vue'

let Plugin = {};
let vueInstance;

Plugin.install = function(Vue,opts){
	//懒加载
	Vue.prototype.app.photoSelect = function(){
		if (!vueInstance){
			let el = document.createElement("div");
			document.body.appendChild(el);
	
			let VueClass = Vue.extend(photoSelect); 
			vueInstance = new VueClass({
				el:el,
				router:opts.router,
				propsData:opts
			});
		}
		return vueInstance.show(...arguments);
	}
}
export default Plugin;