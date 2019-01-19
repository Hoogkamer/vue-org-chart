<template lang='pug'>

    svg.graph(id='svg')
      template(v-for="line in lines")
                path(:d="line.d" style="stroke:#b6b4b4;stroke-width:2" fill="transparent")
</template>

<script>
//line(:x1="line.x1", :y1="line.y1", :x2="line.x2", :y2="line.y2", style="stroke:rgb(255,0,0);stroke-width:2")

import { mapState } from 'vuex'

export default {
  name: 'DrawLines',
  components: {},
  props: {},
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['lines'])
  },
  watch: {},
  mounted: function() {},
  methods: {}
}
</script>
<style scoped>
.graph {
  width: 100%;
  height: 800px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
}
.container {
  display: inline-block;
}
.parent {
  display: inline-block;
  border: 1px solid grey;
}
.child {
  display: inline-block;
}
.dept {
  border: 1px solid red;
}
td {
  text-align: center;
  vertical-align: top;
}
</style>
