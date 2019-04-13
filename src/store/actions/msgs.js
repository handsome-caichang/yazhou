import store from '../'
import config from '../../configs'
import util from '../../utils'

// 格式化机器人消息
/*export function formatMsg(msg) {
	if (msg.type === 'robot') {
		if (msg.content && msg.content.flag === 'bot') {
			if (msg.content.message) {
				msg.content.message = msg.content.message.map(item => {
					switch (item.type) {
						case 'template':
							item.content = store.state.nim.parseRobotTemplate(item.content)
							break
						case 'text':
						case 'image':
						case 'answer':
							break
					}
					return item
				})
			}
		}
	}
	return msg
}*/

// 同步漫游消息的回调, 每个会话对应一个回调, 会传入消息数组
export function onRoamingMsgs (obj) {
	// console.log("... 同步漫游消息 ... ", obj.msgs);
	store.commit('updateMsgs', obj.msgs)
}

// 同步离线消息的回调, 每个会话对应一个回调, 会传入消息数组
export function onOfflineMsgs(obj) {
	// console.log("... 同步离线消息 ... ", obj.msgs);
	store.commit('updateMsgs', obj.msgs)
}

export function onMsg(msg) {
	// console.log("新的消息... onMsg...", msg);

	// 如果是撤回消息的提醒消息，则替换相应消息
	if (msg.type === 'tip' && msg.tip === 'recall') {
		let idClient = JSON.parse(msg.custom).idClient
		store.commit('replaceMsg', {
			sessionId: msg.sessionId,
			idClient: idClient,
			msg
		})
		if (msg.sessionId === store.state.currSessionId) {
			store.commit('updateCurrSessionMsgs', {
				type: 'replace',
				idClient: idClient,
				msg
			})
		}
	} else {
		store.commit('putMsg', msg)
		if (msg.sessionId === store.state.currSessionId) {
			store.commit('updateCurrSessionMsgs', {
				type: 'put',
				msg
			})
		}
	}
}

// 发送自定义的本地消息
export function sendLocalCustomMsg({state, connit}, args) {
	const nim = state.nim
	return new Promise((resolve, reject) => {
	  	nim.sendCustomMsg({
		    ...args,
		    done: function (error, msg) {
		      	onSendMsgDone (error, msg)
		      	if (!error) {
		      		// app.tool.alert("发送本地消息成功")
		      		resolve(msg)
		      	} else {
		      		// app.tool.alert({jie: "发送本地消息失败", ...error})
		      		reject(error)
		      		// app.tool.alert("发送本地消息失败")
		      	}
		    }
		})
	})
}

// 发送普通消息
export function sendMsg ({state, commit}, obj) {
	return new Promise((resolve, reject) => {
		const nim = state.nim;
			obj = obj || {}
		let type = obj.type || '',
			sendDoned = function (error, msg) {
				onSendMsgDone(error, msg)
				if (!error) {
					resolve(msg)
				} else {
					/*app.tool.alert({
						jie: "发送普通消息失败",
						...error,
					})*/
					reject(error)
				}
			}

		switch (type) {
			case 'text':
				nim.sendText({
					scene: obj.scene,
					to: obj.to,
					text: obj.text,
					done: sendDoned
				})
				break
			case 'custom':
				nim.sendCustomMsg({
					scene: obj.scene,
					to: obj.to,
					pushContent: obj.pushContent,
					content: JSON.stringify(obj.content),
					done: sendDoned
				})
		}
	})	
}

// 重发消息
export function resendMsg({state, commit}, msg) {
	return new Promise((resolve, reject) => {
		const nim = state.nim;

		nim.resendMsg({
			msg: msg,
			done: (error, msg) => {
				if (!error) {
					// 更新当前会话消息列表
					commit('updateCurrSessionMsgs', {
						type: 'replace',
						idClient: msg.idClient,
						msg: msg
					})
					// 更新state.msgs中对应的会话的最近消息列表
					commit('replaceMsg', {
					  	sessionId: msg.sessionId,
					  	idClient: msg.idClient,
					  	msg: msg
					})
					resolve(msg)
				} else {
					/*app.tool.alert({
						jie: '重发消息失败...',
						...error
					})*/
					reject(error)
				}
			}
		})
	})
}

// 预览文件, 会将文件上传至云信服务器;
export function previewFile ({state, commit}, args) {
	/*const nim = state.nim;
	return new Promise((resolve, reject) => {
		nim.previewFile({
			...args,
			uploadprogress: function(obj) {
		       	alert('文件总大小: ' + obj.total + 'bytes');
		       	alert('已经上传的大小: ' + obj.loaded + 'bytes');
		       	alert('上传进度: ' + obj.percentage);
		       	alert('上传进度文本: ' + obj.percentageText);
		   	},
			done: function (error, file) {
				resolve(file)
			}
		})
	})*/
}

