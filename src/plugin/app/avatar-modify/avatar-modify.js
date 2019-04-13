import AvatarModifyOpts from './avatar-modify.vue';

let Plugin = {},
	vueInstance;

Plugin.install = function(Vue, opt) {
	opt.root.avatarModify = function() {
		if (!vueInstance) {
			let el = document.createElement("div");
			document.body.appendChild(el);

			let VueClass = Vue.extend(AvatarModifyOpts);
			vueInstance = new VueClass({
				el: el,
				router: opt.router
			});
		}
		return vueInstance.show(...arguments);
	}
}

export default Plugin;