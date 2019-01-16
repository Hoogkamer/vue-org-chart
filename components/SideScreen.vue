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
            span.label Staff department
            input.isstaff(type='checkbox' v-model="activeDepartment_isStaff" :disabled="!editMode")
          .property
            span.label Hiearchy
            ul
              li.clickable(v-for='(parent, pnr) in parents' v-on:click="setActiveDepartment(parent)") 
                span(v-for="n in pnr") &nbsp
                i(v-if="pnr !==0").material-icons.sub subdirectory_arrow_right
                span {{parent.name}}
              li.noclickable
                span(v-for="n in parents.length") &nbsp
                i(v-if="parents.length").material-icons.sub subdirectory_arrow_right
                span.this-department {{activeDepartment.name}}
              li.clickable(v-for='child in activeDepartment.children' v-on:click="setActiveDepartment(child)") 
                span(v-for="n in parents.length+5") &nbsp
                span {{child.name}}
          img.profile(:src='"photos/"+activeDepartment.manager.id+".png"')
        template(v-if='activeTab===2')
          .assignment(v-for='person in department_people')
            table
              tr
                td
                  img.photo(:src='"photos/"+person.person.id+".png"')
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
      activeTab: 1
    }
  },

  computed: {
    ...mapState([
      'showSideScreen',
      'activeDepartment',
      'editMode',
      'people',
      'assignments'
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
      console.log('pids', person_ids)
      var people = []
      person_ids.forEach(pid => {
        var person = this.people.find(p => p.id == pid.person_id)
        if (person) {
          people.push({ person: person, assignment: pid })
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
    setActiveDepartment(department) {
      this.$store.commit('removeLines')
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
  background-color: cadetblue;
  margin: 4px auto;
  position: relative;
}
.photo {
  width: 50px;
  height: 50px;
}
.name {
  font-size: 16px;
}
.role {
  color: white;
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
  border-bottom: 2px solid grey;
}
.tab {
  width: 130px;
  margin: 0px 0px 0px 0px;
  border: none;
  background: none;
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;
  outline: none;
  cursor: pointer;
}
.tab.active {
  border: 2px solid grey;
  border-bottom: 2px solid rgb(245, 250, 255);
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
  border: 1px solid grey;
  background-color: rgb(245, 250, 255);
  padding: 5px;
}
.noside-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 20px;
  height: 100vh;
  border: 1px solid grey;
  background-color: rgb(245, 250, 255);
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
  border: 1px solid black;
}
.material-icons.edit {
  font-size: 16px;
  cursor: pointer;
}
</style>
