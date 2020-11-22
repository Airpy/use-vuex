> 官方文档路径：https://vuex.vuejs.org/zh/

# 一、Vuex简单介绍

大家可直接打开[官网](https://vuex.vuejs.org/zh/)，原文解释的很清晰。

## 1. 单向数据流
- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

以上模型在**多组件共享状态**时，单向数据流的简洁性很容易被破坏

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

## 2. Vuex的实现原理

总结一句话：**将组件的共享状态抽象出来，并使用单例模式管理**

也许，你们看到这儿，可能还一头雾水。没关系，下面我会展开讲解：

- 不使用Vuex的代码是怎么写的？可能会有什么问题？
- 使用Vuex的代码是怎么写的？
- Vuex的各组成部分是怎么用的？



# 二、不使用Vuex的代码怎么写？

> 准备工作：全局安装脚手架`npm install @vue/cli -g`

可直接访问[github](https://github.com/Airpy/use-vuex/tree/not-use-vuex)(**注意是`not-use-vuex`分支**)去`star`or`fork`代码查看，个人比较建议查看，因为从项目中的不足才能知道Vuex的伟大之处。

```markdown
> 本分支主要介绍在不适用`Vuex`插件时，项目中会遇到哪些问题。

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

下文将开始逐步展开，介绍Vuex中的几大组成部分及怎么使用。

# 三、Vuex的使用

> main分支主要是将多个子分支进行整合

- `not-use-vuex`分支是介绍不使用`vuex`时的代码怎么写，会遇到什么问题
- `use-state-mutations`分支是介绍使用`state`、`mutations`功能
- `use-getters`分支是介绍使用`getters`功能
- `use-actions`分支是介绍使用`actions`功能



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

## 4. `state`及`mutations`的使用

### 1. 创建`state`及`mutations`

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

### 2. 使用`state`及`mutations`

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

### 3. 上述使用`state`及`mutations`的完整代码

点击(`use-state-mutations`分支)：[github](https://github.com/Airpy/use-vuex/tree/use-state-mutations)

## 5. `getters`的使用

### 1. 创建`getters`

1. 使用`getters`能解决什么问题？

我们可以在视图中对`store`中的`state`，在`computed`计算属性中处理，如：

```js
export default {
  name: 'Tab',
  // 引入计算属性
  computed: {
    ......
    tabContent () {
      return `标签[${this.$store.state.curIdx}]的内容: [${this.$store.state.content}]`
    }
  },
}
```

然后在`template`中以`{{ tabContent }}`方式使用。但如果多个子组件均需用到`tabContent`，若以以上写法则需要在不同的子组件中都定义该计算属性，造成代码冗余。

2. 创建`getters`

```js
// @/store/index.js
......
export default new Vuex.Store({
  // 可以理解为`store`的计算属性
  getters: {
    tabContent: (state) => {
      return `标签[${state.curIdx}]的内容: [${state.content}]`
    }
  }
	......
})
```

### 2. 使用`getters`

1. 在需要使用`getters`的视图中(`vue`文件)引入

```js
import { mapGetters } from 'vuex';
```

2. 取出`store`中的`getters`

```js
// @/components/Page/index.vue
export default {
  name: 'Page',
  computed: {
    ......
    // 通过mapGetters取出指定getters
    ...mapGetters(['tabContent'])
  }
  ......
}
```

因为在`main.js`中注册了`store`选项，故该store实例会注入到所有的子组件中，子组件可通过`this.$store.getters`获取到`getters`值，如下：

```js
// @/components/Page/index.vue
export default {
  name: 'Page',
  computed: {
		......
    tabContents () {
      return this.$store.getters.tabContent
    }
  }
  ......
}
```

3. 新的getters中使用已存在的getters

```js
// @/store/index.js
export default new Vuex.Store({
  ......
  // 可以理解为`store`的计算属性
  getters: {
    ......
    // 在新的getters中可以使用已存在的getters
    useExistGetters: (state, getters) => {
      return getters.tabContent.length
    }
  }
})
```

4. 如何给getters传参

```js
// @/store/index.js
export default new Vuex.Store({
  ......
  // 可以理解为`store`的计算属性
  getters: {
    ......
    // getters返回函数类型，实现可传参的getters
    gettersByParam: (state) => (anotherContent) => {
      return `标签[${state.curIdx}]的内容: [${state.content}]，额外的内容为: ${anotherContent}`
    }
  }
})
// 使用
computed: {
  ......
  anotherContent () {
    return this.$store.getters.gettersByParam('vuejs超简单')
  }
}
```

### 3. 上述使用`getters`的完整代码

点击点击(`use-getters`分支)：[github](https://github.com/Airpy/use-vuex/tree/use-getters)

## 6. `actions`的使用

`actions`的出现在于`异步请求`时使用，而`mutations`是在`同步请求`时使用。

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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Feedback',
  // 当子组件被挂载时,去派发actions去后台请求数据
  mounted () {
    // 派发使用dispatch方法，第一个参数为actions的名称，第二个为可选参数
    this.$store.dispatch('getFeedbackData', {
      page: 1,
      limit: 10
    }),
    // 调用method完成绑定
    // 个人建议：在有参数的派发actions时，使用以上方法更为简便一点。
    this.getFeedbackData({
      page: 1,
      limit: 10
    })
  },
  // 获取state中的值
  computed: {
    ...mapState(['feedbackData'])
  },
  methods: {
    // 也可以使用mapActions派发
    ...mapActions(['getFeedbackData'])
  }
}
</script>
```

## 7. 精简项目

目前，我们将`state`、`mutations`、`getters`、`actions`都放在一个文件中，这样不利于维护，且显得结构较乱。我们可以将属于`state`、`mutations`、`getters`、`actions`拆分成多个文件，然后在引入就行了。

下面以`state`为例，我们在`store`文件夹下新增`state.js`

```js
export default {
  curIdx: 1,
  content: 'vuex学习',
  feedbackData: []
}
```

然后在`@/store/index.js`中引入

```js
// @/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';

// Vuex对于Vue来说相当于是一个插件
Vue.use(Vuex)

export default new Vuex.Store({
  // 存储一些需要集中管理的状态(state)
  state,
	......
})
```

## 8. `Modules`的使用

当遇到比较大型的项目，需要按`模块module`来区分`store`时较为清晰，每个模块有自己的state/mutations/actions/getters。

以下为官网例子：

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

当多个模块中使用到相同名称的state、mutations等，则需要使用`命名空间`

```js
// @store/module1/state.js
export default {
  curIdx: 1
}

// @store/module1/mutations.js
export default {
  setCurIdx(state, index) {
    state.curIdx = index
  },
}

// @store/module1/index.js
import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';

Vue.use(Vuex)

export default {
  namespaced: true,  // 这边指定为true，表示使用命名空间
  state,
  mutations,
})
```

在视图中使用

```js
import { mapState, mapMutations } from 'vuex'

......
computed: {
  ...mapState('module1', {  // 指定命名空间的名称,一般为文件夹的名称
    curIdx: (state) => state.curIdx
  })
},
methods: {
  ...mapMutations('module1', ['setCurIdx'])
}
```


