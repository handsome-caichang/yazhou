import studentOperate from './student-operate.vue';

let Plugin = {};
let vueInstance;

Plugin.install = function(Vue, opt){
    opt.root.studentOperate = function(){
        if (!vueInstance){
            let el = document.createElement("div");
            document.body.appendChild(el);

            let VueClass = Vue.extend(studentOperate);
            vueInstance = new VueClass({
                el: el,
                router: opt.router
            });
        }
        return vueInstance.show(...arguments);
    }
}
export default Plugin;