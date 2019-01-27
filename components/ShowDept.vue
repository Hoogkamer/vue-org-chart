<template lang='pug'>
  .container
    table
      template(v-if="!staffChildren.length")
        tr
          td
            dept-box(:department-data="parent" :level="level" type='normal')
            template(v-if="columnView && (!parent.parent || parent.parent.showChildren) && !parent.showChildren")
              table(v-if="!(parent.isStaff && columnView_noStaff)")
                tr( v-for="child in parent.children")
                  td
                    dept-box(:department-data="child" :level="level+1" type='column')
      template(v-else)
        tr(rowspan="2")
            td
            td.dept
              dept-box(:department-data="parent" :level="level" type='normal')
              template(v-if="columnView && (!parent.parent || parent.parent.showChildren) && !parent.showChildren")
                table(v-if="!(parent.isStaff && columnView_noStaff)")
                  tr( v-for="child in parent.children")
                    td
                      dept-box(:department-data="child" :level="level+1" type='column')

            td
        tr(v-if="parent.showChildren")
          td
            div.staff-left
              table
                tr(v-for="staff in staffChildren")
                  td
                    show-dept(:parent="staff.left" :level="level+1")
          td.dept
          td
            div.staff-right
              table
                tr(v-for="staff in staffChildren")
                  td 
                    show-dept(v-if="staff.right" :parent="staff.right" :level="level+1")
    table
      tr(v-if="parent.showChildren")
        td(v-for="child in hierarchyChildren")
          show-dept(:parent="child" :level="level+1")
               
  </template>

<script>
import DeptBox from '~/components/DeptBox.vue'
import { mapState } from 'vuex'

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
    }
  },

  data: function() {
    return {
      showChildren: false
    }
  },
  computed: {
    ...mapState(['columnView', 'columnView_noStaff']),
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
      return result
    },
    staffChildrenR() {
      return this.parent.children.filter((e, i) => {
        return e.isStaff && i % 2 === 0
      })
    }
  }
}
</script>
<style scoped>
table {
  table-layout: fixed;
  border: 0px solid green;
  margin: auto;
}
td {
  border: 0px dashed rgba(100, 100, 100, 0.3);
  width: 30%;
}
td.dept {
  width: 60px;
}
div.staff-left {
  float: right;
}
div.staff-right {
  float: left;
}
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
  border: 0px solid red;
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
