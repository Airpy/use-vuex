<template>
  <div id="app">
    <tab
      :curIdx='curIdx'
      @changeParentTab='changeTab'
    ></tab>
    <page :curIdx=curIdx></page>
  </div>
</template>

<script>
import Tab from '@/components/Tab';
import Page from '@/components/Page';

export default {
  name: 'App',
  components: {
    Tab,
    Page
  },
  data () {
    return {
      curIdx : 1
    }
  },
  methods : {
    changeTab (index) {
      this.curIdx = index
    }
  }
}
</script>
