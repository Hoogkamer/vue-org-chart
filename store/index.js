export const state = () => ({
  config: CONFIG,
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
  selectedPerson: null
})

export const actions = {
  setShowDepartment({ commit, state }, dept) {
    commit('setActiveDepartment', null)
    commit('removeLines')
    commit('setShowDepartment', dept)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  updateActiveDepartmentIsStaff({ commit, state }, dept) {
    commit('removeLines')
    commit('updateActiveDepartmentIsStaff', dept)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  showChildren({ commit, state }, dept) {
    commit('removeLines')
    commit('showChildren', dept)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  hideChildren({ commit, state }, dept) {
    commit('removeLines')
    commit('hideChildren', dept)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  deleteDepartment({ commit, state }, dept) {
    commit('removeLines')
    commit('deleteDepartment', dept)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  addDepartment({ commit, state }, dept) {
    commit('removeLines')
    commit('addDepartment', dept)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  doMoveDepartment({ commit, state }) {
    commit('removeLines')
    commit('doMoveDepartment')
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  setManagerPhotoView({ commit, state }, value) {
    commit('removeLines')
    commit('setManagerPhotoView', value)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  setColumnView_noStaff({ commit, state }, value) {
    commit('removeLines')
    commit('setColumnView_noStaff', value)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  },
  setColumnView({ commit, state }, value) {
    commit('removeLines')
    commit('setColumnView', value)
    setTimeout(x => {
      commit('addLine')
    }, 500)
  }
}

export const mutations = {
  initStore(state) {
    state.columnView = state.config.startView.columnview
    state.columnView_noStaff = !state.config.startView.staffColumnview
    state.managerNameView = state.config.startView.names
    state.managerPhotoView = state.config.startView.photos
  },
  createTree(state, datas) {
    state.orgArray = datas
    state.chart = createTree(datas)[0]
    console.log(state.chart)
    state.chart.showChildren = true
  },
  setPeople(state, datas) {
    state.people = datas
  },
  setAssignments(state, datas) {
    datas.forEach((d, i) => {
      d.id = guid()
    })
    state.assignments = datas
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
  showChildren(state, dept) {
    var index = state.orgArray.findIndex(e => e.id === dept.id)

    dept.showChildren = true
    state.orgArray.splice(index, 1, dept)
  },
  setActiveDepartment(state, dept) {
    state.activeDepartment = dept
  },
  setShowDepartment(state, dept) {
    var p = dept.parent
    while (p) {
      p.showChildren = true
      p = p.parent
    }
    state.activeDepartment = dept
  },
  deleteDepartment(state) {
    var foundDept = findDept(state.chart, state.activeDepartment)
    if (foundDept && foundDept.parent) {
      foundDept.parent.children = foundDept.parent.children.filter(
        child => child !== state.activeDepartment
      )
    }
    state.activeDepartment = null
    state.showEditMenu = null
  },
  addDepartment(state) {
    var newdept = {
      children: [],
      description: '',
      id: guid(),
      isStaff: false,
      manager: { name: '', id: '', role: '' },
      name: '',
      parent: state.activeDepartment,
      parentId: state.activeDepartment.id,
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
    state.people.push(person)
  },
  updateActiveDepartmentName(state, name) {
    state.activeDepartment.name = name
  },
  updateActiveDepartmentManager(state, person) {
    state.activeDepartment.manager = person
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
    state.moveDepartment.parent.children = state.moveDepartment.parent.children.filter(
      d => d !== state.moveDepartment
    )
    state.moveDepartment.parent = state.activeDepartment
    state.activeDepartment.children.push(state.moveDepartment)
    state.activeDepartment = state.moveDepartment
    state.moveDepartment = null
    state.showEditMenu = null
  },
  removePersonFromActiveDepartment(state, person) {
    state.assignments = state.assignments.filter(
      a => a.id !== person.assignment.id
    )
  },
  updateActiveDepartmentPersonRole(state, inp) {
    var assignment = state.assignments.find(
      a => a.id === inp.person.assignment.id
    )
    assignment.role = inp.role
    console.log(assignment)
  },
  addAssignmentToActiveDepartment(state, inp) {
    console.log('in', inp)
    console.log(state.assignments)
    state.assignments.push({
      department_id: state.activeDepartment.id,
      id: guid(),
      person_id: inp.id,
      role: ''
    })
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
  }
}

function updateLines(dept, lines) {
  var svg = document.getElementById('svg')
  var xparent = document.getElementById('chart')
  svg.style.width = xparent.offsetWidth + 'px'
  svg.style.height = xparent.offsetHeight + 'px'
  if (dept.showChildren) {
    dept.children.forEach(child => {
      lines.push(getLine(child))
      updateLines(child, lines)
    })
  }
  return lines
}

function getLine(dept) {
  var pos = getPosOfElement(dept)
  if (!pos.parent) return null
  var d
  if (dept.isStaff) {
    d =
      'M' +
      Math.round(pos.parent.x + pos.parent.width / 2) +
      ' ' +
      Math.round(pos.parent.y + pos.parent.height) +
      ' v' +
      Math.round(pos.element.y - pos.parent.y - pos.parent.height / 2) +
      ' H' +
      Math.round(pos.element.x + pos.parent.width)
  } else {
    d =
      'M' +
      Math.round(pos.parent.x + pos.parent.width / 2) +
      ' ' +
      Math.round(pos.parent.y + pos.parent.height) +
      ' V' +
      Math.round(pos.element.y - 10) +
      ' H' +
      Math.round(pos.element.x + pos.parent.width / 2) +
      ' V' +
      Math.round(pos.element.y)
  }

  return { d: d }
}

function getPosOfElement(dept) {
  var pos = {
    parent: dept.parent
      ? document.getElementById('ID_' + dept.parent.id).getBoundingClientRect()
      : null,
    element: document.getElementById('ID_' + dept.id).getBoundingClientRect()
  }
  var chartpos = document.getElementById('chart').getBoundingClientRect()
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
  var children = array.filter(child => child.parentId === parent.id)
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
  console.log(chart, dept)
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
  return null
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
