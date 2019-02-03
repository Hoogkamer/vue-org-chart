var panzoom = require('panzoom')
import 'array-from-polyfill'

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
  showViewMenu: null,
  selectedPerson: null,
  onlyShowParents: false,
  zoomInstance: null
})

export const actions = {
  initStore({ commit, state }, dept) {
    commit('setConfig')
    var data = []
    INPUT_DATA.chart.forEach(dept => {
      var manager = INPUT_DATA.people.find(p => p.id == dept.manager_id)
      data.push({
        id: dept.id,
        parentId: dept.parent_id,
        isStaff: dept.staff_department == 'Y',
        name: dept.name,
        description: dept.description,
        manager: manager ? manager : { name: '' },
        showChildren: false,
        showParents: true,
        onlyParents: false,
        parent: null,
        children: null,
        onlyShowThisChild: null
      })
    })
    commit('createTree', data)
    commit('setPeople', INPUT_DATA.people)
    commit('setAssignments', INPUT_DATA.assignments)
    var that = this
    window.onresize = function(event) {
      commit('removeLines')
      setTimeout(x => {
        commit('addLine')
      }, 500)
    }
    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        commit('cancelAll')
        commit('setActiveDepartment', null)
      }
    })
  },
  initZoom({ commit, state }, pos) {
    var area = document.querySelector('#chart')
    console.log(area)
    if (!pos) {
      pos = { x: 0, y: 0 }
    }
    console.log(pos)

    if (state.zoomInstance) state.zoomInstance.dispose()

    var instance = panzoom(area, {
      smoothScroll: false,
      maxZoom: 1,
      minZoom: 1
    })
    //instance.zoomAbs(
    //  pos.x, // initial x position
    //  pos.y, // initial y position
    //  1 // initial zoom
    //)
    instance.moveTo(pos.x, pos.y)

    instance.on('panend', function(e) {
      console.log('Fired when pan ended', e)
      // var chartpos = document.getElementById('chart').getBoundingClientRect()
      // console.log(chartpos)
      // var chartpos1 = document.getElementById('ID_1').getBoundingClientRect()
      // console.log(chartpos1)
    })
    commit('setZoomInstance', instance)
    //instance.moveTo(600, 100)
  },
  setShowDepartment({ commit, state, dispatch }, dept) {
    commit('setActiveDepartment', null)
    commit('removeLines')
    commit('setShowDepartment', dept)
    setTimeout(x => {
      commit('addLine')
      var visible = departmentIsVisible(dept)
      console.log('is visible', visible)
      dispatch('initZoom', visible.moveTo)
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
    commit('setActiveDepartment', null)
    commit('showChildren', dept)
    setTimeout(x => {
      commit('addLine')
      commit('setActiveDepartment', dept)
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
  setManagerPhotoView({ commit, state, dispatch }, value) {
    commit('removeLines')
    commit('setManagerPhotoView', value)
    setTimeout(x => {
      commit('addLine')
      var visible = departmentIsVisible(state.activeDepartment)
      dispatch('initZoom', visible.moveTo)
    }, 500)
  },
  setColumnView_noStaff({ commit, state, dispatch }, value) {
    commit('removeLines')
    commit('setColumnView_noStaff', value)
    setTimeout(x => {
      commit('addLine')
      var visible = departmentIsVisible(state.activeDepartment)
      dispatch('initZoom', visible.moveTo)
    }, 500)
  },
  setColumnView({ commit, state, dispatch }, value) {
    commit('removeLines')
    commit('setColumnView', value)
    setTimeout(x => {
      commit('addLine')
      var visible = departmentIsVisible(state.activeDepartment)
      dispatch('initZoom', visible.moveTo)
    }, 500)
  },
  setHideSiblings({ commit, state, dispatch }, dept) {
    commit('removeLines')
    commit('setHideSiblings', dept)
    setTimeout(x => {
      commit('addLine')
      var visible = departmentIsVisible(state.activeDepartment)
      dispatch('initZoom', visible.moveTo)
    }, 500)
  },
  setOnlyShowParents({ commit, state, dispatch }, value) {
    commit('removeLines')
    commit('setOnlyShowParents', value)
    setTimeout(x => {
      commit('addLine')
      var visible = departmentIsVisible(state.activeDepartment)
      dispatch('initZoom', visible.moveTo)
    }, 500)
  },
  setHideParents({ commit, state, dispatch }, value) {
    commit('removeLines')
    commit('setHideParents', value)
    setTimeout(x => {
      commit('addLine')
      var visible = departmentIsVisible(state.activeDepartment)
      dispatch('initZoom', visible.moveTo)
    }, 500)
  }
}

export const mutations = {
  setConfig(state) {
    state.columnView = state.config.startView.columnview
    state.columnView_noStaff = !state.config.startView.staffColumnview
    state.managerNameView = state.config.startView.names
    state.managerPhotoView = state.config.startView.photos
  },
  createTree(state, datas) {
    state.orgArray = datas
    state.chart = createTree(datas)[0]
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
  showViewMenu(state, event) {
    console.log(event)
    state.showViewMenu = event
  },
  showChildren(state, dept) {
    //var index = state.orgArray.findIndex(e => e.id === dept.id)

    dept.showChildren = true
    if (dept.parent && state.onlyShowParents) {
      dept.parent.onlyShowThisChild = dept
    }
    //state.orgArray.splice(index, 1, dept)
  },
  setActiveDepartment(state, dept) {
    if (state.chart.parent && dept && !findDept(state.chart, dept)) {
      state.chart = state.orgArray.find(e => !e.parent)
    }
    state.activeDepartment = dept
  },
  setShowDepartment(state, dept) {
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
  },
  addAssignmentToActiveDepartment(state, inp) {
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
    state.showViewMenu = null
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
    console.log(state.activeDepartment)
  },
  setHideParents(state, val) {
    state.activeDepartment.showParents = !val
    if (val) {
      state.chart = state.activeDepartment
    } else {
      state.chart = state.orgArray.find(e => !e.parent)
    }
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
  var parentElement = document.getElementById('ID_' + dept.parent.id)
  var childElement = document.getElementById('ID_' + dept.id)
  if (!parentElement || !childElement) {
    return { parent: null }
  }
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
