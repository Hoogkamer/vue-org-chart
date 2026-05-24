<template lang='pug'>
  div
    .file(v-on:click='editMenuOpen = !editMenuOpen') 
      i.material-icons.settings(v-on:click="" title='Set options') settings
    .file_menu(v-if='editMenuOpen')
        ul
          li
            input(type="checkbox" id="checkbox" v-model="columnView" )
            label(for="checkbox") Column view
          li
            span &nbsp &nbsp
            input(type="checkbox" id="checkbox3" v-model="columnView_noStaff")
            label(for="checkbox3") Exclude staff dept
          li
              input(type="checkbox" id="checkbox1" v-model="managerNameView")
              label(for="checkbox1") Show manager name
          li
              input(type="checkbox" id="checkbox4" v-model="managerPhotoView")
              label(for="checkbox4") Show manager photo
          li
              input(type="checkbox" id="checkbox5" v-model="showNrDepartments")
              label(for="checkbox5") Show nr of subdepartments
          li
              input(type="checkbox" id="checkbox6" v-model="showNrPeople")
              label(for="checkbox6") Show nr of people in dept.
          
            
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: function() {
    return {
      editMenuOpen: false
    }
  },
  computed: {
    ...mapState(['chart', 'editMode']),
    showNrDepartments: {
      get() {
        return this.$store.state.showNrDepartments
      },
      set(value) {
        this.setShowNrDepartments(value)
      }
    },
    showNrPeople: {
      get() {
        return this.$store.state.showNrPeople
      },
      set(value) {
        this.setShowNrPeople(value)
      }
    },
    columnView: {
      get() {
        return this.$store.state.columnView
      },
      set(value) {
        this.setColumnView(value)
        console.log('jaaa')
        this.$store.commit('cancelAll')
      }
    },
    columnView_noStaff: {
      get() {
        return this.$store.state.columnView_noStaff
      },
      set(value) {
        this.setColumnView_noStaff(value)
        this.$store.commit('cancelAll')
      }
    },
    managerNameView: {
      get() {
        return this.$store.state.managerNameView
      },
      set(value) {
        this.$store.commit('setManagerNameView', value)
        this.$store.commit('cancelAll')
      }
    },
    managerPhotoView: {
      get() {
        return this.$store.state.managerPhotoView
      },
      set(value) {
        this.setManagerPhotoView(value)
        this.$store.commit('cancelAll')
      }
    },
    editMode: {
      get() {
        return this.$store.state.editMode
      },
      set(value) {
        this.$store.commit('setEditMode', value)
        this.$store.commit('cancelAll')
      }
    },
    onlyShowParents: {
      get() {
        return this.$store.state.onlyShowParents
      },
      set(value) {
        this.setOnlyShowParents(value)
        this.$store.commit('cancelAll')
      }
    }
  },
  methods: {
    ...mapActions([
      'setManagerPhotoView',
      'setColumnView_noStaff',
      'setColumnView',
      'setOnlyShowParents',
      'setShowNrDepartments',
      'setShowNrPeople'
    ])
  }
}
</script>

<style scoped>
.file {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  color: inherit;
  transition: background-color var(--transition-speed), color var(--transition-speed);
}
.file:hover {
  background-color: var(--bg-secondary);
}
.settings {
  font-size: 24px;
  cursor: pointer;
  color: inherit;
  transition: color var(--transition-speed);
}
.file:hover .settings {
  color: var(--accent-color);
}
.file_select {
  cursor: pointer;
}
.file_select > input[type='file'] {
  display: none;
}
.file_menu {
  font-size: 13px;
  background-color: var(--bg-card);
  display: inline-block;
  position: absolute;
  right: 0px;
  top: 47px;
  width: 220px;
  border: 1px solid var(--border-color);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow-hover);
  z-index: 10;
  transition: background-color var(--transition-speed), border-color var(--transition-speed);
}
ul {
  list-style: none;
  padding: 5px;
  text-align: left;
  margin: 0px;
}

input {
  margin: 0px 5px;
}

li {
  padding: 6px 10px;
  margin: 2px 0px;
  border-radius: 4px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  transition: background-color var(--transition-speed), color var(--transition-speed);
}
li:hover {
  background-color: var(--bg-secondary);
  color: var(--accent-color);
  cursor: pointer;
}
label {
  color: var(--text-primary);
  cursor: pointer;
  transition: color var(--transition-speed);
}
</style>
