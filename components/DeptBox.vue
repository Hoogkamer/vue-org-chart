<template lang='pug'>
    div()
      template(v-if="departmentData")
        i.material-icons.hidden_parents(v-if="hiddenParents" v-on:click="setHideParents(false)" title="Show parents") more_vert 
        .department
          .col( :id="'ID_'+ departmentData.id" :class="[type, active, managerPhoto]"  @click="setActiveDepartment(departmentData, $event)" @touchend="setActiveDepartment(departmentData, $event)" v-on:contextmenu.prevent="showCtxMenu(departmentData,  $event)" v-on:mouseenter="mouseOverBox(true)" v-on:mouseleave="mouseOverBox(false)")  
            i.material-icons.view_button(v-if="displaySiblingIcon" v-on:click="showViewMenu(departmentData, $event)" title="Show/hide parents") visibility
            table
              tr
                td.ppl_count0
                  .ppl_count(v-if="showNrPeople")
                    .ppl_count_nr(v-if='departmentData.employees.length' :title= "departmentData.employees.length + (departmentData.employees.length===1? ' person in this department': ' people in this department')") {{departmentData.employees.length}}
                td(v-if='managerPhotoView')
                  img.profile(:src='config.photoUrl.prefix+departmentData.manager.photo+config.photoUrl.suffix' v-if="departmentData.manager.photo")
                  .material-icons.nophoto(v-else) face
                td
                  .level_indicator(:style="{backgroundColor:config.levelColors[level-1]||'#FFFFFF'}")
                  div.textdiv(:style="{ height: config.boxHeight + 'px', width: config.boxWidth + 'px' }")
                    .name(v-html="departmentData.name")
                    .name_manager(v-if="managerNameView") {{departmentData.manager.name}}
                td.drill0
                  .drill 
                    template(v-if="departmentData.children.length")
                      i.material-icons.arrow.down(v-if='!departmentData.showChildren' @click.prevent="doShowChildren(true)" @touchend.prevent="doShowChildren(true)") arrow_drop_down
                      i.material-icons.arrow.up(v-if='departmentData.showChildren' @click.prevent="doShowChildren(false)" @touchend.prevent="doShowChildren(false)") arrow_drop_up
                      template(v-if="showNrDepartments")
                        div.hidden_dept.down(v-if='!departmentData.showChildren' @click.prevent="doShowChildren(true)" @touchend.prevent="doShowChildren(true)" :title="departmentData.children.length + ' subdepartment' + (departmentData.children.length===1?'':'s')") {{departmentData.children.length}}
                        div.hidden_dept.up(v-if='departmentData.showChildren' @click.prevent="doShowChildren(false)" @touchend.prevent="doShowChildren(false)" :title="departmentData.children.length + ' subdepartment' + (departmentData.children.length===1?'':'s')") {{departmentData.children.length}}

         
          
         
            
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
      'showNrPeople',
      'showNrDepartments'
    ]),
    managerPhoto: function() {
      return this.managerPhotoView ? 'manager_photo' : ''
    },
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
      'setHideParents',
      'toggleHideParents'
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
      this.toggleHideParents()

      /*
      this.$store.commit('setActiveDepartment', department)
      this.$store.commit('showViewMenu', null)
      
      this.$nextTick(e => {
        this.$store.commit('showViewMenu', event)
      })
      */
    },
    mouseOverBox(value) {
      if (!value) {
        this.displaySiblingIcon = false
      } else {
        if (
          this.departmentData.parent //&& this.departmentData.parent.showChildren
        ) {
          this.displaySiblingIcon = true
        }
      }
    },
    hideSiblings() {
      this.setHideSiblings(this.departmentData)
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
  border-radius: 50%;
  border: 2px solid var(--border-color);
  box-shadow: var(--card-shadow);
  transition: border-color var(--transition-speed);
}
.active_department {
  border: 2px solid var(--accent-color) !important;
  box-shadow: 0 0 14px var(--accent-glow) !important;
  background-color: var(--bg-card) !important;
}
.arrow {
  font-size: 30px;
  bottom: -5px;
  right: 0px;
  margin: -8px;
}
.down, .up {
  cursor: pointer;
  transition: color var(--transition-speed);
}
.down:hover,
.up:hover {
  color: var(--accent-color);
}
.view_button {
  font-size: 18px;
  position: absolute;
  top: 4px;
  right: 4px;
  margin: 0px;
  color: var(--text-muted);
  z-index: 2;
  transition: color var(--transition-speed);
}
.view_button:hover {
  color: var(--accent-color);
}
.drill {
  width: 10px;
  height: 100%;
  position: absolute;
  bottom: 0px;
}
.drill0,
.ppl_count0 {
  position: relative;
  height: 100%;
}
.ppl_count {
  height: 100%;
  color: var(--text-muted);
  font-size: 12px;
}
.ppl_count_nr {
  position: absolute;
  bottom: 0px;
  left: -10px;
  color: var(--text-primary);
  font-size: 11px;
  font-weight: 700;
  background-color: var(--bg-secondary);
  padding: 0px 5px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  transition: background-color var(--transition-speed), border-color var(--transition-speed), color var(--transition-speed);
}
.department {
  border: 0px solid transparent;
  text-align: center;
  font-size: 11px;
  vertical-align: middle;
  display: flex;
  border-radius: var(--card-radius);
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  background-color: transparent;
  margin-left: auto;
  margin-right: auto;
  padding: 2px 2px;
  position: relative;
  width: 100%;
}
.manager_photo {
  margin-top: 20px;
}
.invisible {
  visibility: hidden;
}
.level_indicator {
  border-radius: 4px;
  height: 5px;
  margin-bottom: 5px;
}
.textdiv {
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
  min-height: 1.9rem;
  color: var(--text-primary);
  font-weight: 700;
  transition: color var(--transition-speed);
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
  display: inline-block;
  color: var(--text-secondary);
  font-size: 11px;
  transition: color var(--transition-speed);
}
.hidden_dept {
  position: absolute;
  bottom: 5px;
  width: 16px;
  color: var(--text-primary);
  font-size: 10px;
  font-weight: 700;
  padding: 1px 3px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: background-color var(--transition-speed), border-color var(--transition-speed), color var(--transition-speed);
}

.hidden_parents,
.hidden_parents1 {
  font-size: 24px;
  color: var(--text-muted);
  cursor: pointer;
  transition: color var(--transition-speed);
}
.hidden_parents:hover,
.hidden_parents1:hover {
  color: var(--accent-color);
}
.hidden_parents1 {
  left: 50px;
}
.nophoto {
  font-size: 52px;
  color: var(--text-muted);
}
.col {
  border: 1px solid var(--border-color);
  border-collapse: collapse;
  margin: auto;
  padding: 8px 12px;
  border-radius: var(--card-radius);
  position: relative;
  background-color: var(--bg-card);
  box-shadow: var(--card-shadow);
  transition: transform var(--transition-speed), box-shadow var(--transition-speed), border-color var(--transition-speed), background-color var(--transition-speed);
}
.col:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--accent-color);
}
.material-icons.arrow {
  position: absolute;
  bottom: -5px;
}
</style>
