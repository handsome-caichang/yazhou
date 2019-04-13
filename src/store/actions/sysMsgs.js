import store from '../'

// 收到自定义系统通知的回调, 会传入系统通知
export function onCustomSysMsg(sysMsg) {
	// app.tool.alert({jie: '收到自定义通知', ...sysMsg})

	let content = JSON.parse(sysMsg.content),
		type = content.Type;

	if (type === 1001 || type === 1002) {
		app.sdk.qim.achieveConsume(content)
	}
}

// 同步离线自定义系统通知的回调, 会传入系统通知数组
export function onOfflineCustomSysMsgs(sysMsgs) {
	// app.tool.alert({jie: '收到离线自定义通知', ...sysMsgs})

	sysMsgs.forEach(sysMsg => {
		onCustomSysMsg(sysMsg)
	})
}


export function onSysMsgs (sysMsgs) {
	console.log("收到系统通知", sysMsgs);
	store.commit('updateSysMsgs', sysMsgs)
}

// 收到系统通知的回调, 会传入系统通知
export function onSysMsg (sysMsg) {
	console.log(" 收到系统通知", sysMsg);
	console.log("收到系统通知", sysMsg);
	switch (sysMsg.type) {
		/*// 在其他端添加或删除好友
		case 'addFriend':
		  onUpdateFriend(null, {
		    account: sysMsg.from
		  })
		  store.commit('updateSysMsgs', [sysMsg])
		  break
		case 'deleteFriend':
		  onDeleteFriend(null, {
		    account: sysMsg.from
		  })
		  break*/
		// 对方消息撤回
		case 'deleteMsg':
			console.log("对方消息撤回");
			console.log(store.state.palyAudioMsg);
			// 如果撤回的是正在播放的消息，则停止播放；
			if (sysMsg.msg.idClient === store.state.palyAudioMsg.idClient) {
				app.voice.stop()
			}
			break
	}
}

// 收到系统通知未读数的回调, 更新系统通知未读数的回调
export function onOfflineSysMsgs (obj) {
	console.log("收到离线系统通知");
	console.log(obj);
}

// 收到系统通知未读数的回调, 更新系统通知未读数的回调
export function onSysMsgUnread (obj) {
  store.commit('updateSysMsgUnread', obj)
}