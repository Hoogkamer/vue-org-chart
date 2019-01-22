<template lang='pug'>
   #edit_menu
     ul(v-if='moveDepartment')
        li(v-on:click="doMoveTo()") Paste (move under here)
        li(v-on:click="cancelMoveTo()") Cancel move
     ul(v-else)
        li(v-on:click="addDept()") Add department
        li(v-on:click="moveTo()") Cut (move to...)
        li &nbsp
        li.delete(v-on:click="removeDept()") Delete
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  props: {},
  data: function() {
    return {}
  },
  computed: {
    ...mapState([
      'chart',
      'orgArray',
      'options',
      'showEditMenu',
      'activeDepartment',
      'moveDepartment'
    ])
  },
  mounted: function() {
    var d = document.getElementById('edit_menu')
    var chartpos = document.getElementById('chart').getBoundingClientRect()
    d.style.display = 'inline-block'
    d.style.left = this.showEditMenu.clientX - chartpos.left + 'px'
    d.style.top = this.showEditMenu.clientY + -chartpos.top + 'px'
  },
  methods: {
    removeDept: function() {
      var confirmed = true
      if (this.activeDepartment.children.length) {
        confirmed = confirm(
          'There are subdepartments. They will also be removed'
        )
      }
      this.$store.commit('showEditMenu', null)
      if (confirmed) {
        this.$store.commit('removeLines')
        this.$store.commit('deleteDepartment')
        setTimeout(x => {
          this.$store.commit('addLine')
        }, 500)
      }
    },
    addDept: function() {
      this.$store.commit('removeLines')
      this.$store.commit('addDepartment')
      console.log(this.activeDepartment)
      setTimeout(x => {
        this.$store.commit('addLine')
      }, 500)
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
      this.$store.commit('removeLines')
      if (this.moveDepartment) {
        this.$store.commit('doMoveDepartment')
      }
      setTimeout(x => {
        this.$store.commit('addLine')
      }, 500)
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

#edit_menu ul {
  padding: 0;
  list-style-type: none;
  margin: 0px;
}

#edit_menu ul li {
  cursor: pointer;
}
#edit_menu ul li:hover {
  background-color: grey;
  color: white;
}
.delete {
  color: red;
}
</style>
