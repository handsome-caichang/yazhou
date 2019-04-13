import {ajax} from './ajax.js';

export function getshareshow(params){ //获取活动分享信息
    return ajax('getshareshow',params);
}