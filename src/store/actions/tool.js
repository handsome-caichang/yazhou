import store from '../'
import config from '../../configs'

export function formatUserInfo(obj) {
    const nim = store.state.nim
    let genderName = '',
        avatarThumb = '',
        customObj = null,
        avatar = obj.avatar || config.defaultUserIcon;

    switch (obj.gender) {
        case 'male':
            genderName = '男'
            break
        case 'female':
            genderName = '女'
            break
        case 'unknown':
            genderName = ''
            break
    }

    let custom = obj.custom || ''
    try {
        customObj = JSON.parse(custom)
    } catch (e) {
        customObj = {
            data: custom
        }
    }

    avatarThumb = nim.viewImageSync({
        url: avatar, // 必填
        thumbnail: { // 生成缩略图， 可选填
            width: 60,
            height: 60,
            mode: 'cover'
        }
    })

    let result = Object.assign(obj, {
        avatar,
        avatarThumb,
        genderName,
        customObj,
    })

    return result
}