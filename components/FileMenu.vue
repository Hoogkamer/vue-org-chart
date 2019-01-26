<template lang='pug'>
    .file(v-on:click='editMenuOpen = !editMenuOpen') File
      .file_menu(v-if='editMenuOpen')
          ul
            li 
              label.file_select(v-on:click="editMenuOpen=!editMenuOpen") Import excel
                input(type="file" v-on:change="importData")
            li(v-on:click="doExportXls") Export excel
            li(v-on:click="generateInputFile") Generate inputfile

</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

import { mapState } from 'vuex'
export default {
  data: function() {
    return {
      editMenuOpen: false
    }
  },
  computed: {
    ...mapState(['chart', 'people', 'assignments', 'editMode'])
  },
  watch: {
    editMode: function(val) {
      if (!val) {
        this.editMenuOpen = false
      }
    }
  },
  methods: {
    generateInputFile: function() {
      var chartTable = this.tree2array(this.chart, [])
      var json =
        'var INPUT_DATA=' +
        JSON.stringify({
          chart: chartTable,
          people: this.people,
          assignments: this.assignments
        })
      var blob = new Blob([json], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'data.js')
    },
    importData: function(infile) {
      var f = infile.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.onload = function(e) {
        var data = e.target.result
        var workbook = XLSX.read(data, { type: 'binary' })
        var chartdata = XLSX.utils.sheet_to_json(workbook.Sheets['chart'], {
          defval: ''
        })
        var people = XLSX.utils.sheet_to_json(workbook.Sheets['people'], {
          defval: ''
        })
        var assignments = XLSX.utils.sheet_to_json(
          workbook.Sheets['assignment'],
          {
            defval: ''
          }
        )
        var newchart = []

        chartdata.forEach(x => {
          var manager = people.find(p => p.id == x.manager_id)

          newchart.push({
            showChildren: false,
            parent: null,
            parentId: x.parent_id,
            children: null,
            isStaff: x.staff_department === 'Y' ? true : false,
            id: x.id,
            name: x.name,
            description: x.description,
            manager: manager ? manager : { name: '' }
          })
        })
        that.$store.commit('createTree', newchart)
        that.$store.commit('setPeople', people)
        that.$store.commit('setAssignments', assignments)
      }
      reader.readAsBinaryString(f)
    },
    doExportXls: function(a) {
      var chartTable = this.tree2array(this.chart, [])
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(chartTable),
        'chart'
      )
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(this.people),
        'people'
      )
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(this.assignments),
        'assignment'
      )
      XLSX.writeFile(wb, 'chart_data.xlsx')
    },
    tree2array(chart, array) {
      array.push({
        id: chart.id,
        name: chart.name,
        description: chart.description,
        parent_id: chart.parentId,
        staff_department: chart.isStaff ? 'Y' : 'N',
        manager_id: chart.manager.id
      })
      chart.children.forEach(child => this.tree2array(child, array))
      return array
    }
  }
}
</script>

<style scoped>
.file {
  padding: 10px;
  display: inline-block;
  position: relative;
}
.file_select,
.file {
  cursor: pointer;
}
.file_select > input[type='file'] {
  display: none;
}
.file_menu {
  font-size: 14px;
  background-color: #006696;
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 40px;
  width: 150px;
  border: 1px solid grey;
  border-top: 1px solid white;
}
ul {
  list-style: none;
  padding: 5px;
  text-align: left;
}

li:hover {
  background: lightblue;
  cursor: pointer;
  color: black;
}
</style>
