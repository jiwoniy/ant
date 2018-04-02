// import store from '@/store'
// import Axios from '@/plugins/axios'

export default {
  SET_MESSAGE_API_CURSOR: (state, payload) => {
    state.apiCursor = payload
  },
  SET_MESSAGE: (state, payload) => {
    state.messages.push(payload)
  }
}
