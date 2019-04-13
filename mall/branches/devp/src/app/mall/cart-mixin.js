// 购物车实例共共享数据的mixin

import {
    getAppCart,
    getFavorites,
    getMoneyInfoByParamters
} from "api/lc";

export const CartMixin = {
    data() {
        return {
            isChange: false
        }
    },
    computed: {
        ...Vuex.mapState([
            "config",
            "appCart",
            "vaildCartList",
            "appCartCampus",
            "cartListRefreshFlag",

        ]),
        vaildCart() {
            return app.tool.clone(this.vaildCartList);
        }
    },
    methods: {
        ...Vuex.mapMutations([
            "set_cartTotalMoney",
            "set_appCartLoadingFlag",
            "set_appCart",
            "set_appFavorite",
            "set_appCartCampus",
            "set_vaildCartList",
            "set_expiredCartList",
        ]),
        catPlay() {
            //购物车组件：根据订单创建参数获取订单金额（阻止两次请求）
            let products = [];

            this.appCartCampus.Products.forEach(p => {
                let classBindings = [],
                    clsInfo = p.ClassInfo,
                    goodsInfo = p.GoodsInfo,
                    shiftInfo = p.ShiftInfo,
                    pro = {
                        Type: p.Type, //商品类型 1-班级 2-物品
                        ProductID: p.ProductID, //商品ID
                        ShoppingCartID: p.ID, //购物车内商品ID
                        GoodsInfo: null, //物品信息
                        ClassInfo: null, //班级信息
                        ShiftInfo: null, //課程信息
                        IsPreMoney: p.IsPreMoney, //是否定金支付
                        SchemeID: ""
                    };

                if (p.ChooseScheme) {
                    pro.SchemeID = p.ChooseScheme.ID;
                }
                if (p.Type == 1) {
                    //班级类型->获取绑定物品
                    p.Bindings.forEach(binding => {
                        classBindings.push({
                            //绑定物品
                            ShoppingCartID: binding.ID, //购物车内ID
                            ProductID: binding.ProductID //商品ID
                        });
                    });
                    pro.ClassInfo = {
                        SeatRow: clsInfo.SeatRow, //座位行
                        SeatColumn: clsInfo.SeatColumn, //座位列
                        Bindings: classBindings, //绑定的物品
                        ShiftSpecID: p.ClassInfo.ShiftSpecID
                    };
                } else if (p.Type == 2) {
                    //物品类型
                    pro.GoodsInfo = {
                        Amount: goodsInfo.Amount, //数量
                        SpecID: goodsInfo.ProductSpecID //规格ID
                    };
                } else if (p.Type == 3) {
                    p.Bindings.forEach(binding => {
                        classBindings.push({
                            //绑定物品
                            ShoppingCartID: binding.ID, //购物车内ID
                            ProductID: binding.ProductID //商品ID
                        });
                    });
                    pro.ShiftInfo = {
                        'SeatRow': shiftInfo.SeatRow, //座位行
                        'SeatColumn': shiftInfo.SeatColumn, //座位列
                        'Bindings': classBindings, //绑定的物品
                        'ShiftSpecID': p.ShiftInfo.ShiftSpecID
                    }
                } else if (p.Type == 4) { // 特殊物品
                    pro.GoodsInfo = {
                        Amount: goodsInfo.Amount, //数量
                        SpecID: goodsInfo.ProductSpecID //规格ID
                    };
                }

                products.push(pro);
                // console.log(products);
            });

            if (products.length == 0) {
                //取消的时候，不发请求
                this.set_cartTotalMoney(0);
                return;
            }

            this.set_appCartLoadingFlag(true);
            getMoneyInfoByParamters({
                Products: products,
                CouponID: "", //优惠券ID
                IsUseReserveMoney: false, //是否自动扣减电子钱包ReserveMoneyReduce：1是（默认），0否
                ReceiveAddressID: "", //收货地址ID
                Remark: "", //订单备注
                PointToUse: 0,
                SchemeID: "",
                IsByShoppingCart: this.config.EnableChargeSubjectCompare == 1 ? true : false // 新增 续科 定制需求
            }).then(res => {
                this.set_appCartLoadingFlag(false);
                if (res.ErrorCode == app.errok) {
                    if (this.config.EnableChargeSubjectCompare == 1 && res.Data.MoneyInfo.ReloadSchemes && res.Data.MoneyInfo.ReloadSchemes.length > 0) {
                        // 新增 续科 定制需求
                        let flag = false;
                        let newVaildCartList = app.tool.clone(this.vaildCartList);  // 当前购物车的列表
                        let appCartCampus = app.tool.clone(this.appCartCampus.Products); // 用来存储后面重新插入vuex的数据
                        for (let index = 0; index < res.Data.MoneyInfo.ReloadSchemes.length; index++) {
                            const element = res.Data.MoneyInfo.ReloadSchemes[index];
                            newVaildCartList.forEach(item => {
                                // item 原来的， element 提交后后台给的
                                if (element.ID == item.ID) {
                                    // 校区ID
                                    element.Products.forEach(val => {
                                        item.Products.forEach(vals => {
                                            if (val.ID == vals.ID) {
                                                // 商品ID
                                                vals.Schemes.splice(0, vals.Schemes.length, ...val.Schemes);
                                                let flagScheme = false;
                                                // 选择的优惠
                                                if (vals.ChooseScheme && vals.ChooseScheme.ID) {
                                                    // 判断选中的优惠是否可用
                                                    vals.Schemes.forEach(v => {
                                                        if (v.ID == vals.ChooseScheme.ID) {
                                                            if (!v.IsCanUse) {
                                                                flagScheme = true;
                                                            }
                                                        }
                                                    })
                                                }
                                                flag = true;
                                                // 不可用替换  // 如果之前选择的是可以用的，但是有更加优惠的就改变
                                                if (flagScheme || !vals.isSelect) {
                                                    // vals.ChooseScheme = null;
                                                    let allflag = false;
                                                    for (let index = 0; index < vals.Schemes.length; index++) {
                                                        let scheme = vals.Schemes[index];
                                                        if (scheme.IsBest && scheme.IsCanUse) {
                                                            if (!vals.ChooseScheme || vals.ChooseScheme.ID != scheme.ID) {
                                                                // 判断原来选择的优惠和现在选择的优惠是否相同
                                                                vals.ChooseScheme = scheme;
                                                                this.isChange = true;
                                                                allflag = true;
                                                                appCartCampus.forEach(n => {
                                                                    if ( n.ID == vals.ID ) {
                                                                        n.ChooseScheme = vals.ChooseScheme;
                                                                    }
                                                                });
                                                                break;
                                                            } 
                                                        }
                                                        if (index == vals.Schemes.length - 1 && !allflag) {
                                                            console.log(vals);
                                                            if (flagScheme) {
                                                                vals.ChooseScheme = null;
                                                                this.isChange = true;
                                                                console.log('原来的不能用了');
                                                                appCartCampus.forEach(n => {
                                                                    if (n.ID == vals.ID) {
                                                                        n.ChooseScheme = null;
                                                                    }
                                                                });
                                                            }   
                                                        }
                                                    };
                                                }
                                            }
                                        });
                                    });
                                }
                            });
                        }
                        if (flag) {
                            this.set_vaildCartList(newVaildCartList);
                            if (this.isChange) { // 如果不相同的情况下，那么再次重新改变vuex里面的数据，从而实现再次调用接口
                                this.isChange = false; // 还原改变状态
                                let appCartCampuss = app.tool.clone(this.appCartCampus);
                                appCartCampuss.Products = appCartCampus;
                                this.set_appCartCampus(appCartCampuss);
                            }else {
                                this.set_cartTotalMoney(res.Data.MoneyInfo.Money);
                            }
                        }else {
                            this.set_cartTotalMoney(res.Data.MoneyInfo.Money);
                        }
                    }else {
                        this.set_cartTotalMoney(res.Data.MoneyInfo.Money);
                    }
                }
            });
          
        }
    },
    watch: {
        cartListRefreshFlag(newVal, oldVal) {
            //是否刷新购物车界面
            this.set_appCartLoadingFlag(true);
            Promise.all([
                getAppCart(),
                getFavorites({
                    PageIndex: 1,
                    PageSize: 4
                })
            ]).then(res => {
                this.set_appCartLoadingFlag(false);
                console.log(res);
                if (res[0].ErrorCode == app.errok && res[1].ErrorCode == app.errok) {
                    this.set_appCart(res[0].Data);
                    this.set_appFavorite(res[1].Data.slice(0, 4));
                    if (this.config.EnableSelectAllProductInShoppingCart == '1') {
                        if (res[0].Data.length > 0) {
                            this.set_appCartCampus(res[0].Data[0]);
                        }
                    }else {
                        this.set_appCartCampus({
                            ID: "",
                            Name: "",
                            Products: []
                        });
                    }
                }
            });
        },
        appCartCampus(newVal, oldVal) {
            this.catPlay();
        },
        appCart() {
            //处理数据：分类过期商品
            let valid = [],
                expired = [];
            if (this.appCart !== -1) {
                this.appCart.forEach(cam => {
                    let products = [],
                        expiredProducts = [];

                    cam.Products.forEach(pro => {
                        let product = app.tool.clone(pro);

                        if (product.IsExpired) {
                            expiredProducts.push(product);
                        } else {
                            if (product.Schemes.length > 0) {
                                //默认获取最优的优惠券
                                product.isSelect = false;
                                product.Schemes.forEach(scheme => {
                                    if (scheme.IsBest) {
                                        product.ChooseScheme = scheme;
                                    }
                                });
                            }

                            products.push(product);
                        }
                    });

                    if (products.length > 0) {
                        valid.push({
                            ID: cam.ID,
                            Name: cam.Name,
                            Products: products
                        });
                    }
                    if (expiredProducts.length > 0) {
                        expired.push({
                            ID: cam.ID,
                            Name: cam.Name,
                            Products: expiredProducts
                        });
                    }
                });
            }
            this.set_vaildCartList(valid);
            this.set_expiredCartList(expired);
        }
    },
    created() {
    },
};