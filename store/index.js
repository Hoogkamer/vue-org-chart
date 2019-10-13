var panzoom = require('panzoom')
import 'array-from-polyfill'
import 'core-js/es6/map'
import 'core-js/es6/set'

export const state = () => ({
  config: CONFIG,
  updatedOn: UPDATED_ON,
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
    console.log(CONFIG)
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
        onlyShowThisChild: null,
        dataFields: dataFields
      })
    })
    console.log(data)
    commit('createTree', data)
    commit('setPeople', INPUT_DATA.people)
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
  },
  initZoom({ commit, state }, dept) {
    var area = document.querySelector('#chart')
    if (state.zoomInstance) state.zoomInstance.dispose()
    var instance = panzoom(area, {
      smoothScroll: false,
      maxZoom: 2,
      minZoom: 0.2
    })
    //instance.moveTo(0, 0)
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

    //instance.zoomAbs(pos.x * scale, pos.y * scale, scalex)

    instance.on('panend', function(e) {
      console.log('Fired when pan ended', e)
      var x = document.getElementById('chart')
      console.log('transform', x.style.transform)
      var scaleX = x.getBoundingClientRect().width / x.offsetWidth
      console.log(scaleX)
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
  setHideParents({ commit, state, dispatch }, value) {
    commit('setHideParents', value)
    refreshLines(this, state.activeDepartment)
  },
  setActiveDepartmentById({ commit, state, dispatch }, deptId) {
    var dept = state.orgArray.find(e => e.id == deptId)
    if (!dept) dept = null
    dispatch('setShowDepartment', dept)
  }
}

export const mutations = {
  setConfig(state) {
    if (!state.config.editCommand) {
      state.config.editCommand = '_edit'
    }
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
  var x = document.getElementById('chart')
  var scale = 1 / (x.getBoundingClientRect().width / x.offsetWidth)

  if (dept.isStaff) {
    d =
      'M' +
      Math.round(pos.parent.x + pos.parent.width / 2) * scale +
      ' ' +
      Math.round(pos.parent.y + pos.parent.height) * scale +
      ' v' +
      Math.round(pos.element.y - pos.parent.y - pos.parent.height / 2) * scale +
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

function refreshLines(that, dept) {
  that.commit('removeLines')
  setTimeout(x => {
    that.commit('addLine')
    if (dept) {
      that.dispatch('initZoom', dept)
    }
  }, 0)
}
