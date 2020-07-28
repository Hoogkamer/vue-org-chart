<template lang='pug'>
  .p-container(v-on:mousemove.selve="onMouseMove")
    page-header
    .container1(id='xparent')
      org-chart(v-if="chart")

    edit-menu(v-if="showEditMenu")
    #move_dept(v-if="moveDepartment" :style="{ left: page.left + 'px', top: page.top + 'px' }")
      div {{moveDepartment.name}}
      i.material-icons.arrow.down(v-if='moveDepartment.children.length') arrow_drop_down
    side-screen(v-if='chart')
    show-person(v-if='showPerson')
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import OrgChart from '~/components/OrgChart.vue'
import SideScreen from '~/components/SideScreen.vue'
import EditMenu from '~/components/EditMenu.vue'
import ShowPerson from '~/components/ShowPerson.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    OrgChart,
    PageHeader,
    SideScreen,
    EditMenu,
    ShowPerson
  },
  data: function() {
    return {
      page: { left: 0, top: 0 }
    }
  },
  computed: {
    ...mapState([
      'chart',
      'activeDepartment',
      'onlyShowParents',
      'showEditMenu',
      'moveDepartment',
      'showPerson'
    ]),
    urlParam: function() {
      if (!this.activeDepartment) {
        return null
      }
      var parents
      if (!this.activeDepartment.showParents) {
        parents = 'hide'
      } else if (this.onlyShowParents) {
        parents = 'only'
      } else {
        parents = 'all'
      }
      var children = this.activeDepartment.showChildren
        ? 'show'
        : 'hide'
      return {
        dept: this.activeDepartment.id,
        parents: parents,
        children: children
      }
    }
  },
  watch: {
    urlParam(qry) {
      this.setUrl(qry)
    }
  },
  mounted: function() {
    this.initStore()
    this.getUrl(this.$route.query)
  },
  methods: {
    ...mapActions([
      'initStore',
      'setActiveDepartmentById',
      'setHideParents',
      'setOnlyShowParents',
      'showChildren'
    ]),
    onMouseMove(e) {
      var chartpos = document
        .getElementById('chart')
        .getBoundingClientRect()

      this.page.left = e.clientX - 0 * chartpos.left + 10
      this.page.top = e.clientY - 0 * chartpos.top + 10
    },
    setUrl: function(qry) {
      this.$router.push({ path: this.$route.path, query: qry })
    },
    getUrl: function(qry) {
      if (qry && qry.dept) {
        this.setActiveDepartmentById(qry.dept)
        if (qry.parents == 'hide') {
          this.setHideParents(true)
        } else if (qry.parents == 'only') {
          this.setOnlyShowParents(true)
          this.setActiveDepartmentById(qry.dept)
        }
      }
      if (this.activeDepartment && qry.children == 'show') {
        this.showChildren(this.activeDepartment)
      }
      if (!this.activeDepartment) {
        this.$router.push({ path: this.$route.path, query: null })
      }
    }
  }
}
</script>

<style>
*:focus {
  outline: 0;
}
body {
  background-color: white;
  overflow: hidden;
}
#move_dept {
  position: absolute;
  width: 114px;
  height: 50px;
  margin: 4px 10px;
  text-align: center;
  font-size: 11px;
  vertical-align: middle;
  display: flex;
  border-radius: 3px;
  align-items: center; /* align vertical */

  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 2px 2px;
  box-sizing: border-box;
  top: 0px;
  left: 0px;
  border: 1px dashed #006696;
}
</style>
