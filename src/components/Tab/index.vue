<template>
  <div>
    <a
      href="javascript:;"
      :class="[{current: curIdx === 1}]"
      @click="setCurIdx(1)"
    >标签1</a>
    <a
      href="javascript:;"
      :class="[{current: curIdx === 2}]"
      @click="changeTab(2)"
    >标签2</a>
    <a
      href="javascript:;"
      :class="[{current: curIdx === 3}]"
      @click="changeContent(3)"
    >切换后修改page内容</a>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Tab',
  // 引入计算属性
  computed: {
    // 通过mapState取出指定state的值(curIdx为state的属性名称)
    ...mapState(['curIdx']),
    // 也可以通过`this.$store.state`取出state属性值,如下
    // curIdx () {
    //   return this.$store.state.curIdx
    // }
  },
  // props: {
  //   curIdx: Number
  // },
  methods: {
    // 当点击时，向父组件传递一个事件，事件名为changeParentTab，同时将index作为参数带过去
    // changeTab (index) {
    //   this.$emit('changeParentTab', index)
    // }
    // 通过mapMutations取出指定mutations的方法(setCurIdx为mutations的方法名称)
    ...mapMutations(['setCurIdx']),
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
}
</script>

<style>
a {
  margin-right: 10px;
}
.current {
  text-decoration: none;
  color: #000;
}
</style>
