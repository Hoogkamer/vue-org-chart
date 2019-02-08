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
      var parents
      if (!this.activeDepartment.showParents) {
        parents = 'hide'
      } else if (this.onlyShowParents) {
        parents = 'only'
      } else {
        parents = 'all'
      }
      var children = this.activeDepartment.showChildren ? 'show' : 'hide'
      return {
        dept: this.activeDepartment.id,
        parents: parents,
        children: children
      }
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
      'setOnlyShowParents',
      'showChildren'
    ]),
    setUrl: function(qry) {
      this.$router.push({ path: this.$route.path, query: qry })
    },
    getUrl: function(qry) {
      if (qry && qry.dept) {
        this.setActiveDepartmentById(qry.dept)
        if (qry.parents == 'hide') {
          this.setHideParents(true)
        } else if (qry.parents == 'only') {
          this.setOnlyShowParents(true)
          this.setActiveDepartmentById(qry.dept)
        }
      }
      if (this.activeDepartment && qry.children == 'show') {
        this.showChildren(this.activeDepartment)
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
