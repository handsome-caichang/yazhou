import noFindComponent from './routes/noFindComponent.js'

import publicRouter from './routes/public.js';
import homeworkRouter from './routes/homework.js';
import commentRouter from './routes/comment.js';
import noticeRouter from './routes/notice.js';
import courseRouter from './routes/course';
import pointRouter from './routes/point';
import growthRouter from './routes/growth';
import checkinRouter from './routes/checkin';
import suggestionRouter from './routes/suggestion.js';
import transactionRouter from './routes/transaction';
import statisticsRouter from './routes/statistics';
import personalCenterRouter from './routes/personal-center';
import orderRouter from './routes/order';
import lookClass from './routes/lookClass';
import coupon from './routes/coupon.js';
import shareAward from './routes/share-award';

let routes = [
	...publicRouter,
	...homeworkRouter,
	...commentRouter,
	...noticeRouter,
	...courseRouter,
	...pointRouter,
	...growthRouter,
	...checkinRouter,
	...suggestionRouter,
	...transactionRouter,
	...statisticsRouter,
	...personalCenterRouter,
    ...orderRouter,
	...lookClass,
	...coupon,
	...shareAward,
	...noFindComponent
]

const router = new VueRouter({
  	routes
});

export default router;