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

<style>
</style>