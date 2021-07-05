var panzoom = require('panzoom')
import 'array-from-polyfill'
import 'core-js/es6/map'
import 'core-js/es6/set'
import Vue from 'vue'

var _ = require('lodash')

export const state = () => ({
  config: CONFIG,
  updatedOn: UPDATED_ON,
  uiNames: UINAMES,
  chart: null,
  people: [],
  assignments: [],
  orgArray: null,
  lines: [],
  showSideScreen: true,
  columnView: true,
  columnView_noStaff: true,
  managerNameView: true,
  managerPhotoView: true,
  activeDepartment: null,
  moveDepartment: null,
  editMode: false,
  showEditMenu: null,
  showViewMenu: null,
  selectedPerson: null,
  onlyShowParents: false,
  zoomInstance: null,
  showNrDepartments: null,
  showNrPeople: null,
  showPerson: null,
  defaultPersonProperties: [
    { name: 'Email', type: 'email', order: 0 },
    { name: 'Phone', type: 'text', order: 1 },
    { name: 'Homepage', type: 'url', order: 2 },
    { name: 'Country', type: 'text', order: 3 },
    { name: 'City', type: 'text', order: 4 },
    { name: 'Street', type: 'text', order: 5 }
  ]
})

export const actions = {
  initStore({ commit, state }, dept) {
    commit('setConfig')
    console.log(CONFIG, state.config)
    var data
    var people

    // check if the data is saved in old format (array) or new format (tree)
    // new format has much faster load time
    if (!INPUT_DATA.api_version) {
      data = processData()
      commit('createTree', data)
      console.log('Loading OLD input data format')
    } else if (INPUT_DATA.api_version === '1.0') {
      data = processData10(INPUT_DATA.chart, [])
      people = processPeople10(INPUT_DATA.people)
      commit('createTree1', data)
      console.log('Loading 1.0 input data format')
    } else if (INPUT_DATA.api_version === '2.0') {
      data = processData10(INPUT_DATA.chart, [])
      people = processPeople20(INPUT_DATA.people)
      commit('createTree1', data)
      console.log('Loading 2.0 input data format')
    } else {
      alert('wrong version input file')
    }

    commit('processAssignments', {
      departments: data.orgArray,
      people: people,
      assignments: INPUT_DATA.assignments
    })
    commit('setPeople', people)
    commit('setAssignments', INPUT_DATA.assignments)
    var that = this
    window.onresize = function(event) {
      refreshLines(that)
    }
    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        commit('cancelAll')
        commit('setActiveDepartment', null)
      }
    })
    commit('setEditMode', false)
  },
  initZoom({ commit, state }, dept) {
    var area = document.querySelector('#chart')
    if (state.zoomInstance) state.zoomInstance.dispose()
    var instance = panzoom(area, {
      smoothScroll: false,
      maxZoom: 2,
      minZoom: 0.2
    })
    setTimeout(x => {
      var pos
      if (dept) {
        pos = departmentIsVisible(dept).moveTo
        console.log(pos)
      } else {
        pos = { x: 0, y: 0 }
      }

      instance.moveTo(pos.x, pos.y)
    }, 500)
    instance.on('panend', function(e) {
      console.log('Fired when pan ended', e)
      var x = document.getElementById('chart')
      console.log('transform', x.style.transform)
      var scaleX = x.getBoundingClientRect().width / x.offsetWidth
      console.log(scaleX)
    })
    commit('setZoomInstance', instance)
  },
  setShowNrDepartments({ commit, state, dispatch }, dept) {
    commit('setShowNrDepartments', dept)
  },
  setShowNrPeople({ commit, state, dispatch }, dept) {
    commit('setShowNrPeople', dept)
  },
  setShowDepartment({ commit, state, dispatch }, dept) {
    commit('setActiveDepartment', null)
    commit('setShowDepartment', dept)
    refreshLines(this, dept)
  },
  updateActiveDepartmentIsStaff({ commit, state }, dept) {
    commit('updateActiveDepartmentIsStaff', dept)
    refreshLines(this)
  },
  showChildren({ commit, state }, dept) {
    commit('setActiveDepartment', null)
    commit('showChildren', dept)
    commit('setActiveDepartment', dept)
    refreshLines(this)
  },
  hideChildren({ commit, state }, dept) {
    commit('hideChildren', dept)
    refreshLines(this)
  },
  deleteDepartment({ commit, state }, dept) {
    commit('deleteDepartment', dept)
    refreshLines(this)
  },
  addDepartment({ commit, state }, dept) {
    commit('addDepartment', dept)
    refreshLines(this)
  },
  doMoveDepartment({ commit, state }) {
    commit('doMoveDepartment')
    refreshLines(this)
  },
  setManagerPhotoView({ commit, state, dispatch }, value) {
    commit('setManagerPhotoView', value)
    refreshLines(this)
  },
  setColumnView_noStaff({ commit, state, dispatch }, value) {
    commit('setColumnView_noStaff', value)
    refreshLines(this, state.activeDepartment)
  },
  setColumnView({ commit, state, dispatch }, value) {
    commit('setColumnView', value)
    refreshLines(this, state.activeDepartment)
  },
  setHideSiblings({ commit, state, dispatch }, dept) {
    commit('setHideSiblings', dept)
    refreshLines(this, state.activeDepartment)
  },
  setOnlyShowParents({ commit, state, dispatch }, value) {
    commit('setOnlyShowParents', value)
    refreshLines(this, state.activeDepartment)
  },
  toggleHideParents({ commit, state, dispatch }) {
    commit('toggleHideParents')
    refreshLines(this, state.activeDepartment)
  },
  setHideParents({ commit, state, dispatch }, value) {
    commit('setHideParents', value)
    refreshLines(this, state.activeDepartment)
  },
  refreshLines({ commit, state, dispatch }, value) {
    refreshLines(this, state.activeDepartment)
  },

  setActiveDepartmentById({ commit, state, dispatch }, deptId) {
    var dept = state.orgArray.find(e => e.id == deptId)
    if (!dept) dept = null
    dispatch('setShowDepartment', dept)
  },
  setActiveEmployeeById({ commit, state, dispatch }, empId) {
    var dept = state.people.find(e => e.id == empId)
    if (!dept) dept = null
    console.log(' founde', dept)
    commit('setShowPerson', dept)
  }
}

