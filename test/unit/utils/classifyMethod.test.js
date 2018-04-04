import classifyMethod from '../../../src/utils/classifyMethod'

describe('classify method', () => {
  test('classify origin is empty - get post', () => {
    const origin = {}
    const update = {
      id: 1,
      value: 'test'
    }
    const method = classifyMethod(origin, update)
    expect(method).toBe('post')
  })

  test('classify origin(object) is not null - get patch', () => {
    const origin = {
      id: 1,
      value: 'hoho'
    }
    const update = {
      id: 1,
      value: 'test'
    }
    const method = classifyMethod(origin, update)
    expect(method).toBe('patch')
  })

  test('classify origin(array) is null - get patch', () => {
    const origin = [
      'test1'
    ]

    const update = [
      'test2'
    ]

    const method = classifyMethod(origin, update)
    expect(method).toBe('patch')
  })
})
