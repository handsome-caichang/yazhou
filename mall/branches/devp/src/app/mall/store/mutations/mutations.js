/* 数据相关 */
// 配置项
export const set_config = function(state, param) {
    state.config = param;
}

// 配置项
export const set_wxAppId = function(state, wxappid) {
    state.wxAppId = wxappid;
}

// 公司后缀
export const set_companySuffix = function(state, val) {
    state.companySuffix = val;
}

// 客服列表
export const set_agent = function(state, list) {
    state.agent = list;
}

// 可选校区列表
export const set_campuslist = function(state, list) {
    state.campuslist = list;
}

// 用户基本信息
export const set_userInfo = function(state, info) {
    state.userInfo = info;
}

// 当前选中校区
export const set_curCampus = function(state, campus) {
    if (campus.id && campus.name) {
        state.curCampus = campus;
    } else {
        console.log(`修改当前校区的'mutation'传入格式不正确...`);
    }
}

// 用户收货地址
export const set_addressList = function(state, list) {
    state.addressList = list;
}

// 购物车列表
export const set_appCart = function(state, param) {
    state.appCart = param;
}

// 收藏列表
export const set_appFavorite = function(state, param) {
    state.appFavorite = param;
}

// 购物车商品金额显示
export const set_cartTotalMoney = function(state, param) {
    state.cartTotalMoney = param;
}

// 购物车加载遮罩显示
export const set_appCartLoadingFlag = function(state, param) {
    state.appCartLoadingFlag = param;
}

// 设置收货地址页面是否刷新
export const set_addrListRefreshFlag = function(state) {
    state.addrListRefreshFlag += 1;
}

// 购物车页面是否刷新
export const set_cartListRefreshFlag = function(state) {
    state.cartListRefreshFlag += 1;
}

// 是否需要刷新"我的"界面
export const set_userPageRefreshFlag = function(state) {
    state.userPageRefreshFlag += 1;
}

// 是否需要刷新"订单列表"界面
export const set_orderListRefreshFlag = function(state) {
    state.orderListRefreshFlag += 1;
}

// 是否需要刷新"订单详情"界面
export const set_orderDetailRefreshFlag = function(state) {
    state.orderDetailRefreshFlag += 1;
}

// 设置确认订单界面的地址
export const set_orderAddress = function(state, param) {
    state.orderAddress = param;
}

// 购物车界面：已选择的校区及商品信息
export const set_appCartCampus = function(state, param) {
    state.appCartCampus = param;
}

// 商品详情界面：直接购买的校区及商品信息
export const set_goodsDetailCampus = function(state, param) {
    state.goodsDetailCampus = param;
}

// 获取用户行、列对象
export const set_seatPosition = function(state, seatObj) {
    state.seatPosition = seatObj;
}
//设置用户选择物品规格
export const set_goodsPesc = function(state, param) {
    state.goodPesc = param;
}

//设置用户选择课程绑定物品
export const set_classBingds = function(state, param) {
    state.classBingds = param;
}

//设置用户选择课程支付方式
export const set_detailChoicePayType = function(state, param) {
    state.detailChoicePayType = param;
}

//设置物品商品数量
export const set_detailGoodsNum = function(state, num) {
    state.detailGoodsNum = num;
}

//设置物品商品规格
export const set_detailGoodsSpec = function(state, arr) {
    state.detailGoodsSpec = arr;
}

//设置物品sku信息
export const set_detailSpecsObj = function(state, obj) {
    state.detailSpecsObj = obj;
}

// 购物车数据-有效商品
export const set_vaildCartList = function(state, param) {
    // if (state.vaildCartList.length == param){
    //     for (let index = 0; index < state.vaildCartList.length; index++) {
    //         const element = state.vaildCartList[index];
    //         if (element.ID == param[index].ID) {
    //             element.Products = param;[index].Products;;
    //         }
    //     }
    // }else {
        state.vaildCartList = param;
    // }
}

// 购物车数据-失效商品
export const set_expiredCartList = function(state, param) {
    state.expiredCartList = param;
}

// 注册时的注册用户名
export const set_registerUser = function(state, user) {
    state.registerUser = user;
}

// 公司ID
export const set_companyId = function(state, id) {
    state.companyId = id;
}


/* UI界面展示相关 */
// 控制app.vue页面里的'full-block'是否显示;
export const set_serverBlock = function(state, Boolean) {
    console.log("Abc....................................");
    state.serverBlock = Boolean;
}

// app是否启动完成
export const set_appInited = function(state, Boolean) {
    state.appInited = Boolean;
}


// 是否要展示欢迎页
// export const set_showWelcome = function (state, Boolean) {
//     state.showWelcome = Boolean;
// }


// 在单次路由切换过程中，'popstate'事件触发的次数；
// export const set_popstateNum = function(state, type) {
//     if (type === 'add') {
//         state.popstateNum += 1;
//     }
//     if (type === 'reset') {
//         state.popstateNum = 0;
//     }
//     if (type === 'popstate-stop') {
//         state.popstateNum = -1;
//     }
// }

// 在单次路由切换过程中，是更新了当前路由还是跳转了路由；
// type取值：'goto'表示跳转到新路由、'update'表示更新当前路由 
// export const set_routeType = function(state, type) {
//     state.routeType = type;
// }