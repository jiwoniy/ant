// import _isObject from 'lodash.isobject'
import _isEmpty from 'lodash.isempty'
import _isEqual from 'lodash.isequal'

const isArray = value => Array.isArray(value)

const getMethods = (key, pOrigin, pUpdate) => {
  const origin = pOrigin || []
  const update = pUpdate || []
  const results = []

  for (let i = 0; i < update.length; i += 1) {
    const updateId = update[i].id
    const findIndex = origin.findIndex(org => org.id === updateId)
    if (findIndex === -1) {
      results.push({
        key,
        // pk: update[i].pk,
        id: updateId,
        method: 'post',
        data: update[i]
      })
    } else {
      if (!_isEqual(origin[findIndex], update[i])) {
        results.push({
          key,
          // pk: update[i].pk,
          id: updateId,
          method: 'patch',
          data: update[i]
        })
      } else {
        results.push({
          key,
          // pk: update[i].pk,
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
        key,
        // pk: origin[i].pk,
        id: originId,
        method: 'delete'
      })
    }
  }

  return results
}

const getMethod = (key, origin, update) => {
  if (isArray(origin) || isArray(update)) {
    return [...getMethods(key, origin, update)]
  } else if (_isEmpty(origin) || _isEmpty(update)) {
    if (_isEmpty(origin)) {
      return {
        key,
        // pk: origin.pk,
        id: update.id,
        method: 'post',
        data: update
      }
    } else {
      return {
        key,
        // pk: origin.pk,
        id: origin.id,
        method: 'delete'
      }
    }
  } else {
    if (_isEqual(origin, update)) {
      return {
        key,
        // pk: update.pk,
        id: update.id,
        method: 'none'
      }
    }
    return {
      key,
      // pk: update.pk,
      id: update.id,
      method: 'patch',
      data: update
    }
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
    return getMethod(key, origin[key], update[key])
  })

  return results
}

export default classifyRestfulMethod
