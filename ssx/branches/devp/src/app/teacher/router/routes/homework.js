const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const HomeworkList = () => import(/*webpackChunkName: "HomeworkList"*/ 'teacher/pages/teacher/homework/homework-list');
const HomeworkStudentsList = () => import(/*webpackChunkName: "HomeworkStudentsList"*/ 'teacher/pages/teacher/homework/homework-students-list');
const HomeworkEvaluate = () => import(/*webpackChunkName: "HomeworkEvaluate"*/ 'teacher/pages/teacher/homework/homework-evaluate');
const HomeworkDetail = () => import(/*webpackChunkName: "HomeworkDetail"*/ 'teacher/pages/teacher/homework/homework-detail');
const HomeworkAdd = () => import(/*webpackChunkName: "HomeworkAdd"*/ 'teacher/pages/teacher/homework/homework-add');


const routes = [

  // 作业列表
  {
    path: '/homeworkList',
    name: 'homeworkList',
    component: routerBus,
    meta: {
      page: HomeworkList
    }
  },
  // 新增作业
  {
    path: '/homeworkAdd',
    name: 'hoemwork-add',
    component: routerBus,
    meta: {
      page: HomeworkAdd
    }
  },
  // 作业详情
  {
    path: '/homeworkDetail/:id',
    name: 'homeworkDetail',
    component: routerBus,
    meta: {
      page: HomeworkDetail
    }
  }, {
    path: '/homeworkStudentsList/:id',
    name: 'homeworkStudentsList',
    component: routerBus,
    meta: {
      page: HomeworkStudentsList
    }
  },{
    path: '/homeworkEvaluate/:refMessageId/:studentId',
    name: 'homeworkEvaluate',
    component: routerBus,
    meta: {
      page: HomeworkEvaluate
    }
  }
]

export default routes;