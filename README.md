> `use-getters`分支主要介绍`getters`的常用用法

## 1. 创建`getters`

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

## 2. 使用`getters`

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

## 3. 上述使用`getters`的完整代码

点击：[github](https://github.com/Airpy/use-vuex/tree/use-getters)