const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const CommentList = () => import(/*webpackChunkName: "CommentList"*/ 'teacher/pages/teacher/comment/comment-list')
const CommentStudentsList = () => import(/*webpackChunkName: "CommentStudentsList"*/ 'teacher/pages/teacher/comment/comment-students-list')
const CommentDetails = () => import(/*webpackChunkName: "CommentDetails"*/ 'teacher/pages/teacher/comment/comment-details')

const routes = [
    {
        path: "/commentList",
        name: "commentList",
        component: routerBus,
        meta: {
            page: CommentList
        }
    },
    {
        path: "/commentStudentsList/:id/:date/:time",
        name: "commentStudentsList",
        component: routerBus,
        meta: {
            page: CommentStudentsList
        }
    },
    {
        path: "/commentDetail/:courseId/:studentId",
        name: "commentDetail",
        component: routerBus,
        meta: {
            page: CommentDetails
        }
    }
];

export default routes;