const routerBus = () => Promise.resolve(Vue.options.components.routerBus);
const ClassSaleRate = () =>
    import(/*webpackChunkName: "ClassSaleRate"*/ "teacher/pages/master/classReport/classSaleRate");
const classDetails = () =>
    import(/*webpackChunkName: "classDetails"*/ "teacher/pages/master/classReport/child/classDetails");

const routes = [
    {
        path: "/classSaleRate_section",
        name: "ClassSaleRate",
        component: routerBus,
        meta: {
            page: ClassSaleRate
        }
    },
];

export default routes;
