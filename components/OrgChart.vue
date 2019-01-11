<template lang='pug'>
    #chart(v-on:mousemove.selve="onMouseMove")  
      input(type="checkbox" id="checkbox" v-model="columnView")
      label(for="checkbox") Column view
      span &nbsp
      input(type="checkbox" id="editmode" v-model="editMode")
      label(for="editmode") Edit
      
      show-dept(v-if="chart" :parent="chart" :level=1 :columnView="columnView")
      draw-lines(v-if="orgArray")
      button(v-on:click="$store.commit('addLine')") update
      edit-menu(v-if="showEditMenu")
     

      #move_dept(v-if="moveDepartment" :style="{ left: page.left + 'px', top: page.top + 'px' }")
        div {{moveDepartment.name}}
        i.material-icons.arrow.down(v-if='moveDepartment.children.length') arrow_drop_down
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
      tree: null,
      page: { left: 0, top: 0 }
    }
  },
  computed: {
    ...mapState([
      'chart',
      'orgArray',
      'options',
      'showEditMenu',
      'moveDepartment'
    ]),
    columnView: {
      get() {
        return this.$store.state.columnView
      },
      set(value) {
        this.$store.commit('setColumnView', value)
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
    }
  },
  mounted: function() {
    this.$store.commit('createTree', this.orgData)
    console.log(this.orgArray)
    setTimeout(x => {
      this.$store.commit('addLine')
    }, 500)
  },
  methods: {
    onMouseMove(e) {
      var chartpos = document.getElementById('chart').getBoundingClientRect()

      this.page.left = e.clientX - chartpos.left + 10
      this.page.top = e.clientY - chartpos.top + 10
    }
  }
}
</script>
<style scoped>
#chart {
  position: relative;
  margin-left: 300px;
  margin-top: 50px;
  display: inline-block;

  box-sizing: border-box;
}
#move_dept {
  position: absolute;
  width: 114px;
  height: 50px;
  margin: 4px 10px;
  text-align: center;
  font-size: 11px;
  vertical-align: middle;
  display: flex;
  border-radius: 3px;
  align-items: center; /* align vertical */

  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 2px 2px;
  box-sizing: border-box;
  top: 0px;
  left: 0px;
  border: 1px dashed #006696;
}
.arrow {
  font-size: 30px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: -8px;
}
.down {
  cursor: zoom-in;
}
.up {
  cursor: zoom-out;
}
</style>
