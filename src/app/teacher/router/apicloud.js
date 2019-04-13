const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const apicloud = () => import(/*webpackChunkName: "apicloud"*/ 'teacher/pages/apicloud/apicloud.vue')
const image = () => import(/*webpackChunkName: "apicloud-image"*/ 'teacher/pages/apicloud/image/image.vue')
const audio = () => import(/*webpackChunkName: "apicloud-audio"*/ 'teacher/pages/apicloud/audio/audio.vue')
const video = () => import(/*webpackChunkName: "apicloud-video"*/ 'teacher/pages/apicloud/video/video.vue')



const routes = [
    {
        path: '/apicloud',
        name: 'apicloud',
        component: routerBus,
        meta: {
            page: apicloud
        }
    }, {
        path: '/apicloud/image',
        name: 'image',
        component: routerBus,
        meta: {
            page: image
        }
    }, {
        path: '/apicloud/audio',
        name: 'audio',
        component: routerBus,
        meta: {
            page: audio
        }
    }, {
        path: '/apicloud/video',
        name: 'video',
        component: routerBus,
        meta: {
            page: video
        }
    }
]

export default routes;