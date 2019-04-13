import noFindComponent from './routes/noFindComponent.js'

/* 异步主键 */
import publicRouter from './routes/public.js';
import homeworkRouter from './routes/homework.js';
import commentRouter from './routes/comment.js';
import classSaleRate from './routes/classSaleRate.js';
import noticeRouter from './routes/notice.js';
import announcementRouter from './routes/announcement.js';
import courseRouter from './routes/course.js';
import workinfoRouter from './routes/workinfo.js';
import courseAttendanceRouter from './routes/course-attendance.js';
import personalCenterRouter from './routes/personal-center.js';
import commentRank from './routes/comment-rank.js';
import suggestRouter from './routes/suggestion.js';
import customersRouter from './routes/customers.js';
import bukeRouter from './routes/buke.js';
import communication from './routes/communication.js';
import score from './routes/score.js';
import renewal from './routes/renewal.js';
import card from "./routes/card.js";
import qrCode from "./routes/qr-code.js";
import consumeReport from './routes/consumeReport.js';
import feeReport from './routes/feeReport.js';
import achievementReport from './routes/achievementReport.js';

import apicloud from './apicloud.js';

const routes = [
    ...publicRouter,
    ...homeworkRouter,
    ...commentRouter,
    ...noticeRouter,
    ...announcementRouter,
    ...courseRouter,
    ...workinfoRouter,
    ...courseAttendanceRouter,
    ...personalCenterRouter,
    ...commentRank,
    ...suggestRouter,
    ...customersRouter,
    ...bukeRouter,
    ...score,
    ...communication,
    ...renewal,
    ...card,
    ...apicloud,
    ...classSaleRate,

    ...feeReport,
    ...consumeReport,
    ...achievementReport,
    ...noFindComponent,
    ...qrCode,    
]



const router = new VueRouter({
    routes
});


export default router;