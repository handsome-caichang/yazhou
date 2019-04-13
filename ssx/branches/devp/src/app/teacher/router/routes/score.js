const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Score = () => import('teacher/pages/teacher/score-entering/scroe-first/scoreFirst')
const ScoreImport = () => import('teacher/pages/teacher/score-entering/score-import/scoreImport.vue')
const ScoreSelectClass = () => import('teacher/pages/teacher/score-entering/scoreSelectClass/scoreSelectClass.vue')
const StuList = () => import('teacher/pages/teacher/score-entering/score-stuList/stuList.vue')
const ScoreImportStuDetail = () => import('teacher/pages/teacher/score-entering/scoreImportStuDetail/scoreImportStuDetail.vue')
const ScoreSelectStu = () => import('teacher/pages/teacher/score-entering/scoreSelectStu/scoreSelectStu.vue')
const ScoreQueryClass = () => import('teacher/pages/teacher/score-entering/scoreQueryClass/scoreQueryClass.vue')
const ScoreQueryStudent = () => import('teacher/pages/teacher/score-entering/scoreQueryStudent/scoreQueryStudent.vue')
const ScoreQueryStuDetail = () => import('teacher/pages/teacher/score-entering/scoreQueryStuDetail/scoreQueryStuDetail.vue')
const routes = [{
    path: '/score',
    name: 'score',
    component: routerBus,
    meta: {
        page: Score
    }
}, {
    path: '/scoreImport',
    name: 'scoreImport',
    component: routerBus,
    meta: {
        page: ScoreImport
    }
}, {
    path: '/scoreSelectClass',
    name: 'scoreSelectClass',
    component: routerBus,
    meta: {
        page: ScoreSelectClass
    }
}, {
    path: '/stuList/:type',
    name: 'stuList',
    component: routerBus,
    meta: {
        page: StuList
    }
}, {
    path: '/scoreImportStuDetail',
    name: 'scoreImportStuDetail',
    component: routerBus,
    meta: {
        page: ScoreImportStuDetail
    }
}, {
    path: '/scoreSelectStu',
    name: 'scoreSelectStu',
    component: routerBus,
    meta: {
        page: ScoreSelectStu
    }
}, {
    path: '/scoreQueryClass/:examid',
    name: 'scoreQueryClass',
    component: routerBus,
    meta: {
        page: ScoreQueryClass
    }
}, {
    path: '/scoreQueryStudent/:examid/:classid',
    name: 'scoreQueryStudent',
    component: routerBus,
    meta: {
        page: ScoreQueryStudent
    }
}, {
    path: '/scoreQueryStuDetail/:examid',
    name: 'scoreQueryStuDetail',
    component: routerBus,
    meta: {
        page: ScoreQueryStuDetail
    }
}];

export default routes