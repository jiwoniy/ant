import hash from 'object-hash'
// import _isObject from 'lodash.isobject'
// import _isEmpty from 'lodash.isempty'
// import { message } from '@/api/ant'
import handleError from '@/utils/handleError'
import classifyRestfulMethod from '@/utils/classifyRestfulMethod'
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
    console.log('message actions.js')
    const { originData, updatedData } = payload
    // console.log(originData)
    // console.log(updatedData)
    // TODO classify post, put, patch
    const results = classifyRestfulMethod(originData, updatedData)
    console.log(results)

    // commit('UPDATE_MESSAGE', updatedData)
  }
}
