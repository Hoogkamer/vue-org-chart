<template lang='pug'>
    #chart
      input(type="checkbox" id="checkbox" v-model="columnView")
      label(for="checkbox") Column view
      span &nbsp
      input(type="checkbox" id="editmode" v-model="editMode")
      label(for="editmode") Edit
      
      show-dept(v-if="chart" :parent="chart" :level=1 :columnView="columnView")
      draw-lines(v-if="orgArray")
      button(v-on:click="$store.commit('addLine')") update
      edit-menu(v-if="showEditMenu")
</template>

<script>
import { createTree } from '~/plugins/HelpFunctions.js'
import ShowDept from '~/components/ShowDept.vue'
import DrawLines from '~/components/DrawLines.vue'
import EditMenu from '~/components/EditMenu.vue'
import { mapState } from 'vuex'
export default {
  components: { ShowDept, DrawLines, EditMenu },
  props: {
    orgData: {
      type: Array,
      required: true,
      default: null
    }
  },
  data: function() {
    return {
      tree: null
    }
  },
  computed: {
    ...mapState(['chart', 'orgArray', 'options', 'showEditMenu']),
    columnView: {
      get() {
        return this.$store.state.columnView
      },
      set(value) {
        this.$store.commit('setColumnView', value)
      }
    },
    editMode: {
      get() {
        return this.$store.state.editMode
      },
      set(value) {
        this.$store.commit('setEditMode', value)
      }
    }
  },
  mounted: function() {
    this.$store.commit('createTree', this.orgData)
    console.log(this.orgArray)
    setTimeout(x => {
      this.$store.commit('addLine')
    }, 500)
  },
  methods: {}
}
</script>
<style scoped>
#chart {
  position: relative;
  margin-left: 300px;
  margin-top: 50px;
  display: inline-block;
}
</style>
