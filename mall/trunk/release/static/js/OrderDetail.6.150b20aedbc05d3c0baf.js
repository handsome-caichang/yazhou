webpackJsonp([6],{KHXw:function(t,e,a){"use strict";var s={name:"order-card",props:{product:{type:Object,default:null},campus:{type:Object,default:null}},methods:{gotoDetail:function(t){}},mounted:function(){window.b=this}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order-card",on:{click:function(e){t.gotoDetail(t.product)}}},[a("div",{staticClass:"row-hd"},[a("span",{staticClass:"row-hd-l",style:"background-image:url("+t.product.Image+")"}),t._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row-hd-r"},[e("div",{staticClass:"name"},[this._v("2019春硬币书法初级班（周一到周刘10：30，周四到周五2：30，周三到周吧9：30）")]),e("div",{staticClass:"content"},[e("div",[e("label",[this._v("规格：")]),this._v("10课时\n\t\t\t\t")])]),e("div",{staticClass:"detail"},[e("span",[e("span",{staticClass:"price"},[this._v("\n\t\t\t\t\t\t¥25."),e("span",{staticClass:"small"},[this._v("00")])])])])])}]};var i=a("VU/8")(s,r,!1,function(t){a("crgJ")},"data-v-e714891e",null);e.a=i.exports},QKiW:function(t,e,a){t.exports=a.p+"static/img/1.3584684.png"},Qian:function(t,e,a){t.exports=a.p+"static/img/4.03daf85.png"},crgJ:function(t,e){},fzLP:function(t,e,a){t.exports=a.p+"static/img/2.37a0d4a.png"},hNkX:function(t,e,a){t.exports=a.p+"static/img/loading-bars.a208839.svg"},lBve:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),r=a.n(s),i=a("BEBN"),d=a("KHXw"),n=a("hNkX"),o=a.n(n),c=a("QKiW"),l=a.n(c),u=a("fzLP"),v=a.n(u),p=a("Qian"),m=a.n(p),f={name:"order-detail",data:function(){return{isPaySkip:!1,orderDetailSucssBg:l.a,orderDetailClose:v.a,orderDetailWait:m.a,loadingSvg:o.a,isLoadingDetail:!1,isLoadingPay:!1,Order:null,queryPara:null,wxTitle:"订单详情",timeout:null,qrUrl:"",InvoiceCode:"",InvoiceEndTime:""}},computed:r()({},Vuex.mapState(["config","orderDetailRefreshFlag"])),methods:r()({},Vuex.mapMutations(["set_orderListRefreshFlag","set_orderDetailRefreshFlag"]),{getStatusStr:function(t){return 0==t.Status?"交易关闭":1==t.Status?t.IsExpired?"交易过期":"等待付款":2==t.Status||3==t.Status?"交易成功":void 0},gotoComment:function(t){this.$router.push({path:"/orderComment",query:{orderId:t,type:2}})},payOrder:function(t){var e=this;this.isPaySkip||(this.isPaySkip=!0,Object(i.p)({ID:t}).then(function(t){if(t.ErrorCode==app.errok)try{document.getElementById("wxData").value=t.Data.WXData,document.getElementById("wxPayForm").action=t.Data.PayURL,document.getElementById("wxPayForm").submit()}catch(t){app.toast("error",t.message)}else 423==t.ErrorCode?app.alert("您有一笔未支付未过期的预制订单，可前往“师生信->个人中心->预制订单”进行支付。"):t.ErrorMsg&&app.toast("error",t.ErrorMsg);e.isPaySkip=!1}))},closeOrder:function(t){var e=this;app.confirm("确定关闭该订单吗？").then(function(a){!0===a&&Object(i.r)({ID:t}).then(function(t){t.ErrorCode==app.errok?(app.toast("success","关闭订单成功。"),e.set_orderDetailRefreshFlag(),e.set_orderListRefreshFlag()):app.toast("error",t.ErrorMsg)})})},_getOrderDetail:function(t,e){var a=this;this.isLoadingDetail=!0,Object(i.n)({ID:this.$route.params.id}).then(function(t){a.isLoadingDetail=!1,t.ErrorCode==app.errok&&(a.Order=t.Data,a.InvoiceCode=a.Order.InvoiceCode?a.Order.InvoiceCode:"",a.InvoiceEndTime=a.Order.InvoiceEndTime?a.Order.InvoiceEndTime:"",clearTimeout(a.timeout),1!=a.Order.Status||a.Order.IsExpired||a._diffOrderTime())})},_isFinish:function(t){var e=this,a=this;Object(i.k)({ID:t}).then(function(s){s.ErrorCode==app.errok?s.Data?(e.isLoadingPay=!1,a._getOrderDetail(e.queryPara.orderId)):setTimeout(function(){a._isFinish(t)},2e3):(e.isLoadingPay=!1,app.toast("error",s.ErrorMsg))})},_diffOrderTime:function(){var t=this;this.timeout=setTimeout(function(){t.Order.ExpiredSeconds--,t.Order.ExpiredSeconds<=0?(t.Order.IsExpired=!0,clearTimeout(t.timeout)):t._diffOrderTime()},1e3)}}),created:function(){var t=this;if(this.queryPara=this.$route.query,this.queryPara.isPay&&1==this.queryPara.isPay)return this.isLoadingPay=!0,void this._isFinish(this.queryPara.orderId);this._getOrderDetail(this.queryPara.orderId),app.event.on("appActive",function(e,a){var s=a.diffTime;t.Order.ExpiredSeconds-=s,t.Order.ExpiredSeconds<=0&&(t.Order.IsExpired=!0)})},beforeDestroy:function(){app.event.off("appActive")},watch:{orderDetailRefreshFlag:function(t,e){this._getOrderDetail(this.queryPara.orderId)}},components:{OrderCard:d.a}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order-detail"},[a("scroller-base",{staticClass:"scroller",attrs:{data:t.Order}},[t.Order?a("div",[t.Order.ErrorMessage?a("div",{staticClass:"order-err"},[a("div",{staticClass:"title"},[t._v("支付成功(有异常)")]),a("div",{staticClass:"desc"},[t._v(t._s(t.Order.ErrorMessage)+" 请联系校方处理。")])]):"交易成功"==t.getStatusStr(t.Order)?a("div",{staticClass:"status",style:"backgroundImage:url("+t.orderDetailSucssBg+")"},[a("div",{staticClass:"desc"},[t._v(t._s(t.getStatusStr(t.Order)))])]):0==t.Order.Status||1==t.Order.Status&&t.Order.IsExpired||2==t.Order.Status||3==t.Order.Status?a("div",{staticClass:"status",style:"backgroundImage:url("+t.orderDetailClose+")"},[a("div",{staticClass:"desc"},[t._v(t._s(t.getStatusStr(t.Order)))])]):1!=t.Order.Status||t.Order.IsExpired?t._e():a("div",{staticClass:"status",style:"backgroundImage:url("+t.orderDetailWait+")"},[a("div",{staticClass:"title"},[t._v("等待付款")]),a("div",{staticClass:"time"},[t._v(t._s(t._f("formatSeconds")(t.Order.ExpiredSeconds))+"后订单关闭")])]),a("div",{staticClass:"void"}),a("div",{staticClass:"card"},[a("div",{staticClass:"card-title"},[a("span",[t._v("使用学员："+t._s(t.Order.StudentName))]),a("span",{staticClass:"phone"},[t._v("13585652585")])]),a("div",{staticClass:"void"}),a("div",{staticClass:"campus-info"},[t._v("\n                        长沙市岳麓区望月湖中心校区\n                    ")]),a("div",{staticClass:"card-hd"},t._l(t.Order.Items,function(e){return a("div",[a("order-card",{attrs:{product:e,campus:t.Order}})],1)})),a("div",{staticClass:"card-bd"},[a("div",{staticClass:"card-bd-item"},[a("div",{staticClass:"card-bd-item-l"},[t._v("商品总额 "),a("span",{staticClass:"spec"},[t._v("（共1件商品）")])]),a("div",{staticClass:"card-bd-item-r"},[t._v("¥35.00")])]),a("div",{staticClass:"card-bd-item"},[a("div",{staticClass:"card-bd-item-l"},[t._v("积分抵扣 "),a("span",{staticClass:"spec"},[t._v("(可用3000积分抵扣)")])]),a("div",{staticClass:"card-bd-item-r"},[t._v("-¥30.00")])]),a("div",{staticClass:"card-bd-item"},[a("div",{staticClass:"card-bd-item-l"},[t._v("订单金额")]),a("div",{staticClass:"card-bd-item-r"},[t._v("¥1855.00")])]),a("div",{staticClass:"card-bd-item"},[a("div",{staticClass:"card-bd-item-l"},[t._v("微信支付")]),a("div",{staticClass:"card-bd-item-r red"},[t._v("¥855.00")])])])]),a("div",{staticClass:"void"}),a("div",{staticClass:"info"},[a("div",{staticClass:"info-bd"},[a("div",{staticClass:"info-bd-item"},[a("label",[t._v("订单编号：")]),t._v(t._s(t.Order.OrderNumber)+"\n                        ")]),a("div",{staticClass:"info-bd-item"},[a("label",[t._v("下单时间：")]),t._v(t._s(t._f("formatDatetime")(t.Order.Date,"yyyy-MM-dd hh:mm:ss"))+"\n                        ")]),a("div",{staticClass:"info-bd-item"},[a("label",[t._v("支付时间：")]),t._v(t._s(t._f("formatDatetime")(t.Order.PayDateTime,"yyyy-MM-dd hh:mm:ss"))+"\n                        ")]),a("div",{staticClass:"info-bd-item"},[a("label",[t._v("支付流水号：")]),t._v("12358524456644\n                        ")]),a("div",{staticClass:"info-bd-item"},[a("label",[t._v("买家留言：")]),t._v("时间端氨基酸看了觉得拉丝机达拉斯的垃圾上单拉萨看得见快乐\n                        ")])])]),1==t.Order.Status?a("div",{staticClass:"operate"},[t.Order.IsExpired?t._e():a("span",{staticClass:"btn",on:{click:function(e){t.payOrder(t.Order.ID)}}},[t._v("立即支付")]),a("span",{staticClass:"btn1",on:{click:function(e){t.closeOrder(t.Order.ID)}}},[t._v("关闭订单")])]):t._e()]):t._e()]),t.isLoadingDetail?a("loading"):t._e(),t.isLoadingPay?a("div",{staticClass:"pay-loading"},[a("span",{staticClass:"loading-img",style:"backgroundImage:url("+t.loadingSvg+")"}),a("p",{staticClass:"loading-tips"},[t._v("正在处理，请稍后...")])]):t._e()],1)},staticRenderFns:[]};var C=a("VU/8")(f,_,!1,function(t){a("wuBr")},"data-v-06ce036e",null);e.default=C.exports},wuBr:function(t,e){}});