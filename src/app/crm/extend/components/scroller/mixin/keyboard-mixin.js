
export const KeyboardMixin = {
	methods: {
		// 键盘弹出时, 在滚动条重置后, 将滚动条滚动到获取焦点的表单元素位置;
		_keyboardupHandler() {
			let scr = this.$refs.scrollWindow;
		    if (scr) {
		    	// scr.style.backgroundColor = '#f00'
		    	let focus = scr.querySelectorAll(":focus")[0];
		    	if (focus) {
		    		setTimeout(() => {
		    		    this.$nextTick(() => {
		    		        this.scroller.scrollToElement(focus, 0);
		    		    })
		    		}, 0)
		    	}
		    }
		},
		_keyboarddownHandler() {
		    // this.$refs.scrollWindow.style.backgroundColor = '';
		},
		// 给滚动条内的表单元素绑定'input'事件, 当用户输入时让滚动条滚到相应的表单元素的位置;
		refreshFormInputlisten () {
			let focs = this.$refs.scrollWindow.querySelectorAll("input, textarea")
			Array.prototype.forEach.call(focs, item => {
			    item.addEventListener('input', e => {
			        this.scroller.scrollToElement(item, 0);
			    })
			})
		}
	},
	created() {
		// 滚动条创建时,监听自定义的键盘弹出及收起事件
	    if (app.device.isAndroid) {
	        app.event.on('keyboardup', this._keyboardupHandler)
	        app.event.on('keyboarddown', this._keyboarddownHandler)
	    }
	},
	mounted() {
		this.refreshFormInputlisten();
	},
	beforeDestroy() {
		// 滚动条销毁时,移除监听自定义的键盘弹出及收起事件
	    if (app.device.isAndroid) {
	       app.event.off('keyboardup', this._keyboardupHandler)
	       app.event.off('keyboarddown', this._keyboarddownHandler) 
	    }
	},
}