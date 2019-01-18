<template lang='pug'>
  #search_div
    input.search_input(v-model='searchField' placeholder='Search...')
    #search_results(v-if="searchField.length")
        ul
            li(v-if="searchresults.length" v-for="result in searchresults" v-on:click="findDept(result)") {{result.name}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  props: {},
  data: function() {
    return { searchField: '' }
  },
  computed: {
    ...mapState(['chart', 'editMode']),
    searchresults: function() {
      var res
      if (this.searchField.length < 3) {
        res = [{ name: 'Type at least 3 characters' }]
      } else {
        res = this.searchDept(this.chart, this.searchField, [])
        if (!res.length) {
          res = [{ name: 'No matches' }]
        }
      }
      return res
    }
  },
  watch: {
    searchField: function(val) {
      if (val === '_edit') {
        this.$store.commit('setEditMode', !this.editMode)
        this.searchField = ''
      }
    }
  },
  mounted: function() {},
  methods: {
    findDept: function(dept) {
      this.$store.commit('removeLines')
      this.$store.commit('setShowDepartment', dept)
      this.searchField = ''
      setTimeout(x => {
        this.$store.commit('addLine')
      }, 500)
    },
    searchDept: function(dept, search, matches) {
      if (dept.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        matches.push(dept)
      }
      var that = this
      dept.children.forEach(function(child) {
        that.searchDept(child, search, matches)
      })
      return matches
    }
  }
}
</script>
<style scoped>
#search_div {
  position: absolute;
  top: -10px;
  right: 64px;
  width: 200px;
}
.search_input {
  width: 100%;
  border-radius: 3px;
  border: none;
  box-shadow: inset 0px 2px 5px grey;
  padding: 3px 10px 1px 10px;
  font-size: 14px;
}
.search_input:focus {
  outline: none;
}
#search_results {
  width: 218px;
  max-height: 500px;
  border: 1px solid lightgrey;
  position: absolute;
  z-index: 1;
  background-color: white;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-left: 0px;
  color: grey;
  font-size: 12px;
  box-shadow: 3px 3px 3px grey;
  border-radius: 3px;
}
ul {
  list-style: none;
  background-color: white;
  padding: 5px;
  text-align: left;
}
li {
  border-bottom: 1px solid lightgrey;
}

li:hover {
  background: lightblue;
  cursor: pointer;
}
</style>
