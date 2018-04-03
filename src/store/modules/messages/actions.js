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
import handleError from '@/utils/handleError'

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

    return message.fetchMessages({ cursor: apiQuery.cursor })
      .then(response => {
        const { data } = response
        const { next, results } = data
        commit('SET_MESSAGE_API_CURSOR', next)
        commit('ADD_MESSAGE_BULK', results)
        return true
      })
      .catch(error => {
        return handleError(error)
      })
  }
}
