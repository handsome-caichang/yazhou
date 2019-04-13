const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const CourseCalendar = () => import(/*webpackChunkName: "CourseCalendar"*/ 'parent/pages/course/course-calendar')

const routes = [
    {
        path: '/courseCalendar',
        name: 'courseCalendar',
        component: routerBus,
        meta: {
            page: CourseCalendar
        }
    }
]

export default routes;