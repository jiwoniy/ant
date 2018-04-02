/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

// import Vue from 'vue'
// import store from '@/store'

import { message } from '@/api/ant'

export default {
  getMessages: ({ commit, state }) => {
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

    return message.getMessage({ cursor: apiQuery.cursor })
      .then(response => {
        const { data } = response
        const { next, results } = data
        commit('SET_MESSAGE_API_CURSOR', next)
        commit('SET_MESSAGE', results)
        return 'success'
      })
      .catch(error => {
        console.log('message getMessage error')
        console.log(error)
        return 'error'
      })

    // return setTimeout(() => {
    //   for (var i = 0, j = 20; i < j; i++) {
    //     commit('SET_MESSAGE', {
    //       pk: state.messages.length + 2,
    //       message: 'Jackie Chan'
    //     })
    //   }
    // }, 3000)

    // if (result) {
    //   return true
    // }

    // return false

    // return true
  }
}
