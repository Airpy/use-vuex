> `actions`的出现在于`异步请求`时使用，而`mutations`是在`同步请求`时使用。

`actions`的使用步骤为：
1. 从视图中先派发`dispatch`指定`actions`
2. `actions`调用后台API`Backend API`
3. `actions`拿到接口返回的数据，提交`commit`变更给`mutations`
4. `mutations`进行`state`状态的修改**（这边的流程与上方的`muatations`用法相同）**

### 1. 创建`actions`

```js
// @/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

// Vuex对于Vue来说相当于是一个插件
Vue.use(Vuex)

export default new Vuex.Store({
  // 存储一些需要集中管理的状态(state)
  state: {
    ......
    feedbackData: []
  },
  // 存储一些提交(commit)状态的方法
  mutations: {
    ......
    // 测试actions功能,将后台接口返回的数据填充到state中
    setFeedbackData(state, data) {
      state.feedbackData = data
    }
  },
  // 可以理解为`store`的计算属性
  getters: {
    ......
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
```

### 2. 使用`actions`
注意，这边用到了`axios`，需要`npm i axios -S`安装

```js
// @/components/Feedback/index.vue
<template>
  <div>
    {{ feedbackData }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Feedback',
  // 当子组件被挂载时,去派发actions去后台请求数据
  mounted () {
    // 派发使用dispatch方法，第一个参数为actions的名称，第二个为可选参数
    this.$store.dispatch('getFeedbackData', {
      page: 1,
      limit: 10
    })
  },
  // 获取state中的值
  computed: {
    ...mapState(['feedbackData'])
  }
}
</script>

```