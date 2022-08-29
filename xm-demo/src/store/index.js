import Vue from 'vue'
import Vuex from 'vuex'
import per from "vuex-persistedstate"
// import cart from "./module/cart"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[per()],
  state: {
    LoginDialog: false, // 登录弹窗
    DialogId: 0, // 切换登录注册
    user: {
      // 本地user
      userName: "",
      user_id: "",
    },
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
    cartCheckPrice(state){
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
    // 打开注册/登录弹框
    openLoginDialog(state,id) {
      state.DialogId = id;
      state.LoginDialog = true;
    },
    // 清除 购物车数据
    locageClear(state){
      state.cartList = []
      localStorage.clear()
    }
  },
  actions: {
  },
  modules: {
  }
})
