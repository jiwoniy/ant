// import _isObject from 'lodash.isobject'
import _isEmpty from 'lodash.isempty'
import _isEqual from 'lodash.isequal'
const isArray = value => Array.isArray(value)

const isEqualArray = (pOrigin, pUpdate) => {
  const origin = pOrigin || []
  const update = pUpdate || []

  const results = []
  for (let i = 0; i < update.length; i += 1) {
    const updateId = update[i].id
    const findIndex = origin.findIndex(org => org.id === updateId)
    if (findIndex === -1) {
      results.push(false) // add
    } else {
      if (!_isEqual(origin[findIndex], update[i])) {
        results.push(false) // patch
      } else {
        results.push(true) // none
      }
    }
  }

  for (let i = 0; i < origin.length; i += 1) {
    const originId = origin[i].id
    const findIndex = update.findIndex(upt => upt.id === originId)
    if (findIndex === -1) {
      results.push(false) // delete
    }
  }

  return results.every(result => result === true)
}

const isEqual = (origin, update) => {
  if (_isEmpty(origin) && _isEmpty(update)) {
    return true
  } else if (_isEmpty(origin) || _isEmpty(update)) {
    return false
  } else {
    if (isArray(update) || isArray(origin)) {
      console.log(`isEqualarray: ${isEqualArray(origin, update)}`)
      return isEqualArray(origin, update)
    } else {
      return _isEqual(origin, update)
    }
  }
}

const isUpdate = (origin, update) => {
  const updatedKeys = Object.keys(update)
    .filter(key => key === 'entity' || key === 'intent')

  const originKeys = Object.keys(origin)
    .filter(key => key === 'entity' || key === 'intent')

  const mergedKeys = Object.assign([], originKeys, updatedKeys)

  const results = mergedKeys.map((key) => {
    return isEqual(origin[key], update[key])
  })

  // if every result true then isEqual
  return results.some(result => result === false)
}

export default isUpdate
