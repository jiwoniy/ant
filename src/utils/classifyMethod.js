import _isObject from 'lodash.isobject'
import _isEmpty from 'lodash.isempty'
import _isEqual from 'lodash.isequal'

const classifyMethod = (origin, update) => {
  if (_isEmpty(origin)) {
    return 'post'
  } else if (_isObject(origin)) {
    if (_isEmpty(update)) {
      return 'delete'
    } else {
      if (_isEqual(origin, update)) {
        return 'none'
      }
      return 'patch'
    }
  } else {
    if (_isEmpty(update)) {
      return 'delete'
    } else {
      if (_isEqual(origin, update)) {
        return 'none'
      }
      return 'patch'
    }
  }
}

// const isArray = value => Array.isArray(value)

export default classifyMethod
