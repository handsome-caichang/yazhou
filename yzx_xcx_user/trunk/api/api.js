import {ajax} from './ajax.js';

export function getshareshow(params) {
    return ajax('getshareshow', params);
}

export function updateusertel(params) {
    return ajax('updateusertel', params);
}