import axios from 'axios';

export default {
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