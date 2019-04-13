// 数据相关
const DataState = {
    // 配置项
    config: {},

    // 微信的appID
    wxAppId: "",

    // 系统后缀
    companySuffix: "",

    // 客服列表
    agent: [],

    // 可选校区列表
    campuslist: [],

    // 用户基本信息
    userInfo: {},

    // 当前选中校区,形式如下：
    curCampus: {
        id: "",
        name: "请选择校区"
    },

    // 用户收货地址列表
    addressList: [],

    // 购物车
    appCart: -1,
    // 购物车商品金额显示
    cartTotalMoney: 0,
    // 购物车加载遮罩显示
    appCartLoadingFlag: false,
    // 收藏列表
    appFavorite: [],

    // 是否需要刷新收货地址列表
    addrListRefreshFlag: -1,
    // 是否需要刷新购物车
    cartListRefreshFlag: -1,
    // 是否需要刷新"我的"界面
    userPageRefreshFlag: -1,
    // 是否需要刷新"订单列表"界面
    orderListRefreshFlag: -1,
    // 是否需要刷新"订单详情"界面
    orderDetailRefreshFlag: -1,

    // 订单结算界面：收货地址
    orderAddress: {},
    // 购物车界面：已选择的校区及商品信息
    appCartCampus: {
        ID: "",
        Name: "",
        Products: []
    },
    // 商品详情界面：直接购买的校区及商品信息
    goodsDetailCampus: {
        ID: "",
        Name: "",
        Products: []
    },

    seatPosition: {},
    //所选课程的绑定物品
    classBingds: [],

    //用户所选支付方式 1为全额 2为定金
    detailChoicePayType: null,
    //物品商品数量
    detailGoodsNum: null,
    //选择物品规格
    detailGoodsSpec: [],
    //物品sku信息
    detailSpecsObj: {},

    // 购物车数据
    vaildCartList: [], //购物车有效商品列表
    expiredCartList: [], //无效商品列表

    // 注册时的注册用户名,用于实现注册后在登陆页面实现联动;
    // registerName: ""
    // 注册得到的注册用户对象,用于实现注册后在登陆页面实现联动;
    registerUser: {},
    companyId: "", //公司id
};
// UI界面展示相关
const UIState = {
    // app是否启动完成
    appInited: false,

    // 控制app.vue页面里的'full-block'是否显示;
    serverBlock: false,

    // 是否要展示欢迎页
    // showWelcome: false

    // 在单次路由切换过程中，'popstate'事件触发的次数；
    // popstateNum: 0,
    // 在单次路由切换过程中，是更新了当前路由还是跳转了路由；
    // type取值：'goto'表示跳转到新路由、'update'表示更新当前路由 
    // routeType: '',
}


const state = {
    ...DataState,
    ...UIState
}

export default state