export const mutations = {
  setConfig(state) {
    state.config = {
      enableUserSettings: true,
      showUserManual: true,
      boxWidth: 120,
      boxHeight: 50,
      ...CONFIG
    }
    if (!state.config.editCommand) {
      state.config.editCommand = '_edit'
    }
    if (!state.config.personProperties) {
      state.config.personProperties = state.defaultPersonProperties
    }
    state.columnView = state.config.startView.columnview
    state.columnView_noStaff = !state.config.startView.staffColumnview
    state.managerNameView = state.config.startView.names
    state.managerPhotoView = state.config.startView.photos
    state.showNrDepartments = state.config.startView.showNrDepartments
    state.showNrPeople = state.config.startView.showNrPeople
  },
  setConfigUpdate(state, { prop, subProp = null, val } = {}) {
    console.log(prop, subProp, val)
    if (subProp) {
      state.config[prop][subProp] = val
    } else {
      state.config[prop] = val
    }
    console.log(state.config)
  },
  setPersonProperties(state, newprops) {
    // update personproperties metadata (order, type)
    state.config.personProperties = []
    newprops.forEach(np => {
      if (!np.deleted && np.name) {
        state.config.personProperties.push({
          name: np.name,
          type: np.type,
          order: np.order
        })
      }
    })

    //there may be gaps in the order when fields have been deleted. Recalculate order
    state.config.personProperties.sort(function(a, b) {
      return a.order - b.order
    })
    state.config.personProperties.forEach((a, i) => (a.order = i))

    // update all properties of the people
    let deletedProps = newprops.filter(p => p.deleted)
    let changedProps = newprops.filter(
      p => p.oldName && p.name !== p.oldName
    )
    let addedProps = newprops.filter(p => !p.oldName && p.name)

    console.log('del', deletedProps)
    console.log('cha', changedProps)
    console.log('add', addedProps)

    state.people.forEach(pp => {
      changedProps.forEach(cpr => {
        delete Object.assign(pp.fields, {
          [cpr.name]: pp.fields[cpr.oldName]
        })[cpr.oldName]
      })

      deletedProps.forEach(dpr => {
        delete pp.fields[dpr.oldName]
      })
      addedProps.forEach(apr => {
        pp.fields[apr.name] = ''
      })
    })
    console.log(state.people[0])
  },
  setShowPersonProperty(state, val) {
    state.showPerson.fields[val.prop.name] = val.value
  },
  setPropName(state, p) {
    p.prop.newName = p.value
  },
  setShowPersonID(state, val) {
    state.showPerson.id = val
  },
  setShowPersonPhoto(state, val) {
    state.showPerson.photo = val
  },
  setShowPersonName(state, val) {
    state.showPerson.name = val
  },

  setShowPersonFunctionName(state, val) {
    state.showPerson.functionName = val
  },

  setShowPerson(state, person) {
    console.log('setshowperson', person)
    if (person && person.new) {
      state.showPerson = {
        name: '',
        id: '',
        new: true,
        manager: person.manager,
        functionName: '',
        departments: [],
        fields: {}
      }
      state.config.personProperties.forEach(p => {
        state.showPerson.fields[p.name] = ''
      })
      console.log('NNNNEEWW', state.showPerson)
    } else {
      state.showPerson = person
    }
  },
  createTree(state, datas) {
    state.orgArray = datas
    state.chart = createTree(_.clone(datas))[0]
    state.chart.showChildren = true
  },
  createTree1(state, datas) {
    state.orgArray = []
    datas.orgArray.forEach(d => state.orgArray.push(d))
    state.chart = datas.dept
    state.chart.showChildren = true
  },
  setPeople(state, datas) {
    state.people = datas
    console.log('____people', state.people)
  },
  processAssignments(state, { departments, people, assignments }) {
    departments.forEach(dept => {
      if (!dept.manager.departments) {
        dept.manager.departments = [
          { role: 'Manager', department: dept }
        ]
      } else {
        dept.manager.departments.push({
          role: 'Manager',
          department: dept
        })
      }
      let assign = assignments.filter(
        ass => dept.id === ass.department_id
      )
      let assignmentstotal = []
      assign.forEach(ass => {
        let p = people.find(p => p.id === ass.person_id)
        if (!p.departments) {
          p.departments = [{ role: ass.role, department: dept }]
        } else {
          p.departments.push({ role: ass.role, department: dept })
        }
        assignmentstotal.push({ person: p, role: ass.role })
      })
      dept.employees = assignmentstotal

      dept.employees.sort(
        (a, b) =>
          a.person.name > b.person.name
            ? 1
            : b.person.name > a.person.name
              ? -1
              : 0
      )
    })
    //departments.sort((a, b) => )
  },
  setAssignments(state, datas) {
    datas.forEach((d, i) => {
      d.id = guid()
    })
    state.assignments = datas
  },
  setShowNrDepartments(state, val) {
    state.showNrDepartments = val
  },
  setShowNrPeople(state, val) {
    state.showNrPeople = val
  },
  setSelectedPerson(state, person) {
    state.selectedPerson = person
  },
  updateSelectedPerson(state, data) {
    state.selectedPerson[data.field] = data.value
  },
  setColumnView(state, value) {
    state.columnView = value
  },
  setColumnView_noStaff(state, value) {
    state.columnView_noStaff = value
  },
  setManagerNameView(state, value) {
    state.managerNameView = value
  },
  setManagerPhotoView(state, value) {
    state.managerPhotoView = value
  },
  setEditMode(state, value) {
    state.editMode = value
  },
  showEditMenu(state, event) {
    state.showEditMenu = event
  },
  showViewMenu(state, event) {
    console.log(event)
    state.showViewMenu = event
  },
  showChildren(state, dept) {
    console.log('showchildren called', dept)
    dept.showChildren = true
    if (dept.parent && state.onlyShowParents) {
      dept.parent.onlyShowThisChild = dept
    }
  },
  setActiveDepartment(state, dept) {
    if (state.chart.parent && dept && !findDept(state.chart, dept)) {
      state.chart = state.orgArray.find(e => !e.parent)
    }
    state.activeDepartment = dept
  },

  setShowDepartment(state, dept) {
    state.chart = state.orgArray.find(e => !e.parent)
    var p = dept.parent
    if (p && state.onlyShowParents) {
      p.onlyShowThisChild = dept
    } else if (p) {
      p.onlyShowThisChild = null
    }
    dept.onlyShowThisChild = null
    while (p) {
      p.showChildren = true

      if (state.onlyShowParents && p.parent) {
        p.parent.onlyShowThisChild = p
      } else if (p.parent) {
        p.parent.onlyShowThisChild = null
      }
      p = p.parent
    }
    state.activeDepartment = dept
  },
  deleteDepartment(state, department) {
    // do not remove if this is the ultimate top department
    let children = []
    // unlink this department from the parent
    if (department.parent) {
      children = department.parent.children.filter(
        child => child !== state.activeDepartment
      )
      department.parent.children = children
    }

    delDept(state, department)

    state.activeDepartment = null
    state.showEditMenu = null
  },
  addDepartment(state) {
    var newdept = {
      children: [],
      employees: [],
      description: '',
      id: guid(),
      isStaff: false,
      manager: { name: '', id: '', role: '' },
      name: '',
      parent: state.activeDepartment,
      parent_id: state.activeDepartment.id,
      showChildren: false
    }

    state.activeDepartment.children.push(newdept)
    state.activeDepartment.parent.showChildren = true
    state.activeDepartment.showChildren = true
    state.activeDepartment = newdept
    state.showEditMenu = null
  },
  addPerson(state, person) {
    //TODO: check for duplicates
    person.new = false
    delete person.new
    delete person.manager
    state.people.push(person)
  },
  updateActiveDepartmentName(state, name) {
    state.activeDepartment.name = name
  },
  updateActiveDepartmentManager(state, person) {
    state.activeDepartment.manager = person || {
      name: '',
      function: '',
      id: '',
      photo: ''
    }
  },
  updateActiveDepartmentDescription(state, description) {
    state.activeDepartment.description = description
  },

  updateActiveDepartmentIsStaff(state, isStaff) {
    state.activeDepartment.isStaff = isStaff
  },
  hideChildren(state, dept) {
    var index = state.orgArray.findIndex(e => e.id === dept.id)

    dept.showChildren = false
    state.orgArray.splice(index, 1, dept)
  },
  setMoveDepartment(state) {
    state.moveDepartment = state.activeDepartment
  },
  cancelMoveDepartment(state) {
    state.moveDepartment = null
  },
  doMoveDepartment(state) {
    //check that the department is not pasted under one of its children
    var d = state.activeDepartment
    var ok = d !== state.moveDepartment
    while (d.parent) {
      d = d.parent
      console.log(d)
      if (d === state.moveDepartment) ok = false
    }

    if (!ok) {
      alert('cannot paste under itself (or children)')
      return
    }

    state.moveDepartment.parent.children = state.moveDepartment.parent.children.filter(
      d => d !== state.moveDepartment
    )
    state.moveDepartment.parent = state.activeDepartment
    state.activeDepartment.children.push(state.moveDepartment)
    state.activeDepartment = state.moveDepartment
    state.moveDepartment = null
    state.showEditMenu = null
  },

  addAssignment(state, { department, role, person }) {
    console.log('adding assignment', department, role, person)
    department.employees.push({ person: person, role: role })
    department.employees.sort(
      (a, b) =>
        a.person.name > b.person.name
          ? 1
          : b.person.name > a.person.name
            ? -1
            : 0
    )
    person.departments.push({ role: role, department: department })
    person.departments.sort(
      (a, b) =>
        a.department.name > b.department.name
          ? 1
          : b.department.name > a.department.name
            ? -1
            : 0
    )
  },
  updateRole(state, { assignment, department, role }) {
    let saveRole = assignment.role
    assignment.role = role
    assignment.person.departments.find(
      a => a.department == department && a.role == saveRole
    ).role = role
  },

  removeAssignment(state, { assignment, department }) {
    let person = assignment.person
    let role = assignment.role
    console.log(person, role)
    person.departments = person.departments.filter(
      a => !(a.department == department && a.role == role)
    )
    department.employees = department.employees.filter(
      a => a !== assignment
    )
    console.log(department.employees)
  },
  addManager(state, { department, person }) {
    department.manager = person
  },
  addLine(state) {
    state.lines = updateLines(state.chart, [])
  },
  removeLines(state) {
    state.lines = []
  },
  closeSideScreen(state) {
    state.showSideScreen = false
    var chart = document.getElementById('chart')
    chart.style.marginLeft = '20px'
    state.lines = updateLines(state.chart, [])
  },
  openSideScreen(state) {
    state.showSideScreen = true
    var chart = document.getElementById('chart')
    chart.style.marginLeft = '300px'
    state.lines = updateLines(state.chart, [])
  },
  cancelAll(state) {
    state.showEditMenu = null
    state.moveDepartment = null
    state.showViewMenu = null
    state.editMenuOpen = false
  },
  setHideSiblings(state, dept) {
    if (!dept.parent.onlyShowThisChild) {
      dept.parent.onlyShowThisChild = dept
    } else {
      dept.parent.onlyShowThisChild = null
    }
  },
  setOnlyShowParents(state, val) {
    state.onlyShowParents = val
    console.log('ccc', val, state.activeDepartment)
  },
  setHideParents(state, val) {
    state.activeDepartment.showParents = !val
    if (val) {
      state.chart = state.activeDepartment
    } else {
      state.chart = state.orgArray.find(e => !e.parent)
    }
  },
  toggleHideParents(state) {
    state.activeDepartment.showParents = state.activeDepartment
      .showParents
      ? false
      : true
    if (!state.activeDepartment.showParents) {
      state.chart = state.activeDepartment
    } else {
      state.chart = state.orgArray.find(e => !e.parent)
    }
  },
  deleteEmployee(state, person) {
    person.departments.forEach(dept => {
      let department = dept.department
      // remove this person as manager of all departments
      if (department.manager === person) {
        department.manager = { name: '', id: '', role: '' }
      }
      // remove this person as employee of all departments
      department.employees = department.employees.filter(
        emp => emp.person !== person
      )
    })
    // remove this person itself
    state.people = state.people.filter(p => p.id !== person.id)
  },
  setZoomInstance(state, val) {
    state.zoomInstance = val
  },
  resetZoom(state, val) {
    state.zoomInstance.zoomAbs(
      300, // initial x position
      10, // initial y position
      1 // initial zoom
    )
  }
}

