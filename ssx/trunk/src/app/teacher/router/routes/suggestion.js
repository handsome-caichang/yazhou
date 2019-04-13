const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Suggestion = () => import(/*webpackChunkName: "Suggestion"*/ 'teacher/pages/teacher/suggestion/suggestion')
const SuggestionDetail = () => import(/*webpackChunkName: "SuggestionDetail"*/ 'teacher/pages/teacher/suggestion/suggestion-detail')

const routes = [{
	path: '/suggestion',
    name: 'suggestion',
    component: routerBus,
    meta: {
        page: Suggestion
    }
}, {
	path: '/suggestionDetail/:id',
    name: 'suggestionDetail',
    component: routerBus,
    meta: {
        page: SuggestionDetail
    }
}]

export default routes