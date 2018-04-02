/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue'
import store from '@/store'

import { auth } from '@/api/ant'

export default {
  CHECK: ({ commit }) => {
    const token = window.localStorage.getItem('tfr_id_token_ant')
    const userId = localStorage.getItem('tfr_user_id_ant')
    if (!token) {
      commit('LOGOUT')
    } else {
      const userInfo = JSON.parse(atob(token.split('.')[1]))
      const expiredDate = new Date(userInfo.exp * 1000)

      if (expiredDate < new Date()) {
        commit('LOGOUT')
      } else {
        commit('CHECK')
        store.dispatch('auth/GETUSER', userId)
      }
    }
  },
  LOGIN: ({ commit }, user) => {
    auth.token(user).then((result) => {
      commit('LOGIN', {
        token: result.data.token,
        userId: result.data.user_id
      })
      store.dispatch('auth/GETUSER', result.data.user_id)

      Vue.router.push({
        path: '/Home'
      })
    }, (result) => {
      commit('LOGINFAILED', result.response)
    })
  },
  LOGOUT: ({ commit }) => {
    commit('LOGOUT')
    Vue.router.push({
      name: '/'
    })
  },
  GETUSER: ({ commit }, userId) => {
    auth.getUser(userId).then((result) => {
      commit('USER_ID', userId)
      commit('SETUSER', result.data)
    }, (result) => {
      commit('LOGINFAILED', result.error_code)
    })
  },
  SETUSER: ({ commit }, payload) => {
    commit('SETUSER', payload)
  }
}
