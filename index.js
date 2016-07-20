var split = require('split2')
var sorted = require('sorted-merge-stream')
var pump = require('pump')

module.exports = cat

function cat (a, b) {
  return sorted(pump(a, split(addNewline)), pump(b, split(addNewline)))
}

function addNewline (line) {
  return line + '\n'
}
