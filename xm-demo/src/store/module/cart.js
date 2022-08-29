export default ({
    state: {
        cartList: [], // 购物车数据
        checkAll: false, // 购物车全选
    },
    getters: {
        // 全部商品数量
        cartNum(state) {
            let num = 0;
            state.cartList.forEach(item => {
                num += item.num
            })
            return num
        },
        // 选中商品数量
        cartCheckNum(state) {
            let num = 0;
            state.cartList.forEach(item => {
                if (item.check) {
                    num += item.num
                }
            })
            return num
        },
        // 选中商品价格
        cartCheckPrice(state) {
            let price = 0;
            state.cartList.forEach(item => {
                if (item.check) {
                    price += item.num + item.price
                }
            })
            return price
        }

    },
    mutations: {
        // 全选
        changeCheck(state) {
            state.cartList.forEach(item => {
                item.check = state.checkAll
            })
        },
        // 全不选
        checkFlag(state) {
            state.checkAll = state.cartList.every(item => item.check)
        },
        // 购物车数据
        getCartList(state,arr) {
            state.cartList = arr
        },
    }
})