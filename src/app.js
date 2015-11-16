
import tok from 'csp-parser'
var d3 = require('d3')
// WTF !!
window.d3 = d3
var dagreD3 = require('dagre-d3')

function parseString (str) {
  return tok(str)
}

var processNode = function (node) {
  return { label: node[0] }
}

function createTreeRecursive (ast, graph, parent_idx) {
  var node = processNode(ast)
  graph.setNode('node_' + parent_idx, node)
  if (Array.isArray(ast[1])) {
    createTreeRecursive(ast[1], graph, 2 * parent_idx + 1)
  } else {
    graph.setNode('node_' + (2 * parent_idx + 1), { label: ast[1] })
  }
  graph.setEdge('node_' + parent_idx, 'node_' + (2 * parent_idx + 1),{})
  if (Array.isArray(ast[2])) {
    createTreeRecursive(ast[2], graph, 2 * parent_idx + 2)
  } else {
    graph.setNode('node_' + (2 * parent_idx + 2), { label: ast[2] })
  }
  graph.setEdge('node_' + parent_idx, 'node_' + (2 * parent_idx + 2),{})
}

function createTree (ast) {
  var graph = new dagreD3.graphlib.Graph().setGraph({})
  var render = dagreD3.render()

  createTreeRecursive(ast[0][2], graph, 0)

  var output = document.querySelector('#output')
  d3.select(output).call(render, graph)
  var svgElem = output.getElementsByClassName('output')[0]
  var svgHeight = svgElem.getBoundingClientRect().height || 0
  output.style.height = svgHeight
}

document.querySelector('#input').oninput = function () {
  var ast = parseString(this.value)
  createTree(ast)
}
