webpackJsonp([54],{"7H9m":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("S3P+"),s={data:function(){return{list:[],scrollNum:0,longContentFlag:[],pagingOption:{api:n.d,params:{pname:"querycommunication"},pageOpt:{indexKey:"page",indexVal:1,sizeKey:"pageSize",sizeVal:20,countKey:"pageCount"}},dateObj:{sdate:"2017-12-26",edate:"2017-12-26"},quickDateIndex:-1}},methods:{isShowToday:function(t){if(t){var a=(new Date).getFullYear(),e=(new Date).getMonth(),n=(new Date).getDay(),s=new Date(t).getFullYear(),i=new Date(t).getFullYear(),o=new Date(t).getFullYear();return s===a&&i===e&&o===n}return!1},isShowAll:function(t){return t.length>80},changeContent:function(t,a){this.scrollNum++,t.longContentFlag=!t.longContentFlag,t.longContentFlag?t.longContent=t.Content.substr(0,80)+"...":t.longContent=t.Content},loadData:function(t){var a=this;t.then(function(t){t.errcode==app.errok&&(1===t.pageIndex&&(a.list=[]),t.data.forEach(function(t,e){t.Content.length>80&&(a.$set(t,"longContentFlag",!0),t.longContent=t.Content.substr(0,80)+"...")}),a.list=a.list.concat(t.data))})},changeDate:function(t){this.dateObj.sdate=t.sdate,this.dateObj.edate=t.edate,this.quickDateIndex=t.index,this.isLoading=!0,this.$refs.communicationListScroll.refresh(this.dateObj)}},computed:{scrollData:function(){return{list:this.list,scrollNum:this.scrollNum}}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"heard"},[e("div",{staticClass:"date-filter"},[e("date-bar",{attrs:{sdate:t.dateObj.sdate,edate:t.dateObj.edate,index:t.quickDateIndex},on:{changeDate:t.changeDate}})],1)]),e("div",{staticClass:"void"}),e("div",{staticClass:"list-body"},[e("scroller-super",{ref:"communicationListScroll",staticClass:"scroller",attrs:{type:2,data:t.scrollData,pagingOption:t.pagingOption},on:{loadData:t.loadData}},[e("div",t._l(t.list,function(a,n){return e("div",{staticClass:"card"},[e("div",{staticClass:"card-heard"},[e("div",{staticClass:"heard-left"},[e("div",{staticClass:"icon",style:"background-image:url("+a.Photo+")"}),e("div",[e("div",{staticClass:"name"},[t._v(t._s(a.UserName))]),e("div",{staticClass:"info"},[t.isShowToday(a.CreateTime)?e("span",{staticClass:"today"},[t._v("今天")]):t._e(),t.isShowToday(a.CreateTime)?t._e():e("span",{staticClass:"day"},[t._v(t._s(a.CreateTime))]),e("span",{staticClass:"some"},[t._v(t._s(a.Mode))])])])]),e("div",{staticClass:"heard-right"},[t._v("无效沟通\n                            "),e("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-xingxingxuanzhong"}})])])]),e("div",{staticClass:"card-body"},[e("div",{staticClass:"body-content"},[t._v(t._s(a.Content.length>80?a.longContent:a.Content))]),e("div",{staticClass:"body-info"},[t._v("\n                            下次跟进："+t._s(a.NextDate)+" "+t._s(a.NextMode)+"\n                            "),t.isShowAll(a.Content)?e("span",{staticClass:"spec",on:{click:function(e){t.changeContent(a,n)}}},[t._v(t._s(a.longContentFlag?"全文":"收起"))]):t._e()]),e("div",{staticClass:"body-info"},[t._v("\n                            到访日期：2091-2-2\n                        ")])]),t._e()])}))])],1),e("router-link",{staticClass:"bottom",attrs:{tag:"div",to:"/addCommunication/"+t.$route.params.id}},[t._v("添加沟通记录")])],1)},staticRenderFns:[]};var o=e("VU/8")(s,i,!1,function(t){e("Xgmb")},"data-v-3fa31ef9",null);a.default=o.exports},"S3P+":function(t,a,e){"use strict";a.b=function(t){return n.a.ajax("/weixin/teacher/Process.ashx",t)},a.d=function(t){return n.a.ajax("/weixin/teacher/Process.ashx",t)},a.e=function(t){return n.a.ajax("/weixin/teacher/Save.ashx",t)},a.a=function(t){return n.a.ajax("/api/Dictionary/Get",t)},a.c=function(t){return n.a.ajaxGet("/api/MasterReport/GetShiftType",t)};var n=e("6PB2")},Xgmb:function(t,a){}});