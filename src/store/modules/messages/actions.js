import hash from 'object-hash'
import _isObject from 'lodash.isobject'
import _isEmpty from 'lodash.isempty'
// import { message } from '@/api/ant'
import handleError from '@/utils/handleError'
import classifyMethod from '@/utils/classifyMethod'
import messageJson from '@/api/ant/message.json'

export default {
  fetchMessages: ({ commit, state }) => {
    let apiQuery = {}
    if (state.apiCursor) {
      const queryString = state.apiCursor.split('?')[1]
      const query = decodeURIComponent(queryString)
      const queryList = query.split('&')
      queryList.forEach((queryUnit) => {
        const list = queryUnit.split('=')
        apiQuery[list[0]] = list[1]
      })
    }

    // return message.fetchMessages({ cursor: apiQuery.cursor })
    //   .then(response => {
    //     const { data } = response
    //     const { next, results } = data
    //     commit('SET_MESSAGE_API_CURSOR', next)
    //     commit('ADD_MESSAGE_BULK', results)
    //     return true
    //   })
    //   .catch(error => {
    //     return handleError(error)
    //   })

    return Promise.resolve(messageJson.results)
      .then(responses => {
        const results = responses.map(response => ({
          ...response,
          pk: hash(Math.random())
        }))
        commit('SET_MESSAGE_API_CURSOR', null)
        commit('ADD_MESSAGE_BULK', results)
        return true
      })
      .catch(error => {
        return handleError(error)
      })
  },
  updateMessage: async ({ commit, state }, payload) => {
    // console.log('message actions.js')
    const { originData, updatedData, changedProps } = payload
    // console.log(changedProps)
    // TODO classify post, put, patch

    const methodList = []
    changedProps.forEach(prop => {
      if (_isEmpty(updatedData[prop])) {
        methodList.push(classifyMethod(originData[prop], updatedData[prop]))
      } else if (_isObject(updatedData[prop])) {
        for (let i = 0; i < updatedData[prop].length; i += 1) {
          methodList.push(classifyMethod((originData[prop] && originData[prop][i]) || null, updatedData[prop][i]))
        }
      } else {
        methodList.push(classifyMethod(originData[prop], updatedData[prop]))
      }
    })
    console.log(`methodList: ${methodList}`)
  }
}
