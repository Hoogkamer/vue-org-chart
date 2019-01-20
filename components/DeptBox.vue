<template lang='pug'>
    div
      template(v-if="departmentData")
        template(v-if="!managerPhotoView")
          .department1(v-if="!managerNameView" :id="'ID_'+ departmentData.id" :class="[type, active]" v-on:click="setActiveDepartment(departmentData, $event)" v-on:contextmenu.prevent="showCtxMenu(departmentData,  $event)")
            .level_indicator(:class="['color_level' + level]")
            .name2(v-html="departmentData.name")
            i.material-icons.arrow.down(v-if='!departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(true)") arrow_drop_down
            i.material-icons.arrow.up(v-if='departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(false)") arrow_drop_up
          .department1(v-else :id="'ID_'+ departmentData.id" :class="[type, active]" v-on:click="setActiveDepartment(departmentData, $event)" v-on:contextmenu.prevent="showCtxMenu(departmentData,  $event)")
            .level_indicator(:class="['color_level' + level]")
            .name1(v-html="departmentData.name")
            .name_manager(v-if="managerNameView") {{departmentData.manager.name}}
            i.material-icons.arrow.down(v-if='!departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(true)") arrow_drop_down
            i.material-icons.arrow.up(v-if='departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(false)") arrow_drop_up
        template(v-else)
          .department2( :id="'ID_'+ departmentData.id" :class="[type, active]" v-on:click="setActiveDepartment(departmentData, $event)" v-on:contextmenu.prevent="showCtxMenu(departmentData,  $event)")
            .level_indicator(:class="['color_level' + level]")
            table
              tr
                td
                  img.profile(:src='config.photoUrl.prefix+departmentData.manager.id+config.photoUrl.suffix')
                td
                  div.textdiv
                    .name(v-html="departmentData.name")
                    .name_manager(v-if="managerNameView") {{departmentData.manager.name}}
            i.material-icons.arrow.down(v-if='!departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(true)") arrow_drop_down
            i.material-icons.arrow.up(v-if='departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(false)") arrow_drop_up

      template(v-if="!departmentData")
        template(v-if='!managerPhotoView')
          .departmente(:class="[type]")
        template(v-else)
          .departmente2(:class="[type]")

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
    ...mapState([
      'columnView',
      'managerNameView',
      'managerPhotoView',
      'activeDepartment',
      'editMode',
      'moveDepartment',
      'config'
    ]),
    active: function() {
      return this.departmentData === this.activeDepartment
        ? 'active_department'
        : ''
    }
  },
  mounted: function() {},
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

    setActiveDepartment(department, event) {
      this.$store.commit('setActiveDepartment', department)
    },
    showCtxMenu(department, event) {
      this.$store.commit('setActiveDepartment', department)
      this.$store.commit('showEditMenu', null)

      this.$nextTick(e => {
        if (this.editMode) {
          this.$store.commit('showEditMenu', event)
        }
      })
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
.profile {
  width: 55px;
  max-height: 55px;
  display: block;
  margin: auto;
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
.departmente,
.department2,
.departmente2,
.department3 {
  width: 120px;
  height: 60px;
  border: 1px solid lightgrey;
  margin: 30px 0px 5px 0px;
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
  box-shadow: 3px 3px 3px lightgrey;
}
.department2,
.departmente2 {
  width: 180px;
  height: 60px;
  margin-top: 20px;
}
.department3 {
  height: 60px;
}
.departmente,
.departmente2 {
  background-color: transparent !important;
  border: none;
  box-shadow: none;
}
.level_indicator {
  position: absolute;
  height: 3px;
  width: 100px;
  right: 10px;
  top: 3px;
  border-radius: 5px;
}
.textdiv {
  width: 114px;
  height: 50px;
  position: relative;
}
.column {
  margin-top: 1px;
  margin-bottom: 0px;
}
.staff {
  margin: 2px 80px 2px 80px;
}
.name,
.name1,
.name2 {
  overflow-wrap: break-word;
  min-width: 1%;
  width: 114px;
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 8px;
}
.name1 {
  top: 10px;
}
.name2 {
  top: 14px;
}
.name_manager {
  overflow-wrap: break-word;
  min-width: 1%;
  width: 114px;
  display: inline-block;
  position: absolute;
  left: 0px;
  bottom: 5px;
  color: grey;
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
