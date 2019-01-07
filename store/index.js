export const state = () => ({
  chart: null,
  orgArray: null,
  lines: [],
  showSideScreen: true,
  columnView: true,
  activeDepartment: null
})

export const mutations = {
  createTree(state, datas) {
    state.orgArray = datas
    state.chart = createTree(datas)[0]
    state.chart.showChildren = true
  },
  setColumnView(state, value) {
    state.columnView = value
  },
  showChildren(state, dept) {
    var index = state.orgArray.findIndex(e => e.id === dept.id)

    dept.showChildren = true
    state.orgArray.splice(index, 1, dept)
  },
  setActiveDepartment(state, dept) {
    state.activeDepartment = dept
  },
  hideChildren(state, dept) {
    var index = state.orgArray.findIndex(e => e.id === dept.id)

    dept.showChildren = false
    state.orgArray.splice(index, 1, dept)
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
      Math.round(pos.parent.x + 57) +
      ' ' +
      Math.round(pos.parent.y + 50) +
      ' v' +
      Math.round(pos.element.y - pos.parent.y - 25) +
      ' H' +
      Math.round(pos.element.x + 100)
  } else {
    d =
      'M' +
      Math.round(pos.parent.x + 57) +
      ' ' +
      Math.round(pos.parent.y + 50) +
      ' v' +
      Math.round(pos.element.y - pos.parent.y - 70) +
      ' H' +
      Math.round(pos.element.x + 57) +
      ' v26'
  }

  return { d: d }
}

function getPosOfElement(dept) {
  var pos = {
    parent: dept.parent
      ? document.getElementById(dept.parent.id).getBoundingClientRect()
      : null,
    element: document.getElementById(dept.id).getBoundingClientRect()
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
    children.forEach(function(child) {
      createTree(array, child, parent)
    })
  }
  return tree
}
