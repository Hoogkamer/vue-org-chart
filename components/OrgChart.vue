<template lang='pug'>
    #chart
      input(type="checkbox" id="checkbox" v-model="columnView")
      label(for="checkbox") Column view
      show-dept(v-if="chart" :parent="chart" :level=1 :columnView="columnView")
      draw-lines(v-if="orgArray")
      button(v-on:click="$store.commit('addLine')") update
</template>

<script>
import { createTree } from '~/plugins/HelpFunctions.js'
import ShowDept from '~/components/ShowDept.vue'
import DrawLines from '~/components/DrawLines.vue'
import { mapState } from 'vuex'
export default {
  components: { ShowDept, DrawLines },
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
    ...mapState(['chart', 'orgArray', 'options']),
    columnView: {
      get() {
        return this.$store.state.options.columnView
      },
      set(value) {
        this.$store.commit('setColumnView', value)
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
