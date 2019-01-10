<template lang='pug'>
  .p-container
    page-header(:page-title="'Organisation Chart'")
    .container1(id='xparent')
      org-chart(v-if="orgData" :org-data="orgData")
    side-screen
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import OrgChart from '~/components/OrgChart.vue'
import SideScreen from '~/components/SideScreen.vue'
import OrgStructure from '~/assets/data/OrgStructure.json'
import { mapState } from 'vuex'
export default {
  components: {
    OrgChart,
    PageHeader,
    SideScreen
  },
  data: function() {
    return {
      orgData: null
    }
  },
  computed: {
    ...mapState(['showSideScreen', 'chart'])
  },
  watch: {
    chart: function(val) {
      console.log('chart changed')
      setTimeout(x => {
        this.$store.commit('addLine')
      }, 500)
    }
  },
  mounted: function() {
    this.orgData = OrgStructure
    this.orgData.forEach(x => {
      this.$set(x, 'showChildren', false)
      this.$set(x, 'parent', null)
      this.$set(x, 'children', null)
      this.$set(x, 'isStaff', x.isStaff ? true : false)
      this.$set(x, 'description', '')
    })
    var that = this
    window.onresize = function(event) {
      that.$store.commit('removeLines')
      setTimeout(x => {
        that.$store.commit('addLine')
      }, 500)
    }
    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.$store.commit('cancelAll')
      }
    })
  },
  methods: {}
}
</script>

<style scoped>
.p-container {
  position: relative;
}
.container1 {
  min-height: 100vh;
  position: relative;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
