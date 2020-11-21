<template>
  <div>
    <a
      href="javascript:;"
      :class="[{current: curIdx === 1}]"
      @click="changeTab(1)"
    >标签1</a>
    <a
      href="javascript:;"
      :class="[{current: curIdx === 2}]"
      @click="changeTab(2)"
    >标签2</a>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    curIdx: Number
  },
  methods: {
    // 当点击时，向父组件传递一个事件，事件名为changeParentTab，同时将index作为参数带过去
    changeTab (index) {
      this.$emit('changeParentTab', index)
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
