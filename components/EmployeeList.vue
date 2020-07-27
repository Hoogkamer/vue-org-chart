<template lang='pug'>
  div
    .assignment(v-for='(person, p_idx) in department_people' v-on:click='visitProfile(person.person)')
      table
        tr
          td
            img.photo(v-if="person.photoURL" :src='person.photoURL' @error="markPhotoNotFound(person)")
            i(v-else).material-icons.nophoto account_box
          td
            .name 
              span {{person.person.name}}
            .role(v-if='!editMode || person.assignment ==="Manager"') {{person.assignment}}
            .role(v-else) 
              input(:value="person.assignment" @input="updateThisRole(person, p_idx, $event)")
      template(v-if='editMode && person.assignment != "Manager"')
        i.material-icons.delete(title='remove from department' v-on:click.stop='removeDeptAssignment(person)') delete
    button.btn(v-if='editMode' v-on:click='personPicker="person"') Add person   
    person-picker(v-if='personPicker' :type='personPicker' v-on:close='personPicker=null') 
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import PersonPicker from '~/components/PersonPicker.vue'

export default {
  components: { PersonPicker },
  data: function() {
    return {
      personPicker: null,
      noPhotos: []
    }
  },
  computed: {
    ...mapState(['activeDepartment', 'editMode', 'people', 'config']),
    department_people: function() {
      let people = []
      people.push({
        person: this.activeDepartment.manager,
        assignment: 'Manager',
        photoURL:
          this.config.photoUrl.prefix +
          this.activeDepartment.manager.photo +
          this.config.photoUrl.suffix
      })
      this.activeDepartment.employees.forEach(person => {
        people.push({
          person: person.person,
          assignment: person.role,
          photoURL:
            this.config.photoUrl.prefix +
            person.person.photo +
            this.config.photoUrl.suffix
        })
      })
      return people
    }
  },
  methods: {
    ...mapActions(['setShowDepartment']),
    ...mapMutations([
      'setShowPerson',
      'removeAssignment',
      'updateRole'
    ]),
    markPhotoNotFound(person) {
      if (!this.noPhotos.find(p => p === person)) {
        this.noPhotos.push(person)
      }
    },

    removeDeptAssignment(assignment) {
      this.removeAssignment({
        department: this.activeDepartment,
        person: assignment.person,
        role: assignment.assignment
      })
    },
    updateThisRole(person, idx, e) {
      console.log(person, idx, e)
      this.updateRole({
        department: this.activeDepartment,
        index: idx,
        role: e.target.value,
        person: person.person
      })
      // this.$store.commit('updateActiveDepartmentPersonRole', {
      //   person: person,
      //   role: e.target.value
      //  })
    },
    visitProfile(person) {
      this.setShowPerson(person)
    }
  }
}
</script>

<style scoped>
.assignment {
  width: 90%;
  height: 60px;
  margin: 4px auto;
  position: relative;
  border: 1px solid lightgrey;
  background-color: white;
  cursor: pointer;
}
.assignment:hover {
  border: 2px solid orange;
}
.photo {
  width: 52px;
  max-height: 52px;
  display: block;
  margin: auto;
}
.name {
  font-size: 16px;
}
.role {
  color: grey;
  font-size: 14px;
}
.delete {
  position: absolute;
  top: 5px;
  right: 0px;
  font-size: 20px;
  color: red;
  cursor: pointer;
}

input.name {
  width: calc(100% - 10px);
}
textarea.description {
  width: calc(100% - 10px);
  height: 80px;
}

.noclickable {
  cursor: default;
}

ul {
  list-style: none;
  background-color: white;
  padding: 5px;
}

.btn {
  cursor: pointer;
}
</style>
