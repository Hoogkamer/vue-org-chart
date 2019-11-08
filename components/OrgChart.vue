<template lang='pug'>
    #chart
      .chart_container
        show-dept(v-if="chart" :parent="chart" :level="1")
        draw-lines(v-if="chart")
        //edit-menu(v-if="showEditMenu")
        view-menu(v-if="showViewMenu")
        //#move_dept(v-if="moveDepartment" :style="{ left: page.left + 'px', top: page.top + 'px' }")
        //  div {{moveDepartment.name}}
        //  i.material-icons.arrow.down(v-if='moveDepartment.children.length') arrow_drop_down
</template>

<script>
import { createTree } from '~/plugins/HelpFunctions.js'
import ShowDept from '~/components/ShowDept.vue'
import DrawLines from '~/components/DrawLines.vue'
import EditMenu from '~/components/EditMenu.vue'
import ViewMenu from '~/components/ViewMenu.vue'

import { mapState, mapActions } from 'vuex'

export default {
  components: { ShowDept, DrawLines, EditMenu, ViewMenu },
  data: function() {
    return {
      tree: null,

      cancelScroll: null,
      scrollOptions: {
        container: 'body',
        easing: 'ease-in',
        offset: -500,
        force: true,
        cancelable: true,
        onStart: function(element) {
          // scrolling started
        },
        onDone: function(element) {
          // scrolling is done
        },
        onCancel: function() {
          // scrolling has been interrupted
        },
        x: true,
        y: true
      }
    }
  },
  computed: {
    ...mapState([
      'chart',
      'options',
      'showEditMenu',
      'showViewMenu',
      'moveDepartment',
      'columnView',
      'columnView_noStaff',
      'activeDepartment'
    ])
  },
  watch: {
    activeDepartment: function(val) {}
  },
  mounted: function() {
    setTimeout(x => {
      this.initZoom()
      this.$store.commit('addLine')
    }, 500)
  },
  methods: {
    ...mapActions(['initZoom'])
  }
}
</script>
<style scoped>
#chart {
  position: relative;
  margin-left: 300px;
  padding: 10px;
  margin-top: 50px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  min-width: 500px;
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
  /*box-shadow: 0px 0px 25px 3px lightgrey;*/

  background-color: white;
  cursor: grab;
}
.chart-container {
  margin: auto;
  display: inline-block;
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
