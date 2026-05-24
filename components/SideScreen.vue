<template lang='pug'>
  .side-screen(v-if="showSideScreen")
    button.right(v-on:click="$store.commit('closeSideScreen')")
      i.material-icons.arrow keyboard_arrow_left
    template(v-if="activeDepartment")
      .title {{activeDepartment.name}}
      .tabs
        button.tab(:class='{active:activeTab===1}' v-on:click='activeTab=1') {{uiNames.sidebar.detailTabName}}
        button.tab(:class='{active:activeTab===2}' v-on:click='activeTab=2') {{uiNames.sidebar.peopleTabName}}
      department-details(v-if="activeTab===1")    
      employee-list(v-if='activeTab===2')
      
  .noside-screen(v-else)
    button.right(v-on:click="$store.commit('openSideScreen')")
      i.material-icons.arrow keyboard_arrow_right
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import EmployeeList from '~/components/EmployeeList.vue'
import DepartmentDetails from '~/components/DepartmentDetails.vue'

export default {
  components: { EmployeeList, DepartmentDetails },
  data: function() {
    return {
      personPicker: null,
      activeTab: 1,
      noPhotos: []
    }
  },
  computed: {
    ...mapState([
      'showSideScreen',
      'activeDepartment',
      'people',
      'config',
      'uiNames'
    ])
  },
  methods: {
    ...mapActions(['setShowDepartment']),
    ...mapMutations(['setShowPerson', 'updateRole'])
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  min-height: 40px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  width: calc(100% - 30px);
  transition: color var(--transition-speed);
}

.name {
  font-size: 16px;
  color: var(--text-primary);
}
.role {
  color: var(--text-secondary);
  font-size: 13px;
}

.tabs {
  width: 100%;
  margin-bottom: 20px;
  padding: 0px 10px;
  border-bottom: 2px solid var(--border-color);
  display: flex;
  gap: 8px;
  transition: border-color var(--transition-speed);
}
.tab {
  flex: 1;
  text-align: center;
  padding: 8px 0px;
  border: none;
  background: none;
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  color: var(--text-muted);
  transition: color var(--transition-speed), border-color var(--transition-speed);
}
.tab.active {
  color: var(--accent-color);
  border-bottom: 2px solid var(--accent-color);
}

input.name {
  width: calc(100% - 10px);
}

.side-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 300px;
  height: 100vh;
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-sidebar);
  box-shadow: var(--sidebar-shadow);
  padding: 15px;
  overflow: auto;
  padding-bottom: 80px;
  z-index: 5;
  transition: background-color var(--transition-speed), border-color var(--transition-speed), box-shadow var(--transition-speed);
}
.noside-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 25px;
  height: 45px;
  border: 1px solid var(--border-color);
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: var(--bg-sidebar);
  box-shadow: var(--sidebar-shadow);
  z-index: 9;
  transition: background-color var(--transition-speed), border-color var(--transition-speed), box-shadow var(--transition-speed);
}

.right {
  position: absolute;
  right: 8px;
  top: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  transition: color var(--transition-speed);
}
.right:focus {
  outline: none;
}
.right:hover {
  color: var(--accent-color);
}
</style>