function delDept(state, department) {
  if (department.children.length) {
    department.children.forEach(child => {
      delDept(state, child)
    })
  }
  // unassign manager from department
  department.manager.departments = department.manager.departments.filter(
    d => d.department !== department
  )
  //unassign each employee from department
  department.employees.forEach(e => {
    e.person.departments = e.person.departments.filter(
      pd => pd.department !== department
    )
  })
  // delete department
  state.orgArray = state.orgArray.filter(d => d !== department)
}

function updateLines(dept, lines) {
  var svg = document.getElementById('svg')
  var xparent = document.getElementById('chart')
  svg.style.width = xparent.offsetWidth + 'px'
  svg.style.height = xparent.offsetHeight + 'px'

  var line
  if (dept.showChildren) {
    dept.children.forEach(child => {
      line = getLine(child)
      if (line) {
        lines.push(getLine(child))
        updateLines(child, lines)
      }
    })
  }
  return lines
}

function getLine(dept) {
  var pos = getPosOfElement(dept)
  if (!pos.parent) return null
  var d
  var x = document.getElementById('chart')
  var scale = 1 / (x.getBoundingClientRect().width / x.offsetWidth)

  if (dept.isStaff) {
    d =
      'M' +
      Math.round(pos.parent.x + pos.parent.width / 2) * scale +
      ' ' +
      Math.round(pos.parent.y + pos.parent.height) * scale +
      ' v' +
      Math.round(
        pos.element.y - pos.parent.y - pos.parent.height / 2
      ) *
        scale +
      ' H' +
      Math.round(pos.element.x + pos.parent.width) * scale
  } else {
    d =
      'M' +
      Math.round(pos.parent.x + pos.parent.width / 2) * scale +
      ' ' +
      Math.round(pos.parent.y + pos.parent.height) * scale +
      ' V' +
      Math.round(pos.element.y * scale - 10) +
      ' H' +
      Math.round(pos.element.x + pos.parent.width / 2) * scale +
      ' V' +
      Math.round(pos.element.y) * scale
  }

  return { d: d }
}

