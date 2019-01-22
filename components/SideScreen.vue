<template lang='pug'>
    .side-screen(v-if="showSideScreen")
      
      button.right(v-on:click="$store.commit('closeSideScreen')")
        i.material-icons.arrow keyboard_arrow_left
      template(v-if="activeDepartment")
        .title(v-if='activeDepartment') {{activeDepartment.name}}
        .tabs
          button.tab(:class='{active:activeTab===1}' v-on:click='activeTab=1') Details
          button.tab(:class='{active:activeTab===2}' v-on:click='activeTab=2') People
        template(v-if="activeTab===1")
          .property
            span.label Name
            br
            input.name(v-if='editMode' :class="{error:!activeDepartment_name}" v-model="activeDepartment_name")
            span(v-else).text {{activeDepartment_name}}

          .property
            span.label Manager
            i.material-icons.edit(v-if='editMode' v-on:click='personPicker="manager"') edit
            br
            span.text(v-if='activeDepartment.manager.name') {{activeDepartment.manager.name}}
            span.untext(v-else) No manager
          .property
            span.label Description
            br 
            textarea.description(v-if='editMode' v-model="activeDepartment_description")
            span(v-else).text {{activeDepartment_description}}
          .property
            
            template(v-if='!editMode')
              span.label Department type
              br
              span(v-if='activeDepartment_isStaff') Staff department
              span(v-else) Normal department
            template(v-else)
              span.label Staff department:
              input.isstaff(type='checkbox' v-model="activeDepartment_isStaff" :disabled="!editMode")
          .property
            span.label Hiearchy
            ul
              li.clickable(v-for='(parent, pnr) in parents' v-on:click="setActiveDepartment(parent)") 
                span(v-for="n in pnr") &nbsp
                i(v-if="pnr !==0").material-icons.sub subdirectory_arrow_right
                span {{parent.name}}
              li.clickable(v-on:click="setActiveDepartment(activeDepartment)")
                span(v-for="n in parents.length") &nbsp
                i(v-if="parents.length").material-icons.sub subdirectory_arrow_right
                span.this-department {{activeDepartment.name}}
              li.clickable(v-for='child in activeDepartment.children' v-on:click="setActiveDepartment(child)") 
                span(v-for="n in parents.length+5") &nbsp
                span {{child.name}}
          img.profile(:src='config.photoUrl.prefix+activeDepartment.manager.id+config.photoUrl.suffix')
        template(v-if='activeTab===2')
          .assignment(v-for='person in department_people')
            table
              tr
                td
                  img.photo(v-if="person.photoURL" :src='person.photoURL' @error="markPho_toNotFound(person)")
                  i(v-else).material-icons.nophoto account_box
                td
                  .name 
                    span {{person.person.name}}
                  .role(v-if='!editMode') {{person.assignment.role}}
                  .role(v-else) 
                    input(:value="person.assignment.role" @input="updateRole(person, $event)")
            template(v-if='editMode')
              i.material-icons.delete(title='remove from department' v-on:click='removeFromDepartment(person)') delete
          button(v-if='editMode' v-on:click='personPicker="person"') Add person   
        person-picker(v-if='personPicker' :type='personPicker' v-on:close='personPicker=null') 
        
    .noside-screen(v-else)
      button.right(v-on:click="$store.commit('openSideScreen')")
        i.material-icons.arrow keyboard_arrow_right
</template>

<script>
import { mapState } from 'vuex'
import PersonPicker from '~/components/PersonPicker.vue'

