
import {getCourseDetail,updateCourseTime,postCheckConflict,postCourse} from '../../api/api.js';

const fmtTime = time=> app.Util.formatDatetime(time,'hh:mm'),
      fmtDate = time=> app.Util.formatDatetime(time,'yyyy-MM-dd hh:mm:ss');



const app = getApp();
let CFG = {}

let fixedHeader = false;

Page({
    data: {
        res:{},
        listOrigin:[],      //学员列表
        field:{},           //修饰渲染
        compute:{},         //计算固定属性
        childConfig:{},     //给子组件的相关数据。
        openPicker:false,   //用于picker-view每次关闭后销毁组件,重新实例化,
        countObj:{},        //出勤计费试听统计
        IMG:app.globalData.IMG,
        id:'',
        showChangeTime:true,
        searchWords:'',
        jinduTitle:'',

        originListImgFile:[],
        listImgFile:[],
        photoSubmit:{
            fileIdList:'',
            imgs:[]
        },
        scheduleSave:null,  //进度
        descStatus:false,   //升序还是降序
        isCourseCancel:false,
        isCourseRevoke:false,

    },
    onscroll({detail}){ //直接改子组件延迟小一点。
        if (detail.scrollTop >= 143 && !fixedHeader){
            fixedHeader = true;
            this.selectComponent("#list").setData({fixedHeader:true});  
        } else if (detail.scrollTop < 143 && fixedHeader){
            fixedHeader = false
            this.selectComponent("#list").setData({fixedHeader:false});
        }
    },
    initData(){
        wx.showLoading({title:'加载中',mask:true});
        getCourseDetail({
            pname: 'courseAttendance_detail',
            id: this.data.id,
            UsePlatform: 4
        }).then(res=>{
            res = res.data;
            let compute = this.data.compute;
            //计算课消数量
            let detail = res.coursedetail,
                duraArr = detail.duration.split(":");
            compute.costConsumeAmount = detail.consumeamount * 1;
            compute.dynamicCostUnitShow = '';
            if (res.unitcode == 2) { //按次计费
                if (detail.minutestotimes == 1) { //按次按时长扣费
                    compute.costConsumeAmount = ((duraArr[0] * 60 + duraArr[1] * 1) / (detail.standardminutes * 1)).toFixed(5) * 1;
                    compute.dynamicCostUnitShow = compute.costConsumeAmount + res.unit;
                } else {
                    compute.dynamicCostUnitShow = detail.consumeamount * 1 + res.unit;
                }
            } else if (res.unitcode == 1) { //按小时计费
                compute.costConsumeAmount = duraArr[0] * 60 + duraArr[1] * 1;
                compute.dynamicCostUnitShow = compute.costConsumeAmount + '分钟';
            }


            let jinduTitle= '';
            //初始化上课进度,必须有设置上课进度
            if(res.shiftschedulelist.length > 0) {
                let scheduleList = res.shiftschedulelist;

                if(res.shiftamount == '') { //未上课点名
                    if(CFG.enableaddcourse_shiftschedule == 0) { //没有自动设置课程进度,进行常规处理.否则由后台自动处理完成
                        //常规处理流程:如果在此之前的排课有设置了上课进度(classShiftAmount),那么本次的上课进度自动设置为classShiftAmount+1的进度						
                        if(res.classshiftamount != '') {
                            res.shiftamount = res.classshiftamount;
                            let zIndex = 0;
                            scheduleList.forEach((item, index) => {
                                item.shiftamount == res.shiftamount && (zIndex = index);
                            })
                            zIndex < scheduleList.length - 1 && zIndex++;
                            res.shiftamount = scheduleList[zIndex].shiftamount;
                            res.content = scheduleList[zIndex].content;
                            jinduTitle = scheduleList[zIndex].title;
                        }
                    }
                } else if(res.shiftamount == '0') { //shiftAmount 为空是未上课点名,点名后未选进度是0
                    jinduTitle = '';
                } else {
                    scheduleList.forEach((item, index) => {
                        item.shiftamount == res.shiftamount && (jinduTitle = item.title);
                    })
                }
            }
            //记录进度
            let scheduleSave = {
                shiftamount:res.shiftamount,
                id:res.shiftschedulelist[res.shiftamount - 1] && res.shiftschedulelist[res.shiftamount - 1].id
            }



            
            //初始化属性
            res.studentlist.forEach((item,index)=>this.initStu(item,index,res));

            this.data.childConfig = {
                isdynamicconsume:res.coursedetail.isdynamicconsume,
                costConsumeAmount: compute.costConsumeAmount,
                courseid:res.coursedetail.id,
                unitShow:res.unitcode == 2 && res.coursedetail.minutestotimes == 1 ? compute.dynamicCostUnitShow :  res.unit,
                dynamicCostUnitShow:compute.dynamicCostUnitShow,
                finished:res.coursedetail.finished,
                isonetoone:res.isonetoone,
                unit:res.unit,
                unitText:res.unit == '小时' ? '课时' : CFG.title_courseunit_2 == '课时' ? '课时' : '课次', 
            }

            if (res.coursedetail.listimgfile === undefined){
                res.coursedetail.listimgfile = [];
            }

            this.setData({
                field:render(res),
                res:res,
                originListImgFile:res.coursedetail.listimgfile.map(item=>({path:item.filepath,id:item.id})),
                listImgFile:res.coursedetail.listimgfile.map(item=>({path:item.filepath})),
                listOrigin:res.studentlist,
                childConfig:this.data.childConfig,
                compute,
                jinduTitle,
                scheduleSave,
                showChangeTime:res.coursedetail.finished === 0 && app.op("CourseBeginTimeEdit"),
                isCourseCancel:app.op('CourseCancel') && CFG.enableteachercancelcourse == 1 && res.coursedetail.finished == 0,
                isCourseRevoke:app.op('CourseBeginCancel') && res.coursedetail.finished == 1,
            })
            wx.hideLoading();
        });

    },
    //通过刷新后得到数据,仅更新student的list.不更新任何其他信息...
    addStu(){
        wx.showLoading({title:'加载中',mask:true});
        getCourseDetail({
            pname: 'courseAttendance_detail',
            id: this.data.id,
            UsePlatform: 4
        }).then(res=>{
            res.data.studentlist.forEach((item,index)=>this.initStu(item,index,res.data));
            this.setData({listOrigin:res.data.studentlist});
            wx.hideLoading();
            wx.showToast({title:'添加学员成功',icon:'none'});
        });
    },
    onLoad:function(options) {
        CFG = app.globalData.CFG;
        this.setData({
            id:options.id
        })
        this.initData();
    },
    initStu(item,index,res){        
        //1.剩余数量转化
        let amount =  res.unitcode == 1 ? (item.remainamount * 60).toFixed(2) * 1 : item.remainamount;
        res.coursedetail.finished == 1 && (amount += item.iscost);
        item._remainAmountToUnit = amount;

        //2.判断是否是禁止点击的（欠费）
        item._isDisableAttend = false;
        item._isDisableCost = false;
        if ((CFG.enablecourseconfirmwhenless == 2) || (CFG.enablecourseconfirmwhenless != 1)){
            res.isrelation != 1 && this.judge(item,res);           
            //this.judge(item,res);
        }                
        //3.判断是否是不能更改的（自动计费）
        item._isDisableCostAuto = (CFG.classautocharge != 0 && res.isonetoone == 0 &&  item.isattendstauts ==0);
        item._isDisableCostAuto3 = (CFG.classautocharge == 3 && res.isonetoone == 0 &&  item.isattendstauts ==0);
        //4.添加其余额外属性
        item._isShowDelete = false;
        item._nameHighlight = '<span>'+item.name+'</span>';  //搜索的时候用
        item._orderIdx = index;    //要排序的时候用。
    },
    judge(item,res){
        let less;
        if (res.coursedetail.isdynamicconsume == 0){    //非动态课消
            less = item.iscost  + item._remainAmountToUnit - this.data.compute.costConsumeAmount < 0;
        } else {    //动态课消
            less = item.iscost + item._remainAmountToUnit <= 0;
        }
        if ((CFG.enablecourseconfirmwhenless ==2) && item.isattend == 0){
            item._isDisableAttend = less;
        }
        if ((CFG.enablecourseconfirmwhenless != 1) && item.iscost == 0){
            item._isDisableCost = less;
        }
    },
    openPicker(){
        if (this.data.res.coursedetail.finished === 0 && app.op("CourseBeginTimeEdit")){       
            this.setData({openPicker:true});
            this.selectComponent("#timePicker").open();
        }
    },
    closePicker(){
        this.setData({openPicker:false});
    },
    openAbsent({detail}){
        this.selectComponent("#absentList").open(detail.item);
    },
    selectAbsent(){
        this.selectComponent("#list").render();
    },
    openSort(){
        this.selectComponent("#sortList").open();
    },
    clickSort({detail}){
        let data = this.selectComponent("#list").data,
            list = data.list,
            item = detail.item;
            this.setData({descStatus:detail.desc});
            list.sort((a,b)=>{
                if (item.attr == '_orderIdx'){
                    return detail.desc ? b[item.attr] - a[item.attr] : a[item.attr] - b[item.attr];
                } else{
                    return !detail.desc ? b[item.attr] - a[item.attr] : a[item.attr] - b[item.attr];
                }
            });
            data.list = list;
            this.selectComponent("#list").render();
    },
    openDynamic({detail}){
        this.selectComponent("#dynamicInput").open(detail);
    },
    searchList(){
        let searchWords = this.data.searchWords,
            data = this.selectComponent("#list").data,
            list = data.list;

        list.forEach(item=>{
            item._nameHighlight = item.name;
        })
        
        let newList = [],
        validIdx,
        name;
        list.forEach(item=>{
            name = item.name;
            validIdx = name.indexOf(searchWords);
            if (validIdx > -1){
                item._nameHighlight = name.slice(0, validIdx) + 
                `<span  style="color:#2196f3">${name.slice(validIdx,validIdx+searchWords.length)}</span>` +
                name.slice(validIdx + searchWords.length,name.length);
                newList.unshift(item);	
            } else {
                newList.push(item);
            }
        })
        data.list = newList;
        this.selectComponent("#list").render();
    },
    syncSearch({detail}){
        this.setData({
            searchWords:detail.value
        })
    },
    changeTime({detail}){
        let res = this.data.res;
        let startTime = res.starttime.split('T')[0] + "T" + detail.stime,
            endTime = res.endtime.split('T')[0] + "T" + detail.etime,
            tid = res.teacherids.map(val=>val.id).join(",");
        
        let params = {
            sdate:fmtDate(startTime),
            edate:fmtDate(endTime),
            courseID: res.coursedetail.id,
            teacherids:tid,
            classroomid:res.coursedetail.classroomid,
            UsePlatform:4,
        }
        wx.showLoading({title:'加载中',mask:true});
        updateCourseTime(params).then(res=>{
            if (res.errorcode == 200){
                // wx.redirectTo({
                //     url:'/pages/detail/detail',
                //     success:()=>{
                //         setTimeout(()=>{
                //             wx.showToast({title:'修改上课时间时长成功。',icon:'none'});
                //         },500);
                //     }
                // });
                this.initData();
                wx.showToast({title:'修改上课时间时长成功。',icon:'none'});
            } else if (res.errorcode == 421){	//有冲突
                wx.hideLoading();
                let msg = app.Util.convertHtmlToText(res.errormsg);
                app.Util.confirm({content:msg,showCancel:false});
            }
        });
    },
    countChange({detail}){
        this.setData({
            countObj:detail
        })
    },
    saveContentSchedule(obj){
        let res = this.data.res;
        res.content = obj.content;
        res.shiftamount = obj.schedule.shiftamount;
        this.setData({
            res:res,
            jinduTitle:obj.schedule.id =="00000000-0000-0000-0000-000000000000" ? '' : obj.schedule.title,
            scheduleSave:obj.schedule
        });
    },
    openCancelCourse() {
        let config = {
            title:'即将取消上课',
            name:this.data.res.shiftname,
            holder:'请输入取消原因(必填)',
        }
        this.selectComponent("#submitDialog").open(config,true);
    },
    cancelCourse({detail}){
        let params = {
            id: this.data.id,
            opt: 2,
            memo: detail.reason,
            UsePlatform:4,
        }
        postCourse(params).then(res => {
            if(res.errcode == 200) {
                getCurrentPages()[getCurrentPages().length-2].getCourseInfo().then(()=>{
                    wx.showToast({title:'取消上课成功。',icon:'none'});
                });;
                wx.navigateBack();
                
            } else {
                wx.showToast({title:res.errmsg  || '取消上课失败。',icon:'none'});
            }
        });
    },
    revokeCourse() {
        let params = {
            id: this.data.id,
            opt: -1,
            memo: '',
            LastClasstime: getLastTime(this.data.res.starttime, this.data.res.endtime),
            UsePlatform:4,
        }
        wx.showLoading({title:'加载中',mask:true});
        postCourse(params).then(res => {
            wx.hideLoading();
            if(res.errcode == 200) {            
                getCurrentPages()[getCurrentPages().length-2].getCourseInfo().then(()=>{
                    wx.showToast({title:'撤销上课成功。',icon:'none'});
                });;
                wx.navigateBack();
                
            } else {
                wx.showToast({title:res.errmsg  || '撤销上课失败。',icon:'none'});
            }
        })
    },
    submitCourse(){
        //1.验证
        let result = this.selectComponent("#list").checkFlag(); //result.checkIDs(要检查冲突的id数组) result.data(要提交的数据) 
        if(!result) {
            return;
        }
        //2.如果需要检查冲突,先检查冲突再提交
        let pro = new Promise(resolve => {
            if(!(CFG.enablemachineattendance == 1)) {
                resolve(); //直接进行下一步
            } else {
                let params = {
                    CourseID: this.data.id,
                    StudentIDs: result.checkIDs,
                    UsePlatform:4,
                }
                wx.showLoading({title:'加载中',mask:true});
                //查询上课冲突
                postCheckConflict(params).then(res => {
                    wx.hideLoading();
                    if(res.errorcode == 200) {
                        if(!res.data.anyconfict) {
                            resolve();
                        } else {
                            let names = res.data.conflictresult.map(item => item.studentname).join(',');
                            if(CFG.checkstudentattendanceconflict == 1) {
                                app.Util.confirm('检测到以下学员上课时间有冲突，是否继续点名？\n' + names).then(()=>{
                                    resolve();
                                });
                            } else {
                                app.Util.confirm({
                                    content:'检测到以下学员上课时间有冲突，不能点名。\n' + names,
                                    showCancel:false
                                });
                            }
                        }
                    } else {
                        wx.showToast({title:res.errormsg,icon:'none'});
                    }
                })
            }
        });

        pro.then(() => {
            let res = this.data.res;
            let params = {
                envType:  4, // 表示小程序环境
                id: this.data.id,
                students: result.data,
                opt: 1,
                memo: res.describe,
                shiftAmount: this.data.scheduleSave.shiftamount, //本次所选的上课进度
                ShiftScheduleID: this.data.scheduleSave.id,
                Content: res.content,
                LastClasstime: getLastTime(res.starttime, res.endtime),
                UpdateTime: res.updatetime,
                UsePlatform:4,
                imgs: this.data.photoSubmit.imgs,
                fileIdList:this.data.photoSubmit.fileIdList,
            }
            //提交上课点名.
            wx.showLoading({title:'加载中',mask:true});
            postCourse(params).then(res => {
                wx.hideLoading();
                if(res.errcode == 200) {
                    let exceptionList = res.data.exceptionlist || [];
                    if (this.data.res.isrelation != 1 || exceptionList.length == 0){
                        //刷新.
                        getCurrentPages()[getCurrentPages().length-2].getCourseInfo().then(()=>{
                            wx.showToast({title:'点名成功。',icon:'none'});
                        });
                        wx.navigateBack();
                    } else if (exceptionList.length > 0){    //需要弹窗显示跨课消不能点名的
                        let name = exceptionList.map(item=>item.name).join('   '),
                            tips = CFG.enablecourseconfirmwhenless ==2 ? '以下学员欠费，不允许出勤计费：':'以下学员欠费，不允许计费：',
                            content = `${tips}\r\n${name}`;
                        wx.showModal({
                            title:'点名成功',
                            content,
                            showCancel:false,
                            complete:()=>{
                                setTimeout(() => {
                                    getCurrentPages()[getCurrentPages().length-2].getCourseInfo().then(()=>{
                                        wx.showToast({title:'点名成功。',icon:'none'});
                                    });
                                    wx.navigateBack(); 
                                }, 305);
                            }
                        });
                    }
                    
                } else if(res.errcode == 0) {
                    wx.showToast({title:'未修改任何数据。',icon:'none'});
                } else {
                    wx.showToast({title:res.errmsg,icon:'none'});
                }
            });
        });
    },
    changeListImg(arr){
        let originList = this.data.originListImgFile,
            fileIdList = [],    //删除
            imgs = [];  //新增
        originList.forEach(item=>{
            if (!arr.some(val=>val.path === item.path)){
                fileIdList.push(item.id);
            }
        })
        arr.forEach(item=>{
            if (!originList.some(val=>val.path === item.path)){
                imgs.push(item);
            }
        })        
        this.setData({
            listImgFile:arr,
            photoSubmit:{
                fileIdList:fileIdList.join(','),
                imgs:imgs.map(item=>{
                    item.ImgPath = item.path
                    return item;
                })
            }
        });
    }
})

// 更新数据后,重新啊渲染展现的字段
function render(res){
    let stime = fmtTime(res.starttime),
        etime = fmtTime(res.endtime),
        duration = res.coursedetail.duration,
        timePicker = stime + ',' + duration;

    return {
        timePicker,
        courseTime:stime + '~' + etime + ', 时长' + duration,
    }
}

function getLastTime(startTime, endTime) {
    let start = new Date(startTime.replace('T', ' ').replace(/-/g,'\/')),
        starttime = startTime.slice(0,10),
        end = new Date(endTime.replace('T', ' ').replace(/-/g,'\/')),
        week = ["[周日]", "[周一]", "[周二]", "[周三]", "[周四]", "[周五]", "[周六]"],
        day = new Date(startTime.replace('T', ' ').replace(/-/g,'\/')).getDay();
    return starttime + fmtTime(start, 'hh:mm') + "-" + fmtTime(end, 'hh:mm') + week[day];
}