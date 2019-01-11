<template lang='pug'>
    .side-screen(v-if="showSideScreen")
      button.right(v-on:click="$store.commit('closeSideScreen')")
        i.material-icons keyboard_arrow_left
      h4 department details
      template(v-if="activeDepartment")
        .property
          span.label Name
          br
          input.name(v-if='editMode' :class="{error:!activeDepartment_name}" v-model="activeDepartment_name")
          span(v-else).text {{activeDepartment_name}}
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
           

    .noside-screen(v-else)
      button.right(v-on:click="$store.commit('openSideScreen')")
        i.material-icons keyboard_arrow_right
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {},

  computed: {
    ...mapState(['showSideScreen', 'activeDepartment', 'editMode']),
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
    }
  }
}
</script>

<style scoped>
h4 {
  text-align: center;
  margin-bottom: 40px;
  text-transform: uppercase;
}
.property {
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
}
input.name {
  width: 250px;
}
textarea.description {
  width: 250px;
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
</style>
