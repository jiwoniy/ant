/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue'
import store from '@/store'
import Axios from '@/plugins/axios'

export default {
  CHECK: (state) => {
    state.authenticated = !!localStorage.getItem('tfr_id_token')
    if (state.authenticated) {
      Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('tfr_id_token')}`
    }
  },
  TRY_AUTO_LOGIN: () => {
    const token = localStorage.getItem('tfr_id_token')
    const userId = localStorage.getItem('tfr_user_id')
    if (!token || !userId) {
      return
    }
    const userObj = {}
    userObj.token = token
    userObj.userId = userId
    store.commit('auth/LOGIN', userObj)
  },
  LOGIN: (state, userObj) => {
    state.authenticated = true
    state.accessToken = userObj.token
    state.error_response = null

    // User can go to the next page when logged in!
    localStorage.setItem('tfr_id_token', userObj.token)
    localStorage.setItem('tfr_user_id', userObj.userId)
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${userObj.token}`
    // state.attemptFailed = false
  },
  LOGINFAILED: (state, payload) => {
    state.authenticated = false
    localStorage.removeItem('tfr_id_token')
    localStorage.removeItem('tfr_user_id')
    Axios.defaults.headers.common.Authorization = ''
    state.statusCode = payload.status
    if (state.statusCode === 400) {
      state.error_response = 'Please check your email and password'
    } else if (state.statusCode === 500) {
      state.error_response = 'Something wrong on our side.. please try again'
    }
  },
  MUTATE_FBTOKEN: (state, payload) => {
    state.fbToken = payload
  },
  MUTATE_STATUS: (state, payload) => {
    state.statusCode = payload
  },
  UPDATE_ERROR_MSG: (state, payload) => {
    state.errorMsg = payload
  },
  LOGOUT: (state) => {
    state.authenticated = false
    store.commit('auth/USER_ID', null)
    localStorage.removeItem('tfr_id_token')
    localStorage.removeItem('tfr_user_id')
    Axios.defaults.headers.common.Authorization = ''
  },
  USER_ID: (state, userId) => {
    state.userId = userId
  },
  SETUSER: (state, payload) => {
    state.user = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      country: payload.country,
      gender: payload.gender,
      full_name: `${payload.first_name} ${payload.last_name}`
    }
  }
}
