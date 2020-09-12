<template lang='pug'>
    .file(v-on:click='editMenuOpen = !editMenuOpen')
      i.material-icons.screenshot(v-on:click="" title='Load/Save/Config') save
      .file_menu(v-if='editMenuOpen')
          ul
            li
              label.file_select(v-on:click="editMenuOpen=!editMenuOpen") Import excel
                input(type="file" v-on:change="importData")
            li(v-on:click="doExportXls") Export excel
            li(v-on:click="generateInputFile") Generate inputfile
            li(v-on:click="editConfig") Configure options

</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data: function() {
    return {
      editMenuOpen: false
    }
  },
  computed: {
    ...mapState([
      'chart',
      'orgArray',
      'people',
      'assignments',
      'editMode',
      'config'
    ])
  },
  watch: {
    editMode: function(val) {
      if (!val) {
        this.editMenuOpen = false
      }
    }
  },
  mounted: function() {
    //this.setHideParents(false)
  },
  methods: {
    ...mapMutations(['setHideParents']),

    editConfig: function() {
      this.$emit('editconfig', true)
    },
    generateInputFile: function() {
      var chartTable = this.tree2JSON(
        this.orgArray.find(d => d.parent_id === '')
      )
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1 //January is 0!
      var yyyy = today.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }
      var updated = '"' + dd + '-' + mm + '-' + yyyy + '"'

      let people = []
      let assignments = []
      this.people.forEach((p, i) => {
        let person = Object.assign({}, p)
        delete person.departments
        people.push(person)
        if (p.departments) {
          p.departments.forEach(d => {
            if (d.role !== 'Manager') {
              assignments.push({
                department_id: d.department.id,
                id: i,
                person_id: p.id,
                role: d.role
              })
            }
          })
        }
      })
      var json =
        'var INPUT_DATA=' +
        JSON.stringify({
          api_version: '2.0',
          chart: chartTable,
          people: people,
          assignments: assignments
        }) +
        ';var UPDATED_ON=' +
        updated
      var blob = new Blob([json], {
        type: 'text/plain;charset=utf-8'
      })
      FileSaver.saveAs(blob, 'data.js')
      alert(
        'File generated. \n Overwrite the data.js file (in the root folder) with this file.'
      )
    },
    importData: function(infile) {
      var f = infile.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.onload = function(e) {
        var data = e.target.result
        var workbook = XLSX.read(data, { type: 'binary' })
        var chartdata = XLSX.utils.sheet_to_json(
          workbook.Sheets['chart'],
          {
            defval: ''
          }
        )
        var people = XLSX.utils.sheet_to_json(
          workbook.Sheets['people'],
          {
            defval: ''
          }
        )

        //check if old format
        // find al columns with 'field_' in it and place in fields object
        let fields = Object.keys(people[0]).filter(
          n => n.search('field_') === 0
        )
        console.log(fields)
        if (fields.length) {
          // is new format
          console.log('reading new format excel')
          people.forEach(p => {
            p.fields = {}
            fields.forEach(f => {
              p.fields[f.substring(6)] = p[f]
              delete p[f]
            })
          })
        } else {
          console.log(' old format excel')
        }

        console.log(people[0])
        debugger

        var assignments = XLSX.utils.sheet_to_json(
          workbook.Sheets['assignment'],
          {
            defval: ''
          }
        )
        var newchart = []

        chartdata.forEach(x => {
          var manager = people.find(p => p.id == x.manager_id)
          var dataFields = []
          for (var property in x) {
            if (x.hasOwnProperty(property)) {
              if (property.indexOf('DATA_') === 0) {
                var name = property.substring(5).replace(/_/g, ' ')
                var fnd = that.config.dataFields.find(
                  d => d.name === name
                )
                var type = fnd ? fnd.type : ''
                dataFields.push({
                  name: name,
                  value: x[property],
                  type
                })
              }
            }
          }
          newchart.push({
            showChildren: false,
            employees: [],
            parent: null,
            parentId: x.parent_id,
            children: null,
            isStaff: x.staff_department === 'Y' ? true : false,
            id: x.id,
            name: x.name,
            description: x.description,
            manager: manager ? manager : { name: '' },
            dataFields: dataFields
          })
        })
        that.$store.commit('createTree', newchart)
        that.$store.commit('processAssignments', {
          departments: newchart,
          people: people,
          assignments: assignments
        })

        that.$store.commit('setPeople', people)
        that.$store.commit('setAssignments', assignments)
        that.$store.commit('setActiveDepartment', null)
        alert('Data is imported')
      }
      reader.readAsBinaryString(f)
    },
    doExportXls: function(a) {
      let people = []
      let assignments = []
      this.people.forEach((p, i) => {
        let person = Object.assign({}, p)
        delete person.departments
        delete person.manager

        this.config.personProperties.forEach(prop => {
          person['field_' + prop.name] = person.fields[prop.name]
        })

        delete person.fields

        people.push(person)
        if (p.departments) {
          p.departments.forEach(d => {
            if (d.role !== 'Manager') {
              assignments.push({
                department_id: d.department.id,
                id: i,
                person_id: p.id,
                role: d.role
              })
            }
          })
        }
      })

      var chartTable = this.tree2array(
        this.orgArray.find(d => d.parent_id === ''),
        []
      )
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(chartTable),
        'chart'
      )
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(people),
        'people'
      )
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(assignments),
        'assignment'
      )
      XLSX.writeFile(wb, 'chart_data.xlsx')
    },
    tree2array(chart, array) {
      var dataFields = {}
      if (chart.dataFields) {
        dataFields = chart.dataFields.reduce(function(acc, cur, i) {
          var name = 'DATA_' + cur.name.replace(/ /g, '_')
          acc[name] = cur.value
          return acc
        }, {})
      }
      console.log(chart.dataFields, dataFields)
      array.push({
        id: chart.id,
        name: chart.name,
        description: chart.description,
        parent_id: chart.parent ? chart.parent.id : '',
        staff_department: chart.isStaff ? 'Y' : 'N',
        manager_id: chart.manager.id,
        ...dataFields
      })
      chart.children.forEach(child => this.tree2array(child, array))
      return array
    },
    tree2JSON(chart) {
      var children = []
      chart.children.forEach(child => {
        children.push(this.tree2JSON(child))
      })

      var result = {
        id: chart.id,
        name: chart.name,
        description: chart.description,
        parent_id: chart.parent ? chart.parent.id : '',
        staff_department: chart.isStaff ? 'Y' : 'N',
        manager_id: chart.manager.id,
        dataFields: chart.dataFields,
        children: children,
        showChildren: chart.showChildren
      }
      return result
    },
    tree2arrayJSON(chart, array) {
      array.push({
        id: chart.id,
        name: chart.name,
        description: chart.description,
        parent_id: chart.parent ? chart.parent.id : '',
        staff_department: chart.isStaff ? 'Y' : 'N',
        manager_id: chart.manager.id,
        dataFields: chart.dataFields
      })
      chart.children.forEach(child =>
        this.tree2arrayJSON(child, array)
      )
      return array
    }
  }
}
</script>

<style scoped>
.file {
  display: inline-block;
  position: relative;
}
.file {
  display: inline-block;
  box-sizing: content-box;
  position: absolute;
  top: 10px;
  left: 130px;
}
.screenshot {
  cursor: pointer;
  color: white;
  border: 1px solid red;
}
.screenshot:hover {
  border: 1px solid white;
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
  top: 35px;
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
