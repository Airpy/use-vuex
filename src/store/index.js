import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

// Vuex对于Vue来说相当于是一个插件
Vue.use(Vuex)

export default new Vuex.Store({
  // 存储一些需要集中管理的状态(state)
  state,
  // 存储一些提交(commit)状态的方法
  mutations,
  // 可以理解为`store`的计算属性
  getters,
  // 若是异步操作更改state的在这边添加
  actions
})
