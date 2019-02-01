<template lang='pug'>
.header(:style='{backgroundColor:config.title.color}') {{config.title.text}}
  .edit_indicator(v-if="editMode" v-on:click="$store.commit('setEditMode', false)") Click to leave editmode
  a(href='https://github.com/Hoogkamer/vue-org-chart' target='_blank')
    img.gh(src="~/assets/img/gh.svg" title='Go to Github project page')
  search-box
  .menu
    file-menu(v-if='editMode')
    options-menu
</template>

<script>
import XLSX from 'xlsx'
import SearchBox from '~/components/SearchBox.vue'
import FileMenu from '~/components/FileMenu.vue'
import OptionsMenu from '~/components/OptionsMenu.vue'
import { mapState } from 'vuex'
export default {
  components: { SearchBox, FileMenu, OptionsMenu },
  computed: {
    ...mapState(['chart', 'editMode', 'config'])
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 2;
  box-shadow: 5px 2px 5px grey;
}
.menu {
  position: absolute;
  top: 5px;
  left: 40px;
  font-size: 16px;
  width: 200px;
  text-align: left;
}
.gh {
  position: absolute;
  top: 5px;
  right: 10px;
  width: 40px;
}
.edit_indicator {
  position: absolute;
  top: 50px;
  right: 0px;
  font-size: 16px;
  background-color: red;
  padding: 5px;
  cursor: pointer;
}
</style>
