<template lang='pug'>
    div
      template(v-if="departmentData")
          .department1( :id="departmentData.id" :class="['color_level' + level, type, active]" v-on:click="setActiveDepartment(departmentData)")
            .name(v-html="departmentData.name")
            i.material-icons.arrow.down(v-if='(type==="column" || !columnView) && !departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(true)") arrow_drop_down
            i.material-icons.arrow.up(v-if='departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(false)") arrow_drop_up
      template(v-else)
        .departmente(:class="['color_level' + level, type]")

</template>

<script>
import { mapState } from 'vuex'

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
  computed: {
    ...mapState(['columnView', 'activeDepartment']),
    active: function() {
      return this.departmentData === this.activeDepartment
        ? 'active_department'
        : ''
    }
  },
  mounted: function() {
    console.log(this.columnView)
  },
  destroyed: function() {
    // this.$store.commit('addLine')
  },
  methods: {
    doShowChildren(down) {
      this.$store.commit('removeLines')
      var department =
        this.departmentData.parent &&
        !this.departmentData.parent.showChildren &&
        down
          ? this.departmentData.parent
          : this.departmentData
      if (down) {
        this.$store.commit('showChildren', department)
      } else {
        this.$store.commit('hideChildren', department)
      }

      setTimeout(x => {
        this.$store.commit('addLine')
      }, 500)
    },

    setActiveDepartment(department) {
      this.$store.commit('setActiveDepartment', department)
    }
  }
}
</script>
<style scoped>
.down-icon1 {
  width: 20px;
  height: auto;
  margin: 3px 0px 0px 0px;
}
.active_department {
  background-color: yellow !important;
  color: black !important;
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
.department,
.department1,
.departmente {
  width: 114px;
  height: 50px;
  border: 1px solid grey;
  margin: 40px 0px 5px 0px;
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
  position: relative;
}
.departmente {
  background-color: transparent !important;
  border: none;
}
.column {
  margin-top: 1px;
  margin-bottom: 0px;
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
