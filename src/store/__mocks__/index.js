import Vue from 'vue'
import Vuex from 'vuex'

import messages from './messages'
import auth from './auth'

Vue.use(Vuex)

export function createMocks (custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
  // const mockGetters = Object.assign({}, getters, custom.getters);
  // const mockMutations = Object.assign({}, mutations, custom.mutations);
  // const mockActions = Object.assign({}, actions, custom.actions);
  // const mockState = Object.assign({}, state, custom.state)

  return {
    // getters: mockGetters,
    // mutations: mockMutations,
    // actions: mockActions,
    // state: mockState,
    store: new Vuex.Store({
      modules: {
        auth,
        messages
      }
    })
  }
}

export const store = createMocks().store
