webpackJsonp([23],{"5xHY":function(t,e,i){t.exports=i.p+"static/img/login.1e377aa.png"},ZuCC:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Dd8w"),a=i.n(s),r=i("BEBN"),n=i("5xHY"),o=i.n(n),u={name:"login",mixins:[app.mixin.shareMixin],data:function(){return{wxTitle:"手机商城",uname:"",pwd:"",loginBg:o.a,isLoading:!1}},computed:a()({},Vuex.mapState(["config","companySuffix","registerUser"]),{isActive:function(){return this.uname.length>0&&this.pwd.length>0},compCanRegist:function(){return 1==this.config.RegistLimit||2==this.config.LoginMode}}),methods:a()({},Vuex.mapMutations(["set_userInfo","set_addressList","set_cartListRefreshFlag","set_userPageRefreshFlag"]),{gotoPage:function(){var t=this,e=[];for(var i in app.mallApp.allPages)"login"!==i&&"register"!==i&&app.mallApp.allPages[i]&&e.push(i);e.length>0?this.$router.back():setTimeout(function(){t.$router.replace("/")},600)},loginSubmit:function(t){var e=this;this.isActive&&(this.isLoading=!0,Object(r.N)({LoginName:this.uname,Password:this.pwd}).then(function(t){e.isLoading=!1,t.ErrorCode==app.errok?(e.set_userInfo(t.Data),e._updateInfo(),e.gotoPage()):app.toast("error",t.ErrorMsg)}))},_updateInfo:function(){var t=this;Object(r.j)().then(function(e){e.ErrorCode==app.errok&&t.set_addressList(e.Data)}),this.set_cartListRefreshFlag(),this.set_userPageRefreshFlag()},autoLogin:function(){this.registerUser.SSXUserName&&this.registerUser.SSXUserPwd&&(this.uname=this.registerUser.SSXUserName,this.pwd=this.registerUser.SSXUserPwd,this.loginSubmit())}}),created:function(){window.a=this,this.autoLogin()},watch:{$route:function(t,e){var i=this;"register"===e.name&&setTimeout(function(){i.autoLogin()},300)}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"login",style:"backgroundImage:url("+t.loginBg+")"},[i("scroller-base",{staticClass:"scroller"},[i("div",[i("div",{staticClass:"title"},[i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-denglu"}})])]),i("div",{staticClass:"form"},[i("div",{staticClass:"form-item"},[i("div",{staticClass:"form-item-bd"},[i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-wode"}})]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.uname,expression:"uname"}],attrs:{type:"text",placeholder:"用户名"},domProps:{value:t.uname},on:{input:function(e){e.target.composing||(t.uname=e.target.value)}}})]),i("div",{staticClass:"form-item-ft"},[t._v("@"+t._s(t.companySuffix))])]),i("div",{staticClass:"form-item"},[i("div",{staticClass:"form-item-bd"},[i("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-mima"}})]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.pwd,expression:"pwd"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value)}}})])]),i("div",{staticClass:"form-btn",class:{active:t.isActive},on:{click:function(e){t.loginSubmit(e)}}},[t._v("登 录")]),t.compCanRegist?t._e():i("div",{staticClass:"form-tips"},[t._v("您还没有注册？\n\t\t\t\t\t"),i("router-link",{attrs:{to:"/register"}},[t._v(" 注册 ")])],1)])])]),t.isLoading?i("loading",{attrs:{bgType:1}}):t._e()],1)},staticRenderFns:[]};var l=i("VU/8")(u,c,!1,function(t){i("bSeY")},"data-v-a1f55742",null);e.default=l.exports},bSeY:function(t,e){}});