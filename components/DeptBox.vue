<template lang='pug'>
    div
      template(v-if="departmentData")
        .department1(v-if="departmentData" :id="departmentData.id" :class="['color_level' + level, type]")
          .name(v-html="departmentData.name")
        img(v-if='type!=="column" && !departmentData.showChildren && departmentData.children.length' class='down-icon1' src='~/assets/img/down.svg')
      template(v-else)
        .departmente(:class="['color_level' + level, type]")

</template>

<script>
export default {
  name: 'DeptBox',
  components: {},
  props: {
    departmentData: {
      type: Object,
      default: null
    },
    level: {
      type: Number,
      required: true,
      default: 0
    },
    type: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {}
  },
  mounted: function() {},
  destroyed: function() {
    // this.$store.commit('addLine')
  },
  methods: {}
}
</script>
<style scoped>
.down-icon1 {
  width: 20px;
  height: auto;
  margin: 3px 0px 0px 0px;
}
.department,
.department1,
.departmente {
  width: 114px;
  height: 50px;
  border: 1px solid grey;
  margin: 40px 0px 0px 0px;
  text-align: center;
  font-size: 11px;
  vertical-align: middle;
  display: flex;
  border-radius: 3px;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 2px 2px;
}
.departmente {
  background-color: transparent !important;
  border: none;
}
.column {
  margin-top: 2px;
}
.staff {
  margin: 2px 80px 2px 80px;
}
.name {
  overflow-wrap: break-word;
  min-width: 1%;
  width: 114px;
}

.color_level1 {
  background-color: #05668d;
  color: white;
}
.color_level2 {
  background-color: #05668d;
  color: white;
}

.color_level3 {
  background-color: #028090;
  color: white;
}

.color_level4 {
  background-color: #00a896;
  color: white;
}

.color_level5 {
  background-color: #02c39a;
  color: black;
}
.color_level6 {
  background-color: #f0f3bd;
  color: black;
}
</style>
