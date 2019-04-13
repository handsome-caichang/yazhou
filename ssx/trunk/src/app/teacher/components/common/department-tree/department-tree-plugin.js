import departTree from './department-tree-common.vue';

let treePlugin;	//创建的实例.	

let DepartTree = {};

DepartTree.install = function(Vue,opts){
	Vue.prototype.app.empSelect = function(){
		if (!treePlugin){
			let el = document.createElement('div');
			document.querySelector('body').appendChild(el);
			//创建子类
			let VueClass = Vue.extend(departTree);
			//创建一个实例.
			treePlugin = new VueClass({
				el:el,
				router:opts.router,
				opts:opts
			});
		}
		return treePlugin.show(...arguments)
	}
}

export default DepartTree;