<template>
  <div>
    标签[{{ curIdx }}]的内容: [{{ content }}]
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Page',
  computed: {
    ...mapState(['curIdx', 'content'])
  }
  // props: {
  //   curIdx: Number
  // }
}
</script>

<style>
</style>
