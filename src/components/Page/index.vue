<template>
  <div>
    标签[{{ curIdx }}]的内容
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    curIdx: Number
  }
}
</script>

<style>
</style>
