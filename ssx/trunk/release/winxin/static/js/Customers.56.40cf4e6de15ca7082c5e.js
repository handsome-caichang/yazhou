webpackJsonp([56],{"S3P+":function(t,a,i){"use strict";a.b=function(t){return s.a.ajax("/weixin/teacher/Process.ashx",t)},a.d=function(t){return s.a.ajax("/weixin/teacher/Process.ashx",t)},a.e=function(t){return s.a.ajax("/weixin/teacher/Save.ashx",t)},a.a=function(t){return s.a.ajax("/api/Dictionary/Get",t)},a.c=function(t){return s.a.ajaxGet("/api/MasterReport/GetShiftType",t)};var s=i("6PB2")},Zmz3:function(t,a){},gqsT:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=i("Dd8w"),e=i.n(s),r=i("S3P+"),n={data:function(){return{customerDetail:{}}},methods:e()({},Vuex.mapMutations(["set_customConfigInfo"]),{renderPage:function(){var t=this;Object(r.b)({pname:"mycustomer"}).then(function(a){a.errorCode!==app.errok&&a.errcode!==app.errok||(t.customerDetail=a.data)}),Object(r.b)({pname:"getcustomerdictionary"}).then(function(t){t.errcode===app.errok&&(app.customConfigInfo=t.data)})}}),created:function(){this.renderPage()}},o={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"wrapper"},[i("div",{staticClass:"heard"},[i("div",{staticClass:"title"},[t._v("我的客户(人)")]),i("div",{staticClass:"num"},[t._v(t._s(t.customerDetail.customer))])]),i("div",{staticClass:"void"}),i("router-link",{staticClass:"item",attrs:{tag:"div",to:"/addedToday"}},[i("div",{staticClass:"item-title"},[t._v("今日新增客户")]),i("div",{staticClass:"item-right"},[t._v("\n\t\t\t"+t._s(t.customerDetail.hasCommunication)+"\n\t\t\t"),i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-youjiantou"}})])])]),i("router-link",{staticClass:"item",attrs:{tag:"div",to:"/commCustomer/1"}},[i("div",{staticClass:"item-title"},[t._v("今日待沟通客户")]),i("div",{staticClass:"item-right"},[t._v("\n\t\t\t"+t._s(t.customerDetail.newcustomer)+"\n\t\t\t"),i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-youjiantou"}})])])]),i("router-link",{staticClass:"item",attrs:{tag:"div",to:"/commCustomer/2"}},[i("div",{staticClass:"item-title"},[t._v("今日已沟通客户")]),i("div",{staticClass:"item-right"},[t._v("\n\t\t\t"+t._s(t.customerDetail.quasiCommunication)+"\n\t\t\t"),i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-youjiantou"}})])])]),i("div",{staticClass:"void"}),i("router-link",{staticClass:"item",attrs:{tag:"div",to:"/customerManger"}},[i("div",{staticClass:"item-title"},[t._v("客户管理")]),i("div",[i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-youjiantou"}})])])]),i("router-link",{staticClass:"item",attrs:{tag:"div",to:"/customerFollowUp"}},[i("div",{staticClass:"item-title"},[t._v("跟进统计")]),i("div",[i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-youjiantou"}})])])]),i("router-link",{staticClass:"item",attrs:{tag:"div",to:"/customerAnalyse"}},[i("div",{staticClass:"item-title"},[t._v("客户分析")]),i("div",[i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-youjiantou"}})])])]),i("router-link",{staticClass:"bottom",attrs:{tag:"div",to:{path:"/addCustomer"}}},[t._v("添加客户")])],1)},staticRenderFns:[]};var c=i("VU/8")(n,o,!1,function(t){i("Zmz3")},"data-v-1fc19f86",null);a.default=c.exports}});