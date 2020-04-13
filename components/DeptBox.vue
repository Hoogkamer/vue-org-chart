<template lang='pug'>
    div(v-on:mouseenter="mouseOverBox(true)" v-on:mouseleave="mouseOverBox(false)")
      template(v-if="departmentData")
        // layout of department box WITHOUT manager photo
        template(v-if="!managerPhotoView")
          .department( :id="'ID_'+ departmentData.id" :class="[type, active]" v-on:click="setActiveDepartment(departmentData, $event)" v-on:contextmenu.prevent="showCtxMenu(departmentData,  $event)")
            .level_indicator(:style="{backgroundColor:config.levelColors[level-1]||'#FFFFFF'}")
            template(v-if="managerNameView")
              .name1(v-html="departmentData.name")
              .name_manager(v-if="managerNameView") {{departmentData.manager.name}}
            template(v-else)
              .name2(v-html="departmentData.name")
            template(v-if="departmentData.children.length")
              i.material-icons.arrow.down(v-if='!departmentData.showChildren' v-on:click="doShowChildren(true)") arrow_drop_down
              i.material-icons.arrow.up(v-if='departmentData.showChildren' v-on:click="doShowChildren(false)") arrow_drop_up
              template(v-if="showNrDepartments")
                div.hidden_dept.down(v-if='!departmentData.showChildren' v-on:click="doShowChildren(true)" title='Nr of subdepartments') {{departmentData.children.length}}
                div.hidden_dept.up(v-if='departmentData.showChildren' v-on:click="doShowChildren(false)" title='Nr of subdepartments') {{departmentData.children.length}}
            template(v-if="showNrPeople")
              div.ppl_count(v-if='count_department_people(departmentData)' title='Nr of people in department') {{count_department_people(departmentData)}}
            
            i.material-icons.view_button(v-if="displaySiblingIcon" v-on:click="showViewMenu(departmentData, $event)" title="view options") visibility
            i.material-icons.hidden_parents1(v-if="hiddenParents" v-on:click="setHideParents(false)") more_vert
        
        // layout of department box WITH manager photo    
        template(v-else)
          .department.manager_photo(:id="'ID_'+ departmentData.id" :class="[type, active]" v-on:click="setActiveDepartment(departmentData, $event)" v-on:contextmenu.prevent="showCtxMenu(departmentData,  $event)")
            .level_indicator(:style="{backgroundColor:config.levelColors[level-1]||'#FFFFFF'}")
            table
              tr
                td
                  img.profile(:src='config.photoUrl.prefix+departmentData.manager.photo+config.photoUrl.suffix' v-if="departmentData.manager.photo")
                  .profile(v-else)
                td
                  div.textdiv
                    .name(v-html="departmentData.name")
                    .name_manager(v-if="managerNameView") {{departmentData.manager.name}}
            template(v-if="departmentData.children.length")
              i.material-icons.arrow.down(v-if='!departmentData.showChildren' v-on:click="doShowChildren(true)") arrow_drop_down
              i.material-icons.arrow.up(v-if='departmentData.showChildren' v-on:click="doShowChildren(false)") arrow_drop_up
              template(v-if="showNrDepartments")
                div.hidden_dept.down(v-if='!departmentData.showChildren' v-on:click="doShowChildren(true)" title='Nr of subdepartments') {{departmentData.children.length}}
                div.hidden_dept.up(v-if='departmentData.showChildren' v-on:click="doShowChildren(false)" title='Nr of subdepartments') {{departmentData.children.length}}
            template(v-if="showNrPeople")
              div.ppl_count(v-if='count_department_people(departmentData)' title='Nr of people in department') {{count_department_people(departmentData)}}
            
            i.material-icons.view_button(v-if="displaySiblingIcon" v-on:click="showViewMenu(departmentData, $event)" title="view options") visibility
            i.material-icons.hidden_parents(v-if="hiddenParents" v-on:click="setHideParents(false)") more_vert   
      template(v-if="!departmentData")
          .department.invisible(v-if='!managerPhotoView' :class="[type]")
          .department.manager_photo.invisible(v-else :class="[type]")

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DeptBox',
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
    return {
      displaySiblingIcon: false,
      hiddenDept: 5
    }
  },
  computed: {
    ...mapState([
      'managerNameView',
      'managerPhotoView',
      'activeDepartment',
      'editMode',
      'config',
      'chart',
      'assignments',
      'showNrPeople',
      'showNrDepartments'
    ]),
    active: function() {
      return this.departmentData === this.activeDepartment
        ? 'active_department'
        : ''
    },
    hiddenParents: function() {
      return this.departmentData === this.chart && this.chart.parent
    }
  },
  methods: {
    ...mapActions([
      'showChildren',
      'hideChildren',
      'setHideSiblings',
      'setHideParents'
    ]),

    doShowChildren(down) {
      var department =
        this.departmentData.parent &&
        !this.departmentData.parent.showChildren &&
        down
          ? this.departmentData.parent
          : this.departmentData
      if (down) {
        this.showChildren(department)
      } else {
        this.hideChildren(department)
      }
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
    },
    showViewMenu(department, event) {
      this.$store.commit('setActiveDepartment', department)
      this.$store.commit('showViewMenu', null)

      this.$nextTick(e => {
        this.$store.commit('showViewMenu', event)
      })
    },
    mouseOverBox(value) {
      if (!value) {
        this.displaySiblingIcon = false
      } else {
        if (
          this.departmentData.parent &&
          this.departmentData.parent.showChildren
        ) {
          this.displaySiblingIcon = true
        }
      }
    },
    hideSiblings() {
      this.setHideSiblings(this.departmentData)
    },
    count_department_people: function(dept) {
      var person_ids = this.assignments.filter(a => a.department_id == dept.id)
      return person_ids.length
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
  border-radius: 30px;
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
.view_button {
  font-size: 24px;
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 0px;
  color: black;
}
.department {
  width: 120px;
  height: 60px;
  border: 1px solid rgb(180, 180, 180);
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
  /*box-shadow: 3px 3px 3px lightgrey;*/
}
.manager_photo {
  width: 180px;
  height: 60px;
  margin-top: 20px;
}
.invisible {
  visibility: hidden;
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
.staff,
.staff_column {
  margin: 2px 80px 2px 80px;
}
.staff_child {
  margin: 2px 80px 2px 100px;
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
  width: 100px;
  display: inline-block;
  position: absolute;
  left: 5px;
  bottom: 5px;
  color: grey;
}
.hidden_dept {
  position: absolute;
  bottom: 10px;
  right: 1px;
  width: 14px;
  background-color: white;
  color: grey;
  font-size: 12px;
  padding: 0px 2px;
  border-radius: 4px;
}
.ppl_count {
  position: absolute;
  bottom: 1px;
  left: 1px;
  background-color: white;
  color: grey;
  font-size: 12px;
  padding: 0px 2px;
  border-radius: 4px;
}
.hidden_parents,
.hidden_parents1 {
  position: absolute;
  top: -24px;
  left: 78px;
  font-size: 24px;
  color: grey;
}
.hidden_parents1 {
  left: 50px;
}
</style>
