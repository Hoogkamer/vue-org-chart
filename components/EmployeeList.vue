<template lang='pug'>
  div
    //manager
    .assignment(v-on:click='visitProfile(activeDepartment.manager)' title='Goto profile')
      table
        tr
          td
            img.photo(v-if='photoURL(activeDepartment.manager)' :src='photoURL(activeDepartment.manager)' @error="markPhotoNotFound(activeDepartment.manager)")
            .material-icons.nophoto(v-else) face
          td
            .name 
              span {{activeDepartment.manager.name}}
            .manager_role Manager of department
    .hspace
    .nopeople(v-if='activeDepartment.employees.length ===0')
      span No employees

    template(v-else)  
      //employees
      .assignment(v-for='(person, p_idx) in activeDepartment.employees' v-on:click='visitProfile(person.person)' title='Goto profile')
        table
          tr
            td
              img.photo(v-if='photoURL(person)' :src='photoURL(person)' @error="markPhotoNotFound(person)")
              .material-icons.nophoto(v-else) face
            td
              .name 
                span {{person.person.name}}
              .role(v-if='!editMode') {{person.role}}
              .role(v-else) 
                input(:value="person.role" @input="updateThisRole(person, $event)" v-on:click.stop title='Edit role')
        template(v-if='editMode')
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
    ...mapState(['activeDepartment', 'editMode', 'people', 'config'])
  },
  methods: {
    ...mapActions(['setShowDepartment']),
    ...mapMutations([
      'setShowPerson',
      'removeAssignment',
      'updateRole'
    ]),
    markPhotoNotFound(person) {
      if (!this.noPhotos.find(p => p.person === person)) {
        this.noPhotos.push(person)
      }
    },
    photoURL(person) {
      if (!person.photo) return null
      return (
        this.config.photoUrl.prefix +
        person.photo +
        this.config.photoUrl.suffix
      )
    },

    removeDeptAssignment(assignment) {
      this.removeAssignment({
        department: this.activeDepartment,
        assignment: assignment
      })
    },
    updateThisRole(person, e) {
      this.updateRole({
        assignment: person,
        department: this.activeDepartment,
        role: e.target.value
      })
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
.manager_role {
  color: white;
  background-color: grey;
  font-size: 14px;
  padding: 0px 10px;
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
.nopeople {
  width: 100%;
  text-align: center;
  font-style: italic;
}
.nophoto {
  font-size: 52px;
  color: lightgrey;
}
.hspace {
  height: 10px;
}
</style>
