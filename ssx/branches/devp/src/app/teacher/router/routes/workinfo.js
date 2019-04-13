const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const workInfo = () => import(/*webpackChunkName: "workInfo"*/ 'teacher/pages/teacher/workinfo/workinfo')
const workInfoCourseDetails = () => import(/*webpackChunkName: "workInfoCourseDetails"*/ 'teacher/pages/teacher/workinfo/workinfo-course-details')
const workInfoAttendanceDetails = () => import(/*webpackChunkName: "workInfoAttendanceDetails"*/ 'teacher/pages/teacher/workinfo/workinfo-attendance-details')

const routes = [
    {
        path: '/workInfo',
        name: 'workInfo',
        component: routerBus,
        meta: {
            page: workInfo
        }
    }, {
        path: '/workInfoCourseDetails/:sdate/:edate',
        name: 'workInfoCourseDetails',
        component: routerBus,
        meta: {
            page: workInfoCourseDetails
        }
    }, {
        path: '/workInfoAttendanceDetails/:sdate/:edate',
        name: 'workInfoAttendanceDetails',
        component: routerBus,
        meta: {
            page: workInfoAttendanceDetails
        }
    }
]

export default routes;