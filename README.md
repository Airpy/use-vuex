> `main`分支主要是将多个子分支进行整合

# 1. `not-use-vuex`分支主要介绍不使用`vuex`插件的写法，介绍项目的优缺点，方便后续展开
```markdown
> 本分支主要介绍在不使用`Vuex`插件时，项目中会遇到哪些问题。

# 项目概览
![若图片打不开,图片在@/img/summary.png](https://github.com/Airpy/use-vuex/tree/not-use-vuex/src/img/summary.jpg)

# 实现了什么功能
1. 页面展示两个tab标签
2. 支持切换标签，并根据标签展示对应标签的内容(**这是本项目的重点**)

# 关键实现点
1. `@/Components/Tab/index.vue`:接收父组件`@/App.vue`传过来的`CurIdx`参数；点击时向父组件传递`changeParentTab`点击事件
2. `@/App.vue`：接收`changeParentTab`点击事件做`CurIdx`参数值的变更
3. `@/Components/Page/index.vue`:接收父组件`@/App.vue`变更过来的`CurIdx`参数，显示对应标签的内容

# 本项目中的特点:
1. `App`组件中的`curIdx`属性，被`Page`和`Tab`两个组件共享
2. `Tab`组件无法直接更改`curIdx`属性值，是通过向父组件传递时间通知父组件更改`curIdx`属性值，最后将`curIdx`属性值传递给`Page`组件
3. `Page`和`Tab`两个组件之间无法直接对`curIdx`属性值传递，是通过父`App`组件桥梁传递

# 本项目中的缺点：
1. 共性的数据(state)无法统一管理或管理麻烦
2. 兄弟组件无法直接更改数据
```

# 2. `use-state-mutations`分支主要介绍在使用`state`及`mutations`时项目的变化

> 本分支主要介绍在使用`Vuex`插件的`state`及`mutations`的方法

## 1. 安装Vuex

如果使用`@vue/cli`脚手架创建的项目，且初始化时已选择`Vuex`组件，则无需再次安装，若没有，则：

```bash
# 在not-use-vuex根目录下
npm i vuex -S
```

此时在`package.json`中新增：

```json
{
  "dependencies": {
    ......
    "vue-router": "^3.2.0",
    "vuex": "^3.5.1"
  },
}
```

## 2. 新建`store`

在`use-vuex`根目录新建目录`store`，表示该目录下存储一些状态(`state`)的容器。

```js
// @/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

// Vuex对于Vue来说相当于是一个插件
Vue.use(Vuex)

export default new Vuex.Store({
  // 存储一些需要集中管理的状态(state)
  state: {},
  // 存储一些提交(commit)状态的方法
  mutations: {}
})
```

## 3. `main.js`中引入`store`

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

## 4. 创建`state`及`mutations`

我们知道，`curIdx`参数在`APP.vue`、`Tab/index.vue`、`Page/index.vue`中都有使用，故`curIdx`需要被统一管理。

```js
// @/store/index.js
......
export default new Vuex.Store({
  // 存储一些需要集中管理的状态(state)
  state: {
    curIdx: 1,
    content: ''
  },
	......
})
```

现在，我们需要一个可以修改状态的方法。整合成的代码如下：

```js
// @/store/index.js
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
```

那么，我们怎么在视图中使用`state`？我们如何调用`mutations`来更改`state`？

## 5. 使用`state`及`mutations`

1. 在需要使用`state`及`mutations`的视图中(`vue`文件)引入

```js
import { mapState, mapMutations } from 'vuex';
```

2. 若想取出`state`中的某个状态值

```js
// @/components/Tab/index.vue
export default {
  ......
  // 引入计算属性
  computed: {
    // 通过mapState取出指定state的值(curIdx为state的属性名称)
    ...mapState(['curIdx'])
  },
  ......
}
```

因为在`main.js`中注册了`store`选项，故该store实例会注入到所有的子组件中，子组件可通过`this.$store.state`获取到`state`值，如下：

```js
// @/components/Tab/index.vue
export default {
  ......
  // 引入计算属性
  computed: {
    ......
    // 也可以通过`this.$store.state`取出state属性值,如下
    curIdx () {
      return this.$store.state.curIdx
    }
  },
  ......
}
```

3. 若想取出`mutations`中的某个方法（进而修改state状态）

```js
// @/components/Tab/index.vue
export default {
  ......
  methods: {
    // 通过mapMutations取出指定mutations的方法(setCurIdx为mutations的方法名称)
    ...mapMutations(['setCurIdx'])
  }
  ......
}
```

同样的，在子组件中，`mutations`也可以通过`this.$store.commit('mutations的方法名', '可选的参数值')`，如下：

```js
// @/components/Tab/index.vue
export default {
  ......
  methods: {
    ......
    // 也可以通过`this.$store.commit('mutations的方法名', '可选的参数值')`提交state的更改，如下
    changeTab (index) {
      this.$store.commit('setCurIdx', index)
    },
    // 提交的数据为对象类型时的方法
    changeContent (index) {
      this.$store.commit('setMoreStates', {
        index: index,
        content: '傻瓜式学习vuex'
      })
    }
  }
  ......
}
```

4. 使用`state`及`mutations`

```js
// @/components/Tab/index.vue
<template>
  <div>
    <a
      href="javascript:;"
      :class="[{current: curIdx === 1}]"  // 因为属性名仍为curIdx,故不需要修改
      @click="setCurIdx(1)"  // 将changeTab改为引入的setCurIdx，提交更改state
    >标签1</a>
    <a
      href="javascript:;"
      :class="[{current: curIdx === 2}]"
      @click="changeTab(2)"  // 使用changeTab
    >标签2</a>
    <a
      href="javascript:;"
      :class="[{current: curIdx === 3}]"
      @click="changeContent(3)"  // 修改page的内容
    >切换后修改page内容</a>
  </div>
</template>
```

5. `@/components/Page/index.vue`、`@/App.vue`以同样的方法修改，此处省略

## 6. 上述使用`state`及`mutations`的完整代码

点击：[github](https://github.com/Airpy/use-vuex/tree/use-state-mutations)

