'use strict'
exports.__esModule = true
exports.getIfExists = void 0
function getIfExists(val, name) {
  if (!val) {
    throw new Error('Missing mandatory param : '.concat(name))
  }
  return val
}
exports.getIfExists = getIfExists
