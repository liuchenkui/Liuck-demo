import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false // 侧边切换
  },
  getters: {
  },
  mutations: {
    // 改变侧边状态
    changeIsCollapse(state){
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
  },
  modules: {
  }
})
