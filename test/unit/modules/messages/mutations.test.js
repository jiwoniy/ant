import store from '../../../../src/store/__mocks__/messages'
import mutations from '../../../../src/store/modules/messages/mutations'

describe('messages mutations', () => {
  test('set message api cursor', () => {
    expect(store.apiCursor).toBe(null)
    mutations.SET_MESSAGE_API_CURSOR(store, 'apiCursor')
    expect(store.apiCursor).toBe('apiCursor')
  })

  test('add Message', () => {
    expect(store.messages).toHaveLength(2)
    const newMessage = {
      pk: 333,
      message: 'test message',
      ai_intent: null,
      ai_agent: [],
      ent_ai: null,
      ent_ag: null
    }
    mutations.ADD_MESSAGE(store, newMessage)
    expect(store.messages).toHaveLength(3)
    store.messages.pop()
  })

  test('remove Message', () => {
    expect(store.messages).toHaveLength(2)
    const removeMessage = store.messages[0]

    mutations.REMOVE_MESSAGE(store, removeMessage)
    expect(store.messages).toHaveLength(1)

    mutations.ADD_MESSAGE(store, removeMessage)
    expect(store.messages).toHaveLength(2)
  })

  test('add Bulk Messages', () => {
    expect(store.messages).toHaveLength(2)
    const messagesList = [{
      pk: 333,
      message: 'test message 1',
      ai_intent: null,
      ai_agent: [],
      ent_ai: null,
      ent_ag: null
    }, {
      pk: 444,
      message: 'test message 2',
      ai_intent: null,
      ai_agent: [],
      ent_ai: null,
      ent_ag: null
    }, {
      pk: 555,
      message: 'test message 3',
      ai_intent: null,
      ai_agent: [],
      ent_ai: null,
      ent_ag: null
    }, {
      pk: 666,
      message: 'test message 4',
      ai_intent: null,
      ai_agent: [],
      ent_ai: null,
      ent_ag: null
    }]
    mutations.ADD_MESSAGE_BULK(store, messagesList)
    expect(store.messages).toHaveLength(6)
  })

  test('update Message', () => {
    const beforeUpdateMessage = store.messages[0]
    expect(store.messages[0]).toBe(beforeUpdateMessage)

    const changeMessag = Object.assign(beforeUpdateMessage, {
      message: 'update message'
    })

    mutations.UPDATE_MESSAGE(store, changeMessag)
    expect(store.messages[0]).toBe(changeMessag)
  })
})