// 发送文件消息
// export function sendFileMsg ({state, commit}, args) {
// 	const nim = state.nim
// 	return new Promise((resolve, reject) => {
// 	  	nim.sendFile({
// 		    ...args,
// 		    uploadprogress: function(progress) {
// 		    	console.log(args.index, ' => ', progress);
// 	            console.log('文件总大小: ' + progress.total + 'bytes');
// 	            console.log('已经上传的大小: ' + progress.loaded + 'bytes');
// 	            console.log('上传进度: ' + progress.percentage);
// 	            console.log('上传进度文本: ' + progress.percentageText);
// 	        },
// 	        uploaddone: function(error, file) {
// 	            console.log('上传' + (!error?'成功':'失败'), error, file);
// 	        },
// 	        beforesend: function(msg) {
// 	            console.log('正在发送消息, id=' + msg.idClient);
// 	        },
// 		    uploaderror: function () {
// 		      	console && console.log('上传失败')
// 		    },
// 		    done: function (error, msg) {
// 		    	console.log(">>> sendFile => ", msg);
// 		      	onSendMsgDone (error, msg)
// 		      	resolve(msg)
// 		    }
// 		})
// 	})
// }

// 发送文件消息
export function sendFileMsg ({state, commit}, obj) {
	const nim = state.nim
	let {scene, to, fileInput} = obj
	let type = 'file'
  	if (/\.(png|jpg|bmp|jpeg|gif)$/i.test(fileInput.value)) {
    	type = 'image'
  	} else if (/\.(mov|mp4|ogg|webm)$/i.test(fileInput.value)) {
    	type = 'video'
  	}
  	nim.sendFile({
	    scene,
	    to,
	    type,
	    fileInput,
	    uploadprogress: function (data) {
	      	// console.log(data.percentageText)
	    },
	    uploaderror: function () {
	      	console && console.log('上传失败')
	    },
	    uploaddone: function(error, file) {
	      	// console.log(error);
	      	// console.log(file);
	    },
	    beforesend: function (msg) {
	      	// console && console.log('正在发送消息, id=', msg);
	    },
	    done: function (error, msg) {
	      	onSendMsgDone (error, msg)
	    }
	})
}

export function getHistoryMsgs ({state, commit}, obj) {
	const nim = state.nim
	return new Promise((resolve, reject) => {
		if (nim) {
			let {scene, to} = obj
			let options = {
				scene,
				to,
				reverse: false,
				asc: true,
				limit: config.localMsglimit || 20,
				done: function getHistoryMsgsDone(error, obj) {
					let msgs = obj.msgs
					if (msgs) {
						if (msgs.length > 0) {
							commit('updateCurrSessionMsgs', {
								type: 'concat',
								msgs: msgs
							})
						}
					}
					if (error) {
						reject(error)
					} else {
						resolve(obj)
					}
				}
			}
			if (state.currSessionLastMsg) {
				options = Object.assign(options, {
					lastMsgId: state.currSessionLastMsg.idServer,
					endTime: state.currSessionLastMsg.time,
				})
			}
			nim.getHistoryMsgs(options)
		}
	})
}


function onSendMsgDone (error, msg) {
	if (error) {
		// 被拉黑
		if (error.code === 7101) {
			msg.status = 'success'
			// alert(error.message)
		} else {
			console.log(error);
		}
	}
	onMsg(msg)
}


// 撤回消息
export function revocateMsg({state, commit}, msg) {
	const nim = state.nim
	let {idClient} = msg
	nim.deleteMsg({
		msg,
		done: function deleteMsgDone(error) {
			if (error) {
				if (error.code === 508) {
					app.alert('发送时间超过2分钟的消息，不能被撤回')
				} else {
					// alert(error)
				}
				return
			}
			onRevocateMsg(msg)
		}
	})
}

// 发送消息撤回的提醒tip
export function onRevocateMsg (msg) {
	// console.log("发送撤回tip消息....");
	const nim = store.state.nim
	nim.sendTipMsg({
		isLocal: false,
		scene: msg.scene,
		to: msg.to,
		tip: 'recall',
		time: msg.time,
		isUnreadable: false,
		custom: JSON.stringify({idClient: msg.idClient}),
		done: function sendTipMsgDone(error, tipMsg) {
			onMsg(tipMsg)
		}
	})
}