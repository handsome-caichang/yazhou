
export const KeyboardMixin = {
	methods: {
		// 键盘弹出时, 在滚动条重置后, 将滚动条滚动到获取焦点的表单元素位置;
		_keyboardupHandler() {
			let scr = this.$refs.scrollWindow;
			let scw = this.$refs.scrollerWrapper
		    if (scr) {
		    	// scr.style.backgroundColor = '#f00'
		    	let focus = scr.querySelectorAll(":focus")[0];
		    	if (focus) {
		    		setTimeout(() => {
		    		    this.$nextTick(() => {
		    		        this.scroller.scrollToElement(focus, 0);
    		                if (app.isAndroid && (scr.scrollTop + scw.scrollTop > 0)) {
    		                	scr.scrollTop = 0
    		        			scw.scrollTop = 0
    		                }
		    		    })
		    		}, 0)
		    	}
		    }
		},
		_keyboarddownHandler() {
		    // this.$refs.scrollWindow.style.backgroundColor = '';
		},
		// 给滚动条内的表单元素绑定'input'事件, 当用户输入时让滚动条滚到相应的表单元素的位置;
		/*refreshFormInputlisten () {
			let focs = this.$refs.scrollWindow.querySelectorAll("input, textarea")
			if(app.isIDevice) {
				// 如果是苹果设备，则在聚焦时禁止滚动条滚动
				// 通过在iscroll源码里判断实现
				Array.prototype.forEach.call(focs, item => {
					item.addEventListener('focus', this.ios_focus_handler__)
				})
				this._prev_focs_ && Array.prototype.forEach.call(this._prev_focs_, item => {
					item.removeEventListener('focus', this.ios_focus_handler__)
				})
			} else {
				// 如果是安卓或其它设备，则在“输入”时让滚动条滚动到聚焦的dom元素;
				Array.prototype.forEach.call(focs, item => {
					item.addEventListener('input', this.android_input_handler__)
				})
				this._prev_focs_ && Array.prototype.forEach.call(this._prev_focs_ , item => {
					item.removeEventListener('input', this.android_input_handler__)
				})
			}
			this._prev_focs_ = focs
		},
		ios_focus_handler__(e) {
			console.log('ios');
			e.target._isInsideIscroll_ = true;
		},
		android_input_handler__(e) {
			console.log('android');
			this.scroller.scrollToElement(e.target, 0);
		},*/
	},
	created() {
		// 滚动条创建时,监听自定义的键盘弹出及收起事件
	    if (app.isAndroid) {
	        app.event.on('keyboardup', this._keyboardupHandler)
	        app.event.on('keyboarddown', this._keyboarddownHandler)
	    }
	},
	mounted() {
		// this.refreshFormInputlisten();
	},
	beforeDestroy() {
		// 滚动条销毁时,移除监听自定义的键盘弹出及收起事件
	    if (app.isAndroid) {
	       app.event.off('keyboardup', this._keyboardupHandler)
	       app.event.off('keyboarddown', this._keyboarddownHandler) 
	    }
	},
}