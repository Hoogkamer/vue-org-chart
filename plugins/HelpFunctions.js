export function createTree(array, parent, nextparent, tree) {
  tree = typeof tree !== 'undefined' ? tree : []
  parent = typeof parent !== 'undefined' ? parent : { id: '' }
  var children = array.filter(child => child.parentId === parent.id)
  if (!parent.id) {
    tree = children
  } else {
    parent['children'] = children
    parent['parent'] = nextparent.id ? nextparent : null
    parent['showChildren'] = false
  }
  if (children.length) {
    children.forEach(function(child) {
      createTree(array, child, parent)
    })
  }
  return tree
}