function getPosOfElement(dept) {
  var parentElement = document.getElementById('ID_' + dept.parent.id)
  var childElement = document.getElementById('ID_' + dept.id)
  if (!parentElement || !childElement) {
    return { parent: null }
  }
  var pos = {
    parent: dept.parent
      ? document
          .getElementById('ID_' + dept.parent.id)
          .getBoundingClientRect()
      : null,
    element: document
      .getElementById('ID_' + dept.id)
      .getBoundingClientRect()
  }
  var chartpos = document
    .getElementById('chart')
    .getBoundingClientRect()

  if (pos.parent) {
    pos.parent.x = pos.parent.left - chartpos.left
    pos.parent.y = pos.parent.top - chartpos.top
  }
  pos.element.x = pos.element.left - chartpos.left
  pos.element.y = pos.element.top - chartpos.top

  return pos
}

function createTree(array, parent, nextparent, tree) {
  tree = typeof tree !== 'undefined' ? tree : []
  parent = typeof parent !== 'undefined' ? parent : { id: '' }
  //var children = array.filter(child => child.parentId === parent.id)
  var children = _.remove(
    array,
    child => child.parent_id === parent.id
  )

  if (!parent.id) {
    tree = children
  } else {
    parent['children'] = children
    parent['parent'] = nextparent.id ? nextparent : null
  }
  if (children.length) {
    children.forEach(child => {
      createTree(array, child, parent)
    })
  }
  return tree
}
function findDept(chart, dept) {
  if (chart === dept) {
    return dept
  } else {
    var fnd = null
    for (let child of chart.children) {
      fnd = findDept(child, dept)
      if (fnd) break
    }
    return fnd
  }
}
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}
function departmentIsVisible(dept) {
  var el = document.getElementById('ID_' + dept.id)
  var pr = document.getElementById('chart')
  var elb = el.getBoundingClientRect()
  var prb = pr.getBoundingClientRect()
  var windim = { w: window.innerWidth, h: window.innerHeight - 100 }
  var relpos = {
    y: prb.top - elb.top + 0.5 * windim.h,
    x: prb.left - elb.left + 0.5 * windim.w - 300
  }
  relpos.y = relpos.y > 0 ? 0 : relpos.y

  console.log(elb, prb, relpos, windim)
  var isVissible = !(
    elb.bottom < 0 ||
    elb.right < 300 ||
    elb.left > window.innerWidth ||
    elb.top > window.innerHeight
  )

  return { isVissible: isVissible, moveTo: relpos }
}

