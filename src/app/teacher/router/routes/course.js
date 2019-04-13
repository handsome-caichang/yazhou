const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const courseList = () => import(/*webpackChunkName: "courseList"*/ 'teacher/pages/teacher/course/course-list')
const courseDetails = () => import(/*webpackChunkName: "courseDetails"*/ 'teacher/pages/teacher/course/course-details')
const courseRecords = () => import(/*webpackChunkName: "courseRecords"*/ 'teacher/pages/teacher/course/course-records')

const routes = [
    {
        path: '/courseList',
        name: 'courseList',
        component: routerBus,
        meta: {
            page: courseList
        }
    }, {
        path: '/courseDetails',
        name: 'courseDetails',
        component: routerBus,
        meta: {
            page: courseDetails
        }
    }, {
        path: '/courseRecords',
        name: 'courseRecords',
        component: routerBus,
        meta: {
            page: courseRecords
        }
    }
]

export default routes;