import responsibleOfficer from './responsible-officer.vue';

let treePlugin;	//创建的实例.

let DepartTree = {};

DepartTree.install = function(Vue, opt){
    opt.root.responsibleOfficer = function(){
        if (!treePlugin){
            let el = document.createElement('div');
            document.querySelector('body').appendChild(el);
            //创建子类
            let VueClass = Vue.extend(responsibleOfficer);
            //创建一个实例.
            treePlugin = new VueClass({
                el:el,
                router: opt.router,
            });
        }
        return treePlugin.show(...arguments);
    }
}

export default DepartTree;