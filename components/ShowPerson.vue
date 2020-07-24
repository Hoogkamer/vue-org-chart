<template lang='pug'>
   #person_details_container
    #person_details
      i.material-icons.close(@click='setShowPerson(null)') close
      .personname {{showPerson.name}}
      .content
        .photo
          img.im(v-if="photoUrl" :src='photoUrl' @error="markPhotoNotFound(person)")
          i(v-else).material-icons.nophoto account_box
        .details
         
          .section Contact information
          table.tab
            tr(v-for="(value, propertyName) in details")
              td.prop {{propertyName}}:
              td.val {{value}}
        .company
          table.tab
            tr
              td.prop Function:
              td.val {{companyDetails.Function}}
            tr
              td.prop Departments:
              td
                .dep(v-for='department in companyDetails.Departments' @click='goto(department)') 
                  span {{department.deptName}}  
                  span.role {{department.role}}
              
           
   
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'showPerson',
      'config',
      'people',
      'assignments',
      'chart',
      'orgArray'
    ]),
    photoUrl: function() {
      return (
        this.config.photoUrl.prefix +
        this.showPerson.id +
        this.config.photoUrl.suffix
      )
    },
    details: function() {
      return {
        Name: this.showPerson.name,
        'E-Mail': 'www@asdflkj.fom',
        Phone: '000-005550505',
        Country: 'Netherlands',
        City: 'Amsterdam',
        Street: 'Baarsjes 10'
      }
    },
    companyDetails: function() {
      let hisAssignmentsList = []
      let depts = []

      let hisAssignments = this.assignments.filter(
        a => a.person_id == this.showPerson.id
      )
      hisAssignments.forEach(x =>
        hisAssignmentsList.push(x.department_id)
      )
      let hisDepartments = this.orgArray.filter(
        a =>
          a.manager_id === this.showPerson.id ||
          hisAssignmentsList.includes(a.id)
      )
      hisDepartments.forEach(d => {
        if (d.manager_id == this.showPerson.id) {
          depts.push({
            deptId: d.id,
            deptName: d.name,
            role: 'Manager',
            orgDepartment: d
          })
        }
        if (hisAssignmentsList.includes(d.id)) {
          hisAssignments
            .filter(ha => ha.department_id == d.id)
            .forEach(hha => {
              depts.push({
                deptId: d.id,
                deptName: d.name,
                role: hha.role,
                orgDepartment: d
              })
            })
        }
      })

      console.log(hisAssignments, hisDepartments)

      /*
      hisAssignments.forEach(x =>
        assignmentsList.push(x.department_id)
      )
      let depts = []
      let traverse = chartpart => {
        chartpart.forEach(d => {
          if (d.manager_id == this.showPerson.id) {
            depts.push({
              deptId: d.id,
              deptName: d.name,
              role: 'Manager',
              orgDepartment: d
            })
          }
          if (assignmentsList.includes(d.id)) {
            hisAssignments
              .filter(ha => ha.department_id == d.id)
              .forEach(hha => {
                depts.push({
                  deptId: d.id,
                  deptName: d.name,
                  role: hha.role,
                  orgDepartment: d
                })
              })
          }

          if (d.children) traverse(d.children)
        })
      }
      traverse([this.chart])
      */
      depts.sort((a, b) => a.deptName.localeCompare(b.deptName))

      return {
        Function: 'function',
        Departments: depts
      }
    }
  },
  mounted: function() {},
  methods: {
    ...mapMutations(['setShowPerson']),
    ...mapActions(['setShowDepartment']),
    goto(d) {
      console.log(d)
      this.setShowPerson(null)
      this.setShowDepartment(d.orgDepartment)
    }
  },
  markPhotoNotFound(person) {
    console.log('person photo not found', person)
  }
}
</script>
<style scoped>
#person_details_container {
  width: 100%;
  position: absolute;
  height: 0px;
  top: 150px;
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
}
.tab .prop {
  width: 100px;
  color: grey;
  text-align: left;
}
.tab .val {
  color: black;
  text-align: left;
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
</style>
