// import store from '@/store'
// import Axios from '@/plugins/axios'

export default {
  SET_MESSAGE_API_CURSOR: (state, payload) => {
    state.apiCursor = payload
  },
  ADD_MESSAGE_BULK: (state, payload) => {
    state.messages.push(...payload)
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
  // paload = message
  UPDATE_MESSAGE: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      state.messages.splice(index, 1, payload)
    }
  },
  UPDATE_MESSAGE_INTENT: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      // const intent = payload.intent
      // const intentId = intent.id
      // const currentMessage = state.message[payload.pk]
      // console.log(currentMessage)
      // state.messages.splice(index, 1, payload)
    }
  },
  ADD_MESSAGE_INTENT: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      // const intent = payload.intent
      // const intentId = intent.id
      // const currentMessage = state.message[payload.pk]
      // console.log(currentMessage)
      // state.messages.splice(index, 1, payload)
    }
  },
  REMOVE_MESSAGE_INTENT: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      // const intent = payload.intent
      // const intentId = intent.id
      // const currentMessage = state.message[payload.pk]
      // console.log(currentMessage)
      // state.messages.splice(index, 1, payload)
    }
  },
  UPDATE_MESSAGE_ENTITY: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      // const intent = payload.intent
      // const intentId = intent.id
      // const currentMessage = state.message[payload.pk]
      // console.log(currentMessage)
      // state.messages.splice(index, 1, payload)
    }
  },
  ADD_MESSAGE_ENTITY: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      // const intent = payload.intent
      // const intentId = intent.id
      // const currentMessage = state.message[payload.pk]
      // console.log(currentMessage)
      // state.messages.splice(index, 1, payload)
    }
  },
  REMOVE_MESSAGE_ENTITY: (state, payload) => {
    const index = state.messages.findIndex(message => message.pk === payload.pk)
    if (index > -1) {
      // const intent = payload.intent
      // const intentId = intent.id
      // const currentMessage = state.message[payload.pk]
      // console.log(currentMessage)
      // state.messages.splice(index, 1, payload)
    }
  }
}
