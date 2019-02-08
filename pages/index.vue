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
    ...mapState(['chart', 'activeDepartment', 'onlyShowParents']),
    urlParam: function() {
      if (!this.activeDepartment) {
        return null
      }
      var type
      if (!this.activeDepartment.showParents) {
        type = 'hideParents'
      } else if (this.onlyShowParents) {
        type = 'onlyParents'
      } else {
        type = 'all'
      }
      return { dept: this.activeDepartment.id, type: type }
    }
  },
  watch: {
    urlParam(qry) {
      this.setUrl(qry)
    }
  },
  mounted: function() {
    this.initStore()
    this.getUrl(this.$route.query)
  },
  methods: {
    ...mapActions([
      'initStore',
      'setActiveDepartmentById',
      'setHideParents',
      'setOnlyShowParents'
    ]),
    setUrl: function(qry) {
      this.$router.push({ path: this.$route.path, query: qry })
    },
    getUrl: function(qry) {
      if (qry && qry.dept) {
        if (qry.type == 'hideParents') {
          this.setActiveDepartmentById(qry.dept)
          this.setHideParents(true)
        } else if (qry.type == 'onlyParents') {
          this.setOnlyShowParents(true)
          this.setActiveDepartmentById(qry.dept)
        } else {
          this.setActiveDepartmentById(qry.dept)
        }
      }
      if (!this.activeDepartment) {
        this.$router.push({ path: this.$route.path, query: null })
      }
    }
  }
}
</script>

<style>
*:focus {
  outline: 0;
}
body {
  background-color: white;
  overflow: hidden;
}
</style>
