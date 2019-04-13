import store from 'src/store'

// 拼装作业、通知、点评的跳转链接
export function getCustomMsgUrl(cmsg) {
	let isTeacher = store.state.userWone.TeacherRole,
		teacherUrl = store.state.teacherUrl,
		parentUrl = store.state.parentUrl,
		type = cmsg.Type,
		param = cmsg.UrlParams,
		paramArr = [`cmsgtype=${type}`],
		paramStr = '';

	for (let k in param) paramArr.push(`${k}=${param[k]}`)

	if (isTeacher) {
		paramArr.push(`currole=${isTeacher}`)
		// 重构版完全上线后，此块代码可以删除掉
		if (type === 2) {
			paramArr.push(`edit=1`)
			paramArr.push(`commentId=000-111-222`)
		}
		// 重构版完全上线后，此块代码可以删除掉
	}

	paramStr = encodeURIComponent(paramArr.join('&'))

	return `${isTeacher ? teacherUrl : parentUrl}${paramStr}`
}