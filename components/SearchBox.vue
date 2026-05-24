<template lang='pug'>
  #search_div
    input.search_input(v-model='searchField' placeholder='Search department or person...')
    #search_results(v-if="searchField.length")
      ul(v-if="searchresults.length")
        li(v-for="result in searchresults" v-on:click="findDept(result)") 
          .name {{result.name}}
          .parent(v-if="result.context") {{result.context}}
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data: function() {
    return { searchField: '' }
  },
  computed: {
    ...mapState(['chart', 'editMode', 'orgArray', 'config', 'people']),
    searchresults() {
      if (this.searchField.length < 2) {
        return [{ name: 'Type at least 2 characters' }]
      }
      var res = this.searchDept(this.searchField)
      if (!res.length) {
        return [{ name: 'No matches' }]
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
    ...mapMutations(['setShowPerson']),
    findDept: function(result) {
      this.searchField = ''
      console.log('selected: ', result)
      if (result.employee) {
        this.setShowPerson(result.employee)
      } else {
        this.setShowDepartment(result.dept)
      }
    },
    searchDept: function(search) {
      var result = []
      this.orgArray.forEach(e => {
        if (e.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          result.push({
            dept: e,
            name: e.name,
            context: e.parent ? e.parent.name : ''
          })
        }
      })
      this.people.forEach(e => {
        if (e.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          result.push({
            employee: e,
            name: e.name,
            context: 'Employee'
          })
        }
      })
      return result
    }
  }
}
</script>
<style scoped>
#search_div {
  position: absolute;
  top: -7px;
  right: 64px;
  width: 200px;
}
.search_input {
  width: 100%;
  border-radius: var(--card-radius);
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--text-primary);
  padding: 6px 12px;
  font-size: 14px;
  transition: background-color var(--transition-speed), border-color var(--transition-speed), color var(--transition-speed);
}
.search_input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 8px var(--accent-glow);
}
#search_results {
  width: 218px;
  max-height: 500px;
  border: 1px solid var(--border-color);
  position: absolute;
  z-index: 1;
  background-color: var(--bg-card);
  overflow-y: scroll;
  overflow-x: hidden;
  margin-left: 0px;
  color: var(--text-secondary);
  font-size: 12px;
  box-shadow: var(--card-shadow-hover);
  border-radius: var(--card-radius);
  transition: background-color var(--transition-speed), border-color var(--transition-speed), color var(--transition-speed);
}
ul {
  list-style: none;
  background-color: var(--bg-card);
  padding: 5px;
  text-align: left;
  transition: background-color var(--transition-speed);
}
li {
  border-bottom: 1px solid var(--border-color);
  padding: 6px 10px;
  border-radius: 4px;
  transition: background-color var(--transition-speed);
}

li:hover {
  background-color: var(--bg-secondary);
  cursor: pointer;
}
.name {
  color: var(--text-primary);
  font-weight: 700;
  transition: color var(--transition-speed);
}
.parent {
  color: var(--accent-color);
  font-size: 10px;
  font-weight: 700;
  transition: color var(--transition-speed);
}
</style>
