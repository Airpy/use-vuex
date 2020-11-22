import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// Vuex对于Vue来说相当于是一个插件
Vue.use(Vuex)

export default new Vuex.Store({
  // 存储一些需要集中管理的状态(state)
  state: {
    curIdx: 1,
    content: 'vuex学习',
    feedbackData: []
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
    },
    // 测试actions功能,将后台接口返回的数据填充到state中
    setFeedbackData(state, data) {
      state.feedbackData = data
    }
  },
  // 可以理解为`store`的计算属性
  getters: {
    tabContent: (state) => {
      return `标签[${state.curIdx}]的内容: [${state.content}]`
    },
    // 在新的getters中可以使用已存在的getters
    useExistGetters: (state, getters) => {
      return getters.tabContent.length
    },
    // getters返回函数类型，实现可传参的getters
    gettersByParam: (state) => (anotherContent) => {
      return `标签[${state.curIdx}]的内容: [${state.content}]，额外的内容为: ${anotherContent}`
    }
  },
  actions: {
    // 定义actions，在actions中提交mutations
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    // 可调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters
    getFeedbackData(context, payload) {
      const { page, limit } = payload
      axios(
        `http://xxx/api/quality/feedback/?page=${page}&limit=${limit}`
      ).then((res) => {
        // 提交mutations
        context.commit('setFeedbackData', res.data)
      })
    }
  }
})
