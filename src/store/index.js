import Vue from 'vue';
import Vuex from 'vuex';

// Vuex对于Vue来说相当于是一个插件
Vue.use(Vuex)

export default new Vuex.Store({
  // 存储一些需要集中管理的状态(state)
  state: {
    curIdx: 1,
    content: 'vuex学习'
  },
  // 存储一些提交(commit)状态的方法
  mutations: {
    // state是固定入参，其携带state中的所有属性
    // index为形参，告诉mutations将state修改成什么值
    setCurIdx(state, index) {
      state.curIdx = index
    },
    // 当提交过来的数据是个对象时,则需要使用payload来装载
    setMoreStates(state, payload) {
      state.curIdx = payload.index
      state.content = payload.content
    }
  }
})