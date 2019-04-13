const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Suggestion = () => import(/*webpackChunkName: "Suggestion"*/ 'parent/pages/suggestion/suggestion')
const SuggestionRecord = () => import(/*webpackChunkName: "SuggestionRecord"*/ 'parent/pages/suggestion/suggestion-record')

const routes = [{
    path: '/suggestion',
    name: 'suggestion',
    component: routerBus,
    meta: {
        page: Suggestion
    }
},{
    path: '/suggestionRecord/:id',
    name: 'suggestionRecord',
    component: routerBus,
    meta: {
        page: SuggestionRecord
    }
}
]

export default routes;