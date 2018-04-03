// import store from '@/store'
// import Axios from '@/plugins/axios'

export default {
  SET_MESSAGE_API_CURSOR: (state, payload) => {
    state.apiCursor = payload
  },
  ADD_MESSAGE: (state, payload) => {
    state.messages.push(payload)
  },
  REMOVE_MESSAGE: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      state.messages.splice(index, 1)
    }
  },
  UPDATE_MESSAGE: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      state.messages.splice(index, 1, payload)
    }
  },
  ADD_MESSAGE_BULK: (state, payload) => {
    state.messages.push(...payload)
  }
}
