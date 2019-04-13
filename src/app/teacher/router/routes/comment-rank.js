const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

//  家长评价排名统计
const CommentRank = () => import(/* webpackChunkName: "CommentRank"*/ 'teacher/pages/teacher/comment-rank/comment-rank')
//  维度排名统计
const CommentDimension = () => import(/* webpackChunkName: "CommentDimension"*/ 'teacher/pages/teacher/comment-rank/comment-dimension')
//  维度总平均分
const DimensionAVG = () => import(/* webpackChunkName: "DimensionAVG"*/ 'teacher/pages/teacher/comment-rank/dimension-avg')
//  班级平均分详情
const ClassScoreDetail = () => import(/* webpackChunkName: "ClassScoreDetail"*/ 'teacher/pages/teacher/comment-rank/class-score-detail')

const routes = [
    {
        path: '/commentRank',
        name: 'commentRank',
        component: routerBus,
        meta: {
            page: CommentRank
        }
    },
    {
        path: '/commentDimension',
        name: 'commentDimension',
        component: routerBus,
        props: true,
        meta: {
            page: CommentDimension
        }
    },
    {
        path: '/dimensionAVG',
        name: 'dimensionAVG',
        component: routerBus,
        props: true,
        meta: {
            page: DimensionAVG
        }
    },
    {
        path: '/classScoreDetail',
        name: 'classScoreDetail',
        component: routerBus,
        props: true,
        meta: {
            page: ClassScoreDetail
        }
    }
]

export default routes;