<template lang='pug'>
  #person_picker
    i.material-icons.close(v-on:click='close') close
    .vspace
    .nextline Search existing person
    input.search_input(v-model='searchField' placeholder='Search...')
    #search_results(v-if="searchField.length")
      ul(v-if="searchresults.length")
        li(v-for="result in searchresults" v-on:click="selectPerson(result)") {{result.name}}
    .vspace
    .nextline or
    .addnew
      button.btn(@click='registerNew()') Add new person

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      searchField: ''
    }
  },
  computed: {
    ...mapState(['chart', 'people']),
    searchresults: function() {
      var result = []
      if (this.searchField.length < 2) return result
      this.people.forEach(e => {
        if (
          e.name.toLowerCase().indexOf(this.searchField.toLowerCase()) > -1
        ) {
          result.push(e)
        }
      })
      return result
    }
  },
  methods: {
    ...mapActions(['setShowDepartment']),
    close: function() {
      this.$store.commit('setSelectedPerson', null)
      this.$emit('close')
    },
    selectPerson(person) {
      if (this.type === 'manager') {
        this.$store.commit('updateActiveDepartmentManager', person)
      } else {
        this.$store.commit('addAssignment', {
          department: this.$store.state.activeDepartment,
          role: '',
          person: person
        })
      }
      this.close()
    },
    registerNew() {
      // create a new profile
      var person = { name: this.searchField, new: true }
      this.$store.commit('setShowPerson', {
        name: this.searchField,
        new: true,
        manager: this.type === 'manager'
      })
      this.$store.commit('setSelectedPerson', null)
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
#person_picker {
  position: absolute;
  top: 200px;
  left: 50px;
  width: 200px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 12px;
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow-hover);
  z-index: 10;
  transition: background-color var(--transition-speed), border-color var(--transition-speed);
}
.search_input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 6px 10px;
  font-size: 13px;
  transition: background-color var(--transition-speed), border-color var(--transition-speed);
}
.search_input:focus {
  outline: none;
  border-color: var(--accent-color);
}
#search_results {
  width: 176px;
  max-height: 200px;
  border: 1px solid var(--border-color);
  position: absolute;
  z-index: 11;
  background-color: var(--bg-card);
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 0px;
  color: var(--text-secondary);
  font-size: 12px;
  box-shadow: var(--card-shadow-hover);
  border-radius: var(--card-radius);
  transition: background-color var(--transition-speed), border-color var(--transition-speed);
}
ul {
  list-style: none;
  background-color: var(--bg-card);
  padding: 5px;
  text-align: left;
}
li {
  border-bottom: 1px solid var(--border-color);
  padding: 4px 8px;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color var(--transition-speed), color var(--transition-speed);
}
li:hover {
  background-color: var(--bg-secondary);
  color: var(--accent-color);
}
.btn {
  cursor: pointer;
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 700;
  transition: background-color var(--transition-speed);
}
.btn:hover {
  background-color: var(--accent-hover);
}
.material-icons.close {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 16px;
  cursor: pointer;
  color: var(--text-muted);
  transition: color var(--transition-speed);
}
.material-icons.close:hover {
  color: var(--accent-color);
}
.nextline {
  width: 100%;
  text-align: center;
  color: var(--text-secondary);
  font-size: 12px;
}
.vspace {
  height: 10px;
}
</style>
