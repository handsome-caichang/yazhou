import im from './routes/im.js'
import noFindComponent from './routes/noFindComponent.js'



const router = new VueRouter({
    routes: [
        ...im,
        ...noFindComponent,
    ],
});

export default router;