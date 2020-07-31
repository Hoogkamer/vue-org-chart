<template lang='pug'>
  div
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

    .property(v-for="field in activeDepartment.dataFields" v-if="field.value")
      span.label {{field.name}}
      br
      template(v-if='editMode')
        // todo edit extra properties
      templage(v-else)
        template(v-if='field.type==="url"')
          a(:href="field.value" target="_blank") Link
        template(v-else)
          span.text {{field.value}}

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
      span.label Hierarchy
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
    img.profile(v-if='activeDepartment.manager.photo' :src='config.photoUrl.prefix+activeDepartment.manager.photo+config.photoUrl.suffix' v-on:click='visitProfile(activeDepartment.manager)' title='Goto profile')
    .material-icons.profile.nophoto(v-else v-on:click='visitProfile(activeDepartment.manager)' title='Goto profile') face
    person-picker(v-if='personPicker' type='manager' v-on:close='personPicker=null') 
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import PersonPicker from '~/components/PersonPicker.vue'

export default {
  components: { PersonPicker },
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
        this.updateActiveDepartmentIsStaff(val)
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
    ...mapActions([
      'setShowDepartment',
      'updateActiveDepartmentIsStaff'
    ]),
    ...mapMutations(['setShowPerson', 'updateRole']),

    setActiveDepartment(department) {
      this.setShowDepartment(department)
    },

    visitProfile(person) {
      this.setShowPerson(person)
    }
  }
}
</script>

<style scoped>
.profile {
  width: 80px;
  max-height: 80px;
  min-height: 60px;
  position: absolute;
  right: 16px;
  top: 154px;
  border: 1px solid grey;
  cursor: pointer;
}
.profile:hover {
  border: 2px solid orange;
}
.name {
  font-size: 16px;
}

.property {
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
  font-size: 14px;
}
input.name {
  width: calc(100% - 10px);
}
textarea.description {
  width: calc(100% - 10px);
  height: 80px;
}
.clickable:hover {
  background-color: lightblue;
}
.noclickable {
  cursor: default;
}
.label {
  font-weight: 600;
  text-decoration: underline;
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

.material-icons.edit {
  font-size: 16px;
  cursor: pointer;
}
.nophoto {
  font-size: 80px;
  color: lightgrey;
}
</style>
