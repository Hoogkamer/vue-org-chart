<template lang='pug'>
    .container
        table
            tr
              td(:colspan="parent.showChildren?hierarchyChildren.length:1" )
                dept-box(:department-data="parent" :level="level" type='normal')
            tr(v-if="parent.showChildren" v-for="staff in staffChildren")
              td(:colspan="parent.showChildren?hierarchyChildren.length:1" )
                table.staff
                  tr
                    td
                      dept-box(:department-data="staff.left" :level="level+1" type='staff')
                      table(v-if="(columnView && !columnView_noStaff) || staff.left.showChildren")
                        tr(v-for="child in staff.left.children")
                          td
                             dept-box(:department-data="child" :level="level+2" :type='staff.left.showChildren?"staff_child":"staff_column"')

                    td
                      dept-box(:department-data="staff.right" :level="level+1" type='staff')
                      table(v-if="staff.right && ((columnView && !columnView_noStaff) || staff.right.showChildren)")
                        tr(v-for="child in staff.right.children")
                          td
                             dept-box(:department-data="child" :level="level+2" :type='staff.right.showChildren?"staff_child":"staff_column"')

            tr(v-if="parent.showChildren")
              td(v-for="child in hierarchyChildren")
                show-dept(:parent="child" :level="level+1", :columnView="columnView")
            tr(v-if="columnView && (!parent.parent || parent.parent.showChildren) && !parent.showChildren" v-for="child in parent.children")
              td
                dept-box(:department-data="child" :level="level+1" type='column')       
</template>

<script>
import DeptBox from '~/components/DeptBox.vue'

export default {
  name: 'ShowDept',
  components: { DeptBox },
  props: {
    parent: {
      type: Object,
      required: true,
      default: null
    },
    level: {
      type: Number,
      required: true,
      default: 0
    },
    columnView: {
      type: Boolean,
      default: false
    },
    columnView_noStaff: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      showChildren: false
    }
  },
  computed: {
    hierarchyChildren() {
      return this.parent.children.filter(e => !e.isStaff)
    },
    staffChildren() {
      var staff = this.parent.children.filter(e => e.isStaff)
      var result = []

      staff.forEach((e, i) => {
        if (i % 2 === 0) {
          result.push({ left: e, right: null })
        } else {
          result[result.length - 1].right = e
        }
      })
      console.log('result', result)
      return result
    },
    staffChildrenR() {
      return this.parent.children.filter((e, i) => {
        return e.isStaff && i % 2 === 0
      })
    }
  },
  mounted: function() {
    // setTimeout(x => {
    //   this.$store.commit('addLine')
    // }, 500)
    console.log('parent', this.parent)
  },

  methods: {}
}
</script>
<style scoped>
.container {
  display: inline-block;
  position: relative;
}
table.staff {
  margin: auto;
}
.parent {
  display: inline-block;
  border: 1px solid grey;
}
.child {
  display: inline-block;
}
.dept {
  border: 1px solid red;
}
table {
  table-layout: fixed;
}
tr {
}
td {
  text-align: center;
  vertical-align: top;
  width: 150px;
  padding: 0px;
}
</style>
