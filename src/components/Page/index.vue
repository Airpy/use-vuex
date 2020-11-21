<template>
  <div>
    标签[{{ curIdx }}]的内容: [{{ content }}]
    <br />
    以下为使用getters的用法
    <br />
    {{ tabContent }}
    <br />
    {{ tabContents }}
    <br />
    {{ anotherContent }}
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Page',
  computed: {
    ...mapState(['curIdx', 'content']),
    // 通过mapGetters取出指定getters
    ...mapGetters(['tabContent']),
    // 也可以通过`this.$store.getters`取出getters,如下
    tabContents () {
      return this.$store.getters.tabContent
    },
    anotherContent () {
      return this.$store.getters.gettersByParam('vuejs超简单')
    }
  }
  // props: {
  //   curIdx: Number
  // }
}
</script>

<style>
</style>
