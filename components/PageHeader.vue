<template lang='pug'>
.header(:style='{backgroundColor:config.title.color}') {{config.title.text}}
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

  props: {},
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['chart', 'editMode', 'config'])
  },
  watch: {},
  methods: {}
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
</style>
