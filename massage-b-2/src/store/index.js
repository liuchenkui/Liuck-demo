import Vue from 'vue'
import Vuex from 'vuex'
import tab from "./tab"
Vue.use(Vuex)

export default new Vuex.Store({
  namespace:true,
  state: {
    tags: [],
    arr: [],
    fullscreen:false
  },
  getters: {
  },
  mutations: {
    // 删除tag标签
    delTag(state,index){
      state.arr.splice(index,1)
      state.tags.splice(index,1)
    },
    // 添加tag标签
    handleSelect(state,obj) {
      state.arr.unshift(obj)
      state.tags = [...new Set(state.arr)]
    },
  },
  actions: {
  },
  modules: {
    tab
  }
})
