<template lang='pug'>
   #person_details_container
    #person_details
      i.material-icons.close(@click='setShowPerson(null)') close
      .personname(v-if="showPerson.name") {{showPerson.name}}
      .personname(v-else) Add new employee
      .content
        .photo
          img.im(v-if="photoUrl" :src='photoUrl' @error="markPhotoNotFound(showPerson)")
          .material-icons.nophoto(v-else) face
          template(v-if='editMode')
            span.prop Photo id
            input.val1(v-model='employeePhoto')
        .details
          table.tab
            template(v-if='config.linkUrl')
              tr
                td(colspan="2").btn
                  button(@click='gotoExtProfile(showPerson)') Open profile information
            template(v-else)
              tr
                template(v-if='!editMode')
                  td.prop Name
                  td.val {{employeeName}}
                template(v-else)
                  td.prop.must Name*
                  td.val
                    input.val1(v-model='employeeName')
              tr
                template(v-if='!editMode')
                  td.prop Employee ID
                  td.val {{employeeID}}
                template(v-else)
                  td.prop.must Employee ID*
                  td.val
                    input.val1(v-model='employeeID')
              tr
                td.prop Function
                td.val(v-if='!editMode') {{employeeFunctionName}}
                td.val(v-else)
                  input.val1(v-model='employeeFunctionName') 

              tr(v-for="prop in config.personProperties")
                td.prop {{prop.name}}
                td
                  template(v-if='!editMode')
                    a(v-if='prop.type=="url"' :href="getPropName(prop)" target="_blank") {{getPropName(prop)}}
                    a(v-else-if='prop.type=="email"' :href = '"mailto: "+ getPropName(prop)') {{getPropName(prop)}}
                    span(v-else) {{getPropName(prop)}}
                  template(v-else)
                    input(type="text" :value="getPropName(prop)" @input="setPropName(prop, $event.target.value)")
           
             
            tr(v-if="!showPerson.new")
              td.prop Departments
              td.val
                .dep(v-for='assignment in personAssignments' @click='gotoDepartment(assignment.department)') 
                  span {{assignment.department.name}}  
                  span.role {{assignment.role}}
        div
          button.btn1(v-if="showPerson.new" @click='addEmployee(showPerson)' :disabled='!employeeID || !employeeName') ADD
          button.btn2(v-if="editMode" @click='deleteEmployee1(showPerson)' title='Removes the user from all departments and completely deletes the user') Delete this user
   
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'showPerson',
      'personProperties',
      'config',
      'people',
      'chart',
      'orgArray',
      'editMode',
      'activeDepartment'
    ]),
    employeeID: {
      get() {
        return this.$store.state.showPerson.id
      },
      set(value) {
        this.$store.commit('setShowPersonID', value)
      }
    },
    employeePhoto: {
      get() {
        return this.$store.state.showPerson.photo
      },
      set(value) {
        this.$store.commit('setShowPersonPhoto', value)
      }
    },
    employeeName: {
      get() {
        return this.$store.state.showPerson.name
      },
      set(value) {
        this.$store.commit('setShowPersonName', value)
      }
    },

    employeeFunctionName: {
      get() {
        return this.$store.state.showPerson.functionName
      },
      set(value) {
        this.$store.commit('setShowPersonFunctionName', value)
      }
    },
    photoUrl: function() {
      if (!this.showPerson.photo) return null
      return (
        this.config.photoUrl.prefix +
        this.showPerson.photo +
        this.config.photoUrl.suffix
      )
    },
    personAssignments: function() {
      let assignments = this.showPerson.departments
      //assignments.sort((a, b) =>
      //   a.department.name.localeCompare(b.department.name)
      // )
      return assignments
    }
  },
  mounted: function() {
    console.log(this.personProperties)
  },
  methods: {
    ...mapMutations([
      'setShowPerson',
      'setShowPersonProperty',
      'addPerson',
      'updateActiveDepartmentManager',
      'addAssignment',
      'deleteEmployee'
    ]),
    ...mapActions(['setShowDepartment']),
    gotoDepartment(d) {
      console.log(d)
      this.setShowPerson(null)
      this.setShowDepartment(d)
    },
    gotoExtProfile(person) {
      var url =
        this.config.linkUrl.prefix +
        person.id +
        this.config.linkUrl.suffix
      window.open(url, '_blank')
    },
    markPhotoNotFound(person) {
      console.log('person photo not found', person)
    },
    getPropName(prop) {
      return this.$store.state.showPerson.fields[prop.name]
    },
    setPropName(prop, value) {
      console.log(prop, value)
      this.$store.commit('setShowPersonProperty', {
        prop: prop,
        value: value
      })
    },
    deleteEmployee1(person) {
      console.log('Deleting', person)
      if (
        confirm('This will remove the person completely. Continue?')
      ) {
        this.deleteEmployee(person)
        this.setShowPerson(null)
      }
    },
    addEmployee(person) {
      console.log('adding', person)
      if (this.people.find(p => p.id == person.id)) {
        alert('A person with this id already exists')
      } else {
        let ismanager = person.manager
        this.addPerson(person)
        this.setShowPerson(null)
        if (ismanager) {
          this.updateActiveDepartmentManager(person)
        } else {
          this.addAssignment({
            department: this.activeDepartment,
            person: person,
            role: ''
          })
        }
      }
    }
  }
}
</script>
<style scoped>
#person_details_container {
  top: 50px;
  width: 100%;
  position: absolute;
  height: 100%;
  background: rgba(200, 200, 200, 0.8);
  z-index: 2;
  text-align: center;
}
#person_details {
  max-width: 700px;
  text-align: left;
  vertical-align: top;
  margin: auto;
  margin-top: 10px;
  display: inline-block;
  display: relative;
  background-color: white;
  padding: 5px;
  z-index: 2;
  border: 0px solid grey;
  padding: 3px 10px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
}
.close {
  margin: 10px;
  font-size: 24px;
  background-color: grey;
  color: white;
  border-radius: 3px;
  float: right;
  cursor: pointer;
}
.close:hover {
  background-color: lightgray;
  color: black;
}
.photo {
  width: 200px;
  height: 200px;
  display: inline-block;
  margin: 0px 10px;
}
.details {
  width: 350px;
  display: inline-block;
  text-align: left;
  vertical-align: top;
}
.tab {
  margin-bottom: 10px;
  width: 400px;
}
.prop {
  width: 120px;
  color: grey;
  text-align: left;
}
.must {
  color: red;
}
.tab .val {
  color: black;
  text-align: left;
  width: 400px;
}
.tab .val1 {
  width: 250px;
}
.section {
  color: grey;
  font-weight: 600;
}
.im {
  width: 100%;
}
.personname {
  width: 100%;
  text-align: left;
  padding: 10px;
  color: black;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}
table td,
table td * {
  vertical-align: top;
}
.role {
  color: grey;
}
.dep {
  cursor: pointer;
}
.dep:hover {
  background-color: lightblue;
}
.btn {
  text-align: center;
  column-span: 2;
}
.btn button {
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}
.btn1 {
  padding: 10px 20px;
  border: 2px solid green;
  border-radius: 5px;
  color: white;
  background-color: green;
  cursor: pointer;
}
.btn1:disabled {
  color: grey;
  border: 2px solid lightgrey;
  background-color: lightgrey;
  cursor: not-allowed;
}
.btn2 {
  padding: 5px 20px;
  border: 2px solid red;
  border-radius: 5px;
  color: white;
  background-color: red;
  cursor: pointer;
}
.nophoto {
  font-size: 200px;
  color: lightgrey;
}
</style>