function refreshLines(that, dept) {
  that.commit('removeLines')
  setTimeout(x => {
    that.commit('addLine')
    if (dept) {
      that.dispatch('initZoom', dept)
    }
  }, 0)
}
function processPeople10(people) {
  //in new format, custom fields are in fields object in stead of at root
  //convert old format to new

  people.forEach(p => {
    p.fields = {
      Email: p.email,
      Phone: p.phone,
      Homepage: p.homepage,
      Country: p.country,
      City: p.city,
      Street: p.street
    }
    delete p.email
    delete p.phone
    delete p.homepage
    delete p.country
    delete p.city
    delete p.street
    // these are unused field which also can be cleaned
    delete p.function
    delete p.main_role
  })

  return people
}
function processPeople20(people) {
  return people
}
function processData10(dept, orgArray) {
  if (!dept.employees) {
    Vue.set(dept, 'employees', [])
  }

  orgArray.push(dept)
  var manager = INPUT_DATA.people.find(p => p.id == dept.manager_id)
  var dataFields = []

  if (dept.dataFields && dept.dataFields.length) {
    dataFields = dept.dataFields
  }
  CONFIG.dataFields.forEach(f => {
    var df = dataFields.find(x => x.name === f.name)
    if (!df) {
      dataFields.push({ ...f, value: '' })
    } else {
      df.type = f.type
    }
  })
  dept.manager = manager ? manager : { name: '' }
  dept.dataFields = dept.dataFields
  dept.showChildren = false
  dept.isStaff = dept.staff_department == 'Y'
  dept.showParents = true
  dept.onlyParents = false
  dept.onlyShowThisChild = null
  dept.children.forEach(c => {
    c.parent = dept
    processData10(c, orgArray)
  })
  return { dept: dept, orgArray: orgArray }
}
function processData() {
  var data = []
  INPUT_DATA.chart.forEach(dept => {
    var manager = INPUT_DATA.people.find(p => p.id == dept.manager_id)
    var dataFields = []
    if (dept.dataFields && dept.dataFields.length) {
      dataFields = dept.dataFields
    }
    CONFIG.dataFields.forEach(f => {
      var df = dataFields.find(x => x.name === f.name)
      if (!df) {
        dataFields.push({ ...f, value: '' })
      } else {
        df.type = f.type
      }
    })

    data.push({
      id: dept.id,
      parent_id: dept.parent_id,
      isStaff: dept.staff_department == 'Y',
      name: dept.name,
      description: dept.description,
      manager: manager ? manager : { name: '' },
      showChildren: false,
      showParents: true,
      onlyParents: false,
      parent: null,
      children: null,
      onlyShowThisChild: null,
      dataFields: dataFields
    })
  })
  return data
}
