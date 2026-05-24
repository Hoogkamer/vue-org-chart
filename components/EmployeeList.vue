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
            .manager_role  {{uiNames.sidebar.managerOfDepartment}}
    .hspace
    .nopeople(v-if='activeDepartment.employees.length ===0')
      span No employees

    template(v-else)  
      //employees
      .assignment(v-for='(person, p_idx) in activeDepartment.employees' v-on:click='visitProfile(person.person)' title='Goto profile')
        table
          tr
            td
              img.photo(v-if='photoURL(person.person)' :src='photoURL(person.person)' @error="markPhotoNotFound(person)")
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
    ...mapState([
      'activeDepartment',
      'editMode',
      'people',
      'config',
      'uiNames'
    ])
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
  margin: 8px auto;
  position: relative;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  border-radius: var(--card-radius);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform var(--transition-speed), box-shadow var(--transition-speed), border-color var(--transition-speed), background-color var(--transition-speed);
}
.assignment:hover {
  transform: translateY(-1px);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--accent-color);
}
.photo {
  width: 48px;
  max-height: 48px;
  display: block;
  margin: auto;
  border-radius: 50%;
  border: 1px solid var(--border-color);
}
.name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  transition: color var(--transition-speed);
}
.role {
  color: var(--text-secondary);
  font-size: 13px;
  transition: color var(--transition-speed);
}
.manager_role {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  font-size: 12px;
  font-weight: 700;
  padding: 1px 8px;
  border-radius: 4px;
  display: inline-block;
  transition: background-color var(--transition-speed), border-color var(--transition-speed);
}
.delete {
  position: absolute;
  top: 5px;
  right: 8px;
  font-size: 20px;
  color: red;
  cursor: pointer;
  transition: opacity var(--transition-speed);
}
.delete:hover {
  opacity: 0.8;
}

input.name {
  width: calc(100% - 10px);
  background-color: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 8px;
}
textarea.description {
  width: calc(100% - 10px);
  height: 80px;
  background-color: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 8px;
}

.noclickable {
  cursor: default;
}

ul {
  list-style: none;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--card-radius);
  padding: 5px;
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
.nopeople {
  width: 100%;
  text-align: center;
  font-style: italic;
  color: var(--text-muted);
}
.nophoto {
  font-size: 48px;
  color: var(--text-muted);
}
.hspace {
  height: 10px;
}
</style>
