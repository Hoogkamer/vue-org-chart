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

              tr
                td.prop Email
                td(v-if='!editMode') 
                  a(:href = '"mailto: "+ employeeEmail') {{employeeEmail}}
                td(v-else)
                  input.val1(v-model='employeeEmail')
              tr
                td.prop Phone
                td(v-if='!editMode') {{employeePhone}}
                td(v-else)
                  input.val1(v-model='employeePhone')
              tr
                td.prop Homepage
                td(v-if='!editMode') 
                  a(:href="employeeHomePage" target="_blank") {{employeeHomePage}}
                td(v-else)
                  input.val1(v-model='employeeHomePage')
              tr
                td.prop Country
                td(v-if='!editMode') {{employeeCountry}}
                td(v-else)
                  input.val1(v-model='employeeCountry')
              tr
                td.prop City
                td(v-if='!editMode') {{employeeCity}}
                td(v-else)
                  input.val1(v-model='employeeCity')
              tr
                td.prop Street
                td(v-if='!editMode') {{employeeStreet}}
                td(v-else)
                  input.val1(v-model='employeeStreet')
           
             
            tr(v-if="!showPerson.new")
              td.prop Departments
              td.val
                .dep(v-for='assignment in personAssignments' @click='goto(assignment.department)') 
                  span {{assignment.department.name}}  
                  span.role {{assignment.role}}

          table.tab
            tr(v-for="prop in personProperties")
              td {{prop.name}}   
              td
                input(type="text" :value="getProp(prop)" @input="setProp(prop, $event.target.value)")
 

        div
          button.btn1(v-if="showPerson.new" @click='addEmployee(showPerson)' :disabled='!employeeID || !employeeName') ADD
   
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
    employeeCountry: {
      get() {
        return this.$store.state.showPerson.country
      },
      set(value) {
        this.$store.commit('setShowPersonCountry', value)
      }
    },
    employeeCity: {
      get() {
        return this.$store.state.showPerson.city
      },
      set(value) {
        this.$store.commit('setShowPersonCity', value)
      }
    },
    employeeStreet: {
      get() {
        return this.$store.state.showPerson.street
      },
      set(value) {
        this.$store.commit('setShowPersonStreet', value)
      }
    },
    employeeEmail: {
      get() {
        return this.$store.state.showPerson.email
      },
      set(value) {
        this.$store.commit('setShowPersonEmail', value)
      }
    },
    employeePhone: {
      get() {
        return this.$store.state.showPerson.phone
      },
      set(value) {
        this.$store.commit('setShowPersonPhone', value)
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
    employeeHomePage: {
      get() {
        return this.$store.state.showPerson.homepage
      },
      set(value) {
        this.$store.commit('setShowPersonHomePage', value)
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
      'addAssignment'
    ]),
    ...mapActions(['setShowDepartment']),
    goto(d) {
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
    getProp(prop) {
      console.log(
        prop.name.toLowerCase(),
        this.$store.state.showPerson
      )
      return this.$store.state.showPerson[prop.name.toLowerCase()]
    },
    setProp(prop, value) {
      console.log(prop, value)
      this.$store.commit('setShowPersonProperty', {
        prop: prop,
        value: value
      })
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
  padding: 50px;
  width: 100%;
  position: absolute;
  height: 100%;
  background: rgba(200, 200, 200, 0.8);
  z-index: 2;
  text-align: center;
}
#person_details {
  width: 700px;
  text-align: left;
  vertical-align: top;
  margin: auto;
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
  font-size: 16px;
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
.nophoto {
  font-size: 200px;
  color: lightgrey;
}
</style>
