// import _isObject from 'lodash.isobject'
import _isEmpty from 'lodash.isempty'
import _isEqual from 'lodash.isequal'

const isArray = value => Array.isArray(value)

const getMethods = (pOrigin, pUpdate) => {
  const origin = pOrigin || []
  const update = pUpdate || []
  const results = []

  for (let i = 0; i < update.length; i += 1) {
    const updateId = update[i].id
    const findIndex = origin.findIndex(org => org.id === updateId)
    if (findIndex === -1) {
      results.push({
        id: updateId,
        method: 'post'
      })
    } else {
      if (!_isEqual(origin[findIndex], update[i])) {
        results.push({
          id: updateId,
          method: 'patch'
        })
      } else {
        results.push({
          id: updateId,
          method: 'none'
        })
      }
    }
  }

  for (let i = 0; i < origin.length; i += 1) {
    const originId = origin[i].id
    const findIndex = update.findIndex(upt => upt.id === originId)
    if (findIndex === -1) {
      results.push({
        id: originId,
        method: 'delete'
      })
    }
  }

  return results
}

const getMethod = (origin, update) => {
  if (isArray(origin) || isArray(update)) {
    return [...getMethods(origin, update)]
  } else if (_isEmpty(origin) || _isEmpty(update)) {
    if (_isEmpty(origin)) {
      return { id: update.id, method: 'post' }
    } else {
      return { id: origin.id, method: 'delete' }
    }
  } else {
    if (_isEqual(origin, update)) {
      return { id: update.id, method: 'none' }
    }
    return { id: update.id, method: 'patch' }
  }

  // else if (_isEmpty(origin) && _isEmpty(update)) {
  //   return 'none'
  // }
}

const classifyRestfulMethod = (origin, update) => {
  const updatedKeys = Object.keys(update)
    .filter(key => key === 'entity' || key === 'intent')

  const originKeys = Object.keys(origin)
    .filter(key => key === 'entity' || key === 'intent')

  const mergedKeys = Object.assign([], originKeys, updatedKeys)

  const results = mergedKeys.map((key) => {
    return getMethod(origin[key], update[key])
  })

  return results
}

export default classifyRestfulMethod
