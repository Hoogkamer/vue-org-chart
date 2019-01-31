<template lang='pug'>
  .p-container
    page-header
    .container1(id='xparent')
      org-chart(v-if="chart")
    side-screen(v-if='chart')
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import OrgChart from '~/components/OrgChart.vue'
import SideScreen from '~/components/SideScreen.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    OrgChart,
    PageHeader,
    SideScreen
  },
  computed: {
    ...mapState(['chart'])
  },
  mounted: function() {
    this.initStore()
  },
  methods: {
    ...mapActions(['initStore'])
  }
}
</script>

<style scoped>
</style>
