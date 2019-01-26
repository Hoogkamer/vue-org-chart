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
import { mapState } from 'vuex'
export default {
  components: {
    OrgChart,
    PageHeader,
    SideScreen
  },
  computed: {
    ...mapState(['chart'])
  },
  watch: {
    chart: function(val) {
      setTimeout(x => {
        this.$store.commit('addLine')
      }, 500)
    }
  },
  mounted: function() {
    var data = []
    INPUT_DATA.chart.forEach(dept => {
      var manager = INPUT_DATA.people.find(p => p.id == dept.manager_id)
      data.push({
        id: dept.id,
        parentId: dept.parent_id,
        isStaff: dept.staff_department == 'Y',
        name: dept.name,
        description: dept.description,
        manager: manager ? manager : { name: '' },
        showChildren: false,
        parent: null,
        children: null
      })
    })
    this.$store.commit('createTree', data)
    this.$store.commit('setPeople', INPUT_DATA.people)
    this.$store.commit('setAssignments', INPUT_DATA.assignments)
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
        this.$store.commit('setActiveDepartment', null)
      }
    })
  }
}
</script>

<style scoped>
</style>
