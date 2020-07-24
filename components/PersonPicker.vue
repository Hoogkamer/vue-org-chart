<template lang='pug'>
  #person_picker
    i.material-icons.close(v-on:click='close') close
    input.search_input(v-model='searchField' placeholder='Search...')
    #search_results(v-if="searchField.length")
        ul
            li(v-if="searchresults.length" v-for="result in searchresults" v-on:click="selectPerson(result)") {{result.name}}
    br
    br

    .addnew
      button.select(v-if='selectedPerson' v-on:click='$store.commit("setSelectedPerson", null); assignManager(null)') Unselect

      table
          tr
              td Name
              td
                  input(v-if='selectedPerson' v-model='selectedPerson_name')
                  input(v-else v-model='person.name')
          tr
              td Id
              td
                  input(v-if='selectedPerson' v-model='selectedPerson_id')
                  input(v-else v-model='person.id')
          tr
              td Function
              td
                  input(v-if='selectedPerson' v-model='selectedPerson_function')
                  input(v-else v-model='person.function')
          tr
              td Photo URL
              td
                  input(v-if='selectedPerson' v-model='selectedPerson_photo')
                  input(v-else v-model='person.photo')
          tr
              td(v-if='selectedPerson')
                  button.select(v-on:click='assignManager(selectedPerson)') Select
              td(v-else)
                  button.select(:disabled="!(person.id && person.name)" v-on:click='createPerson(person)') Create & Select

</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      searchField: '',
      person: { name: '', function: '', id: '', photo: '' }
    }
  },
  computed: {
    ...mapState([
      'people',
      'editMode',
      'selectedPerson',
      'activeDepartment'
    ]),
    searchresults: function() {
      var res
      if (this.searchField.length < 3) {
        res = [{ name: 'Type at least 3 characters' }]
      } else {
        res = this.people.filter(
          p =>
            p.name
              .toLowerCase()
              .indexOf(this.searchField.toLowerCase()) > -1
        )
        if (!res.length) {
          res = [{ name: 'No matches' }]
        }
      }
      return res
    },
    selectedPerson_name: {
      get() {
        return this.$store.state.selectedPerson.name
      },
      set(value) {
        this.$store.commit('updateSelectedPerson', {
          field: 'name',
          value: value
        })
      }
    },
    selectedPerson_function: {
      get() {
        return this.$store.state.selectedPerson.function
      },
      set(value) {
        this.$store.commit('updateSelectedPerson', {
          field: 'function',
          value: value
        })
      }
    },
    selectedPerson_id: {
      get() {
        return this.$store.state.selectedPerson.id
      },
      set(value) {
        this.$store.commit('updateSelectedPerson', {
          field: 'id',
          value: value
        })
      }
    },
    selectedPerson_photo: {
      get() {
        return this.$store.state.selectedPerson.photo
      },
      set(value) {
        this.$store.commit('updateSelectedPerson', {
          field: 'photo',
          value: value
        })
      }
    }
  },
  watch: {},
  mounted: function() {
    console.log('ppl', this.people)
    if (
      this.type === 'manager' &&
      this.activeDepartment.manager.name.length
    ) {
      this.$store.commit(
        'setSelectedPerson',
        this.activeDepartment.manager
      )
    }
  },
  methods: {
    selectPerson: function(person) {
      this.$store.commit('setSelectedPerson', person)
      console.log(this.selectedPerson)
      this.person = this.selectedPerson
      this.searchField = ''
    },
    close: function() {
      this.$store.commit('setSelectedPerson', null)
      this.$emit('close')
    },
    assignManager: function(person) {
      if (this.type === 'manager') {
        this.$store.commit('updateActiveDepartmentManager', person)
      } else {
        this.$store.commit('addAssignmentToActiveDepartment', person)
      }
      this.$store.commit('setSelectedPerson', null)
      this.$emit('close')
    },
    createPerson: function(person) {
      var x = this.people.filter(
        e => e.id == person.id || e.name == person.name
      )
      if (x.length) {
        alert(
          'This name or id already exists, use the search box in stead of entering in the name/id fields'
        )
      } else {
        this.$store.commit('addPerson', person)
        if (this.type === 'manager') {
          this.$store.commit('updateActiveDepartmentManager', person)
        } else {
          this.$store.commit(
            'addAssignmentToActiveDepartment',
            person
          )
        }
        this.$emit('close')
      }
    }
  }
}
</script>
<style scoped>
#person_picker {
  position: absolute;
  top: 200px;
  left: 10px;
  width: 280px;
  height: 220px;
  background-color: lightgrey;
  padding: 10px;
}
.buttons {
  position: absolute;
  left: 0px;
  bottom: 10px;
  padding: 0px 20px;
}
.buttons button {
  margin: 0px 10px;
  cursor: pointer;
}
.search_input {
  width: calc(100% - 30px);
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
.addnew {
  margin: 5px;
}
.addnew input {
  width: 170px;
}
.material-icons.close {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>
