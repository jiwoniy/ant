import store from '../../../../src/store/__mocks__/messages'
import getters from '../../../../src/store/modules/messages/getters'

describe('messages getter', () => {
  test('get Messages', () => {
    expect(store.messages).toBe(getters.MESSAGES(store))
  })

  test('get api cursor', () => {
    expect(null).toBe(getters.API_CURSOR(store))
  })
})
