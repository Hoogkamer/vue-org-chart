<template lang='pug'>
    .file(v-on:click='editMenuOpen = !editMenuOpen') Options
      .file_menu(v-if='editMenuOpen')
          ul
            li
                input(type="checkbox" id="checkbox" v-model="columnView")
                label(for="checkbox") Column view
            li
                input(type="checkbox" id="checkbox1" v-model="managerNameView")
                label(for="checkbox1") Show manager name
            li
                input(type="checkbox" id="checkbox1" v-model="managerPhotoView")
                label(for="checkbox1") Show manager photo
            li(v-if="false")
                input(type="checkbox" id="checkbox2" v-model="editMode")
                label(for="checkbox2") Edit Mode
            

</template>

<script>
import XLSX from 'xlsx'

import { mapState } from 'vuex'
export default {
  data: function() {
    return {
      editMenuOpen: false
    }
  },
  computed: {
    ...mapState(['chart', 'editMode']),
    columnView: {
      get() {
        return this.$store.state.columnView
      },
      set(value) {
        this.$store.commit('setColumnView', value)
        this.$store.commit('cancelAll')
        this.$store.commit('removeLines')
        setTimeout(x => {
          this.$store.commit('addLine')
        }, 500)
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
        this.$store.commit('removeLines')
        this.$store.commit('setManagerPhotoView', value)
        this.$store.commit('cancelAll')
        setTimeout(x => {
          this.$store.commit('addLine')
        }, 500)
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
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>
.file {
  padding: 10px;
  display: inline-block;
  position: relative;
}
.file_select,
.file {
  cursor: pointer;
}
.file_select > input[type='file'] {
  display: none;
}
.file_menu {
  font-size: 14px;
  background-color: #006696;
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 40px;
  width: 170px;
  border: 1px solid grey;
  border-top: 1px solid white;
}
ul {
  list-style: none;

  padding: 5px;
  text-align: left;
}
li {
}
input {
  margin: 0px 5px;
}

li:hover {
  background: lightblue;
  cursor: pointer;
  color: black;
}
</style>
