<template lang='pug'>
.header {{pageTitle}}
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

  props: {
    pageTitle: {
      type: String,
      required: true,
      default: ''
    }
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['chart', 'editMode'])
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #006696;
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 2;
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
