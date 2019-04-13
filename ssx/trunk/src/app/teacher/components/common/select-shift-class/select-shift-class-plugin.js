import selectClass from './select-shift-class.vue'

let Plugin = {};
let vueInstance;

Plugin.install = function(Vue,opts){
	//懒加载
	Vue.prototype.app.selectShiftClass = function(){
		if (!vueInstance){
			let el = document.createElement("div");
			document.body.appendChild(el);
	
			let VueClass = Vue.extend(selectClass); 
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