export default {
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
}
