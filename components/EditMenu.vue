<template lang='pug'>
   #edit_menu
     ul
        li(v-on:click="removeDept()") Delete
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
    ...mapState(['chart', 'orgArray', 'options', 'showEditMenu'])
  },
  mounted: function() {
    var d = document.getElementById('edit_menu')
    var chartpos = document.getElementById('chart').getBoundingClientRect()
    d.style.display = 'inline-block'
    d.style.left = this.showEditMenu.pageX - chartpos.left + 'px'
    d.style.top = this.showEditMenu.pageY + -chartpos.top + 'px'
  },
  methods: {
    removeDept: function() {
      this.$store.commit('removeLines')
      this.$store.commit('deleteDepartment')
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
  width: 200px;
  height: 100px;
  background-color: lightgrey;
  box-shadow: 5px 5px 5px black;
  top: 50px;
  left: 50px;
  padding: 5px;
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
</style>
