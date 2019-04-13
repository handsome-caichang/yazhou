const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const courseAttendanceList = () => import(/*webpackChunkName: "courseAttendanceList"*/ 'teacher/pages/teacher/course-attendance/course-attendance-list')
const courseAttendanceStudents = () => import(/*webpackChunkName: "courseAttendanceStudents"*/ 'teacher/pages/teacher/course-attendance/course-attendance-students')
const courseAttendanceNewCourse = () => import(/*webpackChunkName: "courseAttendanceNewCourse"*/ 'teacher/pages/teacher/course-attendance/course-attendance-newcourse')

const routes = [
    {
        path: '/courseAttendanceList',
        name: 'courseAttendanceList',
        component: routerBus,
        meta: {
            page: courseAttendanceList
        }
    },
    {
        path: '/courseAttendanceStudents',
        name: 'courseAttendanceStudents',
        component: routerBus,
        meta: {
            page: courseAttendanceStudents
        }
    },
    {
        path: '/courseAttendanceNewCourse',
        name: 'courseAttendanceNewCourse',
        component: routerBus,
        meta: {
            page: courseAttendanceNewCourse
        }
    }

]

export default routes;