webpackJsonp([3],{"++6+":function(t,e,s){t.exports=s.p+"static/img/005.bb17b7e.png"},"1Jsg":function(t,e,s){t.exports=s.p+"static/img/006.a81724e.png"},"40Bx":function(t,e,s){t.exports=s.p+"static/img/010.18a9f49.png"},"4IyY":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("Dd8w"),a=s.n(i),n=s("KHXw"),r=s("CHm6"),o=s("BEBN"),c={name:"order-list",data:function(){return{headerList:["全部","待付款","已付款","已关闭"],stype:-1,list:[],isLoading:!0,isPaySkip:!1,wxTitle:"我的订单",pagingOption:{api:o.o,params:{},autoLoadFirst:!1},queryPara:[{Status:null,IsExpired:null,IsComment:null},{Status:1,IsExpired:!1,IsComment:null},{Status:[2,3],IsExpired:null,IsComment:null},{Status:[2,3],IsExpired:null,IsComment:!1}],timeout:null}},computed:a()({},Vuex.mapState(["config","orderListRefreshFlag"])),methods:a()({},Vuex.mapMutations(["set_userPageRefreshFlag"]),{getAmount:function(t){var e=0;return t.Items.forEach(function(t){1==t.Type||3==t.Type?e+=1:2==t.Type&&(e+=parseInt(t.Amount))}),e},getStatusStr:function(t){return 0==t.Status?"交易关闭":1==t.Status?t.IsExpired?"交易过期":"等待付款":2==t.Status||3==t.Status?"交易成功":void 0},changeStatus:function(t){this.stype=t},renderData:function(t){var e=this;t.then(function(t){e.isLoading=!1,t.ErrorCode==app.errok&&(1===t.PageIndex&&(e.list=[]),e.list=e.list.concat(t.Data),clearTimeout(e.timeout),0!=e.stype&&1!=e.stype||e._diffOrderTime())})},gotoDetail:function(t){this.$router.push({path:"/orderDetail/"+t})},deleteOrder:function(t,e){var s=this,i=["关闭","删除"],a=0==t?o.r:o.s;app.confirm("确定"+i[t]+"该订单吗？").then(function(n){!0===n&&a({ID:e}).then(function(e){e.ErrorCode==app.errok?(app.toast("success",i[t]+"订单成功。"),s.renderPage()):app.toast("error",e.ErrorMsg)})})},payOrder:function(t){var e=this;this.isPaySkip||(this.isPaySkip=!0,Object(o.p)({ID:t}).then(function(t){if(t.ErrorCode==app.errok)try{document.getElementById("wxData").value=t.Data.WXData,document.getElementById("wxPayForm").action=t.Data.PayURL,document.getElementById("wxPayForm").submit()}catch(t){app.toast("error",t.message)}else 423==t.ErrorCode?app.alert("您有一笔未支付未过期的预制订单，可前往“师生信->个人中心->预制订单”进行支付。"):t.ErrorMsg&&app.toast("error",t.ErrorMsg);e.isPaySkip=!1}))},renderPage:function(){this.isLoading=!0,this.list=[],this.$refs.pagingScroller.refresh(this.queryPara[this.stype]),this.set_userPageRefreshFlag()},_diffOrderTime:function(){var t=this;this.timeout=setTimeout(function(){var e=0;t.list.forEach(function(s,i){1!=s.Status||s.IsExpired||(e++,s.ExpiredSeconds--,s.ExpiredSeconds<=0&&(s.IsExpired=!0,1==t.stype&&t.list.splice(i,1)))}),e>0?t._diffOrderTime():clearTimeout(t.timeout)},1e3)}}),created:function(){var t=this;this.stype=parseInt(this.$route.params.status)+1>3?0:parseInt(this.$route.params.status)+1,app.event.on("appActive",function(e,s){var i=s.diffTime;t.list.forEach(function(e,s){1!=e.Status||e.IsExpired||(e.ExpiredSeconds-=i,e.ExpiredSeconds<=0&&(e.IsExpired=!0,1==t.stype&&t.list.splice(s,1)))})})},beforeDestroy:function(){app.event.off("appActive")},watch:{stype:function(t,e){this.renderPage()},orderListRefreshFlag:function(t,e){this.renderPage()}},components:{OrderCard:n.a,EmptyPage:r.a}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-list"},[s("div",{staticClass:"header"},t._l(t.headerList,function(e,i){return s("router-link",{key:i,staticClass:"header-item-wrap",attrs:{tag:"div",to:"/orderList/"+i,replace:""},nativeOn:{click:function(e){t.changeStatus(i)}}},[s("div",{staticClass:"header-item",class:{active:i===t.stype}},[t._v(t._s(e))])])})),s("div",{staticClass:"body"},[s("scroller-super",{ref:"pagingScroller",staticClass:"scroller",attrs:{type:2,data:t.list,pagingOption:t.pagingOption},on:{loadData:t.renderData}},[s("div",{staticClass:"void"}),t._l(t.list,function(e){return s("div",{staticClass:"card"},[s("div",{staticClass:"card-hd"},[s("span",{staticClass:"campus"},[t._v(t._s(e.CampusName))]),s("span",{staticClass:"card-hd-r"},[1!=e.Status||e.IsExpired?t._e():s("span",{staticClass:"time"},[s("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-riqiicon"}})]),t._v("剩"+t._s(t._f("formatSeconds")(e.ExpiredSeconds))+"\n\t\t\t\t\t\t\t")]),e.ErrorMessage?s("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-quanjutishijinggao"}})]):t._e(),s("span",{staticClass:"status"},[t._v(t._s(t.getStatusStr(e)))])])]),s("div",{staticClass:"card-bd",on:{click:function(s){t.gotoDetail(e.ID)}}},t._l(e.Items,function(i){return 1==e.Type?s("div",[s("order-card",{attrs:{product:i,type:1,campus:e}})],1):t._e()})),s("div",{staticClass:"card-ft"},[s("div",{staticClass:"total"},[s("span",{staticClass:"inline-block"},[t._v("共"+t._s(t.getAmount(e))+"件商品 ")]),e.IsPreMoney?s("span",{staticClass:"inline-block"},[t._v("定金：\n                                "),s("span",{staticClass:"money"},[t._v("¥"+t._s(t._f("formatNumber")(e.PreMoney)))])]):t._e(),s("span",{staticClass:"inline-block"},[t._v("\n                                实付款："),s("span",{staticClass:"money"},[t._v("¥"+t._s(t._f("formatNumber")(e.PayMoney)))])])]),s("div",[Math.random()>.3?s("span",{staticClass:"btn default",on:{click:function(s){t.payOrder(e.ID)}}},[t._v("立即支付")]):t._e(),Math.random()>.6?s("span",{staticClass:"btn default1",on:{click:function(s){t.deleteOrder(0,e.ID)}}},[t._v("关闭订单")]):t._e()])]),s("div",{staticClass:"void"})])}),0===t.list.length?s("empty-page",{staticClass:"noData_temp",attrs:{type:5}}):t._e()],2)],1),s("loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"loading"})],1)},staticRenderFns:[]};var d=s("VU/8")(c,p,!1,function(t){s("p65n")},"data-v-39f4b84c",null);e.default=d.exports},BFOb:function(t,e,s){t.exports=s.p+"static/img/008.1fcbced.png"},CHm6:function(t,e,s){"use strict";var i=s("cfO4"),a=s.n(i),n=s("FY0F"),r=s.n(n),o=s("tT1C"),c=s.n(o),p=s("kkZd"),d=s.n(p),u=s("MEQb"),l=s.n(u),g=s("y0RW"),h=s.n(g),m=s("rbbm"),f=s.n(m),v=s("++6+"),x=s.n(v),y=s("1Jsg"),_=s.n(y),C=s("l8Qa"),b=s.n(C),E=s("BFOb"),w=s.n(E),I=s("YS88"),S=s.n(I),k=s("40Bx"),D=s.n(k),P=s("TXKF"),O=s.n(P),F={name:"empty-page",props:{type:{default:1}},data:function(){return{pages:{no404:{img:r.a,width:294,height:204,text:"抱歉，您找的页面可能去睡觉了"},no1000:{img:a.a,width:294,height:254,text:""},no0:{img:c.a,width:291,height:253,text:"商城已经打烊了"},no1:{img:d.a,width:200,height:270,text:"暂无结果，试试别的关键词吧"},no2:{img:l.a,width:200,height:270,text:"快来做第一个评论的人吧～"},no3:{img:h.a,width:200,height:270,text:"快来做第一个提问的人吧～"},no4:{img:f.a,width:292,height:253,text:"没有找到您心仪的商品，更换个条件试试吧"},no5:{img:x.a,width:412,height:253,text:"您的订单记录空空如也～"},no6:{img:_.a,width:290,height:252,text:"暂无优惠券哦～"},no7:{img:b.a,width:291,height:254,text:"除了我以外就没有别的喜欢的吗～"},no8:{img:w.a,width:290,height:252,text:"这里一个地址也没有～"},no9:{img:S.a,width:292,height:145,text:"没有找到您心仪的班级，更换个条件试试吧"},no10:{img:D.a,width:292,height:253,text:"商品卖完了，想买要趁早哦！"},no11:{img:O.a,width:290,height:253,text:"暂无商品，请到别的地方看看吧！"},no12:{img:O.a,width:290,height:253,text:"暂无结果，请到别的地方看看吧！"}}}},computed:{page:function(){var t=this.pages["no"+this.type];return{class:"img"+this.type,style:{width:t.width/2+"px",height:t.height/2+"px",backgroundImage:"url("+t.img+")"},text:t.text}}}},T={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"empty-box"},[e("div",{staticClass:"empty-img",class:this.page.class,style:this.page.style}),e("div",{staticClass:"empty-tips"},[this._v(this._s(this.page.text))])])},staticRenderFns:[]};var M=s("VU/8")(F,T,!1,function(t){s("RqME")},"data-v-2993be6c",null);e.a=M.exports},FY0F:function(t,e,s){t.exports=s.p+"static/img/404.49a5047.png"},KHXw:function(t,e,s){"use strict";var i={name:"order-card",props:{product:{type:Object,default:null},campus:{type:Object,default:null}},methods:{gotoDetail:function(t){}},mounted:function(){window.b=this}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-card",on:{click:function(e){t.gotoDetail(t.product)}}},[s("div",{staticClass:"row-hd"},[s("span",{staticClass:"row-hd-l",style:"background-image:url("+t.product.Image+")"}),t._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row-hd-r"},[e("div",{staticClass:"name"},[this._v("2019春硬币书法初级班（周一到周刘10：30，周四到周五2：30，周三到周吧9：30）")]),e("div",{staticClass:"content"},[e("div",[e("label",[this._v("规格：")]),this._v("10课时\n\t\t\t\t")])]),e("div",{staticClass:"detail"},[e("span",[e("span",{staticClass:"price"},[this._v("\n\t\t\t\t\t\t¥25."),e("span",{staticClass:"small"},[this._v("00")])])])])])}]};var n=s("VU/8")(i,a,!1,function(t){s("crgJ")},"data-v-e714891e",null);e.a=n.exports},MEQb:function(t,e,s){t.exports=s.p+"static/img/002.0b83c59.png"},RqME:function(t,e){},TXKF:function(t,e,s){t.exports=s.p+"static/img/011.74326b2.png"},YS88:function(t,e,s){t.exports=s.p+"static/img/009.a401fd9.png"},cfO4:function(t,e,s){t.exports=s.p+"static/img/1000.30cdd05.png"},crgJ:function(t,e){},kkZd:function(t,e,s){t.exports=s.p+"static/img/001.de905a8.png"},l8Qa:function(t,e,s){t.exports=s.p+"static/img/007.e462516.png"},p65n:function(t,e){},rbbm:function(t,e,s){t.exports=s.p+"static/img/004.0fbc03b.png"},tT1C:function(t,e,s){t.exports=s.p+"static/img/000.438402b.png"},y0RW:function(t,e,s){t.exports=s.p+"static/img/003.3e0fba5.png"}});