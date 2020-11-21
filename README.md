> `main`分支主要是将多个子分支进行整合

# `not-use-vuex`分支主要介绍不使用`vuex`插件的写法，介绍项目的优缺点，方便后续展开
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

# `use-state-mutations`分支主要介绍在使用`state`及`mutations`时项目的变化