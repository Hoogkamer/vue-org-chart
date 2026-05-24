<template lang='pug'>
#edit_menu
  div.bold {{activeDepartment.name}}
  hr.divider
  ul(v-if='moveDepartment')
    li(v-on:click="doMoveTo()") Paste (move under here)
    li(v-on:click="cancelMoveTo()") Cancel move
  ul(v-else)
    li(v-on:click="addDept()") Add department
    li(v-on:click="moveTo()") Cut (move to...)
    hr.divider
    li(v-on:click="cancel()") Cancel
    hr.divider
    li.delete(v-on:click="removeDept()") Delete
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'chart',
      'showEditMenu',
      'activeDepartment',
      'moveDepartment'
    ])
  },
  mounted: function() {
    var d = document.getElementById('edit_menu')
    var chartpos = document
      .getElementById('chart')
      .getBoundingClientRect()
    var x = document.getElementById('chart')
    var scalex = 1 / (x.getBoundingClientRect().width / x.offsetWidth)

    d.style.display = 'inline-block'
    d.style.left =
      this.showEditMenu.clientX - 0 * chartpos.left + 'px'
    d.style.top = this.showEditMenu.clientY - 0 * chartpos.top + 'px'

    console.log(scalex, this.showEditMenu.clientX, chartpos.left)
  },
  methods: {
    ...mapActions([
      'deleteDepartment',
      'addDepartment',
      'doMoveDepartment'
    ]),
    removeDept: function() {
      var confirmed = true
      if (this.activeDepartment.children.length) {
        confirmed = confirm(
          'There are subdepartments. They will also be removed'
        )
      }
      this.$store.commit('showEditMenu', null)
      if (confirmed) {
        this.deleteDepartment(this.activeDepartment)
      }
    },
    addDept: function() {
      this.addDepartment()
    },
    cancel: function() {
      this.$store.commit('showEditMenu', null)
    },
    moveTo: function() {
      this.$store.commit('setMoveDepartment')
      this.$store.commit('showEditMenu', null)
    },
    cancelMoveTo: function() {
      this.$store.commit('cancelMoveDepartment')
      this.$store.commit('showEditMenu', null)
    },
    doMoveTo: function() {
      if (this.moveDepartment) {
        this.doMoveDepartment()
      }
    }
  }
}
</script>
<style scoped>
#edit_menu {
  position: absolute;
  width: 160px;
  background-color: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow-hover);
  top: 50px;
  left: 50px;
  padding: 8px;
  z-index: 10;
  text-align: left;
  border-radius: var(--card-radius);
  font-size: 13px;
  transition: background-color var(--transition-speed), border-color var(--transition-speed);
}
.bold {
  font-weight: 700;
  color: var(--text-primary);
  padding: 2px 4px;
}
.divider {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 6px 0;
}
ul {
  padding: 0;
  list-style-type: none;
  margin: 0px;
}

li {
  cursor: pointer;
  padding: 6px 10px;
  margin: 2px 0px;
  border-radius: 4px;
  color: var(--text-primary);
  transition: background-color var(--transition-speed), color var(--transition-speed);
}
li:hover {
  background-color: var(--bg-secondary);
  color: var(--accent-color);
}
.delete {
  color: red !important;
  font-weight: 700;
}
.delete:hover {
  background-color: rgba(255, 0, 0, 0.1) !important;
}
</style>
