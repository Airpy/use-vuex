export default {
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
}