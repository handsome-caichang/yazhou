var map = {
    "1001": {
        "path": () => import('./bargain/001/bargain.vue'),
        "editPath": () => import('./bargain/bargain-edit.vue'),
        "title": "砍价方案"
    },
    "1005": {
        "path": () => import('./bargain/002/bargain.vue'),
        "editPath": () => import('./bargain/bargain-edit.vue'),
        "title": "砍价方案"
    }, 
    "1002": {
        "path": () => import('./groupBuying/001/groupBuying.vue'),
        "editPath": () => import('./groupBuying/groupBuyingEdit.vue'),
        "title": "拼团方案"
    }, 
    "1004": {
        "path": () => import('./groupBuying/002/groupBuying.vue'),
        "editPath": () => import('./groupBuying/groupBuyingEdit.vue'),
        "title": "拼团方案"
    },
    "1003": {
        "path": () => import('./leaflet/001/leaflet.vue'),
        "editPath": () => import('./leaflet/leafletEdit.vue'),
        "title": "微传单方案"
    },    
    "1006": {
        "path": () => import('./leaflet/002/leaflet.vue'),
        "editPath": () => import('./leaflet/leafletEdit.vue'),
        "title": "微传单方案"
    }
}

export default map