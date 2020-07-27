<template lang='pug'>
  .side-screen(v-if="showSideScreen")
    button.right(v-on:click="$store.commit('closeSideScreen')")
      i.material-icons.arrow keyboard_arrow_left
    template(v-if="activeDepartment")
      .title {{activeDepartment.name}}
      .tabs
        button.tab(:class='{active:activeTab===1}' v-on:click='activeTab=1') Details
        button.tab(:class='{active:activeTab===2}' v-on:click='activeTab=2') People
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
  components: { PersonPicker, EmployeeList, DepartmentDetails },
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
      'config'
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
  min-height: 50px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  width: calc(100% - 30px);
}

.name {
  font-size: 16px;
}
.role {
  color: grey;
  font-size: 14px;
}

.tabs {
  width: 100%;
  margin-bottom: 20px;
  padding: 0px 10px;
  border-bottom: 2px solid lightgrey;
}
.tab {
  width: 120px;
  margin: 0px 0px 0px 0px;
  border: none;
  background: none;
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;
  outline: none;
  cursor: pointer;
}
.tab.active {
  border: 2px solid lightgrey;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: lightgrey;
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
  border-right: 0px solid lightgrey;
  background-color: #f9f5f5;
  padding: 5px;
  overflow: auto;
  padding-bottom: 80px;
}
.noside-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 25px;
  height: 45px;
  border: 0px solid lightgray;
  background-color: #f9f5f5;
  z-index: 9;
}

.right {
  position: absolute;
  right: 0px;
  top: 10px;
  background-color: transparent;
  border: 0px solid grey;
  padding: 1px;
  cursor: pointer;
}
.right:focus {
  outline: none;
}
</style>
