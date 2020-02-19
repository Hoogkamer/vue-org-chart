<template lang='pug'>
  #search_div
    input.search_input(v-model='searchField' placeholder='Search department or manager...')
    #search_results(v-if="searchField.length")
      ul
        li(v-if="searchresults.length" v-for="result in searchresults" v-on:click="findDept(result.dept)") 
          .name {{result.name}}
          .parent(v-if="result.context") {{result.context}}
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: function() {
    return { searchField: '' }
  },
  asyncComputed: {
    searchresults: {
      get() {
        return new Promise((resolve, reject) => {
          var res
          if (this.searchField.length < 2) {
            res = [{ name: 'Type at least 2 characters' }]
          } else {
            //res = this.searchDept(this.chart, this.searchField, [])
            res = this.searchDept(this.searchField)
            if (!res.length) {
              res = [{ name: 'No matches' }]
            }
          }

          resolve(res)
        })
      },
      default: [{ name: 'Searching....' }]
    }
  },
  computed: {
    ...mapState(['chart', 'editMode', 'orgArray', 'config']),
    searchresults1: function() {
      var res
      if (this.searchField.length < 2) {
        res = [{ name: 'Type at least 2 characters' }]
      } else {
        //res = this.searchDept(this.chart, this.searchField, [])
        res = this.searchDept(this.searchField)
        if (!res.length) {
          res = [{ name: 'No matches' }]
        }
      }
      return res
    }
  },
  watch: {
    searchField: function(val) {
      if (val === this.config.editCommand) {
        this.$store.commit('setEditMode', !this.editMode)
        this.searchField = ''
      }
    }
  },
  methods: {
    ...mapActions(['setShowDepartment']),
    findDept: function(dept) {
      this.searchField = ''
      this.setShowDepartment(dept)
    },

    searchDept: function(search) {
      var result = []
      this.orgArray.forEach(e => {
        if (e.manager.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          result.push({
            dept: e,
            name: e.manager.name,
            context: 'Manager of:' + e.name
          })
        }
        if (e.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          result.push({
            dept: e,
            name: e.name,
            context: e.parent ? e.parent.name : ''
          })
        }
      })
      return result
    },

    searchDept1: function(dept, search, matches) {
      if (dept.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        matches.push({
          dept: dept,
          name: dept.name,
          context: dept.parent ? dept.parent.name : ''
        })
      }
      if (dept.manager.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        matches.push({
          dept: dept,
          name: dept.manager.name,
          context: 'Manager of: ' + dept.name
        })
      }
      dept.children.forEach(child => {
        this.searchDept(child, search, matches)
      })
      return matches
    }
  }
}
</script>
<style scoped>
#search_div {
  position: absolute;
  top: -7px;
  right: 94px;
  width: 200px;
}
.search_input {
  width: 100%;
  border-radius: 3px;
  border: none;
  padding: 5px 10px 3px 10px;
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
.name {
  color: black;
}
.parent {
  color: chocolate;
  font-size: 10px;
}
</style>
