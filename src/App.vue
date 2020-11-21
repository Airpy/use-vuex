<template>
  <div id="app">
    <!-- <tab
      :curIdx='curIdx'
      @changeParentTab='changeTab'
    ></tab>
    <page :curIdx=curIdx></page> -->
    <tab />
    <page />
  </div>
</template>

<script>
import Tab from '@/components/Tab';
import Page from '@/components/Page';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Tab,
    Page
  },
  computed: {
    ...mapState(['curIdx'])
  },
  // data () {
  //   return {
  //     curIdx : 1
  //   }
  // },
  methods : {
    // changeTab (index) {
    //   this.curIdx = index
    // }
    ...mapMutations(['setCurIdx'])
  }
}
</script>
