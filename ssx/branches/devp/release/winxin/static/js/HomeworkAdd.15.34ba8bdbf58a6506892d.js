webpackJsonp([15],{"+dQp":function(t,e,s){t.exports=s.p+"static/img/003.b9ab2d7.png"},"/HA3":function(t,e){},"1W4h":function(t,e,s){t.exports=s.p+"static/img/006.a0ac661.png"},"2dX+":function(t,e,s){"use strict";var i=s("bwys"),n=s.n(i),a=s("nMbT"),o=s.n(a),c=s("wYIz"),h=s.n(c),l=s("DgDI"),d=s.n(l),r=s("CQNM"),u=s.n(r),p=(s("uNq/"),s("+dQp")),m=s.n(p),f=s("Sxcu"),g=s.n(f),v=s("croJ"),x=s.n(v),k=s("1W4h"),w=s.n(k),C=s("azor"),y=s.n(C),_=s("2jlb"),b=s.n(_),L=s("I5WJ"),S=s.n(L),N={name:"empty-page",props:{type:{default:1},text:{type:String,default:""}},data:function(){return{pages:{no404:{img:h.a,width:294,height:204,text:"抱歉，您找的页面可能去睡觉了"},no1000:{img:n.a,width:293,height:254,text:"网络消化不良"},no1001:{img:o.a,width:200,height:271,text:"没有找到你指定的搜索结果~"},no0:{img:d.a,width:292,height:144},no1:{img:u.a,width:259,height:264},no2:{img:u.a,width:259,height:264},no3:{img:m.a,width:271,height:225},no4:{img:g.a,width:200,height:270},no5:{img:x.a,width:200,height:270},no6:{img:w.a,width:291,height:201},no7:{img:y.a,width:211,height:221},no8:{img:b.a,width:200,height:270,text:"还没有评价和建议哦"},no9:{img:S.a,width:350,height:320,text:"建议已经被删除"}}}},computed:{page:function(){var t=this.pages["no"+this.type];return{style:{width:t.width/2+"px",height:t.height/2+"px",backgroundImage:"url("+t.img+")"},text:this.text||t.text}}}},j={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"empty-box"},[e("div",{staticClass:"empty-img",style:this.page.style}),e("div",{staticClass:"empty-tips"},[this._v(this._s(this.page.text))])])},staticRenderFns:[]};var F=s("VU/8")(N,j,!1,function(t){s("Yixk")},"data-v-6412c432",null);e.a=F.exports},"2jlb":function(t,e,s){t.exports=s.p+"static/img/008.3e0fba5.png"},CQNM:function(t,e,s){t.exports=s.p+"static/img/001.41bfc62.png"},Cdx3:function(t,e,s){var i=s("sB3e"),n=s("lktj");s("uqUo")("keys",function(){return function(t){return n(i(t))}})},DgDI:function(t,e,s){t.exports=s.p+"static/img/000.51c407a.png"},I5WJ:function(t,e,s){t.exports=s.p+"static/img/009.41bfc62.png"},M6l4:function(t,e){},Sxcu:function(t,e,s){t.exports=s.p+"static/img/004.0b83c59.png"},TV32:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("//Fk"),n=s.n(i),a=s("fZjL"),o=s.n(a),c=s("woOf"),h=s.n(c),l=s("2dX+"),d={name:"Checked",mixins:[app.mixin.popupWindowRouteMixin],props:{opened:{},position:{type:String,default:"sideRight"},header:{},checkList:{type:Array}},data:function(){return{checked:!1,isAll:!1,chooseNum:0,total:0}},methods:{ok:function(){this.close();var t=app.tool.clone(this.checkList);this.$emit("getStudentList",{chooseNum:t.filter(function(t){return t.checked}).length,list:t})},chooseAll:function(){var t=this;this.isAll=!this.isAll,this.isAll?this.chooseNum=this.total:this.chooseNum=0,this.checkList.forEach(function(e){return t.isAll?e.checked=!0:e.checked=!1})},itemChecked:function(t,e,s){this.checkList[e].checked=!this.checkList[e].checked,this.checkList[e].checked?++this.chooseNum:0===this.chooseNum?this.chooseNum=this.chooseNum:--this.chooseNum,this.num=this.chooseNum,0!=this.chooseNum&&this.chooseNum===this.total?this.isAll=!0:this.isAll=!1}},watch:{opened:function(){var t=this;this.opened?(this.checkList.forEach(function(e){1==e.checked&&t.chooseNum++}),this.total=this.checkList.length,this.chooseNum===this.total?this.isAll=!0:this.isAll=!1):(this.isAll=!1,this.chooseNum=0)}},components:{EmptyPage:l.a}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("action-sheet",{directives:[{name:"show",rawName:"v-show",value:t.opened,expression:"opened"}],staticClass:"action-sheet",attrs:{data:t.checkList,position:t.position,fullParent:!0},on:{close:t.close}},[0!=t.checkList.length?s("div",{staticClass:"class-name",attrs:{slot:"header"},slot:"header"},[t._v(t._s(t.header))]):t._e(),t._l(t.checkList,function(e,i){return 0!=t.checkList.length?s("div",{key:e.StudentID,staticClass:"student-item",on:{click:function(s){s.stopPropagation(),s.preventDefault(),t.itemChecked(e,i,s)}}},[s("svg",{staticClass:"icon icon-duoxuan-weixuanze",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":0==e.checked?"#icon-duoxuan-weixuanze":"#icon-duoxuan"}})]),s("span",{staticClass:"photo",style:"background-image:url("+e.photo+")"}),s("span",{staticClass:"student-name"},[t._v(t._s(e.studentname))])]):t._e()}),0!=t.checkList.length?s("div",{staticClass:"bottom-fixed-button",attrs:{slot:"footer"},slot:"footer"},[s("span",{staticClass:"flex-item-span",on:{click:t.chooseAll}},[s("svg",{staticClass:"icon icon-duoxuan-weixuanze",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":0==t.isAll?"#icon-duoxuan-weixuanze":"#icon-duoxuan"}})]),t._v("全选\n            ")]),s("span",{staticClass:"flex-item-span",on:{click:t.ok}},[t._v("确定("+t._s(t.chooseNum)+")")])]):t._e(),0==t.checkList.length?s("empty-page",{staticClass:"noData-temp",attrs:{type:1001,text:"该班级没有学员哦"}}):t._e()],2)},staticRenderFns:[]};var u=s("VU/8")(d,r,!1,function(t){s("M6l4")},"data-v-6b9ddd27",null).exports,p=s("app8"),m={name:"accpet-class",mixins:[app.mixin.popupWindowRouteMixin],props:{opened:{type:Boolean,default:!1},position:{type:String,default:"sideRight"}},computed:{_list:function(){return this.list}},data:function(){return{list:{},accpets:{courseid:null,classid:null,chooseNum:0},temp:{courseid:null,classid:null,classname:"",chooseNum:0,list:[]},scrollerStyle:{background:"#eef1f6"},isOk:!1,checked:!1,isLoading:!1}},methods:{chooseStudent:function(t){this.checked=!0,this.isOk=!0,this.temp.classid=t.classid,this.temp.courseid=t.courseid,this.temp.classname=t.classname;var e=t.homeworkstudentinfos;0==this.temp.list.length?this.temp.list=this.initStudents(e):this.temp.courseid!=this.accpets.courseid?this.temp.list=this.initStudents(e):(this.temp.courseid=this.accpets.courseid,this.temp.classid=this.accpets.classid,this.temp.classname=this.accpets.classname,this.temp.list=this.accpets.studentids)},getStudentList:function(t){var e=this;this.isOk=!1,this.accpets.courseid=this.temp.courseid,this.accpets.classid=this.temp.classid,this.accpets.classname=this.temp.classname,this.accpets.chooseNum=t.chooseNum,this.accpets.studentids=t.list,this.accpets.studentids.some(function(t){return t.checked})&&(this.close(),setTimeout(function(){"#/homeworkAdd?pwIndex=1"===location.hash&&e.$router.back()},10));var s=h()({},this.accpets);s.studentids=[].concat(s.studentids.filter(function(t){return t.checked})),this.$emit("getAccpets",s)},formatDate:function(t){var e=t.split(" ")[1];e=e.split(":").splice(0,2).join(":");var s=t.split(" ")[0],i=parseInt(s.split("-")[0]),n=parseInt(s.split("-")[1]),a=parseInt(s.split("-")[2]),o=new Date;return{ymd:o.getFullYear()==i&&o.getMonth()+1==n&&o.getDate()==a?"今天":s,time:e}},initStudents:function(t){return t.map(function(t){return t.checked=!1,t})}},watch:{opened:function(){var t=this;this.opened&&(this.isLoading=!0,0==o()(this.list).length||0==o()(this.list).length?Object(p.c)().then(function(e){(t.isLoading=!1,200==e.result.code)&&[].concat(e.data).forEach(function(e,s){var i=t.formatDate(e.sdate),n=i.ymd,a=i.time;o()(t.list).some(function(t){return n==t})||t.$set(t.list,n,[]),e.time=a,t.list[n].push(e)})}):this.isLoading=!1)}},components:{EmptyPage:l.a,Checked:u}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("action-sheet",{directives:[{name:"show",rawName:"v-show",value:t.opened,expression:"opened"}],staticClass:"action-sheet",attrs:{data:t.list,fullParent:!0,position:t.position,scrollerStyle:t.scrollerStyle},on:{close:t.close}},[s("div",{staticClass:"item-box"},t._l(t.list,function(e,i){return s("div",{key:i},[s("div",{staticClass:"date-node"},[t._v(t._s(i))]),t._l(e,function(e,i){return s("div",{key:i},[s("div",{staticClass:"class-item",on:{click:function(s){t.chooseStudent(e)}}},[s("div",{staticClass:"class-item-first-child"},[s("span",{staticClass:"class-name"},[t._v(t._s(e.classname))]),1==e.issend?s("span",{staticClass:"class-status"},[t._v("已发送")]):t._e()]),s("div",[s("span",[t._v(t._s(e.time))]),s("span",[s("svg",{staticClass:"icon card-next",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-youjiantou"}})])])])])])})],2)})),0==Object.keys(this.list).length?s("empty-page",{staticClass:"noData-temp",attrs:{type:1001,text:"没有找到班级哦"}}):t._e(),s("loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"loading"})],1),s("Checked",{ref:"checked",attrs:{opened:t.checked,checkList:t.temp.list,header:t.temp.classname},on:{"update:opened":function(e){t.checked=e},getStudentList:t.getStudentList}})],1)},staticRenderFns:[]};var g={name:"public-page",data:function(){return{wxTitle:"发布作业",selectClass:{onSelect:!1,list:{}},acceptStudent:"",acceptStudentList:[],title:"",content:"",voice:{},imgUploadOp:{add:[],del:[]},voiceUploadOp:{add:[],del:[]},isFile:0,contentType:0,media_ids:"",media_url:"",actionSheet:{open:!1},prevTime:0,clientType:"wx"==app.env?0:1,isLoading:!1}},computed:{richHtml:function(){return{content:this.content,imgs:this.imgUploadOp.add,voice:this.voiceUploadOp.add}}},methods:{closeClassAction:function(){this.selectClass.onSelect=!0},getAccpets:function(t){t.chooseNum>0?(this.acceptStudentList=[t],this.acceptStudent=t.classname+" ("+t.chooseNum+") 名学生"):(this.acceptStudentList=[],this.acceptStudent="")},opened:function(t){this.actionSheet.open=t},voiceFinished:function(t,e){this.voiceUploadOp.add=t},imageFinished:function(t,e){this.imgUploadOp.add=t},addHomeworkFn:function(){var t=this;if(!((new Date).getTime()-this.prevTime<1e3))if(0!=this.acceptStudentList.length&&0!=this.acceptStudentList.chooseNum)if(0!=this.title.length)if(this.title.length>50)app.toast("info","标题长度不超过50。");else{var e=[],s=0;this.voiceUploadOp.add.forEach(function(t){return e.push(t.promise)}),this.imgUploadOp.add.forEach(function(t){return e.push(t.promise)}),0!=this.content.length||0!=e.length?(this.isLoading=!0,1==this.clientType&&(s=this.voiceUploadOp.add.length),e.length>0?(this.contentType=3,this.isFile=1,n.a.all(e).then(function(e){var i=[],n=[];e.forEach(function(e,a){0==t.clientType?i.push(e):s-1<a?n.push(e):i.push(e)}),t.media_ids=i.join(","),1==t.clientType&&(t.media_url=n.join(",")),t.send()}).catch(function(t){app.toast("error","上传附件失败，请在网络畅通时重新尝试。")})):(this.contentType=0,this.isFile=0,this.prevTime=(new Date).getTime(),this.send())):app.toast("info","请输入作业内容。")}else app.toast("info","请输入标题。");else app.toast("info","请选择接收人。")},send:function(){var t=this,e={clientType:this.clientType,subject:this.title,content:app.tool.arrowFilter(this.content),contenttype:this.contentType,mediaids:this.media_ids,mediaurl:this.media_url,isfile:this.isFile,studentids:this.acceptStudentList,messageid:""};Object(p.g)(e).then(function(e){200==e.result.code?(app.eventDefine.emit("refresh-homework-list"),app.toast("success","发送成功。"),t.$router.back()):app.toast("error",e.errmsg),setTimeout(function(){t.isLoading=!1},300)})}},components:{ClassList:s("VU/8")(m,f,!1,function(t){s("/HA3")},"data-v-cf564aee",null).exports}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"homework-add"},[s("div",{staticClass:"body"},[s("scroller-base",{staticClass:"scroller",attrs:{data:t.richHtml}},[s("div",{staticClass:"s-body"},[s("div",{staticClass:"flex-space-between"},[s("span",[t._v("接收人")]),s("span",{on:{click:t.closeClassAction}},[s("span",{staticClass:"right-span"},[t._v("\n\t\t\t\t\t"+t._s(""!=t.acceptStudent?t.acceptStudent:"请选择")+"\n\t\t\t\t\t")]),s("svg",{staticClass:"icon card-next",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-youjiantou"}})])])]),s("div",{staticClass:"flex-space-between add-title"},[s("span",[t._v("标题")]),s("span",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{type:"text",placeholder:"请输入标题"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})])]),s("div",{staticClass:"add-content"},[s("div",{staticClass:"txt"},[s("div",[t._v("内容")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{name:"input-text",id:"",cols:"30",rows:"10",placeholder:"写点什么吧！"},domProps:{value:t.content},on:{touchmove:[function(t){t.stopPropagation()},function(e){t.app.area.move(e)}],touchstart:function(e){t.app.area.start(e)},touchend:function(e){t.app.area.end(e)},input:function(e){e.target.composing||(t.content=e.target.value)}}})]),s("div",{staticClass:"voice"},[s("voice-recording",{attrs:{edit:!0},on:{voiceFinished:t.voiceFinished}})],1),s("div",{staticClass:"img-box"},[s("img-area",{attrs:{imageMaxNum:9},on:{imageFinished:t.imageFinished}})],1)])])])],1),s("div",{staticClass:"bottom-fixed-button"},[s("button",{on:{click:t.addHomeworkFn}},[t._v("提交")])]),s("loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"loading",attrs:{bgType:1}}),s("ClassList",{attrs:{opened:t.selectClass.onSelect},on:{"update:opened":function(e){t.$set(t.selectClass,"onSelect",e)},getAccpets:t.getAccpets}})],1)},staticRenderFns:[]};var x=s("VU/8")(g,v,!1,function(t){s("oNLY")},"data-v-3e145796",null);e.default=x.exports},Yixk:function(t,e){},app8:function(t,e,s){"use strict";e.e=function(t){return i.a.smajax("gethomeworkforteacher",t)},e.d=function(t){return i.a.smajax("gethomeworkdetailforteacher",t)},e.c=function(t){return i.a.smajax("getcoursestudentforhomework")},e.g=function(t){return i.a.smajax("ophomework",t)},e.a=function(t){return i.a.smajax("deletehomework",t)},e.f=function(t){return i.a.smajax("getmessagereadinfos",t)},e.b=function(t){return i.a.smajax("evalhomework",t)};var i=s("6PB2")},azor:function(t,e,s){t.exports=s.p+"static/img/007.4037d25.png"},bwys:function(t,e,s){t.exports=s.p+"static/img/1000.a245c1e.png"},croJ:function(t,e,s){t.exports=s.p+"static/img/005.c11bf0d.png"},fZjL:function(t,e,s){t.exports={default:s("jFbC"),__esModule:!0}},jFbC:function(t,e,s){s("Cdx3"),t.exports=s("FeBl").Object.keys},nMbT:function(t,e,s){t.exports=s.p+"static/img/1001.d7ee272.png"},oNLY:function(t,e){},"uNq/":function(t,e,s){t.exports=s.p+"static/img/002.0fbc03b.png"},uqUo:function(t,e,s){var i=s("kM2E"),n=s("FeBl"),a=s("S82l");t.exports=function(t,e){var s=(n.Object||{})[t]||Object[t],o={};o[t]=e(s),i(i.S+i.F*a(function(){s(1)}),"Object",o)}},wYIz:function(t,e,s){t.exports=s.p+"static/img/404.49a5047.png"}});