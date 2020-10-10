<template lang='pug'>
   #edit_menu
    div.bold {{activeDepartment.name}}
    div.noclick ---------------------------------------
     ul(v-if='moveDepartment')
        li(v-on:click="doMoveTo()") Paste (move under here)
        li(v-on:click="cancelMoveTo()") Cancel move
     ul(v-else)
        li(v-on:click="addDept()") Add department
        li(v-on:click="moveTo()") Cut (move to...)
        li.noclick ---------------------------------------
        li(v-on:click="cancel()") Cancel
        li.noclick ---------------------------------------
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
  width: 150px;
  background-color: lightgrey;
  box-shadow: 5px 5px 5px black;
  top: 50px;
  left: 50px;
  padding: 5px;
  z-index: 2;
  text-align: left;
  border-radius: 2px;
  font-size: 14px;
}
.bold {
  font-weight: 600;
}

ul {
  padding: 0;
  list-style-type: none;
  margin: 0px;
}

li {
  cursor: pointer;
}
li:hover {
  background-color: grey;
  color: white;
}
.noclick {
  cursor: default;
}
.noclick:hover {
  background-color: lightgrey;
  color: black;
}
.delete {
  color: red;
}
</style>
