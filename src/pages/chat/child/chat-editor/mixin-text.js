// 发送文本消息相关的逻辑

export const text = {
	data() {
		return {
			textarea: null,
			minH: 0,
			maxH: 80,
			placeholder: "",
			msgToSent: "",
			maxMsgLength: 1000
		}
	},
	computed: {
		showSendBtn() {
			return this.editStatusIsText && this.msgToSent.trim().length;
		}
	},
	methods: {
		// 监听'input', 'focus'事件，自适应高度
		autoTextarea(el, minH, maxH) {
		    this.textarea.addEventListener('input', this.change);
		    this.textarea.addEventListener('focus', this.change);
		    this.change();
		},
		// 使文本域可以随着输入自动改变高度
		change() {
			let el = this.textarea, newLen = el.value.length, minH = this.minH, maxH = this.maxH;
			if (el._len !== newLen) {
				el._len = newLen;

				el.style.height = `${minH}px`;

				if (el.scrollHeight > maxH) {
					el.style.height = `${maxH || el.scrollHeight}px`
				} else if (el.scrollHeight > minH) {
				    el.style.height = `${el.scrollHeight}px`
				}

				this.emitChangeHeight()
			}            
        },
		// 重置文本域到默认样式
		resetTextarea() {
			this.msgToSent = "";
			this.textarea.style.height = this.minH + 'px';
			this.emitChangeHeight()
		},
		// 检查文本域高度是否发生变化，如果变化则发射事件;
		emitChangeHeight() {
			let el = this.textarea, curH = el.style.height;
			if (el._curH !== curH) {
				el._curH = curH;
				this.$emit('chatEditorChangeHeight')
			}
		},
		// 文本域获取焦点时发射自定义事件，通知聊天页面;
		emitFocus() {
			this.textarea.addEventListener('focus', (e) => {
				e.preventDefault();
				e.stopPropagation();
				console.log("...... focus");
				this.$emit('textarea-focus', e)
			});
			this.textarea.addEventListener('click', (e) => {
				console.log("...... ??????");
				this.$emit('textarea-focus', e)
				app.event.emit("chatEditorTextareaFocus")
			});
		},
		// 发送文本消息
		sendTextMsg() {
			// this.textarea.focus();
			// 消息长度控制
			if (this.msgToSent.trim().length === 0)
				return app.alert(`发送内容不能为空`);
			if (this.msgToSent.length > this.maxMsgLength)
				return app.alert(`发送内容不能超过${this.maxMsgLength}个字`);

			this.$store.dispatch('sendMsg', {
				type: 'text',
				scene: this.scene,
				to: this.to,
				text: this.msgToSent
			})

			this.resetTextarea()
		},
		// 保证在苹果设备下，输入框能够一直展示在虚拟键盘上；不被键盘遮挡。
		scrollIntoView() {
			if (app.isIDevice) {
				let itv, el = this.textarea, bo = document.body;

				if (app.iosFullVersion.indexOf('11.2') === 0) {
					return
				} else {
					el.addEventListener('focus', event => {
						itv = setInterval(() => bo.scrollTop = bo.scrollHeight, 1000)
					})

					el.addEventListener('blur', event => clearInterval(itv))
				}
			}
		},
		// 监听表情输入
		selectFaceListener() {
			let that = this
			app.event.on("selectFace", (e, faceName) => {
				var textDom = this.textarea
				if (textDom.selectionStart || textDom.selectionStart == '0') {
			        var startPos = textDom.selectionStart;
			        var endPos = textDom.selectionEnd;
			        this.msgToSent = this.msgToSent.substring(0, startPos) + faceName + this.msgToSent.substring(endPos, this.msgToSent.length);
			        setTimeout(() => {
			        	textDom.focus();
			        	textDom.selectionStart = startPos + faceName.length;
			        	textDom.selectionEnd = startPos + faceName.length;
			        	this.setCaretPosition(textDom, textDom.selectionStart)
			        	this.textarea.blur();
			        	this.change();
			        }, 10)
			    }
			    else {
			        this.msgToSent += faceName;
			    }			    
			})
		},
		// 设置光标位置
		setCaretPosition(textDom, pos){
		    if(textDom.setSelectionRange) {
		        textDom.focus();
		        textDom.setSelectionRange(pos, pos);
		    }else if (textDom.createTextRange) {
		        var range = textDom.createTextRange();
		        range.collapse(true);
		        range.moveEnd('character', pos);
		        range.moveStart('character', pos);
		        range.select();
		    }
		}
	},
	mounted() {
		let textarea  = this.textarea = this.$refs.textarea;
		this.minH = parseFloat(app.dom.getStyle(textarea).height);
		this.maxH = parseFloat(app.dom.getStyle(textarea).maxHeight);
		textarea._curH = textarea.style.height = `${this.minH}px`;

		this.autoTextarea();
		this.emitFocus();

		this.scrollIntoView();

		this.selectFaceListener()
	},
	beforeDestroy() {
	},
}