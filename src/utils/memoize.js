
import hash from 'object-hash'
import moment from 'moment'

const Singleton = (() => {
  let instance
  let compareDiff = 60000
  let cacheMethodList = []
  const cache = {}

  function setDiff (diffTime) {
    compareDiff = diffTime
  }

  function setMemoizeFunction (arg) {
    cacheMethodList.push(...arg)
  }

  const memoize = fn => (...args) => {
    if (!fn.name) {
      // eslint-disable-next-line no-console
      console.log('! please make function name')
      return fn(...args)
    }

    if (!cacheMethodList.some(method => method === fn.name)) {
      return fn(...args)
    }

    // make hash
    const hashKey = hash({
      ...args,
      fun: fn.name
    })

    if (cache[hashKey]) {
      const current = moment()
      // eslint-disable-next-line no-console
      console.log(`${fn.name} diff time: ${current.diff(cache[hashKey].timestamp) < compareDiff}`)
      if (current.diff(cache[hashKey].timestamp) < compareDiff) {
        return Promise.resolve(cache[hashKey].result)
      }
    }

    return fn(...args)
      .then((response) => {
        cache[hashKey] = {
          name: fn.name,
          result: response,
          timestamp: moment().valueOf()
        }
        return response
      })
  }

  function createInstance () {
    const object = {
      memoize,
      setDiff,
      setMemoizeFunction
    }

    return object
  }

  return {
    getInstance () {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()

const instance = Singleton.getInstance()

export default instance