export default {
  components: { PersonPicker },
  props: {},
  data: function() {
    return {
      personPicker: null,
      activeTab: 1,
      noPhotos: []
    }
  },

  computed: {
    ...mapState([
      'showSideScreen',
      'activeDepartment',
      'editMode',
      'people',
      'assignments',
      'config'
    ]),
    activeDepartment_name: {
      get: function() {
        return this.$store.state.activeDepartment.name
      },
      set: function(val) {
        this.$store.commit('updateActiveDepartmentName', val)
      }
    },
    activeDepartment_description: {
      get: function() {
        return this.$store.state.activeDepartment.description
      },
      set: function(val) {
        this.$store.commit('updateActiveDepartmentDescription', val)
      }
    },
    activeDepartment_isStaff: {
      get: function() {
        return this.$store.state.activeDepartment.isStaff
      },
      set: function(val) {
        this.$store.commit('removeLines')
        this.$store.commit('updateActiveDepartmentIsStaff', val)
        setTimeout(x => {
          this.$store.commit('addLine')
        }, 500)
      }
    },
    department_people: function() {
      var person_ids = this.assignments.filter(
        a => a.department_id == this.activeDepartment.id
      )
      var people = []
      if (!this.editMode) {
        people.push({
          person: {
            name: this.activeDepartment.manager.name,
            id: this.activeDepartment.manager.id
          },
          assignment: { role: 'Manager' },
          photoURL:
            this.config.photoUrl.prefix +
            this.activeDepartment.manager.id +
            this.config.photoUrl.suffix
        })
      }

      person_ids.forEach(pid => {
        var person = this.people.find(p => p.id == pid.person_id)
        if (person) {
          people.push({
            person: person,
            assignment: pid,
            photoURL:
              this.config.photoUrl.prefix +
              person.id +
              this.config.photoUrl.suffix
          })
        }
      })

      return people
    },
    parents: function() {
      var parents = []
      var department = this.activeDepartment
      while (department.parent) {
        department = department.parent
        parents.unshift(department)
      }
      return parents
    },
    children: function() {
      return this.activeDepartment.children
    }
  },
  methods: {
    markPhotoNotFound(person) {
      if (!noPhotos.find(p => p === person)) {
        noPhotos.push(person)
      }
      console.log(noPhotos)
    },
    setActiveDepartment(department) {
      this.$store.commit('removeLines')
      this.$store.commit('setActiveDepartment', null)
      this.$store.commit('setShowDepartment', department)
      this.searchField = ''
      setTimeout(x => {
        this.$store.commit('addLine')
      }, 500)
    },
    removeFromDepartment(person) {
      console.log(person)
      this.$store.commit('removePersonFromActiveDepartment', person)
    },
    updateRole(person, e) {
      console.log(e.target.value)
      this.$store.commit('updateActiveDepartmentPersonRole', {
        person: person,
        role: e.target.value
      })
    }
  }
}
</script>

<style scoped>
.profile {
  width: 80px;
  height: 80px;
  position: absolute;
  right: 16px;
  top: 154px;
  border: 1px solid grey;
}
.title {
  text-align: center;
  min-height: 50px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  width: calc(100% - 30px);
}
.assignment {
  width: 90%;
  height: 60px;
  margin: 4px auto;
  position: relative;
  border: 1px solid lightgrey;
  box-shadow: 3px 3px 3px lightgrey;
  border-radius: 5px;
}
.photo {
  width: 56px;
  max-height: 56px;
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
.edit1 {
  font-size: 20px;
  color: black;
  cursor: pointer;
}
.tabs {
  width: 100%;
  margin-bottom: 20px;
  padding: 0px 10px;
  border-bottom: 2px solid lightgrey;
}
.tab {
  width: 120px;
  margin: 0px 0px 0px 0px;
  border: none;
  background: none;
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;
  outline: none;
  cursor: pointer;
}
.tab.active {
  border: 2px solid lightgrey;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: lightgrey;
}
.property {
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
}
input.name {
  width: calc(100% - 10px);
}
textarea.description {
  width: calc(100% - 10px);
  height: 80px;
}
.clickable:hover {
  background-color: grey;
}
.noclickable {
  cursor: default;
}
.label {
  font-weight: 600;
  text-decoration: underline;
}
.text {
}
.untext {
  color: grey;
  font-style: italic;
}
ul {
  list-style: none;
  background-color: white;
  padding: 5px;
}
.this-department {
  font-weight: 600;
}
.sub {
  font-size: 16px;

  margin: -8px 0px;
}
.isstaff {
  margin: 0px 10px;
}
.side-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 300px;
  height: 100vh;
  border: 1px solid lightgrey;
  background-color: rgb(245, 250, 255);
  padding: 5px;
  box-shadow: 3px 3px 3px lightgrey;
  overflow: auto;
}
.noside-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 25px;
  height: 45px;

  border: 1px solid lightgray;
  background-color: rgb(245, 250, 255);
  box-shadow: 3px 3px 3px lightgrey;
}

.right {
  position: absolute;
  right: 0px;
  top: 10px;
  background-color: transparent;
  border: 0px solid grey;
  padding: 1px;
  cursor: pointer;
}
.right:focus {
  outline: none;
}
.right i {
}
.error {
  background-color: red;
}
.material-icons.arrow {
}
.material-icons.edit {
  font-size: 16px;
  cursor: pointer;
}
</style>
